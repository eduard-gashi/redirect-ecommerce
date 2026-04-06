import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, CreditCard, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import apiClient from '../../apiClient';
import ProductImages from '../../components/product/ProductImages';
import { useCheckout } from '../../context/CheckoutContext';
import { useMediaQuery } from 'react-responsive';
import type { Product } from '../../types/data-types.ts';

function ProductDetail() {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addToCart } = useCart();
  const { openCheckout } = useCheckout();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await apiClient.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error('Error while loading the product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return; // type guard
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    if (!product) return;
    openCheckout(product, quantity);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  if (loading || !product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-nav">
          <button onClick={() => navigate('/produkte')} className="back-button">
            <ArrowLeft className="w-5 h-5" />
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    );
  }

  const basePath = 'images/products/';
  const productImages = product.image_paths
    ? product.image_paths.map((filename) => basePath + filename)
    : [];

  const includes: string[] =
    product.includes && product.includes.length > 0
      ? product.includes
      : [
          'Hochwertige Detox-Box',
          '30 tägliche Challenge-Karten',
          'Reflexions-Notizblock',
          'Gewohnheitstracker',
        ];

  const available = product.countInStock > 0;

  return (
    <div className="product-detail-page">
      {/* Back Navigation */}
      <div className="product-detail-nav">
        <button onClick={() => navigate('/produkte')} className="back-button">
          <ArrowLeft className="w-5 h-5" />
          Zurück zur Übersicht
        </button>
      </div>

      <div className="product-detail-container">
        {/* Left Column - Image Gallery and description */}
        {!isMobile && (
          <div className="product-gallery">
            <div className="gallery-main-image">
              <div className="main-image-display">
                <ProductImages images_paths={productImages} onImageChange={setCurrentImageIndex} />
              </div>
            </div>
            {/* Description */}
            <div className="product-description">
              <p>{product.image_descriptions?.[currentImageIndex]}</p>
            </div>
          </div>
        )}

        {/* Right Column - Product Info */}
        <div className="product-info">
          <div className="product-header-block">
            <h1 className="product-detail-name">{product.name}</h1>

            {isMobile && (
              <div className="product-gallery">
                <div className="gallery-main-image">
                  <div className="main-image-display">
                    <ProductImages
                      images_paths={productImages}
                      onImageChange={setCurrentImageIndex}
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="product-detail-pricing">
              <div className="price-display">
                {product.upper_price_limit && (
                  <span className="price-detail-old">{product.upper_price_limit.toFixed(2)} €</span>
                )}
                <span className="price-detail-current">{product.price.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="product-availability">
            <div className={`availability-badge ${available ? 'in-stock' : 'out-of-stock'}`}>
              <span className="availability-dot"></span>
              Status: {available ? 'Auf Lager' : 'Nicht verfügbar'}
            </div>
          </div>

          {/* What's Included */}
          <div className="product-includes-section">
            <h3 className="includes-section-title">Das ist enthalten:</h3>
            <ul className="includes-detail-list">
              {includes.map((item, index) => (
                <li key={index}>
                  <Check className="includes-check-icon" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Selector */}
          <div className="quantity-selector">
            <label className="quantity-label">Menge:</label>
            <div className="quantity-controls">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="quantity-button"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value || '1', 10) || 1))}
                className="quantity-input"
                min={1}
              />
              <button onClick={() => handleQuantityChange(1)} className="quantity-button">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="product-actions">
            <button
              onClick={handleAddToCart}
              className="action-button primary"
              disabled={!available}
            >
              <ShoppingCart className="w-5 h-5" />
              In den Warenkorb
            </button>
            <button
              onClick={handleBuyNow}
              className="action-button secondary"
              disabled={!available}
            >
              <CreditCard className="w-5 h-5" />
              Sofort kaufen
            </button>
          </div>

          {/* Payment Methods */}
          <div className="payment-methods">
            <p className="payment-methods-title">Unterstützte Zahlungsarten:</p>
            <p className="payment-methods-list">
              Kreditkarte, PayPal, Klarna, SEPA-Lastschrift, EPS, Bancontact
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
