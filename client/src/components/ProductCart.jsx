import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="bg-white hover-product border rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
      <Link to={`/produkte/${product._id}`}>
        <img
          src={`/images/products/${product.image_paths?.[0]}`}
          alt={product.name}
          className="rounded-lg mb-4 w-full h-48 object-cover"
        />
      </Link>
      <h2 className="text-xl font-bold mb-2">{product.name}</h2>
      <p className="text-lg font-semibold text-gray-800 mb-2">€{product.price}</p>
      <p className="text-sm text-gray-600 mb-4 truncate w-full">{product.description}</p>
      <Link to={`/produkte/${product._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full mt-auto">
        Details ansehen
      </Link>
    </div>
  );
}

export default ProductCard;