const express = require("express");
const router = express.Router();
const { createArisan } = require("../controllers/arisanController");
const { validate } = require("../middlewares/validator");
const { createArisanSchema } = require("../helpers/joi-schema");

router.post("/", validate(createArisanSchema), createArisan);

module.exports = router;
