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
    <RouterProvider router={router} />
  </StrictMode>
);
