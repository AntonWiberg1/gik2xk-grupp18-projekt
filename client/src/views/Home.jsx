import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import { Grid2 } from "@mui/material";

function Home() {
  return (
    <>
      <Grid2 container spacing={2} sx={{ display: "flex", pt: "80px" }}>
        <Grid2 item xs={12} sm={6}>
          <ProductList />
        </Grid2>
      </Grid2>
    </>
  );
}

export default Home;
