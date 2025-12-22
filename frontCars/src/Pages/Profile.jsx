import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      setUser(decoded);
    } catch (e) {
      localStorage.removeItem("token");
      console.error("Erreur décodage token", e);
      navigate("/");
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username ? user.username.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="profile-main-info">
            <h1>Mon Profil</h1>
            <p className="status-badge">Membre Audi Performance</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="info-section">
            <div className="info-item">
              <label>Nom d'utilisateur</label>
              <p>{user.username || "Non défini"}</p>
            </div>
            <div className="info-item">
              <label>Adresse Email</label>
              <p>{user.email}</p>
            </div>
            <div className="info-item">
              <label>ID Client</label>
              <p className="client-id">#{user.id?.substring(0, 8).toUpperCase() || "ADMIN"}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button onClick={() => navigate("/my-cars")} className="btn btn-primary">
              Mes Réservations
            </button>
            <button onClick={() => navigate("/CarsList")} className="btn btn-outline">
              Explorer le catalogue
            </button>
          </div>
        </div>

        <div className="profile-footer">
          <button 
            className="logout-link" 
            onClick={() => {
              localStorage.removeItem("token");
              window.dispatchEvent(new Event("authChange"));
              navigate("/");
            }}
          >
            Se déconnecter de la session
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;