import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const fetchEvents = () => API.get("/events");
export const createEvent = (eventData) => API.post("/events/create", eventData);
export const getEventDetails = (id) => API.get(`/events/${id}`);
export const deleteEvent = (eventId) => API.delete(`/events/${eventId}`);
export const fetchAttendees = (eventId) =>
  API.get(`/events/${eventId}/attendees`);

// Add a new attendee to an event
export const addAttendee = (eventId, attendee) =>
  API.post(`/events/${eventId}/attendees`, attendee);

// Remove an attendee from an event
export const removeAttendee = (eventId, attendeeId) =>
  API.delete(`/events/${eventId}/attendees/${attendeeId}`);
export const rsvpToEvent = (eventId, status) => {
  console.log("RSVP to Event:", { eventId, status });

  // Proceed with the API call
  return API.post(`/rsvp/${eventId}`, { status });
};
