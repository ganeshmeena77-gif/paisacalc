import type { MetadataRoute } from "next";
import { calculators, SITE_URL } from "@/lib/calculatorMeta";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["about", "contact", "privacy-policy", "disclaimer"].map((slug) => ({
      url: `${SITE_URL}/${slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];

  const calculatorRoutes: MetadataRoute.Sitemap = calculators.map((c) => ({
    url: `${SITE_URL}/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...calculatorRoutes];
}
