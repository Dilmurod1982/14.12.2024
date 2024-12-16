import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import toast from "react-hot-toast";

function useRegisterNewUser() {
  const collectionUsersRef = collection(db, "users");
  const [isPending, setIsPending] = useState(false);
  const signOutProfile = async () => {
    await signOut(auth);
    toast.success("Қўришгунча хайр!");
  };

  const registerEmailAndPassword = async (
    displayName,
    email,
    password,
    rol,
    tel
  ) => {
    setIsPending(true);
    try {
      const register = createUserWithEmailAndPassword(auth, email, password);
      const user = (await register).user;
      await updateProfile(auth.currentUser, { displayName });
      await addDoc(collectionUsersRef, {
        uid: user.uid,
        name: user?.displayName,

        providerId: "email/password",
        email: user.email,
        rol: rol,
        tel: tel,
      });

      setIsPending(false);
      toast.success(`Хуш келибсиз жаноб ${user.displayName}`);
      signOutProfile();
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
      toast.error(error.message);
    }
  };
  return { isPending, registerEmailAndPassword };
}

export { useRegisterNewUser };
