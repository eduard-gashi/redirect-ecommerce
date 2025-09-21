import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { VideoPlayerWithThumbnail } from "../components/VideoPlayerWithThumbnail";
import "../App.css";

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
    <div className="bg-gray-100 min-h-screen flex flex-col justify-between">

      <div style={{ display: "none" }} className="relative h-[500px] w-full overflow-hidden shadow-xl">
        <img
          src="/Smartphone-Sucht.jpeg"
          alt="Handy Detox Box"
          className="h-full w-full object-cover"
          style={{ objectPosition: "50% 20%" }}
        />
        <div className="fly-in-container absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="fly-in-text text-white text-4xl md:text-5xl font-bold text-center px-4">
            Weniger Bildschirmzeit. Mehr Kontrolle.
          </h1>
        </div>
      </div>

      <section style={{ backgroundImage: "url('focus.jpg')", padding: '40px 0' }}>
        <div style={{ display: "flex", justifyContent: "center", margin: "40px", boxShadow: "15px" }}>
          <VideoPlayerWithThumbnail></VideoPlayerWithThumbnail>
        </div>
      </section>

      {/* Product Container */}
      <main className="container mx-auto px-4 py-12 flex flex-col items-center">
        {products.length > 0 ? (
          products.map((p) => (
            <Link
              to={`/products/${p._id}`} // Route to the detail page of the specific product
              key={p._id}
              className="hover-product bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center mb-6 transition block"
            >
              <img
                src={p.image}
                alt={p.name}
                className="mx-auto mb-6 rounded h-64 object-cover"
              />
              <h2 className="text-3xl font-bold mb-4">{p.name}</h2>
              <div style={{ display: "flex", gap: "20px", justifyContent: "center", alignItems: "center" }}>
                <p style={{ color: "gray", textDecorationLine: "line-through", fontSize: "18px" }}>{p.upper_price_limit}€</p>
                <p style={{ fontSize: "24px" }}>{p.price}€</p>
              </div>
              <div>
                <button style={{ marginTop: "15px" }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Jetzt Kaufen!
                </button>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-600 text-lg">Produkte werden geladen...</p>
        )}


        {/* Information Container */}
        <div className="flex bg-gray-50 w-3/4 gap-8 items-start my-10 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-200">
          <div className="w-1/2">
            <img
              src="/distraction.jpg"
              alt="Beispiel"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="w-1/2 pt-6 px-10">
            <h2 className="text-3xl font-bold mb-4 font-sans">Ablenkungen...</h2>
            <p className="text-gray-700 leading-relaxed">
              Wir leben in einer Welt permanenter Reize und Ablenkungen. Ständig werden wir von unnötigen Dingen abgelenkt, die uns davon abhalten, unsere Träume zu verfolgen und unsere Ziele zu erreichen. Besonders heute – in Zeiten endlosen Entertainments und sozialer Medien – ist es einfacher denn je, den Fokus zu verlieren und stundenlang durch Feeds zu scrollen, ohne wirklich erfüllt zu sein.
            </p>
          </div>
        </div>
        <div className="flex bg-gray-50 w-3/4 gap-8 flex-row-reverse items-start my-10 shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-200">
          <div className="w-1/2">
            <img src="focus.jpg" alt="Bild 1" />
          </div>
          <div className="w-1/2 pt-6 px-10">
            <h2 className="text-3xl font-bold mb-4 font-sans">Fokus und Klarheit</h2>
            <p className="text-gray-700 leading-relaxed">
              Die Handy-Detox-Box gibt dir 30 Tage, um deine Smartphone-Nutzung bewusst wahrzunehmen und Schritt für Schritt zu reduzieren.
              Mit 30 täglichen Challenges bekommst du jeden Tag einen kleinen Impuls, um deine Gewohnheiten zu hinterfragen und alternative, erfüllende Aktivitäten auszuprobieren.
              Unser Ziel: Dir helfen, Klarheit zu gewinnen, dich wieder auf das Wesentliche zu konzentrieren und gesunde Routinen zu entwickeln, die dein Leben langfristig bereichern.</p>
          </div>
        </div>

      </main>
    </div>

  );
}

export default Home;
