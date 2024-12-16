import { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import { useAppStore } from "../components/zustand";
import toast from "react-hot-toast";

function useRegLtd() {
  const setUser = useAppStore((state) => state.setUser);
  const provider = new GoogleAuthProvider();
  const collectionUsersRef = collection(db, "users");
  const [isPending, setIsPending] = useState(false);

  const registerLtd = async (
    tr,
    ltd_name,
    filial,
    moljal,
    viloyat,
    tuman,
    kocha,
    uy,
    bank_nomi,
    mfo,
    stir,
    operator
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
      setUser(user);
      setIsPending(false);
      toast.success(`Хуш келибсиз жаноб ${user.displayName}`);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
      toast.error(error.message);
    }
  };
  return { registerWithGoogle, isPending, registerEmailAndPassword };
}

export { useRegLtd };
