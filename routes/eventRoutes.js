const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");
const { protect } = require("../middleware/auth");

router.get("/", protect, eventController.getEvents);
router.get("/:id", protect, eventController.getEventById);
router.post("/", protect, eventController.createEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);

module.exports = router;
