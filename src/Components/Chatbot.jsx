import React from "react";

const Chatbot = () => {
  const sendMessage = () => {
    const userInput = document.getElementById("user-input").value;

    // Display user message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "chat-message user-message";
    userMessageDiv.innerHTML = userInput;
    document.getElementById("chat-messages").appendChild(userMessageDiv);

    // Clear input field
    document.getElementById("user-input").value = "";

    // Make POST request to Flask server
    fetch("http://127.0.0.1:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "user_message=" + encodeURIComponent(userInput),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display bot response
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "chat-message bot-message";
        botMessageDiv.innerHTML = data.bot_response;
        document.getElementById("chat-messages").appendChild(botMessageDiv);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-80 bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col h-full">
        <div
          className="flex-1 overflow-y-auto p-4 text-left"
          id="chat-messages"
        >
          HI! How are you?
          {/* Chat messages will be displayed here */}
        </div>
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <input
              type="text"
              id="user-input"
              placeholder="Type your message..."
              className="flex-1 p-2 mr-2 bg-gray-800 text-white rounded-lg focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
