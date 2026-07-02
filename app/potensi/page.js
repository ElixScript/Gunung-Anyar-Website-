import { PageHero } from "@/components/ui";
import PotensiClient from "@/components/potensi/PotensiClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Potensi Desa",
  description: `Ragam potensi ${site.namaDesa}: wisata alam, pertanian & perkebunan, UMKM, fasilitas umum, dan budaya. Data terhubung dengan peta interaktif desa.`,
  alternates: { canonical: "/potensi" },
};

export default function PotensiPage() {
  return (
    <>
      <PageHero
        eyebrow="Peta & Potensi"
        judul="Potensi Desa"
        deskripsi="Kekayaan alam, ekonomi, dan budaya yang menjadi kebanggaan Desa Gunung Anyar. Saring berdasarkan kategori untuk menemukan yang Anda cari."
      />
      <section className="container-desa py-12">
        <PotensiClient />
      </section>
    </>
  );
}
