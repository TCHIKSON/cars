import { useState, useEffect, useRef, useCallback } from "react";
import { api } from "../Services/api";
import "./Style/BrandCarousel.css";

const BrandCarousel = ({ onBrandSelect, selectedBrand }) => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const carouselRef = useRef(null);


  useEffect(() => {
   

    const loadBrands = async () => {
      try {
        setLoading(true)
        const result = await api.brand.getAll();

        const allBrands = [
          { _id: "all", name: "Toutes les marques", logoUrl: "", country: "" },
          ...(Array.isArray(result) ? result : result.data || []),
        ];
       
        setBrands(allBrands);
        setFilteredBrands(allBrands);
        

        console.log(` ${allBrands.length} marques chargées`);
      } catch (error) {
        console.error(" Erreur chargement marques:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBrands();
    window.addEventListener("brandUpdated", loadBrands);

  return () => {
    window.removeEventListener("brandUpdated", loadBrands);
  };
  }, []);

  useEffect(() => {
    if (brands.length === 0) return;

    if (!searchTerm.trim()) {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(
        (brand) =>
          brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (brand.country &&
            brand.country.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredBrands(filtered);
    }
  }, [searchTerm, brands.length]);

  const scrollLeft = useCallback(() => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  }, []);

  const scrollRight = useCallback(() => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  }, []);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm("");
  }, []);

  if (loading) {
    return (
      <div className="brand-carousel-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des marques...</p>
      </div>
    );
  }

  return (
    <div className="brand-carousel">
      <div className="carousel-header">
        <h3>Explorer par marque</h3>

        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon"></span>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Découvrez nos véhicules par constructeur..."
              className="search-input"
            />
            {searchTerm && (
              <button onClick={clearSearch} className="clear-search">
                ✕
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="search-results-info">
              {filteredBrands.length} marque(s) trouvée(s)
            </div>
          )}
        </div>
      </div>

      <div className="carousel-container">
        <button className="carousel-arrow left" onClick={scrollLeft}>
          ◀
        </button>

        <div className="carousel-track" ref={carouselRef}>
          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className={`brand-item ${
                selectedBrand === brand._id ? "active" : ""
              }`}
              onClick={() => onBrandSelect(brand._id)}
            >
              <div className="brand-logo">
                {brand._id === "all" ? (
                  <div className="all-brands-icon"></div>
                ) : (
                  <img
                    src={brand.logoUrl}
                    alt={brand.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                    loading="lazy"
                    style={{
                      width: "45px",
                      height: "45px",
                      objectFit: "contain",
                    }}
                  />
                )}
              </div>
              <div className="brand-info">
                <span className="brand-name">{brand.name}</span>
                {brand.country && (
                  <span className="brand-country">{brand.country}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-arrow right" onClick={scrollRight}>
          ▶
        </button>
      </div>

      {searchTerm && filteredBrands.length === 0 && (
        <div className="no-results">
          <p>Aucune marque trouvée pour "{searchTerm}"</p>
          <button onClick={clearSearch} className="reset-search">
            Voir toutes les marques
          </button>
        </div>
      )}
    </div>
  );
};

export default BrandCarousel;
