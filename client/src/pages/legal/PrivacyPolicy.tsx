import React, { useEffect, useRef, useState } from 'react';
import { LegalLayout } from './LegalLayout';
import '../../styles/legal-pages.css';

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

    console.log("HAHA");
    console.log(legaltextRef);


    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <LegalLayout
      title="Datenschutzerklärung"
      subtitle="Informationen zur Verarbeitung Ihrer personenbezogenen Daten gemäß DSGVO"
      sections={sections}
      loading={loading}
    >
      <div
        ref={legaltextRef}
        className="itrk-legaltext legal-external-content"
        data-itrk-legaltext-url="https://itrk.legal/1tey.8U.12eh-iframe.html"
      />
    </LegalLayout>
  );
}

export default PrivacyPolicy;
