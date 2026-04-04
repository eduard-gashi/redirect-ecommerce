import { LegalTextPage } from './LegalTextPage';

const sections = [
  { id: 'einleitung', title: '1. Einleitung' },
  { id: 'datenerfassung', title: '2. Datenerfassung' },
  { id: 'hosting', title: '3. Hosting & Content-Delivery-Network' },
  { id: 'cookies', title: '4. Cookies' },
  { id: 'kontaktaufnahme', title: '5. Kontaktaufnahme' },
  { id: 'datenverarbeitung', title: '6. Datenverarbietung bei Eröffung eines Kundenkontos' },
  { id: 'nutzung_von_kundendaten', title: '7. Nutzung von Kundendaten zur Direktwerbung' },
  { id: 'datenverarbeitung', title: '8. Datenverarbeitung zur Bestellabwicklung' },
  { id: 'webanalysedienste', title: '9. Webanalysedienste' },
  { id: 'seitenfunktionalitaeten', title: '10. Seitenfunktionalitäten' },
  { id: 'tools_und_settings', title: '11. Tools und Settings' },
  { id: 'rechte_des_betroffenen', title: '12. Rechte des Betroffenen' },
  { id: 'dauer_speicherung_daten', title: '13. Dauer der Speicherung personenbezogener Daten' },
];

function PrivacyPolicy() {
  return (
    <LegalTextPage
      sections={sections}
      legalUrl="https://itrk.legal/1tey.8U.12eh-iframe.html"
      extractH1AsTitle={true}
    />
  );
}

export default PrivacyPolicy;
