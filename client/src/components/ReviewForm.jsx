import { useState } from "react";
import { Box, Button, TextField, Rating } from "@mui/material";

function ReviewForm({ productId, onReviewSubmit }) {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const handleSubmit = async () => {
        if (!rating || !review.trim()) {
            alert("Please provide both a rating and a review.");
            return;
        }

        const newReview = {
            id: Date.now(), // Temporary unique ID (replace with backend ID)
            rating,
            review,
        };

        try {
            await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ productId, ...newReview }),
            });

            onReviewSubmit(newReview);
            setRating(0);
            setReview("");
        } catch (error) {
            console.error("Error submitting review", error);
        }
    };

    return (
        <Box>
            <div>
                Add rating:  
                {/* This Rating component is for user input */}
                <Rating 
                    value={rating} 
                    precision={0.5} 
                    onChange={(e, newValue) => setRating(newValue)} 
                />
            </div>
            <div>
                Review:  
                <TextField 
                    value={review} 
                    onChange={(e) => setReview(e.target.value)} 
                    multiline 
                    rows={3} 
                    fullWidth 
                />
            </div>
            <Button onClick={handleSubmit} variant="contained">Lämna recension</Button>
        </Box>
    );
}

export default ReviewForm;
