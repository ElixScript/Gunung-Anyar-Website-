import { PageHero } from "@/components/ui";
import BeritaClient from "@/components/berita/BeritaClient";
import { getBerita } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "Berita & Kegiatan",
  description: `Berita, kabar pembangunan, dan dokumentasi kegiatan ${site.namaDesa} serta program KKN.`,
  alternates: { canonical: "/berita" },
};

export default function BeritaPage() {
  const berita = getBerita();
  return (
    <>
      <PageHero
        eyebrow="Berita & Kegiatan"
        judul="Kabar dari Desa"
        deskripsi="Ikuti perkembangan pembangunan, kegiatan warga, dan program kerja Tim KKN di Desa Gunung Anyar."
      />
      <section className="container-desa py-12">
        <BeritaClient berita={berita} />
      </section>
    </>
  );
}
