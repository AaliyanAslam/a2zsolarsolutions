import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const expectedEmail = process.env.ADMIN_EMAIL || "a2zsolar@gmail.com";
    const expectedPassword = process.env.ADMIN_PASSWORD || "12345";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email and password are required." },
        { status: 400 }
      );
    }

    if (
      email.trim().toLowerCase() === expectedEmail.trim().toLowerCase() &&
      password === expectedPassword
    ) {
      return NextResponse.json({
        success: true,
        user: {
          email: expectedEmail,
          name: "A2Z Solar Solutions",
          role: "Admin",
          loginAt: new Date().toISOString(),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password." },
      { status: 401 }
    );
  } catch (error) {
    console.error("POST /api/admin/login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error." },
      { status: 500 }
    );
  }
}
