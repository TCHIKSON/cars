import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <a href="/">Accueil</a> | <a href="/add">Ajouter une voiture</a>
        </nav>

        <Routes>
          <Route path="/" element={<CarList />} />
          <Route path="/add" element={<CarForm />} />
          <Route path="/edit/:id" element={<CarForm />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;