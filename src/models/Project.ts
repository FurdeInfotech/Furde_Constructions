import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  name: string;
  address: string;
  types: string;
  startingPrice?: string;
  description: string;
  tagline: string;
  badge: string;
  coverImage: string;
  images: string[];
  status: "ongoing" | "completed" | "upcoming";
  googleMapLink?: string;
  brochures: string[]; // Array of PDF URLs from Cloudinary
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Project name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  types: {
    type: String,
    required: [true, "Property types are required"],
  },
  startingPrice: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  tagline: {
    type: String,
    required: [true, "Tagline is required"],
  },
  badge: {
    type: String,
    required: [true, "Badge is required"],
  },
  coverImage: {
    type: String,
    required: [true, "Cover image is required"],
  },
  images: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ["ongoing", "completed", "upcoming"],
    required: true,
  },
  googleMapLink: {
    type: String,
  },
  brochures: [{
    type: String, // Cloudinary URLs for PDF files
  }],
}, {
  timestamps: true,
});

const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default ProjectModel;
