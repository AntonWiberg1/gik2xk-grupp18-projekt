import { useEffect, useState } from "react";
import { getOne } from "../services/CartService";
import CartRowItem from "./CartRowItem";
import {
  List,
  ListItem,
  Typography,
  Paper,
  Divider,
  Box,
} from "@mui/material";

function CartList() {
  const [cart, setCart] = useState(7);

  useEffect(() => {
    getOne(3).then((cart) => {
      if (cart) setCart(cart);
    });
  }, []);

  if (!cart) {
    return (
      <Typography variant="h6" color="error">
        Din varukorg är tom!
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 700, margin: "auto", mt: 4 }}>
      <Paper elevation={3}>
        <List>
          {cart.products?.map((product, index) => (
            <div key={`product_${product.id}`}>
              <ListItem>
                <CartRowItem product={product} />
              </ListItem>
              {index < cart.products.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default CartList;
