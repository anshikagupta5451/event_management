import { Grid } from "@mui/material";
import EventCard from "./EventCard"; // Each card represents an event
import { useState, useEffect } from "react";
import { fetchEvents } from "../api/api";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await fetchEvents();
      setEvents(data);
    };
    getEvents();
  }, []);

  // Function to handle event deletion
  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
  };

  return (
    <Grid container spacing={4}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={4} key={event._id}>
          <EventCard event={event} onDelete={handleDeleteEvent} /> 
        </Grid>
      ))}
    </Grid>
  );
};

export default EventList;
