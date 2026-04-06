import { Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../../styles/home.css';

export function ProductShowcase() {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/produkte/68cea0b7265fc9be4132d44a');
  };

  return (
    <section id="product-section" className="product-showcase-section">
      <div className="product-showcase-container">
        <div className="section-header">
          <h2 className="section-title">Die HandyDetox Box</h2>
          <p className="section-subtitle">Alles, was du für deine 30-Tage-Reise brauchst</p>
        </div>

        <div className="product-card-wrapper">
          <div className="product-card-main">
            <div className="product-image-section">
              <div className="box-visual">
                <img
                  src={`/images/products/detoxbox/01.png`}
                  alt={'Handy Detox Box'}
                  className="product-image"
                />
              </div>
            </div>

            <div className="product-content">
              <h3 className="product-name">HandyDetox Box – 30-Tage-Programm</h3>

              <div className="product-includes">
                <p className="includes-title">Das ist enthalten:</p>
                <ul className="includes-list">
                  <li>
                    <Check className="check-icon" />
                    Hochwertige Detox-Box
                  </li>
                  <li>
                    <Check className="check-icon" />
                    30 tägliche Challenge-Karten
                  </li>
                  <li>
                    <Check className="check-icon" />
                    Gewohnheitstracker
                  </li>
                  <li>
                    <Check className="check-icon" />
                    Reflexions-Notizblock
                  </li>
                </ul>
              </div>

              <div className="product-pricing">
                <div className="price-wrapper">
                  <span className="price-detail-old">24,99 €</span>

                  <span className="price-current">19,99 €</span>
                </div>
              </div>

              <button onClick={handleBuyClick} className="buy-button">
                Jetzt HandyDetox Box sichern
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
