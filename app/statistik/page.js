import {
  IconUsers,
  IconGenderMale,
  IconGenderFemale,
  IconMap2,
  IconInfoCircle,
} from "@tabler/icons-react";
import { PageHero, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import { CountUp } from "@/components/motion";
import StatCharts from "@/components/statistik/StatCharts";
import TransparansiAnggaran from "@/components/statistik/TransparansiAnggaran";
import { getStatistik } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "Data & Statistik",
  description: `Dashboard data statistik ${site.namaDesa}: jumlah penduduk, komposisi jenis kelamin, sebaran usia, agama, wilayah administratif, sarana pendidikan, dan transparansi anggaran desa (APBDes).`,
  alternates: { canonical: "/statistik" },
};

// Dokumen transparansi anggaran desa (APBDes) — infografis & laporan realisasi.
// `thumb` dipakai untuk pratinjau kartu; `src` (dokumen penuh, bisa dibaca
// angkanya) baru dimuat saat dokumen diperbesar atau diunduh.
const dokumenAnggaran = [
  {
    src: "/images/infografis/apbdes-2026.jpg",
    thumb: "/images/infografis/apbdes-2026-thumb.jpg",
    judul: "Infografis APBDes 2026",
    tahun: "2026",
  },
  {
    src: "/images/infografis/realisasi-apbdes-2025.jpg",
    thumb: "/images/infografis/realisasi-apbdes-2025-thumb.jpg",
    judul: "Laporan Realisasi APBDes 2025",
    tahun: "2025",
  },
];

export default function StatistikPage() {
  const data = getStatistik();
  const r = data.ringkasan;

  // Angka ringkasan utama — dianimasikan CountUp saat terlihat
  const ringkasan = [
    { icon: IconUsers, nilai: r.jumlah_penduduk, suffix: "", label: "Total Penduduk" },
    { icon: IconGenderMale, nilai: r.laki_laki, suffix: "", label: "Laki-laki" },
    { icon: IconGenderFemale, nilai: r.perempuan, suffix: "", label: "Perempuan" },
    { icon: IconMap2, nilai: r.jumlah_rt, suffix: "", label: "Rukun Tetangga" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Data & Statistik"
        judul="Dashboard Data Desa"
        deskripsi={`Visualisasi kondisi ${site.namaDesa} berdasarkan data administrasi desa. Arahkan kursor pada grafik untuk melihat angka detail.`}
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
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-hutan-300/50 bg-hutan-100/50 px-5 py-4 text-sm text-tinta-600">
          <IconInfoCircle size={20} className="mt-0.5 shrink-0 text-hutan-700" />
          <p>
            Data tahun <strong>{data.tahun_data}</strong>. Sumber: {data.sumber_data}.
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

        {/* Transparansi Anggaran Desa (APBDes) */}
        <div className="mt-16">
          <Reveal>
            <SectionHeading
              eyebrow="Transparansi"
              judul="Transparansi Anggaran Desa (APBDes)"
              deskripsi="Ringkasan Anggaran Pendapatan dan Belanja Desa beserta laporan realisasinya, sebagai wujud keterbukaan pengelolaan keuangan Desa Gunung Anyar. Klik dokumen untuk memperbesar atau mengunduh."
              className="mb-8"
            />
          </Reveal>
          <TransparansiAnggaran dokumen={dokumenAnggaran} />
        </div>
      </div>
    </>
  );
}
