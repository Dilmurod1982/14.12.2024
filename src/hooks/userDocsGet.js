import { collection } from "firebase/firestore";

export const userDocsGet = ({collectionName})=>{
    useEffect(() => {
        const q = query(collection(db, "ik_certificate"));
        onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.docs.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
          });
          setData(users);
          console.log(users);
        });
      }, []);
}