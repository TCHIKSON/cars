import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 
import { api } from '../Services/api';
import CarSpec from '../Components/CarSpec';
import CarSales from '../Components/CarSale';
import './Style/CarDetails.css'; 

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const loadCar = async () => {
        try {
            const response = await api.car.getById(id);
            setCarData(response);
        } catch (error) {
            console.error("Erreur chargement:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
        loadCar();
    }, [id]);

    if (loading) return (
        <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Chargement en cours...</p>
        </div>
    );

    if (!carData) return (
        <div className="error-container">
            <h2>Véhicule introuvable</h2>
            <Link to="/CarsList" className="btn-back">Retour à la liste</Link>
        </div>
    );

    return (
        <div className="car-details-container">
            
            <div className="nav-header">
                <button onClick={() => navigate("/CarsList")} className="back-btn">
                    <span>←</span> Retour
                </button>
                <div className="breadcrumb">
                    <Link to="/CarsList">Véhicules</Link>
                    <span>/</span>
                    <span>{carData.brand?.name || "Marque inconnue"}</span>
                    <span>/</span>
                    <span>{carData.model}</span>
                </div>
            </div>

            
            <div className="hero-section">
                <div className="car-image-container">
                    <img 
                        src={carData.imageUrl || '/default-car.jpg'} 
                        alt={`${carData.brand?.name} ${carData.model}`}
                        className="hero-image"
                    />
                    <div className="image-overlay">
                        <div className="car-title">
                            <h1>{carData.brand?.name || "Marque inconnue"}</h1>
                            <h2>{carData.model}</h2>
                            <div className="car-year">{carData.year}</div>
                        </div>
                        <div className="price-badge">
                            {carData.price?.toLocaleString()} €
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="main-content">
                <div className="content-grid">
                    
                    <div className="specs-section">
                        <div className="section-header">
                            <h3>Spécifications </h3>
                            <p>Découvrez tous les détails de ce véhicule</p>
                        </div>
                        <CarSpec car={carData} />
                    </div>
                    
                    
                    <div className="sales-section">
                        <div className="section-header">
                            <h3>Informations commerciales</h3>
                            <p>Prix et disponibilité</p>
                        </div>
                        <CarSales car={carData} onActionSuccess={loadCar} />
                    </div>
                </div>

                
                <div className="action-section">
                    <div className="action-buttons">
                        {isAuthenticated && (
                            <Link to={`/edit/${id}`} className="btn btn-primary">
                                <span className="btn-icon"></span>
                                Modifier le véhicule
                            </Link>
                        )}
                        <button className="btn btn-secondary">
                            <span className="btn-icon">📞</span>
                            Nous contacter
                        </button>
                    </div>
                </div>
                {carData.tags && carData.tags.length > 0 && (
                    <div className="tags-section">
                        <h4>Caractéristiques</h4>
                        <div className="tags-container">
                            {carData.tags.map((tag, index) => (
                                <span key={index} className="tag">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CarDetails;