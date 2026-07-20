import siteConfig from "@/lib/site-config";

export default function sitemap() {
  const routes = [
    "",
    "/about",
    "/menu",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/terms-of-service",
    "/refund-policy",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
