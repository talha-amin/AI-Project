import Feature from "../../components/feature/Feature";
import "./whatgpt3.css";
import { useLocation } from "react-router-dom"; // Import useLocation
import { AudioRecorder, FileUpload } from "../../components";
import { useState } from "react";
import { auth, db } from "../../components/google/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getStorage } from "firebase/storage";

const WhatGPT3 = ({ selectedCard, setDataSaved }) => {
  const location = useLocation();
  const isTalentDashboard = location.pathname === "/talent-dashboard";
  const isLanding = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const user = auth.currentUser;

  const handleSave = async (uploadedFile) => {
    if (!uploadedFile || uploadedFile.length === 0) return;

    setIsLoading(true);

    const file = uploadedFile[0];

    const storage = getStorage();
    const storageRef = ref(storage, `userFiles/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);

    // Update user's document with the file reference
    const userDoc = doc(db, "users", user.uid);
    await updateDoc(userDoc, {
      uploadedFile: `userFiles/${user.uid}/${file.name}`,
    });
    setDataSaved(true);
    setIsLoading(false);
  };

  let cardText = "";
  switch (selectedCard) {
    case 1:
      cardText = "Vocalize";
      break;
    case 2:
      cardText = "Scriptize";
      break;
    case 3:
      cardText = "Visionize";
      break;
    default:
      cardText = ""; // default or any placeholder text
  }

  const handleAudioUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleTextUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  if (isTalentDashboard && !cardText) return null;

  return (
    <>
      {isLanding && (
        <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
          <div className="gpt3__whatgpt3-feature">
            <Feature
              title="What is iSai"
              text="Experience the future of content creation, where AI-powered wizardy meets blockchain-powered royalties! Our user-friendly platform empowers artists to upload their original content seamlessly integrates AI enhancements,mints NFTsfor unique creations, tracks content distribution acorss platforms effortlessly calculates artist royalties, and ensures transparent and efficient royalty distribution through blockchain technology"
            />
          </div>
          <div className="gpt3__whatgpt3-heading">
            <h1 className="gradient__text">
              Welcome to the future of content, where creativity meets
              innovation!
            </h1>
            <p>Explore the Library</p>
          </div>
          <div className="gpt3__whatgpt3-container">
            <Feature title="Ethical Architecture" />
            <Feature title="AI Driven Content Generation" />
            <Feature title="Blockchain and Smart Contract" />
          </div>
        </div>
      )}

      {isTalentDashboard && (
        <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
          <div className="gpt3__whatgpt3-heading">
            <h1 className="gradient__text">{cardText}</h1>

            {cardText === "Vocalize" && (
              <AudioRecorder
                isLoading={isLoading}
                handleSave={handleSave}
                onFileUpload={handleAudioUpload}
              />
            )}

            <FileUpload
              isLoading={isLoading}
              handleSave={handleSave}
              onFileUpload={
                cardText === "Vocalize"
                  ? handleAudioUpload
                  : cardText === "Scriptize"
                  ? handleTextUpload
                  : handleImageUpload
              }
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WhatGPT3;
