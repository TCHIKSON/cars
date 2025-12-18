import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './pages/CarList';
import CarForm from './pages/CarForm';
import CarDetails from './pages/CarDetails';
import SignIn from './Pages/SignIn.jsx'; 
import SignUp from './Pages/SignUp.jsx';  

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <a href="/CarsList">Liste de Voitures</a> | <a href="/">Se connecter / Créer un compte</a>
        </nav>

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/CarsList" element={<CarList />} />
          <Route path="/add" element={<CarForm />} />
          <Route path="/edit/:id" element={<CarForm />} />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;