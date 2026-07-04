import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name,
        email,
        createdAt: new Date().toISOString(),
        emailVerified: false,
        role: "user",
      });

      await sendEmailVerification(userCredential.user);

      alert(
        "Account created successfully! Please verify your email before logging in."
      );

      navigate("/login");
    } catch (error: any) {
      console.error("Signup Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-card">
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Signup
      </button>

      <p
        onClick={() => navigate("/login")}
        style={{ cursor: "pointer", color: "#4da3ff" }}
      >
        Already have an account? Login
      </p>
    </div>
  );
}

export default Signup;