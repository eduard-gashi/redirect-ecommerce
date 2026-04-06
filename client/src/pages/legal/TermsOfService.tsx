import { LegalTextPage } from './LegalTextPage';

const sections = [
  { id: 'geltungsbereich', title: '1. Geltungsbereich' },
  { id: 'vertragsschluss', title: '2. Vertragsschluss' },
  { id: 'widerrufsrecht', title: '3. Widerrufsrecht' },
  { id: 'preise-zahlung', title: '4. Preise und Zahlungsbedingungen' },
  { id: 'lieferung-versand', title: '5. Liefer- und Versandbedingungen' },
  { id: 'eigentumsvorbehalt', title: '6. Eigentumsvorbehalt' },
  { id: 'maengelhaftung', title: '7. Mängelhaftung (Gewährleistung)' },
  { id: 'haftung', title: '8. Haftung' },
  { id: 'anwendbares-recht', title: '9. Anwendbares Recht' },
  { id: 'streitbeilegung', title: '10. Alternative Streitbeilegung' },
];

function TermsOfService() {
  return (
    <LegalTextPage
      sections={sections}
      legalUrl="https://itrk.legal/1tey.2Y.12eh-iframe.html"
      layoutTitle="Allgemeine Geschäftsbedingungen mit Kundeninformationen"
      extractH1AsTitle={false}
    />
  );
}

export default TermsOfService;
