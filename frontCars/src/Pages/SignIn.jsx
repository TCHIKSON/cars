import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../Services/api";

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
                console.log("🔍 RÉPONSE REÇUE:", response);
        if (response.error) {
          setError(response.message);
          return;
        }

        localStorage.setItem("token", response.data.token);
        api.updateAccessToken(response.data.token);

        navigate("/add");
      })
      .catch((err) => {
        console.log(err);
        setError(err.message);
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950">
      <div className="w-full max-w-md rounded-xl bg-slate-900 p-8 shadow-lg shadow-slate-900/70">
        <h1 className="mb-6 text-center text-2xl font-semibold text-slate-50">
          Connexion
        </h1>
        {error && (
          <p className="mb-4 rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error?.message || error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="mb-1 block text-sm text-slate-300"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-blue-500/0 transition focus:ring-2"
            />
          </div>
          <div>
            <label
              className="mb-1 block text-sm text-slate-300"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-50 outline-none ring-blue-500/0 transition focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm shadow-blue-900/40 transition hover:bg-blue-500"
          >
            Se connecter
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-slate-400">
          Pas de compte ?{" "}
          <Link
            to="/signup"
            className="font-medium text-blue-400 hover:text-blue-300"
          >
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;