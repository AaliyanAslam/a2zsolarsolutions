import mongoose from "mongoose";

const PRODUCT_CATEGORIES = [
  "Inverters",
  "Tubular Batteries",
  "Lithium Batteries",
  "Energy Storage",
  "Solar Panels",
  "MPPT Charge Controllers",
  "EV Charging Solutions",
  "Electrical DB Accessories",
  "DB Accessories",
];

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      enum: PRODUCT_CATEGORIES,
    },
    shortDescription: {
      type: String,
      trim: true,
      default: "",
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    price: {
      type: Number,
      default: 0,
    },
    discountPrice: {
      type: Number,
      default: 0,
    },
    brand: {
      type: String,
      trim: true,
      default: "",
    },
    model: {
      type: String,
      trim: true,
      default: "",
    },
    specifications: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
    features: [{ type: String, trim: true }],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],
    inStock: {
      type: Boolean,
      default: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    warranty: {
      type: String,
      trim: true,
      default: "",
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

// Auto-generate slug from title before validation
ProductSchema.pre("validate", function () {
  if (this.title && (!this.slug || this.isModified("title"))) {
    const baseSlug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 100);
    this.slug = this.isNew
      ? `${baseSlug}-${Date.now().toString(36).slice(-4)}`
      : baseSlug;
  }
});

// Index for fast category and slug lookups
ProductSchema.index({ category: 1, createdAt: -1 });
ProductSchema.index({ slug: 1 }, { unique: true });
ProductSchema.index({ isFeatured: 1 });

export { PRODUCT_CATEGORIES };
export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
