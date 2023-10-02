import React, { useState } from "react";
import "./modal.css";
import { useNavigate } from "react-router-dom";

const Modal = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleTalentClick = () => {
    setShowModal(false);
    navigate("/talent-dashboard");
  };

  const handleUserClick = () => {
    setShowModal(false);
    navigate("/user-dashboard");
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
          <div className="modal gradient__bg">
            <div className="modal-sections">
              <div>
                <div className="modal-header gradient__text">
                  Register as Talent
                </div>
                <div className="modal-content">
                  <button onClick={handleTalentClick}>
                    Go to Talent Dashboard
                  </button>
                </div>
              </div>
              <div>
                <div className="modal-header gradient__text">
                  Use as Podcast Creator
                </div>
                <div className="modal-content">
                  <button onClick={handleUserClick}>User Dashboard</button>
                </div>
              </div>
            </div>
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
