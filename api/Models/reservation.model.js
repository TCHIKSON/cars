const mongoose = require("mongoose");
const Joi = require("joi");

const reservationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    car: {
      type: String,
      required: true,
    },
    logoUrl: { type: String, default: "" },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

const reservationSchemaJoiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  car: Joi.string().min(2).required(),
  logoUrl: Joi.string().allow("").optional(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref("startDate")).required().messages({
    "date.greater": '"endDate" doit être postérieure à "startDate"',
  }),
});

reservationSchema.path("startDate").validate(function (value) {
  if (!this.endDate) return true;
  return value < this.endDate;
}, "startDate doit être antérieure à endDate");

reservationSchema.path("endDate").validate(function (value) {
  if (!this.startDate) return true;
  return this.startDate < value;
}, "endDate doit être postérieure à startDate");

module.exports = {
  Reservation,
  reservationSchema: reservationSchemaJoiSchema,
};
