import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.error("Fehler beim Laden:", err));
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10">Produkt wird geladen...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white hover-product border rounded-lg shadow-lg p-8 max-w-4xl mx-auto flex flex-row gap-10 transition-transform">
          {/* LINKER BEREICH */}
          <div className="flex-1 flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg max-h-[300px] object-cover"
            />
          </div>

          {/* RECHTER BEREICH */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="p-4 rounded mb-4">
              <p className="text-gray-700 leading-relaxed">
                Die Digital Detox Box hilft dir, den Kreislauf ständiger
                Smartphone-Ablenkung zu durchbrechen. Mit 30 täglichen
                Challenges, einem Reflexions-Tagebuch und inspirierenden Impulsen
                bekommst du jeden Tag einen kleinen Anstoß für mehr Achtsamkeit,
                Fokus und echte Erlebnisse. Perfekt für alle, die bewusster leben,
                produktiver werden oder einfach mehr Zeit für sich und ihre
                Liebsten haben wollen.
              </p>
            </div>

            <p className="text-xl font-semibold mb-4">€{product.price}</p>

            <div className="flex items-center gap-3 mb-6">
              <label className="font-medium">Menge</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border w-20 p-2 rounded text-center"
              />
            </div>

            <button
              onClick={() => addToCart(product, quantity)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              🛒 In den Warenkorb
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
