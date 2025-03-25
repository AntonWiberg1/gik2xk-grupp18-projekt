import { useParams, useLocation } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import { Button } from "@mui/material";
import Review from "../components/Review";
import { useEffect, useState } from "react";
import { getOne, remove } from "../services/ProductService";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';


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

  async function onDelete() {
    try {
      const response = await remove(product.id);
      navigate(-1, { replace: true, state: response });
    } catch (error) {
      alert("Något gick fel vid borttagning");
      console.error(error);
    }
  }
  


  return (
    <div>
      {product ? (
        <>
          <ProductItemLarge product={product} />
          <Button onClick={() => navigate(-1)}>Tillbaka</Button>
          <Button 
                startIcon={<DeleteIcon/>} 
                onClick={onDelete}
                variant="contained" 
                color="error">
              Ta bort 
              </Button>
          
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
