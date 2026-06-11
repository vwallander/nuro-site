import type { MetadataRoute } from "next";

/** Serves /sitemap.xml — single-page marketing site, one entry. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://nuroai.dev/",
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
