import { useState } from "react";
import HoverRating from "./HoverRating";
import ReviewForm from "./ReviewForm";

function ProductItemLarge({ product }) {
    const [reviews, setReviews] = useState(product.ratings || []);

    const handleNewReview = (newReview) => {
        setReviews([...reviews, newReview]); // Update UI immediately
    };

    return (
        <div>
            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>


            <HoverRating ratings={reviews} />

            {reviews.length > 0 && (
                <>
                    <p>Reviews:</p>
                    <ul>
                        {reviews.map((rating) => (
                            <li key={rating.id}>
                                Rating: {rating.rating}
                            </li>
                        ))}
                    </ul>
                </>
            )}

            <ReviewForm productId={product.id} onReviewSubmit={handleNewReview} />
        </div>
    );
}

export default ProductItemLarge;
