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

function useRegister() {
  const setUser = useAppStore((state) => state.setUser);
  const provider = new GoogleAuthProvider();
  const collectionUsersRef = collection(db, "users");
  const [isPending, setIsPending] = useState(false);

  const registerWithGoogle = async () => {
    setIsPending(true);
    try {
      const popup = await signInWithPopup(auth, provider);
      const user = popup.user;
      setUser(user);
      const q = query(collectionUsersRef, where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collectionUsersRef, {
          uid: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
          authProvider: popup?.providerId,
        });
      }
      //   const provider = new GoogleAuthProvider();
      //   const result = await signInWithPopup(auth, provider);
      //   const user = result.user;
      toast.success(`Хуш келибсиз жаноб ${user?.displayName}`);
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setIsPending(false);
    }
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

export { useRegister };
