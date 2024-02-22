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
        botMessageDiv.className =
          "bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-xs";
        botMessageDiv.innerHTML = data.bot_response;
        document.getElementById("chat-messages").appendChild(botMessageDiv);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 text-left" id="chat-messages">
        {/* Example Chat Messages */}
        <div className="flex flex-col items-start mb-4">
          <div className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-xs">
            <p className="">Hi! How are you?</p>
          </div>
        </div>
        {/* Additional Chat Messages will be displayed here */}
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
  );
};

export default Chatbot;
