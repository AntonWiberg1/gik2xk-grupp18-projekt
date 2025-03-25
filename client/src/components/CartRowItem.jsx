import { Box, Typography, Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
function CartRowItem({product}) {
  return ( 
  <>
   <Paper elevation={1} sx={{ p: .5, mb: 1, mr: 1 }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box><Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

        <Box
            component="img"
            src={product.imageUrl}
            alt={product.title}
            sx={{ width: 80, height: 80, objectFit: 'contain', mb: 1 }}
          />
        <Typography variant="body1">{product.title}</Typography>
        </Link>
        
        <Typography variant="body2" color="text.secondary">
          {product.price} kr x {product.amount}
        </Typography>
        </Box>
        <Button> Ta bort</Button>
      </Box>
    </Paper>
  </> );
}

export default CartRowItem;