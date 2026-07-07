import { IconUsers, IconHome2, IconRuler2, IconMapPins, IconInfoCircle } from "@tabler/icons-react";
import { PageHero, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { CountUp } from "@/components/motion";
import StatCharts from "@/components/statistik/StatCharts";
import InfografisGallery from "@/components/statistik/InfografisGallery";
import { getStatistik } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "Data & Statistik",
  description: `Dashboard data statistik ${site.namaDesa}: demografi, mata pencaharian, pendidikan, tren penduduk, dan Indeks Desa Membangun, lengkap dengan infografis.`,
  alternates: { canonical: "/statistik" },
};

// Daftar infografis statis (DATA CONTOH). Ganti file gambar di /public/images/infografis
// dengan hasil desain tim riset. Format JPG/PNG/SVG.
const infografis = [
  { src: "/images/infografis/demografi.jpg", judul: "Ringkasan Demografi Desa", kategori: "Demografi" },
  { src: "/images/infografis/ekonomi.jpg", judul: "Potret Ekonomi & UMKM", kategori: "Ekonomi" },
  { src: "/images/infografis/pendidikan.jpg", judul: "Profil Pendidikan Warga", kategori: "Pendidikan" },
  { src: "/images/infografis/kesehatan.jpg", judul: "Layanan Kesehatan & Posyandu", kategori: "Kesehatan" },
  { src: "/images/infografis/guna-lahan.jpg", judul: "Pemanfaatan Guna Lahan", kategori: "Geografi" },
  { src: "/images/infografis/kalender-tani.jpg", judul: "Kalender Musim Tani", kategori: "Pertanian" },
];

export default function StatistikPage() {
  const data = getStatistik();
  const r = data.ringkasan;

  // nilai berupa angka murni agar bisa dianimasikan CountUp saat terlihat
  const ringkasan = [
    { icon: IconUsers, nilai: r.jumlah_penduduk, suffix: "", label: "Jiwa Penduduk" },
    { icon: IconHome2, nilai: r.jumlah_kk, suffix: "", label: "Kepala Keluarga" },
    { icon: IconRuler2, nilai: r.luas_wilayah_ha, suffix: " ha", label: "Luas Wilayah" },
    { icon: IconMapPins, nilai: r.jumlah_dusun, suffix: "", label: "Dusun" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Data & Statistik"
        judul="Dashboard Data Desa"
        deskripsi={`Visualisasi kondisi ${site.namaDesa} berdasarkan data terbaru. Sorot atau arahkan kursor pada grafik untuk melihat angka detail.`}
      />

      <div className="container-desa py-12">
        {/* Ringkasan angka utama */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {ringkasan.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="h-full">
              <div className="group flex h-full items-center gap-4 rounded-card border border-krem-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-hutan-300/60 hover:shadow-float">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-hutan-100 to-hutan-300/40 text-hutan-700 transition-transform duration-300 ease-out group-hover:scale-110">
                  <s.icon size={24} stroke={1.75} />
                </span>
                <span>
                  <span className="block font-display text-3xl font-semibold text-hutan-900">
                    <CountUp nilai={s.nilai} suffix={s.suffix} />
                  </span>
                  <span className="text-sm text-tinta-600">{s.label}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Catatan sumber data */}
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-emas-300 bg-emas-100/50 px-5 py-4 text-sm text-tinta-600">
          <IconInfoCircle size={20} className="mt-0.5 shrink-0 text-emas-600" />
          <p>
            Data tahun <strong>{data.tahun_data}</strong>. Sumber: {data.sumber_data}.
            Angka pada halaman ini masih berupa <strong>data contoh</strong> dan perlu
            diganti dengan hasil survei/pendataan resmi sebelum dipublikasikan.
          </p>
        </div>

        {/* Dashboard grafik */}
        <div className="mt-10">
          <Reveal>
            <SectionHeading
              eyebrow="Visualisasi"
              judul="Grafik interaktif statistik desa"
              className="mb-8"
            />
          </Reveal>
          <StatCharts data={data} />
        </div>

        {/* Infografis */}
        <div className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Infografis"
              judul="Infografis desa"
              deskripsi="Ringkasan visual hasil olahan tim riset. Klik untuk memperbesar dan mengunduh."
              className="mb-8"
            />
          </Reveal>
          <InfografisGallery items={infografis} />
        </div>
      </div>
    </>
  );
}
