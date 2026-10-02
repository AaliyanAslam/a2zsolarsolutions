import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import Document from "@/models/Document";
import cloudinary from "@/lib/cloudinary";
import { PDFDocument } from "pdf-lib";

const VALID_CATEGORIES = [
  "Brochure",
  "Datasheet",
  "Warranty",
  "Company Profile",
  "Guide",
  "Report",
  "Other",
];

const MAX_PDF_BYTES = 35 * 1024 * 1024; // 35 MB

// Format bytes into human-readable size
function formatBytes(bytes) {
  if (!bytes || bytes <= 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

// Verify Cloudinary credentials
function verifyCloudinaryConfig() {
  const missing = [];
  if (!process.env.CLOUDINARY_CLOUD_NAME) missing.push("CLOUDINARY_CLOUD_NAME");
  if (!process.env.CLOUDINARY_API_KEY) missing.push("CLOUDINARY_API_KEY");
  if (!process.env.CLOUDINARY_API_SECRET) missing.push("CLOUDINARY_API_SECRET");
  if (missing.length > 0) {
    throw new Error(
      `Cloudinary configuration missing on server: ${missing.join(", ")}. Please configure environment variables.`
    );
  }
}

/**
 * Compress PDF buffer using pdf-lib object stream compression
 * and metadata optimization. Safe fallback to original buffer on any issue.
 */
async function compressPdfBuffer(buffer) {
  const originalSize = buffer.length;

  // Skip CPU-intensive JS parsing for files larger than 5MB to prevent Node event-loop blocking
  if (originalSize > 5 * 1024 * 1024) {
    return {
      buffer,
      wasCompressed: false,
      originalSize,
      finalSize: originalSize,
      savingsPercent: 0,
    };
  }

  try {
    const pdfDoc = await PDFDocument.load(buffer, {
      ignoreEncryption: true,
    });

    try {
      const currentTitle = pdfDoc.getTitle();
      if (!currentTitle) pdfDoc.setTitle("A2Z Solar Solutions Document");
      pdfDoc.setProducer("A2Z Solar Optimizer");
    } catch {
      // non-fatal metadata tweak
    }

    const compressedBytes = await pdfDoc.save({
      useObjectStreams: true,
      addDefaultPage: false,
    });

    const compressedBuffer = Buffer.from(compressedBytes);
    const compressedSize = compressedBuffer.length;

    if (compressedSize < originalSize) {
      const savingsPercent = Math.round(
        ((originalSize - compressedSize) / originalSize) * 100
      );
      return {
        buffer: compressedBuffer,
        wasCompressed: true,
        originalSize,
        finalSize: compressedSize,
        savingsPercent,
      };
    }

    return {
      buffer,
      wasCompressed: false,
      originalSize,
      finalSize: originalSize,
      savingsPercent: 0,
    };
  } catch (err) {
    console.warn("PDF compression skipped (safe fallback):", err.message);
    return {
      buffer,
      wasCompressed: false,
      originalSize,
      finalSize: originalSize,
      savingsPercent: 0,
    };
  }
}

// GET: Fetch documents with optional category & search filter
export async function GET(req) {
  try {
    try {
      await connectDB();
    } catch (dbErr) {
      return NextResponse.json(
        {
          success: false,
          documents: [],
          total: 0,
          error: "Database connection failed. Please ensure MongoDB is reachable.",
        },
        { status: 503 }
      );
    }

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
        error: error.message || "Failed to fetch documents. Please refresh the page.",
      },
      { status: 500 }
    );
  }
}

