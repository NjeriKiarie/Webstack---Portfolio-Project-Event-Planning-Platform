import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEvent } from "../utils/eventService";
import EventForm from "../components/EventForm";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEventData(res.data);
      } catch (error) {
        console.error("Error fetching event:", error.response?.data?.message || error.message);
      }
    };
    fetchEvent();
  }, [id]);

  const handleUpdateEvent = async (updatedData) => {
    try {
      await updateEvent(id, updatedData);
      navigate("/events");
    } catch (error) {
      console.error("Error updating event:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      {eventData ? <EventForm onSubmit={handleUpdateEvent} initialData={eventData} /> : <p>Loading...</p>}
    </div>
  );
};

export default EditEvent;

