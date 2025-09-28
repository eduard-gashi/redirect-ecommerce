import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import apiClient from '../../apiClient';


function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Error while loading the product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Produkt wird geladen...</p>;
  }

  // Adds products and navigates to checkout page
  const buyNowHandler = () => {
    addToCart(product, quantity);
    
    navigate('/checkout'); 
    
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white hover-product border rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex flex-row gap-10 transition-transform">
          {/* Image Box */}
          <div className="flex-1 flex justify-center">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="rounded-lg max-h-[300px] object-cover"
            />
          </div>

          {/* Description, Price & add to Cart */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="p-4 rounded mb-4">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <p className="text-xl font-semibold mb-4">€{product.price}</p>

            <div className="quantity-input-wrapper">
              {/* Minus Button */}
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-button"
                disabled={quantity <= 1}
              >
                –
              </button>

              {/* Input Field */}
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="quantity-input"
              />

              {/* Plus Button */}
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-button"
              >
                +
              </button>
            </div>

            <p className="font-bold mb-4">
              Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {/* PayPal Express-Checkout */}
                <button
                    onClick={buyNowHandler}
                    disabled={product.countInStock === 0}
                    className="paypal-express-button"
                >
                    <img src="/paypal-button.png" 
                         alt="PayPal Logo" />
                </button>
                {/* Add to card */}
                <button
                    onClick={() => addToCart(product, quantity)}
                    disabled={product.countInStock === 0}
                    className="add-to-cart-button"
                >
                    🛒 In den Warenkorb
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
