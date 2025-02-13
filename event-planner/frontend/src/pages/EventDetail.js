import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../utils/eventService";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvpStatus, setRsvpStatus] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getEventById(id);
        setEvent(res.data);
      } catch (error) {
        console.error("Error fetching event:", error.response?.data?.message || error.message);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRSVP = async () => {
    try {
      await rsvpEvent(id);
      setRsvpStatus(true);
      alert("You have successfully RSVPed!");
    } catch (error) {
      console.error("Error RSVPing:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      {event ? (
        <>
          <h2>{event.title}</h2>
          <p>{event.description}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
	  <button onClick={handleRSVP} disabled={rsvpStatus}>
            {rsvpStatus ? "RSVP Confirmed" : "RSVP Now"}
          </button>
        </>
      ) : (
        <p>Loading event...</p>
      )}
    </div>
  );
};

export default EventDetail;

