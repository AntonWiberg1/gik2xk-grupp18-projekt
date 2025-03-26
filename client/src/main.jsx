import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductEdit from "./views/ProductEdit.jsx";
import ProductDetail from "./views/ProductDetail.jsx";
import Home from "./views/Home.jsx";
import Products from "./views/Products.jsx";
import Cart from "./views/Cart.jsx";
import CartList from "./components/CartList.jsx";
import {createTheme, ThemeProvider } from '@mui/material/styles';
import { blue, blueGrey, deepPurple, green, grey, orange, purple, red, teal } from '@mui/material/colors';
import { CssBaseline } from "@mui/material";


const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f3f3f3',
      paper: grey[50]
    },
    primary: {
      main: blue[700]
    },
    secondary: {
      main: blueGrey[500]
    },
    success: {
      main: teal['700']
    },
    error: {
      main: red['700']
    }
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Orbitron',
      fontSize: '3.7rem'
    },
    h2: {
      fontSize: '2.1rem',
      marginBottom: '.7em',
      color: blueGrey[800]
    },
    h3: {
      fontSize: '1.6rem'
    },
    h4: {
      fontSize: '1.3rem',
      color: blueGrey[800]
    },
    body1: { color: blueGrey[700] },
    body2: { color: blueGrey[800] }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'black',
      paper: 'black'
    },
    primary: {
      main: orange['A400']
    },
    secondary: {
      main: purple['A700']
    },
    success: { main: green['A400'] },
    error: {
      main: red['A400']
    }
  },
  typography: {
    fontFamily: '"Ubuntu", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: 'Satisfy, sans-serif',
      fontSize: '3.7rem',
      color: orange['A400']
    },
    h2: {
      fontSize: '2.1rem',
      marginBottom: '.7rem',
      color: grey[200]
    },
    h3: {
      fontSize: '1.6rem'
    },
    h4: {
      fontSize: '1.3rem',
      color: 'white'
    },
    body1: { color: grey[50] },
    body2: { color: grey[200] }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products/new",
        element: <ProductEdit />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/products/",
        element: <Products />,
      },
      {
        path: "/cart/",
        element: <Cart />,
      },
      {
        path: "/Users/:id/getCart",
        element: <CartList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={darkTheme}>
    <CssBaseline/>
    <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
