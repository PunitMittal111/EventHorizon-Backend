const Event = require("../models/Event");

exports.getEvents = async (req, res) => {
  try {
    const { status, type, search } = req.query;

    let filter = {};
    if (status && status !== "all") filter.status = status;
    if (type && type !== "all") filter.eventType = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const events = await Event.find(filter)
      .sort({ startDate: 1 })
      .populate("category", "name color");
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch Events", error: err.message });
  }
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "category",
      "name color"
    );
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event({
      ...eventData,
      orgName: req.user.orgName,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.log("Error response:", error.response?.data);
    res.status(400).json({ message: "Invalid data", error });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, eventData, {
      new: true,
    });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
