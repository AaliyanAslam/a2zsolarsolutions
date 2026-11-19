import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Document from "@/models/Document";
import Product from "@/models/Product";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap() {
  const baseUrl = "https://a2zsolarsolutions.com";
  const now = new Date();

  let latestProjectDate = now;
  let latestDocDate = now;
  let productUrls = [];
  let projectUrls = [];

  try {
    if (process.env.MONGODB_URI) {
      await connectDB();

      // Fetch all projects for dynamic project portfolio URLs
      const projects = await Project.find({})
        .select("_id updatedAt createdAt")
        .sort({ updatedAt: -1 })
        .lean();

      if (projects.length > 0) {
        if (projects[0].updatedAt) latestProjectDate = new Date(projects[0].updatedAt);
        projectUrls = projects.map((p) => ({
          url: `${baseUrl}/projects/${p._id}`,
          lastModified: p.updatedAt ? new Date(p.updatedAt) : p.createdAt ? new Date(p.createdAt) : now,
          changeFrequency: "weekly",
          priority: 0.8,
        }));
      }

      const latestDoc = await Document.findOne()
        .sort({ updatedAt: -1 })
        .select("updatedAt")
        .lean();
      if (latestDoc?.updatedAt) {
        latestDocDate = new Date(latestDoc.updatedAt);
      }

      // Fetch all products for dynamic product URLs
      const products = await Product.find({})
        .select("slug updatedAt createdAt")
        .lean();

      productUrls = products.map((p) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: p.updatedAt ? new Date(p.updatedAt) : p.createdAt ? new Date(p.createdAt) : now,
        changeFrequency: "weekly",
        priority: 0.85,
      }));
    }
  } catch (error) {
    console.warn("Sitemap: MongoDB query fallback to current timestamp:", error?.message);
  }

  // Core public routes with SEO priority and update frequencies
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: latestProjectDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: productUrls.length > 0 ? productUrls[0].lastModified : now,
      changeFrequency: "daily",
      priority: 0.9,
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
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date("2026-11-01"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  return [...staticRoutes, ...productUrls, ...projectUrls];
}
