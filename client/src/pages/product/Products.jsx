import { useEffect, useState } from 'react';
import apiClient from '../../apiClient.jsx';
import ProductCard from '../../components/product/ProductCard.tsx';

function Products() {
    const [products, setProducts] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await apiClient.get('/products');
                setProducts(data);
                console.log("Found the following products in the database", data);
            } catch (err) {
                console.error("Error while loading the products:", err);
            }
        };
        fetchProducts();
    }, []);

    const DUMMY_PRODUCT = {
        _id: "loading",
        name: "",
        price: 0,
        upper_price_limit: 0,
        image_paths: [""],
        image_descriptions: [""],
        rating: 0,
        numReviews: 0,
        countInStock: 0,
    };

    const SKELETON_COUNT = 1;

    return (
        <div className="products-view">
            {/* Header */}
            <div className="product-header-container">
                <h1 className="product-title">Unsere Produkte</h1>
            </div>

            {/* Product Grid */}
            <div className="product-grid-wrapper">
                <div className="product-grid">
                    {!products
                        ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                            <ProductCard key={i} product={DUMMY_PRODUCT} loading />
                        ))
                        : products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Products;