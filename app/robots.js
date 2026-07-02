import { site } from "@/lib/site";

// Wajib untuk mode `output: export` agar file dihasilkan sekali saat build.
export const dynamic = "force-static";

// Menghasilkan robots.txt otomatis saat build.
export default function robots() {
  const base = site.url.replace(/\/$/, "");
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${base}/sitemap.xml`,
  };
}
