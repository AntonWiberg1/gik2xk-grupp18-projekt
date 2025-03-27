import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Typography, CardMedia } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HoverRating from "../components/HoverRating";
import { getOne, remove } from "../services/ProductService";
import ReviewForm from "../components/ReviewForm";
import { addOne } from "../services/CartService";

// Komponent som visas när man klickar in på en specifik produkt. Här finns möjlighet att lägga till review eller ta bort produkt. 

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => {
        if (product) {
          setProduct(product);
          setReviews(product.ratings || []);
        }
      });
    }
  }, [id]);

  const handleNewReview = (newReview) => {
    setReviews((prev) => [...prev, newReview]);
  };

  async function onDelete() {
    try {
      const response = await remove(product.id);
      navigate(-1, { replace: true, state: response });
    } catch (error) {
      alert("Något gick fel vid borttagning");
      console.error(error);
    }
  }

  return (
    <Box sx={{ boxShadow: 3, p: 3, borderRadius: 2, mt: 3, bgcolor: "background.paper" }}>
      {product ? (
        <>
          <CardMedia
            component="img"
            alt={product.title}
            height="500"
            image={`http://localhost:5000/images/${product.imageUrl}`}
            sx={{
              objectFit: "contain",
              backgroundColor: "#f5f5f5",
              mb: 2,
              borderRadius: 1,
            }}
            onError={(e) => {
              e.target.src = 'http://localhost:5000/images/placeholder.jpg';
            }}
          />
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Pris: {product.price ?? "Ej angivet"} kr
          </Typography>
          <Typography>{product.description}</Typography>

          <HoverRating ratings={reviews} onReviewSubmit={handleNewReview} />
          <ReviewForm productId={product.id} onReviewSubmit={handleNewReview} />

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
            
            <Button onClick={() => navigate(-1)} variant="contained" color="primary">
              Tillbaka
            </Button>

            <Button size="small" onClick={() => addOne(product.id)} variant="contained" color="success">
                        Lägg i varukorg
                      </Button>

            <Button startIcon={<DeleteIcon />} onClick={onDelete} variant="contained" color="error">
              Ta bort
            </Button>
          </Box>
        </>
      ) : (
        <Typography variant="h6" color="error">
          Produkt ej funnen
        </Typography>
      )}
    </Box>
  );
}

export default ProductDetail;
