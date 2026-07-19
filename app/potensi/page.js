import { PageHero } from "@/components/ui";
import PotensiClient from "@/components/potensi/PotensiClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Potensi Desa",
  description: `Ragam potensi ${site.namaDesa}: UMKM, pendidikan, tempat ibadah, olahraga, serta layanan pemerintahan & kesehatan. Data terhubung dengan peta interaktif desa.`,
  alternates: { canonical: "/potensi" },
};

export default function PotensiPage() {
  return (
    <>
      <PageHero
        eyebrow="Peta & Potensi"
        judul="Potensi Desa"
        deskripsi="Ragam UMKM, sarana pendidikan, tempat ibadah, olahraga, dan layanan desa yang menjadi kebanggaan Desa Gunung Anyar. Saring berdasarkan kategori untuk menemukan yang Anda cari."
      />
      <section className="container-desa py-12">
        <PotensiClient />
      </section>
    </>
  );
}
