const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validateWithJoi = require("../middlewares/validation.middleware");
const { signUpSchema, signInSchema } = require("../dtos/auth.dtos");

router.post('/sign-up', validateWithJoi(signUpSchema), authController.SignUp);
router.post('/sign-in', validateWithJoi(signInSchema), authController.SignIn);

module.exports = router;