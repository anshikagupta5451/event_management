const mongoose = require("mongoose");


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
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Event",
    required: true,
  },
});


const Attendee = mongoose.model("Attendee", attendeeSchema);

module.exports = Attendee;
