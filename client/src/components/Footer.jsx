import { Link } from 'react-router-dom';

function Footer() {
  const legalLinks = [
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' },
    { name: 'AGB', path: '/agb' },
    { name: 'Widerruf', path: '/widerruf' },
  ];

  return (
    <footer className="main-footer">
      <div className="footer-content-container">
        {/* 1. Copyright and Contact */}
        <div className="footer-section footer-contact">
          <h3 className="footer-heading">Kontakt & Informationen</h3>
          <p className="footer-text">© 2026 ReDirect - Handy Detox Box.</p>
          <p className="footer-text footer-email-spacing">
            E-Mail:{' '}
            <a href="mailto:kaishi.company@gmail.com" className="footer-link-email">
              kaishi.company@gmail.com
            </a>
          </p>
        </div>

        {/* 2. Rechtliche Links */}
        <div className="footer-section footer-legal">
          <h3 className="footer-heading">Rechtliches</h3>
          <ul className="footer-link-list">
            {legalLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.path} className="footer-link">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-disclaimer">Alle Rechte vorbehalten.</div>
    </footer>
  );
}

export default Footer;
