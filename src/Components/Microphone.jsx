import React, { useState } from "react";
import { backend_Server_ip } from "./support_func";
import microphoneimage from "../icons/microphone-svgrepo-com.svg";

const Microphone = ({ send_message }) => {
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (e) => {
          setRecordedChunks((prevChunks) => [...prevChunks, e.data]);
        };

        recorder.start();
        setRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorder && recording) {
      mediaRecorder.stop();
      setRecording(false);
      sendAudioToServer();
    }
  };
  const sendAudioToServer = async () => {
    try {
      if (recordedChunks.length === 0) {
        console.warn("No audio recorded");
        return;
      }

      const blob = new Blob(recordedChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", blob, "recording.wav");

      const response = await fetch(`http://${backend_Server_ip}/audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading audio");
      }

      const responseData = await response.json();
      console.log(responseData.message);

      send_message(responseData.message);
      // send_message(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {recording ? (
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:red-600 focus:outline-none flex items-center"
          onClick={stopRecording}
          disabled={!recording}
        >
          <img
            className="w-5 h-5 "
            src={microphoneimage}
            alt="Microphone Off"
          />
          {/* Stop Recording */}
        </button>
      ) : (
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg ml-2 hover:bg-green-600 focus:outline-none flex items-center"
          onClick={startRecording}
          disabled={recording}
        >
          <img className="w-5 h-5 " src={microphoneimage} alt="Microphone On" />
          {/* Start Recording */}
        </button>
      )}
    </div>
  );
};

export default Microphone;
