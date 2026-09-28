import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      success: true,
      message: "MongoDB Atlas connected successfully!",
      database: "a2zsolarsolutions",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        tip: "Please make sure your <db_password> is replaced in .env.local and your IP address is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).",
      },
      { status: 500 }
    );
  }
}
