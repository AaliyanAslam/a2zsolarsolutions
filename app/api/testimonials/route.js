import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch testimonials (supports optional countOnly, skip & limit pagination)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const countOnly = searchParams.get("countOnly") === "true";

    const total = await Testimonial.countDocuments();

    if (countOnly) {
      return NextResponse.json({
        success: true,
        total,
        hasMore: total > 6,
      });
    }

    const skipParam = searchParams.get("skip");
    const limitParam = searchParams.get("limit");

    const skip = skipParam !== null ? parseInt(skipParam, 10) : 0;
    const limit = limitParam !== null ? parseInt(limitParam, 10) : 0;

    let query = Testimonial.find({}).sort({ createdAt: -1 });
    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);

    const testimonials = await query;
    const hasMore = limit > 0 ? skip + testimonials.length < total : false;

    return NextResponse.json({
      success: true,
      testimonials,
      total,
      hasMore,
    });
  } catch (error) {
    console.error("GET /api/testimonials error:", error);
    return NextResponse.json({
      success: true,
      testimonials: [],
      total: 0,
      hasMore: false,
      error: error.message,
    });
  }
}

// POST: Create a new testimonial with Cloudinary image upload
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const name = formData.get("name");
    const address = formData.get("address");
    const starQty = parseInt(formData.get("starQty") || "5", 10);
    const review = formData.get("review");
    const imageFile = formData.get("image");
    let imageUrl = formData.get("imageUrl");

    if (!name?.trim() || !address?.trim()) {
      return NextResponse.json(
        { success: false, error: "Both Name and Address are required." },
        { status: 400 }
      );
    }

    if (!review?.trim()) {
      return NextResponse.json(
        { success: false, error: "Review feedback message is required." },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary if a file was selected
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "a2z_solar/testimonials",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Please select a customer photo/avatar to upload." },
        { status: 400 }
      );
    }

    const newTestimonial = await Testimonial.create({
      name: name.trim(),
      address: address.trim(),
      starQty: isNaN(starQty) || starQty < 1 ? 5 : Math.min(starQty, 5),
      review: review.trim(),
      image: imageUrl,
    });

    return NextResponse.json({
      success: true,
      testimonial: newTestimonial,
      message: "Testimonial uploaded successfully!",
    });
  } catch (error) {
    console.error("POST /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create testimonial." },
      { status: 500 }
    );
  }
}

// DELETE: Remove testimonial by ID
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Testimonial ID is required for deletion." },
        { status: 400 }
      );
    }

    const deleted = await Testimonial.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Testimonial not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/testimonials error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}
