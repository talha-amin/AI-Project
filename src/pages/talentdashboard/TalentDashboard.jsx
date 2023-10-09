import React, { useState } from "react";
import { WhatGPT3, Header, NFTContainer } from "../../containers";
import { Navbar } from "../../components";
import { useAccount } from "wagmi";

const TalentDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [dataSaved, setDataSaved] = useState(false);
  const { isConnected, address } = useAccount();

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar type="Talent" />
        {isConnected && address && (
          <>
            <Header
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
            />
            <WhatGPT3 selectedCard={selectedCard} setDataSaved={setDataSaved} />
            <NFTContainer dataSaved={dataSaved} />
          </>
        )}
      </div>
    </div>
  );
};

export default TalentDashboard;
