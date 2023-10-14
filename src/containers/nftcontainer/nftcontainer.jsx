import React, { useState, useEffect } from "react";
import "./nftcontainer.css";
import { runTransaction } from "firebase/firestore";
import { contractAddress, contractABI } from "../../contract";
import { usePrepareContractWrite, useContractWrite } from "wagmi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth, storage } from "../../components/google/firebase";
import { ref, list } from "firebase/storage"; // This import is crucial for the modular SDK

function NFTContainer() {
  const URIs = {
    Vocalize:
      "https://bafybeiejohruxjwcmccrvz6cynhnplsiaoyltmwnyklvhlo6i5evk5rwai.ipfs.nftstorage.link/",
    Scriptize:
      "https://bafybeigq7pk2ocibcdhvw7ogglqwwna6ftrswisikadyso2pxozna372xy.ipfs.nftstorage.link/",
    Visualize:
      "https://bafybeifcfyluyenbxmlx3odowpfw7vhxtlki3wlko6rjrnq5diovgilaiu.ipfs.nftstorage.link/",
  };

  const [claimedNFTs, setClaimedNFTs] = useState([]);
  const [minting, setMinting] = useState(false);
  const [contractConfig, setContractConfig] = useState(null);
  const [typeAvailability, setTypeAvailability] = useState({});

  const { config: preparedConfig } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "mintNFT",
    args: contractConfig ? [contractConfig.uri] : [],
  });

  const {
    data: mintData,
    isLoading: mintLoading,
    isSuccess: mintSuccess,
    write: mintNFT,
  } = useContractWrite(preparedConfig);

  useEffect(() => {
    if (auth.currentUser) {
      const fetchClaimedNFTs = async () => {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setClaimedNFTs(userSnap.data().claimedNFTs || []);
        }
      };

      fetchClaimedNFTs();
    }
  }, [auth.currentUser]);

  useEffect(() => {
    async function checkTypes() {
      let availability = {};
      for (let typeKey of Object.keys(URIs)) {
        availability[typeKey] = await isTypeInStorage(typeKey);
      }
      setTypeAvailability(availability);
    }

    checkTypes();
  }, []);

  async function isTypeInStorage(type) {
    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);

    try {
      return (
        userDoc.exists() &&
        userDoc.data().types &&
        userDoc.data().types[type] === true
      );
    } catch (error) {
      console.error("Error checking type in storage: ", error);
      return false;
    }
  }

  async function handleAirdrop(type) {
    if (!typeAvailability[type]) {
      alert("Please register data first before claiming this NFT.");
      return;
    }

    if (claimedNFTs.includes(type)) {
      return;
    }

    try {
      setMinting(true);
      setContractConfig({ uri: URIs[type] });
      await mintNFT?.();

      const userRef = doc(db, "users", auth.currentUser.uid);

      await runTransaction(db, async (transaction) => {
        const userDoc = await transaction.get(userRef);
        if (!userDoc.exists()) {
          throw new Error("User does not exist!");
        }

        const currentClaimedNFTs = userDoc.data().claimedNFTs || [];
        if (!currentClaimedNFTs.includes(type)) {
          transaction.update(userRef, {
            claimedNFTs: [...currentClaimedNFTs, type],
          });
        }
      });

      setMinting(false);
      console.log(`${type} Minted`, mintSuccess);
    } catch (error) {
      console.error(`${type} Failed`, error);
      setMinting(false);
    }
  }
  console.log({ claimedNFTs, minting, typeAvailability });

  return (
    <div className="gradient_bg section__padding">
      <h2 className="gradient__text nft-title">Claim Your iSai NFT</h2>
      <div className="nft-claim-section">
        {Object.keys(URIs).map((type) => (
          <div key={type} className="nft-card">
            <img
              src={URIs[type]}
              alt={`${type} NFT`}
              className="nft-card-image"
            />
            <button
              onClick={() => handleAirdrop(type)}
              className={`claim-button ${
                claimedNFTs.includes(type) ? "claimed" : ""
              }`}
              disabled={
                claimedNFTs.includes(type) || minting || !typeAvailability[type]
              }
            >
              {claimedNFTs.includes(type) ? "Claimed" : `Claim ${type}`}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NFTContainer;
