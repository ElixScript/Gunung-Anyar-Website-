import Link from "next/link";
import { IconChevronRight } from "@tabler/icons-react";
import { getKategori } from "@/lib/site";

/*
  Kumpulan komponen UI kecil yang dipakai ulang di banyak halaman,
  agar tampilan konsisten dan kode halaman tetap ringkas.
*/

// Judul section dengan eyebrow label + subjudul opsional
export function SectionHeading({ eyebrow, judul, deskripsi, terang = false, className = "" }) {
  return (
    <div className={`max-w-2xl ${className}`}>
      {eyebrow && (
        <span
          className={`inline-block text-xs font-semibold uppercase tracking-[0.18em] ${
            terang ? "text-emas-300" : "text-emas-600"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`mt-2 text-3xl leading-tight sm:text-4xl ${
          terang ? "text-white" : "text-hutan-900"
        }`}
      >
        {judul}
      </h2>
      {deskripsi && (
        <p
          className={`mt-3 text-base leading-relaxed ${
            terang ? "text-hutan-100/80" : "text-tinta-600"
          }`}
        >
          {deskripsi}
        </p>
      )}
    </div>
  );
}

// Badge kategori berwarna sesuai kategori peta/potensi
export function BadgeKategori({ kategori, className = "" }) {
  const meta = getKategori(kategori);
  if (!meta) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white ${className}`}
      style={{ backgroundColor: meta.warna }}
    >
      {meta.label}
    </span>
  );
}

// Tombol utama (CTA emas) & sekunder
export function Tombol({ href, children, variant = "primary", className = "", ...props }) {
  const dasar =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-offset-2";
  const gaya = {
    primary: "bg-emas-500 text-hutan-900 shadow-lift hover:bg-emas-600 hover:-translate-y-0.5",
    outline: "border border-white/70 text-white hover:bg-white/10",
    hutan: "bg-hutan-700 text-white hover:bg-hutan-800 hover:-translate-y-0.5",
    terakota: "bg-terakota-500 text-white hover:bg-terakota-600 hover:-translate-y-0.5",
  };
  const kelas = `${dasar} ${gaya[variant] || gaya.primary} ${className}`;

  if (href) {
    const eksternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    if (eksternal) {
      return (
        <a href={href} className={kelas} {...props}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={kelas} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button className={kelas} {...props}>
      {children}
    </button>
  );
}

// Tautan "selengkapnya" dengan panah
export function TautanSelengkapnya({ href, children = "Lihat selengkapnya" }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm font-semibold text-hutan-700 hover:text-hutan-800"
    >
      {children}
      <IconChevronRight
        size={16}
        className="transition-transform group-hover:translate-x-0.5"
      />
    </Link>
  );
}

// Hero sederhana untuk halaman-halaman dalam (bukan Beranda)
export function PageHero({ eyebrow, judul, deskripsi, children }) {
  return (
    <section className="relative overflow-hidden bg-hutan-900 text-white">
      {/* Ornamen dekoratif lembut */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-hutan-700/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-emas-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-desa relative py-16 sm:py-20">
        {eyebrow && (
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-emas-300">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-2 max-w-3xl text-4xl leading-tight text-white sm:text-5xl">
          {judul}
        </h1>
        {deskripsi && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-hutan-100/85">
            {deskripsi}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
