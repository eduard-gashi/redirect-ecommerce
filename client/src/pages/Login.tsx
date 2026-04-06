import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import apiClient from '../apiClient';
import { AuthContext } from '../context/AuthContext';
import {
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import '../styles/login.css';
import type { AxiosError } from 'axios';

interface UserInfo {
  _id: string;
  email: string;
  isAdmin: boolean;
  token: string; // JWT-Token
}

export default function Login(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [needsRegistration, setNeedsRegistration] = useState<boolean>(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState<boolean>(false);
  const navigate = useNavigate();

  const { state, dispatch } = useContext(AuthContext);
  const { userInfo } = state;

  // Check if user is already logged in and redirect to profile
  useEffect(() => {
    if (userInfo) {
      navigate('/profil');
    }
  }, [userInfo, navigate]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setLoading(true);
    setHasAttemptedSubmit(true);

    if (passwordError && needsRegistration) {
      setLoading(false);
      return;
    }

    try {
      if (needsRegistration) {
        // Registration flow: Send verification email
        await apiClient.post('/users/send-registration-email', { email, password });
        console.log('Registrierungs-E-Mail gesendet an:', email);
        setSuccessMessage(
          'Wir haben eine Verifizierungs-E-Mail gesendet. Bitte überprüfen Sie Ihr Postfach.',
        );
        setNeedsRegistration(false);
        setPassword('');
        setPasswordError('');
      } else {
        // Regular login flow: Get user data from MongoDB
        const { data } = await apiClient.post<UserInfo>('/users/login', { email, password });
        dispatch({ type: 'USER_SIGNIN', payload: data });
        navigate('/profil');
      }
      setHasAttemptedSubmit(false);
    } catch (err) {
      console.error('Fehler bei der Anmeldung/Registrierung:', err);

      const axiosError = err as AxiosError<{ message?: string }>;
      const message =
        axiosError.response?.data?.message ??
        'Anmeldung/Registrierung fehlgeschlagen. Bitte überprüfen Sie Ihre Eingaben.';
      setError(message);
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

  const handleSetPassword = (value: string) => {
    setPassword(value);
    if (needsRegistration) {
      const validationMessage = validatePassword(value);
      setPasswordError(validationMessage);
    }
  };

  const handleToggleMode = () => {
    setNeedsRegistration(!needsRegistration);
    setError('');
    setSuccessMessage('');
    setPasswordError('');
    setHasAttemptedSubmit(false);
    setPassword('');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Brand Section */}
        <div className="login-brand">
          <div className="login-logo">
            <ShoppingBag className="login-logo-icon" strokeWidth={2} />
          </div>
          <h2 className="login-brand-name">redirect</h2>
        </div>

        {/* Title */}
        <h1 className="login-title">{needsRegistration ? 'Konto erstellen' : 'Anmelden'}</h1>
        <p className="login-subtitle">
          {needsRegistration
            ? 'Erstellen Sie Ihr Konto und starten Sie Ihre Detox-Reise'
            : 'Willkommen zurück! Melden Sie sich an, um fortzufahren'}
        </p>

        {/* Error Message */}
        {error && (
          <div className="login-error-message">
            <AlertCircle className="login-error-icon" />
            <p className="login-error-text">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="login-success-message">
            <CheckCircle className="login-success-icon" />
            <p className="login-success-text">{successMessage}</p>
          </div>
        )}

        {/* Form */}
        <form className="login-form" onSubmit={submitHandler}>
          {/* Email Field */}
          <div className="login-form-group">
            <label htmlFor="email" className="login-form-label">
              E-Mail-Adresse
            </label>
            <div className="login-input-wrapper">
              <Mail className="login-input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="login-form-input"
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="login-form-group">
            <label htmlFor="password" className="login-form-label">
              Passwort
            </label>
            <div className="login-input-wrapper">
              <Lock className="login-input-icon" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`login-form-input ${passwordError && hasAttemptedSubmit && needsRegistration ? 'error' : ''}`}
                placeholder="••••••••"
                value={password}
                onChange={(e) => handleSetPassword(e.target.value)}
                autoComplete={needsRegistration ? 'new-password' : 'current-password'}
              />
            </div>

            {/* Password Validation */}
            {passwordError && hasAttemptedSubmit && needsRegistration && (
              <div className="login-password-validation">
                <AlertCircle className="login-validation-icon" />
                <p className="login-validation-text">{passwordError}</p>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || (needsRegistration && hasAttemptedSubmit && !!passwordError)}
            className={`login-submit-button ${loading ? 'loading' : ''}`}
          >
            <span className="login-button-content">
              {loading ? (
                <>
                  <Loader2 className="login-loading-spinner" />
                  Wird geladen...
                </>
              ) : (
                <>
                  {needsRegistration ? 'Registrierungs-E-Mail senden' : 'Einloggen'}
                  <ArrowRight size={18} />
                </>
              )}
            </span>
          </button>

          {/* Toggle Between Login/Register */}
          <div className="login-toggle-section">
            <p className="login-toggle-text">
              {needsRegistration ? 'Haben Sie bereits ein Konto?' : 'Noch kein Konto?'}
            </p>
            <button type="button" onClick={handleToggleMode} className="login-toggle-link">
              {needsRegistration ? 'Zurück zum Login' : 'Hier registrieren'}
              <ArrowRight className="login-toggle-icon" size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
