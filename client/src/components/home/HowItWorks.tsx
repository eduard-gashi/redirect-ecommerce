import React from 'react';
import { Eye, Calendar, TrendingUp } from 'lucide-react';
import TutorialVideo from '../TutorialVideo';

export function HowItWorks() {
  const steps = [
    {
      icon: Eye,
      number: 1,
      title: 'Erkenne deine aktuelle Handy-Gewohnheit',
      description:
        'Werde dir bewusst, wie viel Zeit du wirklich am Smartphone verbringst und welche Muster dahinterstecken.',
    },
    {
      icon: Calendar,
      number: 2,
      title: 'Nutze die HandyDetox Box mit klaren Tagesritualen',
      description:
        'Etabliere neue Gewohnheiten mit den täglichen Challenges und der physischen Box als Symbol deines Commitments.',
    },
    {
      icon: TrendingUp,
      number: 3,
      title: 'Gewinne Schritt für Schritt deine Zeit zurück',
      description:
        'Tracke deine Fortschritte und erlebe, wie du mehr Fokus, Zeit und Lebensqualität gewinnst.',
    },
  ];

  const scrollToProduct = () => {
    const element = document.getElementById('product-section');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        <div className="section-header">
          <h2 className="section-title">So funktioniert's</h2>
          <p className="section-subtitle">
            Dein Weg zu bewussterem Smartphone-Konsum in 3 Schritten
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{String(step.number).padStart(2, '0')}</div>
              <div className="step-icon-wrapper">
                <step.icon className="step-icon" />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          ))}
        </div>

        <TutorialVideo></TutorialVideo>

        <div className="details-cta-wrapper">
          <button onClick={scrollToProduct} className="details-cta">
            Details zum Programm ansehen
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
