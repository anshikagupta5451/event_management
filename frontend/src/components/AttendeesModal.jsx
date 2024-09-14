/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  Typography,
  ListItemText,
  IconButton,
  TextField,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { fetchAttendees, addAttendee, removeAttendee } from "../api/api"; 
import DeleteIcon from "@mui/icons-material/Delete";

const AttendeesModal = ({ open, handleClose, eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendeeName, setNewAttendeeName] = useState("");

  useEffect(() => {
    if (open) {
      const getAttendees = async () => {
        try {
          const { data } = await fetchAttendees(eventId);
          setAttendees(data);
        } catch (error) {
          console.error("Error fetching attendees:", error);
        }
      };
      getAttendees();
    }
  }, [open, eventId]);


  const handleAddAttendee = async () => {
    if (!newAttendeeName.trim()) return; 
    try {
      const { data } = await addAttendee(eventId, { name: newAttendeeName });
      setAttendees((prevAttendees) => [...prevAttendees, data]);
      setNewAttendeeName("");
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  
  const handleRemoveAttendee = async (attendeeId) => {
    try {
      await removeAttendee(eventId, attendeeId);
      setAttendees((prevAttendees) =>
        prevAttendees.filter((attendee) => attendee._id !== attendeeId)
      );
    } catch (error) {
      console.error("Error removing attendee:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle sx={{ backgroundColor: "#6A1B9A", color: "#fff" }}>
        Event Attendees
      </DialogTitle>
      <DialogContent sx={{ padding: "20px" }}>

        <Box display="flex" mb={3} mt={3} sx={{ alignItems: "center" }}>
          <TextField
            label="Add New Attendee"
            value={newAttendeeName}
            onChange={(e) => setNewAttendeeName(e.target.value)}
            fullWidth
            sx={{
              backgroundColor: "#f5f5f5",
              borderRadius: "5px",
            }}
          />
          <Button
            onClick={handleAddAttendee}
            sx={{
              ml: 2,
              backgroundColor: "#6A1B9A",
              color: "#fff",
              "&:hover": { backgroundColor: "#4A148C" },
              padding: "10px 20px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Add
          </Button>
        </Box>


        <List sx={{ maxHeight: "300px", overflowY: "auto" }}>
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <ListItem
                key={attendee._id}
                sx={{
                  backgroundColor: "#e3f2fd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  marginBottom: "10px",
                  padding: "15px",
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleRemoveAttendee(attendee._id)}
                    sx={{ color: "#e57373" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={attendee.name}
                  primaryTypographyProps={{
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                />
              </ListItem>
            ))
          ) : (
            <Typography>No attendees available</Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color="primary"
          sx={{
            backgroundColor: "#6A1B9A",
            color: "#fff",
            "&:hover": { backgroundColor: "#4A148C" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttendeesModal;
