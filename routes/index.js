const express = require("express");
const router = express.Router();
const signRoute = require("./signRoute");
<<<<<<< HEAD
const arisanRoute = require("./arisanRoute");

router.use("/sign", signRoute);
router.use("/arisan", arisanRoute);
=======
const contactRoute = require("./contactRoute");

router.use("/sign", signRoute);
router.use("/contact", contactRoute);
>>>>>>> f44b0e2a97c43679549f6d0c321ff759429dffd0

module.exports = router;
