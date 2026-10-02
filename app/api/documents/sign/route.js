import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET(req) {
  try {
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary environment variables missing on server.",
        },
        { status: 500 }
      );
    }

    const timestamp = Math.round(Date.now() / 1000);
    const folder = "a2z_solar/documents";

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      apiSecret
    );

    return NextResponse.json({
      success: true,
      timestamp,
      signature,
      folder,
      apiKey,
      cloudName,
    });
  } catch (error) {
    console.error("GET /api/documents/sign error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to generate upload signature.",
      },
      { status: 500 }
    );
  }
}
