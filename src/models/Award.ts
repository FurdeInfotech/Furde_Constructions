import mongoose, { Schema, Document } from "mongoose";

export interface IAward extends Document {
  title: string;
  description?: string;
  images: string[]; // Array of image URLs from Cloudinary
  awardDate?: Date;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AwardSchema: Schema<IAward> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Award title is required"],
  },
  description: {
    type: String,
  },
  images: [{
    type: String,
    required: true,
  }],
  awardDate: {
    type: Date,
  },
  category: {
    type: String,
  },
}, {
  timestamps: true,
});

const AwardModel = mongoose.models.Award || mongoose.model<IAward>('Award', AwardSchema);

export default AwardModel;
