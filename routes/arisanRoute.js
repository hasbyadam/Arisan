const express = require("express");
const router = express.Router();
const {
  createArisan,
  getArisans,
  getArisan,
  updateArisan,
  deleteArisan,
  filterArisan,
  searchArisan,
} = require("../controllers/arisanController");
const { validate } = require("../middlewares/validator");
const {
  createArisanSchema,
  updateArisanSchema,
} = require("../helpers/joi-schema");
const { isLogin } = require("../middlewares/auth");

router.post("/", isLogin, validate(createArisanSchema), createArisan);
router.get("/search", searchArisan);
router.get("/filter", filterArisan);

router.get("/", getArisans);
router.get("/:arisanId", getArisan);
router.put("/:arisanId", validate(updateArisanSchema), updateArisan);
router.delete("/:arisanId", deleteArisan);


module.exports = router;
