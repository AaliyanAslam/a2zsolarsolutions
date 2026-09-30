import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";
import cloudinary from "@/lib/cloudinary";

// Format bytes into human-readable size
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// GET: Fetch documents with optional category & search filter
export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filter.$or = [{ title: regex }, { description: regex }, { fileName: regex }];
    }

    const documents = await Document.find(filter).sort({ createdAt: -1 });
    const total = await Document.countDocuments();

    return NextResponse.json({
      success: true,
      documents,
      total,
    });
  } catch (error) {
    console.error("GET /api/documents error:", error);
    return NextResponse.json(
      {
        success: false,
        documents: [],
        total: 0,
        error: error.message || "Failed to fetch documents",
      },
      { status: 500 }
    );
  }
}

// POST: Upload PDF to Cloudinary and save document details to MongoDB
export async function POST(req) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description") || "";
    const category = formData.get("category") || "Brochure";
    const pdfFile = formData.get("pdf");

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Document title is required." },
        { status: 400 }
      );
    }

    if (!pdfFile || typeof pdfFile !== "object" || pdfFile.size === 0) {
      return NextResponse.json(
        { success: false, error: "Please select a valid PDF file to upload." },
        { status: 400 }
      );
    }

    // Verify it is a PDF
    const originalName = pdfFile.name || "document.pdf";
    const isPdf =
      originalName.toLowerCase().endsWith(".pdf") ||
      pdfFile.type === "application/pdf";

    if (!isPdf) {
      return NextResponse.json(
        { success: false, error: "Only PDF documents (.pdf) are permitted." },
        { status: 400 }
      );
    }

    // Convert file to buffer for Cloudinary upload stream
    const bytes = await pdfFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename for Cloudinary public_id
    const sanitizedBase = originalName
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 50);
    const publicId = `${Date.now()}_${sanitizedBase}.pdf`;

    // Upload to Cloudinary as raw PDF
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "a2z_solar/documents",
          resource_type: "raw",
          public_id: publicId,
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    if (!uploadResult?.secure_url) {
      throw new Error("Cloudinary upload failed: No secure URL returned.");
    }

    // Create MongoDB document entry
    const newDoc = await Document.create({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      pdfUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id || `a2z_solar/documents/${publicId}`,
      fileName: originalName,
      fileSize: pdfFile.size,
      fileSizeFormatted: formatBytes(pdfFile.size),
    });

    return NextResponse.json(
      {
        success: true,
        document: newDoc,
        message: "PDF uploaded successfully!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/documents error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to upload document",
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete document from MongoDB and Cloudinary
export async function DELETE(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Document ID is required" },
        { status: 400 }
      );
    }

    const doc = await Document.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Document not found" },
        { status: 404 }
      );
    }

    // Delete from Cloudinary if publicId exists
    if (doc.publicId) {
      try {
        await cloudinary.uploader.destroy(doc.publicId, {
          resource_type: "raw",
        });
      } catch (cloudErr) {
        console.warn("Failed to remove file from Cloudinary:", cloudErr.message);
      }
    }

    // Delete from MongoDB
    await Document.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/documents error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete document" },
      { status: 500 }
    );
  }
}
