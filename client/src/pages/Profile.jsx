import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import OrderHistory from '../components/order/OrderHistory';

function Profile() {
  const { state, dispatch } = useContext(AuthContext);
  const { userInfo } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      console.log('Keine UserInfo im Context gefunden, Umleitung zu Login.');
      navigate('/login');
    }
  }, [userInfo, navigate]);

  const handleLogOut = () => {
    dispatch({ type: 'USER_SIGNOUT' });
  };

  if (!userInfo) {
    return (
      <div style={{ padding: '50px', textAlign: 'center', height: '100vh', background: '#f8f8f8' }}>
        <h1 style={{ color: '#333' }}>Profil wird geladen...</h1>
      </div>
    );
  }

  return (
    <div className="profile-view">
      {/* Header */}
      <div className="profile-header-container">
        <h1 className="product-title">Bestellungen</h1>
      </div>

      {/* Order History */}
      <div className="profile-details">
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <p className="text-paragraph">
            <strong>
              Eingeloggt als: <br></br>
            </strong>
            {userInfo.email}
          </p>
          <button className="filter-tab" onClick={handleLogOut}>
            Ausloggen
          </button>
        </div>
        <p className="text-paragraph">
          <OrderHistory></OrderHistory>
        </p>
      </div>
    </div>
  );
}

export default Profile;
