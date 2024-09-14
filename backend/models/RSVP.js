const mongoose = require("mongoose");

const rsvpSchema = new mongoose.Schema({
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  status: {
    type: String,
    enum: ["Going", "Not Going", "Maybe"],
    default: "Maybe",
  },
});

module.exports = mongoose.model("RSVP", rsvpSchema);
