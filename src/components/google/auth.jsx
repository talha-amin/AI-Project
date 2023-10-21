import { auth, db } from "./firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { useAccount } from "wagmi";
import { Snackbar } from "../index";
import "./logout.css";
import { useState } from "react";

function Login() {
  const address = useAccount();
  const [snack, setSnack] = useState({ message: "", type: "" }); // Snackbar state

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const walletQuery = query(
        collection(db, "users"),
        where("walletAddress", "==", address.address)
      );
      const walletQuerySnapshot = await getDocs(walletQuery);
      if (!walletQuerySnapshot.empty) {
        throw new Error(
          "This wallet address is already associated with another user."
        );
      }

      const emailQuery = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const emailQuerySnapshot = await getDocs(emailQuery);
      if (!emailQuerySnapshot.empty) {
        throw new Error("This email is already associated with another user.");
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          walletAddress: address.address,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }

      setSnack({ message: "Logged in successfully!", type: "success" });
    } catch (error) {
      setSnack({ message: `Error: ${error.message}`, type: "error" });
    }
  };

  return (
    <div>
      <button className="button-29" onClick={signInWithGoogle}>
        {" "}
        Sign in with Google
      </button>
      <Snackbar
        message={snack.message}
        type={snack.type}
        onDismiss={() => setSnack({ message: "", type: "" })}
      />
    </div>
  );
}

export default Login;
