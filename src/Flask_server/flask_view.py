from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from chatbot_api import openai_manager
from api_calls import initialize_payload_user
from Reading_Calendar import Subscribing_to_Calendar
import jwt

app = Flask(__name__,template_folder="templates")
CORS(app)
class user_information():
    def __init__(self):
        self.Token = ""
        self.userID = ""
        

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json  # Assuming data is sent as JSON
    # Process the received data here
    info.userID = data["userId"]
    info.Token = data["Token"]
    initialize_payload_user(info.Token,info.userID)
    return jsonify({'message': 'Data received successfully'})

@app.route('/')
def index():
    return render_template('index_page.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    response = chats.sendcall(user_message)
    return jsonify({'bot_response': response})

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
    info = user_information()
    chats = openai_manager()
    app.run(debug=True)



# from flask import Flask, request, render_template,redirect

# app = Flask(__name__,template_folder="templates")

# @app.route('/',methods=['GET'])
# def index():
#     return render_template('index_page.html')

# if __name__ == '__main__':
#     app.run(debug=True)