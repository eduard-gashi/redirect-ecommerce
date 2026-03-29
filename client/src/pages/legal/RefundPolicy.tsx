import { useEffect, useRef, useState } from 'react';

function RefundPolicy() {
  const [loading, setLoading] = useState(true);
  const legaltextRef = useRef < HTMLDivElement | null > (null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
    script.async = true;
    document.body.appendChild(script);
    console.log("APPENDED SCRIPT");

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

    console.log("HAHA");
    console.log(legaltextRef);
    return () => {
      document.body.removeChild(script);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">Widerrufsbelehrung</h1>
        <div>
          {loading && (
            <div className="loading-indicator" style={{ textAlign: "center", margin: "2rem" }}>
              <span>Widerrufsbelehrung wird geladen...</span>
              <div className="spinner" />
            </div>
          )}
          <div
            ref={legaltextRef}
            className="itrk-legaltext"
            data-itrk-legaltext-url="https://itrk.legal/1tey.2J.12eh-iframe.html"
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;