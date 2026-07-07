import { BeritaCard, PotensiCard } from "@/components/cards";
import Reveal from "@/components/Reveal";
import { SectionHeading, TautanSelengkapnya, Tombol } from "@/components/ui";
import { getBeritaTerbaru, getLokasiById } from "@/lib/data";
import { site } from "@/lib/site";
import {
  IconArrowRight,
  IconChevronDown,
  IconMap2,
  IconMapPin,
} from "@tabler/icons-react";
import Link from "next/link";

export const metadata = {
  title: `${site.namaDesa} — Beranda`,
  description: site.deskripsiSingkat,
  alternates: { canonical: "/" },
};

export default function Beranda() {
  const beritaTerbaru = getBeritaTerbaru(3);

  // Potensi unggulan pilihan (satu per beberapa kategori agar beragam)
  const potensiUnggulan = ["loc-001", "loc-004", "loc-005", "loc-009"]
    .map(getLokasiById)
    .filter(Boolean);

  return (
    <>
      {/* ============ HERO ============ */}
      {/*
        Latar belakang memakai foto (public/images/hero/hero-desa.jpg) dengan
        overlay gradasi gelap agar teks tetap terbaca (sesuai spesifikasi hero).
        FOTO SAAT INI MASIH ILUSTRASI (sawah Bali, sumber Wikimedia Commons —
        lihat public/images/SUMBER-FOTO.md), BUKAN foto asli Gunung Anyar.
        Ganti file tersebut dengan hasil dokumentasi lapangan tim pemetaan.
      */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden bg-hutan-900 lg:min-h-[90vh]">
        {/* Foto latar */}
        <img
          src="/images/hero/hero-desa.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay gradasi gelap transparan agar teks kontras & terbaca */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-hutan-900/90 via-hutan-900/75 to-hutan-800/60"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-32 top-1/4 h-96 w-96 rounded-full bg-emas-500/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-desa relative z-10 py-20 text-white">
          {/* Kolom teks */}
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emas-300 backdrop-blur">
                <IconMapPin size={14} />
                Kec. {site.kecamatan}, {site.kabupaten} · {site.provinsi}
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h1 className="mt-5 text-4xl leading-[1.05] text-white sm:text-6xl">
                {site.namaDesa}
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-hutan-100/90 sm:text-xl">
                {site.tagline}
              </p>
            </Reveal>
            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap gap-3">
                <Tombol href="/potensi" variant="primary">
                  Jelajahi Potensi
                  <IconArrowRight size={18} />
                </Tombol>
                <Tombol href="/peta" variant="outline">
                  <IconMap2 size={18} />
                  Lihat Peta
                </Tombol>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Indikator scroll ke bawah */}
        <a
          href="#preview-peta"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
          aria-label="Gulir ke bawah"
        >
          <IconChevronDown size={30} className="animate-bounce" />
        </a>
      </section>

      {/* ============ PREVIEW PETA ============ */}
      <section id="preview-peta" className="container-desa py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Peta Potensi"
              judul="Telusuri potensi desa lewat peta interaktif"
              deskripsi="Temukan lokasi wisata alam, lahan pertanian, UMKM, fasilitas umum, dan situs budaya desa. Klik setiap penanda untuk melihat foto dan informasi lengkapnya."
            />
            <div className="mt-6 flex flex-wrap gap-3">
              <Tombol href="/peta" variant="hutan">
                <IconMap2 size={18} />
                Buka Peta Interaktif
              </Tombol>
              <TautanSelengkapnya href="/potensi">
                Daftar potensi desa
              </TautanSelengkapnya>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <Link
              href="/peta"
              className="group relative block overflow-hidden rounded-card border border-krem-200 shadow-lift"
            >
              {/* Preview peta bergaya (placeholder). Tampilan peta asli ada di halaman /peta */}
              <div className="relative aspect-[16/10] bg-hutan-100">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(120deg, #e3ecd9 0%, #cfe0c0 40%, #b7d0a2 100%)",
                  }}
                />
                {/* Garis "jalan" dekoratif */}
                <svg
                  className="absolute inset-0 h-full w-full opacity-40"
                  viewBox="0 0 400 250"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M0 180 Q120 120 200 160 T400 90" fill="none" stroke="#4a7c2e" strokeWidth="3" />
                  <path d="M40 0 Q90 90 60 250" fill="none" stroke="#b8842d" strokeWidth="2" />
                </svg>
                {/* Penanda contoh */}
                <span className="absolute left-[30%] top-[45%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-wisata text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <span className="absolute left-[62%] top-[35%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-umkm text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <span className="absolute left-[50%] top-[68%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-fasilitas text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-hutan-900/70 to-transparent p-4">
                  <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-hutan-800 shadow transition-transform group-hover:scale-105">
                    Klik untuk membuka peta lengkap
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============ POTENSI UNGGULAN ============ */}
      <section className="bg-white py-20">
        <div className="container-desa">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow="Potensi Unggulan"
                judul="Kekayaan yang kami banggakan"
                deskripsi="Sebagian potensi terbaik Desa Gunung Anyar yang siap dikunjungi dan dikembangkan bersama."
              />
              <TautanSelengkapnya href="/potensi">Lihat semua potensi</TautanSelengkapnya>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {potensiUnggulan.map((lokasi, i) => (
              <Reveal key={lokasi.id} delay={i * 80} className="h-full">
                <PotensiCard lokasi={lokasi} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BERITA TERBARU ============ */}
      <section className="container-desa py-20">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Kabar Desa"
              judul="Berita & kegiatan terbaru"
              deskripsi="Ikuti perkembangan pembangunan, kegiatan warga, dan program KKN di Desa Gunung Anyar."
            />
            <TautanSelengkapnya href="/berita">Semua berita</TautanSelengkapnya>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {beritaTerbaru.map((berita, i) => (
            <Reveal key={berita.slug} delay={i * 80} className="h-full">
              <BeritaCard berita={berita} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ CTA PENUTUP ============ */}
      <section className="container-desa pb-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[1.5rem] bg-hutan-800 px-6 py-14 text-center text-white sm:px-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emas-500/20 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="relative text-3xl text-white sm:text-4xl">
              Ingin tahu lebih banyak tentang desa kami?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-hutan-100/85">
              Hubungi pemerintah desa untuk kerja sama, kunjungan, atau pembelian
              produk UMKM. Kami senang menyambut Anda.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <Tombol href="/kontak" variant="primary">
                Hubungi Desa
                <IconArrowRight size={18} />
              </Tombol>
              <Tombol href="/profil" variant="outline">
                Pelajari Profil Desa
              </Tombol>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
