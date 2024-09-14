const express = require("express");
const router = express.Router();
const RSVP = require("../models/RSVP");

// RSVP for an Event
router.post("/:eventId", async (req, res) => {
    console.log('req', req.params,req.body);
  const { eventId } = req.params; // Extract eventId from the route parameters
  const { status } = req.body; // Extract status from the request body

  try {
    const rsvp = new RSVP({
      event: eventId,
      status,
    });

    const savedRSVP = await rsvp.save();
    res.json(savedRSVP); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:eventId", async (req, res) => {
  try {
    const rsvpList = await RSVP.find({ event: req.params.eventId }).populate(
      "user",
      "name"
    );
    res.json(rsvpList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
