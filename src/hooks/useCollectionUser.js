import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useCollectionUser(collectionName, filter) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    let q = collectionRef;

    // Если фильтр передан, добавляем `where` к запросу
    if (filter) {
      q = query(
        collectionRef,
        where(filter.field, "array-contains", filter.value)
      );
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const documents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(documents);
      },
      (err) => {
        setError(err.message);
      }
    );

    return () => unsubscribe();
  }, [collectionName, filter]);

  return { data, error };
}
