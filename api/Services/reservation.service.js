const { Reservation } = require("../Models/reservation.model.js");

class ReservationService {
  async getAll() {
    return await Reservation.find();
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
