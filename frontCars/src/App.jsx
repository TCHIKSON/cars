import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CarList from "./pages/CarList";
import CarForm from "./pages/CarForm";
import CarDetails from "./pages/CarDetails";
import SignIn from "./Pages/SignIn.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Header from "./Components/Header.jsx";
import CarGestion from "./Pages/CarGestion.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import NotFound from "./Pages/NotFound";
import MyCars from "./Pages/MyCars.jsx";
import Profile from "./Pages/Profile.jsx";
function App() {
  return (
    <Router>
      <div className="container">
        <Header />

        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/CarsList" element={<CarList />} />
          <Route path="/car/:id" element={<CarDetails />} />

          <Route
            path="/Véhicules/Gestion"
            element={
              <ProtectedRoute>
                <CarGestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cars"
            element={
              <ProtectedRoute>
                <MyCars />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <CarForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <CarForm />
              </ProtectedRoute>
            }
          />

          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
