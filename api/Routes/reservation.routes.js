const express = require("express");
const router = express.Router();
const ReservationController = require("../Controllers/reservation.controller.js");
const { reservationSchema } = require("../Models/reservation.model.js");
const { validateWithJoi } = require("../Middleware/validation.middleware.js");

router.get("/", ReservationController.getAllReservations);
router.get("/:id", ReservationController.getReservationById);
router.post(
  "/create",
  validateWithJoi(reservationSchema),
  ReservationController.createReservation
);
router.put(
  "/update/:id",
  validateWithJoi(reservationSchema),
  ReservationController.updateReservation
);
router.delete("/:id", ReservationController.deleteReservation);

module.exports = router;
