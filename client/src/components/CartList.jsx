import CartRowItem from './CartRowItem';
import ProductItemSmall from './ProductItemSmall';

function CartList() {
    const carts = [
        {
            "id": 12,
            "payed": false,
            "user_id": 1,
            "products": [
                {
                    "id": 1,
                    "title": "Laptop",
                    "description": "A high-performance laptop",
                    "price": 1200.99,
                    "imageUrl": "laptop.jpg",
                    "amount": 112
                },
                {
                    "id": 2,
                    "title": "Headphones",
                    "description": "Noise-cancelling headphones",
                    "price": 199.99,
                    "imageUrl": "headphones.jpg",
                    "amount": 2
                }
            ]
        }
    ];

    return (
        <>
        <ul >
            {carts?.length > 0 ? (
                carts.map(cart => (
                    <li key={`carts_${cart.id}`}>
                        <h3>Cart ID: {cart.id}</h3>
                        <ul>
                            {cart.products.map(product => (
                                <li key={`product_${product.id}`}>
                                    <CartRowItem product={product} />
                                </li>
                            ))}
                        </ul>
                    </li>
                ))
            ) : (
                <h3>Kunde inte hämta korg</h3>
            )}
        </ul>
        </>
    );
}

export default CartList;