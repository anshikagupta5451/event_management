/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Container,
  Box,
} from "@mui/material";
import { Grid } from "@mui/material";
import RSVPForm from "./RSVPForm";

const RSVPModal = ({ open, handleClose, event }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      sx={{
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1.8rem",
          fontWeight: "bold",
          backgroundColor: "#6A1B9A",
          color: "#fff",
          padding: "16px 24px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {event.title}
      </DialogTitle>

      {/* Adjusted DialogContent */}
      <DialogContent
        sx={{
          marginTop: "20px",
          padding: "24px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={4} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A148C" }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(0, 0, 0, 0.7)", marginTop: "8px" }}
              >
                {event.description}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A148C" }}
              >
                Date
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(0, 0, 0, 0.7)", marginTop: "8px" }}
              >
                {new Date(event.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Grid>

          {/* Event Location */}
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                padding: "16px",
                borderRadius: "8px",
                boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4A148C" }}
              >
                Location
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "rgba(0, 0, 0, 0.7)", marginTop: "8px" }}
              >
                {event.location}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* RSVP Form */}
        <Container>
          <Typography
            variant="h6"
            sx={{ marginBottom: "8px", fontWeight: "bold", color: "#4A148C" }}
          >
            Your RSVP
          </Typography>
          <RSVPForm eventId={event._id} /> 
        </Container>
      </DialogContent>

      <DialogActions
        sx={{
          padding: "16px 24px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.1)",
          borderBottomLeftRadius: "12px",
          borderBottomRightRadius: "12px",
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            fontWeight: "bold",
            backgroundColor: "#6A1B9A",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#4A148C",
            },
            padding: "10px 20px",
            borderRadius: "8px",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RSVPModal;
