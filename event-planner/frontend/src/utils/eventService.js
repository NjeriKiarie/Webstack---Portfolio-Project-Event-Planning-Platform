import axios from "axios";

const API_URL = "http://localhost:5000/api/events";

// Get Auth Token
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: token } };
};

// Create an event
export const createEvent = async (eventData) => {
  return await axios.post(API_URL, eventData, getAuthHeader());
};

// Get all events
export const getEvents = async () => {
  return await axios.get(API_URL);
};

// Get a single event by ID
export const getEventById = async (eventId) => {
  return await axios.get(`${API_URL}/${eventId}`);
};

// Update an event
export const updateEvent = async (eventId, updatedData) => {
  return await axios.put(`${API_URL}/${eventId}`, updatedData, getAuthHeader());
};

// Delete an event
export const deleteEvent = async (eventId) => {
  return await axios.delete(`${API_URL}/${eventId}`, getAuthHeader());
};

// RSVP to an event
export const rsvpEvent = async (eventId) => {
  return await axios.post(`${API_URL}/${eventId}/rsvp`, {}, getAuthHeader());
};
