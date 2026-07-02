# Website Profil Desa Gunung Anyar

Website profil desa untuk **Desa Gunung Anyar, Kecamatan Tapen, Kabupaten Bondowoso, Jawa Timur** — luaran program **Kuliah Kerja Nyata (KKN)**.

Berisi: profil desa, **peta potensi interaktif**, **dashboard statistik**, direktori UMKM, galeri, berita, dan halaman kontak.

> ⚠️ **Sebagian besar data masih berupa CONTOH (placeholder)** agar tampilan bisa langsung dilihat. Ganti dengan data asli sebelum dirilis (lihat bagian [Cara Mengganti Data](#-cara-mengganti-data)).
>
> ⚠️ **Foto juga masih ilustrasi** (diunduh dari Wikimedia Commons, bebas lisensi) — bukan foto asli Desa Gunung Anyar. Daftar sumber & keterangan lengkap ada di `public/images/SUMBER-FOTO.md`. **Wajib diganti** dengan hasil dokumentasi lapangan tim pemetaan sebelum website diserahkan resmi, terutama foto di halaman Peta/Potensi/UMKM (melekat pada nama lokasi tertentu) dan foto anggota tim di halaman Tentang KKN (saat ini masih ikon avatar generik, bukan foto sungguhan).

---

## 🧰 Teknologi

- **Next.js 16** (App Router) + **React 19** — dibangun sebagai **situs statis** (`output: export`)
- **Tailwind CSS v4** — styling (konfigurasi warna/font ada di `app/globals.css`)
- **Leaflet + react-leaflet** — peta interaktif (tile gratis OpenStreetMap, tanpa API key)
- **Chart.js + react-chartjs-2** — grafik statistik
- **@tabler/icons-react** — ikon
- **Formspree** — pengiriman formulir kontak (tanpa server)

Karena hasil akhirnya file statis, website bisa di-*hosting* **gratis** di GitHub Pages, Netlify, atau Vercel.

---

## 🚀 Menjalankan di Komputer (Lokal)

Pastikan **Node.js versi 18 atau lebih baru** sudah terpasang ([unduh di sini](https://nodejs.org)).

```bash
# 1. Pasang semua kebutuhan (sekali saja)
npm install

# 2. Jalankan mode pengembangan
npm run dev
```

Lalu buka **http://localhost:3000** di browser. Perubahan kode akan langsung terlihat.

---

## 📦 Build & Deploy (Gratis)

```bash
npm run build
```

Perintah di atas menghasilkan folder **`out/`** berisi seluruh situs dalam bentuk file statis (HTML/CSS/JS). Isi folder `out/` inilah yang di-*upload* ke hosting.

### Opsi A — Netlify (paling mudah)
1. Buat akun gratis di [netlify.com](https://netlify.com).
2. **Drag & drop** folder `out/` ke halaman "Deploys" Netlify. Selesai.
   - Atau hubungkan repositori GitHub, lalu atur: *Build command* = `npm run build`, *Publish directory* = `out`.

### Opsi B — Vercel
1. Buat akun di [vercel.com](https://vercel.com), impor repositori GitHub.
2. Vercel otomatis mengenali Next.js. Klik **Deploy**.

### Opsi C — GitHub Pages
1. Push proyek ke repositori GitHub.
2. Jalankan `npm run build` → upload isi folder `out/` ke branch `gh-pages`, **atau** gunakan GitHub Actions.
3. File `public/.nojekyll` sudah disiapkan agar folder `_next` tidak diblokir GitHub Pages.

> **Catatan GitHub Pages:** jika alamat situs berada di sub-folder (mis. `namauser.github.io/nama-repo/`), tambahkan `basePath` dan `assetPrefix` di `next.config.mjs`:
> ```js
> const nextConfig = {
>   output: "export",
>   basePath: "/nama-repo",
>   assetPrefix: "/nama-repo",
>   images: { unoptimized: true },
>   trailingSlash: true,
> };
> ```

---

## ✏️ Cara Mengganti Data

Semua data dikumpulkan agar mudah diedit **tanpa perlu paham React**:

| Yang ingin diubah | File yang diedit |
|---|---|
| Nama desa, kontak, alamat, media sosial, koordinat, ID Formspree | `lib/site.js` |
| Lokasi & potensi di peta (juga dipakai halaman Potensi & UMKM) | `data/lokasi.json` |
| Angka statistik & sarana prasarana | `data/statistik.json` |
| Berita/artikel | `data/berita.json` |
| Sejarah, visi-misi, struktur pemerintahan | `app/profil/page.js` (bagian atas, "DATA CONTOH") |
| Anggota tim, timeline KKN | `app/tentang-kkn/page.js` |
| Daftar foto galeri & video | `app/galeri/page.js` |
| Daftar infografis | `app/statistik/page.js` |
| Warna & font (identitas visual) | `app/globals.css` (blok `@theme`) |

### Menambah lokasi di peta
Buka `data/lokasi.json` dan tambahkan objek baru. Field wajib: `id`, `nama`, `kategori`, `latitude`, `longitude`, `deskripsi`, `foto`.
`kategori` harus salah satu dari: `wisata`, `pertanian`, `umkm`, `fasilitas`, `budaya`.

Cara mendapatkan koordinat: buka [openstreetmap.org](https://www.openstreetmap.org), klik kanan pada titik lokasi → "Show address" / salin angka latitude & longitude.

### Menambah/mengganti foto
Letakkan file gambar di folder `public/images/...` sesuai kategori, lalu tulis path-nya di data (contoh: `/images/lokasi/nama-foto.jpg`).
Selama foto belum ada, sistem menampilkan placeholder hijau otomatis. Disarankan memakai format **WebP/JPG** yang sudah dikompres agar cepat dibuka.

---

## 📨 Mengaktifkan Formulir Kontak (Formspree)

1. Daftar gratis di [formspree.io](https://formspree.io).
2. Buat **New Form**, arahkan ke email desa.
3. Salin **ID form** (bagian setelah `/f/`, contoh `mzbqwxyz`).
4. Tempel pada `formspreeId` di file `lib/site.js`.

Selesai — setiap pesan dari formulir kontak akan masuk ke email tersebut.
Jika belum diatur, formulir menampilkan peringatan dan tetap menyediakan tautan email langsung.

---

## 📁 Struktur Folder

```
app/                    Halaman-halaman situs (tiap folder = 1 URL)
  page.js               Beranda
  profil/               Profil Desa
  peta/                 Peta Interaktif
  potensi/              Potensi Desa
  statistik/            Data & Statistik
  umkm/                 Direktori UMKM
  galeri/               Galeri
  berita/               Berita (+ [slug] untuk halaman detail)
  tentang-kkn/          Tentang Program KKN
  kontak/               Kontak & Pengaduan
  layout.js             Kerangka umum (navbar, footer, font, metadata)
  globals.css           Warna, font, dan gaya global
  sitemap.js, robots.js SEO (otomatis jadi sitemap.xml & robots.txt)
components/             Komponen yang dipakai ulang (Navbar, Footer, kartu, peta, chart, dll.)
data/                   Data konten: lokasi.json, statistik.json, berita.json
lib/                    site.js (konfigurasi pusat) & data.js (helper)
public/images/          Tempat menyimpan foto (hero, lokasi, galeri, tim, berita, infografis)
```

---

## ♿ Catatan Aksesibilitas & SEO

- HTML semantik, `alt` pada gambar, navigasi keyboard, dan state fokus terlihat.
- Peta interaktif dilengkapi **daftar lokasi teks** agar bisa diindeks mesin pencari.
- Setiap halaman punya judul & deskripsi unik + Open Graph untuk berbagi di media sosial.

---

Dibuat oleh **Tim KKN** sebagai bentuk pengabdian kepada Desa Gunung Anyar.
