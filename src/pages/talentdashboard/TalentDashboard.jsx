import React, { useState } from "react";
import { WhatGPT3 } from "../../containers";
import { Header } from "../../containers";
import { Navbar } from "../../components";
const TalentDashboard = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div className="App">
      <div className="gradient__bg">
        <Navbar type="Talent" />
        <Header selectedCard={selectedCard} setSelectedCard={setSelectedCard} />
      </div>
      <WhatGPT3 selectedCard={selectedCard} />
    </div>
  );
};

export default TalentDashboard;
