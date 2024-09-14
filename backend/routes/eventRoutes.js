const express = require("express");
const Event = require("../models/Event");
const Attendee = require("../models/Attendee");
const { scheduleEventReminder } = require('../jobs/cronJobs');
const router = express.Router();

// Create Event
router.post("/create", async (req, res) => {
  const { title, description, date, location, reminderTime, email } = req.body;

  try {
    const eventDate = new Date(date);
    const reminder = reminderTime ? new Date(reminderTime) : null;

    if (isNaN(eventDate.getTime())) {
      return res.status(400).json({ error: "Invalid event date." });
    }

    const newEvent = new Event({
      title,
      description,
      date: eventDate,
      location,
      reminderTime: reminder,
      email,
    });

    const savedEvent = await newEvent.save();

    // Schedule the reminder email
    if (reminder) {
      scheduleEventReminder(savedEvent);
    }

    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("Error creating event:", err.message);
    res
      .status(500)
      .json({ error: "Server error. Could not create the event." });
  }
});

// List Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name")
      .populate("attendees", "name");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Get all attendees for an event
router.get('/:eventId/attendees', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const attendees = await Attendee.find({ eventId });  // Assuming Attendee is the model
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching attendees' });
  }
});

// Add an attendee
router.post('/:eventId/attendees', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const attendee = new Attendee({ ...req.body, eventId });
    await attendee.save();
    res.status(201).json(attendee);
  } catch (error) {
    res.status(500).json({ error: 'Error adding attendee' });
  }
});

// Remove an attendee
router.delete('/:eventId/attendees/:attendeeId', async (req, res) => {
  try {
    const attendeeId = req.params.attendeeId;
    await Attendee.findByIdAndDelete(attendeeId);
    res.status(200).json({ message: 'Attendee removed' });
  } catch (error) {
    res.status(500).json({ error: 'Error removing attendee' });
  }
});

router.delete('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    await Event.findByIdAndDelete(eventId);  // Delete the event from the database
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting event" });
  }
});
module.exports = router;
