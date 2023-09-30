import React from "react";
import { Link } from "react-router-dom";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";
import "./sidebar.css";

const Sidebar = ({ type }) => {
  const talentOptions = [
    {
      component: <ConnectWallet theme={darkTheme} btnTitle="Connect Wallet" />,
      label: "Connect Wallet",
    },
    { path: "/talent-dashboard", label: "Talent Home" },
    { path: "/talent-profile", label: "Profile" },
    { path: "/talent-settings", label: "Settings" },
  ];

  const userOptions = [
    {
      component: <ConnectWallet theme={darkTheme} btnTitle="Connect Wallet" />,
      label: "Connect Wallet",
    },
    { path: "/user-dashboard", label: "User Home" },
    { path: "/user-profile", label: "Profile" },
    { path: "/user-settings", label: "Settings" },
  ];

  const options = type === "talent" ? talentOptions : userOptions;

  return (
    <div className="sidebar">
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            {option.path ? (
              <Link to={option.path}>{option.label}</Link>
            ) : (
              option.component
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
