// let mediaRecorder;
// let recordedChunks = [];

// navigator.mediaDevices
//   .getUserMedia({ audio: true })
//   .then((stream) => {
//     mediaRecorder = new MediaRecorder(stream);

//     mediaRecorder.ondataavailable = (e) => {
//       recordedChunks.push(e.data);
//     };

//     mediaRecorder.onstop = () => {
//       let blob = new Blob(recordedChunks, { type: "audio/wav" });
//       sendAudio(blob);
//     };
//   })
//   .catch((err) => console.error("Error accessing microphone:", err));

// document.getElementById("startRecord").addEventListener("click", () => {
//   recordedChunks = [];
//   mediaRecorder.start();
//   document.getElementById("startRecord").disabled = true;
//   document.getElementById("stopRecord").disabled = false;
// });

// document.getElementById("stopRecord").addEventListener("click", () => {
//   mediaRecorder.stop();
//   document.getElementById("startRecord").disabled = false;
//   document.getElementById("stopRecord").disabled = true;
// });

// function sendAudio(blob) {
//   let formData = new FormData();
//   formData.append("audio", blob, "recording.wav");

//   fetch(`http://127.0.0.1:5000/audio`, {
//     method: "POST",
//     body: formData,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Error uploading audio");
//       }
//       console.log("Audio uploaded successfully");
//     })
//     .catch((error) => console.error("Error:", error));
// }
import React, { useState } from "react";
import { backend_Server_ip } from "./support_func";

const Microphone = () => {
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

      const response = await fetch(`http://${backend_Server_ip}:5000/audio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error uploading audio");
      }

      const responseData = await response.json();
      console.log(responseData);
      // send_message(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={sendAudioToServer}>Send Audio</button>
    </div>
  );
};

export default Microphone;
