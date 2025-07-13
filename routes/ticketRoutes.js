const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/ticketController");
const { protect } = require("../middleware/auth");

router.post("/", protect, ticketController.createTicket);
router.get("/", protect, ticketController.getAllTickets);
router.put("/:id", protect, ticketController.updateTicket);
router.delete("/:id", protect, ticketController.deleteTicket);

module.exports = router;
