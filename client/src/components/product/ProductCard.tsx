import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { ShoppingCart } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";
import "../../styles/home.css";
import type { Product } from "../../types/data-types";

interface ProductCardProps {
  product: Product;
  loading?: boolean;
}


function ProductCard({ product, loading = false }: ProductCardProps) {
  const navigate = useNavigate();
  const { openCheckout } = useCheckout();

  const hasDiscount =
    !loading && product.price && product.upper_price_limit > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price! - product.upper_price_limit) / product.price!) * 100)
    : 0;

  const handleCardClick = () => {
    if (loading) return;
    navigate(`/produkte/${product._id}`);
  };

  const handleBuyNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (loading) return;
    openCheckout(product, 1);
  };

  if (loading) {
    return (
      <div className="product-card product-card-loading">
        <div className="product-discount-badge" style={{ visibility: "hidden" }}>
          -00%
        </div>

        <div className="product-card-image" />

        <div className="product-card-content">
          <h3 className="product-card-name">&nbsp;</h3>

          <div className="product-card-price-section">
            <span className="product-card-price-old">&nbsp;</span>
            <span className="product-card-price-current">&nbsp;</span>
          </div>

          <button className="product-card-button" disabled>
            &nbsp;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`product-card ${!product.countInStock ? 'product-card-out-of-stock' : ''}`}
      onClick={handleCardClick}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div className="product-discount-badge">
          -{discountPercent}%
        </div>
      )}

      {/* Product Images */}
      <Link to={`/produkte/${product._id}`}>
        <img
          src={`/images/products/${product.image_paths?.[0]}`}
          alt={product.name}
          className="product-card-image"
        />
      </Link>

      {/* Product Info */}
      <div className="product-card-content">
        {/* Product Name */}
        <h3 className="product-card-name">{product.name}</h3>

        {/* Price */}
        <div className="product-card-price-section">
          {hasDiscount && (
            <span className="product-card-price-old">
              {product.upper_price_limit!.toFixed(2)} €
            </span>
          )}
          <span className="product-card-price-current">
            {product.price.toFixed(2)} €
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleBuyNowClick}
          className={`product-card-button ${!product.countInStock ? 'disabled' : ''}`}
          disabled={!product.countInStock}
        >
          <ShoppingCart className="button-icon" />
          {product.countInStock ? 'Sofort kaufen' : 'Nicht verfügbar'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;