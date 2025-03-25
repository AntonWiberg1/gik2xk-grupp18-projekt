import { Box, Typography, Paper } from "@mui/material";

function CartRowItem({product}) {
  return ( 
  <>
   <Paper elevation={1} sx={{ p: 0.3, mb: 0.5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="body1">{product.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price} kr x {product.amount}
        </Typography>
      </Box>
    </Paper>
  </> );
}

export default CartRowItem;