import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await userCredential.user.reload();

      if (!userCredential.user.emailVerified) {
        await signOut(auth);

        alert(
          "Please verify your email before logging in. Check your Inbox or Spam folder."
        );
        return;
      }

      alert("Login Successful!");

      navigate("/");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      alert("Please enter your email first.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset email sent successfully!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="login-card">
      <h2>User Login</h2>

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

      <button onClick={handleLogin}>
        Login
      </button>

      <p
        onClick={handleForgotPassword}
        style={{ cursor: "pointer", color: "#4da3ff" }}
      >
        Forgot Password?
      </p>

      <p
        onClick={() => navigate("/signup")}
        style={{ cursor: "pointer", color: "#4da3ff" }}
      >
        Create New Account
      </p>
    </div>
  );
}

export default Login;