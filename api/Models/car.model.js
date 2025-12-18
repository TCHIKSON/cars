const mongoose = require("mongoose");
const Joi = require("joi"); 


const carMongooseSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    year: {
      type: Number,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    price: { type: Number, required: true },
    isAvailable: { type: Boolean, default: true },
    imageUrl: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Car = mongoose.model("Car", carMongooseSchema);


const carJoiSchema = Joi.object({
  brand: Joi.string().min(2).required(),
  model: Joi.string().required(),
  category: Joi.string().required(),
  year: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .required(),
  price: Joi.number().required(),
  isAvailable: Joi.boolean().optional(),
  imageUrl: Joi.string().allow("").optional(),
});


module.exports = {
  Car,
  carSchema: carJoiSchema, 
};
