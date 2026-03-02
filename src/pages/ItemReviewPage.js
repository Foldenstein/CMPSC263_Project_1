import { useParams } from "react-router-dom";

function ItemReview() {
  const { itemName } = useParams();

  return (
    <div>
      <h1>{itemName.replace(/-/g, " ")}</h1>
      <p>This is the review page for this item.</p>
    </div>
  );
}

export default ItemReview;