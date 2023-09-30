import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {
  ThirdwebProvider,
  metamaskWallet,
  magicLink,
  localWallet,
} from "@thirdweb-dev/react";
import { Goerli, BinanceTestnet, Mumbai } from "@thirdweb-dev/chains";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Mumbai}
      supportedChains={[Goerli, BinanceTestnet]}
      supportedWallets={[metamaskWallet()]}
      clientId={import.meta.env.Client_ID}
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);
