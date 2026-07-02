import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import PetaClient from "@/components/peta/PetaClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Peta Interaktif",
  description: `Peta interaktif potensi dan lokasi penting ${site.namaDesa}: wisata alam, pertanian, UMKM, fasilitas umum, dan situs budaya. Klik penanda untuk melihat detail.`,
  alternates: { canonical: "/peta" },
};

export default function PetaPage() {
  return (
    <>
      <PageHero
        eyebrow="Peta & Potensi"
        judul="Peta Interaktif Desa"
        deskripsi="Jelajahi sebaran potensi dan lokasi penting desa. Gunakan filter kategori dan pencarian, lalu klik penanda untuk melihat foto serta informasinya."
      />
      <section className="container-desa py-12">
        {/* Suspense diperlukan karena PetaClient membaca parameter URL (?loc=) */}
        <Suspense fallback={<div className="py-20 text-center text-tinta-600">Memuat peta…</div>}>
          <PetaClient center={site.koordinat} />
        </Suspense>
      </section>
    </>
  );
}
