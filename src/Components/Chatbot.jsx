import React, { useState } from "react";
import { cognito_Id } from "./support_func";
import axios from "axios";
import Microphone from "../icons/microphone-svgrepo-com.svg";
const Chatbot = ({ onAddgptevent }) => {
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const startRecording = () => {
    const stream = navigator.mediaDevices.getUserMedia({ audio: true });
    stream.then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size) {
          setAudioChunks((chunks) => [...chunks, e.data]);
        }
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/mpeg-3" });
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        const audioFile = new File([audioBlob], "voice_record.mp3", {
          type: "audio/mpeg-3",
        });

        const formData = new FormData();
        formData.append("voiceRecording", audioFile);
        formData.append("userId", cognito_Id);

        axios
          .post("http://127.0.0.1:5000/chat/voice", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            const data = response.data;
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
                  [],
                  data.events_to_be_managed[0]
                );
              } else if (data.events_to_be_managed[0] === "DELETED") {
                onAddgptevent(
                  [],
                  data.events_to_be_managed[1],
                  data.events_to_be_managed[0]
                );
              } else if (data.events_to_be_managed[0] === "CONFLICT") {
                onAddgptevent(
                  data.events_to_be_managed[1],
                  data.events_to_be_managed[2],
                  data.events_to_be_managed[0]
                );
              } else if (data.events_to_be_managed[0] === "UPDATE") {
                onAddgptevent(
                  data.events_to_be_managed[1],
                  data.events_to_be_managed[2],
                  data.events_to_be_managed[0]
                );
              }
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        setAudioChunks([]);
      };

      mediaRecorder.start();
      setRecording(true);
      setMediaRecorder(mediaRecorder);
    });
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
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

    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", dataToSend);

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
            [],
            data.events_to_be_managed[0]
          );
        } else if (data.events_to_be_managed[0] === "DELETED") {
          onAddgptevent(
            [],
            data.events_to_be_managed[1],
            data.events_to_be_managed[0]
          );
        } else if (data.events_to_be_managed[0] === "CONFLICT") {
          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0]
          );
        } else if (data.events_to_be_managed[0] === "UPDATE") {
          onAddgptevent(
            data.events_to_be_managed[1],
            data.events_to_be_managed[2],
            data.events_to_be_managed[0]
          );
        }
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
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
          {recording ? (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600 focus:outline-none flex items-center"
            >
              <img src={Microphone} alt="microhone" className="w-5 h-5 " />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-green-500 text-white rounded-lg ml-2 hover:bg-green-600 focus:outline-none flex items-center"
            > <img src={Microphone} alt="microhone" className="w-5 h-5 " /></button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
