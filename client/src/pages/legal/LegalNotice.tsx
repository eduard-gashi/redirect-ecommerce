import { LegalTextPage } from './LegalTextPage';

const sections = [{ id: 'angaben', title: 'Allgemeine Angaben' }];

function LegalNotice() {
  return (
    <LegalTextPage
      sections={sections}
      legalUrl="https://itrk.legal/1tey.0.12eh-de-iframe.html"
      layoutTitle={'Impressum'}
      extractH1AsTitle={true}
    />
  );
}

export default LegalNotice;
