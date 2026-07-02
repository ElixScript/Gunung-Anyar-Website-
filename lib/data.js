/*
  Akses data terpusat.
  Semua halaman mengambil data lewat fungsi di sini agar konsisten dan
  mudah diganti sumbernya di kemudian hari.
*/

import lokasi from "@/data/lokasi.json";
import statistik from "@/data/statistik.json";
import berita from "@/data/berita.json";

// ---------- Lokasi / Potensi ----------
export function getLokasi() {
  return lokasi;
}

export function getLokasiById(id) {
  return lokasi.find((l) => l.id === id) || null;
}

export function getLokasiByKategori(kategori) {
  return lokasi.filter((l) => l.kategori === kategori);
}

// ---------- Statistik ----------
export function getStatistik() {
  return statistik;
}

// ---------- Berita ----------
export function getBerita() {
  // Urutkan dari terbaru ke terlama berdasarkan tanggal
  return [...berita].sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal));
}

export function getBeritaTerbaru(jumlah = 3) {
  return getBerita().slice(0, jumlah);
}

export function getBeritaBySlug(slug) {
  return berita.find((b) => b.slug === slug) || null;
}

// ---------- Utilitas ----------
const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

// Ubah "2026-06-18" menjadi "18 Juni 2026"
export function formatTanggal(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return iso;
  return `${d.getDate()} ${BULAN[d.getMonth()]} ${d.getFullYear()}`;
}

// Format angka dengan pemisah ribuan gaya Indonesia (2864 -> "2.864")
export function formatAngka(n) {
  return new Intl.NumberFormat("id-ID").format(n);
}
