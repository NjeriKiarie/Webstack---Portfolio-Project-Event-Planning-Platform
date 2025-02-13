import Event from "../models/Event.js";

// RSVP to an event
export const rsvpToEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user.id; // Get user ID from token

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: "Event not found" });

    // Check if user has already RSVPed
    if (event.rsvps.includes(userId)) {
      return res.status(400).json({ message: "You have already RSVPed to this event" });
    }

    event.rsvps.push(userId); // Add user to RSVP list
    await event.save();

    res.status(200).json({ message: "RSVP successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

