import {
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconMountain,
  IconRuler2,
  IconMapPin,
  IconMapPins,
  IconSchool,
  IconStethoscope,
  IconBuildingMosque,
  IconDroplet,
  IconBolt,
  IconChartBar,
  IconTemperature,
  IconCloudRain,
  IconPlant2,
  IconUsers,
} from "@tabler/icons-react";
import { PageHero, SectionHeading, Tombol } from "@/components/ui";
import Reveal from "@/components/Reveal";
import MiniMap from "@/components/peta/MiniMap";
import { site } from "@/lib/site";
import { getStatistik, getLokasiById, formatAngka } from "@/lib/data";

export const metadata = {
  title: "Profil Desa",
  description: `Profil lengkap ${site.namaDesa}: gambaran umum, visi misi, letak geografis, struktur pemerintahan, pembagian wilayah, dan sarana prasarana.`,
  alternates: { canonical: "/profil" },
};

/* ---------- Profil ringkas Desa Gunung Anyar ---------- */
const profil = [
  "Gunung Anyar adalah desa di Kecamatan Tapen, Kabupaten Bondowoso, Jawa Timur. Terletak di dataran tinggi dengan ketinggian sekitar 158 mdpl, desa ini memiliki luas wilayah 655.803 Ha dengan suhu rata-rata harian sekitar 36°C.",
  "Wilayah desa mengalami dua musim — penghujan dan kemarau — dengan curah hujan rata-rata 39,00 mm. Beriklim tropis dan bertanah subur, sebagian besar warga menggantungkan mata pencaharian pada sektor pertanian.",
  "Desa Gunung Anyar terbagi menjadi 5 dusun, yaitu Dusun Krajan Baru, Krajan Lama, Kobunduh, Kogedhang, dan Kokebun. Berdasarkan Pendataan Keluarga tahun 2018, jumlah penduduk desa tercatat 4.120 jiwa dengan 1.597 kepala keluarga.",
];
// Fakta singkat — dirangkum dari profil desa (ditampilkan sebagai kartu)
const faktaSingkat = [
  { icon: IconMountain, label: "Topografi", nilai: "Dataran tinggi · 158 mdpl" },
  { icon: IconTemperature, label: "Suhu rata-rata", nilai: "± 36°C harian" },
  { icon: IconCloudRain, label: "Curah hujan", nilai: "39,00 mm (rata-rata)" },
  { icon: IconPlant2, label: "Iklim & tanah", nilai: "Tropis, tanah subur" },
  { icon: IconMapPins, label: "Wilayah", nilai: "5 dusun" },
  { icon: IconUsers, label: "Penduduk", nilai: "4.120 jiwa · 1.597 KK" },
];
// Visi & Misi resmi — RPJM Desa Gunung Anyar Periode 2022–2027 (BAB III)
const visi =
  "Terwujudnya Masyarakat Desa Gunung Anyar yang Berbudaya, Berdaya, dan Berkeadilan Secara Berkelanjutan.";
const misi = [
  "Mewujudkan Pembangunan Infrastruktur, Ekonomi, dan Lingkungan Hidup.",
  "Mewujudkan Kesejahteraan Sosial dan Kemasyarakatan.",
  "Meningkatkan Pemberdayaan Masyarakat Desa.",
  "Meningkatkan Akuntabilitas Penyelenggaraan Pemerintahan Desa.",
];
const geografis = {
  batas: {
    utara: "Desa Kalitapen",
    selatan: "Desa Wonokusumo",
    timur: "Desa Mangli Wetan",
    barat: "Desa Jurangsapi",
  },
  luas: "655.803 Ha",
  ketinggian: "158 mdpl",
};
const perangkat = {
  kepala: { nama: "Tarid Efendi", jabatan: "Kepala Desa" },
  bpd: { nama: "Badan Permusyawaratan Desa", jabatan: "BPD" },
  sekretaris: { nama: "Agas Dwi N.", jabatan: "Sekretaris Desa" },
  kaur: [
    { nama: "Ika Puspita", jabatan: "Kaur Tata Usaha & Umum" },
    { nama: "Aidatus Sholeha", jabatan: "Kaur Perencanaan" },
    { nama: "Misru", jabatan: "Kaur Keuangan" },
  ],
  kasi: [
    { nama: "Faishol Roziqin", jabatan: "Kasi Kesejahteraan" },
  ],
  dusun: [
    { nama: "Adi Bing Slamet", jabatan: "Kasun Krajan Baru" },
    { nama: "Fuad", jabatan: "Kasun Kokebun" },
    { nama: "Rudi S", jabatan: "Kasun Kobunduh" },
    { nama: "Samsuri", jabatan: "Kasun Krajan Lama" },
    { nama: "Haeri", jabatan: "Kasun Kogedang" },
  ],
};
// Jumlah RW/RT contoh per dusun
const wilayahExtra = {
  "Dusun Krajan": { rw: 2, rt: 6 },
  "Dusun Sumbersari": { rw: 2, rt: 5 },
  "Dusun Tegalsari": { rw: 1, rt: 4 },
  "Dusun Kalianyar": { rw: 1, rt: 3 },
};

