import COMPANY_DETAILS from '../../config/config';

function TermsOfService() {
    const { COMPANY_NAME, EMAIL } = COMPANY_DETAILS;

    return (
        <div className="datenschutz-container">
            <div className="datenschutz-content">
                <h1 className="datenschutz-title">
                    Allgemeine Geschäftsbedingungen
                </h1>
                
                <p className="datenschutz-text">
                    Stand: 01.10.2025
                </p>

                {/* 1. Geltungsbereich */}
                <h2 className="datenschutz-heading2">1. Geltungsbereich</h2>
                <p className="datenschutz-text">
                    Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden Allgemeinen Geschäftsbedingungen (AGB).
                </p>

                {/* 2. Vertragspartner, Vertragsschluss */}
                <h2 className="datenschutz-heading2">2. Vertragspartner, Vertragsschluss</h2>
                <p className="datenschutz-text">
                    Der Kaufvertrag kommt zustande mit {COMPANY_NAME}.
                </p>
                <p className="datenschutz-text">
                    Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Sie können unsere Produkte zunächst unverbindlich in den Warenkorb legen und Ihre Eingaben vor Absendung der verbindlichen Bestellung jederzeit korrigieren, indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten Korrekturhilfen nutzen.
                </p>
                <p className="datenschutz-text">
                    Durch Anklicken des Bestellbuttons geben Sie eine verbindliche Bestellung der im Warenkorb enthaltenen Waren ab. Die Bestätigung des Eingangs Ihrer Bestellung erfolgt unmittelbar nach dem Absenden der Bestellung per E-Mail.
                </p>

                {/* 3. Preise und Zahlungsbedingungen */}
                <h2 className="datenschutz-heading2">3. Preise und Zahlungsbedingungen</h2>
                <p className="datenschutz-text">
                    Alle angegebenen Preise enthalten die gesetzliche Mehrwertsteuer und sonstige Preisbestandteile.
                </p>
                <p className="datenschutz-text">
                    Die Zahlung erfolgt wahlweise per [HIER EINFÜGEN: Deine Zahlungsarten, z.B. PayPal, Kreditkarte, etc.].
                </p>
                <p className="datenschutz-text">
                    Wir behalten uns das Recht vor, im Einzelfall die Wahl der Zahlungsarten einzuschränken.
                </p>

                {/* 4. Lieferung und Versandkosten */}
                <h2 className="datenschutz-heading2">4. Lieferung und Versandkosten</h2>
                <p className="datenschutz-text">
                    Zuzüglich zu den angegebenen Produktpreisen fallen Versandkosten an. Die Höhe der Versandkosten wird Ihnen im Bestellprozess klar mitgeteilt.
                </p>
                <p className="datenschutz-text">
                    Die Lieferung erfolgt innerhalb von [HIER EINFÜGEN: Deine Lieferzeit] Werktagen.
                </p>

                {/* 5. Gewährleistung */}
                <h2 className="datenschutz-heading2">5. Gewährleistung</h2>
                <p className="datenschutz-text">
                    Es gilt das gesetzliche Mängelhaftungsrecht.
                </p>

                {/* 6. Haftung */}
                <h2 className="datenschutz-heading2">6. Haftung</h2>
                <p className="datenschutz-text">
                    Wir haften unbeschränkt, soweit die Schadensursache auf Vorsatz oder grober Fahrlässigkeit beruht. Für leichte Fahrlässigkeit haften wir nur bei der Verletzung wesentlicher Vertragspflichten. Die Haftung ist in diesen Fällen auf den vorhersehbaren, typischerweise eintretenden Schaden begrenzt.
                </p>

                {/* 7. Schlussbestimmungen */}
                <h2 className="datenschutz-heading2">7. Schlussbestimmungen</h2>
                <p className="datenschutz-text">
                    Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist [HIER EINFÜGEN: Gerichtsstand, z.B. der Sitz deines Unternehmens], sofern Sie Kaufmann sind.
                </p>
                <p className="datenschutz-text">
                    Sollten eine oder mehrere Bestimmungen dieser AGB unwirksam sein, so wird dadurch die Wirksamkeit der übrigen Bestimmungen nicht berührt.
                </p>
                
                <p className="datenschutz-text" style={{ fontStyle: 'italic', marginTop: '2rem' }}>
                    <span className="highlight-text-red">ACHTUNG:</span> Dieser Text dient als Muster. Ersetze die Platzhalter mit deinen spezifischen Daten.
                </p>
                <p className="datenschutz-text" style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
                    Für rechtlich verbindliche AGB ist die Beratung durch einen Rechtsanwalt oder die Nutzung eines spezialisierten AGB-Generators (z.B. von Trusted Shops oder e-recht24) unerlässlich.
                </p>
            </div>
        </div>
    );
}

export default TermsOfService;