from flask import Flask, render_template, request, jsonify
from chatbot_api import openai_manager
app = Flask(__name__,template_folder="templates")


@app.route('/')
def index():
    return render_template('index_page.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.form['user_message']
    # You can add your chatbot logic here to generate a bot response
    response = chats.sendcall(user_message)
    return jsonify({'bot_response': response})

if __name__ == '__main__':
    chats = openai_manager()
    app.run(debug=True)



# from flask import Flask, request, render_template,redirect

# app = Flask(__name__,template_folder="templates")

# @app.route('/',methods=['GET'])
# def index():
#     return render_template('index_page.html')

# if __name__ == '__main__':
#     app.run(debug=True)