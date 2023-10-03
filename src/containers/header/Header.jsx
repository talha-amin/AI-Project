import React from "react";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
import { useLocation } from "react-router-dom"; // Import useLocation

const Header = ({ selectedCard, setSelectedCard }) => {
  const location = useLocation();
  const isTalentDashboard = location.pathname === "/talent-dashboard";
  const isLanding = location.pathname === "/";

  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  return (
    <>
      {isLanding && (
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">
              Experience the future of content creation. iSai your All-in-One
              Content Magic.
            </h1>
            <p>
              By implementing a transparent and ethically grounded trust system
              and actively promoting the advantages of AI, the media industry
              can facilitae business transformation while preserving the vital
              human element and ensuring fair compensation for all contributors
            </p>
            <div className="gpt3__header-content__input">
              <input type="email" placeholder="Your Email Address" />
              <button type="button">Get Started</button>
            </div>
            <div className="gpt3__header-content__people">
              <img src={people} />
              <p>1,600 people requested access a visit in last 24 hours</p>
            </div>
            <div className="gpt3__header-image">
              <img src={ai} />
            </div>
          </div>
        </div>
      )}
      {isTalentDashboard && (
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            {" "}
            <h1 className="gradient__text">
              Let&apos;s Register Your Voice,Text or Art
            </h1>
            <p>Please select the talent you want to register for</p>
            <div className="gpt3__cards-container">
              <div
                className={`gpt3__card ${selectedCard === 1 ? "selected" : ""}`}
                onClick={() => {
                  handleCardClick(1);
                  ("");
                }}
              >
                <div className="gpt3__header-image">
                  {/* <img src={people} alt="People" /> */}
                </div>
                <h2 className="gradient__text">Voice</h2>
                <p>
                  {" "}
                  Have an amazing voice our users can use for their podcast?
                </p>
                <button>Select</button>
              </div>

              <div
                className={`gpt3__card ${selectedCard === 2 ? "selected" : ""}`}
                onClick={() => {
                  handleCardClick(2);
                }}
              >
                <div className="gpt3__header-image">
                  {/* <img src={ai} alt="AI" /> */}
                </div>
                <h2 className="gradient__text">Text</h2>
                <p>
                  Have an amazing script our users can use in their podcast?
                </p>
                <button>Select</button>
              </div>

              <div
                className={`gpt3__card  ${
                  selectedCard === 3 ? "selected" : ""
                }`}
                onClick={() => {
                  handleCardClick(3);
                }}
              >
                <div className="gpt3__header-image">
                  {/* <img src={people} alt="People" /> */}
                </div>
                <h2 className="gradient__text">Art</h2>
                <p>Have an amazing Art our users can use in their podcast?</p>
                <button>Select</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
