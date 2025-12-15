import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoPlayerWithThumbnail } from "../components/VideoPlayerWithThumbnail";
import "../App.css";
import apiClient from '../apiClient';

function Home() {
  const [products, setProducts] = useState([]);

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

      {/* Product Container */}
      <main className="product-list-container">
        {products.length > 0 ? (
          products.map((p) => (
            <Link
              to={`/produkte/${p._id}`}
              key={p._id}
              className="hover-product product-card"
            >
              <img
                src={`/images/products/${p.image_paths?.[0]}`}
                alt={p.name}
                className="product-card-image"
              />
              <h2 className="title-black">{p.name}</h2>

              {/* Replaced inline styles */}
              <div className="product-price-box">
                <p className="product-old-price">{p.upper_price_limit}€</p>
                <p className="product-current-price">{p.price}€</p>
              </div>

              {/* Replaced inline styles */}
              <div className="product-button-margin">
                <button className="primary-button">
                  Jetzt Kaufen!
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="loading-text">Produkte werden geladen...</p>
        )}

        {/* Information Container */}
        {/* Information Container 1 (Default: Image Left, Text Right) */}
        <div className="info-card">
          <div className="info-card-half">
            <img
              src="/distraction.jpg"
              alt="Beispiel"
              className="info-card-image"
            />
          </div>
          <div className="info-card-half info-card-content">
            <h2 className="title-black">Ablenkungen...</h2>
            <p className="text-paragraph">
              Wir leben in einer Welt permanenter Reize und Ablenkungen. Ständig werden wir von unnötigen Dingen abgelenkt, die uns davon abhalten, unsere Träume zu verfolgen und unsere Ziele zu erreichen. Besonders heute – in Zeiten endlosen Entertainments und sozialer Medien – ist es einfacher denn je, den Fokus zu verlieren und stundenlang durch Feeds zu scrollen, ohne wirklich erfüllt zu sein.
            </p>
          </div>
        </div>

        {/* Information Container 2 (Reversed: Text Left, Image Right) */}
        <div className="info-card info-card-reverse">
          <div className="info-card-half">
            <img src="focus.jpg" alt="Bild 1" className="info-card-image" />
          </div>
          <div className="info-card-half info-card-content">
            <h2 className="title-black">Fokus und Klarheit</h2>
            <p className="text-paragraph">
              Die Handy-Detox-Box gibt dir 30 Tage, um deine Smartphone-Nutzung bewusst wahrzunehmen und Schritt für Schritt zu reduzieren.
              Mit 30 täglichen Challenges bekommst du jeden Tag einen kleinen Impuls, um deine Gewohnheiten zu hinterfragen und alternative, erfüllende Aktivitäten auszuprobieren.
              Unser Ziel: Dir helfen, Klarheit zu gewinnen, dich wieder auf das Wesentliche zu konzentrieren und gesunde Routinen zu entwickeln, die dein Leben langfristig bereichern.</p>
          </div>
        </div>
      </main>
    </div >

  );
}

export default Home;
