/*
  Menyisipkan structured data (JSON-LD schema.org) ke halaman.

  Gunanya: mesin pencari bisa memahami bahwa ini situs resmi sebuah desa —
  lengkap dengan alamat, koordinat, jam layanan, dan daftar UMKM — lalu
  menampilkannya langsung di hasil pencarian (alamat, peta, jam buka).

  Komponen server, tidak menambah JavaScript apa pun ke sisi pengunjung.
*/
export default function StructuredData({ data }) {
  // "<" di-escape agar isi data tidak bisa menutup tag <script> lebih awal
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
