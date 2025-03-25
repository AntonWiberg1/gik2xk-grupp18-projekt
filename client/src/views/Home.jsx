import ProductList from "../components/ProductList";
import CartList from "../components/CartList";
import { Grid2 } from "@mui/material";

function Home() {
  return (
    <>
      <Grid2 container spacing={2} sx={{ display: "flex" }}>
        <Grid2 item xs={12} sm={6}>
          <ProductList />
        </Grid2>
        <Grid2 item xs={12} sm={4}></Grid2>
      </Grid2>
    </>
  );
}

export default Home;
