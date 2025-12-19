import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../Services/api";
import "./Style/SignIn.css";

function SignIn() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.auth
      .signIn(form)
      .then((response) => {
        if (response.error) {
          setError(response.message);
          return;
        }
        localStorage.setItem("token", response.data.token);
        api.updateAccessToken(response.data.token);
        window.dispatchEvent(new Event("authChange"));
        navigate("/CarsList");
      })
      .catch((err) => {
        setError("Identifiants incorrects ou mot de passe erroné.", err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>Connexion</h1>
          <p className="auth-subtitle">Accédez à votre espace, Katcha!!</p>
        </div>

        {error && (
          <div className="auth-error">
            <span>!</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="votre@email.com"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Se connecter
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Pas encore de compte ?{" "}
            <Link to="/signup" className="auth-link">
              Créer un compte
            </Link>
          </p>
          <Link to="/" className="auth-back">
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
