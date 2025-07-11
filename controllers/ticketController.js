const Ticket = require("../models/Ticket");

exports.createTicket = async (req, res) => {
  try {
    const ticketData = req.body;

    const ticket = new Ticket({
      ...ticketData,
    });

    await ticket.save();

    res.status(201).json(ticket);
  } catch (error) {
    console.log("Error response:", error.response?.data || error.message);
    res.status(400).json({ message: "Invalid data", error });
  }
};

exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("eventId", "title _id");

    res.status(200).json(tickets);
  } catch (error) {
    console.log("Error response:", error.response?.data || error.message);
    res.status(400).json({ message: "Failed to fetch tickets", error });
  }
};
