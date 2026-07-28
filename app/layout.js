import "./globals.css";
import { Fraunces, Inter } from "next/font/google";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*
  Font diunduh & disimpan sendiri saat BUILD oleh next/font — bukan diminta ke
  Google saat halaman dibuka. Efeknya: hilang satu permintaan render-blocking
  ke domain pihak ketiga, dan next/font otomatis menyisipkan fallback dengan
  metrik yang disamakan sehingga teks tidak bergeser saat font asli tiba.
  Keduanya font variabel, jadi seluruh bobot 400–700 cukup satu file.
*/
const fontDisplay = Fraunces({
  subsets: ["latin"],
  axes: ["opsz"], // pertahankan optical sizing seperti setelan sebelumnya
  variable: "--font-fraunces",
  display: "swap",
});

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Metadata default seluruh situs. Tiap halaman bisa menimpanya lewat `export const metadata`.
export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.namaDesa} — Kec. ${site.kecamatan}, ${site.kabupaten}`,
    template: `%s | ${site.namaDesa}`,
  },
  description: site.deskripsiSingkat,
  keywords: [
    site.namaDesa,
    `Desa ${site.kecamatan}`,
    site.kabupaten,
    "profil desa",
    "potensi desa",
    "UMKM desa",
    "KKN",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: site.namaDesa,
    title: `${site.namaDesa} — Profil & Potensi Desa`,
    description: site.deskripsiSingkat,
    images: ["/images/og-default.jpg"],
  },
  twitter: {
    card: "summary_large_image",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    apple: "/apple-touch-icon.png",
  },
};

// Warna bilah alamat browser di HP — samakan dengan latar krem situs
export const viewport = {
  themeColor: "#faf7f0",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="id"
      className={`h-full antialiased ${fontDisplay.variable} ${fontSans.variable}`}
    >
      <head>
        {/* Konten di bawah hero memakai animasi scroll-reveal yang dimulai dari
            opacity 0. Tanpa JavaScript animasinya tak pernah jalan, jadi
            pastikan semuanya tetap terbaca. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;filter:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-krem text-tinta">
        {/* Lewati navigasi — aksesibilitas keyboard */}
        <a
          href="#konten-utama"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[1000] focus:rounded-lg focus:bg-hutan-700 focus:px-4 focus:py-2 focus:text-white"
        >
          Lompat ke konten utama
        </a>
        <Navbar />
        <main id="konten-utama" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
