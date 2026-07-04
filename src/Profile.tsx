import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { AuthContext } from "./AuthProvider";
import { db } from "./firebase";

function Profile() {
  const { user } = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfile(docSnap.data());
      }
    };

    loadProfile();
  }, [user]);

  return (
    <div className="profile-card">
      <h2>User Profile</h2>

      <p>
        <strong>Name:</strong> {profile?.name || "Loading..."}
      </p>

      <p>
        <strong>Email:</strong> {profile?.email || "Loading..."}
      </p>

      <p>
        <strong>Role:</strong> {profile?.role || "user"}
      </p>

      <p>
        <strong>Account:</strong> Active
      </p>

      <button>
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;