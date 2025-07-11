const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const { protect } = require("../middleware/auth");

router.post("/", protect, ticketController.createTicket);
router.get("/", protect, ticketController.getAllTickets);

module.exports = router;
