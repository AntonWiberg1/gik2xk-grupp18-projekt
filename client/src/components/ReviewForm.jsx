import { useState } from "react";
import { Box, Button, TextField, Rating } from "@mui/material";
import { addRating } from "../services/ProductService";

function ReviewForm({ productId, onReviewSubmit }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState(""); 

  const handleSubmit = async () => {
    if (!rating) {
      alert("Var god ange ett betyg.");
      return;
    }

    const newReview = { rating }; 

    console.log("skapar betyg:", newReview); 

    try {
      const savedReview = await addRating(productId, newReview);
      console.log("API Response:", savedReview); 

      if (savedReview) {
        onReviewSubmit(savedReview);
        setRating(0);
        setReview(""); 
      } else {
        console.error("Kunde inte spara recensionen.");
      }
    } catch (error) {
      console.error("Error vid skapande av recension:", error);
    }
  };

  return (
    <Box>
      <div>
        Add rating:
        <Rating value={rating} precision={0.5} onChange={(e, newValue) => setRating(newValue)} />
      </div>

      <Button onClick={handleSubmit} variant="contained">
        Lämna recension
      </Button>
    </Box>
  );
}

export default ReviewForm;
