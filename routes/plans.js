const express = require("express");
const router = express.Router();
const {
  getAllPlans,
  getPlanById,
  getPopularPlans,
} = require("../controllers/planController");

router.get("/", getAllPlans);
router.get("/popular", getPopularPlans);
router.get("/:id", getPlanById);

module.exports = router;
