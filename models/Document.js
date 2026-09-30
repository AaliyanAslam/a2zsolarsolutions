import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Document title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "Brochure",
        "Datasheet",
        "Warranty",
        "Company Profile",
        "Guide",
        "Report",
        "Other",
      ],
      default: "Brochure",
    },
    pdfUrl: {
      type: String,
      required: [true, "PDF URL is required"],
      trim: true,
    },
    publicId: {
      type: String,
      required: [true, "Cloudinary public ID is required"],
      trim: true,
    },
    fileName: {
      type: String,
      trim: true,
      default: "document.pdf",
    },
    fileSize: {
      type: Number,
      default: 0,
    },
    fileSizeFormatted: {
      type: String,
      default: "0 KB",
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Document ||
  mongoose.model("Document", DocumentSchema);
