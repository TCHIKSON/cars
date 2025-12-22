const express = require("express");
const router = express.Router();
const CarsController = require("../Controllers/cars.controller.js");
const { carSchema } = require("../Models/car.model.js");
const { validateWithJoi } = require("../Middleware/validation.middleware.js");
const  authenticate  = require("../Middleware/auth.middleware.js");

router.get("/", CarsController.getAllCars);
router.get("/:id", CarsController.getCarById);
router.post("/create", validateWithJoi(carSchema),authenticate, CarsController.createCar);
router.put("/update/:id", validateWithJoi(carSchema),authenticate, CarsController.updateCar);
router.delete("/:id", authenticate,CarsController.deleteCar);

module.exports = router;
