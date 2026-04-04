import React, { useEffect, useState } from "react";
import { Shield, ChevronRight, Home } from "lucide-react";
import { useNavigate } from "react-router";

interface LegalSection {
  id: string;
  title: string;
}

interface LegalLayoutProps {
  title: string;
  subtitle: string;
  sections: LegalSection[];
  children: React.ReactNode;
  loading?: boolean;
}

export function LegalLayout({ title, subtitle, sections, children, loading = false }: LegalLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);

      const scrollPosition = window.scrollY + 200;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="legal-page">
      {/* Hero Header */}
      <div className="legal-hero">
        <div className="legal-hero-content">
          {/* Breadcrumb */}
          <div className="legal-breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home className="breadcrumb-icon" />
              Home
            </button>
            <ChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-current">{title}</span>
          </div>

          {/* Title */}
          <div className="legal-hero-title-section">
            <div className="legal-badge">
              <Shield className="badge-icon" />
            </div>
            <h1 className="legal-hero-title">{title}</h1>
            <p className="legal-hero-subtitle">{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="legal-main">
        <div className="legal-container">
          {/* Table of Contents - Desktop Only */}
          {sections.length > 0 && (
            <aside className="legal-toc">
              <div className="legal-toc-card">
                <h3 className="legal-toc-title">Inhaltsverzeichnis</h3>
                <nav className="legal-toc-nav">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`legal-toc-item ${activeSection === section.id ? 'active' : ''}`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Content */}
          <main className="legal-content">
            {loading ? (
              <div className="legal-loading-state">
                <div className="legal-spinner"></div>
                <p className="legal-loading-text">Rechtliche Informationen werden geladen...</p>
                <div className="legal-skeleton">
                  <div className="skeleton-heading"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line short"></div>
                  <div className="skeleton-heading"></div>
                  <div className="skeleton-line"></div>
                  <div className="skeleton-line"></div>
                </div>
              </div>
            ) : (
              <div className="legal-content-wrapper">
                {children}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer Callout */}
      <div className="legal-footer-callout">
        <div className="legal-footer-content">
          <h3 className="legal-footer-title">Fragen zu unseren rechtlichen Informationen?</h3>
          <p className="legal-footer-text">
            Bei Fragen zu Datenschutz, Impressum oder unseren Geschäftsbedingungen kontaktiere uns gerne.
          </p>
          <button onClick={() => navigate("/kontakt")} className="legal-footer-button">
            Kontakt aufnehmen
          </button>
        </div>
      </div>
    </div>
  );
}
