const mongoose = require("mongoose");

// Define the Attendee schema
const attendeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the event
    ref: "Event", // Reference the Event model
    required: true,
  },
});

// Create the Attendee model
const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
