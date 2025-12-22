import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Services/api";

const CarSales = ({ car, onActionSuccess }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);
  const token = localStorage.getItem("token");
  let decodedToken = null;

  if (token) {
    try {
      decodedToken = JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.error("Token invalide", e);
    }
  }

  const toggleAvailability = async () => {
    const action = car.isAvailable
      ? "rendre indisponible"
      : "rendre disponible";
    if (!window.confirm(`Voulez-vous vraiment ${action} ce véhicule ?`)) return;

    setLoading(true);
    try {
      const updateData = {
        brand: typeof car.brand === "object" ? car.brand._id : car.brand,
        model: car.model,
        category: car.category,
        year: car.year,
        price: car.price,
        isAvailable: !car.isAvailable,
        imageUrl: car.imageUrl || "",
        tags: car.tags || [],
      };

      await api.car.update(car._id, updateData);
      setStatusMessage({
        text: !car.isAvailable ? " Disponible" : " Indisponible",
        type: "success",
      });
      if (onActionSuccess) onActionSuccess();
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      setStatusMessage({ text: " Erreur modification", type: "error", error });
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  const handleReservation = async () => {
    if (!isAuthenticated) {
      setStatusMessage({
        text: "Veuillez vous connecter ou créer un compte pour réserver ce véhicule",
        type: "error",
      });
      setTimeout(() => {
        navigate("/");
      }, 3000);
      return;
    }

    const reservationData = {
      name: `${decodedToken.username || "Utilisateur"}`,
      email: `${decodedToken.email || "Utilisateur"}`,
      car: car._id,
      logoUrl: car.imageUrl || "",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    };

    setLoading(true);
    try {
      await api.reservation.create(reservationData);
      setStatusMessage({ text: " Demande envoyée !", type: "success" });
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      setStatusMessage({ text: " Échec réservation", type: "error", error });
      setTimeout(() => setStatusMessage(null), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="audi-sales-card"
      style={{
        border: "1px solid #000",
        padding: "30px",
        position: "relative",
        background: "#fff",
      }}
    >
      <h4
        style={{
          textTransform: "uppercase",
          fontSize: "11px",
          color: "#888",
          margin: "0 0 10px 0",
        }}
      >
        Prix de vente conseillé
      </h4>

      <div
        style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "20px" }}
      >
        {car.price?.toLocaleString()} €
      </div>

      <div style={{ marginBottom: "30px" }}>
        <span
          style={{
            display: "inline-block",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: car.isAvailable ? "#28a745" : "#ffc107",
            marginRight: "10px",
          }}
        ></span>
        <span
          style={{
            textTransform: "uppercase",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {car.isAvailable ? "Disponible immédiatement" : "Indisponible"}
        </span>
      </div>

      {statusMessage && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            left: "10px",
            padding: "10px",
            backgroundColor:
              statusMessage.type === "success" ? "#f0fff4" : "#fff5f5",
            border: `1px solid ${
              statusMessage.type === "success" ? "#28a745" : "#dc3545"
            }`,
            color: statusMessage.type === "success" ? "#28a745" : "#dc3545",
            fontSize: "11px",
            textAlign: "center",
            fontWeight: "bold",
            textTransform: "uppercase",
            zIndex: 10,
          }}
        >
          {statusMessage.text}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <button
          onClick={handleReservation}
          disabled={loading || !car.isAvailable}
          style={{
            width: "100%",
            padding: "15px",
            border: "1px solid black",
            backgroundColor: "white",
            color: "black",
            textTransform: "uppercase",
            letterSpacing: "2px",
            cursor: loading || !car.isAvailable ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "0.3s",
            opacity: !car.isAvailable ? 0.5 : 1,
          }}
        >
          {car.isAvailable ? "Réserver ce véhicule" : "Déjà réservé"}
        </button>

        {isAuthenticated && (
          <button
            onClick={toggleAvailability}
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px",
              border: "1px solid black",
              backgroundColor: "black",
              color: "white",
              textTransform: "uppercase",
              letterSpacing: "2px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              transition: "0.3s",
            }}
          >
            {car.isAvailable ? "Marquer Indisponible" : "Marquer Disponible"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CarSales;
