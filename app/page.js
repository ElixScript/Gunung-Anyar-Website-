import { BeritaCard, PotensiCard } from "@/components/cards";
import HeroVisual from "@/components/HeroVisual";
import { Tilt } from "@/components/motion";
import Reveal from "@/components/Reveal";
import { SectionHeading, TautanSelengkapnya, Tombol } from "@/components/ui";
import { getBeritaTerbaru, getLokasiById } from "@/lib/data";
import { site } from "@/lib/site";
import {
  IconArrowRight,
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

  // Potensi unggulan pilihan (UMKM khas desa)
  const potensiUnggulan = ["umkm-001", "umkm-005", "umkm-006", "umkm-008"]
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
      <section className="lapisan-noise relative flex min-h-[92svh] items-center overflow-hidden bg-hutan-900 lg:min-h-[100svh]">
        {/* Lapisan visual sinematik: slow zoom, color grading, blob parallax */}
        <HeroVisual />

        <div className="container-desa relative z-10 py-24 text-white">
          {/* Konten hero — entrance bertahap saat halaman terbuka */}
          <div>
            <div className="animasi-masuk" style={{ animationDelay: "150ms" }}>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-emas-300 backdrop-blur-md">
                <IconMapPin size={14} />
                Kec. {site.kecamatan}, {site.kabupaten} · {site.provinsi}
              </span>
            </div>

            {/* Judul: tiap kata naik dari balik mask, ala opening film */}
            <h1 className="mt-6 max-w-4xl text-5xl leading-[1.02] text-white sm:text-7xl lg:text-[5.5rem]">
              {site.namaDesa.split(" ").map((kata, i) => (
                <span key={i} className="kata-hero mr-[0.22em] last:mr-0">
                  <span style={{ animationDelay: `${250 + i * 130}ms` }}>{kata}</span>
                </span>
              ))}
            </h1>

            <p
              className="animasi-masuk mt-6 max-w-xl text-lg leading-relaxed text-hutan-100/90 sm:text-xl"
              style={{ animationDelay: "650ms" }}
            >
              {site.tagline}
            </p>

            <div
              className="animasi-masuk mt-9 flex flex-wrap gap-3"
              style={{ animationDelay: "800ms" }}
            >
              <Tombol href="/potensi" variant="primary">
                Jelajahi Potensi
                <IconArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover/tombol:translate-x-1"
                />
              </Tombol>
              <Tombol href="/peta" variant="outline">
                <IconMap2 size={18} />
                Lihat Peta
              </Tombol>
            </div>
          </div>
        </div>

        {/* Indikator scroll: garis dengan titik meluncur */}
        <a
          href="#preview-peta"
          className="animasi-masuk absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/70 transition-colors hover:text-white"
          style={{ animationDelay: "1200ms" }}
          aria-label="Gulir ke bawah"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Jelajahi</span>
          <span className="relative h-10 w-[22px] rounded-full border border-white/40">
            <span className="animasi-tetes-scroll absolute left-1/2 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emas-300" />
          </span>
        </a>

        {/* Divider organik: lengkung menyatu ke latar krem konten */}
        <svg
          className="absolute inset-x-0 bottom-[-1px] z-10 h-12 w-full text-krem sm:h-16"
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M0,40 C240,64 480,8 720,24 C960,40 1200,60 1440,28 L1440,64 L0,64 Z"
          />
        </svg>
      </section>

      {/* ============ PREVIEW PETA ============ */}
      <section id="preview-peta" className="container-desa py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal variant="left">
            <SectionHeading
              eyebrow="Peta Potensi"
              judul="Telusuri potensi desa lewat peta interaktif"
              deskripsi="Temukan lokasi UMKM, sarana pendidikan, tempat ibadah, lapangan olahraga, hingga layanan pemerintahan & kesehatan desa. Klik setiap penanda untuk melihat foto dan informasi lengkapnya."
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
          <Reveal delay={120} variant="right">
            <Tilt maks={4}>
            <Link
              href="/peta"
              className="group relative block overflow-hidden rounded-card border border-krem-200 shadow-lift transition-shadow duration-500 hover:shadow-float"
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
                <span className="absolute left-[30%] top-[45%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-umkm text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <span className="absolute left-[62%] top-[35%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-ibadah text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <span className="absolute left-[50%] top-[68%] grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-kat-pendidikan text-white shadow-lg">
                  <IconMapPin size={16} />
                </span>
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-gradient-to-t from-hutan-900/70 to-transparent p-4">
                  <span className="rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-hutan-800 shadow backdrop-blur transition-transform duration-300 ease-out group-hover:scale-105">
                    Klik untuk membuka peta lengkap
                  </span>
                </div>
              </div>
            </Link>
            </Tilt>
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
        <Reveal variant="zoom">
          <div className="lapisan-noise relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-hutan-800 via-hutan-800 to-hutan-900 px-6 py-16 text-center text-white shadow-float sm:px-12">
            <div
              className="animasi-ambang-a pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emas-500/20 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="animasi-ambang-b pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-hutan-400/20 blur-3xl"
              aria-hidden="true"
            />
            <h2 className="relative text-3xl text-white sm:text-5xl">
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
