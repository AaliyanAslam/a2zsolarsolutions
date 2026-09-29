import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import cloudinary from "@/lib/cloudinary";

// GET: Fetch projects (supports optional countOnly, skip & limit pagination)
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const countOnly = searchParams.get("countOnly") === "true";

    const total = await Project.countDocuments();

    // Fast check for frontend: returns count & whether total > 10
    if (countOnly) {
      return NextResponse.json({
        success: true,
        total,
        hasMore: total > 10,
      });
    }

    const skipParam = searchParams.get("skip");
    const limitParam = searchParams.get("limit");

    const skip = skipParam !== null ? parseInt(skipParam, 10) : 0;
    const limit = limitParam !== null ? parseInt(limitParam, 10) : 0;

    let query = Project.find({}).sort({ createdAt: -1 });
    if (skip > 0) query = query.skip(skip);
    if (limit > 0) query = query.limit(limit);

    const projects = await query;
    const hasMore = limit > 0 ? skip + projects.length < total : false;

    return NextResponse.json({
      success: true,
      projects,
      total,
      hasMore,
    });
  } catch (error) {
    console.error("GET /api/projects error:", error);
    return NextResponse.json({
      success: true,
      projects: [],
      total: 0,
      hasMore: false,
      error: error.message,
    });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const capacity = formData.get("capacity");
    const location = formData.get("location");
    const imageFile = formData.get("image");
    let imageUrl = formData.get("imageUrl");

    if (!capacity || !location) {
      return NextResponse.json(
        { success: false, error: "Both KW Capacity and Location Name are required." },
        { status: 400 }
      );
    }

    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "a2z_solar/projects",
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
        { success: false, error: "Please select an image to upload." },
        { status: 400 }
      );
    }

    const cleanNum = capacity.trim().replace(/\s*kw$/i, "").trim().toUpperCase();
    const formattedCapacity = cleanNum ? `${cleanNum}KW` : capacity.trim().toUpperCase();

    const newProject = await Project.create({
      capacity: formattedCapacity,
      location: location.trim(),
      imageUrl,
    });

    return NextResponse.json({ success: true, project: newProject }, { status: 201 });
  } catch (error) {
    console.error("POST /api/projects error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "Project ID is required" }, { status: 400 });
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/projects error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
