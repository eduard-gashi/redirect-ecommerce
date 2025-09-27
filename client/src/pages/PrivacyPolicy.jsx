import React from 'react';
import { Link } from 'react-router-dom';
import COMPANY_DETAILS from '../../config/config';

function PrivacyPolicy() {
  // Destructure the company details for easier access
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;

  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">
          Datenschutzerklärung
        </h1>

        <p className="datenschutz-text datenschutz-margin-bottom">
          Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TTDSG). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.
        </p>

        {/* 1. Name und Kontaktdaten des Verantwortlichen */}
        <h2 className="datenschutz-heading2">
          1. Name und Kontaktdaten des Verantwortlichen
        </h2>
        <p className="datenschutz-text datenschutz-margin-bottom">
          Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:
        </p>
        <div className="contact-box">
          <p className="contact-info">
            {COMPANY_NAME}
            <br />
            {STREET}
            <br />
            {ZIP_CITY}
          </p>
          <p className="contact-details">
            E-Mail: <a href={`mailto:${EMAIL}`} className="link-color">{EMAIL}</a>
            <br />
            Telefon: {PHONE}
          </p>
        </div>


        {/* 2. Allgemeines zur Datenverarbeitung */}
        <h2 className="datenschutz-heading2">
          2. Allgemeines zur Datenverarbeitung
        </h2>
        <h3 className="datenschutz-heading3">2.1 Rechtsgrundlagen der Datenverarbeitung</h3>
        <p className="datenschutz-text">
          Soweit wir für Verarbeitungsvorgänge personenbezogener Daten eine Einwilligung der betroffenen Person einholen, dient Art. 6 Abs. 1 lit. a DSGVO als Rechtsgrundlage. Bei der Verarbeitung von personenbezogenen Daten, die zur Erfüllung eines Vertrages, dessen Vertragspartei die betroffene Person ist, erforderlich ist, dient Art. 6 Abs. 1 lit. b DSGVO als Rechtsgrundlage. Dies gilt auch für Verarbeitungsvorgänge, die zur Durchführung vorvertraglicher Maßnahmen erforderlich sind.
        </p>
        
        <h3 className="datenschutz-heading3">2.2 Datenlöschung und Speicherdauer</h3>
        <p className="datenschutz-text">
          Die personenbezogenen Daten der betroffenen Person werden gelöscht oder gesperrt, sobald der Zweck der Speicherung entfällt. Eine Speicherung kann darüber hinaus erfolgen, wenn dies durch den europäischen oder nationalen Gesetzgeber in unionsrechtlichen Verordnungen, Gesetzen oder sonstigen Vorschriften, denen der Verantwortliche unterliegt, vorgesehen wurde. Eine Sperrung oder Löschung der Daten erfolgt auch dann, wenn eine durch die genannten Normen vorgeschriebene Speicherfrist abläuft, es sei denn, dass eine Erforderlichkeit zur weiteren Speicherung der Daten für einen Vertragsabschluss oder eine Vertragserfüllung besteht.
        </p>

        {/* 3. Hosting und Server-Logfiles */}
        <h2 className="datenschutz-heading2">
          3. Hosting und Server-Logfiles (Vercel)
        </h2>
        <p className="datenschutz-text">
          Die Website wird bei dem Anbieter **Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA** gehostet. Vercel verarbeitet die Logfiles im Rahmen unseres berechtigten Interesses an einer sicheren und stabilen Bereitstellung unseres Onlineangebots (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
        <p className="datenschutz-text">
          	Im Zuge der Nutzung der Website werden automatisch Informationen in sogenannten **Server-Logfiles** gespeichert, die Ihr Browser automatisch an Vercel übermittelt.
        </p>
        <ul className="logfiles-list">
          <li>Browsertyp und Browserversion</li>
          <li>verwendetes Betriebssystem</li>
          <li>Referrer URL</li>
          <li>Hostname des zugreifenden Rechners</li>
          <li>Uhrzeit der Serveranfrage</li>
          <li>**IP-Adresse**</li>
        </ul>
        <p className="datenschutz-text datenschutz-margin-bottom">
          Diese Daten werden ausschließlich zur Sicherstellung eines reibungslosen Betriebs der Website sowie zur Verbesserung unseres Angebotes verwendet. Weitere Informationen zum Datenschutz von Vercel finden Sie in der Datenschutzerklärung des Anbieters.
        </p>

        {/* 4. Hier müssten weitere Abschnitte (Warenkorb, Bezahlung, Rechte) folgen */}
        <h2 className="datenschutz-heading2">4. Wichtiger Hinweis zur Vollständigkeit</h2>
        <p className="highlight-text-red">
          	**ACHTUNG:** Dies ist ein **MUSTER**. Für einen E-Commerce-Shop fehlen noch wichtige Abschnitte wie: **Datenverarbeitung beim Kaufvertrag** (Adresse, Name), **Zahlungsdienstleister** (Stripe/PayPal etc.) und die **Betroffenenrechte** nach DSGVO. Bitte unbedingt einen professionellen Generator oder Anwalt konsultieren.
        </p>

      </div>
    </div>
  );
}

export default PrivacyPolicy;
