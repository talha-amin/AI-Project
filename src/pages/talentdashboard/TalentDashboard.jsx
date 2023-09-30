import React from "react";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import Sidebar from "../../components/sidebar/Sidebar";

const TalentDashboard = () => {
  return (
    <div>
      <h1>Talent Dashboard</h1>
      <Sidebar type="talent" />
    </div>
  );
};

export default TalentDashboard;
