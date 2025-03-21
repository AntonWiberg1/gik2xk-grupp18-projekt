function ProductItemLarge ({product}){
    return(
    <div>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
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

    </div>
    );
}
export default ProductItemLarge;