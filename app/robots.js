export default function robots() {
  const baseUrl = "https://a2zsolarsolutions.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/about",
          "/contact",
          "/products",
          "/products/",
          "/documents",
          "/privacy-policy",
          "/terms-and-conditions",
          "/images/",
          "/logo/",
          "/favicon.ico",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/admin/*",
          "/api/",
          "/api/*",
          "/_next/",
          "/_next/*",
          "/private/",
          "/*.json$",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/logo/"],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
