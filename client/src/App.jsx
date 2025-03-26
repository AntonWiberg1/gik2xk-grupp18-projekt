import { Link, Outlet } from "react-router-dom"
import {Box, Toolbar, Typography, Button, AppBar, CssBaseline} from '@mui/material';
import { useState } from "react";
import Cart from "./views/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
     <CssBaseline />
      <AppBar position="fixed" sx={{zInex: (theme) => theme.zIndex.drawer +1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{
          color: 'white',
          textDecoration: 'none'}}>Webshop</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/" style={{
          color: 'white',
          textDecoration: 'none'}}>Våra produkter</Link>
            </Button>
          <Button color="inherit">
            <Link to="/products/new" style={{
          color: 'white',
          textDecoration: 'none'}}>Lägg till produkt</Link>
            </Button>
            <Button onClick={() => setCartOpen(true)} color="inherit">
            <ShoppingCartIcon />   
            </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          pt: '64px', // Default AppBar height
          minHeight: 'calc(100vh - 64px)' // Full viewport minus AppBar
        }}
      >
      <Outlet />
    </Box>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  )
}

export default App
