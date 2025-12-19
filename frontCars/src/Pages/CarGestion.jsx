import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../Services/api";
import BrandCarousel from "../Components/BrandCarousel";
import TagFilterBar from "../Components/TagFilterBar";
import "./Style/CarGrid.css";

const CarGrid = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedBrand] = useState("all");
  const [selectedTags, setSelectedTags] = useState([]);

  const token = localStorage.getItem("token");
  const [isAuthenticated] = useState(!!token);
  const navigate = useNavigate();

  const editCar = (carId) => {
    navigate(`/edit/${carId}`);
  };

  useEffect(() => {
    api.car
      .getAll()
      .then((res) => {
        const carsList = Array.isArray(res) ? res : res.data || [];
        setCars(carsList);
        setFilteredCars(carsList);
      })
      .catch((err) => console.error(err));
  }, []);

  const applyFilters = (brandId, tags, currentCars = cars) => {
    let result = [...currentCars];

    if (brandId !== "all") {
      result = result.filter(
        (car) =>
          (typeof car.brand === "object" ? car.brand._id : car.brand) ===
          brandId
      );
    }

    if (tags.length > 0) {
      result = result.filter((car) =>
        tags.every((t) => car.tags && car.tags.includes(t))
      );
    }

    setFilteredCars(result);
  };

  const handleTagToggle = (tag) => {
    let newTags;
    if (tag === "clear-all") {
      newTags = [];
    } else {
      newTags = selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag];
    }
    setSelectedTags(newTags);
    applyFilters(selectedBrand, newTags);
  };



  const handleDelete = async (id) => {
    if (window.confirm("Supprimer ce véhicule ?")) {
      try {
        await api.car.delete(id);
        const updatedCars = cars.filter((c) => c._id !== id);
        setCars(updatedCars);

        applyFilters(selectedBrand, selectedTags, updatedCars);
      } catch (err) {
        console.error("Erreur suppression:", err);
      }
    }
  };

  return (
    <div className="car-grid">
      <div className="car-grid-header">
        <h2>
          {selectedBrand === "all" && selectedTags.length === 0
            ? `Toutes les voitures (${filteredCars.length})`
            : `Véhicules filtrés (${filteredCars.length})`}
        </h2>
      </div>

      <div className="car-grid-container">
        {filteredCars.map((car) => (
          <div key={car._id} className="audi-car-card">
            <div
              className="audi-image-wrapper"
              onClick={() => editCar(car._id)}
            >
              <img
                src={car.imageUrl || "/default-car.jpg"}
                alt={`${car.brand?.name} ${car.model}`}
                className="audi-img"
              />
              {car.isAvailable ? (
                <span className="badge-available">Disponible</span>
              ) : (
                <span className="badge-sold">Vendu</span>
              )}
            </div>

            <div className="audi-content">
              <div className="audi-header">
                <p className="audi-category">{car.category || "Premium"}</p>
                <h2 className="audi-title">
                  <span className="brand-name">{car.brand?.name}</span>{" "}
                  {car.model}
                </h2>
              </div>

              <div className="audi-specs">
                <div className="spec-item">
                  <span className="label">Année</span>
                  <span className="value">{car.year}</span>
                </div>
                <div className="spec-divider"></div>
                <div className="spec-item">
                  <span className="label">Prix</span>
                  <span className="value">{car.price?.toLocaleString()} €</span>
                </div>
              </div>

              {car.tags && car.tags.length > 0 && (
                <div className="audi-tags">
                  {car.tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="mini-tag">
                      # {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="audi-footer">
                <button
                  onClick={() => editCar(car._id)}
                  className="btn-audi-primary"
                >
                  Modifier
                </button>
                {isAuthenticated && (
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn-audi-delete"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredCars.length === 0 && (
        <div
          className="no-results-message"
          style={{ textAlign: "center", padding: "50px" }}
        >
          <p>Aucun véhicule ne correspond à vos critères de recherche.</p>
          <button
            onClick={() => handleTagToggle("clear-all")}
            className="btn-audi-delete"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};

export default CarGrid;
