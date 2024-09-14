/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

const EventDetailsModal = ({ open, handleClose, event }) => {
  const [rsvpStatus, setRsvpStatus] = useState(false);

  const handleRSVP = () => {
    // Handle RSVP logic, send to backend, etc.
    console.log("RSVP confirmed for event:", event.title);
    setRsvpStatus(true);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{event.title}</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{event.description}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Date</Typography>
          <Typography variant="body2">
            {new Date(event.date).toLocaleDateString()}
          </Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Location</Typography>
          <Typography variant="body2">{event.location}</Typography>
        </Box>
        <Box>
          {rsvpStatus ? (
            <Typography variant="body2" color="primary">
              You have RSVPd to this event.
            </Typography>
          ) : (
            <Button variant="contained" color="primary" onClick={handleRSVP}>
              RSVP
            </Button>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDetailsModal;
