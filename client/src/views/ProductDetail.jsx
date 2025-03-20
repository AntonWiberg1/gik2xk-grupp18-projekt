import { Button } from "@mui/material";
import ProductItemLarge from '../components/ProductItemLarge'
import {useNavigate} from 'react-router-dom';
import ReviewForm from "../components/ReviewForm";
import Review from '../components/Review'

function ProductDetail() {
  const product ={
    
      "id": 1,
      "title": "Laptop",
      "description": "A high-performance laptop",
      "imageUrl": "laptop.jpg",
      "createdAt": "2025-03-19T13:01:01.000Z",
      "updatedAt": "2025-03-19T13:01:01.000Z",
      "price": 1200.99,
      "ratings": [
          {
              "id": 1,
              "rating": 4.5,
              "productId": 1
          },
          {
              "id": 4,
              "rating": 3.9,
              "productId": 1
          },
          {
              "id": 6,
              "rating": 5,
              "productId": 1
          }
      ]
  
  };
  const navigate = useNavigate();
  return (
  <div>
    <ProductItemLarge product = {product} />
    <Button onClick ={() => navigate (-1)}> Tillbaka </Button>
    <ReviewForm/>
    {product.reviews && product.reviews.map((review, i) => <Review key ={`review${i}`}
    review = {review}/>)}
  </div>
  );

}

export default ProductDetail;