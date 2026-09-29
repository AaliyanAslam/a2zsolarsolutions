import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    address: {
      type: String,
      required: [true, "Address / Location is required"],
      trim: true,
    },
    starQty: {
      type: Number,
      required: [true, "Star rating is required"],
      min: 1,
      max: 5,
      default: 5,
    },
    review: {
      type: String,
      required: [true, "Customer review / feedback is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Customer image is required"],
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

export default mongoose.models.Testimonial ||
  mongoose.model("Testimonial", TestimonialSchema);
