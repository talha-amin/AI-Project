import React, { useState } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAuth } from "../google/authcontext";
import { Login, Logout } from "../index";
import { useAccount, useDisconnect } from "wagmi";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../components/google/firebase";

const Modal = () => {
  const address = useAccount();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleTalentClick = () => {
    setShowModal(false);
    navigate("/talent-dashboard");
  };

  const handleUserClick = async () => {
    if (auth.currentUser) {
      const userRef = doc(db, "users", auth.currentUser.uid);

      try {
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists() || !userSnap.data().types) {
          setShowModal(false);
          navigate("/user-dashboard");
        } else {
          console.error("Change your wallet address and email");
        }
      } catch (error) {
        console.error("Error checking user data:", error);
      }
    }
  };

  return (
    <div>
      <button
        type="button"
        className="open-modal-btn"
        onClick={() => setShowModal(true)}
      >
        Sign In
      </button>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal modal_background">
            {!currentUser && (
              <>
                <div className="connect-wallet ">
                  <ConnectButton />
                </div>
                <div className="login ">{address.address && <Login />}</div>
              </>
            )}
            {currentUser && (
              <>
                <div className="modal-sections">
                  <div>
                    <div className="modal-content">
                      <button onClick={handleTalentClick}>
                        Talent Dashboard
                      </button>
                    </div>
                  </div>
                  <div className="modal-content">
                    <button onClick={handleUserClick}>User Dashboard</button>
                  </div>
                </div>
                <div className="logout">
                  <Logout />
                </div>
              </>
            )}
            <div className="modal-close">
              <button type="button" onClick={() => setShowModal(false)}>
                <span>❌</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
