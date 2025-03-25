import { Link } from "react-router-dom";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HoverRating from "./HoverRating";
import { addOne } from "../services/CartService";

function ProductItemSmall({ product }) {
  return (
    <>
      <Card sx={{ mb: 3, maxWidth: 250 }}>
        <CardMedia component="img" alt="green iguana" height="140" image="\src\assets\react.svg" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h4>{product.title}</h4>
            </Link>
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <p>Price: ${product.price}</p>
            {product.amount && <p>Amount: {product.amount}</p>} {/* Display amount if it exists */}
            {product.ratings && ( // Check if ratings exist
              <>
                <p>Reviews:</p>
                <ul>
                  {product.ratings.map((rating) => (
                    <li key={rating.id}>Rating: {rating.rating}</li>
                  ))}
                </ul>
              </>
            )}

        </Typography>
        <HoverRating ratings={product.ratings} />
      </CardContent>
      <CardActions>
      <Button size="small" onClick={() => addOne(product.id)}>
            Lägg i varukorg
          </Button>
        <Button size="small">Läs mer</Button>
      </CardActions>
    </Card>
            
        </>
    );
}

export default ProductItemSmall;
