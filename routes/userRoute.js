const express = require("express");
const { protect } = require("../middleware/auth");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.use(protect);

router.get("/", protect, getUsers);
router.get("/:id", protect, getUser);
router.post("/createuser", protect, createUser);
router.put("/me", protect, updateUser);
router.delete("/deleteuser", protect, deleteUser);

module.exports = router;
