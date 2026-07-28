# Website Profil Desa Gunung Anyar

Website resmi profil **Desa Gunung Anyar, Kecamatan Tapen, Kabupaten Bondowoso,
Jawa Timur** — luaran program **Kuliah Kerja Nyata (KKN)** yang diserahkan kepada
Pemerintah Desa Gunung Anyar.

Isi website: profil desa, **peta potensi interaktif**, **dashboard statistik**,
direktori UMKM, galeri foto, berita, transparansi anggaran (APBDes), dan halaman
kontak.

Kode sumber: <https://github.com/ElixScript/Gunung-Anyar-Website->

---

## 📋 Untuk Perangkat Desa — Baca Ini Dulu

### Yang masih perlu dilengkapi

Website sudah bisa dipakai apa adanya, tetapi enam hal berikut sebaiknya
dibereskan agar benar-benar rapi:

| # | Yang perlu dilengkapi | Ada di file | Kenapa penting |
|---|---|---|---|
| 1 | **Alamat website final** — masih `https://desa-gunung-anyar.vercel.app` | `lib/site.js` baris 17 | Dipakai untuk sitemap, tautan berbagi ke WhatsApp/Facebook, dan data ke Google. Kalau salah, pratinjau tautan jadi tidak muncul |
| 2 | **Tautan YouTube desa** — masih `https://youtube.com/` | `lib/site.js` baris 38 | Muncul sebagai ikon di footer. Hapus barisnya bila desa belum punya kanal |
| 3 | **Nama kampus KKN** | `lib/site.js` baris 41 | Sesuaikan bila perlu |
| 4 | **Foto sampul (hero) beranda** | `public/images/hero/hero-desa.jpg` | Masih foto ilustrasi sawah dari Wikimedia, bukan foto Desa Gunung Anyar |
| 5 | **Foto UMKM tempe & bata merah** | `public/images/lokasi/industri-tempe.jpg` dan `industri-bata-merah.jpg` | Dua UMKM ini belum sempat didokumentasikan tim KKN |
| 6 | **Data statistik** — saat ini data tahun 2025 | `data/statistik.json` | Perbarui tiap ada pemutakhiran data kependudukan |

> Selain enam hal di atas, **seluruh isi website sudah memakai data dan foto
> asli Desa Gunung Anyar** — profil & visi-misi dari RPJM Desa 2022–2027,
> 24 titik lokasi di peta, galeri dokumentasi KKN, dan infografis APBDes.
> Rincian asal-usul tiap foto ada di `SUMBER-FOTO.md`.

### Siapa yang mengelola?

Memperbarui website ini **tidak bisa lewat halaman admin** — tidak ada menu
login. Website ini sengaja dibuat sebagai *situs statis* supaya bisa di-*hosting*
gratis selamanya dan tidak bisa diretas lewat form login.

Konsekuensinya: setiap perubahan isi dilakukan dengan **mengedit file teks**,
lalu website dibangun ulang dan diunggah. Prosesnya tidak sulit, tetapi perlu
komputer dan sedikit pembiasaan.

**Saran:** tunjuk **satu orang operator** di perangkat desa (mis. Kaur Umum atau
operator desa yang biasa mengurus SID/website) sebagai penanggung jawab, dan
simpan nomor kontak tim KKN untuk pendampingan awal.

---

## ✏️ Cara Memperbarui Isi Website

Semua isi dikumpulkan di beberapa file saja, **tanpa perlu paham pemrograman**:

| Yang ingin diubah | File yang diedit |
|---|---|
| Nama desa, alamat kantor, telepon, email, media sosial, jam pelayanan | `lib/site.js` |
| Titik lokasi & potensi di peta (dipakai juga halaman Potensi & UMKM) | `data/lokasi.json` |
| Angka statistik penduduk & sarana prasarana | `data/statistik.json` |
| Berita / artikel | `data/berita.json` |
| Sejarah, visi-misi, batas wilayah, struktur pemerintahan | `app/profil/page.js` |
| Daftar foto galeri | `app/galeri/page.js` |
| Dokumen APBDes (infografis & laporan realisasi) | `app/statistik/page.js` |
| Warna & jenis huruf (identitas visual) | `app/globals.css` bagian `@theme` |

