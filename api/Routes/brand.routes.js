const express = require("express");
const router = express.Router();
const BrandsController = require("../Controllers/brands.controller.js");
const { brandSchema } = require("../Models/brand.model.js");
const { validateWithJoi } = require("../Middleware/validation.middleware.js");
const  authenticate  = require("../Middleware/auth.middleware.js");

router.get("/", BrandsController.getAllBrands);
router.get("/:id", BrandsController.getBrandById);
router.post(
  "/create",
  validateWithJoi(brandSchema),authenticate, BrandsController.createBrand
);
router.put(
  "/update/:id",
  validateWithJoi(brandSchema),authenticate,
  BrandsController.updateBrand
);
router.delete("/:id", BrandsController.deleteBrand);

module.exports = router;
