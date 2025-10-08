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
  const navigate = useNavigate();

  // TypeScript-Typ für das Formular-Submit-Event
  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await apiClient.post<UserInfo>('/api/users/login', { email, password });

      localStorage.setItem('userInfo', JSON.stringify(data));

      // Navigate to profile page after successful login
      navigate('/profile');

    } catch (err: any) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Anmeldung fehlgeschlagen. Bitte überprüfen Sie E-Mail und Passwort.'
      );
    } finally {
      setLoading(false);
    }
  };

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

          <button
            type="submit"
            disabled={loading}
            className='primary-button'
          >
            {loading ? 'Wird geladen...' : 'Einloggen'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;