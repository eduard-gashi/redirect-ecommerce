import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router";
import { ShoppingCart, Star, TrendingUp, Package, Sparkles } from "lucide-react";
import { useCheckout } from "../../context/CheckoutContext";

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    upper_price_limit: number;
    image_paths: string[];
    image_descriptions: string[];
    rating: number;
    numReviews: number;
    countInStock: number;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}


function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const { openCheckout } = useCheckout();

  const hasDiscount = product.price && product.upper_price_limit > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price! - product.upper_price_limit) / product.price!) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/produkte/${product._id}`);
  };

  const handleImageClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLImageElement>) => {
    e.stopPropagation();
  };

  const handleBuyNowClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // verhindert Navigation durch Card-Click
    openCheckout(product, 1);
  };

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