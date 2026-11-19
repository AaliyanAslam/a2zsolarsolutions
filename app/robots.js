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
          "/products/*",
          "/projects/*",
          "/documents",
          "/privacy-policy",
          "/terms-and-conditions",
          "/images/",
          "/logo/",
          "/favicon.ico",
          "/manifest.webmanifest",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/admin/*",
          "/api/",
          "/api/*",
          "/private/",
          "/*.json$",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/about",
          "/contact",
          "/products",
          "/products/*",
          "/projects/*",
          "/documents",
          "/privacy-policy",
          "/terms-and-conditions",
        ],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/logo/"],
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/about",
          "/contact",
          "/products",
          "/products/*",
          "/projects/*",
          "/documents",
        ],
        disallow: ["/admin/", "/api/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