// POST: Direct JSON metadata save (from direct browser upload) OR fallback FormData upload
export async function POST(req) {
  try {
    // 1. Connect Database
    try {
      await connectDB();
    } catch (dbErr) {
      return NextResponse.json(
        {
          success: false,
          error: "Database connection failed. Please ensure MongoDB is connected.",
        },
        { status: 503 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    // CASE A: Direct JSON submission after direct Cloudinary upload (super fast, 50ms)
    if (contentType.includes("application/json")) {
      const body = await req.json();
      const {
        title,
        description = "",
        category = "Brochure",
        pdfUrl,
        publicId,
        fileName = "document.pdf",
        fileSize = 0,
      } = body;

      if (!title || typeof title !== "string" || !title.trim()) {
        return NextResponse.json(
          { success: false, error: "Document title is required." },
          { status: 400 }
        );
      }

      if (title.trim().length < 3) {
        return NextResponse.json(
          { success: false, error: "Document title must be at least 3 characters long." },
          { status: 400 }
        );
      }

      if (!VALID_CATEGORIES.includes(category)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid category "${category}". Allowed categories: ${VALID_CATEGORIES.join(", ")}.`,
          },
          { status: 400 }
        );
      }

      if (!pdfUrl || !pdfUrl.startsWith("http")) {
        return NextResponse.json(
          { success: false, error: "Valid Cloudinary PDF URL is required." },
          { status: 400 }
        );
      }

      if (!publicId) {
        return NextResponse.json(
          { success: false, error: "Cloudinary public ID is required." },
          { status: 400 }
        );
      }

      const numericSize = Number(fileSize) || 0;

      const newDoc = await Document.create({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        pdfUrl: pdfUrl.trim(),
        publicId: publicId.trim(),
        fileName: fileName.trim(),
        fileSize: numericSize,
        fileSizeFormatted: formatBytes(numericSize),
      });

      return NextResponse.json(
        {
          success: true,
          document: newDoc,
          message: `PDF "${newDoc.title}" uploaded and registered successfully! (${formatBytes(numericSize)})`,
        },
        { status: 201 }
      );
    }

    // CASE B: Multipart FormData fallback (server-mediated upload)
    try {
      verifyCloudinaryConfig();
    } catch (confErr) {
      return NextResponse.json(
        { success: false, error: confErr.message },
        { status: 500 }
      );
    }

    // 3. Extract FormData safely
    let formData;
    try {
      formData = await req.formData();
    } catch (formErr) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to parse upload form data. The request body might be malformed or too large.",
        },
        { status: 400 }
      );
    }

    const title = formData.get("title");
    const description = formData.get("description") || "";
    const category = formData.get("category") || "Brochure";
    const pdfFile = formData.get("pdf");

    // 4. Strict Field Validation
    if (!title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        { success: false, error: "Document title is required." },
        { status: 400 }
      );
    }

    if (title.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Document title must be at least 3 characters long." },
        { status: 400 }
      );
    }

    if (title.trim().length > 200) {
      return NextResponse.json(
        { success: false, error: "Document title cannot exceed 200 characters." },
        { status: 400 }
      );
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid category "${category}". Allowed categories: ${VALID_CATEGORIES.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    if (description && description.trim().length > 2500) {
      return NextResponse.json(
        { success: false, error: "Description exceeds the 2500 character limit." },
        { status: 400 }
      );
    }

    // 5. PDF File Validation
    if (!pdfFile || typeof pdfFile !== "object" || typeof pdfFile.arrayBuffer !== "function") {
      return NextResponse.json(
        { success: false, error: "Please select a valid PDF file to upload." },
        { status: 400 }
      );
    }

    if (pdfFile.size <= 0) {
      return NextResponse.json(
        { success: false, error: "The selected PDF file is empty (0 bytes)." },
        { status: 400 }
      );
    }

    if (pdfFile.size > MAX_PDF_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `Selected PDF file is too large (${formatBytes(
            pdfFile.size
          )}). The maximum allowed size is 35 MB.`,
        },
        { status: 400 }
      );
    }

    const originalName = pdfFile.name || "document.pdf";
    const isExtensionPdf = originalName.toLowerCase().endsWith(".pdf");
    const isMimePdf = pdfFile.type === "application/pdf" || pdfFile.type === "";

    if (!isExtensionPdf && !isMimePdf) {
      return NextResponse.json(
        { success: false, error: "Only official PDF files (.pdf) are allowed." },
        { status: 400 }
      );
    }

    // 6. Convert to Buffer & verify magic bytes (%PDF-)
    let rawBuffer;
    try {
      const arrayBuffer = await pdfFile.arrayBuffer();
      rawBuffer = Buffer.from(arrayBuffer);
    } catch (buffErr) {
      return NextResponse.json(
        { success: false, error: "Failed to read the uploaded PDF file content." },
        { status: 400 }
      );
    }

    // Check PDF magic header "%PDF-"
    const magicHeader = rawBuffer.subarray(0, 5).toString("ascii");
    if (!magicHeader.startsWith("%PDF-")) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid file format: The selected file does not contain a valid PDF structure (%PDF- header missing).",
        },
        { status: 400 }
      );
    }

    // 7. Compress PDF buffer
    const compressionResult = await compressPdfBuffer(rawBuffer);
    const uploadBuffer = compressionResult.buffer;
    const finalSize = compressionResult.finalSize;

    // 8. Sanitize filename for Cloudinary public_id
    const sanitizedBase = originalName
      .replace(/\.pdf$/i, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .slice(0, 45);
    const publicId = `${Date.now()}_${sanitizedBase}.pdf`;

    // 9. Upload to Cloudinary with 45-second timeout safeguard
    let uploadResult;
    try {
      const uploadPromise = new Promise((resolve, reject) => {
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
        uploadStream.end(uploadBuffer);
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(
          () =>
            reject(
              new Error(
                "Upload timed out after 45 seconds. The file may be too large or the network connection is slow."
              )
            ),
          45000
        )
      );

      uploadResult = await Promise.race([uploadPromise, timeoutPromise]);
    } catch (cloudErr) {
      console.error("Cloudinary document upload error:", cloudErr);
      const msg = cloudErr.message || "";
      if (msg.includes("timed out")) {
        return NextResponse.json({ success: false, error: msg }, { status: 504 });
      }
      if (msg.includes("Invalid credentials") || cloudErr.http_code === 401) {
        return NextResponse.json(
          {
            success: false,
            error: "Cloudinary authentication failed. Please verify API credentials in your environment configuration.",
          },
          { status: 500 }
        );
      }
      return NextResponse.json(
        {
          success: false,
          error: `Cloudinary upload failed: ${msg || "Unknown storage error."}`,
        },
        { status: 500 }
      );
    }

    if (!uploadResult?.secure_url) {
      return NextResponse.json(
        {
          success: false,
          error: "Upload failed: Cloudinary did not return a secure file URL.",
        },
        { status: 500 }
      );
    }

    // 10. Save document entry to MongoDB
    let newDoc;
    try {
      newDoc = await Document.create({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        pdfUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id || `a2z_solar/documents/${publicId}`,
        fileName: originalName,
        fileSize: finalSize,
        fileSizeFormatted: formatBytes(finalSize),
      });
    } catch (docSaveErr) {
      console.error("Document MongoDB save error:", docSaveErr);
      return NextResponse.json(
        {
          success: false,
          error: `Failed to save document record: ${docSaveErr.message}`,
        },
        { status: 500 }
      );
    }

    const responseMsg = compressionResult.wasCompressed
      ? `PDF compressed by ${compressionResult.savingsPercent}% (${formatBytes(
          compressionResult.originalSize
        )} ➔ ${formatBytes(finalSize)}) and uploaded successfully!`
      : `PDF uploaded successfully! (${formatBytes(finalSize)})`;

    return NextResponse.json(
      {
        success: true,
        document: newDoc,
        compression: {
          wasCompressed: compressionResult.wasCompressed,
          originalSize: compressionResult.originalSize,
          originalSizeFormatted: formatBytes(compressionResult.originalSize),
          compressedSize: finalSize,
          compressedSizeFormatted: formatBytes(finalSize),
          savingsPercent: compressionResult.savingsPercent,
        },
        message: responseMsg,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/documents unhandled error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "An unexpected server error occurred during document upload.",
      },
      { status: 500 }
    );
  }
}

// DELETE: Delete document from MongoDB and Cloudinary
export async function DELETE(req) {
  try {
    try {
      await connectDB();
    } catch (dbErr) {
      return NextResponse.json(
        { success: false, error: "Database connection failed. Please try again." },
        { status: 503 }
      );
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { success: false, error: "Document ID is required." },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, error: "Invalid document ID format provided." },
        { status: 400 }
      );
    }

    const doc = await Document.findById(id);
    if (!doc) {
      return NextResponse.json(
        { success: false, error: "Document not found in database or already deleted." },
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
        console.warn("Failed to delete file from Cloudinary:", cloudErr.message);
      }
    }

    // Delete from MongoDB
    await Document.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: `Document "${doc.title}" deleted successfully.`,
    });
  } catch (error) {
    console.error("DELETE /api/documents error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete document." },
      { status: 500 }
    );
  }
}
