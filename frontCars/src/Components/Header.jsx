import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../Services/api";
import "./Style/Header.css";

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUserName("");
    api.updateAccessToken("");

    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const checkUserAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        setIsAuthenticated(true);

        setUserName(
          decodedToken.username || decodedToken.email || "Utilisateur"
        );
      } catch (e) {
        console.error("Erreur décodage token", e);
        handleLogout();
      }
    } else {
      setIsAuthenticated(false);
      setUserName("");
    }
  };

  useEffect(() => {
    checkUserAuth();

    window.addEventListener("authChange", checkUserAuth);
    window.addEventListener("storage", checkUserAuth);

    return () => {
      window.removeEventListener("authChange", checkUserAuth);
      window.removeEventListener("storage", checkUserAuth);
    };
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          <Link to="/CarsList" className="logo">
            <img
              src="https://cdn.worldvectorlogo.com/logos/disney-and-pixar-cars.svg"
              alt="Cars Logo"
              className="logo-icon"
            />
            <span className="logo-text">Cars</span>
          </Link>
        </div>

        <nav className="main-nav">
          <div className="nav-links">
            <div className="nav-dropdown">
              <span className="nav-link dropdown-trigger">
                Véhicules
                <span className="dropdown-arrow">▼</span>
              </span>
              <div className="dropdown-menu">
                <Link to="/CarsList">Véhicules</Link>

                {isAuthenticated && (
                  <Link to="/Véhicules/Gestion">Gestion des Véhicules</Link>
                )}
              </div>
            </div>

            {isAuthenticated && (
              <Link
                to="/add"
                className={`nav-link ${isActive("/add") ? "active" : ""}`}
              >
                <span>Ajouter</span>
              </Link>
            )}

            <Link
              to="/about"
              className={`nav-link ${isActive("/about") ? "active" : ""}`}
            >
              <span>À propos</span>
            </Link>
          </div>
        </nav>

        <div className="user-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">👤</span>
                <span className="user-name">{userName}</span>
              </div>
              <div className="user-dropdown">
                <Link to="/profile" className="dropdown-item">
                  Mon profil
                </Link>
                <Link to="/my-cars" className="dropdown-item">
                  Mes véhicules
                </Link>
                <button onClick={handleLogout} className="dropdown-item logout">
                  Déconnexion
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/" className="btn btn-outline">
                Connexion
              </Link>
              <Link to="/signup" className="btn btn-primary">
                S'inscrire
              </Link>
            </div>
          )}

          {/* Menu mobile */}
          <button
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/CarsList" onClick={() => setIsMenuOpen(false)}>
            Véhicules
          </Link>
          {isAuthenticated && (
            <Link to="/add" onClick={() => setIsMenuOpen(false)}>
              Ajouter
            </Link>
          )}
          <Link to="/services" onClick={() => setIsMenuOpen(false)}>
            Services
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            À propos
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                Connexion
              </Link>
              <Link to="/signup" onClick={() => setIsMenuOpen(false)}>
                S'inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
