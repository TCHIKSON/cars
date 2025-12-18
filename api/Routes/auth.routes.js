const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controllers");
const { validateWithJoi } = require("../Middleware/validation.middleware");
const { signUpSchema, signInSchema } = require("../Models/user.model");

router.post("/sign-up", validateWithJoi(signUpSchema), authController.SignUp);
router.post("/sign-in", validateWithJoi(signInSchema), authController.SignIn);

module.exports = router;
