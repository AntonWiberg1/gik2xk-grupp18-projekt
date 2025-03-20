function ProductItemSmall ({product}){
    return<>
        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Reviews:</p>
                        <ul>
                            {product.ratings.map(rating => (
                                <li key={rating.id}>Rating: {rating.rating}</li>
                            ))}
                        </ul>
    </>;
}
export default ProductItemSmall;