import React from 'react';
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
                <h2 id="geltungsbereich" className="datenschutz-heading2">1. Geltungsbereich</h2>
                <p className="datenschutz-text">
                    Für alle Bestellungen über unseren Online-Shop gelten die nachfolgenden AGB. Unser Online-Shop richtet sich ausschließlich an Verbraucher.
                </p>
                <p className="datenschutz-text">
                    Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können. Unternehmer ist eine natürliche oder juristische Person oder eine rechtsfähige Personengesellschaft, die bei Abschluss eines Rechtsgeschäfts in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit handelt.
                </p>

                {/* 2. Vertragspartner, Vertragsschluss, Korrekturmöglichkeiten */}
                <h2 id="vertragspartner,_vertragsschluss,_korrekturmöglichkeiten" className="datenschutz-heading2">2. Vertragspartner, Vertragsschluss, Korrekturmöglichkeiten</h2>
                <p className="datenschutz-text">
                    Der Kaufvertrag kommt zustande mit {COMPANY_NAME || 'Kaishi GbR'}.
                </p>
                <p className="datenschutz-text">
                    Die Darstellung der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern einen unverbindlichen Online-Katalog dar. Sie können unsere Produkte zunächst unverbindlich in den Warenkorb legen und Ihre Eingaben vor Absenden Ihrer verbindlichen Bestellung jederzeit korrigieren, indem Sie die hierfür im Bestellablauf vorgesehenen und erläuterten Korrekturhilfen nutzen. Durch Anklicken des Bestellbuttons geben Sie ein verbindliches Angebot über die im Warenkorb enthaltenen Produkte ab. Die Bestätigung des Zugangs Ihrer Bestellung erfolgt per E-Mail unmittelbar nach dem Absenden der Bestellung.
                </p>
                <p className="datenschutz-text">
                    Wir nehmen Ihr Angebot innerhalb von zwei Tagen an, indem
                    <ul>
                        <li>wir eine Annahmeerklärung in separater E-Mail abgeben oder</li>
                        <li>gegebenenfalls die Zahlungstransaktion durch unseren Dienstleister oder den ausgewählten Zahlungsdienstleister durchgeführt wird. Der Durchführungszeitpunkt der Zahlungstransaktion richtet sich nach der jeweils ausgewählten Zahlungsart (s. unter „Bezahlung“).</li>
                    </ul>
                    Die für Sie relevante Alternative richtet sich danach, welches der aufgezählten Ereignisse als erstes eintritt.
                </p>

                {/* 3. Vertragssprache, Vertragstextspeicherung */}
                <h2 id="vertragssprache,_vertragstextspeicherung" className="datenschutz-heading2">3. Vertragssprache, Vertragstextspeicherung</h2>
                <p className="datenschutz-text">
                    Die für den Vertragsschluss zur Verfügung stehende(n) Sprache(n): Deutsch
                </p>
                <p className="datenschutz-text">
                    Wir speichern den Vertragstext und senden Ihnen die Bestelldaten und unsere AGB in Textform zu. Der Vertragstext ist aus Sicherheitsgründen nicht mehr über das Internet zugänglich.
                </p>

                {/* 4. Lieferbedingungen */}
                <h2 id="lieferbedingungen" className="datenschutz-heading2">4. Lieferbedingungen</h2>
                <h3 id="lieferoptionen" className="datenschutz-heading3">Lieferoptionen</h3>
                <p className="datenschutz-text">
                    Wir versenden die Produkte an die im Bestellprozess angegebene Lieferadresse.
                </p>
                <p className="datenschutz-text">
                    Wir liefern nur im Versandweg. Eine Selbstabholung der Ware ist leider nicht möglich.
                </p>

                {/* 5. Bezahlung */}
                <h2 id="bezahlung" className="datenschutz-heading2">5. Bezahlung</h2>
                
                <h3 id="preise" className="datenschutz-heading3">5.1 Preise</h3>
                <p className="datenschutz-text">
                    Es gelten die zum Zeitpunkt der Bestellung angegebenen Preise. Diese sind Gesamtpreise. Wir erheben keine Mehrwertsteuer.
                </p>
                
                <h3 id="zahlungsarten" className="datenschutz-heading3">5.2 Zahlungsarten</h3>
                <p className="datenschutz-text">
                    In unserem Shop stehen Ihnen grundsätzlich die nachfolgenden Zahlungsarten zur Verfügung.
                </p>
                <p className="datenschutz-text">
                    <strong>Kreditkarte</strong><br /> Im Bestellprozess geben Sie Ihre Kreditkartendaten an. Ihre Karte wird unmittelbar nach Abgabe der Bestellung belastet.
                </p>
                <p className="datenschutz-text">
                    <strong>SEPA-Lastschriftverfahren</strong><br /> Mit Abgabe der Bestellung erteilen Sie uns ein SEPA-Lastschriftmandat. Über das Datum der Kontobelastung werden wir Sie mindestens einen Bankgeschäftstag im Voraus informieren (sog. Prenotification). Ein Bankgeschäftstag ist jeder Werktag mit Ausnahme von Samstagen, bundeseinheitlichen gesetzlichen Feiertagen sowie der 24. Und 31. Dezember eines jeden Jahres. Die Kontobelastung erfolgt vor Versand der Ware.<br />
                </p>
                <p className="datenschutz-text">
                    <strong>PayPal</strong><br /> Um den Rechnungsbetrag über den Zahlungsdienstleister PayPal (Europe) S.à r.l. et Cie, S.C.A, 22-24 Boulevard Royal, L-2449 Luxembourg („PayPal“) bezahlen zu können, müssen Sie bei PayPal registriert sein, sich mit Ihren Zugangsdaten legitimieren und die Zahlungsanweisung bestätigen. Die Zahlungstransaktion wird durch PayPal unmittelbar nach Abgabe der Bestellung durchgeführt. Weitere Hinweise erhalten Sie im Bestellvorgang.
                </p>
                <p className="datenschutz-text">
                    PayPal kann registrierten und nach eigenen Kriterien ausgewählten PayPal-Kunden weitere Zahlungsmodalitäten im Kundenkonto anbieten. Auf das Anbieten dieser Modalitäten haben wir allerdings keinen Einfluss; weitere individuell angebotene Zahlungsmodalitäten betreffen Ihr Rechtsverhältnis mit PayPal. Weitere Informationen hierzu finden Sie in Ihrem PayPal-Konto.
                </p>
                <p className="datenschutz-text">
                    <strong>Rechnung</strong><br /> Der Rechnungsbetrag ist 7 Tage nach Erhalt der Rechnung und der Ware per Überweisung auf das in der Rechnung angegebene Bankkonto fällig. Wir behalten uns vor, den Kauf auf Rechnung nur nach einer erfolgreichen Bonitätsprüfung anzubieten.
                </p>

                {/* 6. Gewährleistung und Garantien */}
                <h2 id="gewährleistung_und_garantien" className="datenschutz-heading2">6. Gewährleistung und Garantien</h2>
                
                <h3 id="mängelhaftungsrecht" className="datenschutz-heading3">6.1 Mängelhaftungsrecht</h3>
                <p className="datenschutz-text">
                    Es gilt das gesetzliche Mängelhaftungsrecht.
                </p>
                
                <h3 id="garantien_und_kundendienst" className="datenschutz-heading3">6.2 Garantien und Kundendienst</h3>
                <p className="datenschutz-text">
                    Informationen zu gegebenenfalls geltenden zusätzlichen Garantien und deren genaue Bedingungen finden Sie jeweils beim Produkt und auf besonderen Informationsseiten im Online-Shop.
                </p>

                {/* 7. Streitbeilegung */}
                <h2 id="streitbeilegung" className="datenschutz-heading2">7. Streitbeilegung</h2>
                <p className="datenschutz-text">
                    Zur Teilnahme an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht bereit.
                </p>
                </div>
        </div>
    );
}

export default TermsOfService;