import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../Services/api.js";
import "./Style/SignIn.css";

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.auth
      .signUp(form)
      .then((response) => {
        if (response.error) {
          setError(response.message);
          setSuccess("");
          return;
        }
        setSuccess("Compte créé avec succès. Redirection...");
        setError("");
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => {
        setError("Erreur lors de l'inscription.", err);
        setSuccess("");
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-header">
          <h1>Inscription</h1>
          <p className="auth-subtitle">Rejoignez l'univers Audi Performance</p>
        </div>

        {error && (
          <div className="auth-error">
            <span></span> {error}
          </div>
        )}
        {success && (
          <div className="auth-success">
            <span></span> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Ex: AudiSport_92"
              required
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Adresse Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="nom@exemple.com"
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
              placeholder="Minimum 6 caractères"
              required
              minLength="6"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary auth-submit">
            Créer mon compte
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Déjà inscrit ?{" "}
            <Link to="/" className="auth-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
