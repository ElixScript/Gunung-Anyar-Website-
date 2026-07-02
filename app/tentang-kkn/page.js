import { IconCode, IconMapPin, IconChartPie, IconSchool } from "@tabler/icons-react";
import { PageHero, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/SmartImage";
import { site } from "@/lib/site";

export const metadata = {
  title: "Tentang Program KKN",
  description: `Profil tim, program kerja, dan dokumentasi program Kuliah Kerja Nyata (KKN) ${site.kampus} di ${site.namaDesa}.`,
  alternates: { canonical: "/tentang-kkn" },
};

/* ---------- DATA CONTOH tim KKN (ganti nama, NIM, prodi, foto) ---------- */
const tim = [
  {
    nama: "Bagus Cipta Pratama",
    nim: "NIM 00/000000/XX/00000",
    prodi: "Program Studi — Fakultas",
    peran: "Pengembang Website",
    icon: IconCode,
    foto: "/images/tim/anggota-1.jpg",
  },
  {
    nama: "[Nama Rekan 1]",
    nim: "NIM 00/000000/XX/00000",
    prodi: "Program Studi — Fakultas",
    peran: "Pemetaan Potensi & Lokasi",
    icon: IconMapPin,
    foto: "/images/tim/anggota-2.jpg",
  },
  {
    nama: "[Nama Rekan 2]",
    nim: "NIM 00/000000/XX/00000",
    prodi: "Program Studi — Fakultas",
    peran: "Riset Data & Infografis",
    icon: IconChartPie,
    foto: "/images/tim/anggota-3.jpg",
  },
];

const timeline = [
  { tanggal: "Minggu 1", isi: "Observasi lapangan, perkenalan dengan perangkat desa & warga." },
  { tanggal: "Minggu 2", isi: "Pengumpulan data potensi, pemetaan koordinat, dan survei statistik." },
  { tanggal: "Minggu 3", isi: "Pengolahan data, desain infografis, dan pengembangan website." },
  { tanggal: "Minggu 4", isi: "Uji coba, pelatihan pengelolaan, dan penyerahan website ke desa." },
];

const terimaKasih = [
  "Kepala Desa Gunung Anyar beserta seluruh perangkat desa",
  "Dosen Pembimbing Lapangan (DPL)",
  `${site.kampus}`,
  "Seluruh warga Desa Gunung Anyar yang telah menyambut hangat",
];

export default function TentangKknPage() {
  return (
    <>
      <PageHero
        eyebrow="Tentang KKN"
        judul="Program Kuliah Kerja Nyata"
        deskripsi={`Website ini merupakan salah satu luaran program KKN ${site.kampus} tahun ${site.tahunKKN} di ${site.namaDesa}.`}
      />

      {/* Latar belakang */}
      <section className="container-desa py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Latar Belakang"
            judul="Membangun desa lewat teknologi informasi"
            deskripsi="Program kerja tim kami berfokus pada pembuatan website profil desa sebagai pusat informasi dan promosi potensi desa. Website ini mendokumentasikan profil, peta potensi, data statistik, serta direktori UMKM agar dapat dimanfaatkan warga dan perangkat desa dalam jangka panjang."
          />
        </Reveal>
      </section>

      {/* Tim */}
      <section className="bg-white py-16">
        <div className="container-desa">
          <Reveal>
            <SectionHeading eyebrow="Tim Kami" judul="Anggota tim KKN" className="mb-10" />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {tim.map((m, i) => (
              <Reveal key={m.peran} delay={i * 100} className="h-full">
                <div className="flex h-full flex-col items-center rounded-card border border-krem-200 bg-krem p-6 text-center shadow-sm">
                  <div className="h-28 w-28 overflow-hidden rounded-full ring-4 ring-hutan-100">
                    <SmartImage src={m.foto} alt={`Foto ${m.nama}`} ratio="1/1" label={m.nama} />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-hutan-900">{m.nama}</h3>
                  <p className="text-sm text-tinta-600">{m.nim}</p>
                  <p className="text-sm text-tinta-600">{m.prodi}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-hutan-700 px-3 py-1.5 text-xs font-semibold text-white">
                    <m.icon size={14} />
                    {m.peran}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline kegiatan */}
      <section className="container-desa py-16">
        <Reveal>
          <SectionHeading eyebrow="Perjalanan" judul="Timeline kegiatan KKN" className="mb-10" />
        </Reveal>
        <ol className="relative ml-3 border-l-2 border-hutan-100">
          {timeline.map((t, i) => (
            <Reveal as="li" key={t.tanggal} delay={i * 80} className="mb-8 ml-6 last:mb-0">
              <span className="absolute -left-[9px] grid h-4 w-4 place-items-center rounded-full bg-emas-500 ring-4 ring-krem" />
              <span className="font-display text-lg font-semibold text-hutan-800">{t.tanggal}</span>
              <p className="mt-1 text-tinta-600">{t.isi}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Ucapan terima kasih + logo */}
      <section className="bg-white py-16">
        <div className="container-desa grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Terima Kasih" judul="Ucapan terima kasih" />
            <ul className="mt-5 space-y-3">
              {terimaKasih.map((t) => (
                <li key={t} className="flex items-start gap-3 text-tinta-600">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emas-500" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col items-center justify-center gap-6 rounded-card bg-hutan-100/60 p-8 text-center">
              <IconSchool size={48} className="text-hutan-700" stroke={1.5} />
              <div>
                <p className="font-display text-xl font-semibold text-hutan-900">{site.kampus}</p>
                <p className="mt-1 text-sm text-tinta-600">
                  Program KKN Tahun {site.tahunKKN}
                </p>
                <p className="mt-4 text-xs text-tinta-600/70">
                  (Letakkan logo kampus & logo KKN di sini —
                  ganti bagian ini dengan gambar logo asli.)
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
