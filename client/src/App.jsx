import { Link, Outlet } from "react-router-dom"
import {Box, Toolbar, Typography, Button, AppBar} from '@mui/material';
import { useState } from "react";
import Cart from "./views/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Webshop</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/">Våra produkter</Link>
            </Button>
          <Button color="inherit">
            <Link to="/products/new">Lägg till produkt</Link>
            </Button>
            <Button onClick={() => setCartOpen(true)} color="inherit">
            <ShoppingCartIcon />   
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet />
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  )
}

export default App
