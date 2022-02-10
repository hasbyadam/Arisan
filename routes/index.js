const express = require("express");
const router = express.Router();
const signRoute = require("./signRoute");
const arisanRoute = require("./arisanRoute");
const contactRoute = require("./contactRoute");
const profileRoute = require("./profileRoute");
const participantRoute = require("./participantRoute");

router.use("/arisan", arisanRoute);
router.use("/sign", signRoute);
router.use("/arisan", arisanRoute);
router.use("/contact", contactRoute);
router.use("/profile", profileRoute);
router.use("/participant", participantRoute);

module.exports = router;
