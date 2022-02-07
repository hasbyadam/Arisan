const express = require("express")
const router = express.Router()
const signRoute = require("./signRoute");
const contactRoute = require("./contactRoute");

router.use("/sign", signRoute);
router.use("/contact", contactRoute);


module.exports = router