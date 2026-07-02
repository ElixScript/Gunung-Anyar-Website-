import { site } from "@/lib/site";
import { getBerita } from "@/lib/data";

// Wajib untuk mode `output: export` agar sitemap dihasilkan sekali saat build.
export const dynamic = "force-static";

/*
  Menghasilkan sitemap.xml otomatis saat build (baik untuk SEO).
  Semua URL memakai domain dari `site.url` (lib/site.js) — pastikan sudah
  diganti dengan domain produksi.
*/
export default function sitemap() {
  const base = site.url.replace(/\/$/, "");

  const halaman = [
    "/",
    "/profil",
    "/peta",
    "/potensi",
    "/statistik",
    "/umkm",
    "/galeri",
    "/berita",
    "/tentang-kkn",
    "/kontak",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));

  const artikel = getBerita().map((b) => ({
    url: `${base}/berita/${b.slug}`,
    lastModified: new Date(b.tanggal),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...halaman, ...artikel];
}
