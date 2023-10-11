import React, { useState, useEffect } from "react";
import NFT from "../../assets/NFT.png";
import "./nftcontainer.css";
import { contractAddress, contractABI } from "../../contract";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";

function NFTContainer() {
  const [claimed, setClaimed] = useState(false);
  const [tokenId, setTokenId] = useState(null);
  const [tokenURI, setTokenURI] = useState(null);
  const { isConnected, address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractABI,
    functionName: "airdropMint",
    args: [
      address.toString(),
      "https://bafybeic7mygpdsepag5jeou4zv3kp43hz4g2wx5tayvxlrz75bvok4awbm.ipfs.nftstorage.link",
    ],
  });

  const {
    data: mintData,
    isLoading: mintLoading,
    isSuccess: mintSuccess,
    write: airdropMint,
  } = useContractWrite(config);

  const { data: balanceData } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "balanceOf",
    args: [address.toString()],
  });

  const { data: tokenIdData } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "tokenOfOwnerByIndex",
    args: [address.toString(), 0],
  });

  const { data: tokenURIData } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "tokenURI",
    args: [tokenId],
  });

  useEffect(() => {
    if (balanceData && balanceData > 0 && tokenIdData) {
      setTokenId(tokenIdData);
    }
  }, [balanceData, tokenIdData]);

  useEffect(() => {
    if (tokenId && tokenURIData) {
      setTokenURI(tokenURIData);
    }
  }, [tokenId, tokenURIData]);
  const handleClaim = async () => {
    if (isConnected) {
      await airdropMint();
      setClaimed(true);
    }
  };

  return (
    <div className="gradient_bg section__padding">
      {tokenURI ? (
        <div className="nft-display">
          <h2 className="gradient__text nft-title">iSai NFT:</h2>
          <img className="nft-image" src={tokenURI} alt="Your NFT" />
        </div>
      ) : (
        !claimed && (
          <div className="nft-claim-section">
            <h2 className="gradient__text nft-title">Claim Your iSai NFT</h2>
            <button onClick={handleClaim} className="claim-button">
              Claim
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default NFTContainer;
