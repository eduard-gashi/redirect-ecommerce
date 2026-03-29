import React from "react";
import { Smartphone, BookOpen, Users, TrendingDown } from "lucide-react";

export function ImpactStats() {
  const facts = [
    {
      icon: Smartphone,
      title: "Unterschätzte Nutzung",
      description: "Viele Menschen verbringen täglich mehrere Stunden am Smartphone – oft mehr, als sie vermuten.",
      source: "Quelle: JIM-Studie 2023",
      color: "blue"
    },
    {
      icon: TrendingDown,
      title: "Stress & Wohlbefinden",
      description: "Studien zeigen: Weniger Smartphone-Zeit kann Stress senken und das Wohlbefinden verbessern.",
      source: "Quelle: Studie der Donau-Universität Krems",
      color: "green"
    },
    {
      icon: Users,
      title: "Phone-Life-Balance",
      description: "Viele Nutzer wünschen sich eine bessere Balance zwischen digitaler und realer Welt.",
      source: "Quelle: Digital Wellbeing Report",
      color: "purple"
    }
  ];

  return (
    <section className="impact-stats-section">
      <div className="impact-stats-container">
        <div className="section-header">
          <h2 className="section-title">Warum weniger Bildschirmzeit?</h2>
          <p className="section-subtitle">
            Fakten über unsere Smartphone-Nutzung
          </p>
        </div>

        <div className="facts-grid">
          {facts.map((fact, index) => (
            <div key={index} className={`fact-card fact-${fact.color}`}>
              <div className="fact-icon-wrapper">
                <fact.icon className="fact-icon-large" />
              </div>
              <h3 className="fact-title">{fact.title}</h3>
              <p className="fact-description">{fact.description}</p>
              <p className="fact-source">{fact.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}