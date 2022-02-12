const express = require("express");
const router = express.Router();
const { create, edit, remove, filter, fetchAll } = require('../controllers/participantController')
const {isLogin} = require('../middlewares/auth')


router.post("/create/:arisanId", isLogin, create);
router.put("/edit/:participantId", isLogin, edit);
router.delete("/delete/:participantId", isLogin, remove);
router.get("/filter/", isLogin, filter);
router.get("/:arisanId", isLogin, filter, fetchAll);


module.exports = router