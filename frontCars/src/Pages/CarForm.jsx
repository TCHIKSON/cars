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

  const [newBrand, setIsNewBrand] = useState(false);
  const [newBrandData, setNewBrandData] = useState({
    name: "",
    country: "",
    logoUrl: ""
  });

  const [tagInput, setTagInput] = useState("");
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [brandsLoading, setBrandsLoading] = useState(true);

  const SUGGESTED_TAGS = ["Électrique", "Hybride", "Automatique", "Manuelle", "Toit Panoramique", "Cuir", "GPS", "Caméra de recul", "Occasion", "Neuf"];

  useEffect(() => {
    const loadBrands = async () => {
      try {
        setBrandsLoading(true);
        const result = await api.brand.getAll();
        setBrands(Array.isArray(result) ? result : result.data || []);
      } catch (error) {
        setError("Impossible de charger les marques", error);
      } finally {
        setBrandsLoading(false);
      }
    };
    loadBrands();
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setLoading(true);
      api.car.getById(id)
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
      let finalBrandId = car.brand;

      if (newBrand) {
        const brandResult = await api.brand.create(newBrandData);
        if (brandResult.error) throw new Error(brandResult.message);
        finalBrandId = brandResult._id || brandResult.data._id;
      }

      const dataToSend = {
        ...car,
        brand: finalBrandId,
        year: Number(car.year),
        price: Number(car.price),
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
        navigate(isEditMode ? `/car/${result._id || id}` : "/CarsList");
      }
    } catch (err) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleTagSelection = (tagName) => {
    if (tagName && !car.tags.includes(tagName)) {
      setCar({ ...car, tags: [...car.tags, tagName] });
    }
    setTagInput("");
  };

  const removeTag = (idx) => setCar({ ...car, tags: car.tags.filter((_, i) => i !== idx) });

  if (loading || brandsLoading) return <div className="loading">Chargement...</div>;

  return (
    <div className="car-form-container">
      <div className="car-form-wrapper">
        <div className="form-header">
          <h1>{isEditMode ? "Modifier le véhicule" : "Ajouter un véhicule"}</h1>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="car-form">
          
          
          <div className="brand-selection-zone" style={{ marginBottom: '20px', padding: '15px', background: '#f8f8f8', borderLeft: '4px solid #000' }}>
            <label className="checkbox-label" style={{ marginBottom: '15px', display: 'block' }}>
              <input 
                type="checkbox" 
                checked={newBrand} 
                onChange={(e) => setIsNewBrand(e.target.checked)} 
              />
              <span className="checkmark"></span>
              <span style={{ fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px' }}>
                Ajouter une nouvelle marque (non listée)
              </span>
            </label>

            {!newBrand ? (
              <div className="input-group">
                <label htmlFor="brand">Sélectionner la Marque</label>
                <select
                  id="brand"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  required={!newBrand}
                >
                  <option value="">Choisir une marque </option>
                  {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
                </select>
              </div>
            ) : (
              <div className="new-brand-fields" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', animation: 'fadeIn 0.3s' }}>
                <div className="input-group">
                  <label>Nom de la marque</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Lamborghini"
                    value={newBrandData.name}
                    onChange={(e) => setNewBrandData({...newBrandData, name: e.target.value})}
                    required={newBrand}
                  />
                </div>
                <div className="input-group">
                  <label>Pays d'origine</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Italie"
                    value={newBrandData.country}
                    onChange={(e) => setNewBrandData({...newBrandData, country: e.target.value})}
                    required={newBrand}
                  />
                </div>
                <div className="input-group full-width" style={{ gridColumn: 'span 2' }}>
                  <label>URL du Logo de la marque</label>
                  <input 
                    type="url" 
                    placeholder="https://.../logo.png"
                    value={newBrandData.logoUrl}
                    onChange={(e) => setNewBrandData({...newBrandData, logoUrl: e.target.value})}
                    required={newBrand}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="form-grid">

            <div className="input-group">
              <label htmlFor="model">Modèle</label>
              <input id="model" type="text" value={car.model} onChange={(e) => setCar({ ...car, model: e.target.value })} required />
            </div>


            <div className="input-group">
              <label htmlFor="category">Catégorie</label>
              <select id="category" value={car.category} onChange={(e) => setCar({ ...car, category: e.target.value })} required>
                <option value="">-- Choisir --</option>
                <option value="Berline">Berline</option>
                <option value="SUV">SUV</option>
                <option value="Sportive">Sportive</option>
                <option value="Coupé">Coupé</option>
              </select>
            </div>

            
            <div className="input-group">
              <label>Année</label>
              <input type="number" value={car.year} onChange={(e) => setCar({ ...car, year: e.target.value })} required />
            </div>
            <div className="input-group">
              <label>Prix (€)</label>
              <input type="number" value={car.price} onChange={(e) => setCar({ ...car, price: e.target.value })} required />
            </div>

            <div className="input-group full-width">
              <label>URL de l'image du véhicule</label>
              <input type="url" value={car.imageUrl} onChange={(e) => setCar({ ...car, imageUrl: e.target.value })} placeholder="https://..." />
            </div>
          </div>

         
          <div className="input-group full-width">
            <label>Tags</label>
            <div className="tags-display-area">
              {car.tags.map((tag, i) => (
                <span key={i} className="tag-badge">{tag}<button type="button" onClick={() => removeTag(i)}>x</button></span>
              ))}
            </div>
            <input list="suggested-tags" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if(e.key === "Enter"){ e.preventDefault(); handleTagSelection(tagInput.trim()); }}} placeholder="Ajouter un tag..." />
            <datalist id="suggested-tags">{SUGGESTED_TAGS.map((t, i) => <option key={i} value={t} />)}</datalist>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" checked={car.isAvailable} onChange={(e) => setCar({ ...car, isAvailable: e.target.checked })} />
              <span className="checkmark"></span>
              <span>Véhicule disponible immédiatement</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">Annuler</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Chargement..." : isEditMode ? "Sauvegarder" : "Créer le véhicule"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CarForm;