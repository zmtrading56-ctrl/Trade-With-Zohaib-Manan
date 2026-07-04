import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwuj1r1Ny07MYl4h8HhRo6CBiGq7B8hmA",
  authDomain: "trade-with-zohaib-manan.firebaseapp.com",
  projectId: "trade-with-zohaib-manan",
  storageBucket: "trade-with-zohaib-manan.firebasestorage.app",
  messagingSenderId: "721540541376",
  appId: "1:721540541376:web:103d0ac5c7421f3ef47625",
  measurementId: "G-18TZTGECE4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;