import mongoose, { Schema, Document } from "mongoose";

export interface IInquirySubject extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySubjectSchema: Schema<IInquirySubject> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subject name is required"],
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const InquirySubjectModel =
  mongoose.models.InquirySubject ||
  mongoose.model<IInquirySubject>("InquirySubject", InquirySubjectSchema);

export default InquirySubjectModel;
