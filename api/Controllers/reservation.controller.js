const ReservationService = require("../Services/reservation.service.js");

exports.getAllReservations = async (req, res) => {
  try {
    res.set("Cache-Control", "public, max-age=3600");
    const reservations = await ReservationService.getAll();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const reservation = await ReservationService.getById(req.params.id);
    if (!reservation)
      return res.status(404).json({ message: "Réservation non trouvée" });
    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReservation = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const result = await ReservationService.insertMany(req.body);

      return res.status(201).json({
        success: true,
        message: `${result.length} réservations créées avec succès`,
        data: result,
      });
    } else {
      const result = await ReservationService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Réservation créée avec succès",
        data: result,
      });
    }
  } catch (error) {
    console.error(" Erreur création réservation(s):", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedReservation = await ReservationService.update(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    await ReservationService.delete(req.params.id);
    res.status(200).json({ message: "Suppression réussie" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
