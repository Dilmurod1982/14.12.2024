import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export function useStationDocuments(stationId) {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!stationId) return;

    const collections = [
      // "Ik_certificate",
      "licence",
      // "nam_certificate",
      // "ng_certificate",
    ]; // Список коллекций документов
    const unsubscribes = [];

    // Асинхронное получение данных из всех коллекций
    const fetchDocuments = async () => {
      try {
        const allDocs = [];
        for (const coll of collections) {
          const collectionRef = collection(db, coll);
          const q = query(
            collectionRef,
            where("id_station", "==", stationId),
            orderBy("expired", "desc")
          );

          const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
              snapshot.docs.forEach((doc) => {
                allDocs.push({
                  id: doc.id,
                  type: coll, // Указываем тип документа на основе коллекции
                  ...doc.data(),
                });
              });

              // Обновляем состояние после получения данных
              setDocuments([...allDocs]);
            },
            (err) => setError(err.message)
          );
          unsubscribes.push(unsubscribe);
        }
        console.log(allDocs);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDocuments();

    // Очистка подписок
    return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
  }, [stationId]);

  return { documents, error };
}
