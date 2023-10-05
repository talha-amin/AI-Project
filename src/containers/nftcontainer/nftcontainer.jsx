import React, { useState } from "react";
import NFT from "../../assets/NFT.png";
import "./nftcontainer.css";

function NFTContainer() {
  const [claimed, setClaimed] = useState(false);

  const handleClaim = () => {
    // Animation logic here
    setClaimed(true);
  };

  return (
    <div
      className="gradient_bg section__padding"
      style={{
        border: "1px solid black",
        width: "300px",
        height: "400px",
        position: "relative",
      }}
    >
      {claimed ? (
        <>
          <img
            src={NFT}
            alt="NFT"
            style={{
              width: "200%",
              height: "100%",
              border: "10px solid white",
              animation: "fadeIn 1s forwards",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              zIndex: 1000,
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <div style={{ marginTop: "10px", animation: "fadeIn 1s forwards" }}>
              <strong>Utilities:</strong>
              <ul>
                <li>Utility 1</li>
                <li>Utility 2</li>
                <li>Utility 3</li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              filter: "blur(8px)",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Claim to reveal
          </div>
          <button
            onClick={handleClaim}
            style={{
              position: "absolute",
              bottom: "10px",
              left: "10px",
              animation: "pointing 1s infinite",
            }}
          >
            Claim
          </button>
        </>
      )}
    </div>
  );
}

export default NFTContainer;
