import { Box } from '@mui/material';
import ProductItemSmall from './ProductItemSmall';

function ProductList (){
    const products = [
            {
                "id": 1,
                "title": "Laptop",
                "description": "A high-performance laptop",
                "imageUrl": "laptop.jpg",
                "createdAt": "2025-03-19T13:01:01.000Z",
                "updatedAt": "2025-03-19T13:01:01.000Z",
                "price": 1200.99,
                "ratings": [
                    {
                        "id": 6,
                        "rating": 5,
                        "productId": 1
                    },
                    {
                        "id": 4,
                        "rating": 3.9,
                        "productId": 1
                    },
                    {
                        "id": 1,
                        "rating": 4.5,
                        "productId": 1
                    }
                ]
            },
            {
                "id": 2,
                "title": "Headphones",
                "description": "Noise-cancelling headphones",
                "imageUrl": "headphones.jpg",
                "createdAt": "2025-03-19T13:01:01.000Z",
                "updatedAt": "2025-03-19T13:01:01.000Z",
                "price": 199.99,
                "ratings": [
                    {
                        "id": 5,
                        "rating": 4.2,
                        "productId": 2
                    },
                    {
                        "id": 2,
                        "rating": 4,
                        "productId": 2
                    }
                ]
            },
            {
                "id": 3,
                "title": "Smartphone",
                "description": "Latest model smartphone",
                "imageUrl": "smartphone.jpg",
                "createdAt": "2025-03-19T13:01:01.000Z",
                "updatedAt": "2025-03-19T13:01:01.000Z",
                "price": 799.99,
                "ratings": [
                    {
                        "id": 3,
                        "rating": 4.8,
                        "productId": 3
                    }
                ]
            }
        ]
    

        return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            <ul >
                {products?.length > 0 ? 
                products.map((product =>(
                    <li key ={`products_${product.id}`}>
                        <ProductItemSmall product = {product} />
                    </li>
                ))
                ) : (
                    <h3> Kunde inte hämta inlägg </h3>
                )} 
                
            </ul>
            </Box>
        );
}

export default ProductList;