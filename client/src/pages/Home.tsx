import React, { useState, useEffect } from "react";
import { ArrowRight, Clock, TrendingDown, Heart, Target, CheckCircle2, Star, Smartphone, Brain, Users } from "lucide-react";
import { ImpactStats } from "../components/home/ImpactStats";
import { ProblemSection } from "../components/home/ProblemSection";
import { BenefitsGrid } from "../components/home/BenefitsGrid";
import { HowItWorks } from "../components/home/HowItWorks";
import { ProductShowcase } from "../components/home/ProductShowcase";
import "../styles/home.css";

export function Home() {
  const [screenTime, setScreenTime] = useState(0);

  const scrollToProduct = () => {
    const element = document.getElementById("product-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    let start = 0;
    const end = 5;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setScreenTime(end);
        clearInterval(timer);
      } else {
        setScreenTime(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="detox-home">
      {/* Hero Section - Sofortiger Impact */}
      <section className="hero-section">
        <div className="hero-gradient"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Du scrollst <span className="highlight-text">{screenTime.toFixed(1)} Stunden</span> täglich?
          </h1>

          <p className="hero-subtitle">
            Das sind über <strong>76 Tage pro Jahr</strong> – Zeit, die du für deine Träume,
            Beziehungen und Gesundheit nutzen könntest.
          </p>

          <div className="hero-cta-group">
            <button onClick={scrollToProduct} className="cta-primary">
              Jetzt Freiheit zurückholen
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="cta-secondary">
              So funktioniert's
            </button>
          </div>
        </div>

        {/* Hero Visual - Neutrale Handy-Illustration */}
        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="notification-bar"></div>

              <div className="screen-time-widget">
                <Smartphone className="widget-icon" />
                <p className="widget-title">Bildschirmzeit heute</p>
                <div className="time-bar-container">
                  <div className="time-bar-fill"></div>
                </div>
                <p className="widget-label">Beispielansicht</p>
              </div>

              <div className="app-grid">
                <div className="app-icon-small red"></div>
                <div className="app-icon-small blue"></div>
                <div className="app-icon-small green"></div>
                <div className="app-icon-small yellow"></div>
                <div className="app-icon-small purple"></div>
                <div className="app-icon-small orange"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fakten- und Problembeschreibung - Seriös, studienbasiert */}
      <ImpactStats />

      {/* Problem Section - Emotional ansprechen */}
      <ProblemSection />

      {/* How It Works - 3 Schritte */}
      <HowItWorks />

      {/* Benefits - Was die Box bietet */}
      <BenefitsGrid />

      {/* Product Showcase - Kaufen */}
      <ProductShowcase />

      {/* Final CTA Section */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2 className="final-cta-title">
            Bereit für eine bewusstere Handy-Nutzung?
          </h2>
          <p className="final-cta-subtitle">
            Starte heute deine 30-Tage-Reise zu mehr Fokus und Freiheit.
          </p>
          <button onClick={scrollToProduct} className="cta-primary large">
            Jetzt Handy Detox starten!
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;