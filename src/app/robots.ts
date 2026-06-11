import type { MetadataRoute } from "next";

/** Serves /robots.txt — allow everything, point crawlers at the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://nuroai.dev/sitemap.xml",
  };
}
