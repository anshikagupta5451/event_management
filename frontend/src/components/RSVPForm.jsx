/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { rsvpToEvent, getRSVPStatus } from "../api/api"; // Assuming you have an API method to get the RSVP status
import {
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  Typography,
  Box,
} from "@mui/material";

const RSVPForm = ({ eventId, userId }) => {
  const [status, setStatus] = useState("Maybe");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchRSVPStatus = async () => {
      try {
        const response = await getRSVPStatus(eventId, userId);
        if (response.data) {
          setStatus(response.data.status);
          setSubmitted(true); 
        }
      } catch (error) {
        console.error("Error fetching RSVP status:", error);
        setError("Failed to load RSVP status");
      }
    };

    if (eventId && userId) {
      fetchRSVPStatus();
    }
  }, [eventId, userId]);

  const handleRSVP = async () => {
    if (!eventId) {
      setError("Event ID is missing.");
      return;
    }

    try {
      const response = await rsvpToEvent(eventId, status);
      if (response.data) {
        setSubmitted(true);
      } else {
        setError("Invalid response from server");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setError(error.response?.data?.error || "Failed to submit RSVP");
    }
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      {!submitted ? (
        <Box
          sx={{
            backgroundColor: "#f9f9f9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: "10px" }}
            >
              {error}
            </Typography>
          )}
          <Typography
            variant="h6"
            sx={{ marginBottom: "10px", fontWeight: "bold", color: "#4A148C" }}
          >
            Select Your RSVP Status
          </Typography>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            sx={{ marginBottom: "20px" }}
          >
            <FormControlLabel
              value="Going"
              control={<Radio />}
              label="Going"
              sx={{ marginBottom: "10px" }}
            />
            <FormControlLabel
              value="Not Going"
              control={<Radio />}
              label="Not Going"
              sx={{ marginBottom: "10px" }}
            />
            <FormControlLabel
              value="Maybe"
              control={<Radio />}
              label="Maybe"
              sx={{ marginBottom: "10px" }}
            />
          </RadioGroup>

          <Button
            variant="contained"
            onClick={handleRSVP}
            sx={{
              backgroundColor: "#6A1B9A",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#4A148C",
              },
              padding: "10px 20px",
              borderRadius: "8px",
              fontWeight: "bold",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
          >
            Submit RSVP
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            backgroundColor: "#e8f5e9",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            transition: "opacity 0.3s ease",
            opacity: 1,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#2e7d32" }}
          >
            Thank you for submitting your RSVP!
          </Typography>
          <Typography
            variant="body2"
            sx={{ marginTop: "10px", color: "#388e3c" }}
          >
            Your response has been recorded.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default RSVPForm;
