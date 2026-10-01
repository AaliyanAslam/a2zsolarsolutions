import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Document from "@/models/Document";
import Video from "@/models/Video";
import Testimonial from "@/models/Testimonial";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectDB();

    // Fetch real live counts concurrently
    const [
      totalProjects,
      totalDocuments,
      totalVideos,
      totalTestimonials,
      recentProjects,
      recentDocuments,
      recentVideos,
      recentTestimonials,
    ] = await Promise.all([
      Project.countDocuments(),
      Document.countDocuments(),
      Video.countDocuments(),
      Testimonial.countDocuments(),
      Project.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Document.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Video.find({}).sort({ createdAt: -1 }).limit(6).lean(),
      Testimonial.find({}).sort({ createdAt: -1 }).limit(6).lean(),
    ]);

    // Categories breakdown for documents
    const docCategories = await Document.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]).catch(() => []);

    return NextResponse.json({
      success: true,
      stats: {
        projects: totalProjects,
        documents: totalDocuments,
        videos: totalVideos,
        testimonials: totalTestimonials,
      },
      categories: docCategories.map((c) => ({
        name: c._id || "Other",
        count: c.count,
      })),
      recent: {
        projects: recentProjects,
        documents: recentDocuments,
        videos: recentVideos,
        testimonials: recentTestimonials,
      },
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stats: {
          projects: 0,
          documents: 0,
          videos: 0,
          testimonials: 0,
        },
      },
      { status: 500 }
    );
  }
}
