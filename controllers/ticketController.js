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

exports.updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json(updatedTicket);
  } catch (error) {
    console.log("Error response:", error.response?.data || error.message);
    res.status(400).json({ message: "Failed to update ticket", error });
  }
};

exports.deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTicket = await Ticket.findByIdAndDelete(id);
    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.log("Error response:", error.response?.data || error.message);
    res.status(400).json({ message: "Failed to delete ticket", error });
  }
};
