import { Link } from 'react-router-dom';
import { useCheckout } from "../context/CheckoutContext";


function ProductCard({ product }) {
  const { openCheckout } = useCheckout();

  return (
    <div className="product-card">
      <Link to={`/produkte/${product._id}`}>
        <img
          src={`/images/products/${product.image_paths?.[0]}`}
          alt={product.name}
          className="product-card-image"
        />
      </Link>

      <h2 className="title-black">{product.name}</h2>
      <div className="product-price-box" style={{ paddingBottom: '30px' }}>
        <p className="product-old-price">{product.upper_price_limit}€</p>
        <p className="product-current-price">{product.price}€</p>
      </div>

      <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "10px" }}>
        <Link to={`/produkte/${product._id}`}
          className="primary-button"
          style={{ flex: 1 }}
        >
          Details anzeigen
        </Link>

        <button
          onClick={() => openCheckout(product, 1)}
          className="primary-button"
          style={{ flex: 1 }}
        >
          Sofort kaufen
        </button>
      </div>
    </div>
  );
}

export default ProductCard;