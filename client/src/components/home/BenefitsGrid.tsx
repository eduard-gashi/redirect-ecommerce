import React from "react";
import { Focus, Heart, Clock, Users, Brain, Smile } from "lucide-react";

export function BenefitsGrid() {
  const benefits = [
    {
      icon: Focus,
      title: "Mehr Fokus im Alltag",
      description: "Die Box kann dir helfen, Ablenkungen zu reduzieren und dich auf das Wesentliche zu konzentrieren."
    },
    {
      icon: Brain,
      title: "Bewusster Umgang mit Social Media",
      description: "Unterstützt dich dabei, reflektierter mit digitalen Medien umzugehen und Gewohnheiten zu hinterfragen."
    },
    {
      icon: Clock,
      title: "Mehr Zeit für Freunde, Familie und Hobbys",
      description: "Gewinne wertvolle Stunden zurück, die du für die wichtigen Dinge im Leben nutzen kannst."
    },
    {
      icon: Users,
      title: "Unterstützung beim Aufbau neuer Routinen",
      description: "Das 30-Tage-Programm hilft dir, Schritt für Schritt positive Gewohnheiten zu etablieren."
    },
    {
      icon: Heart,
      title: "Weniger Stress, mehr Gelassenheit",
      description: "Kann zu mehr innerer Ruhe beitragen, wenn du nicht ständig erreichbar sein musst."
    },
    {
      icon: Smile,
      title: "Mehr Lebensqualität",
      description: "Erlebe, wie ein bewussterer Umgang mit dem Smartphone dein Wohlbefinden steigern kann."
    }
  ];

  return (
    <section className="benefits-grid-section">
      <div className="benefits-grid-container">
        <div className="section-header">
          <h2 className="section-title">Was kann die HandyDetox Box für dich tun?</h2>
          <p className="section-subtitle">
            Mögliche Vorteile einer bewussteren Smartphone-Nutzung
          </p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon-wrapper">
                <benefit.icon className="benefit-icon" />
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}