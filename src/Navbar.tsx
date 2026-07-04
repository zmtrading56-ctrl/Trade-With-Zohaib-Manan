import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "./firebase";
import { AuthContext } from "./AuthProvider";

function Navbar() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);

      alert("Logout Successful!");

      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <nav className="navbar">
      <h2>Trade With Zohaib Manan</h2>

      <div className="nav-links">
        <span>Dashboard</span>
        <span>AI Signals</span>
        <span>Markets</span>
        <span>News</span>

        {user && (
          <>
            <span>{user.email}</span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;