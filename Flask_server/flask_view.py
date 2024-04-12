from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_api import openai_manager
# from api_calls import initialize_payload_user
# from api_calls import set_schedules, add_schedule_to_payload_schedules, delete_schedule_from_payload_schedules
from database_queries import process_add_schedule,process_delete_schedule,process_update_task
from database_queries import process_add_task,process_delete_task,process_add_subject,add_user_info
from database_cleaner import check_database
from Reading_Calendar import Subscribing_to_Calendar
import multiprocessing
import markdown
from pprint import pp

app = Flask(__name__, template_folder="templates")
CORS(app)


@app.route('/api/data', methods=['POST'])
def receive_data():
    
    data = request.json  
    userID = data["userId"]
    Token = data["Token"]
    add_user_info(userID,Token)
    chat_obj = openai_manager(userID)
    if(userID not in thread_info):
        thread_info[userID] = chat_obj
        
    return jsonify({'message': 'Data received successfully'})


@app.route('/api/createsubscribe', methods=['POST'])
def create_data():
    data = request.json  # Assuming data is sent as JSON

    process_add_schedule(data)
    # print(data)

    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updatesubscribe', methods=['POST'])
def update_data():
    data = request.json  # Assuming data is sent as JSON

    print(data)
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
    pp(data)
    process_update_task(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/deleteTask', methods=['POST'])
def delete_task():
    data = request.json 

    process_delete_task(data)
    return jsonify({'message': 'Data received successfully'})


@app.route('/api/schedule', methods=['POST'])
def receive_schedule():

    data = request.json
    print(len(data))

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
    print(Token)
    calendar = Subscribing_to_Calendar(data["calendar_url"],Token,userID,data["calendar_name"])
    # calendar.add_record_to_database()
    return jsonify({'message' : 'Subscribed Successfully'})

if __name__ == '__main__':
    global info
    background_process = multiprocessing.Process(target=check_database)
    background_process.start()
    thread_info = {}
    app.run(threaded = False,debug=True)
