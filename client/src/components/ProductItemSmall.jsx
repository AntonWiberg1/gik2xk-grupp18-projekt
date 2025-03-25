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
  const imageUrl = product?.imageUrl 
    ? `http://localhost:5000/images/${product.imageUrl}`
    : '/placeholder-image.png'
  console.log(`Product ID: ${product.id}`);
  console.log(`Image URL: ${imageUrl}`);
  console.log(`Product Data:`, product);
  return (
    <>
       <Card sx={{ mb: 3, maxWidth: 250 }}>
      <CardMedia 
        component="img"
        alt={product.title}
        height="140"
        image={imageUrl}
        onError={(e) => {
          console.error('Image failed to load:', e.target.src);
          e.target.src = 'https://via.placeholder.com/250x140?text=Image+Not+Found';
        }}
        sx={{ 
          objectFit: 'contain',
          backgroundColor: '#f5f5f5',
          height: 140
        }}
      />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <Link to={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
              <h4>{product.title}</h4>
            </Link>
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            <p>Price: ${product.price}</p>
            {product.amount && <p>Amount: {product.amount}</p>} {/* Display amount if it exists */}
          </Typography>
          <HoverRating ratings={product.ratings} />
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => addOne(product.id)}>
            Lägg i varukorg
          </Button>
        <Button size="small">
        <Link to={`/products/${product.id}`}> <p>Läs mer</p></Link></Button>
      </CardActions>
    </Card>
            
        </>
    );
}

export default ProductItemSmall;
