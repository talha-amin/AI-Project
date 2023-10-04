import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";

function LogoutButton() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const isTalentDashboard = location.pathname === "/talent-dashboard";

    try {
      if (isTalentDashboard) {
        navigate("/");
      }
      await signOut(auth);
      console.log("User signed out!");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
