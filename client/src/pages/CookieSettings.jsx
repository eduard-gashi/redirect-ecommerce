import React, { useState, useEffect } from 'react';

function CookieSettings() {
    const [consentStatus, setConsentStatus] = useState('pending');
    const [categories, setCategories] = useState({
        necessary: true,      // Immer aktiv (technisch notwendig)
        analytics: false,     // Opt-in
        marketing: false,     // Opt-in
    });
    const [showSuccess, setShowSuccess] = useState(false);

    // Initial load aus localStorage
    useEffect(() => {
        const savedConsent = localStorage.getItem('cookieConsent');
        const savedCategories = localStorage.getItem('cookieCategories');

        if (savedConsent) {
            setConsentStatus(savedConsent);
        }

        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    // GA Consent updaten bei Änderungen
    useEffect(() => {
        if (window.gtag) {
            const analyticsGranted = categories.analytics ? 'granted' : 'denied';
            window.gtag('consent', 'update', {
                analytics_storage: analyticsGranted,
                ad_storage: categories.marketing ? 'granted' : 'denied',
                ad_user_data: categories.marketing ? 'granted' : 'denied',
                ad_personalization: categories.marketing ? 'granted' : 'denied'
            });

            // Page view nur wenn Analytics erlaubt
            if (categories.analytics) {
                window.gtag('event', 'page_view');
            }
        }

        // Alles persistieren
        localStorage.setItem('cookieConsent', consentStatus);
        localStorage.setItem('cookieCategories', JSON.stringify(categories));
    }, [categories, consentStatus]);

    const updateCategory = (category, enabled) => {
        setCategories(prev => ({ ...prev, [category]: enabled }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleAllAccept = () => {
        setCategories({ necessary: true, analytics: true, marketing: true });
        setConsentStatus('granted');
    };

    const handleAllDecline = () => {
        setCategories({ necessary: true, analytics: false, marketing: false });
        setConsentStatus('denied');
    };

    return (
        <div className="cookie-settings-page">
            <div className="cookie-settings-container">
                {/* Header */}
                <div className="cookie-header">
                    <h1 className="title-black">🍪 Cookie-Einstellungen</h1>
                    <p className="text-paragraph">Verwalten Sie hier Ihre Cookie-Präferenzen</p>
                </div>

                {/* Categories */}
                <div className="cookie-categories">
                    <div className="cookie-category">
                        <div className="category-info">
                            <h3>📋 Notwendige Cookies</h3>
                            <p>Warenkorb, Login, Sicherheit – immer aktiv</p>
                        </div>
                        <div className="category-toggle">
                            <span className="toggle-status active">Aktiv</span>
                        </div>
                    </div>

                    <div className="cookie-category">
                        <div className="category-info">
                            <h3>📊 Analyse Cookies</h3>
                            <p>Google Analytics – Nutzerverhalten analysieren</p>
                        </div>
                        <div className="category-toggle">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={categories.analytics}
                                    onChange={(e) => updateCategory('analytics', e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                            <span className={`toggle-status ${categories.analytics ? 'active' : 'inactive'}`}>
                                {categories.analytics ? 'Aktiv' : 'Inaktiv'}
                            </span>
                        </div>
                    </div>

                    <div className="cookie-category">
                        <div className="category-info">
                            <h3>📈 Marketing Cookies</h3>
                            <p>Personalisierte Werbung, Retargeting</p>
                        </div>
                        <div className="category-toggle">
                            <label className="toggle-switch">
                                <input
                                    type="checkbox"
                                    checked={categories.marketing}
                                    onChange={(e) => updateCategory('marketing', e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                            <span className={`toggle-status ${categories.marketing ? 'active' : 'inactive'}`}>
                                {categories.marketing ? 'Aktiv' : 'Inaktiv'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="cookie-actions">
                    <button className="cookie-button decline" onClick={handleAllDecline}>
                        ❌ Alle ablehnen
                    </button>
                    <button className="cookie-button accept" onClick={handleAllAccept}>
                        ✅ Alle akzeptieren
                    </button>

                </div>


                {/* Success Message */}
                {showSuccess && (
                    <div className="success-message">
                        ✅ Einstellungen gespeichert!
                    </div>
                )}

                {/* Footer Info */}
                <div className="cookie-footer">
                    <p>
                        <a href="/datenschutz">Datenschutzerklärung</a> |
                        Änderungen wirken sofort
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CookieSettings;
