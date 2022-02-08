const express = require("express");
const router = express.Router();
const signRoute = require("./signRoute");
const arisanRoute = require("./arisanRoute");
const contactRoute = require("./contactRoute");

router.use("/sign", signRoute);
router.use("/arisan", arisanRoute);
router.use("/contact", contactRoute);

module.exports = router;
