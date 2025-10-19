import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient.jsx';

function AccountConfirmation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      return;
    }

    const confirmAccount = async () => {
      try {
        const { data } = await apiClient.get(`/users/confirm-registration?token=${token}`);
        
        alert(data.message); 
        navigate('/login');
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Fehler bei der Kontobestätigung.';
        alert(errorMessage);
        navigate('/login');
      }
    };

    confirmAccount();
  }, [token, navigate]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Konto wird bestätigt...</h1>
      <p>Bitte warten Sie einen Moment. Wir verarbeiten Ihren Registrierungscode.</p>
    </div>
  );
}

export default AccountConfirmation;