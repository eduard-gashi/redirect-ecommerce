import React from 'react';
import { Link } from 'react-router-dom';
import COMPANY_DETAILS from '../../config/config';

function PrivacyPolicy() {
  // Destructure the company details for easier access
  const { COMPANY_NAME, STREET, ZIP_CITY, EMAIL, PHONE, REGISTER_COURT, REGISTER_NUMBER, UST_ID, WIDERRUF_TAGE } = COMPANY_DETAILS;

  // Der Text von Trusted Shops ist umfangreich. Wir verwenden HTML-Strukturen
  // und ersetzen die Platzhalter mit den dynamischen Daten.

  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        <h1 className="datenschutz-title">
          Datenschutzerklärung
        </h1>

        <p className="datenschutz-text">
          Wir freuen uns über Ihr Interesse an unserem Online-Shop. Der Schutz Ihrer Privatsphäre ist für uns sehr wichtig. Nachstehend informieren wir Sie ausführlich über den Umgang mit Ihren Daten.
        </p>

        {/* ------------------------------------------- */}
        {/* 1. VERANTWORTLICHER (Dynamisch aus config)  */}
        {/* ------------------------------------------- */}
        <h2 className="datenschutz-heading2">
          Verantwortlicher für die Datenverarbeitung ist:
        </h2>
        <div className="contact-box">
          <p className="contact-info">
            {COMPANY_NAME}
            <br />
            {STREET}
            <br />
            {ZIP_CITY}
          </p>
          <p className="contact-details">
            E-Mail: <a href={`mailto:${EMAIL}`} className="link-color">{EMAIL}</a>
            <br />
            Telefon: {PHONE}
          </p>
        </div>
        
        {/* ------------------------------------------- */}
        {/* 2. INHALTSVERZEICHNIS (Trusted Shops Stil)  */}
        {/* ------------------------------------------- */}
        {/* Das Inhaltsverzeichnis ist nicht vollständig, da der Trusted-Shops-Text unvollständig war.
            Daher fassen wir die wichtigsten Sprungmarken zusammen. */}
        <div className="table-of-contents" style={{marginTop: '2rem'}}>
            <h3 className="datenschutz-heading3">Inhaltsverzeichnis</h3>
            <ul>
                <li><a href="#zugriffsdaten_und_hosting">1. Zugriffsdaten und Hosting</a></li>
                <li><a href="#datenverarbeitung_zur_vertragsabwicklung_und_zur_kontaktaufnahme">2. Datenverarbeitung zur Vertragsabwicklung und zur Kontaktaufnahme</a></li>
                <li><a href="#datenverarbeitung_zum_zwecke_der_versandabwicklung">3. Datenverarbeitung zum Zwecke der Versandabwicklung</a></li>
                <li><a href="#datenverarbeitung_zur_zahlungsabwicklung">4. Datenverarbeitung zur Zahlungsabwicklung</a></li>
                <li><a href="#werbung_per_e-mail">5. Werbung per E-Mail</a></li>
                <li><a href="#cookies_und_weitere_technologien">6. Cookies und weitere Technologien</a></li>
                <li><a href="#social_media">7. Social Media</a></li>
                <li><a href="#kontaktmöglichkeiten_und_ihre_rechte">8. Kontaktmöglichkeiten und Ihre Rechte</a></li>
            </ul>
        </div>
        
        <hr style={{margin: '2rem 0'}} />

        {/* ------------------------------------------- */}
        {/* 3. HAUPTTEXT VON TRUSTED SHOPS             */}
        {/* ------------------------------------------- */}

        {/* 1. Zugriffsdaten und Hosting */}
        <h2 id="zugriffsdaten_und_hosting" className="datenschutz-heading2">1. Zugriffsdaten und Hosting</h2>
        <p className="datenschutz-text">
          Sie können unsere Webseiten besuchen, ohne Angaben zu Ihrer Person zu machen. Bei jedem Aufruf einer Webseite speichert der Webserver lediglich automatisch ein sogenanntes Server-Logfile, das z.B. den Namen der angeforderten Datei, Ihre IP-Adresse, Datum und Uhrzeit des Abrufs, übertragene Datenmenge und den anfragenden Provider (Zugriffsdaten) enthält und den Abruf dokumentiert. Diese Zugriffsdaten werden ausschließlich zum Zwecke der Sicherstellung eines störungsfreien Betriebs der Seite sowie der Verbesserung unseres Angebots ausgewertet. Dies dient der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer korrekten Darstellung unseres Angebots gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO.
        </p>

        <h3 id="hosting" className="datenschutz-heading3">Hosting</h3>
        <p className="datenschutz-text">
          Die Dienste zum Hosting und zur Darstellung der Webseite werden teilweise durch unsere Dienstleister im Rahmen einer Verarbeitung in unserem Auftrag erbracht. Soweit im Rahmen der vorliegenden Datenschutzerklärung nichts anderes erläutert wird, werden alle Zugriffsdaten sowie alle Daten, die in dafür vorgesehenen Formularen auf dieser Webseite erhoben werden, auf ihren Servern verarbeitet. Bei Fragen zu unseren Dienstleistern und der Grundlage unserer Zusammenarbeit mit ihnen wenden Sie sich bitte an die in dieser Datenschutzerklärung beschriebenen Kontaktmöglichkeit.
        </p>
        <p className="datenschutz-text">
          Unsere Dienstleister sitzen und/oder verwenden Server in folgenden Ländern, für die die Europäische Kommission durch Beschluss ein angemessenes Datenschutzniveau festgestellt hat: **USA**
        </p>
        <p className="datenschutz-text">
          Der Angemessenheitsbeschluss für die **USA** gilt als Grundlage für die Drittlandsübermittlung, soweit der jeweilige Dienstleister zertifiziert ist. **Eine Zertifizierung liegt vor.**
        </p>

        {/* 2. Datenverarbeitung zur Vertragsabwicklung und zur Kontaktaufnahme */}
        <h2 id="datenverarbeitung_zur_vertragsabwicklung_und_zur_kontaktaufnahme" className="datenschutz-heading2">2. Datenverarbeitung zur Vertragsabwicklung und zur Kontaktaufnahme</h2>
        <h3 id="datenverarbeitung_zur_vertragsabwicklung" className="datenschutz-heading3">2.1 Datenverarbeitung zur Vertragsabwicklung</h3>
        <p className="datenschutz-text">
          Zum Zwecke der Vertragsabwicklung (inkl. Anfragen zu und Abwicklung von ggf. bestehenden Gewährleistungs- und Leistungsstörungsansprüchen sowie etwaiger gesetzlicher Aktualisierungspflichten) gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO erheben wir personenbezogene Daten, wenn Sie uns diese im Rahmen Ihrer Bestellung freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet, da wir in diesen Fällen die Daten zwingend zur Vertragsabwicklung benötigen und wir ohne deren Angabe die Bestellung nicht versenden können. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich.
        </p>
        <p className="datenschutz-text">
          Weitere Informationen zu der Verarbeitung Ihrer Daten, insbesondere zu der Weitergabe an unsere Dienstleister zum Zwecke der Bestellungs-, Zahlungs- und Versandabwicklung, finden Sie in den nachfolgenden Abschnitten dieser Datenschutzerklärung. Nach vollständiger Abwicklung des Vertrages werden Ihre Daten für die weitere Verarbeitung eingeschränkt und nach Ablauf der steuer- und handelsrechtlichen Aufbewahrungsfristen gemäß Art. 6 Abs. 1 S. 1 lit. c DSGVO gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
        </p>

        <h3 id="kundenkonto" className="datenschutz-heading3">2.2 Kundenkonto</h3>
        <p className="datenschutz-text">
          Soweit Sie hierzu Ihre Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO erteilt haben, indem Sie sich für die Eröffnung eines Kundenkontos entscheiden, verwenden wir Ihre Daten zum Zwecke der Kundenkontoeröffnung sowie zur Speicherung Ihrer Daten für weitere zukünftige Bestellungen auf unserer Webseite. Die Löschung Ihres Kundenkontos ist jederzeit möglich und kann entweder durch eine Nachricht an die in dieser Datenschutzerklärung beschriebene Kontaktmöglichkeit oder über eine dafür vorgesehene Funktion im Kundenkonto erfolgen. Nach Löschung Ihres Kundenkontos werden Ihre Daten gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
        </p>

        <h3 id="kontaktaufnahme" className="datenschutz-heading3">2.3 Kontaktaufnahme</h3>
        <p className="datenschutz-text">
          Im Rahmen der Kundenkommunikation erheben wir zur Bearbeitung Ihrer Anfragen gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO personenbezogene Daten, wenn Sie uns diese bei einer Kontaktaufnahme mit uns (z.B. per Kontaktformular, Live-Chat-Tool oder E-Mail) freiwillig mitteilen. Pflichtfelder werden als solche gekennzeichnet, da wir in diesen Fällen die Daten zwingend zur Bearbeitung Ihrer Kontaktaufnahme benötigen. Welche Daten erhoben werden, ist aus den jeweiligen Eingabeformularen ersichtlich. Nach vollständiger Bearbeitung Ihrer Anfrage werden Ihre Daten gelöscht, sofern Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
        </p>

        {/* 3. Datenverarbeitung zum Zwecke der Versandabwicklung */}
        <h2 id="datenverarbeitung_zum_zwecke_der_versandabwicklung" className="datenschutz-heading2">3. Datenverarbeitung zum Zwecke der Versandabwicklung</h2>
        <p className="datenschutz-text">
          Zur Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO geben wir Ihre Daten an den mit der Lieferung beauftragten Versanddienstleister weiter, soweit dies zur Lieferung bestellter Waren erforderlich ist. Bei Fragen zu unseren Dienstleistern und der Grundlage unserer Zusammenarbeit mit ihnen wenden Sie sich bitte an die in dieser Datenschutzerklärung beschriebene Kontaktmöglichkeit.
        </p>

        {/* 4. Datenverarbeitung zur Zahlungsabwicklung */}
        <h2 id="datenverarbeitung_zur_zahlungsabwicklung" className="datenschutz-heading2">4. Datenverarbeitung zur Zahlungsabwicklung</h2>
        <p className="datenschutz-text">
          Bei der Abwicklung von Zahlungen in unserem Online-Shop arbeiten wir mit diesen Partnern zusammen: technische Dienstleister, Kreditinstitute, Zahlungsdienstleister.
        </p>
        
        <h3 id="datenverarbeitung_zur_transaktionsabwicklung" className="datenschutz-heading3">4.1 Datenverarbeitung zur Transaktionsabwicklung</h3>
        <p className="datenschutz-text">
          Je nach ausgewählter Zahlungsart geben wir die für die Abwicklung der Zahlungstransaktion notwendigen Daten an unsere technischen Dienstleister, die im Rahmen einer Auftragsverarbeitung für uns tätig sind, oder an die beauftragten Kreditinstitute oder an den ausgewählten Zahlungsdienstleister weiter, soweit dies zur Abwicklung der Zahlung erforderlich ist. Dies dient der Vertragserfüllung gemäß Art. 6 Abs. 1 S. 1 lit. b DSGVO. Zum Teil erheben die Zahlungsdienstleister die für die Abwicklung der Zahlung erforderlichen Daten selbst, z.B. auf ihrer eigenen Webseite oder über eine technische Einbindung im Bestellprozess. Es gilt insoweit die Datenschutzerklärung des jeweiligen Zahlungsdienstleisters.
          <br /> Bei Fragen zu unseren Partnern für die Zahlungsabwicklung und der Grundlage unserer Zusammenarbeit mit ihnen wenden Sie sich bitte an die in dieser Datenschutzerklärung beschriebenen Kontaktmöglichkeit.
        </p>
        
        <h3 id="datenverarbeitung_zum_zwecke_der_betrugsprävention_und_der_optimierung_unserer_zahlungsprozesse" className="datenschutz-heading3">4.2 Datenverarbeitung zum Zwecke der Betrugsprävention und der Optimierung unserer Zahlungsprozesse</h3>
        <p className="datenschutz-text">
          Gegebenenfalls geben wir unseren Dienstleistern weitere Daten, die sie zusammen mit den für die Abwicklung der Zahlung notwendigen Daten als unsere Auftragsverarbeiter zum Zwecke der Betrugsprävention und der Optimierung unserer Zahlungsprozesse (z.B. Rechnungsstellung, Abwicklung von angefochtenen Zahlungen, Unterstützung der Buchhaltung) verwenden. Dies dient gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO der Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an unserer Absicherung gegen Betrug bzw. an einem effizienten Zahlungsmanagement.
        </p>

        {/* 5. Werbung per E-Mail */}
        <h2 id="werbung_per_e-mail" className="datenschutz-heading2">5. Werbung per E-Mail</h2>
        <h3 id="e-mail-newsletter_mit_anmeldung" className="datenschutz-heading3">E-Mail-Newsletter mit Anmeldung</h3>
        <p className="datenschutz-text">
          Wenn Sie sich zu unserem Newsletter anmelden, verwenden wir die hierfür erforderlichen oder gesondert von Ihnen mitgeteilten Daten, um Ihnen regelmäßig unseren E-Mail-Newsletter aufgrund Ihrer Einwilligung gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO zuzusenden. 
          Die Abmeldung vom Newsletter ist jederzeit möglich und kann entweder durch eine Nachricht an die unten beschriebene Kontaktmöglichkeit oder über einen dafür vorgesehenen Link im Newsletter erfolgen. 
          Nach Abmeldung löschen wir Ihre E-Mail-Adresse aus der Empfängerliste, soweit Sie nicht ausdrücklich in eine weitere Nutzung Ihrer Daten gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben oder wir uns eine darüber hinausgehende Datenverwendung vorbehalten, die gesetzlich erlaubt ist und über die wir Sie in dieser Erklärung informieren.
        </p>

        {/* 6. Cookies und weitere Technologien */}
        <h2 id="cookies_und_weitere_technologien" className="datenschutz-heading2">6. Cookies und weitere Technologien</h2>
        <h3 id="allgemeine_informationen" className="datenschutz-heading3">Allgemeine Informationen</h3>
        <p className="datenschutz-text">
          Um den Besuch unserer Webseite attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen, verwenden wir auf verschiedenen Seiten Technologien einschließlich sogenannter Cookies. Cookies sind kleine Textdateien, die automatisch auf Ihrem Endgerät gespeichert werden. Einige der von uns verwendeten Cookies werden nach Ende der Browser-Sitzung, also nach Schließen Ihres Browsers, wieder gelöscht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf Ihrem Endgerät und ermöglichen uns, Ihren Browser beim nächsten Besuch wiederzuerkennen (persistente Cookies). Die Dauer der Speicherung können Sie der Übersicht in den Cookie-Einstellungen Ihres Webbrowsers entnehmen.
        </p>
        <p className="datenschutz-text">
          <strong>Schutz der Privatsphäre bei Endgeräten</strong>
        </p>
        <p className="datenschutz-text">
          Bei Nutzung unseres Online-Angebots setzen wir unbedingt notwendige Technologien ein, um den ausdrücklich gewünschten Telemediendienst zur Verfügung stellen zu können. Die Speicherung von Informationen in Ihrem Endgerät oder der Zugriff auf Informationen, die bereits in Ihrem Endgerät gespeichert sind, bedürfen insoweit keiner Einwilligung.
        </p>
        <p className="datenschutz-text">
          Bei nicht unbedingt erforderlichen Funktionen bedarf die Speicherung von Informationen in Ihrem Endgerät oder der Zugriff auf Informationen, die bereits in Ihrem Endgerät gespeichert sind, Ihrer Einwilligung. Wir weisen Sie darauf hin, dass bei Nichterteilung der Einwilligung ggf. Teile der Webseite nicht uneingeschränkt nutzbar sein können. Ihre etwaig erteilten Einwilligungen bleiben solange bestehen, bis Sie die jeweiligen Einstellungen in Ihrem Endgerät anpassen oder zurücksetzen.
        </p>
        <p className="datenschutz-text">
          <strong>Etwaig nachgelagerte Datenverarbeitung durch Cookies und weitere Technologien</strong>
        </p>
        <p className="datenschutz-text">
          Wir verwenden solche Technologien, die für die Nutzung bestimmter Funktionen unserer Webseite (z.B. Warenkorbfunktion) zwingend erforderlich sind. Durch diese Technologien werden IP-Adresse, Zeitpunkt des Besuchs, Geräte- und Browser-Informationen sowie Informationen zu Ihrer Nutzung unserer Webseite (z. B. Informationen zum Inhalt des Warenkorbs) erhoben und verarbeitet. Dies dient im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen an einer optimierten Darstellung unseres Angebots gemäß Art. 6 Abs. 1 S. 1 lit. f DSGVO.
        </p>
        <p className="datenschutz-text">
          <strong>Cookie-Einstellungen</strong> 
          <p className="datenschutz-text">
            Die Cookie-Einstellungen für Ihren Browser finden Sie unter den folgenden Links: <a href="https://support.microsoft.com/de-de/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener noreferrer" className="link-color">Microsoft Edge™</a> / <a href="https://support.apple.com/de-de/guide/safari/sfri11471/12.0/mac/10.14" target="_blank" rel="noopener noreferrer" className="link-color">Safari™</a> / <a href="https://support.google.com/chrome/answer/95647?hl=de&amp;hlrm=en" target="_blank" rel="noopener noreferrer" className="link-color">Chrome™</a> / <a href="https://support.mozilla.org/de/kb/cookies-informationen-websites-auf-ihrem-computer" target="_blank" rel="noopener noreferrer" className="link-color">Firefox™</a> / <a href="https://help.opera.com/de/latest/web-preferences/#cookies" target="_blank" rel="noopener noreferrer" className="link-color">Opera™</a> 
          </p>
        </p>
        <p className="datenschutz-text">
          Soweit Sie in die Verwendung der Technologien gemäß Art. 6 Abs. 1 S. 1 lit. a DSGVO eingewilligt haben, können Sie Ihre Einwilligung jederzeit widerrufen durch eine Nachricht an die in der Datenschutzerklärung beschriebenen Kontaktmöglichkeit.
        </p>

        {/* 7. Social Media */}
        <h2 id="social_media" className="datenschutz-heading2">7. Social Media</h2>
        <h3 id="social_buttons_von_instagram_(by_meta)" className="datenschutz-heading3">7.1 Social Buttons von Instagram (by Meta)</h3>
        <p className="datenschutz-text">
          Auf unserer Webseite werden Social Buttons von sozialen Netzwerken verwendet. Diese sind lediglich als HTML-Links in die Seite eingebunden, so dass beim Aufruf unserer Webseite noch keine Verbindung mit den Servern des jeweiligen Anbieters hergestellt wird. Klicken Sie auf einen der Buttons, öffnet sich die Webseite des jeweiligen sozialen Netzwerks in einem neuen Fenster Ihres Browsers Dort können Sie z.B. den Like- oder Share-Button betätigen.
        </p>

        <h3 id="unsere_onlinepräsenz_auf_instagram_(by_meta),_youtube" className="datenschutz-heading3">7.2 Unsere Onlinepräsenz auf Instagram (by Meta), Youtube</h3>
        <p className="datenschutz-text">
          Soweit Sie hierzu Ihre Einwilligung nach Art. 6 Abs. 1 S. 1 lit. a DSGVO gegenüber dem jeweiligen Social Media Betreiber erteilt haben, werden bei Besuch unserer Onlinepräsenzen auf den in der oben genannten sozialen Medien Ihre Daten für Marktforschungs- und Werbezwecke automatisch erhoben und gespeichert, aus denen unter Verwendung von Pseudonymen Nutzungsprofile erstellt werden. Diese können verwendet werden, um z.B. Werbeanzeigen innerhalb und außerhalb der Plattformen zu schalten, die mutmaßlich Ihren Interessen entsprechen. Hierzu werden im Regelfall Cookies eingesetzt. Die detaillierten Informationen zur Verarbeitung und Nutzung der Daten durch den jeweiligen Social Media Betreiber sowie eine Kontaktmöglichkeit und Ihre diesbezüglichen Rechte und Einstellungsmöglichkeiten zum Schutz Ihrer Privatsphäre, entnehmen Sie bitte den unten verlinkten Datenschutzhinweisen der Anbieter. Sollten Sie diesbezüglich dennoch Hilfe benötigen, können Sie sich an uns wenden.
        </p>

        <p className="datenschutz-text">
          <a href="http://help.instagram.com/519522125107875" target="_blank" rel="noopener noreferrer" className="link-color"><strong>Instagram</strong> (by Meta)</a> ist ein Angebot der Meta Platforms Ireland Ltd., Block J, Serpentine Avenue, Dublin 4, Irland („Meta Platforms Ireland“). Die durch Meta Platforms Ireland automatisch erhobenen Informationen über Ihre Nutzung unserer Online-Präsenz auf Instagram werden in der Regel an einen Server der Meta Platforms, Inc., 1601 Willow Road, Menlo Park, CA 94025, USA, Menlo Park, California 94025, USA übertragen und dort gespeichert. Die Datenverarbeitung im Rahmen des Besuchs einer Instagram (by Meta) Fanpage erfolgt auf Grundlage einer Vereinbarung zwischen gemeinsam Verantwortlichen gemäß Art. 26 DSGVO. Weitere Informationen (Informationen zu Insights-Daten) finden Sie <a href="https://www.facebook.com/legal/terms/information_about_page_insights_data" target="_blank" rel="noopener noreferrer" className="link-color">hier</a>.
        </p>
        <p className="datenschutz-text">
          Unsere Dienstleister sitzen und/oder verwenden Server in folgenden Ländern, für die die Europäische Kommission durch Beschluss ein angemessenes Datenschutzniveau festgestellt hat: USA, Kanada, Japan, Südkorea, Neuseeland, Vereinigtes Königreich, Argentinien.
        </p>
        <p className="datenschutz-text">
          Der Angemessenheitsbeschluss für die **USA** gilt als Grundlage für die Drittlandsübermittlung, soweit der jeweilige Dienstleister zertifiziert ist. **Eine Zertifizierung liegt vor.**
        </p>
        <p className="datenschutz-text">
          Unsere Dienstleister sitzen und/oder verwenden Server in diesen Ländern: Australien, Hongkong, Indien, Indonesien, Malaysia, Singapur, Thailand, Taiwan, Brasilien, Mexiko.
          <br /> Für diese Länder liegt kein Angemessenheitsbeschluss der Europäischen Kommission vor. Unsere Zusammenarbeit mit Ihnen stützt sich auf diese Garantien: **Standarddatenschutzklauseln der Europäischen Kommission.**
        </p>
        <p className="datenschutz-text">
          <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="link-color"><strong>YouTube</strong></a> ist ein Angebot der Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland („Google“). Die von Google automatisch erhobenen Informationen über Ihre Nutzung unserer Online-Präsenz auf YouTube werden in der Regel an einen Server der Google LLC, 1600 Amphitheatre Parkway Mountain View, CA 94043, USA übertragen und dort gespeichert.
        </p>
        <p className="datenschutz-text">
          Unsere Dienstleister sitzen und/oder verwenden Server in Ländern außerhalb der EU und des EWR, für die die Europäische Kommission durch Beschluss ein angemessenes Datenschutzniveau festgestellt hat.
        </p>
        <p className="datenschutz-text">
          Unsere Dienstleister sitzen und/oder verwenden Server in Ländern außerhalb der EU und des EWR. Für diese L… *(Der Textabschnitt ist hier abgeschnitten)*
        </p>

        {/* ----------------------------------------------------- */}
{/* 8. KONTAKTMÖGLICHKEITEN UND IHRE RECHTE (VOLLSTÄNDIG) */}
{/* ----------------------------------------------------- */}
<h2 id="kontaktmöglichkeiten_und_ihre_rechte" className="datenschutz-heading2">
  8. Kontaktmöglichkeiten und Ihre Rechte
</h2>

<h3 id="ihre_rechte" className="datenschutz-heading3">
  8.1 Ihre Rechte
</h3>
<p className="datenschutz-text">
  Als Betroffener haben Sie folgende Rechte:
</p>

<ul className="rechte-liste datenschutz-text">
  <li>gemäß **Art. 15 DSGVO** das Recht, in dem dort bezeichneten Umfang **Auskunft** über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen;</li>
  <li>gemäß **Art. 16 DSGVO** das Recht, unverzüglich die **Berichtigung** unrichtiger oder **Vervollständigung** Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen;</li>
  <li>gemäß **Art. 17 DSGVO** das Recht, die **Löschung** Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit nicht die weitere Verarbeitung
    <ul className="unter-liste">
      <li>zur Ausübung des Rechts auf freie Meinungsäußerung und Information;</li>
      <li>zur Erfüllung einer rechtlichen Verpflichtung;</li>
      <li>aus Gründen des öffentlichen Interesses oder</li>
      <li>zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen erforderlich ist;</li>
    </ul>
  </li>
  <li>gemäß **Art. 18 DSGVO** das Recht, die **Einschränkung der Verarbeitung** Ihrer personenbezogenen Daten zu verlangen, soweit
    <ul className="unter-liste">
      <li>die Richtigkeit der Daten von Ihnen bestritten wird;</li>
      <li>die Verarbeitung unrechtmäßig ist, Sie aber deren Löschung ablehnen;</li>
      <li>wir die Daten nicht mehr benötigen, Sie diese jedoch zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen benötigen oder</li>
      <li>Sie gemäß Art. 21 DSGVO Widerspruch gegen die Verarbeitung eingelegt haben;</li>
    </ul>
  </li>
  <li>gemäß **Art. 20 DSGVO** das Recht, Ihre personenbezogenen Daten, die Sie uns bereitgestellt haben, in einem **strukturierten, gängigen und maschinenlesbaren Format** zu erhalten oder die Übermittlung an einen anderen Verantwortlichen zu verlangen;</li>
  <li>gemäß **Art. 77 DSGVO** das Recht, sich bei einer **Aufsichtsbehörde** zu beschweren. In der Regel können Sie sich hierfür an die Aufsichtsbehörde Ihres üblichen Aufenthaltsortes oder Arbeitsplatzes oder unseres Unternehmenssitzes wenden.</li>
</ul>

<h4 className="datenschutz-heading4" style={{marginTop: '1rem'}}>Widerspruchsrecht</h4>
<p className="datenschutz-text">
  Soweit wir zur Wahrung unserer im Rahmen einer Interessensabwägung überwiegenden berechtigten Interessen personenbezogene Daten wie oben erläutert verarbeiten, können Sie dieser Verarbeitung mit **Wirkung für die Zukunft widersprechen**. Erfolgt die Verarbeitung zu Zwecken des **Direktmarketings**, können Sie dieses Recht **jederzeit** wie oben beschrieben ausüben. Soweit die Verarbeitung zu anderen Zwecken erfolgt, steht Ihnen ein Widerspruchsrecht nur bei Vorliegen von Gründen, die sich aus Ihrer besonderen Situation ergeben, zu.
</p>
<p className="datenschutz-text">
  Nach Ausübung Ihres Widerspruchsrechts werden wir Ihre personenbezogenen Daten nicht weiter zu diesen Zwecken verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen, oder wenn die Verarbeitung der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen dient.
</p>
<p className="datenschutz-text">
  Dies gilt nicht, wenn die Verarbeitung zu Zwecken des Direktmarketings erfolgt. Dann werden wir Ihre personenbezogenen Daten nicht weiter zu diesem Zweck verarbeiten.
</p>

<h3 id="kontaktmöglichkeiten" className="datenschutz-heading3">
  8.2 Kontaktmöglichkeiten
</h3>
<p className="datenschutz-text">
  Bei Fragen zur Erhebung, Verarbeitung oder Nutzung Ihrer personenbezogenen Daten, bei Auskünften, Berichtigung, Einschränkung oder Löschung von Daten sowie Widerruf erteilter Einwilligungen oder Widerspruch gegen eine bestimmte Datenverwendung wenden Sie sich bitte direkt an uns über die Kontaktdaten in unserem <Link to="/impressum" className="link-color">Impressum</Link>.
</p>


      </div>
    </div>
  );
}

export default PrivacyPolicy;