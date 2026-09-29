import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    capacity: {
      type: String,
      required: [true, "Capacity (e.g. 6KW, 10KW) is required"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "Location name is required"],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "Project image URL is required"],
      trim: true,
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

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
