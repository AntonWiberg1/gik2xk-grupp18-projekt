import ProductItemSmall from "./ProductItemSmall";
import { getAll } from "../services/CartService";
import { getOne } from "../services/CartService";
import { useEffect, useState } from "react";
import CartRowItem from "./CartRowItem";

function CartList() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    getOne(3).then((cart) => {
      if (cart) setCart(cart);
    });
  }, []);

  return (
    <ul>
      {cart ? (
        <li key={`cart_${cart.id}`}>
          <h3>Cart ID: {cart.id}</h3>
          <ul>
            {cart.products?.map((product) => (
              <li key={`product_${product.id}`}>
                <CartRowItem product={product} />
              </li>
            ))}
          </ul>
        </li>
      ) : (
        <h3>Kunde inte hämta korg</h3>
      )}
    </ul>
  );
}

export default CartList;
