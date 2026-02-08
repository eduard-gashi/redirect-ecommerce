import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoPlayerWithThumbnail } from "../components/VideoPlayerWithThumbnail";
import BenefitsSection from "../components/BenefitsSection";
import TutorialVideo from "../components/TutorialVideo";
import "../App.css";
import apiClient from '../apiClient';
import { Product } from "../types/data-types";


function Home() {
  const [products, setProducts] = useState<Array<Product>>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiClient.get('/products');
        setProducts(data);
        console.log("Fetched products:", data);
      }
      catch (err) {
        console.error("Error while loading the products:", err);
      }
    };
    fetchProducts();
  }, []); // Runs once the component mounts

  return (
    <div className="home-container">

      {/* Video Section */}
      <section className="video-section">
        <div className="video-wrapper">
          <VideoPlayerWithThumbnail></VideoPlayerWithThumbnail>
        </div>
      </section>

      <div className="home-view">
        {/* Product Container */}
        <div className="product-list-container">
          {products.length > 0 ? (
            products.map((p) => (
              <Link
                to={`/produkte/${p._id}`}
                key={p._id}
                className="product-card"
              >
                <img
                  src={`/images/products/${p.image_paths?.[0]}`}
                  alt={p.name}
                  className="product-card-image"
                />
                <h2 className="benefits-header">{p.name}</h2>

                <div className="product-price-box">
                  <p className="product-old-price">{p.upper_price_limit}€</p>
                  <p className="product-current-price">{p.price}€</p>
                </div>

                <div className="product-button-margin">
                  <button className="primary-button">
                    Jetzt Detox starten!
                  </button>
                </div>
              </Link>
            ))
          ) : (
            <p className="loading-text">Produkte werden geladen...</p>
          )}
        </div>

        {/* Benefits Section */}
        <BenefitsSection />

      </div>
      <div className="video-wrapper">
        <TutorialVideo />
      </div>

    </div >
  );
}

export default Home;
