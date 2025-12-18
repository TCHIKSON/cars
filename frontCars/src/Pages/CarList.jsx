import { useEffect, useState } from 'react';
import { carService } from '../Services/carService';
import { Link } from 'react-router-dom';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
    carService.getAll()
        .then(res => {
            console.log("Données reçues :", res.data); 
            if (Array.isArray(res.data)) {
                setCars(res.data);
            } 
            
            else if (res.data && Array.isArray(res.data.cars)) {
                setCars(res.data.cars);
            }
        })
        .catch(err => console.error("Erreur API :", err));
}, []);

    const handleDelete = async (id) => {
        if(window.confirm("Supprimer ?")) {
            await carService.delete(id);
            setCars(cars.filter(c => c._id !== id));
        }
    };

    return (
        <div>
            <h2>Liste des voitures</h2>
            {cars.map(car => (
                <div key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h3>{car.brand} {car.model}</h3>
                    <Link to={`/edit/${car._id}`}>Modifier</Link>
                    <Link to={`/car/${car._id}`}>VOIRE</Link>

                    <button onClick={() => handleDelete(car._id)}>Supprimer</button>
                </div>
            ))}
        </div>
    );
};

export default CarList;