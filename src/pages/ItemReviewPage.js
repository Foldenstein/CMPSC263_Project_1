import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "./firebase.js"; 
import { collection, query, limit, getDocs } from "firebase/firestore";

function ItemReview() {
  const { itemName } = useParams();
  const [firstUser, setFirstUser] = useState(null);

  useEffect(() => {
    const fetchFirstUser = async () => {
      try {
        const usersRef = collection(db, "user");
        const q = query(usersRef, limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setFirstUser(querySnapshot.docs[0].data());
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchFirstUser();
  }, []);

  return (
    <div>
      <h1>Review: {itemName.replace(/-/g, " ")}</h1>
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
        <h3>First User in Database:</h3>
        {firstUser ? (
          <ul>
            <li><strong>Username:</strong> {firstUser.username}</li>
            <li><strong>Email:</strong> {firstUser.email}</li>
          </ul>
        ) : (
          <p>No data</p>
        )}
      </div>
    </div>
  );
}

export default ItemReview;