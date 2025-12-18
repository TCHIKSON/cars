const express = require('express');
const router = express.Router();
const CarsController = require('./controllers/cars.controller');

// Routes pour les voitures
router.get('/', CarsController.getAllCars);
router.get('/:id', CarsController.getCarById);
router.post('/', CarsController.createCar);
router.put('/:id', CarsController.updateCar);
router.delete('/:id', CarsController.deleteCar);

module.exports = router;