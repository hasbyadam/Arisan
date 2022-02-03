const express = require("express")
const router = express.Router()
const signRoute = require("./signRoute");

router.use("/sign", signRoute);


module.exports = router