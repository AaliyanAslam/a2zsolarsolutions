export default function manifest() {
  return {
    name: "A2Z Solar Solutions",
    short_name: "A2Z Solar Solutions",
    description:
      "A2Z Solar Solutions — solar panels, hybrid inverters, lithium batteries and turnkey solar installations in Karachi and Lahore.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0fa353",
    lang: "en-PK",
    categories: ["business", "shopping", "utilities"],
    icons: [
      { src: "/logo/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/logo/icon-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/logo/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
