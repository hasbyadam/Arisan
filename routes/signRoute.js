const express = require("express");
const router = express.Router();
const {
  register,
  login,
  googleCallback,
} = require("../controllers/signController");
const { validate } = require("../middlewares/validator");
const { registerSchema, loginSchema } = require("../helpers/joi-schema");
const passport = require("../config/passport");

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

module.exports = router;
