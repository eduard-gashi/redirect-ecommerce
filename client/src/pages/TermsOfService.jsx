import { useEffect, useRef, useState } from 'react';
import COMPANY_DETAILS from '../../config/config';

function TermsOfService() {
  const [loading, setLoading] = useState(true);
  const legaltextRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
    script.async = true;
    document.body.appendChild(script);

    // Set Styling
    const observer = new MutationObserver(() => {
      if (legaltextRef.current && legaltextRef.current.innerHTML.trim() !== '') {
        legaltextRef.current.querySelectorAll('h2').forEach(el => el.classList.add('datenschutz-heading2'));
        legaltextRef.current.querySelectorAll('p').forEach(el => el.classList.add('datenschutz-text'));
        setLoading(false);
        observer.disconnect();
      }
    });

    if (legaltextRef.current) {
      observer.observe(legaltextRef.current, { childList: true, subtree: true });
    }

    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">Allgemeine Geschäftsbedingungen</h1>
        {loading && (
          <div className="loading-indicator" style={{ textAlign: "center", margin: "2rem" }}>
            <span>AGB werden geladen...</span>
            <div className="spinner" />
          </div>
        )}
        {/* Drittnutzer-Widget-Text */}
        <div
          ref={legaltextRef}
          className="itrk-legaltext"
          data-itrk-legaltext-url="https://itrk.legal/1tey.2Y.12eh-iframe.html"
          style={{ display: loading ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
}

export default TermsOfService;
