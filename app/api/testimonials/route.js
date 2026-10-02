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

// POST: Create a new testimonial with Cloudinary image upload and top-class error handling
export async function POST(req) {
  try {
    // 1. Verify Cloudinary Configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables in testimonials POST.");
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary image upload service is not configured on the server. Please check environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET).",
          code: "CONFIG_ERROR",
        },
        { status: 500 }
      );
    }

    // 2. Connect to MongoDB with dedicated error catch
    try {
      await connectDB();
    } catch (dbErr) {
      console.error("MongoDB connection failed in testimonials POST:", dbErr);
      return NextResponse.json(
        {
          success: false,
          error: `Database connection failed: ${dbErr.message || "Unable to reach database"}. Please check MongoDB Atlas connection or network access.`,
          code: "DB_CONNECTION_ERROR",
        },
        { status: 503 }
      );
    }

    // 3. Extract Form Data safely
    let formData;
    try {
      formData = await req.formData();
    } catch (formErr) {
      console.error("Failed to parse formData in testimonials POST:", formErr);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to parse upload request payload: ${formErr.message}`,
          code: "PAYLOAD_ERROR",
        },
        { status: 400 }
      );
    }

    const name = formData.get("name");
    const address = formData.get("address");
    const starQtyRaw = formData.get("starQty");
    const review = formData.get("review");
    const imageFile = formData.get("image");

    // 4. Strict Field Validations with Clear Specific Reasons
    const trimmedName = typeof name === "string" ? name.trim() : "";
    if (!trimmedName) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer Name is required. Please provide the customer's full name.",
          code: "VALIDATION_NAME_REQUIRED",
        },
        { status: 400 }
      );
    }
    if (trimmedName.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer Name is too short. It must be at least 2 characters long.",
          code: "VALIDATION_NAME_TOO_SHORT",
        },
        { status: 400 }
      );
    }
    if (trimmedName.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer Name is too long (maximum 100 characters allowed).",
          code: "VALIDATION_NAME_TOO_LONG",
        },
        { status: 400 }
      );
    }

    const trimmedAddress = typeof address === "string" ? address.trim() : "";
    if (!trimmedAddress) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer Address / Location is required (e.g. 'DHA Phase 6, Karachi' or 'Model Town, Lahore').",
          code: "VALIDATION_ADDRESS_REQUIRED",
        },
        { status: 400 }
      );
    }
    if (trimmedAddress.length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Address / Location must be at least 3 characters long.",
          code: "VALIDATION_ADDRESS_TOO_SHORT",
        },
        { status: 400 }
      );
    }
    if (trimmedAddress.length > 150) {
      return NextResponse.json(
        {
          success: false,
          error: "Address / Location is too long (maximum 150 characters allowed).",
          code: "VALIDATION_ADDRESS_TOO_LONG",
        },
        { status: 400 }
      );
    }

    const trimmedReview = typeof review === "string" ? review.trim() : "";
    if (!trimmedReview) {
      return NextResponse.json(
        {
          success: false,
          error: "Customer Review / Feedback text is required.",
          code: "VALIDATION_REVIEW_REQUIRED",
        },
        { status: 400 }
      );
    }
    if (trimmedReview.length < 10) {
      return NextResponse.json(
        {
          success: false,
          error: `Review text is too short (${trimmedReview.length} chars). Please enter at least 10 characters of meaningful customer feedback.`,
          code: "VALIDATION_REVIEW_TOO_SHORT",
        },
        { status: 400 }
      );
    }
    if (trimmedReview.length > 2500) {
      return NextResponse.json(
        {
          success: false,
          error: "Review text exceeds maximum allowed length of 2,500 characters.",
          code: "VALIDATION_REVIEW_TOO_LONG",
        },
        { status: 400 }
      );
    }

    const parsedStars = parseInt(starQtyRaw || "5", 10);
    const validStars = isNaN(parsedStars) ? 5 : Math.max(1, Math.min(5, parsedStars));

    // 5. Image File Validation
    if (!imageFile || typeof imageFile !== "object" || typeof imageFile.arrayBuffer !== "function") {
      return NextResponse.json(
        {
          success: false,
          error: "Customer photo or avatar is required. Please choose an image file from your device.",
          code: "VALIDATION_IMAGE_REQUIRED",
        },
        { status: 400 }
      );
    }

    if (imageFile.size === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "The selected image file is empty (0 bytes). Please choose a valid image file.",
          code: "VALIDATION_IMAGE_EMPTY",
        },
        { status: 400 }
      );
    }

    // Maximum 10MB limit
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
    if (imageFile.size > MAX_IMAGE_SIZE) {
      const fileSizeMB = (imageFile.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        {
          success: false,
          error: `Selected image file is too large (${fileSizeMB} MB). Maximum allowed image size is 10 MB.`,
          code: "VALIDATION_IMAGE_TOO_LARGE",
        },
        { status: 400 }
      );
    }

    // Allowed image MIME types
    const fileType = imageFile.type || "";
    const isImageMime = fileType.startsWith("image/");
    const fileName = imageFile.name || "";
    const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
    const hasImageExt = allowedExts.some((ext) => fileName.toLowerCase().endsWith(ext));

    if (!isImageMime && !hasImageExt) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file format "${fileType || fileName}". Only image files (JPG, PNG, WEBP, AVIF, GIF) are accepted.`,
          code: "VALIDATION_IMAGE_INVALID_TYPE",
        },
        { status: 400 }
      );
    }

    // 6. Upload Image to Cloudinary with 30s Timeout
    let imageUrl = "";
    try {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
          reject(new Error("Cloudinary image upload request timed out after 30 seconds. Please check your internet connection and try again."));
        }, 30000);

        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "a2z_solar/testimonials",
            resource_type: "image",
            transformation: [{ quality: "auto:good", fetch_format: "auto" }],
          },
          (error, result) => {
            clearTimeout(timer);
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      if (!uploadResult?.secure_url) {
        throw new Error("Cloudinary upload completed but did not return a valid secure image URL.");
      }

      imageUrl = uploadResult.secure_url;
    } catch (uploadErr) {
      console.error("Cloudinary upload failed in testimonials POST:", uploadErr);
      return NextResponse.json(
        {
          success: false,
          error: `Image upload failed: ${uploadErr.message || "Cloudinary image service error"}. Please ensure the image is not corrupted and try again.`,
          code: "IMAGE_UPLOAD_ERROR",
          details: uploadErr.message,
        },
        { status: 502 }
      );
    }

    // 7. Save Testimonial in Database
    try {
      const newTestimonial = await Testimonial.create({
        name: trimmedName,
        address: trimmedAddress,
        starQty: validStars,
        review: trimmedReview,
        image: imageUrl,
      });

      return NextResponse.json(
        {
          success: true,
          testimonial: newTestimonial,
          message: "Testimonial uploaded successfully!",
        },
        { status: 201 }
      );
    } catch (dbSaveErr) {
      console.error("Testimonial.create error:", dbSaveErr);
      if (dbSaveErr.name === "ValidationError") {
        const validationDetails = Object.values(dbSaveErr.errors || {})
          .map((e) => e.message)
          .join(", ");
        return NextResponse.json(
          {
            success: false,
            error: `Database validation rejected the input: ${validationDetails}`,
            code: "SCHEMA_VALIDATION_ERROR",
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: `Database failed to save testimonial: ${dbSaveErr.message || "Unknown database error"}`,
          code: "DB_SAVE_ERROR",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error in POST /api/testimonials:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Unexpected server error: ${error.message || "An unknown error occurred while saving the testimonial."}`,
        code: "UNHANDLED_SERVER_ERROR",
      },
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
