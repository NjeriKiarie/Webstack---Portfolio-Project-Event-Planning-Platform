// models/Event.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true }
  rsvps: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Store RSVP users
});

export default mongoose.model("Event", EventSchema);
