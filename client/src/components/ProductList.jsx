import ProductItemSmall from "./ProductItemSmall";
import { getAll } from "../services/ProductService";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Grid2 } from "@mui/material";

// komponent för att visa samtliga produkter i menyn "Våra produkter"


function ProductList({ pathname }) {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAll(pathname).then((products) => {
      setProducts(products);
    });
  }, [pathname]);

  return (
    <Grid2 container spacing={2}>
      {products?.length > 0 ? (
        products.map((product) => (
          <Grid2 item xs={12} sm={6} md={4} key={`products_${product.id}`}>
            <ProductItemSmall product={product} />
          </Grid2>
        ))
      ) : (
        <h3> Kunde inte hämta inlägg </h3>
      )}
    </Grid2>
  );
}

export default ProductList;
