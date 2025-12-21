import React, { useState, useEffect } from 'react';

function CookieConsentBanner() {
  const [consentStatus, setConsentStatus] = useState(null);

  // Check on component mount if consent has already been given
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      setConsentStatus(savedConsent);
    } else {
      setConsentStatus('pending'); // Show banner if no consent is saved
    }
  }, []);


  useEffect(() => {
    if (consentStatus === "granted") {
      // Enable Google Analytics
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
      // Optional: page_view senden
      window.gtag?.("event", "page_view");
    }
    if (consentStatus === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  }, [consentStatus]);

  const handleAccept = () => {
    setConsentStatus('granted');
    localStorage.setItem('cookieConsent', 'granted');  // Able to track data with Google Analytics
    console.log('User accepted cookies. Consent: granted');
  };

  const handleDecline = () => {
    setConsentStatus('denied');
    localStorage.setItem('cookieConsent', 'denied');  // No tracking with Google Analytics
    console.log('User declined cookies. Consent: denied');
  };

  // Do not render the banner if consent is not pending
  if (consentStatus !== 'pending') {
    return null;
  }

  return (
    <div className="cookie-banner-container">
      <div className="cookie-banner-content">
        <p className="cookie-banner-text">
          Wir verwenden Cookies, um die einwandfreie Funktion unserer Website zu gewährleisten,
          Ihnen das bestmögliche Surferlebnis zu bieten und unsere Dienste zu verbessern.
          Durch die Nutzung unserer Website stimmen Sie der Verwendung von Cookies zu.
          Weitere Informationen finden Sie in unserer <a href="/datenschutz" className="cookie-link">Datenschutzerklärung</a>.
        </p>
        <div className="cookie-banner-buttons">
          <button onClick={handleAccept} className="cookie-button accept">
            Alle akzeptieren
          </button>
          <button onClick={handleDecline} className="cookie-button decline">
            Ablehnen
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieConsentBanner;