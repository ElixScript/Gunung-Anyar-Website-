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

// Tombol utama (CTA emas) & sekunder — hover angkat + glow lembut, press feedback
export function Tombol({ href, children, variant = "primary", className = "", ...props }) {
  const dasar =
    "group/tombol inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 ease-out will-change-transform focus-visible:outline-offset-2 active:translate-y-0 active:scale-[0.98]";
  const gaya = {
    primary:
      "bg-emas-500 text-hutan-900 shadow-lift hover:-translate-y-1 hover:bg-emas-600 hover:shadow-glow-emas",
    outline:
      "border border-white/70 text-white backdrop-blur-sm hover:-translate-y-1 hover:border-white hover:bg-white/15 hover:shadow-[0_10px_30px_-12px_rgba(255,255,255,0.35)]",
    hutan:
      "bg-gradient-to-b from-hutan-600 to-hutan-700 text-white shadow-lift hover:-translate-y-1 hover:from-hutan-700 hover:to-hutan-800 hover:shadow-glow-hutan",
    terakota:
      "bg-terakota-500 text-white shadow-lift hover:-translate-y-1 hover:bg-terakota-600",
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

// Tautan "selengkapnya" dengan underline animasi + panah bergeser
export function TautanSelengkapnya({ href, children = "Lihat selengkapnya" }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1 text-sm font-semibold text-hutan-700 transition-colors hover:text-hutan-800"
    >
      <span className="link-garis">{children}</span>
      <IconChevronRight
        size={16}
        className="transition-transform duration-300 ease-out group-hover:translate-x-1"
      />
    </Link>
  );
}

// Hero halaman dalam — sinematik ringan: gradient grading, noise, blob
// mengambang, dan entrance bertahap saat halaman terbuka (CSS murni).
export function PageHero({ eyebrow, judul, deskripsi, children }) {
  return (
    <section className="lapisan-noise relative overflow-hidden bg-gradient-to-br from-hutan-900 via-hutan-900 to-hutan-800 text-white">
      {/* Cahaya organik yang mengambang perlahan */}
      <div
        className="animasi-ambang-a pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emas-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animasi-ambang-b pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-hutan-400/25 blur-3xl"
        aria-hidden="true"
      />
      {/* Sorot hangat dari atas (natural lighting) */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(217,164,65,0.10),transparent_50%)]"
        aria-hidden="true"
      />
      <div className="container-desa relative z-[2] py-16 sm:py-24">
        {eyebrow && (
          <span className="animasi-masuk inline-block text-xs font-semibold uppercase tracking-[0.18em] text-emas-300">
            {eyebrow}
          </span>
        )}
        <h1
          className="animasi-masuk mt-3 max-w-3xl text-4xl leading-[1.08] text-white sm:text-6xl"
          style={{ animationDelay: "120ms" }}
        >
          {judul}
        </h1>
        {deskripsi && (
          <p
            className="animasi-masuk mt-5 max-w-2xl text-lg leading-relaxed text-hutan-100/85"
            style={{ animationDelay: "240ms" }}
          >
            {deskripsi}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
