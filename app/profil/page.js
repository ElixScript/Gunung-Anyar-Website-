import {
  IconArrowUp,
  IconArrowDown,
  IconArrowLeft,
  IconArrowRight,
  IconMountain,
  IconRuler2,
  IconMapPin,
  IconSchool,
  IconStethoscope,
  IconBuildingMosque,
  IconDroplet,
  IconBolt,
  IconChartBar,
} from "@tabler/icons-react";
import { PageHero, SectionHeading, Tombol } from "@/components/ui";
import Reveal from "@/components/Reveal";
import MiniMap from "@/components/peta/MiniMap";
import { site } from "@/lib/site";
import { getStatistik, getLokasiById, formatAngka } from "@/lib/data";

export const metadata = {
  title: "Profil Desa",
  description: `Profil lengkap ${site.namaDesa}: sejarah, visi misi, letak geografis, struktur pemerintahan, pembagian wilayah, dan sarana prasarana.`,
  alternates: { canonical: "/profil" },
};

/* ---------- DATA CONTOH profil desa (ganti dengan data asli) ---------- */
const sejarah = [
  "Desa Gunung Anyar merupakan salah satu desa di wilayah Kecamatan Tapen, Kabupaten Bondowoso, yang tumbuh di kaki perbukitan dengan tanah subur dan sumber air yang melimpah. Menurut cerita tutur warga, nama “Gunung Anyar” berasal dari sebuah bukit baru (anyar) yang menjadi penanda pembukaan permukiman pertama.",
  "Seiring waktu, desa berkembang dari kelompok kecil peladang menjadi desa pertanian yang mapan dengan komoditas padi dan kopi. Semangat gotong royong warga menjadi fondasi utama pembangunan desa hingga hari ini.",
];
const timeline = [
  { tahun: "1900-an", isi: "Pembukaan permukiman pertama di sekitar bukit oleh para peladang." },
  { tahun: "1980", isi: "Pembangunan saluran irigasi yang memperluas lahan sawah produktif." },
  { tahun: "2005", isi: "Berkembangnya perkebunan kopi rakyat di kawasan lereng utara." },
  { tahun: "2026", isi: "Peluncuran website profil desa sebagai luaran program KKN." },
];
const visi =
  "Terwujudnya Desa Gunung Anyar yang mandiri, sejahtera, dan berbudaya melalui optimalisasi potensi pertanian serta pemberdayaan masyarakat.";
const misi = [
  "Meningkatkan kualitas pelayanan publik yang transparan dan partisipatif.",
  "Mengembangkan sektor pertanian, perkebunan, dan UMKM sebagai penggerak ekonomi desa.",
  "Memperkuat sarana pendidikan, kesehatan, dan infrastruktur dasar.",
  "Melestarikan seni, budaya, dan lingkungan hidup desa.",
];
const geografis = {
  batas: {
    utara: "Kawasan hutan & lereng pegunungan",
    selatan: "Desa tetangga (Kec. Tapen)",
    timur: "Aliran sungai & persawahan",
    barat: "Desa tetangga (Kec. Tapen)",
  },
  luas: "412 ha",
  ketinggian: "± 320 mdpl",
};
const perangkat = {
  kepala: { nama: "Nama Kepala Desa", jabatan: "Kepala Desa", kontak: "0812-0000-0000" },
  sekretaris: { nama: "Nama Sekretaris", jabatan: "Sekretaris Desa", kontak: "0812-0000-0001" },
  kaur: [
    { nama: "Nama Kaur", jabatan: "Kaur Keuangan" },
    { nama: "Nama Kaur", jabatan: "Kaur Umum & Perencanaan" },
    { nama: "Nama Kasi", jabatan: "Kasi Pemerintahan" },
    { nama: "Nama Kasi", jabatan: "Kasi Kesejahteraan & Pelayanan" },
  ],
  dusun: [
    { nama: "Nama Kadus", jabatan: "Kepala Dusun Krajan" },
    { nama: "Nama Kadus", jabatan: "Kepala Dusun Sumbersari" },
    { nama: "Nama Kadus", jabatan: "Kepala Dusun Tegalsari" },
    { nama: "Nama Kadus", jabatan: "Kepala Dusun Kalianyar" },
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
        deskripsi="Sejarah, visi misi, kondisi geografis, pemerintahan, dan sarana prasarana desa dalam satu halaman."
      />

      {/* ---------- SEJARAH + TIMELINE ---------- */}
      <section className="container-desa py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading eyebrow="Sejarah" judul="Jejak perjalanan desa" />
            <div className="mt-5 space-y-4 text-tinta-600 leading-relaxed">
              {sejarah.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          {/* Timeline vertikal */}
          <Reveal delay={120}>
            <ol className="relative ml-3 border-l-2 border-hutan-100">
              {timeline.map((t) => (
                <li key={t.tahun} className="mb-7 ml-6 last:mb-0">
                  <span className="absolute -left-[9px] grid h-4 w-4 place-items-center rounded-full bg-emas-500 ring-4 ring-krem" />
                  <span className="font-display text-lg font-semibold text-hutan-800">
                    {t.tahun}
                  </span>
                  <p className="mt-1 text-sm text-tinta-600">{t.isi}</p>
                </li>
              ))}
            </ol>
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

          {/* Bagan sederhana */}
          <div className="flex flex-col items-center gap-6">
            <Reveal>
              <KotakPerangkat data={perangkat.kepala} utama />
            </Reveal>
            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />
            <Reveal>
              <KotakPerangkat data={perangkat.sekretaris} />
            </Reveal>
            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />
            <Reveal className="w-full">
              <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {perangkat.kaur.map((k, i) => (
                  <KotakPerangkat key={i} data={k} />
                ))}
              </div>
            </Reveal>
            <span className="h-6 w-px bg-hutan-300" aria-hidden="true" />
            <Reveal className="w-full">
              <div className="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {perangkat.dusun.map((k, i) => (
                  <KotakPerangkat key={i} data={k} />
                ))}
              </div>
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
function KotakPerangkat({ data, utama = false }) {
  return (
    <div
      className={`w-full max-w-xs rounded-2xl border p-4 text-center shadow-sm ${
        utama ? "border-emas-500 bg-emas-100/50" : "border-krem-200 bg-white"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-hutan-600">
        {data.jabatan}
      </p>
      <p className="mt-1 font-semibold text-hutan-900">{data.nama}</p>
      {data.kontak && <p className="mt-0.5 text-xs text-tinta-600">{data.kontak}</p>}
    </div>
  );
}
