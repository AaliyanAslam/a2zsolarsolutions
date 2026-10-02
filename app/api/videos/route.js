import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Video from "@/models/Video";
import cloudinary from "@/lib/cloudinary";

// GET all videos
export async function GET() {
  try {
    await connectDB();
    const videos = await Video.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, videos });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST upload new video (with Cloudinary thumbnail upload & top-class error handling)
export async function POST(req) {
  try {
    // 1. Verify Cloudinary Configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Missing Cloudinary environment variables in videos POST.");
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
      console.error("MongoDB connection failed in videos POST:", dbErr);
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
      console.error("Failed to parse formData in videos POST:", formErr);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to parse upload request payload: ${formErr.message}`,
          code: "PAYLOAD_ERROR",
        },
        { status: 400 }
      );
    }

    const title = formData.get("title");
    const youtubeUrl = formData.get("youtubeUrl");
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = formData.get("thumbnailUrl");

    // 4. Validate Title
    const trimmedTitle = typeof title === "string" ? title.trim() : "";
    if (!trimmedTitle) {
      return NextResponse.json(
        {
          success: false,
          error: "Video Title is required. Please provide a descriptive title for the project showcase.",
          code: "VALIDATION_TITLE_REQUIRED",
        },
        { status: 400 }
      );
    }
    if (trimmedTitle.length < 3) {
      return NextResponse.json(
        {
          success: false,
          error: "Video Title is too short. It must be at least 3 characters long.",
          code: "VALIDATION_TITLE_TOO_SHORT",
        },
        { status: 400 }
      );
    }
    if (trimmedTitle.length > 200) {
      return NextResponse.json(
        {
          success: false,
          error: "Video Title is too long (maximum 200 characters allowed).",
          code: "VALIDATION_TITLE_TOO_LONG",
        },
        { status: 400 }
      );
    }

    // 5. Validate YouTube URL
    const trimmedUrl = typeof youtubeUrl === "string" ? youtubeUrl.trim() : "";
    if (!trimmedUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "YouTube Video URL is required. Please paste a valid YouTube video link.",
          code: "VALIDATION_URL_REQUIRED",
        },
        { status: 400 }
      );
    }

    // Regex check for standard youtube.com, youtu.be, shorts, embed links
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/|v\/|.+\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const isGenericYoutube =
      trimmedUrl.includes("youtube.com") || trimmedUrl.includes("youtu.be");

    if (!isGenericYoutube) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid video URL. The link must be a valid YouTube URL (e.g. https://www.youtube.com/watch?v=... or https://youtu.be/...).",
          code: "VALIDATION_INVALID_YOUTUBE_URL",
        },
        { status: 400 }
      );
    }

    // 6. Validate Thumbnail File
    const hasFile =
      thumbnailFile &&
      typeof thumbnailFile === "object" &&
      typeof thumbnailFile.arrayBuffer === "function";

    if (!hasFile && !thumbnailUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Thumbnail image is required. Please choose an image file from your device.",
          code: "VALIDATION_THUMBNAIL_REQUIRED",
        },
        { status: 400 }
      );
    }

    if (hasFile) {
      if (thumbnailFile.size === 0) {
        return NextResponse.json(
          {
            success: false,
            error: "The selected thumbnail file is empty (0 bytes). Please choose a valid image file.",
            code: "VALIDATION_THUMBNAIL_EMPTY",
          },
          { status: 400 }
        );
      }

      // Maximum 10MB limit
      const MAX_SIZE = 10 * 1024 * 1024;
      if (thumbnailFile.size > MAX_SIZE) {
        const sizeMB = (thumbnailFile.size / (1024 * 1024)).toFixed(1);
        return NextResponse.json(
          {
            success: false,
            error: `Selected thumbnail image is too large (${sizeMB} MB). Maximum allowed size is 10 MB.`,
            code: "VALIDATION_THUMBNAIL_TOO_LARGE",
          },
          { status: 400 }
        );
      }

      // Check allowed image MIME types
      const fileType = thumbnailFile.type || "";
      const isImageMime = fileType.startsWith("image/");
      const fileName = thumbnailFile.name || "";
      const allowedExts = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];
      const hasImageExt = allowedExts.some((ext) => fileName.toLowerCase().endsWith(ext));

      if (!isImageMime && !hasImageExt) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid file format "${fileType || fileName}". Only image files (PNG, JPG, WEBP, AVIF) are accepted as thumbnails.`,
            code: "VALIDATION_THUMBNAIL_INVALID_TYPE",
          },
          { status: 400 }
        );
      }

      // 7. Upload to Cloudinary with 30s Timeout
      try {
        const bytes = await thumbnailFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
          const timer = setTimeout(() => {
            reject(
              new Error(
                "Cloudinary upload timed out after 30 seconds. Please check your internet connection and try again."
              )
            );
          }, 30000);

          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "a2z_solar/thumbnails",
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

        thumbnailUrl = uploadResult.secure_url;
      } catch (uploadErr) {
        console.error("Cloudinary upload failed in videos POST:", uploadErr);
        return NextResponse.json(
          {
            success: false,
            error: `Thumbnail upload failed: ${uploadErr.message || "Cloudinary service error"}. Please ensure the image is not corrupted and try again.`,
            code: "IMAGE_UPLOAD_ERROR",
            details: uploadErr.message,
          },
          { status: 502 }
        );
      }
    }

    if (!thumbnailUrl) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to obtain thumbnail URL. Please select a thumbnail image to upload.",
          code: "THUMBNAIL_MISSING",
        },
        { status: 400 }
      );
    }

    // 8. Save Video to MongoDB
    try {
      const newVideo = await Video.create({
        title: trimmedTitle,
        thumbnailUrl,
        youtubeUrl: trimmedUrl,
      });

      return NextResponse.json(
        {
          success: true,
          video: newVideo,
          message: "YouTube video added successfully!",
        },
        { status: 201 }
      );
    } catch (dbSaveErr) {
      console.error("Video.create error in MongoDB:", dbSaveErr);
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
          error: `Database failed to save video: ${dbSaveErr.message || "Unknown database error"}`,
          code: "DB_SAVE_ERROR",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unhandled error in POST /api/videos:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Unexpected server error: ${error.message || "An unknown error occurred while saving the video."}`,
        code: "UNHANDLED_SERVER_ERROR",
      },
      { status: 500 }
    );
  }
}

// DELETE a video by ID
export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Video ID is required" }, { status: 400 });
    }

    await Video.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Video deleted successfully" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

