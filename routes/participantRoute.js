const express = require("express");
const router = express.Router();
const { create } = require('../controllers/participantController')
const {isLogin} = require('../middlewares/auth')


router.post("/create/:arisanId", isLogin, create);


module.exports = router