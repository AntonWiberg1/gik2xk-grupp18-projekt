import ProductList from "../components/ProductList";
import CartList from "../components/CartList"
import {Grid} from '@mui/material';

function Home() {

  return (
    <>
    <Grid container spacing = {2}>
      <Grid item xs ={12} sm={8}>
      <ProductList />
      </Grid>
      <Grid item xs ={12} sm={4}>
        <CartList />
        
      </Grid>
    </Grid>
    </>
);

}

export default Home;