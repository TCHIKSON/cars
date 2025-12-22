const express = require("express");
const router = express.Router();
const ReservationController = require("../Controllers/reservation.controller.js");
const { reservationSchema } = require("../Models/reservation.model.js");
const { validateWithJoi } = require("../Middleware/validation.middleware.js");
const  authenticate  = require("../Middleware/auth.middleware.js");


router.get("/",authenticate, ReservationController.getAllReservations);
router.get("/:id", authenticate,ReservationController.getReservationById);
router.post(
  "/create",
  validateWithJoi(reservationSchema),authenticate,
  ReservationController.createReservation
);
router.put(
  "/update/:id",
  validateWithJoi(reservationSchema),authenticate,
  ReservationController.updateReservation
);
router.delete("/:id",authenticate, ReservationController.deleteReservation);

module.exports = router;
