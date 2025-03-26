import { useParams, useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import { Box } from "@mui/material";

function Products() {
  console.log(useParams(), useLocation());
  const location = useLocation();
  return( 
  <Box sx={{mt: 10}}> 
  <ProductList pathname={location.pathname}></ProductList>;
  </Box>
)}

export default Products;
