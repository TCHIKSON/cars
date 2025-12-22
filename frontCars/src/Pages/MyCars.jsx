import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../Services/api";
import "./Style/MyCars.css";

const MyReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadReservations = async () => {
    try {
      setLoading(true);
      
      const res = await api.reservation.getAll(); 
      console.log(res);
      
      const data = Array.isArray(res) ? res : res.data || [];
      setReservations(data);
    } catch (err) {
      setError("Impossible de charger vos réservations.",err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleCancel = async (id) => {
    if (window.confirm("Voulez-vous vraiment annuler cette réservation ?")) {
      try {
         await api.reservation.delete(id);
        setReservations(reservations.filter((r) => r._id !== id))
console.log('TextDecoderStream',reservations.filter((r) => r._id !== id));

      } catch (err) {
        alert("Erreur lors de l'annulation.",err);
      }
    }
  };

  if (loading) return <div className="audi-loader">Chargement...</div>;

  return (
    <div className="reservations-container">
      <div className="reservations-header">
        <h1>Mes Réservations</h1>
        <p>{reservations.length} véhicule(s) réservé(s)</p>
      </div>

      {error && <div className="auth-error">{error}</div>}

      <div className="reservations-list">
        {reservations.length > 0 ? (
          reservations.map((res) => (
            <div key={res._id} className="reservation-card">
              <div className="res-image">
                <img src={res.logoUrl || "/default-car.jpg"} alt={res.name} />
              </div>
              
              <div className="res-info">
                <div className="res-main">
                  <h3>{res.name}</h3>
                  <p className="res-date">
                    Du <strong>{new Date(res.startDate).toLocaleDateString()}</strong> au <strong>{new Date(res.endDate).toLocaleDateString()}</strong>
                  </p>
                </div>
                
                <div className="res-status">
                  <span className="badge-confirmed">Confirmé</span>
                </div>

                <div className="res-actions">
                  <button onClick={() => navigate(`/car/${res.car}`)} className="btn-res-view">
                    Détails
                  </button>
                  <button onClick={() => handleCancel(res._id)} className="btn-res-cancel">
                    Annuler
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-reservations">
            <p>Vous n'avez aucune réservation en cours.</p>
            <Link to="/CarsList" className="btn btn-primary">Explorer le catalogue</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;