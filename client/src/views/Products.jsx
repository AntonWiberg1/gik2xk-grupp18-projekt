import { useParams, useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import { Grid2 } from "@mui/material";

function Products() {
  console.log(useParams(), useLocation());
  const location = useLocation();
  return (
    <>
      <Grid2 container spacing={2} sx={{ display: "flex", pt: "80px" }}>
        <Grid2 item xs={12} sm={6}>
          <ProductList pathname={location.pathname} />
        </Grid2>
      </Grid2>
    </>
  );
}

export default Products;
