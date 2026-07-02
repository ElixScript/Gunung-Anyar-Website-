import { PageHero } from "@/components/ui";
import UmkmClient from "@/components/umkm/UmkmClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Ekonomi & UMKM",
  description: `Direktori UMKM dan produk unggulan ${site.namaDesa}. Hubungi pelaku usaha langsung via WhatsApp dan temukan lokasinya di peta desa.`,
  alternates: { canonical: "/umkm" },
};

export default function UmkmPage() {
  return (
    <>
      <PageHero
        eyebrow="Ekonomi & UMKM"
        judul="Direktori UMKM Desa"
        deskripsi="Dukung ekonomi desa dengan membeli produk unggulan langsung dari pelaku usaha lokal. Hubungi via WhatsApp atau kunjungi lokasinya."
      />
      <section className="container-desa py-12">
        <UmkmClient />
      </section>
    </>
  );
}
