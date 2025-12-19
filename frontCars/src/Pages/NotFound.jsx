import { useNavigate } from "react-router-dom";
import "./Style/NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-code">404</h1>
        <div className="notfound-divider"></div>
        <h2 className="notfound-title">Trajectoire perdue</h2>
        <p className="notfound-text">
          La page que vous tentez d’ouvrir nécessite une connexion ou n’a pas
          encore été développée. Il est également possible qu’elle n’existe plus
          ou qu’elle ait été déplacée. Ne restez pas bloqué : revenez en arrière
          et poursuivez votre navigation.
        </p>

        <div className="notfound-actions">
          <button
            onClick={() => navigate("/CarsList")}
            className="btn btn-primary"
          >
            Retour au catalogue
          </button>
          <button onClick={() => navigate(-1)} className="btn btn-secondary">
            Page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
