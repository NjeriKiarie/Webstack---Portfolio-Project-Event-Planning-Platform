import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents, deleteEvent } from "../utils/eventService";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await getEvents();
        setEvents(res.data);
      } catch (error) {
        console.error("Error fetching events:", error.response?.data?.message || error.message);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setEvents(events.filter((event) => event._id !== id));
      } catch (error) {
        console.error("Error deleting event:", error.response?.data?.message || error.message);
      }
    }
  };
	

  const handleShare = (id) => {
    const eventLink = `${window.location.origin}/events/${id}`;
    navigator.clipboard.writeText(eventLink)
      .then(() => alert("Event link copied to clipboard!"))
      .catch((err) => console.error("Error copying link:", err));
  };

  return (
    <div>
      <h2>All Events</h2>
      <Link to="/events/new"><button>Create Event</button></Link>
      <ul>
        {events.map((event) => (
          <li key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
            <Link to={`/events/edit/${event._id}`}><button>Edit</button></Link>
            <button onClick={() => handleDelete(event._id)}>Delete</button>
	    <button onClick={() => handleShare(event._id)}>Share</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;

