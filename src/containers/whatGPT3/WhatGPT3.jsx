import Feature from "../../components/feature/Feature";
import "./whatgpt3.css";
import { useLocation } from "react-router-dom"; // Import useLocation
import { AudioRecorder, FileUpload } from "../../components";
import { useState } from "react";
import { getDownloadURL } from "firebase/storage"; // Import this
import { auth, db, storage } from "../../components/google/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { uploadBytes } from "firebase/storage"; // This import is necessary
import { ref } from "firebase/storage"; // This import is crucial for the modular SDK

const WhatGPT3 = ({ selectedCard }) => {
  const location = useLocation();
  const isTalentDashboard = location.pathname === "/talent-dashboard";
  const isLanding = location.pathname === "/";
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (uploadedItems, cardText) => {
    console.log("cardText:", cardText);
    setIsLoading(true);
    const uploadedFiles = Array.isArray(uploadedItems)
      ? uploadedItems
      : [uploadedItems];

    const userId = auth.currentUser.uid; // Get the current user's ID
    const storageRef = ref(storage);
    for (let file of uploadedFiles) {
      // Create a storage reference
      const fileRef = ref(storage, `${userId}/${cardText}/${file.name}`);

      try {
        // Upload the file
        await uploadBytes(fileRef, file);

        // Optional: If you want to get the download URL after upload
        const fileURL = await getDownloadURL(fileRef); // Updated line
        console.log("Uploaded file available at: ", fileURL);

        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
          [`types.${cardText}`]: true, // This sets the nested field "types.cardText" to true
        });

        // If you want to store this URL or any related file data to Firestore, do it here.
      } catch (error) {
        console.error("Error uploading file: ", error);
      }
    }

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
      return (
      {isTalentDashboard && (
        <div className="gpt3__whatgpt3 section__margin" id="wgpt3">
          <div className="gpt3__whatgpt3-heading">
            {cardText === "Vocalize" && (
              <>
                <h1 className="gradient__text">{cardText}</h1>
                <AudioRecorder
                  isLoading={isLoading}
                  handleSave={handleSave}
                  cardText={cardText}
                />
                <FileUpload
                  isLoading={isLoading}
                  handleSave={handleSave}
                  cardText={cardText}
                />
              </>
            )}
            {cardText === "Scriptize" && (
              <>
                <h1 className="gradient__text">{cardText}</h1>
                <FileUpload
                  isLoading={isLoading}
                  handleSave={handleSave}
                  cardText={cardText}
                />
              </>
            )}
            {cardText === "Visionize" && (
              <>
                <h1 className="gradient__text">{cardText}</h1>
                <FileUpload
                  isLoading={isLoading}
                  handleSave={handleSave}
                  cardText={cardText}
                />
              </>
            )}
          </div>
        </div>
      )}
      );
    </>
  );
};

export default WhatGPT3;
