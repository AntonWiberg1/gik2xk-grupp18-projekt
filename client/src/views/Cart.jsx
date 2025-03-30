import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartList from "../components/CartList";

// View för att visa varukorgen, Använder drawer från MUI för en snyggare design och importerar cartlist-komponenten

// Styr om drawer ska vara öppen eller stängd
export default function Cart({ cartOpen, setCartOpen }) {
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setCartOpen(open);
  };

  const cartContent = (
    <Box sx={{ width: 400 }} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Varukorg" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <CartList />
      <Divider />
    </Box>
  );

  return (
    <Drawer anchor="right" open={cartOpen} onClose={toggleDrawer(false)}>
      {cartContent}
    </Drawer>
  );
}
