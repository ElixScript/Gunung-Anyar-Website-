"use client";

import { useEffect } from "react";
import { IconX, IconMapPin, IconBrandWhatsapp } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import { getKategori } from "@/lib/site";

/*
  Modal detail lokasi peta.
  Menggantikan popup kecil Leaflet: saat marker (atau item daftar) dipilih,
  detail lokasi tampil sebagai dialog di tengah layar — pola sama seperti
  peta pada project kkn-taretan-2026, namun mengikuti palet & komponen desa ini.

  Terkontrol lewat prop `lokasi`: null = tertutup, objek lokasi = terbuka.
  Menampilkan SELURUH informasi lokasi (foto, kategori, deskripsi,
  info tambahan, alamat) plus rincian pada objek `detail`.
*/

// Label ramah untuk kunci pada objek `detail` tiap lokasi.
const LABEL_DETAIL = {
  jam_operasional: "Jam operasional",
  rute: "Rute",
  komoditas: "Komoditas",
  luas_lahan: "Luas lahan",
  estimasi_hasil: "Estimasi hasil",
  pemilik: "Pemilik",
  produk: "Produk",
  harga: "Harga",
  whatsapp: "WhatsApp",
  waktu_tampil: "Waktu tampil",
  kontak_ketua: "Kontak",
};

// Ubah "luas_lahan" -> "Luas lahan" bila kunci tak ada di LABEL_DETAIL.
function rapikanLabel(kunci) {
  const teks = kunci.replace(/_/g, " ");
  return teks.charAt(0).toUpperCase() + teks.slice(1);
}

export default function DetailLokasi({ lokasi, onClose }) {
  const terbuka = Boolean(lokasi);

  // Esc untuk menutup + kunci scroll latar selama modal terbuka.
  useEffect(() => {
    if (!terbuka) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [terbuka, onClose]);

  if (!terbuka) return null;

  const meta = getKategori(lokasi.kategori);
  // Rincian tambahan (lewati nilai berupa array, mis. galeri).
  const rincian = Object.entries(lokasi.detail || {}).filter(
    ([, nilai]) => nilai && !Array.isArray(nilai)
  );

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-end justify-center bg-hutan-900/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Detail lokasi ${lokasi.nama}`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-card bg-white shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol tutup */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-hutan-800 shadow-sm transition-colors hover:bg-white"
        >
          <IconX size={20} />
        </button>

        <div className="grid gap-0 md:grid-cols-2">
          {/* Foto — wadah berukuran pasti; gambar mengisi penuh (cover) tanpa
              melebihi lebar kolomnya. Banner di ponsel, penuh-tinggi di desktop. */}
          <div className="relative aspect-[16/10] w-full md:aspect-auto md:h-full md:min-h-[320px]">
            <div className="absolute inset-0">
              <SmartImage
                src={lokasi.foto}
                alt={`Foto ${lokasi.nama}`}
                ratio="4/3"
                label={lokasi.nama}
                className="h-full w-full"
              />
            </div>
          </div>

          {/* Informasi */}
          <div className="p-6 sm:p-7">
            {meta && (
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                style={{ backgroundColor: meta.warna }}
              >
                {meta.label}
              </span>
            )}
            <h2 className="mt-2 font-display text-2xl font-semibold text-hutan-900">
              {lokasi.nama}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-tinta-600">
              {lokasi.deskripsi}
            </p>

            {lokasi.info_tambahan && (
              <p className="mt-4 rounded-2xl border border-krem-200 bg-krem px-4 py-3 text-sm font-medium text-hutan-700">
                {lokasi.info_tambahan}
              </p>
            )}

            {lokasi.alamat && (
              <p className="mt-4 inline-flex items-start gap-2 text-sm text-tinta-600">
                <IconMapPin size={17} className="mt-0.5 shrink-0 text-hutan-600" />
                {lokasi.alamat}
              </p>
            )}

            {/* Rincian tambahan dari objek `detail` */}
            {rincian.length > 0 && (
              <dl className="mt-5 space-y-2.5 border-t border-krem-200 pt-4">
                {rincian.map(([kunci, nilai]) => {
                  const label = LABEL_DETAIL[kunci] || rapikanLabel(kunci);
                  if (kunci === "whatsapp") {
                    return (
                      <div key={kunci} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                        <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-hutan-600">
                          {label}
                        </dt>
                        <dd className="text-sm text-tinta-600">
                          <a
                            href={`https://wa.me/${nilai}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-medium text-hutan-700 hover:underline"
                          >
                            <IconBrandWhatsapp size={16} />
                            Hubungi via WhatsApp
                          </a>
                        </dd>
                      </div>
                    );
                  }
                  return (
                    <div key={kunci} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
                      <dt className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-hutan-600">
                        {label}
                      </dt>
                      <dd className="text-sm text-tinta-600">{nilai}</dd>
                    </div>
                  );
                })}
              </dl>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
