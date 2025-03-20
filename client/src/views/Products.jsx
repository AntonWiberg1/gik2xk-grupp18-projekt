import { useParams, useLocation } from "react-router-dom";

function Products() {

  console.log(useParams(), useLocation());

  return ( 
  <>  
  <h2>Products</h2>
  <p>Lista över alla produkter</p>
  </> );
}

export default Products;