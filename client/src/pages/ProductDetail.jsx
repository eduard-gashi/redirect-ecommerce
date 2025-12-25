import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import apiClient from '../apiClient';
import ProductImages from '../components/ProductImages';
import { useCheckout } from "../context/CheckoutContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [clientSecret, setClientSecret] = useState(null);
  const { addToCart } = useContext(CartContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { openCheckout } = useCheckout();


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

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const basePath = "images/products/";
  const productImages = product.image_paths
    ? product.image_paths.map(filename => basePath + filename)
    : [];

  return (
    <div>
      <div className="product-detail-container">
        <div className="product-detail-card hover-product">
          {/* Image Box */}
          <div className="product-image-container">
            <ProductImages
              images_paths={productImages}
              onImageChange={setCurrentImageIndex}
            />
          </div>

          {/* Description, Price & add to Cart */}
          <div style={{
            flex: "1 1 0%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <h1 className="benefits-header">{product.name}</h1>

              <div style={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center', gap: '5px', paddingBottom: '10px' }}>
                <p className="product-old-price">{product.upper_price_limit}€</p>
                <p className="product-current-price">{product.price}€</p>
              </div>

              <p className="text-paragraph">
                {product.image_descriptions[currentImageIndex]}
              </p>
              <br />
            </div>

            <div style={{
              marginTop: 'auto',
              display: 'flex',
              flexDirection: 'column',
              paddingBottom: '20px',
            }}>
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
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <p className="text-bold">
                Status: {product.countInStock > 0 ? "Auf Lager" : "Nicht verfügbar"}
              </p>
              <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "10px" }}>
                <button
                  onClick={handleAddToCart}
                  className="primary-button"
                  style={{ flex: 1 }}
                >
                  In den Warenkorb
                </button>

                <button
                  onClick={() => openCheckout(product, quantity)}
                  className="primary-button"
                  style={{ flex: 1 }}
                >
                  Sofort kaufen
                </button>
              </div>
              <p style={{ marginTop: "8px", fontSize: "14px", color: "#4b5563" }}>
                Unterstützte Zahlungsarten: Kreditkarte, PayPal, Klarna, SEPA-Lastschrift, EPS, Bancontact
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
