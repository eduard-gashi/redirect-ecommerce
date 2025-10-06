import React from 'react';

function RefundPolicy() {
  return (
    <div className="datenschutz-container">
      <div className="datenschutz-content">
        
        <h1 className="datenschutz-title">Widerrufsbelehrung</h1>
        <p className="datenschutz-text">Verbraucher haben ein vierzehntägiges Widerrufsrecht.</p>

        <h2 className="datenschutz-heading2" id="widerrufsrecht">Widerrufsrecht</h2>
        
        <p className="datenschutz-text">
          Sie haben das Recht, binnen <strong>vierzehn Tagen</strong> ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt **vierzehn Tage** ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
        </p>

        <p className="datenschutz-text">
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Philipp Kaiser, Am Affenberg 3, 78050 Villingen-Schwenningen, Germany, kaishi.company@gmail.com, Telefon: 017645889710) mittels einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist. 
        </p>

        <p className="datenschutz-text">
          Sie können das Muster-Widerrufsformular oder eine andere eindeutige Erklärung auch auf unserer Webseite <a href="http://www.redirectstore.de/widerruf" target="_blank" rel="noopener noreferrer" className="link-color">http://www.redirectstore.de/widerruf</a> elektronisch ausfüllen und übermitteln. Machen Sie von dieser Möglichkeit Gebrauch, so werden wir Ihnen unverzüglich (z.B. per E-Mail) eine Bestätigung über den Eingang eines solchen Widerrufs übermitteln.
        </p>
        
        <p className="datenschutz-text">
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
        </p>

        <h2 className="datenschutz-heading2" id="folgen_des_widerrufs">Folgen des Widerrufs</h2>
        
        <p className="datenschutz-text">
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>

        <p className="datenschutz-text">
          Wir können die Rückzahlung verweigern, bis wir die Waren wieder zurückerhalten haben oder bis Sie den Nachweis erbracht haben, dass Sie die Waren zurückgesandt haben, je nachdem, welches der frühere Zeitpunkt ist.
        </p>

        <p className="datenschutz-text">
          Sie haben die Waren unverzüglich und in jedem Fall spätestens binnen vierzehn Tagen ab dem Tag, an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die Frist ist gewahrt, wenn Sie die Waren vor Ablauf der Frist von vierzehn Tagen absenden.
        </p>

        <p className="datenschutz-text">
          **Wir tragen die Kosten der Rücksendung der Waren.**
        </p>

        <p className="datenschutz-text">
          Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen zurückzuführen ist.
        </p>

        {/* Muster-Widerrufsformular (als visuell abgegrenzte Box) */}
        <div className="datenschutz-content" style={{ marginTop: '2.5rem', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
          <h3 className="datenschutz-heading3">Muster-Widerrufsformular</h3>
          <p className="datenschutz-text" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.
            <br></br>
            An Philipp Kaiser, Am Affenberg 3, 78050 Villingen-Schwenningen, Germany, kaishi.company@gmail.com
          </p>
          
          <ul className="datenschutz-text" style={{ listStyleType: 'none', paddingLeft: '0' }}>
            <li>– Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)</li>
            <li>– Bestellt am (*)/erhalten am (*)</li>
            <li>– Name des/der Verbraucher(s)</li>
            <li>– Anschrift des/der Verbraucher(s)</li>
            <li>– Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
            <li>– Datum</li>
          </ul>
          
          <p className="datenschutz-text" style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
            (*) Unzutreffendes streichen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;