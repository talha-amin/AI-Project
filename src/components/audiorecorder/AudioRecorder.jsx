// AudioRecorder.js
import React, { useState, useRef } from "react";
import "./audiorecorder.css";

function AudioRecorder({ isLoading, handleSave }) {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioURL(url);
    };
    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="audio-recorder-container">
      <div className="audio-controls">
        {audioURL ? (
          <>
            <button
              style={{ marginLeft: "100px", marginBottom: "20px" }}
              onClick={() => {
                setAudioURL("");
                audioChunksRef.current = [];
              }}
            >
              Try Again
            </button>
            <button onClick={handleSave}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </>
        ) : recording ? (
          <button className="recording" onClick={stopRecording}>
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>
      {audioURL && (
        <div className="audio-playback">
          <audio controls src={audioURL}></audio>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
