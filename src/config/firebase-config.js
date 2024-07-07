// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf97YYtOrgnnt4uOrMo5YSz3FZsLpcR9s",
  authDomain: "expense-tracker-f3b85.firebaseapp.com",
  projectId: "expense-tracker-f3b85",
  storageBucket: "expense-tracker-f3b85.appspot.com",
  messagingSenderId: "89398659694",
  appId: "1:89398659694:web:e486314289461205c1f47f",
  measurementId: "G-SD20Q7K0KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
