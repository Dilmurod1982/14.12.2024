import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC13vDp-TAJtVaDG3LOUajxL3H4C5rO3QA",
  authDomain: "agnks-d236d.firebaseapp.com",
  projectId: "agnks-d236d",
  storageBucket: "agnks-d236d.firebasestorage.app",
  messagingSenderId: "429227536495",
  appId: "1:429227536495:web:c96987baa603c482279d9a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
