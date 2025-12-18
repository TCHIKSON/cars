import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';
import SignIn from './Pages/SignIn';      // ← pages minuscule
import SignUp from './Pages/SignUp';      // ← pages minuscule

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <a href="/">Accueil</a> | 
          <a href="/add">Ajouter une voiture</a> | 
          <a href="/signin">Connexion</a> |     {/* ← Ajoute ce lien */}
          <a href="/signup">Inscription</a>     {/* ← Ajoute ce lien */}
        </nav>

        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/add" element={<CarForm />} />
          <Route path="/edit/:id" element={<CarForm />} />
          <Route path="/car/:id" element={<CarDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/cars" element={<CarForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;