import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  title: string;
  type: string; // event type (festival, celebration, etc.)
  images: string[]; // Array of image URLs from Cloudinary
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema: Schema<IEvent> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
  },
  type: {
    type: String,
    required: [true, "Event type is required"],
  },
  images: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true,
});

const EventModel = mongoose.models.Event || mongoose.model<IEvent>('Event', EventSchema);

export default EventModel;
