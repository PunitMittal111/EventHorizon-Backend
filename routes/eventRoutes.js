const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events with optional filters
router.get('/', eventController.getEvents);

// Get single event by id
router.get('/:id', eventController.getEventById);

// Create new event
router.post('/', eventController.createEvent);

// Update event by id
router.put('/:id', eventController.updateEvent);

// Delete event by id
router.delete('/:id', eventController.deleteEvent);

module.exports = router;