> **Penting:** file `.json` sangat sensitif terhadap tanda baca. Setiap koma,
> kutip, dan kurung harus lengkap. Bila website gagal dibangun setelah diedit,
> hampir pasti penyebabnya koma atau kutip yang tertinggal. Gunakan editor
> seperti [VS Code](https://code.visualstudio.com) yang menandai kesalahan
> dengan garis merah.

### Menambah berita baru

Buka `data/berita.json`, salin satu blok berita yang sudah ada, lalu ubah isinya:

```json
{
  "slug": "judul-berita-dipisah-strip",
  "judul": "Judul Berita",
  "kategori": "Pemerintahan",
  "tanggal": "2026-03-15",
  "penulis": "Pemerintah Desa Gunung Anyar",
  "thumbnail": "/images/berita/nama-foto.jpg",
  "ringkasan": "Satu-dua kalimat ringkasan yang muncul di kartu berita.",
  "konten": ["Paragraf pertama.", "Paragraf kedua.", "Paragraf ketiga."]
}
```

- `slug` menjadi alamat halamannya dan **harus unik** — huruf kecil semua,
  dipisah tanda strip, tanpa spasi.
- `tanggal` memakai format `TAHUN-BULAN-TANGGAL`. Berita otomatis diurutkan dari
  yang terbaru.
- `konten` berisi daftar paragraf; tiap paragraf satu tanda kutip.

### Menambah lokasi atau UMKM di peta

Buka `data/lokasi.json`, tambahkan satu blok baru. Kolom wajib: `id`, `nama`,
`kategori`, `latitude`, `longitude`, `deskripsi`, `foto`.

`kategori` harus salah satu dari: `umkm`, `pendidikan`, `ibadah`, `olahraga`,
`layanan` (daftar resminya ada di `kategoriLokasi` pada `lib/site.js`).

Khusus UMKM, tambahkan blok `detail` agar tombol WhatsApp muncul:

```json
"detail": {
  "produk": "Keterangan produk yang dijual",
  "whatsapp": "6281234567890"
}
```

Nomor WhatsApp ditulis format internasional **tanpa tanda `+` dan tanpa `0` di
depan** — contoh: `08123456789` menjadi `628123456789`.

**Cara mendapatkan titik koordinat:** buka [openstreetmap.org](https://www.openstreetmap.org),
cari lokasinya, klik kanan pada titik yang dituju → *Show address*. Angka
pertama adalah `latitude`, angka kedua `longitude`.

### Menambah atau mengganti foto

1. Simpan file foto di folder `public/images/...` sesuai jenisnya
   (`lokasi/`, `berita/`, `galeri/`, `infografis/`).
2. Tulis alamatnya di file data, contoh: `/images/lokasi/nama-foto.jpg`.
3. Gunakan format **JPG** atau **WebP** yang sudah dikompres. Foto langsung dari
   kamera HP biasanya 3–8 MB dan akan membuat website berat dibuka.

Selama foto belum ada, website menampilkan kotak hijau bertuliskan nama lokasi —
bukan ikon gambar rusak.

**Versi kecil (thumbnail).** Agar halaman Potensi dan UMKM tetap ringan meski
memuat puluhan foto, kartu tidak memuat foto ukuran penuh melainkan file
pendamping berakhiran `-thumb.jpg` — misalnya `nama-foto.jpg` berpasangan dengan
`nama-foto-thumb.jpg`. Cukup dibuat sekali per foto.

*Cara mudah (tanpa perintah):* buka [squoosh.app](https://squoosh.app) di
browser, seret fotonya ke sana, atur **Resize → Width: 640**, pilih format
**MozJPEG** kualitas sekitar 72, lalu unduh hasilnya. Ganti namanya menjadi
`namafile-thumb.jpg` dan simpan di folder yang sama dengan foto aslinya. Situs
ini bekerja di dalam browser — foto tidak diunggah ke mana pun.

*Cara cepat bagi operator teknis* (memakai `sharp`, sudah tersedia karena
dibawa Next.js — jalankan dari folder proyek):

```bash
node -e "require('sharp')('public/images/lokasi/nama-foto.jpg').resize({width:640}).jpeg({quality:72,mozjpeg:true}).toFile('public/images/lokasi/nama-foto-thumb.jpg')"
```

Bila file `-thumb` lupa dibuat, **website tetap tampil normal** — hanya memuat
foto ukuran penuh sehingga sedikit lebih berat. Jadi ini bukan langkah wajib,
melainkan penjaga keringanan.

---

## 🚀 Menerbitkan Perubahan

Setelah file diedit, perubahan **belum langsung tampil di internet**. Ada dua
langkah: membangun ulang, lalu mengunggah.

### Persiapan (sekali saja di komputer baru)

1. Pasang **Node.js versi 18 atau lebih baru** — unduh di [nodejs.org](https://nodejs.org).
2. Buka folder proyek di terminal, jalankan:

```bash
npm install
```

### Melihat hasil edit sebelum diterbitkan

```bash
npm run dev
```

Buka <http://localhost:3000> di browser. Setiap perubahan file langsung terlihat.
Ini hanya tampil di komputer sendiri, belum di internet. Tekan `Ctrl + C` untuk
menghentikan.

### Membangun versi siap unggah

```bash
npm run build
```

Perintah ini menghasilkan folder **`out/`** berisi seluruh website dalam bentuk
file siap unggah. **Isi folder `out/` inilah yang diunggah ke hosting.**

> Proses build memerlukan **koneksi internet** karena jenis huruf Fraunces &
> Inter diunduh sekali saat build. Hasil build-nya sendiri sepenuhnya mandiri —
> pengunjung website tidak menghubungi server luar mana pun.

### Mengunggah ke hosting (gratis)

**Pilihan A — Netlify (paling mudah, tanpa perintah)**
1. Buat akun gratis di [netlify.com](https://netlify.com).
2. Buka menu *Deploys*, lalu **seret folder `out/`** ke halaman itu. Selesai.
3. Untuk pembaruan berikutnya, cukup seret folder `out/` yang baru.

**Pilihan B — Vercel**
1. Buat akun di [vercel.com](https://vercel.com), impor repositori GitHub di atas.
2. Vercel otomatis mengenali Next.js. Klik **Deploy**.
3. Setiap perubahan yang dikirim ke GitHub akan otomatis diterbitkan.

**Pilihan C — GitHub Pages**
1. Kirim perubahan ke GitHub, jalankan `npm run build`.
2. Unggah isi folder `out/` ke branch `gh-pages`.
3. File `public/.nojekyll` sudah disiapkan agar folder `_next` tidak diblokir.

> **Catatan GitHub Pages:** bila alamat situs berada di sub-folder
> (mis. `namauser.github.io/nama-repo/`), tambahkan `basePath` dan `assetPrefix`
> di `next.config.mjs`:
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

## 🔧 Referensi Teknis

Bagian ini untuk operator atau pendamping yang menangani sisi teknis.

### Teknologi

- **Next.js 16** (App Router) + **React 19** — dibangun sebagai situs statis (`output: export`)
- **Tailwind CSS v4** — styling; token warna & huruf ada di `app/globals.css` blok `@theme`
- **next/font** — Fraunces & Inter diunduh saat build lalu disajikan dari domain sendiri
- **Leaflet + react-leaflet** — peta interaktif dengan peta dasar gratis OpenStreetMap (tanpa API key, tanpa biaya)
- **Chart.js + react-chartjs-2** — grafik statistik
- **@tabler/icons-react** — ikon

Karena hasil akhirnya file statis murni, website ini **tidak memerlukan server
khusus, tidak memerlukan basis data, dan biaya hosting-nya nol** di Netlify,
Vercel, maupun GitHub Pages.

### Struktur folder

```
app/                    Halaman situs (tiap folder = 1 alamat URL)
  page.js               Beranda
  profil/               Profil Desa
  peta/                 Peta Interaktif
  potensi/              Potensi Desa
  statistik/            Data & Statistik + Transparansi APBDes
  umkm/                 Direktori UMKM
  galeri/               Galeri foto
  berita/               Berita (+ [slug] untuk halaman detail tiap artikel)
  kontak/               Kontak & Pengaduan
  layout.js             Kerangka umum: navbar, footer, huruf, metadata
  globals.css           Warna, huruf, dan gaya global
  sitemap.js, robots.js Otomatis menjadi sitemap.xml & robots.txt
components/             Komponen yang dipakai berulang (navbar, kartu, peta, grafik)
data/                   Isi konten: lokasi.json, statistik.json, berita.json
lib/                    site.js (pengaturan pusat) & data.js (fungsi bantu)
public/images/          Foto: hero, lokasi, galeri, berita, infografis
                        Tiap foto berpasangan dengan versi "-thumb.jpg" untuk kartu
public/videos/          Video latar beranda
public/manifest.webmanifest, icon-*.png, apple-touch-icon.png
                        Agar situs bisa dipasang sebagai ikon di layar utama HP
SUMBER-FOTO.md          Catatan asal-usul & lisensi tiap foto (tidak ikut diterbitkan)
```

### Catatan performa

Website sudah dioptimasi agar ringan dibuka lewat jaringan seluler:

- Video latar beranda baru dimuat setelah halaman siap, sehingga tidak
  memperlambat tampilan pertama.
- Kartu dan grid memakai foto versi kecil (`-thumb.jpg`), bukan ukuran penuh.
- Jenis huruf disajikan dari domain sendiri — tanpa permintaan ke Google.
- Halaman terberat (Potensi) kini sekitar 2 MB, turun dari 7,7 MB.

Bila menambah foto, **jaga kebiasaan membuat versi `-thumb.jpg`** agar
keringanan ini tetap terjaga.

### Aksesibilitas & SEO

- HTML semantik, teks alternatif (`alt`) pada gambar, navigasi dapat diakses
  lewat papan ketik, dan penanda fokus yang terlihat jelas.
- Peta interaktif dilengkapi daftar lokasi berbentuk teks agar terbaca mesin pencari.
- Tiap halaman punya judul & deskripsi unik, gambar pratinjau untuk berbagi ke
  media sosial, serta data terstruktur (JSON-LD) — termasuk profil pemerintah
  desa, tiap UMKM sebagai usaha lokal berkoordinat, dan tiap berita sebagai artikel.
- Menghormati pengaturan *kurangi animasi* pada perangkat pengunjung.

---

## 🆘 Bila Ada Masalah

| Gejala | Kemungkinan penyebab |
|---|---|
| `npm run build` gagal setelah mengedit data | Ada koma, kutip, atau kurung yang kurang/berlebih di file `.json` |
| Build gagal dengan pesan soal font | Komputer sedang tidak terhubung internet |
| Foto tidak muncul, hanya kotak hijau | Nama file di data tidak sama persis dengan nama file aslinya (perhatikan huruf besar/kecil) |
| Perubahan tidak tampil di internet | Folder `out/` yang baru belum diunggah ulang ke hosting |
| Peta tidak muncul | Perangkat pengunjung sedang tidak terhubung internet (peta dasar diambil dari OpenStreetMap) |

---

Dibuat oleh **Tim KKN** sebagai bentuk pengabdian kepada Desa Gunung Anyar.
Seluruh kode dan dokumentasi diserahkan sepenuhnya kepada Pemerintah Desa
Gunung Anyar untuk dikelola lebih lanjut.
