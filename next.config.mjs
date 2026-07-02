/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ekspor situs sebagai HTML statis murni (folder `out/`).
  // Ini membuat website bisa di-deploy ke GitHub Pages, Netlify, Vercel,
  // maupun hosting sederhana milik desa/kampus tanpa server Node.js.
  output: "export",

  // Optimasi gambar bawaan Next membutuhkan server; untuk situs statis
  // kita matikan agar tag <Image>/<img> tetap berfungsi apa adanya.
  images: { unoptimized: true },

  // Setiap halaman diekspor sebagai folder + index.html (mis. /profil/index.html)
  // sehingga URL bersih dan cocok untuk hosting statis.
  trailingSlash: true,
};

export default nextConfig;
