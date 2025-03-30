import { Link, Outlet } from "react-router-dom";
import { Box, Toolbar, Typography, Button, AppBar, CssBaseline } from "@mui/material";
import { useState } from "react";
import Cart from "./views/Cart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BackgroundIcons from "./components/BackgroundIcons";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <BackgroundIcons count={600} />

      <AppBar position="fixed" sx={{ zInex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h1" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <span style={{ color: "grey" }}>El</span>Giganormus
            </Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/" style={{ color: "white" }}>
              Våra produkter
            </Link>
          </Button>
          <Button color="inherit">
            <Link to="/products/new" style={{ color: "white" }}>
              Lägg till produkt
            </Link>
          </Button>
          <Button onClick={() => setCartOpen(true)} color="inherit">
            <ShoppingCartIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: "64px", minHeight: "calc(100vh - 64px)" }}>
        <Outlet />
      </Box>
      <Cart cartOpen={cartOpen} setCartOpen={setCartOpen} />
    </>
  );
}

export default App;
