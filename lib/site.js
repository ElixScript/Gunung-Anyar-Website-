/*
  Konfigurasi pusat website.
  Ubah data desa, menu navigasi, dan tautan di SINI — otomatis terpakai
  di Navbar, Footer, metadata SEO, dan sitemap.

  CATATAN: Sebagian nilai masih DATA CONTOH (ditandai "// CONTOH").
  Ganti dengan data asli Desa Gunung Anyar sebelum dirilis.
*/

export const site = {
  namaDesa: "Desa Gunung Anyar",
  kecamatan: "Tapen",
  kabupaten: "Bondowoso",
  provinsi: "Jawa Timur",

  // URL produksi final (untuk Open Graph & sitemap). Ganti saat sudah dideploy.
  url: "https://desa-gunung-anyar.example.id", // CONTOH

  tagline: "Menyimpan potensi, merawat harapan di kaki pegunungan Bondowoso.",
  deskripsiSingkat:
    "Website resmi profil Desa Gunung Anyar, Kecamatan Tapen, Kabupaten Bondowoso — memuat profil desa, peta potensi interaktif, data statistik, direktori UMKM, dan dokumentasi program KKN.",

  // Koordinat pusat desa (dipakai peta). CONTOH — sesuaikan dengan titik asli.
  koordinat: { lat: -7.9285, lng: 113.9612 }, // CONTOH (sekitar Kec. Tapen, Bondowoso)

  // Kontak kantor desa — CONTOH
  kontak: {
    alamat: "Jl. Raya Gunung Anyar No. 1, Kec. Tapen, Kab. Bondowoso, Jawa Timur 68283", // CONTOH
    telepon: "(0332) 000-000", // CONTOH
    whatsapp: "6281200000000", // CONTOH — format internasional tanpa "+"
    email: "pemdes.gununganyar@example.id", // CONTOH
    jamPelayanan: "Senin–Jumat, 08.00–15.00 WIB",
  },

  sosial: {
    instagram: "https://instagram.com/", // CONTOH
    facebook: "https://facebook.com/", // CONTOH
    youtube: "https://youtube.com/", // CONTOH
  },

  // Endpoint Formspree untuk form kontak. Ganti "xxxxxxxx" dengan ID form Anda
  // setelah mendaftar gratis di https://formspree.io (lihat README).
  formspreeId: "xxxxxxxx", // CONTOH

  kampus: "Universitas Gadjah Mada", // CONTOH — sesuaikan
  tahunKKN: 2026,
};

/*
  Struktur navigasi utama.
  Item dengan `children` tampil sebagai dropdown.
*/
export const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil Desa", href: "/profil" },
  {
    label: "Peta & Potensi",
    href: "/peta",
    children: [
      { label: "Peta Interaktif", href: "/peta" },
      { label: "Potensi Desa", href: "/potensi" },
      { label: "UMKM", href: "/umkm" },
    ],
  },
  { label: "Data & Statistik", href: "/statistik" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
  { label: "Tentang KKN", href: "/tentang-kkn" },
  { label: "Kontak", href: "/kontak" },
];

// Metadata kategori lokasi/potensi — dipakai peta, filter, legenda, dan badge.
// `key` harus cocok dengan field "kategori" di data/lokasi.json.
export const kategoriLokasi = [
  { key: "wisata", label: "Wisata Alam", warna: "#0f6e56", icon: "mountain" },
  { key: "pertanian", label: "Pertanian & Perkebunan", warna: "#3b6d11", icon: "plant" },
  { key: "umkm", label: "UMKM & Industri Rumahan", warna: "#993c1d", icon: "building-store" },
  { key: "fasilitas", label: "Fasilitas Umum", warna: "#185fa5", icon: "building-community" },
  { key: "budaya", label: "Budaya & Kesenian", warna: "#534ab7", icon: "masks-theater" },
];

export function getKategori(key) {
  return kategoriLokasi.find((k) => k.key === key) || null;
}
