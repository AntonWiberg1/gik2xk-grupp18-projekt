import { Link } from 'react-router-dom';

function ProductItemSmall({ product }) {
    return (
        <>
            <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
            </Link>
            <p>Price: ${product.price}</p>
            {product.amount && <p>Amount: {product.amount}</p>} {/* Display amount if it exists */}
            {product.ratings && ( // Check if ratings exist
                <>
                    <p>Reviews:</p>
                    <ul>
                        {product.ratings.map(rating => (
                            <li key={rating.id}>Rating: {rating.rating}</li>
                        ))}
                    </ul>
                </>
            )}
        </>
    );
}

export default ProductItemSmall;