import React from "react";
import { Package, Sparkles } from "lucide-react";

export function SolutionSection() {
  return (
    <section className="solution-section">
      <div className="solution-container">
        <div className="solution-content">
          <span className="solution-badge">
            <Sparkles className="w-4 h-4" />
            Die Lösung
          </span>
          
          <h2 className="solution-title">
            Die HandyDetox Box – Dein 30-Tage-Programm für echte Veränderung
          </h2>
          
          <p className="solution-text">
            Keine App, kein kompliziertes System. Nur eine einfache Box mit allem, 
            was du brauchst, um deine Handysucht zu überwinden und neue, 
            positive Gewohnheiten aufzubauen.
          </p>

          <div className="solution-features">
            <div className="solution-feature">
              <div className="feature-number">01</div>
              <div>
                <h4 className="feature-title">Physische Barriere</h4>
                <p className="feature-text">
                  Lege dein Handy abends in die Box – schaffe bewussten Abstand.
                </p>
              </div>
            </div>

            <div className="solution-feature">
              <div className="feature-number">02</div>
              <div>
                <h4 className="feature-title">Tägliche Challenges</h4>
                <p className="feature-text">
                  30 durchdachte Aufgaben füllen deine Zeit mit Sport, Kreativität und echten Verbindungen.
                </p>
              </div>
            </div>

            <div className="solution-feature">
              <div className="feature-number">03</div>
              <div>
                <h4 className="feature-title">Reflexion & Tracking</h4>
                <p className="feature-text">
                  Notizblock und Gewohnheitstracker helfen dir, neue Routinen nachhaltig zu etablieren.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="solution-visual">
          <div className="box-showcase">
            <Package className="box-icon" />
            <div className="box-glow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
