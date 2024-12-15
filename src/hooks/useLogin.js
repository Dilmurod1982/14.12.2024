import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppStore } from "../components/zustand";
import { useNavigate } from "react-router-dom";
import { query, collection, where, getDocs } from "firebase/firestore";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const setRol = useAppStore((state) => state.setRol);
  const setUser = useAppStore((state) => state.setUser);
  const navigate = useNavigate();

  const signIn = async (email, password) => {
    setIsPending(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser(user);

      const usersRef = collection(db, "users");

      const q = query(usersRef, where("uid", "==", user.uid));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0].data();
        const userRole = userDoc.rol;

        setRol(userRole);

        // if (userRole === "admin") {
        //   navigate("/");
        // } else if (userRole === "user") {
        //   navigate("/homeuser");
        // }
      } else {
        toast.error("Пользователь не найден");
      }

      toast.success(`Welcome, ${user.displayName}`);
      setIsPending(false);
    } catch (error) {
      const errorMessage = error.message;
      console.log(error.message);
      toast.error(errorMessage);
      setIsPending(false);
    }
  };
  return { isPending, signIn };
};
