const express = require("express");
const router = express.Router();
const signRoute = require("./signRoute");
const arisanRoute = require("./arisanRoute");
const contactRoute = require("./contactRoute");

router.use("/arisan", arisanRoute);
router.use("/sign", signRoute);
router.use("/contact", contactRoute);

module.exports = router;
