import { useNavigate } from "react-router-dom";
import { createEvent } from "../utils/eventService";
import EventForm from "../components/EventForm";

const AddEvent = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (eventData) => {
    try {
      await createEvent(eventData);
      navigate("/events");
    } catch (error) {
      console.error("Error creating event:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <EventForm onSubmit={handleCreateEvent} />
    </div>
  );
};

export default AddEvent;

