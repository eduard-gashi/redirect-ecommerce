import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Profile() {
    // State für Benutzerinformationen
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    console.log("Profile component rendered");

    useEffect(() => {
        // 1. Daten aus dem localStorage laden
        const storedUserInfo = localStorage.getItem('userInfo');

        if (storedUserInfo) {
            try {
                const parsedInfo = JSON.parse(storedUserInfo);
                setUserInfo(parsedInfo);
                console.log("Benutzerinformationen geladen:", parsedInfo);
            } catch (error) {
                console.error("Fehler beim Parsen der Benutzerinformationen:", error);
                // Bei Fehler auf Login umleiten
                localStorage.removeItem('userInfo');
                navigate('/login');
            }
        } else {
            // Wenn keine UserInfo vorhanden ist, auf Login umleiten
            console.log("Keine UserInfo gefunden, Umleitung zu Login.");
            navigate('/login');
        }
    }, [navigate]);

    if (!userInfo) {
        // Zeigt "Wird geladen..." an, bis die Daten verarbeitet sind
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
                    <strong>Verkaufshistorie: </strong> (Noch nicht implementiert)
                </p>
            </div>
        </div>
    );
}
export default Profile;