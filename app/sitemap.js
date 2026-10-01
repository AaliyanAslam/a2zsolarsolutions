import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Document from "@/models/Document";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = "https://a2zsolarsolutions.com";
  const now = new Date();

  let latestProjectDate = now;
  let latestDocDate = now;

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
      const latestProject = await Project.findOne()
        .sort({ updatedAt: -1 })
        .select("updatedAt")
        .lean();
      if (latestProject?.updatedAt) {
        latestProjectDate = new Date(latestProject.updatedAt);
      }

      const latestDoc = await Document.findOne()
        .sort({ updatedAt: -1 })
        .select("updatedAt")
        .lean();
      if (latestDoc?.updatedAt) {
        latestDocDate = new Date(latestDoc.updatedAt);
      }
    }
  } catch (error) {
    console.warn("Sitemap: MongoDB query fallback to current timestamp:", error?.message);
  }

  // Core public routes with SEO priority and update frequencies
  return [
    {
      url: baseUrl,
      lastModified: latestProjectDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: latestDocDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-10-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date("2026-10-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
