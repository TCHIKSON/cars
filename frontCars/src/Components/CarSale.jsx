import { api } from '../Services/api';

const CarSales = ({ car, onActionSuccess }) => {
    
    const toggleAvailability = async () => {
        try {
            
            await api.car.update(car._id, { isAvailable: !car.isAvailable });
            
            if (onActionSuccess) onActionSuccess();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du statut:", error);
        }
    };

    return (
        <div style={{ backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
            <h3>Espace Vente</h3>
            <p><strong>Prix :</strong> {car.price ? `${car.price} €` : "Prix non défini"}</p>
            <p>
                <strong>Statut :</strong> 
                <span style={{ color: car.isAvailable ? 'green' : 'red' }}>
                    {car.isAvailable ? ' Disponible' : ' Vendu / Réservé'}
                </span>
            </p>
            
            <button onClick={toggleAvailability}>
                {car.isAvailable ? 'Marquer comme vendu' : 'Remettre en vente'}
            </button>
        </div>
    );
};

export default CarSales;