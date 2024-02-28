from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_api import openai_manager
from api_calls import initialize_payload_user
from api_calls import set_schedules
from Reading_Calendar import Subscribing_to_Calendar
import jwt
import markdown
import time

app = Flask(__name__,template_folder="templates")
CORS(app)
class user_information():
    def __init__(self):
        self.checker = False
        self.Token = ""
        self.userID = ""
        self.schedule = None

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here
    info.userID = data["userId"]
    info.Token = data["Token"]
    if(info.checker == False):
        initialize_payload_user(info.Token,info.userID,info.schedule)
        info.checker = True
    info.chats = openai_manager()
    return jsonify({'message': 'Data received successfully'})


@app.route('/api/createsubscribe', methods=['POST'])
def create_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here

    print(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/updatesubscribe', methods=['POST'])
def update_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here

    print(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/deletesubscribe', methods=['POST'])
def delete_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here

    print(data)
    return jsonify({'message': 'Data received successfully'})

@app.route('/api/schedule', methods=['POST'])
def receive_schedule():
    # TODO: FIX SETTING SCHEDULES AFTER INITIALIZATION
    time.sleep(0.5)
    data = request.json
    # print((data))

    print(len(data))
    try:
        if(info.checker == False):
            print("stored schedule")
            info.schedule = data
        else:
            set_schedules(data)
    except:
        pass
    return jsonify({'message': 'Data received successfully'})

@app.route('/')
def index():
    return render_template('index_page.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    response,outputs = info.chats.sendcall(user_message)
    response = markdown.markdown(response)
    print(outputs[1])
    return jsonify({'bot_response': response,'events_to_be_managed' : outputs })

@app.route('/Subscribe',methods=['POST'])
def subscribe_cal():
    data = request.json
    # url = data["URL"]
    # category_name = data["Name"]
    url = "https://timetable.mypurdue.purdue.edu/Timetabling/export?x=5bqkz1gwruqbr0xfcgr2ks4gdlsnnf4u4"
    category_name = "Purdue Calendar"
    calendar = Subscribing_to_Calendar(url,info.Token,info.userID,category_name)
    calendar.add_record_to_database()
    return jsonify({'message' : 'Subscribed Successfully'})

if __name__ == '__main__':
    global info
    info = user_information()
    app.run(debug=True)
