import mongoose from "mongoose";

const InquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide customer name"],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide customer phone number"],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      default: "Solar System Installation",
    },
    calculatedKw: {
      type: Number,
    },
    estimatedUnits: {
      type: Number,
    },
    message: {
      type: String,
    },
    status: {
      type: String,
      enum: ["New", "In Progress", "Replied", "Closed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Inquiry || mongoose.model("Inquiry", InquirySchema);
