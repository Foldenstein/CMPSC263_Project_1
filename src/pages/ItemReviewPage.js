import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db, auth } from "./firebase.js"; 
import { collection, query, where, doc, getDocs, getDoc, setDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import './ItemReviewPage.css'

function ItemReview() {
    const { itemName } = useParams();
    // replace all - with a space
    const displayItemName = itemName.replace(/-/g, " ");

    // state checkers for the correlated database, current user, and new review
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    
    // rating system
    const [rating, setRating] = useState(5);

    // get current user;s info
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    // find all reviews for the menu item
    const fetchReviews = async () => {
        try {
            const reviewsRef = collection(db, "review");
            // query for the database to find all records with the current menuItem name and order it by newest to oldest
            const q = query(
                reviewsRef, 
                where("menuItem", "==", displayItemName),
                orderBy("dateMade", "desc")
            );
            const querySnapshot = await getDocs(q);
            const reviewsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReviews(reviewsList);
        } catch (error) {
            alert("Fetching review error")
        }
    };

    // use when itemName changese
    useEffect(() => {
        fetchReviews();
    }, [itemName]);

    // adding new review
    const handleAddReview = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            return alert("Must be log in to leave a review");
        }
        try {
            // fetch user info from userdb database
            const userDocRef = doc(db, "userdb", currentUser.uid);
            const userDoc = await getDoc(userDocRef);
            
            // needed to put in user username into review
            let username = userDoc.data().username;

            // unique id base on user id and the menu item. important for replacement
            const customDocId = `${currentUser.uid}_${itemName}`;
            // allows for replacement
            await setDoc(doc(db, "review", customDocId), {
                userId: currentUser.uid,
                username: username,
                review: newReview,
                rating: Number(rating),
                menuItem: displayItemName,
                dateMade: serverTimestamp()
            });
            // clear text box for new review
            setNewReview("");
            // display new reivew along with old
            fetchReviews();
        } catch (error) {
            alert("Error when adding reviews");
        }
    }

    return (
        <div>
            <h1>Review for {displayItemName}</h1>
            <div className="add-review">
                <form onSubmit={handleAddReview}>
                    <div>
                        <h3><b>Rating: </b></h3>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="5">★★★★★</option>
                            <option value="4">★★★★</option>
                            <option value="3">★★★</option>
                            <option value="2">★★</option>
                            <option value="1">★</option>
                        </select>
                    </div>
                    <textarea value={newReview} onChange={(e) => setNewReview(e.target.value)} placeholder="What are your thoughts about this item" required/>
                    <button type="submit">Submit Review</button>
                </form>
            </div>
            <div className="review-list">
                <h3>Customer Reviews</h3>
                {reviews.length > 0 ? (reviews.map((rev) => (
                    <div className="customer-review">
                        <p><b>Username: {rev.username}</b> <small>({rev.dateMade?.toDate().toLocaleDateString()})</small></p>
                        <p>Rating: {"★".repeat(rev.rating)}</p>
                        <p>{rev.review}</p>
                    </div>
                ))) : (<p>No Reviews Currently</p>)}
            </div>
        </div>
    );
}

export default ItemReview;