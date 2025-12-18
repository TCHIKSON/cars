const express = require('express');
const router = express.Router();
const CarsController = require('../Controllers/cars.controller.js');
const { carSchema } = require('../Models/car.model.js');
const { validateWithJoi } = require('../Middleware/cars.Middleware.js');

router.get('/', CarsController.getAllCars);
router.get('/:id', CarsController.getCarById);
router.post('/',validateWithJoi(carSchema), CarsController.createCar);
router.put('/:id',validateWithJoi(carSchema), CarsController.updateCar);
router.delete('/:id', CarsController.deleteCar);

module.exports = router;