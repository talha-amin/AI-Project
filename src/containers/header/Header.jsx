import "font-awesome/css/font-awesome.min.css";
import people from "../../assets/people.png";
import ai from "../../assets/ai.png";
import "./header.css";
import { useLocation } from "react-router-dom";

const Header = ({ selectedCard, setSelectedCard, voiceLab, setVoiceLab }) => {
  const location = useLocation();
  const isTalentDashboard = location.pathname === "/talent-dashboard";
  const isLanding = location.pathname === "/";
  const isUserDashboard = location.pathname === "/user-dashboard";

  const handleCardClick = (cardNumber) => {
    setSelectedCard(cardNumber);
  };

  const toggleVoiceLab = () => {
    setVoiceLab(!voiceLab);
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
              Embark on a journey where your voice, text, and art transcend
              boundaries. With Vocalize, Scriptize, and Visionize, present them
              as canvases, allowing podcasters to create captivating narratives
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
                <h2 className="gradient__text">Vocalize</h2>
                <p>Record or Upload a Clear Sample to Clone a Voice! </p>
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
                <h2 className="gradient__text">Scriptize</h2>
                <p>
                  Submit Your Inspiring Script: Ignite the Path to Ultimate
                  Achievement!
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
                <h2 className="gradient__text">Visionize</h2>
                <p>
                  {" "}
                  Submit Your Artwork and Witness its Magical Transformation!{" "}
                </p>
                <button>Select</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isUserDashboard && (
        <div className="gpt3__header section__padding" id="home">
          <div className="gpt3__header-content">
            <h1 className="gradient__text">Speech Synthesis</h1>
            <p>
              Unleash the power of our cutting-edge technology to generate
              realistic, captivating speech in a wide range of languages.
            </p>
            <div className="gpt3__cards-container">
              <div className="gpt3__card" style={{ marginLeft: "530px" }}>
                <button className="plus-button" onClick={toggleVoiceLab}>
                  <i className="fa fa-plus"></i> Add Voice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
