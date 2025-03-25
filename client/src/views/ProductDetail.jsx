import { useParams, useLocation } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import { Button } from "@mui/material";
import Review from "../components/Review";
import { useEffect, useState } from "react";
import { getOne } from "../services/ProductService";
import { useNavigate } from "react-router-dom";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);


  useEffect(() => {
    if (id) {
      getOne(id).then((product) => {
        if (product) {
          setProduct(product);
        }
      });
    }
  }, [id]);

  const navigate = useNavigate();

  return (
    <div>
      {product ? (
        <>
          <ProductItemLarge product={product} />
          <Button onClick={() => navigate(-1)}>Tillbaka</Button>
          
          {product.reviews?.map((review, i) => (
            <Review key={`review${i}`} review={review} />
          ))}
        </>
      ) : (
        <h3>Produkt ej funnen</h3>
      )}
    </div>
  );
}

export default ProductDetail;
