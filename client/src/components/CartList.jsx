import { useEffect, useState } from "react";
import { getOne } from "../services/CartService";
import CartRowItem from "./CartRowItem";
import { List, ListItem, Typography, Paper, Divider, Box, ListItemButton, ListItemIcon } from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ListItemText from "@mui/material/ListItemText";
import { markAsPayed } from "../services/CartService";

function CartList() {
  const [cart, setCart] = useState();

  const refreshCart = () => {
    getOne(3).then((cart) => {
      if (cart) setCart(cart);
    });
  };

  useEffect(() => {
    refreshCart();
  }, []);

  if (!cart) {
    return (
      <Typography variant="h6" color="error">
        Din varukorg är tom!
      </Typography>
    );
  }

  // Jag får inte använda refresCart här av nån jävla anledning. Fick bli såhär istället
  const handlePay = async () => {
    const updatedCart = await markAsPayed(cart.id);
    setCart(updatedCart);
  };
  return (
    <Box sx={{ maxWidth: 700, margin: "auto", mt: 4 }}>
      <Paper elevation={3}>
        <List>
          {cart.products?.map((product, index) => (
            <div key={`product_${product.id}`}>
              <ListItem>
                <CartRowItem product={product} onCartChange={refreshCart} />
              </ListItem>
              {index < cart.products.length - 1 && <Divider />}
            </div>
          ))}
          <ListItemButton onClick={handlePay}>
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
