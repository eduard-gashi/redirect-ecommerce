import React, { useState } from 'react';
import apiClient from '../apiClient';

type Status = 'idle' | 'loading' | 'success' | 'error';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Emitting data to backend');
    setStatus('loading');
    try {
      await apiClient.post('/contact', {
        name,
        email,
        phoneNumber,
        message,
      });
      setStatus('success');
      setName('');
      setEmail('');
      setPhoneNumber('');
      setMessage('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="contact-container">
      <h2 className="product-title">Kontakt</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <label className="contact-label">
            Name (optional)
            <input
              type="text"
              className="contact-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="contact-label">
            Telefon (optional)
            <input
              type="tel"
              className="contact-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>

        <label className="contact-label">
          E-Mail *
          <input
            type="email"
            required
            className="contact-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="contact-label">
          Nachricht *
          <textarea
            required
            className="contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>

        <button type="submit" className="contact-submit" disabled={status === 'loading'}>
          {status === 'loading' ? '📨 Wird gesendet…' : '📩 Nachricht senden'}
        </button>

        {status === 'success' && (
          <p className="contact-status contact-status-success">
            Danke, deine Nachricht wurde gesendet.
          </p>
        )}
        {status === 'error' && (
          <p className="contact-status contact-status-error">
            Fehler beim Senden. Bitte versuche es später erneut.
          </p>
        )}
      </form>
    </div>
  );
}

export default Contact;
