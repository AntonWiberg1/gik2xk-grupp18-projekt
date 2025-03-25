import { Box, Typography, Paper, Button } from "@mui/material";
import { removeOne, addOne } from "../services/CartService";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

// product här är inte en product utan det är en cartRow eftersom att vi kan komma åt product.amount
function CartRowItem({ product, onCartChange }) {
  const handleAdd = async () => {
    await addOne(product.id);
    onCartChange();
  };

  const handleRemove = async () => {
    await removeOne(product.id);
    onCartChange();
  };

  return (
    <>
      <Paper elevation={1} sx={{ p: 0.5, mb: 1, mr: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Box component="img" src={product.imageUrl} alt={product.title} sx={{ width: 80, height: 80, objectFit: "contain", mb: 1 }} />
            <Typography variant="body1">{product.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price} kr x {product.amount}
            </Typography>
          </Box>

          <Button onClick={handleAdd}>
            <AddCircleIcon></AddCircleIcon>
          </Button>
          <Button onClick={handleRemove}>
            <RemoveCircleIcon></RemoveCircleIcon>
          </Button>
        </Box>
      </Paper>
    </>
  );
}

export default CartRowItem;
