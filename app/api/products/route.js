import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import cloudinary from "@/lib/cloudinary";

// Helper: Upload a single image buffer to Cloudinary
async function uploadImageToCloudinary(buffer, folder = "a2z_solar/products") {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [
          { quality: "auto:good", fetch_format: "auto" },
        ],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// GET: Fetch products with optional category, search, featured filter
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");
    const limitParam = searchParams.get("limit");
    const skipParam = searchParams.get("skip");

    // Single product by slug
    if (slug) {
      const product = await Product.findOne({ slug }).lean();
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, product });
    }

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (featured === "true") {
      filter.isFeatured = true;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [
        { title: regex },
        { shortDescription: regex },
        { brand: regex },
        { model: regex },
        { category: regex },
      ];
    }

    const total = await Product.countDocuments(filter);

    const skip = skipParam ? parseInt(skipParam, 10) : 0;
    const limit = limitParam ? parseInt(limitParam, 10) : 0;

    let query = Product.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .select("-description -specifications -features");

    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);

    const products = await query.lean();

    return NextResponse.json({
      success: true,
      products,
      total,
    });
  } catch (error) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { success: false, products: [], total: 0, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Create a new product with multiple image uploads
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const category = formData.get("category");
    const shortDescription = formData.get("shortDescription") || "";
    const description = formData.get("description") || "";
    const price = parseFloat(formData.get("price") || "0");
    const discountPrice = parseFloat(formData.get("discountPrice") || "0");
    const brand = formData.get("brand") || "";
    const model = formData.get("model") || "";
    const warranty = formData.get("warranty") || "";
    const inStock = formData.get("inStock") !== "false";
    const isFeatured = formData.get("isFeatured") === "true";

    // Parse specifications JSON
    let specifications = [];
    const specsRaw = formData.get("specifications");
    if (specsRaw) {
      try {
        specifications = JSON.parse(specsRaw);
      } catch {
        specifications = [];
      }
    }

    // Parse features JSON
    let features = [];
    const featuresRaw = formData.get("features");
    if (featuresRaw) {
      try {
        features = JSON.parse(featuresRaw);
      } catch {
        features = [];
      }
    }

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Product title is required." },
        { status: 400 }
      );
    }

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Product category is required." },
        { status: 400 }
      );
    }

    // Handle multiple image uploads
    const images = [];
    const imageFiles = formData.getAll("images");

    for (const file of imageFiles) {
      if (file && typeof file === "object" && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadImageToCloudinary(buffer);
        images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    if (images.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please upload at least one product image." },
        { status: 400 }
      );
    }

    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 100);
    const slug = `${baseSlug}-${Date.now().toString(36).slice(-4)}`;

    const product = await Product.create({
      title: title.trim(),
      slug,
      category,
      shortDescription: shortDescription.trim(),
      description: description.trim(),
      price,
      discountPrice,
      brand: brand.trim(),
      model: model.trim(),
      warranty: warranty.trim(),
      inStock,
      isFeatured,
      specifications,
      features,
      images,
    });

    return NextResponse.json(
      { success: true, product, message: "Product created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing product
export async function PUT(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const id = formData.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required." },
        { status: 400 }
      );
    }

    const existing = await Product.findById(id);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Product not found." },
        { status: 404 }
      );
    }

    // Update fields
    const title = formData.get("title");
    if (title) existing.title = title.trim();

    const category = formData.get("category");
    if (category) existing.category = category;

    const shortDescription = formData.get("shortDescription");
    if (shortDescription !== null) existing.shortDescription = shortDescription.trim();

    const description = formData.get("description");
    if (description !== null) existing.description = description.trim();

    const price = formData.get("price");
    if (price !== null) existing.price = parseFloat(price) || 0;

    const discountPrice = formData.get("discountPrice");
    if (discountPrice !== null) existing.discountPrice = parseFloat(discountPrice) || 0;

    const brand = formData.get("brand");
    if (brand !== null) existing.brand = brand.trim();

    const modelField = formData.get("model");
    if (modelField !== null) existing.model = modelField.trim();

    const warranty = formData.get("warranty");
    if (warranty !== null) existing.warranty = warranty.trim();

    const inStock = formData.get("inStock");
    if (inStock !== null) existing.inStock = inStock !== "false";

    const isFeatured = formData.get("isFeatured");
    if (isFeatured !== null) existing.isFeatured = isFeatured === "true";

    // Parse specifications
    const specsRaw = formData.get("specifications");
    if (specsRaw) {
      try {
        existing.specifications = JSON.parse(specsRaw);
      } catch { /* keep existing */ }
    }

    // Parse features
    const featuresRaw = formData.get("features");
    if (featuresRaw) {
      try {
        existing.features = JSON.parse(featuresRaw);
      } catch { /* keep existing */ }
    }

    // Handle deleted images
    const deletedImagesRaw = formData.get("deletedImages");
    if (deletedImagesRaw) {
      try {
        const deletedIds = JSON.parse(deletedImagesRaw);
        for (const pubId of deletedIds) {
          try {
            await cloudinary.uploader.destroy(pubId, { resource_type: "image" });
          } catch (e) {
            console.warn("Failed to delete image from Cloudinary:", e.message);
          }
        }
        existing.images = existing.images.filter(
          (img) => !deletedIds.includes(img.publicId)
        );
      } catch { /* ignore parse errors */ }
    }

    // Handle new image uploads
    const newImageFiles = formData.getAll("images");
    for (const file of newImageFiles) {
      if (file && typeof file === "object" && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadImageToCloudinary(buffer);
        existing.images.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    await existing.save();

    return NextResponse.json({
      success: true,
      product: existing,
      message: "Product updated successfully!",
    });
  } catch (error) {
    console.error("PUT /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE: Delete a product and its Cloudinary images
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Delete all images from Cloudinary
    for (const img of product.images) {
      if (img.publicId) {
        try {
          await cloudinary.uploader.destroy(img.publicId, {
            resource_type: "image",
          });
        } catch (e) {
          console.warn("Failed to delete image from Cloudinary:", e.message);
        }
      }
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/products error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}
