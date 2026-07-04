import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { AuthContext } from "./AuthProvider";
import { db } from "./firebase";

function AdminPanel() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");

  useEffect(() => {
    const loadRole = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setRole(docSnap.data().role);
      }
    };

    loadRole();
  }, [user]);

  if (role !== "admin") {
    return null;
  }

  return (
    <div className="admin-card">
      <h2>Admin Panel</h2>

      <div className="admin-box">
        <h3>Users</h3>
        <p>Manage users and accounts</p>
      </div>

      <div className="admin-box">
        <h3>AI Signals</h3>
        <p>Manage AI signal engine</p>
      </div>

      <div className="admin-box">
        <h3>Website Settings</h3>
        <p>Control platform settings</p>
      </div>

      <div className="admin-box">
        <h3>Broker Management</h3>
        <p>Manage broker integrations</p>
      </div>
    </div>
  );
}

export default AdminPanel;