import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://business-ai-bice.vercel.app",
      lastModified: new Date(),
    },
  ];
}