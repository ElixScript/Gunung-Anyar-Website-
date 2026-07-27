import { PageHero } from "@/components/ui";
import GaleriClient from "@/components/galeri/GaleriClient";
import { site } from "@/lib/site";

export const metadata = {
  title: "Galeri",
  description: `Galeri foto ${site.namaDesa}: aktivitas masyarakat, kegiatan sekolah, dan dokumentasi program KKN.`,
  alternates: { canonical: "/galeri" },
};

// Foto tampil tanpa caption. Teks `alt` hanya untuk pembaca layar & SEO,
// tidak pernah dirender di atas foto.
// Tiap foto punya versi kecil (-thumb, 800px) untuk grid dan versi penuh
// (1600px) untuk lightbox, supaya halaman tetap ringan dibuka.
const foto = [
  { src: "/images/galeri/galeri-01.jpg", thumb: "/images/galeri/galeri-01-thumb.jpg", alt: "Foto bersama tim KKN di halaman balai desa" },
  { src: "/images/galeri/galeri-02.jpg", thumb: "/images/galeri/galeri-02-thumb.jpg", alt: "Warga memadati lapangan desa saat acara pertandingan" },
  { src: "/images/galeri/galeri-03.jpg", thumb: "/images/galeri/galeri-03-thumb.jpg", alt: "Perajin mencetak tahu di industri rumahan desa" },
  { src: "/images/galeri/galeri-04.jpg", thumb: "/images/galeri/galeri-04-thumb.jpg", alt: "Siswa sekolah dasar mengikuti kegiatan di sekolah" },
  { src: "/images/galeri/galeri-05.jpg", thumb: "/images/galeri/galeri-05-thumb.jpg", alt: "Foto bersama seluruh siswa di halaman sekolah dasar" },
  { src: "/images/galeri/galeri-06.jpg", thumb: "/images/galeri/galeri-06-thumb.jpg", alt: "Tim KKN di depan gerbang SD Negeri Gunung Anyar" },
  { src: "/images/galeri/galeri-07.jpg", thumb: "/images/galeri/galeri-07-thumb.jpg", alt: "Kegiatan anak-anak bersama tim KKN pada malam hari" },
  { src: "/images/galeri/galeri-08.jpg", thumb: "/images/galeri/galeri-08-thumb.jpg", alt: "Foto bersama tim KKN dan aparat pemerintahan setempat" },
  { src: "/images/galeri/galeri-09.jpg", thumb: "/images/galeri/galeri-09-thumb.jpg", alt: "Tim KKN mendampingi pendataan di kantor desa" },
  { src: "/images/galeri/galeri-10.jpg", thumb: "/images/galeri/galeri-10-thumb.jpg", alt: "Tim KKN menghadiri Exponak Kontes Ternak Bondowoso" },
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
        {/* Tanpa kategoriList: seluruh foto berasal dari satu rangkaian
            dokumentasi, jadi tab filter tidak ditampilkan. */}
        <GaleriClient items={foto} />
      </section>
    </>
  );
}
