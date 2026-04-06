import { useEffect, useRef, useState } from 'react';
import { LegalLayout } from './Layout';
import '../../styles/legal-pages.css';

export type Section = { id: string; title: string };

type LegalTextPageProps = {
  sections: Section[];
  legalUrl: string;
  layoutTitle?: string;
  extractH1AsTitle?: boolean;
};

export function LegalTextPage({
  sections,
  legalUrl,
  layoutTitle,
  extractH1AsTitle = false,
}: LegalTextPageProps) {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>(layoutTitle || '');
  const legaltextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.it-recht-kanzlei.de/js/itrk-legaltext.js';
    script.async = true;
    document.body.appendChild(script);

    const observer = new MutationObserver(() => {
      if (legaltextRef.current && legaltextRef.current.innerHTML.trim() !== '') {
        // Extract h1 as title
        if (extractH1AsTitle) {
          const h1 = legaltextRef.current.querySelector<HTMLHeadingElement>('h1');
          if (h1) {
            setTitle(h1.innerText);
            h1.remove();
          }
        }

        const h2s = Array.from(legaltextRef.current.querySelectorAll<HTMLHeadingElement>('h2'));

        h2s.forEach((h2, idx) => {
          const section = sections[idx];
          if (section) {
            h2.id = section.id;
          }
          h2.classList.add('legal-section-heading');
        });

        legaltextRef.current.querySelectorAll('p').forEach((el) => el.classList.add('legal-text'));

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
  }, [extractH1AsTitle, sections]);

  return (
    <LegalLayout title={title} subtitle="" sections={sections} loading={loading}>
      <div
        ref={legaltextRef}
        className="itrk-legaltext legal-external-content"
        data-itrk-legaltext-url={legalUrl}
      />
    </LegalLayout>
  );
}
