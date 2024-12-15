import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
} from "firebase/firestore";

export const useCollection = (collectionName) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const q = query(collection(db, collectionName));
    onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.docs.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setData(users);
    });
  }, [collectionName]);
  return { data };
};
