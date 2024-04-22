from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_api import openai_manager
from database_queries import *
from database_setup import create_table
from database_cleaner import check_database
from Reading_Calendar import Subscribing_to_Calendar
import multiprocessing
import markdown
from pprint import pp
from werkzeug.utils import secure_filename
import os
import shutil

from text_parser import PDFParser
from api_calls import add_syllabus_grades,add_letter_grades

app = Flask(__name__, template_folder="templates")
CORS(app)


@app.route('/api/data', methods=['POST'])
def receive_data():
    
    data = request.json
    userID = data["userId"]
    Token = data["Token"]
    create_table(userID)
    chat_obj = openai_manager(userID)
    if(userID not in thread_info):
        thread_info[userID] = chat_obj
    add_user_info(userID,Token)
        
    return jsonify({'message': 'Data received successfully'})


@app.route('/api/createsubscribe', methods=['POST'])
def create_data():
    data = request.json  # Assuming data is sent as JSON

    process_add_schedule(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updatesubscribe', methods=['POST'])
def update_data():
    data = request.json  # Assuming data is sent as JSON
    process_add_schedule(data)

    return jsonify({'message': 'Data received successfully'})

@app.route('/api/deletesubscribe', methods=['POST'])
def delete_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here
    # delete_schedule_from_payload_schedules(data)
    process_delete_schedule(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/createTask', methods=['POST'])
def create_task():
    data = request.json  # Assuming data is sent as JSON

    process_add_task(data)

    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updateTask', methods=['POST'])
def update_task():
    data = request.json 

    process_update_task(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updatetaskGrade', methods=['POST'])
def update_taskGrade():
    data = request.json
    print(f"==>> data: {data}")

    process_update_taskGrade(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/deleteTask', methods=['POST'])
def delete_task():
    data = request.json 

    process_delete_task(data)
    return jsonify({'message': 'Data received successfully'})


@app.route('/api/schedule', methods=['POST'])
def receive_schedule():

    data = request.json

    process_add_schedule(data)
            
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/task', methods=['POST'])
def receive_task():

    data = request.json
    process_add_task(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/subjects', methods=['POST'])
def receive_subjects():

    data = request.json
    process_add_subject(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updatesubjects', methods=['POST'])
def update_subjects():

    data = request.json
    process_update_subject(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/')
def index():
    return render_template('index_page.html')

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    userID = data["userId"]
    user_message = data['user_message']
    if(userID not in thread_info):
        thread_info[userID] = openai_manager(userID)
    response,outputs =thread_info[userID].sendcall(user_message)
    response = markdown.markdown(response)
    print(response,outputs)
    return jsonify({'bot_response': response,'events_to_be_managed' : outputs })

@app.route('/Subscribe',methods=['POST'])
def subscribe_cal():
    data = request.json
    # url = data["URL"]
    # print(data)
    userID = data["userId"]
    Token = data["Token"]
    calendar = Subscribing_to_Calendar(data["calendar_url"],Token,userID,data["calendar_name"])
    # calendar.add_record_to_database()
    return jsonify({'message' : 'Subscribed Successfully'})


@app.route('/syllabus', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'

    file = request.files['file']
    subject_id = request.form.get('subject_ID')
    print(f"==>> subject_id: {subject_id}")
    userinfo_id = request.form.get('userinfoID')
    print(f"==>> userinfo_id: {userinfo_id}")


    if file.filename == '':
        return 'No selected file'

    if file:
        filename = secure_filename(file.filename)
        print("Current working directory:", os.getcwd())

        if not os.path.exists(os.getcwd() + "\Flask_server\syllabus_folder"):
            os.makedirs(os.getcwd() + "\Flask_server\syllabus_folder")

        file.save(os.path.join(os.getcwd() + "\Flask_server\syllabus_folder", filename))
        file_path = os.path.join(os.getcwd() + "\Flask_server\syllabus_folder", filename)

        pobj = PDFParser(file_path)
        grade_data = pobj.parser(subject_id, userinfo_id)
        grade_flag = False
        for category, value in grade_data.items():
            if category == "Grades":
                grade_flag = True
                for pair in value.split(","):
                    key, val = pair.strip().split(": ")
                    if val.startswith("<"):
                        val = 0
                    else:
                        val = float(val.strip())
                    add_letter_grades(key,val,subject_id,userinfo_id)
                break
                
            print(f"{category}: {value}")
            percent = float(value[0].rstrip("%"))
            nums = value[1]

            if nums == None or nums == 1:
                print("SENDING TO DATABASE ", category, percent, subject_id, userinfo_id)
                add_syllabus_grades(category, percent, subject_id, userinfo_id)
            else:
                for i in range(1,nums+1):
                    print("SENDING TO DATABASE ", category + " " + str(i), float(percent/nums), subject_id, userinfo_id)
                    add_syllabus_grades(category + " " + str(i), float(percent/nums), subject_id, userinfo_id)

    shutil.rmtree(os.getcwd() + "\Flask_server\syllabus_folder")

    return 'File uploaded successfully'


if __name__ == '__main__':
    global info
    # background_process = multiprocessing.Process(target=check_database)
    # background_process.start()
    thread_info = {}
    app.run(threaded = False,debug=True)
