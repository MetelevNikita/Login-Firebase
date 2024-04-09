
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBu-ymPnSZhlZ9R2S8fKPOVBFwuwPKtUI4",
  authDomain: "test-auth-406e9.firebaseapp.com",
  projectId: "test-auth-406e9",
  storageBucket: "test-auth-406e9.appspot.com",
  messagingSenderId: "836809393856",
  appId: "1:836809393856:web:7dce4fb2b97b059b294f25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
export const dbFirebase = getFirestore(app);

