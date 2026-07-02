import { PageHero, SectionHeading } from "@/components/ui";
import GaleriClient from "@/components/galeri/GaleriClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Galeri",
  description: `Galeri foto dan video ${site.namaDesa}: keindahan alam, kegiatan budaya, aktivitas masyarakat, dan dokumentasi program KKN.`,
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

// Video YouTube (opsional). Ganti VIDEO_ID dengan ID video asli, atau kosongkan array.
const video = [
  { id: "dQw4w9WgXcQ", judul: "Profil Desa Gunung Anyar (contoh)" },
];

export default function GaleriPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeri"
        judul="Galeri Desa"
        deskripsi="Kumpulan momen dan keindahan Desa Gunung Anyar melalui foto dan video."
      />

      <section className="container-desa py-12">
        <GaleriClient items={foto} kategoriList={kategoriGaleri} />
      </section>

      {/* Section video (opsional) */}
      {video.length > 0 && (
        <section className="container-desa pb-16">
          <SectionHeading eyebrow="Video" judul="Video desa" className="mb-8" />
          <div className="grid gap-6 md:grid-cols-2">
            {video.map((v) => (
              <div key={v.id}>
                {/* Wrapper aspect-ratio 16:9 agar embed responsif */}
                <div className="relative aspect-video overflow-hidden rounded-card border border-krem-200 shadow-sm">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.judul}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-tinta-600">{v.judul}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
