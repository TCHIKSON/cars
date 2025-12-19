const mongoose = require("mongoose");
const Joi = require("joi");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    country: {
      type: String,
      required: true,
    },
    logoUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Brand = mongoose.model("Brand", brandSchema);

const brandJoiSchema = Joi.object({
  name: Joi.string().min(2).required(),
  country: Joi.string().min(2).required(),
  logoUrl: Joi.string().allow("").optional(),
});

module.exports = {
  Brand,
  brandSchema: brandJoiSchema,
};
