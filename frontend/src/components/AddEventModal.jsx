/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import { createEvent } from "../api/api"; // Import the createEvent API call

const AddEventModal = ({ open, handleClose, onEventAdded }) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    reminderTime: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the form and make an API call to create the event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createEvent(eventData); // Create the new event via API
      setEventData({
        // Reset form fields after successful creation
        title: "",
        description: "",
        date: "",
        location: "",
        reminderTime: "",
        email: "",
      });
      onEventAdded(); // Notify parent to re-fetch events
      handleClose(); // Close the modal
    } catch (err) {
      console.error(
        "Error creating event:",
        err.response ? err.response.data : err.message
      );
      setError("Error creating event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Event</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            fullWidth
            required
            value={eventData.title}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            required
            value={eventData.description}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Date"
            name="date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            required
            value={eventData.date}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Location"
            name="location"
            fullWidth
            required
            value={eventData.location}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Reminder Time"
            name="reminderTime"
            type="datetime-local"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={eventData.reminderTime}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            type="email"
            fullWidth
            required
            value={eventData.email}
            onChange={handleChange}
          />
        </Box>
        {error && (
          <Box mt={2} color="error.main">
            {error}
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Event"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
