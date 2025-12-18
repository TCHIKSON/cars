import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; // Ajout de Link pour naviguer
import { carService } from '../Services/carService';
import CarSpec from '../Components/CarSpec';
import CarSales from '../Components/CarSale'; // Import du nouveau composant

const CarDetails = () => {
    const { id } = useParams();
    const [carData, setCarData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCar = async () => {
        try {
            const response = await carService.getById(id);
            setCarData(response.data);
        } catch (error) {
            console.error("Erreur chargement:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCar();
    }, [id]);

    if (loading) return <p>Chargement...</p>;
    if (!carData) return <p>Voiture introuvable.</p>;

    return (
        <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
            <Link to="/">← Retour à la liste</Link>
            <h2>Détails du véhicule : {carData.brand}</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                {/* Colonne de gauche : Caractéristiques */}
                <CarSpec car={carData} />
                
                {/* Colonne de droite : Vente */}
                <CarSales car={carData} onActionSuccess={loadCar} />
            </div>

            <hr />
            
            {/* Bouton pour aller à la page de modification complète */}
            <Link to={`/edit/${id}`}>
                <button style={{ backgroundColor: '#007bff', color: 'white' }}>
                    Modifier les informations techniques
                </button>
            </Link>
        </div>
    );
};

export default CarDetails;