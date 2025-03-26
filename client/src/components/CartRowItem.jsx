import { Box, Typography, Paper, Button, CardMedia } from "@mui/material";
import { removeOne, addOne } from "../services/CartService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function CartRowItem({ product: cartProduct, onCartChange }) {  // Renamed prop internally
  const handleAdd = async () => {
    await addOne(cartProduct.id);
    onCartChange();
  };

  const handleRemove = async () => {
    await removeOne(cartProduct.id);
    onCartChange();
  };

  // Safely access product details (works with both cart row and full product objects)
  const productData = cartProduct.product || cartProduct;
  const imageUrl = productData.image_url || productData.imageUrl;

  return (
    <Paper elevation={1} sx={{ p: 0.5, mb: 1, mr: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" alignItems="center">
          {/* Product Image */}
          <Box sx={{ width: 80, height: 80, mr: 2, flexShrink: 0 }}>
            <CardMedia
              component="img"
              alt={productData.title}
              image={imageUrl ? `http://localhost:5000/images/${imageUrl}` : ''}
              sx={{ 
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: '#f5f5f5',
                borderRadius: 1
              }}
              onError={(e) => {
                e.target.src = 'http://localhost:5000/images/placeholder.jpg';
              }}
            />
          </Box>
          
          {/* Product Info */}
          <Box>
            <Typography variant="body1">{productData.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {productData.price} kr x {cartProduct.amount || 1}
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Box display="flex">
          <Button onClick={handleRemove}>
            <RemoveCircleIcon />
          </Button>
          <Button onClick={handleAdd}>
            <AddCircleIcon />
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default CartRowItem;