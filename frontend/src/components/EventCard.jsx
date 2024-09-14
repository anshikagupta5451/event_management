/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import AttendeesModal from "./AttendeesModal";
import RSVPModal from "./RSVPModal";

const EventCard = ({ event }) => {
  const [openAttendeesModal, setOpenAttendeesModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenAttendees = () => {
    setOpenAttendeesModal(true);
  };

  const handleCloseAttendees = () => {
    setOpenAttendeesModal(false);
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#7B1FA2",
          color: "#ffffff",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          transition: "transform 0.2s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      >
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: "10px" }}>
            {event.description}
          </Typography>
          <Typography variant="body2">
            {new Date(event.date).toLocaleDateString()} - {event.location}
          </Typography>
        </CardContent>
        <CardActions>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Button
              size="small"
              sx={{ color: "#ffffff", fontWeight: "bold" }}
              onClick={handleOpenModal}
            >
              View Details
            </Button>
            <Button
              size="small"
              sx={{ color: "#ffffff", fontWeight: "bold" }}
              onClick={handleOpenAttendees}
            >
              View Attendees
            </Button>
          </Box>
        </CardActions>
      </Card>

      <AttendeesModal
        open={openAttendeesModal}
        handleClose={handleCloseAttendees}
        eventId={event._id}
      />

      <RSVPModal
        open={openModal}
        handleClose={handleCloseModal}
        event={event}
      />
    </>
  );
};

export default EventCard;
