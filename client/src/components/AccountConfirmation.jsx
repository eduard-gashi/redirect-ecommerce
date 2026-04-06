import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient.jsx';

function AccountConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token || isConfirmed || isLoading) {
      return;
    }

    const confirmAccount = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.get(`/users/confirm-registration?token=${token}`);

        alert(data.message);
        setIsConfirmed(true);
        navigate('/login');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Fehler bei der Kontobestätigung.';
        alert(errorMessage);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };

    confirmAccount();
  }, [token, navigate, isConfirmed, isLoading]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>{isLoading ? 'Konto wird bestätigt...' : 'Bestätigung abgeschlossen.'}</h1>
      <p>
        {isLoading
          ? 'Bitte warten Sie einen Moment. Wir verarbeiten Ihren Registrierungscode.'
          : 'Sie werden gleich weitergeleitet.'}
      </p>
    </div>
  );
}

export default AccountConfirmation;
