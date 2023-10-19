import { Footer, Blog, WhatGPT3, Header } from "../../containers";
import { CTA, Brand } from "../../components";
import { useAccount } from "wagmi";
import { Navbar } from "../../components";

import "./userdashboard.css";
import { useState } from "react";

const UserDasboard = () => {
  const { isConnected, address } = useAccount();
  const [voiceLab, setVoiceLab] = useState(false);
  const [showContent, setShowContent] = useState(null);
  const [voiceSelector, setVoiceSelector] = useState(false);

  const handleVoiceSelection = () => {
    setVoiceSelector(!voiceSelector);
  };

  const handleCloseContent = () => {
    setVoiceSelector(false);
    setVoiceLab(false);
  };
  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar type="User" />
        {isConnected && address && (
          <>
            <Header
              voiceLab={voiceLab}
              setVoiceLab={setVoiceLab}
              setShowContent={setShowContent}
              showContent={showContent}
              onCloseContent={handleCloseContent}
            />
            <WhatGPT3
              voiceLab={voiceLab}
              voiceSelector={voiceSelector}
              handleVoiceSelection={handleVoiceSelection}
              showContent={showContent}
            />
            <CTA voiceSelector={voiceSelector} />
            <Blog />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
};

export default UserDasboard;
