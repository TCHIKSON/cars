
const CarsService = require('./services/cars.service')

exports.getAllCars = async (req, res) => {
    try {
        const cars = await CarsService.getAll();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getCarById = async (req, res) => {
    try {
        const car = await CarsService.getById(req.params.id);
        if (!car) return res.status(404).json({ message: "Voiture non trouvée" });
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createCar = async (req, res) => {
    try {
        const newCar = await CarsService.create(req.body);
        res.status(201).json(newCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateCar = async (req, res) => {
    try {
        const updatedCar = await CarsService.update(req.params.id, req.body);
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteCar = async (req, res) => {
    try {
        await CarsService.delete(req.params.id);
        res.status(200).json({ message: "Suppression réussie" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};