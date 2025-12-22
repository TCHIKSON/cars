const { Reservation } = require("../Models/reservation.model.js");

class ReservationService {
  async getAll(userId) {
    return await Reservation.find({ user: userId });
  }

  async getById(id) {
    return await Reservation.findById(id);
  }

  async insertMany(reservationsArray) {
    return await Reservation.insertMany(reservationsArray);
  }
  async create(reservationData) {
    const newReservation = new Reservation(reservationData);
    return await newReservation.save();
  }

  async update(id, reservationData) {
    return await Reservation.findByIdAndUpdate(id, reservationData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await Reservation.findByIdAndDelete(id);
  }
}

module.exports = new ReservationService();
