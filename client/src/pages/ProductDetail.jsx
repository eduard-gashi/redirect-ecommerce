import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import apiClient from '../apiClient';
import { AuthContext } from '../context/AuthContext';
import EmbeddedCheckout from '../components/EmbeddedCheckout';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { state, dispatch } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);


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


  useEffect(() => {
    console.log("Fetching checkout session for product:", product, "quantity:", quantity);
    if (!product) return;
    const fetchClientSecret = async () => {
      try {
        const { data } = await apiClient.post(
          "/stripe/create-checkout-session",
          { product, quantity }
        );
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error("Error fetching checkout session:", err);
      }
    };

    fetchClientSecret();
  }, [product, quantity]);


  if (!product) {
    return <p className="text-center mt-10">Produkt wird geladen...</p>;
  }


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
          <div style={{ flex: "1 1 0%" }}>
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

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="text-bold">
                Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
              </p>
              <button onClick={() => setShowCheckout(true)} className="primary-button">
                Jetzt bezahlen
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stripe Checkout */}
      {showCheckout && clientSecret && (
        <div className="checkout-overlay">
          <div className="checkout-modal">
            <button className="checkout-close" onClick={() => setShowCheckout(false)}>
              ×
            </button>
            <EmbeddedCheckout clientSecret={clientSecret} />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
