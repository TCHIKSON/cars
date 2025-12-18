const CarSpec = ({ car }) => {
    if (!car) return <p>Aucune donnée technique disponible.</p>;

    return (
        <div className="spec-card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h4>Spécifications Techniques</h4>
            <table style={{ width: '100%', textAlign: 'left' }}>
                <tbody>
                    <tr>
                        <td><strong>Marque :</strong></td>
                        <td>{car.brand}</td>
                    </tr>
                    <tr>
                        <td><strong>Modèle :</strong></td>
                        <td>{car.model}</td>
                    </tr>
                    <tr>
                        <td><strong>Année :</strong></td>
                        <td>{car.year}</td>
                    </tr>
                    <tr>
                        <td><strong>Prix :</strong></td>
                        <td><small>{car.price}</small></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default CarSpec;