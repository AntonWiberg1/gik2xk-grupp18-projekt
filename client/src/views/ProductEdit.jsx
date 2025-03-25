import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOne } from "../services/ProductService";

function ProductEdit() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      getOne(id).then((product) => setProduct(product));
    } else {
      setProduct(null);
    }
  }, [id]);
  console.log(product);
  return <h2>ProductEdit</h2>;
}

export default ProductEdit;
