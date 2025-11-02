import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';
import '../App.css';
import { AuthContext } from '../context/AuthContext';

// Typdefinition for user data returned from the API
interface UserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  token: string; // JWT-Token
}

function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needsRegistration, setNeedsRegistration] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AuthContext);
  const { userInfo } = state;

  // Check if user is already logged in and redirect to profile
  useEffect(() => {
        if (userInfo) {
            navigate('/profile');
        }
    }, [userInfo, navigate]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setHasAttemptedSubmit(true);

    if (passwordError) {
      setLoading(false);
      return;
    }

    try {
      if (needsRegistration) {
        // Registration flow: Send verification email
        await apiClient.post('/users/send-registration-email', { email, password });  // Tell backend to send email
        console.log('Registrierungs-E-Mail gesendet an:', email);
        setError('Wir haben eine Verifizierungs-Email gesendet. Bitte überprüfen Sie Ihr Postfach.');
        setNeedsRegistration(false);
      } else {
        // Regular login flow: Get user data from MongoDB
        const { data } = await apiClient.post<UserInfo>('/users/login', { email, password });
        dispatch({ type: 'USER_SIGNIN', payload: data });
        navigate('/profile');
      }
      setHasAttemptedSubmit(false);
    } catch (err: any) {
      console.error('Fehler bei der Anmeldung/Registrierung:', err);
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : 'Anmeldung/Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.'
      );
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (value: string): string => {
    if (value === '') return '';

    const errors: string[] = [];

    if (value.length < 8) {
      errors.push('mindestens 8 Zeichen');
    }
    if (!/[A-Z]/.test(value)) {
      errors.push('mindestens 1 Großbuchstabe');
    }
    if (!/[a-z]/.test(value)) {
      errors.push('mindestens 1 Kleinbuchstabe');
    }
    if (!/[0-9]/.test(value)) {
      errors.push('mindestens 1 Zahl');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors.push('mindestens 1 Sonderzeichen (!@#$...)');
    }

    if (errors.length > 0) {
      return `Passwort ist unsicher. Muss enthalten: ${errors.join(', ')}.`;
    }
    return '';
  };

  const handleSetPasswort = (value: string) => {
    setPassword(value);
    const validationMessage = validatePassword(value);
    setPasswordError(validationMessage);
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
              onChange={(e) => handleSetPasswort(e.target.value)}
            />
            {passwordError && hasAttemptedSubmit && (
              <p className="mt-2 text-xs text-red-600 font-medium p-2 bg-red-50 rounded-lg border border-red-200 shadow-sm">
                {passwordError}
              </p>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: '15px'
            }}
          >
            <span
              onClick={() => {
                setNeedsRegistration(!needsRegistration);
                setError('');
                setPasswordError('');
                setHasAttemptedSubmit(false);
              }}
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