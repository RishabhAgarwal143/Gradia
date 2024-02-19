from flask import Flask, render_template, request, jsonify
from chatbot_api import openai_manager
app = Flask(__name__,template_folder="templates")
from api_calls import initialize_payload_user
from Reading_Calendar import Subscribing_to_Calendar

@app.route('/')
def index():
    return render_template('index_page.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    # You can add your chatbot logic here to generate a bot response
    response = chats.sendcall(user_message)
    return jsonify({'bot_response': response})

@app.route('/Subscribe',method=['POST'])
def subcscribe():
    url = request.args.get('url')
    token = request.args.get('token')
    userinfoid = request.args.get('userId')
    category_name = request.args.get('Name')
    calendar = Subscribing_to_Calendar(url,token,userinfoid,category_name)
    calendar.add_record_to_database()
    return

if __name__ == '__main__':
    initialize_payload_user(1)
    chats = openai_manager()
    app.run(debug=True)



# from flask import Flask, request, render_template,redirect

# app = Flask(__name__,template_folder="templates")

# @app.route('/',methods=['GET'])
# def index():
#     return render_template('index_page.html')

# if __name__ == '__main__':
#     app.run(debug=True)