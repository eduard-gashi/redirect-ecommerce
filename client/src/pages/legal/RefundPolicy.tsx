import { LegalTextPage } from './LegalTextPage';

const sections = [
  { id: 'widerrufsbelehrung', title: '1. Widerrufsbelehrung' },
  { id: 'widerrufsformular', title: '2. Widerrufsformular' },
];

function RefundPolicy() {
  return (
    <LegalTextPage
      sections={sections}
      legalUrl="https://itrk.legal/1tey.2J.12eh-iframe.html"
      extractH1AsTitle={true}
    />
  );
}

export default RefundPolicy;
