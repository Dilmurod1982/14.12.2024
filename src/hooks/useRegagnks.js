import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig";
import { useAppStore } from "../components/zustand";

const user = useAppStore((state) => state.user);
const setUser = useAppStore((state) => state.setUser);
const provider = new GoogleAuthProvider();
const signInWithGoogle = () => {};
