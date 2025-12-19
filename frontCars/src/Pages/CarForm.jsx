import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../Services/api";
import "./Style/CarForm.css";

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [car, setCar] = useState({
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    category: "",
    imageUrl: "",
    isAvailable: false,
    price: 0,
    tags: [],
  });

  const [tagInput, setTagInput] = useState("");
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(true);
  const SUGGESTED_TAGS = [
    "Électrique",
    "Hybride",
    "Automatique",
    "Manuelle",
    "Toit Panoramique",
    "Cuir",
    "GPS",
    "Caméra de recul",
    "Occasion",
    "Neuf",
  ];

  const handleTagSelection = (tagName) => {
    if (tagName && !car.tags.includes(tagName)) {
      setCar({ ...car, tags: [...car.tags, tagName] });
    }
    setTagInput("");
  };
  const addTag = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      if (!car.tags.includes(tagInput.trim())) {
        setCar({ ...car, tags: [...car.tags, tagInput.trim()] });
      }
      setTagInput("");
    }
  };

  const removeTag = (indexToRemove) => {
    setCar({
      ...car,
      tags: car.tags.filter((_, index) => index !== indexToRemove),
    });
  };

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setBrandsLoading(true);
        const result = await api.brand.getAll();
        setBrands(Array.isArray(result) ? result : result.data || []);
      } catch (error) {
        console.error("Erreur chargement marques:", error);
        setError("Impossible de charger les marques");
      } finally {
        setBrandsLoading(false);
      }
    };

    loadBrands();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      api.car
        .getById(id)
        .then((res) => {
          setCar({
            brand: res.brand?._id || res.brand || "",
            model: res.model || "",
            year: res.year || new Date().getFullYear(),
            category: res.category || "",
            imageUrl: res.imageUrl || "",
            isAvailable: res.isAvailable || false,
            price: res.price || 0,
            tags: res.tags || [],
          });
        })
        .catch(() => setError("Impossible de charger la voiture"))
        .finally(() => setLoading(false));
    }
  }, [id, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const dataToSend = {
        brand: car.brand,
        model: car.model,
        category: car.category,
        year: Number(car.year),
        price: car.price ? Number(car.price) : undefined,
        isAvailable: Boolean(car.isAvailable),
        imageUrl: car.imageUrl || "",
        tags: car.tags,
      };

      let result;
      if (isEditMode) {
        result = await api.car.update(id, dataToSend);
      } else {
        result = await api.car.create(dataToSend);
      }

      if (result.error) {
        setError(result.message);
      } else {
        navigate(isEditMode ? `/car/${result._id}` : "/CarsList");
      }
    } catch (err) {
      setError("Une erreur critique est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (loading || brandsLoading)
    return <div className="loading">Chargement...</div>;
  const selectedBrandName = brands.find((b) => b._id === car.brand)?.name;

  return (
    <div className="car-form-container">
      <div className="car-form-wrapper">
        <div className="form-header">
          <h1>
            {isEditMode
              ? `Modifier ${selectedBrandName || "la voiture"}`
              : "Ajouter une voiture"}
          </h1>
          <p className="form-subtitle">
            {isEditMode
              ? "Modifiez les informations de votre véhicule"
              : "Ajoutez un nouveau véhicule à votre collection"}
          </p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon"></span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="car-form">
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="brand">Marque</label>
              <select
                id="brand"
                value={car.brand}
                onChange={(e) => setCar({ ...car, brand: e.target.value })}
                required
              >
                <option value="">Sélectionner une marque</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="model">Modèle</label>
              <input
                id="model"
                type="text"
                value={car.model}
                onChange={(e) => setCar({ ...car, model: e.target.value })}
                placeholder="Ex: A4, Serie 3, Classe C..."
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Catégorie</label>
              <select
                id="category"
                value={car.category}
                onChange={(e) => setCar({ ...car, category: e.target.value })}
                required
              >
                <option value="">Sélectionner une catégorie</option>
                <option value="Berline">Berline</option>
                <option value="SUV">SUV</option>
                <option value="Coupé">Coupé</option>
                <option value="Break">Break</option>
                <option value="Cabriolet">Cabriolet</option>
                <option value="Citadine">Citadine</option>
                <option value="Sportive">Sportive</option>
              </select>
            </div>

            <div className="input-group">
              <label htmlFor="year">Année</label>
              <input
                id="year"
                type="number"
                value={car.year}
                onChange={(e) => setCar({ ...car, year: e.target.value })}
                min="1950"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="price">Prix (€)</label>
              <input
                id="price"
                type="number"
                value={car.price}
                onChange={(e) => setCar({ ...car, price: e.target.value })}
                placeholder="25000"
                min="0"
                required
              />
            </div>
            <div className="input-group full-width">
              <label htmlFor="tags-input">Tags du véhicule</label>

              <div className="tags-display-area">
                {car.tags.map((tag, index) => (
                  <span key={index} className="tag-badge">
                    {tag}
                    <button type="button" onClick={() => removeTag(index)}>
                      x
                    </button>
                  </span>
                ))}
              </div>

              <div className="input-wrapper">
                <input
                  list="suggested-tags"
                  id="tags-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleTagSelection(tagInput.trim());
                    }
                  }}
                  placeholder="Choisir ou taper un tag..."
                  className="tag-input-field"
                />

                <datalist id="suggested-tags">
                  {SUGGESTED_TAGS.map((sTag, idx) => (
                    <option key={idx} value={sTag} />
                  ))}
                </datalist>
              </div>
            </div>
            <div className="input-group full-width">
              <label htmlFor="imageUrl">URL de l'image</label>
              <input
                id="imageUrl"
                type="url"
                value={car.imageUrl}
                onChange={(e) => setCar({ ...car, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={car.isAvailable}
                onChange={(e) =>
                  setCar({ ...car, isAvailable: e.target.checked })
                }
              />
              <span className="checkmark"></span>
              <span>Véhicule disponible immédiatement</span>
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-secondary"
              disabled={loading}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading
                ? "Traitement..."
                : isEditMode
                ? "Sauvegarder les modifications"
                : "Créer la voiture"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;
