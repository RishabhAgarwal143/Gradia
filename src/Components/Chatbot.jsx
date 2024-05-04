import React, { useState } from "react";
import { cognito_Id, backend_Server_ip } from "./support_func";
import axios from "axios";
import Microphone from "./Microphone";

const Chatbot = ({ onAddgptevent, onAddgptTask }) => {
  const [loading, setLoading] = useState(false);

  const sending_to_Backend = async (dataToSend) => {
    try {
      const response = await axios.post(
        // "http://127.0.0.1:5000/chat",
        `${backend_Server_ip}/chat`,
        dataToSend
      );

      setLoading(false);

      let data = response.data;
      console.log(data.events_to_be_managed);
      if (!data.events_to_be_managed) {
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className =
          "bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-xs ml-auto";
        botMessageDiv.innerHTML = data.bot_response;
        document.getElementById("chat-messages").appendChild(botMessageDiv);
      } else {
        if (data.events_to_be_managed[0] === "ADD") {
          data.events_to_be_managed[1]["DTSTART"] = new Date(
            data.events_to_be_managed[1]["DTSTART"]
          );
          data.events_to_be_managed[1]["DTEND"] = new Date(
            data.events_to_be_managed[1]["DTEND"]
          );

          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0],
            data.events_to_be_managed[3]
          );
        } else if (data.events_to_be_managed[0] === "DELETED") {
          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0],
            data.events_to_be_managed[3]
          );
        } else if (data.events_to_be_managed[0] === "CONFLICT") {
          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0],
            data.events_to_be_managed[3]
          );
        } else if (data.events_to_be_managed[0] === "UPDATE") {
          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0],
            data.events_to_be_managed[3]
          );
        } else if (data.events_to_be_managed[0] === "ADD_TASK") {
          data.events_to_be_managed[1].color = "orange";
          onAddgptTask(data.events_to_be_managed[1]);
        } else if (data.events_to_be_managed[0] === "UPDATE_TASK") {
          data.events_to_be_managed[1].color = "yellow";
          onAddgptTask(data.events_to_be_managed[1]);
        } else if (data.events_to_be_managed[0] === "DELETE_TASK") {
          data.events_to_be_managed[1].color = "purple";
          onAddgptTask(data.events_to_be_managed[1]);
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  const sendMessage = async () => {
    const userInput = document.getElementById("user-input").value;

    const userMessageDiv = document.createElement("div");
    userMessageDiv.className =
      "chat-message user-message bg-blue-500 text-white rounded-lg p-2 mb-2";
    userMessageDiv.innerHTML = userInput;
    document.getElementById("chat-messages").appendChild(userMessageDiv);

    // Clear input field
    document.getElementById("user-input").value = "";
    const dataToSend = {
      userId: cognito_Id,
      user_message: userInput,
    };

    setLoading(true);
    sending_to_Backend(dataToSend);
  };

  const sendaudio = async (message) => {
    console.log("🚀 ~ sendaudio ~ message:", message);
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className =
      "chat-message user-message bg-blue-500 text-white rounded-lg p-2 mb-2";
    userMessageDiv.innerHTML = message;
    document.getElementById("chat-messages").appendChild(userMessageDiv);

    document.getElementById("user-input").value = "";
    const dataToSend = {
      userId: cognito_Id,
      user_message: message,
    };

    setLoading(true);
    sending_to_Backend(dataToSend);
  };

  return (
    <div className="flex flex-col h-full w-full text-white p-2 rounded-lg">
      <div className="flex-1 overflow-y-auto p-2 text-left" id="chat-messages">
        {/* Example Chat Messages */}
        <div className="flex flex-col items-start mb-4"></div>
        {/* Additional Chat Messages will be displayed here */}
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center">
          <input
            type="text"
            id="user-input"
            placeholder="Type your message..."
            className="flex-1 p-2 mr-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-white border-t-2 border-r-2 rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Send"
            )}
          </button>
          <Microphone send_message={sendaudio} />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