export default function ProfilPage() {
  const stat = getStatistik();
  const sarana = stat.sarana_prasarana;
  const kantorDesa = getLokasiById("loc-007");

  const totalPendidikan = sarana.pendidikan.reduce((a, b) => a + b.jumlah, 0);
  const totalKesehatan = sarana.kesehatan.reduce((a, b) => a + b.jumlah, 0);
  const totalIbadah = sarana.ibadah.reduce((a, b) => a + b.jumlah, 0);

  const saranaGrid = [
    { icon: IconSchool, nilai: totalPendidikan, label: "Sarana Pendidikan", detail: sarana.pendidikan.map((p) => `${p.jumlah} ${p.jenis}`).join(" · ") },
    { icon: IconStethoscope, nilai: totalKesehatan, label: "Fasilitas Kesehatan", detail: sarana.kesehatan.map((p) => `${p.jumlah} ${p.jenis}`).join(" · ") },
    { icon: IconBuildingMosque, nilai: totalIbadah, label: "Tempat Ibadah", detail: sarana.ibadah.map((p) => `${p.jumlah} ${p.jenis}`).join(" · ") },
    { icon: IconDroplet, nilai: `${sarana.akses_air_bersih_persen}%`, label: "Akses Air Bersih", detail: "Rumah tangga terlayani" },
    { icon: IconBolt, nilai: `${sarana.akses_listrik_persen}%`, label: "Akses Listrik", detail: "Rumah tangga teraliri listrik" },
  ];

  const batasItems = [
    { icon: IconArrowUp, arah: "Utara", isi: geografis.batas.utara },
    { icon: IconArrowDown, arah: "Selatan", isi: geografis.batas.selatan },
    { icon: IconArrowRight, arah: "Timur", isi: geografis.batas.timur },
    { icon: IconArrowLeft, arah: "Barat", isi: geografis.batas.barat },
  ];

  return (
    <>
      <PageHero
        eyebrow="Profil Desa"
        judul={`Mengenal ${site.namaDesa}`}
        deskripsi="Gambaran umum, visi misi, kondisi geografis, pemerintahan, dan sarana prasarana desa dalam satu halaman."
      />

      {/* ---------- PROFIL RINGKAS + FAKTA SINGKAT ---------- */}
      <section className="container-desa py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal variant="left">
            <SectionHeading eyebrow="Gambaran Umum" judul={`Sekilas ${site.namaDesa}`} />
            <div className="mt-5 space-y-4 text-tinta-600 leading-relaxed">
              {profil.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Kartu fakta singkat desa */}
          <Reveal delay={120} variant="right">
            <div className="grid gap-3 sm:grid-cols-2">
              {faktaSingkat.map((f) => (
                <div
                  key={f.label}
                  className="group flex items-start gap-3 rounded-2xl border border-krem-200 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-hutan-300/60 hover:shadow-lift"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hutan-100 text-hutan-700 transition-transform duration-300 ease-out group-hover:scale-110">
                    <f.icon size={20} stroke={1.75} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-wide text-hutan-600">
                      {f.label}
                    </span>
                    <span className="mt-0.5 block text-sm font-medium text-hutan-900">
                      {f.nilai}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- VISI & MISI ---------- */}
      <section className="bg-white py-16">
        <div className="container-desa grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="h-full rounded-card bg-hutan-800 p-8 text-white">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emas-300">
                Visi
              </span>
              <blockquote className="mt-4 font-display text-2xl leading-snug">
                “{visi}”
              </blockquote>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-3">
            <SectionHeading eyebrow="Misi" judul="Langkah mewujudkan visi" />
            <ol className="mt-5 space-y-3">
              {misi.map((m, i) => (
                <li key={i} className="flex gap-4 rounded-2xl border border-krem-200 bg-krem p-4">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-hutan-700 text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <span className="text-tinta-600">{m}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ---------- LETAK GEOGRAFIS ---------- */}
      <section className="container-desa py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Letak Geografis"
            judul="Posisi & wilayah desa"
            className="mb-8"
          />
        </Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {batasItems.map((b) => (
                <div key={b.arah} className="rounded-2xl border border-krem-200 bg-white p-4">
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-hutan-700">
                    <b.icon size={18} /> Batas {b.arah}
                  </span>
                  <p className="mt-1.5 text-sm text-tinta-600">{b.isi}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-krem-200 bg-white p-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-hutan-700">
                  <IconRuler2 size={18} /> Luas Wilayah
                </span>
                <p className="mt-1.5 text-sm text-tinta-600">{geografis.luas}</p>
              </div>
              <div className="rounded-2xl border border-krem-200 bg-white p-4">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-hutan-700">
                  <IconMountain size={18} /> Ketinggian
                </span>
                <p className="mt-1.5 text-sm text-tinta-600">{geografis.ketinggian}</p>
              </div>
              <div className="rounded-2xl border border-krem-200 bg-white p-4 sm:col-span-2">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-hutan-700">
                  <IconMapPin size={18} /> Koordinat Pusat
                </span>
                <p className="mt-1.5 text-sm text-tinta-600">
                  {site.koordinat.lat}, {site.koordinat.lng}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            {/* Peta kecil posisi desa */}
            <MiniMap
              lokasi={kantorDesa ? [kantorDesa] : []}
              center={site.koordinat}
              zoom={14}
              tinggi="h-full min-h-[320px]"
            />
          </Reveal>
        </div>
      </section>

      {/* ---------- STRUKTUR PEMERINTAHAN ---------- */}
      <section className="bg-white py-16">
        <div className="container-desa">
          <Reveal>
            <SectionHeading
              eyebrow="Pemerintahan"
              judul="Struktur organisasi pemerintah desa"
              className="mb-10"
            />
          </Reveal>

          {/* Bagan struktur */}
          <div className="flex flex-col items-center gap-6">
            {/* Kepala Desa + BPD (mitra) */}
            <Reveal>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:gap-0">
                <KotakPerangkat data={perangkat.kepala} utama />
                <span
                  className="h-5 w-px border-l-2 border-dashed border-hutan-300 sm:my-auto sm:h-px sm:w-10 sm:border-l-0 sm:border-t-2"
                  aria-hidden="true"
                />
                <KotakPerangkat data={perangkat.bpd} mitra />
              </div>
            </Reveal>

            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />

            {/* Sekretariat: Sekretaris membawahi para Kaur */}
            <Reveal className="w-full">
              <div className="flex flex-col items-center gap-4">
                <KotakPerangkat data={perangkat.sekretaris} />
                <span className="h-5 w-px bg-hutan-300" aria-hidden="true" />
                <div className="grid w-full gap-4 sm:grid-cols-3">
                  {perangkat.kaur.map((k, i) => (
                    <KotakPerangkat key={i} data={k} />
                  ))}
                </div>
              </div>
            </Reveal>

            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />

            {/* Pelaksana Teknis (Kasi) */}
            <Reveal className="w-full">
              <BarisPerangkat label="Pelaksana Teknis">
                <div className="flex w-full flex-wrap justify-center gap-4">
                  {perangkat.kasi.map((k, i) => (
                    <KotakPerangkat key={i} data={k} />
                  ))}
                </div>
              </BarisPerangkat>
            </Reveal>

            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />

            {/* Pelaksana Kewilayahan (Kasun) */}
            <Reveal className="w-full">
              <BarisPerangkat label="Pelaksana Kewilayahan">
                <div className="grid w-full gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {perangkat.dusun.map((k, i) => (
                    <KotakPerangkat key={i} data={k} />
                  ))}
                </div>
              </BarisPerangkat>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- PEMBAGIAN WILAYAH ---------- */}
      <section className="container-desa py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Pembagian Wilayah"
            judul="Dusun, RW, RT & jumlah penduduk"
            className="mb-8"
          />
        </Reveal>
        <Reveal>
          <div className="overflow-x-auto rounded-card border border-krem-200">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead className="bg-hutan-800 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold">Dusun</th>
                  <th className="px-5 py-3 font-semibold">RW</th>
                  <th className="px-5 py-3 font-semibold">RT</th>
                  <th className="px-5 py-3 text-right font-semibold">Jumlah Penduduk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-krem-200 bg-white">
                {stat.penduduk_per_dusun.map((d) => {
                  const extra = wilayahExtra[d.dusun] || { rw: "-", rt: "-" };
                  const total = d.laki_laki + d.perempuan;
                  return (
                    <tr key={d.dusun} className="hover:bg-krem/60">
                      <td className="px-5 py-3 font-medium text-hutan-900">{d.dusun}</td>
                      <td className="px-5 py-3 text-tinta-600">{extra.rw}</td>
                      <td className="px-5 py-3 text-tinta-600">{extra.rt}</td>
                      <td className="px-5 py-3 text-right text-tinta-600">
                        {formatAngka(total)} jiwa
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="bg-krem-200 font-semibold text-hutan-900">
                  <td className="px-5 py-3">Total</td>
                  <td className="px-5 py-3" colSpan={2}></td>
                  <td className="px-5 py-3 text-right">
                    {formatAngka(stat.ringkasan.jumlah_penduduk)} jiwa
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Reveal>
      </section>

      {/* ---------- DEMOGRAFI RINGKAS ---------- */}
      <section className="bg-white py-16">
        <div className="container-desa">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-4 rounded-card bg-hutan-100/60 p-8 sm:flex-row sm:items-center">
              <div>
                <SectionHeading
                  eyebrow="Demografi"
                  judul="Ingin melihat data lengkap?"
                  deskripsi="Grafik demografi (usia, gender, pendidikan, mata pencaharian) dan Indeks Desa Membangun tersaji lengkap di dashboard statistik."
                />
              </div>
              <Tombol href="/statistik" variant="hutan" className="shrink-0">
                <IconChartBar size={18} />
                Buka Dashboard Statistik
              </Tombol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- SARANA PRASARANA ---------- */}
      <section className="container-desa py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Sarana & Prasarana"
            judul="Fasilitas yang tersedia di desa"
            className="mb-8"
          />
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {saranaGrid.map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-card border border-krem-200 bg-white p-5 shadow-sm">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-hutan-100 text-hutan-700">
                  <s.icon size={24} stroke={1.75} />
                </span>
                <div>
                  <span className="font-display text-2xl font-semibold text-hutan-900">
                    {s.nilai}
                  </span>
                  <p className="font-medium text-tinta">{s.label}</p>
                  <p className="mt-1 text-xs text-tinta-600">{s.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

/* Kotak satu jabatan pada bagan struktur */
function KotakPerangkat({ data, utama = false, mitra = false }) {
  const gaya = utama
    ? "border-emas-500 bg-emas-100/50"
    : mitra
      ? "border-dashed border-hutan-300 bg-hutan-100/40"
      : "border-krem-200 bg-white";
  return (
    <div className={`w-full max-w-xs rounded-2xl border p-4 text-center shadow-sm ${gaya}`}>
      <p className="text-xs font-semibold uppercase tracking-wide text-hutan-600">
        {data.jabatan}
      </p>
      <p className="mt-1 font-semibold text-hutan-900">{data.nama}</p>
      {data.kontak && <p className="mt-0.5 text-xs text-tinta-600">{data.kontak}</p>}
    </div>
  );
}

/* Baris kelompok perangkat dengan label kategori */
function BarisPerangkat({ label, children }) {
  return (
    <div className="w-full">
      <span className="mb-3 block text-center text-xs font-semibold uppercase tracking-[0.18em] text-hutan-500">
        {label}
      </span>
      {children}
    </div>
  );
}
