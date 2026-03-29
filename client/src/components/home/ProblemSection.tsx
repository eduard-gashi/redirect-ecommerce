import React from "react";
import { AlertCircle, Frown, BrainCog, HeartCrack } from "lucide-react";

export function ProblemSection() {
  const problems = [
    {
      icon: BrainCog,
      title: "Konzentrationsprobleme",
      description: "Du kannst dich kaum noch auf eine Sache fokussieren, ohne ständig zum Handy zu greifen."
    },
    {
      icon: HeartCrack,
      title: "Schlechtes Gewissen",
      description: "Jeden Abend nimmst du dir vor, weniger zu scrollen – und versagst am nächsten Tag wieder."
    },
    {
      icon: Frown,
      title: "FOMO & Vergleiche",
      description: "Social Media lässt dich unzufrieden fühlen, weil alle anderen scheinbar besser leben."
    },
    {
      icon: AlertCircle,
      title: "Verlorene Zeit",
      description: "Du weißt, dass dein Leben an dir vorbeizieht – aber du kannst nicht aufhören."
    }
  ];

  return (
    <section className="problem-section">
      <div className="problem-container">
        <div className="problem-header">
          <span className="problem-badge">Das Problem</span>
          <h2 className="problem-title">
            Kennst du diese Momente?
          </h2>
          <p className="problem-subtitle">
            Du bist nicht allein. Millionen Menschen kämpfen täglich mit ihrer Handysucht.
          </p>
        </div>

        <div className="problems-grid">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <div className="problem-icon-wrapper">
                <problem.icon className="problem-icon" />
              </div>
              <h3 className="problem-card-title">{problem.title}</h3>
              <p className="problem-card-text">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
