const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller");  // ← SANS S
const validateWithJoi = require("../Middleware/validation.middleware");
const { signUpSchema, signInSchema } = require("../dtos/auth.dtos");

router.post('/sign-up', validateWithJoi(signUpSchema), authController.SignUp);
router.post('/sign-in', validateWithJoi(signInSchema), authController.SignIn);

module.exports = router;