import { Link, Outlet } from "react-router-dom"
import {Box, Toolbar, Typography, Button, AppBar} from '@mui/material';

function App() {


  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Webshop</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/products/new">Lägg till produkt</Link>
            </Button>
        </Toolbar>
      </AppBar>
    </Box>
      <Outlet />
    </>
  )
}

export default App
