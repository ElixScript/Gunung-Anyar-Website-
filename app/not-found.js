import Link from "next/link";
import { IconHome, IconMoodSad } from "@tabler/icons-react";

export const metadata = { title: "Halaman tidak ditemukan" };

// Halaman 404 khusus (tampil saat URL tidak dikenali).
export default function NotFound() {
  return (
    <section className="container-desa flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <IconMoodSad size={56} className="text-hutan-400" stroke={1.5} />
      <h1 className="mt-6 font-display text-5xl font-semibold text-hutan-900">404</h1>
      <p className="mt-3 max-w-md text-tinta-600">
        Maaf, halaman yang Anda cari tidak ditemukan atau telah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-emas-500 px-6 py-3 text-sm font-semibold text-hutan-900 shadow-lift transition-all hover:-translate-y-0.5 hover:bg-emas-600"
      >
        <IconHome size={18} />
        Kembali ke Beranda
      </Link>
    </section>
  );
}
