import React, { useEffect, useRef, useState } from 'react';
import { LegalLayout } from './LegalLayout.tsx';
import '../../styles/legal-pages.css';

const sections = [
  { id: 'angaben', title: 'Allgemeine Angaben' },
];

function LegalNotice() {
  const [loading, setLoading] = useState(false);
  const legaltextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      if (legaltextRef.current && legaltextRef.current.innerHTML.trim() !== '') {
        const h2s = Array.from(
          legaltextRef.current.querySelectorAll<HTMLHeadingElement>('h2')
        );

        h2s.forEach((h2, idx) => {
          const section = sections[idx];
          if (section) {
            h2.id = section.id;
          }
          h2.classList.add('legal-section-heading');
        });

        legaltextRef.current
          .querySelectorAll('p')
          .forEach(el => el.classList.add('legal-text'));

        setLoading(false);
        observer.disconnect();
      }
    });

    if (legaltextRef.current) {
      observer.observe(legaltextRef.current, { childList: true, subtree: true });
    }

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <LegalLayout
      title="Impressum"
      subtitle="Offizielle Angaben und Kontaktinformationen gemäß § 5 TMG"
      sections={sections}
      loading={false}
    >
      <div
        className="itrk-legaltext legal-external-content"
        data-itrk-legaltext-url="https://itrk.legal/1tey.0.12eh-de-iframe.html"
      />
    </LegalLayout>
  );
}

export default LegalNotice;
