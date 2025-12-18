import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { carService } from "../Services/carService";

const CarForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [car, setCar] = useState({ brand: "", model: "", year: new Date().getFullYear(), category: "", imageUrl: "", isAvailable: false });
  const [error, setError] = useState("");

 
  useEffect(() => {
    if (isEditMode) {
      carService
        .getById(id)
        .then((res) => setCar(res.data))
        .catch((_err) => setError("Impossible de charger la voiture"));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
 
      const dataToSend = {
        brand: car.brand,
        model: car.model,
        category: car.category,
        year: Number(car.year),
        price: car.price ? Number(car.price) : undefined, 
        isAvailable: Boolean(car.isAvailable),
        imageUrl: car.imageUrl || "",
      };

      if (isEditMode) {
        await carService.update(id, dataToSend);
      } else {
        await carService.create(dataToSend);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur serveur");
    }
  };

  return (
    <div>
      <h2>{isEditMode ? `Modifier ${car.brand}` : "Ajouter une voiture"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={car.brand}
          onChange={(e) => setCar({ ...car, brand: e.target.value })}
          placeholder="Marque"
        />
        <input
          value={car.model}
          onChange={(e) => setCar({ ...car, model: e.target.value })}
          placeholder="Modèle"
        /><input
          value={car.category}
          onChange={(e) => setCar({ ...car, category: e.target.value })}
          placeholder="Catégorie"
        />
        <input
          type="number"
          value={car.year}
          onChange={(e) => setCar({ ...car, year: e.target.value })}
          placeholder="Année"
        />
        <input
          type="number"
          value={car.price}
          onChange={(e) => setCar({ ...car, price: e.target.value })}
          placeholder="Prix"
        />
        <input
          type="text"
          placeholder="URL de l'image"
          value={car.imageUrl}
          onChange={(e) => setCar({ ...car, imageUrl: e.target.value })}
        />
        <label>
          <input
            type="checkbox"
            checked={car.isAvailable}
            onChange={(e) => setCar({ ...car, isAvailable: e.target.checked })}
          />
          Disponible immédiatement
        </label>
        <button type="submit">
          {isEditMode ? "Sauvegarder les modifications" : "Créer la voiture"}
        </button>
      </form>
    </div>
  );
};

export default CarForm;
