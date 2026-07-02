import "./globals.css";
import { site } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className="h-full antialiased">
      <head>
        {/* Font dimuat dari Google Fonts saat halaman dibuka di browser
            (bukan saat build), agar situs statis mudah di-build di mana saja.
            Fraunces = font display heading, Inter = font body. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
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
