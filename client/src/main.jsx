import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProductEdit from './views/ProductEdit.jsx';
import ProductDetail from './views/ProductDetail.jsx';
import Home from './views/Home.jsx';
import Products from './views/Products.jsx';
import Cart from './views/Cart.jsx';

const router = createBrowserRouter([
  { 
    path: '/', 
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/products/new', 
        element: <ProductEdit />
      },
      {
        path: '/products/', 
        element: <Products />
      },
      {
        path: '/products/1', 
        element: <ProductDetail />
      },
      {
        path: '/cart/', 
        element: <Cart />
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
