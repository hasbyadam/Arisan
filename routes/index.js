const express = require("express");
const router = express.Router();
const signRoute = require("./signRoute");
const arisanRoute = require("./arisanRoute");

router.use("/sign", signRoute);
router.use("/arisan", arisanRoute);

module.exports = router;
