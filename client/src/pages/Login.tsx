import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import '../App.css';

// Typdefinition for user data returned from the API
interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string; // JWT-Token
}

function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needsRegistration, setNeedsRegistration] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (needsRegistration) {
        // Registration flow: Send verification email
        await apiClient.post('/api/users/send-registration-email', { email });  // Tell backend to send email
        setError('Registrierungslink an Ihre E-Mail gesendet. Bitte überprüfen Sie Ihr Postfach.');
        setNeedsRegistration(false);
      } else {
        // Regular login flow: Get user data from MongoDB
        const { data } = await apiClient.post<UserInfo>('/api/users/login', { email, password });
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/profile');
      }

    } catch (err: any) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Anmeldung/Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    setNeedsRegistration(true);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="title-black">
          Anmelden
        </h2>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form className="login-form" onSubmit={submitHandler}>
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

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: '15px' // Etwas Abstand hinzufügen
            }}
          >
            <span 
              onClick={() => setNeedsRegistration(!needsRegistration)} // Reset state
              style={{ 
                cursor: 'pointer', 
                color: '#007bff', 
                textDecoration: 'underline' 
              }}
            >
              {needsRegistration
                ? 'Zurück zum Login' 
                : 'Noch kein Konto? Hier registrieren'
              }
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className='primary-button'
          >
            {loading 
              ? 'Wird geladen...' 
              : needsRegistration ? 'Registrierungs-E-Mail senden' : 'Einloggen'
            }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;