import { useLocation } from "react-router-dom";
import "./cta.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth, storage } from "../../components/google/firebase";
import { useEffect, useState } from "react";

const CTA = ({ voiceSelector }) => {
  const location = useLocation();
  const isUserDashboard = location.pathname === "/user-dashboard";
  const isLanding = location.pathname === "/";

  const [usersWithVocalize, setUsersWithVocalize] = useState([]);

  const getUsersWithVocalize = async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("types.Vocalize", "==", true));
    const querySnapshot = await getDocs(q);

    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setUsersWithVocalize(users);
  };

  useEffect(() => {
    if (voiceSelector && isUserDashboard) {
      getUsersWithVocalize();
    }
  }, [voiceSelector, isUserDashboard]);

  console.log("usersWithVocalize:", usersWithVocalize);
  return (
    <>
      {isLanding && (
        <div className="gpt3__cta">
          <div className="gpt3__cta-content">
            <p>Request Early Access to Get Started</p>
            <h3>Register Today & start exploring the endless possibilities.</h3>
          </div>
          <div className="gpt3__cta-btn">
            <button type="button">Get Started</button>
          </div>
        </div>
      )}
      {voiceSelector && isUserDashboard && (
        <div className="gpt3__cta-user">
          <div className="gpt3__cta-content-user">
            <p>View Different Voices Available On Our Platform</p>
            <h3>Select Voices From Our Community Talents</h3>
          </div>

          <div className="gpt3__cta-content-user">
            <ul>
              {usersWithVocalize.map((user) => (
                <li key={user.id}>
                  <img src={user.photoURL} />
                  User ID: {user.displayName}, Wallet Address:
                  {user.walletAddress}
                  iSai Talent NFT:
                  <img
                    className="gpt3__cta-content-user .nft-image"
                    src="https://bafybeiejohruxjwcmccrvz6cynhnplsiaoyltmwnyklvhlo6i5evk5rwai.ipfs.nftstorage.link/"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default CTA;
