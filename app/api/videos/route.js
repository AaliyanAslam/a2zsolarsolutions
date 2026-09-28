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

// POST upload new video (with Cloudinary thumbnail upload)
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const youtubeUrl = formData.get("youtubeUrl");
    const thumbnailFile = formData.get("thumbnail");
    let thumbnailUrl = formData.get("thumbnailUrl");

    if (!title || !youtubeUrl) {
      return NextResponse.json(
        { success: false, error: "Title and YouTube URL are required" },
        { status: 400 }
      );
    }

    // If an image file is uploaded from computer, upload it to Cloudinary
    if (thumbnailFile && typeof thumbnailFile === "object" && thumbnailFile.size > 0) {
      const bytes = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload buffer to Cloudinary
      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "a2z_solar/thumbnails",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });

      thumbnailUrl = uploadResult.secure_url;
    }

    if (!thumbnailUrl) {
      return NextResponse.json(
        { success: false, error: "Thumbnail image file or URL is required" },
        { status: 400 }
      );
    }

    // Save to MongoDB
    const newVideo = await Video.create({
      title,
      thumbnailUrl,
      youtubeUrl,
    });

    return NextResponse.json({ success: true, video: newVideo }, { status: 201 });
  } catch (error) {
    console.error("Video creation error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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

