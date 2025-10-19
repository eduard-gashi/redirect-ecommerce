import React, { useState } from 'react';

// Hauptkomponente für das Registrierungsformular
const SignUp = () => {
  // Zustände für Formulareingaben und UI
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Neu: Passwort-Bestätigung
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Neu: Erfolgsmeldung
  const [loading, setLoading] = useState(false);

  /**
   * Simulierter Registrierungs-Handler
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    // 1. Validierung der Passwörter
    if (password !== confirmPassword) {
      setError('Die Passwörter stimmen nicht überein.');
      return;
    }

    setLoading(true);

    // 2. Simulierte Authentifizierungs-E-Mail-Logik
    try {
      // Hier würden Sie Ihren API-Aufruf zur Registrierung machen.
      // Der Server würde dann die E-Mail senden.
      console.log(`Versuche, den Benutzer ${email} zu registrieren...`);

      // Simulation des API-Aufrufs
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      setSuccessMessage(
        `Registrierung erfolgreich! Eine Bestätigungs-E-Mail wurde an ${email} gesendet. Bitte klicken Sie auf den Link, um Ihr Konto zu aktivieren.`
      );
      setEmail('');
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      // Fehlerbehandlung
      setError('Fehler bei der Registrierung. Bitte versuchen Sie es später erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">
          Sign In
        </h2>
        
        <p className="signup-info-text">
          Registrieren Sie sich mit Ihrer E-Mail-Adresse und einem Passwort, um den Anmeldevorgang zu starten. Wir senden Ihnen eine Bestätigungs-E-Mail.
        </p>

        {/* Erfolgsmeldung (Neu) */}
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}

        {/* Fehleranzeige */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={submitHandler}>
          {/* E-Mail-Feld */}
          <div>
            <label htmlFor="email" className="form-label">
              E-Mail-Adresse
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Passwort-Feld */}
          <div>
            <label htmlFor="password" className="form-label">
              Passwort
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Passwort bestätigen (Neu) */}
          <div>
            <label htmlFor="confirmPassword" className="form-label">
              Passwort bestätigen
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-button"
          >
            {loading ? 'Wird registriert...' : 'Sign In & Bestätigungs-E-Mail senden'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;