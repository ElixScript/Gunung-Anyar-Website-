import { PageHero } from "@/components/ui";
import GaleriClient from "@/components/galeri/GaleriClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Galeri",
  description: `Galeri foto ${site.namaDesa}: keindahan alam, kegiatan budaya, aktivitas masyarakat, dan dokumentasi program KKN.`,
  alternates: { canonical: "/galeri" },
};

const kategoriGaleri = ["Alam", "Budaya", "Kegiatan Masyarakat", "Dokumentasi KKN"];

// DATA CONTOH — ganti file di /public/images/galeri dengan foto asli.
const foto = [
  { src: "/images/galeri/alam-1.jpg", caption: "Panorama sawah saat pagi", kategori: "Alam" },
  { src: "/images/galeri/alam-2.jpg", caption: "Air terjun Sumber Rejeng", kategori: "Alam" },
  { src: "/images/galeri/alam-3.jpg", caption: "Sunrise dari Bukit Pandang Anyar", kategori: "Alam" },
  { src: "/images/galeri/budaya-1.jpg", caption: "Latihan tari tradisional", kategori: "Budaya" },
  { src: "/images/galeri/budaya-2.jpg", caption: "Pentas seni HUT desa", kategori: "Budaya" },
  { src: "/images/galeri/masyarakat-1.jpg", caption: "Gotong royong warga", kategori: "Kegiatan Masyarakat" },
  { src: "/images/galeri/masyarakat-2.jpg", caption: "Kegiatan posyandu", kategori: "Kegiatan Masyarakat" },
  { src: "/images/galeri/masyarakat-3.jpg", caption: "Panen raya kopi", kategori: "Kegiatan Masyarakat" },
  { src: "/images/galeri/kkn-1.jpg", caption: "Pelatihan UMKM oleh Tim KKN", kategori: "Dokumentasi KKN" },
  { src: "/images/galeri/kkn-2.jpg", caption: "Pemetaan lapangan bersama warga", kategori: "Dokumentasi KKN" },
  { src: "/images/galeri/kkn-3.jpg", caption: "Sosialisasi program kerja", kategori: "Dokumentasi KKN" },
  { src: "/images/galeri/kkn-4.jpg", caption: "Penyerahan website ke perangkat desa", kategori: "Dokumentasi KKN" },
];

export default function GaleriPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeri"
        judul="Galeri Desa"
        deskripsi="Kumpulan momen dan keindahan Desa Gunung Anyar melalui foto."
      />

      <section className="container-desa py-12">
        <GaleriClient items={foto} kategoriList={kategoriGaleri} />
      </section>
    </>
  );
}
