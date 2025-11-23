import { useEffect } from "react";
import COMPANY_DETAILS from '../../config/config';


function LegalNotice() {
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.it-recht-kanzlei.de/js/itrk-legaltext.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">
          Impressum
        </h1>
        <h2 className="datenschutz-heading2">
          Angaben gemäß § 5 TMG (Telemediengesetz)
        </h2>
        <div>
          <div data-itrk-legaltext-url="https://itrk.legal/1tey.0.12eh-iframe.html"></div>
          <script src="https://www.it-recht-kanzlei.de/js/itrk-legaltext.js"></script>
        </div>
      </div>
    </div>
  );
}


export default LegalNotice;