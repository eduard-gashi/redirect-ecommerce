import COMPANY_DETAILS from '../../config/config';


function LegalNotice() {
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;
  
  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">
          Impressum
        </h1>

        <h2 className="datenschutz-heading2">
          Angaben gemäß § 5 TMG (Telemediengesetz)
        </h2>

        <div className="contact-box">
          <h3 className="datenschutz-heading3">Betreiber und Verantwortliche</h3>

          <p className="contact-info">
            {COMPANY_NAME}
            <br />
            {STREET}
            <br />
            {ZIP_CITY}
          </p>

          <h3 className="datenschutz-heading3" style={{ marginTop: '1.5rem' }}>Kontakt</h3>
          <p className="contact-details">
            <a href="mailto:kaishi.company@gmail.de" className="link-color">kaishi.company@gmail.de</a>
            <br />
            {PHONE}
            < br />
            < br />
            Vertretungsberechtigte Gesellschafter: Philipp Kaiser und Eduard Gashi
          </p>
        </div>

        <h2 className="datenschutz-heading2">
          Weitere Angaben (optional oder pflichtig je nach Rechtsform)
        </h2>

        <h3 className="datenschutz-heading3">Handelsregistereintrag</h3>
        <p className="datenschutz-text">
          Registergericht: {REGISTER_COURT}
          <br />
          Registernummer: {REGISTER_NUMBER}
        </p>

        <h3 className="datenschutz-heading3">Umsatzsteuer-Identifikationsnummer</h3>
        <p className="datenschutz-text">
          Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: {COMPANY_DETAILS.UST_ID} <span className="highlight-text-red">// HIER EINFÜGEN (falls vorhanden)</span>
        </p>

        <h3 className="datenschutz-heading3">Verbraucherschlichtung / OS-Plattform</h3>
        <p className="datenschutz-text">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="link-color">https://ec.europa.eu/consumers/odr/</a>.
          <br />
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </p>

      </div>
    </div>
  );
}


export default LegalNotice;