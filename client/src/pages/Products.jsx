import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
import ProductCard from '../components/ProductCart';
import '../App.css';

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

    if (!products) {
        return <p className="text-center mt-10">Produkte werden geladen...</p>;
    }

    return (
        <div className="products-view">
            
            {/* Header */}
            <div className="product-header-container">
                <h1 className="product-title">Unsere Produkte</h1>
            </div>

            {/* Product Grid */}
            <div className="product-grid-wrapper">
                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Products;