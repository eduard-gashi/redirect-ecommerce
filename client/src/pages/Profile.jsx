import React, { useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import OrderHistory from '../components/OrderHistory'

function Profile() {
    const { state, dispatch } = useContext(AuthContext);
    const { userInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            console.log("Keine UserInfo im Context gefunden, Umleitung zu Login.");
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const handleLogOut = () => {
        dispatch({ type: 'USER_SIGNOUT' });
    }

    if (!userInfo) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', height: '100vh', background: '#f8f8f8' }}>
                <h1 style={{ color: '#333' }}>Profil wird geladen...</h1>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1 className="title-black">Mein Profil</h1>
            <div className="profile-details">
                <p className="text-paragraph">
                    <strong>E-Mail: </strong>{userInfo.email}
                </p>
                <p className="text-paragraph">
                    <strong>Verkaufshistorie: </strong> 
                    <OrderHistory></OrderHistory>
                </p>
                <button className="primary-button" onClick={handleLogOut}>
                    Ausloggen
                </button>
            </div>
        </div>
    );
}

export default Profile;