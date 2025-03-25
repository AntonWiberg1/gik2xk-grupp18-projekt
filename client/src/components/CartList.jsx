import { useEffect, useState } from "react";
import { getOne } from "../services/CartService";
import CartRowItem from "./CartRowItem";
import { List, ListItem, Typography, Paper, Divider, Box, ListItemButton, ListItemIcon } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ListItemText from "@mui/material/ListItemText";
import { markAsPayed } from "../services/CartService";

function CartList() {
  const [cart, setCart] = useState();

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
          <ListItemButton onClick={() => markAsPayed(cart.id)}>
            <ListItemIcon>
              <ShoppingBagIcon />
            </ListItemIcon>
            <ListItemText primary="Checkout" />
          </ListItemButton>
        </List>
      </Paper>
    </Box>
  );
}

export default CartList;
