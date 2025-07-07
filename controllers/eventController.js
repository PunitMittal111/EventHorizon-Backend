
const Event = require('../models/Event');

// Get all events with optional filtering (status, type, search)
exports.getEvents = async (req, res) => {
  try {
    const { status, type, search } = req.query;

    let filter = {};
    if (status && status !== 'all') filter.status = status;
    if (type && type !== 'all') filter.eventType = type;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const events = await Event.find(filter).sort({ startDate: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get single event by id
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// Update an event by id
exports.updateEvent = async (req, res) => {
  try {
    const eventData = req.body;
    const event = await Event.findByIdAndUpdate(req.params.id, eventData, { new: true });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// Delete (or archive) an event by id
exports.deleteEvent = async (req, res) => {
  try {
    // Optionally you can implement soft delete (archive) instead of hard delete
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
