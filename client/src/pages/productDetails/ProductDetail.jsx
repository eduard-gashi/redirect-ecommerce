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
    <div>
      <div className="product-detail-container">
        <div className="product-detail-card hover-product">
          {/* Image Box */}
          <div className="product-image-container">
            <img
              src={`/${product.image}`}
              alt={product.name}
              className="product-image"
            />
          </div>

          {/* Description, Price & add to Cart */}
          <div style={{flex: "1 1 0%"}}>
            <h1 className="title-black">{product.name}</h1>

            <p className="text-paragraph">
              {product.description}
            </p>
            <br />
            <p className="text-bold">€{product.price}</p>
            <br />
            
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

            <br />

            <p className="text-bold">
              Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
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
