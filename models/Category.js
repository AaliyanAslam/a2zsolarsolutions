import mongoose from "mongoose";

const DEFAULT_CATEGORIES = [
  "Inverters",
  "Tubular Batteries",
  "Lithium Batteries",
  "Energy Storage",
  "Solar Panels",
  "MPPT Charge Controllers",
  "EV Charging Solutions",
  "Electrical DB Accessories",
  "DB Accessories",
  "Tools",
];

function slugifyCategory(name) {
  const slug = String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  return slug || `cat-${Date.now().toString(36)}`;
}

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

CategorySchema.pre("validate", function () {
  if (this.name && (!this.slug || this.isModified("name"))) {
    this.slug = slugifyCategory(this.name);
  }
});

CategorySchema.index({ order: 1, name: 1 });

const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);

let seedInFlight = null;

/**
 * Seeds default solar categories (plus any distinct categories already saved on existing products)
 * the first time the categories collection is empty. Safe under concurrent requests.
 */
async function ensureCategoriesSeeded() {
  const existingCount = await Category.estimatedDocumentCount();
  if (existingCount > 0) return;

  if (!seedInFlight) {
    seedInFlight = (async () => {
      try {
        const againCount = await Category.estimatedDocumentCount();
        if (againCount > 0) return;

        let extraNames = [];
        try {
          const Product =
            mongoose.models.Product || (await import("./Product")).default;
          const distinctCats = await Product.distinct("category");
          extraNames = (distinctCats || []).filter(
            (c) =>
              typeof c === "string" &&
              c.trim() &&
              !DEFAULT_CATEGORIES.some(
                (d) => d.toLowerCase() === c.trim().toLowerCase()
              )
          );
        } catch {
          // Product model may not be needed if DB has no products yet
        }

        const allNames = [...DEFAULT_CATEGORIES, ...extraNames];
        const ops = allNames.map((name, idx) => {
          const trimmed = name.trim();
          const slug = slugifyCategory(trimmed);
          return {
            updateOne: {
              filter: { slug },
              update: {
                $setOnInsert: {
                  name: trimmed,
                  slug,
                  description: "",
                  order: idx,
                  isActive: true,
                },
              },
              upsert: true,
            },
          };
        });

        if (ops.length > 0) {
          await Category.bulkWrite(ops, { ordered: false });
        }
      } finally {
        seedInFlight = null;
      }
    })();
  }

  await seedInFlight;
}

export { DEFAULT_CATEGORIES, slugifyCategory, ensureCategoriesSeeded };
export default Category;
