"use client";

import { useState } from "react";
import { IconPhoto } from "@tabler/icons-react";

/*
  Gambar dengan penanganan placeholder.
  Selama foto asli belum ditambahkan ke folder /public/images, komponen ini
  menampilkan placeholder bergaya (gradasi hijau + ikon + nama) alih-alih
  ikon "gambar rusak". Setelah file foto asli diletakkan sesuai path di data,
  gambar akan otomatis tampil.

  Prop:
  - src, alt : seperti <img> biasa
  - thumb    : versi kecil untuk kartu/grid. Bila filenya belum dibuat,
               komponen otomatis jatuh kembali ke `src` (bukan placeholder).
  - ratio    : "16/9" (default), "4/3", "1/1", "3/4"
  - label    : teks yang ditampilkan pada placeholder (default = alt)
  - fit      : "cover" (default, memangkas) atau "contain" (foto utuh)
  - prioritas: true untuk gambar yang sudah terlihat tanpa menggulir (LCP) —
               dimuat lebih awal, bukan lazy.
*/
export default function SmartImage({
  src,
  thumb,
  alt = "",
  ratio = "16/9",
  label,
  fit = "cover",
  prioritas = false,
  className = "",
  imgClassName = "",
}) {
  // Menyimpan URL yang gagal (bukan sekadar boolean) supaya status ikut
  // ter-reset sendiri saat komponen dipakai ulang untuk foto lain —
  // mis. saat berpindah gambar di dalam lightbox.
  const [thumbGagal, setThumbGagal] = useState(null);
  const [srcGagal, setSrcGagal] = useState(null);

  const pakaiThumb = Boolean(thumb) && thumbGagal !== thumb;
  const sumber = pakaiThumb ? thumb : src;
  const gagal = !src || srcGagal === src;

  const saatGagal = () => {
    // Thumb tidak ada → coba foto penuh dulu sebelum menyerah ke placeholder
    if (pakaiThumb) setThumbGagal(thumb);
    else setSrcGagal(src);
  };

  return (
    <div
      className={`relative overflow-hidden bg-hutan-100 ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {gagal ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-hutan-500 to-hutan-700 p-4 text-center text-white/90">
          <IconPhoto size={28} stroke={1.5} className="opacity-80" />
          <span className="text-xs font-medium leading-snug">
            {label || alt || "Foto akan ditambahkan"}
          </span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sumber}
          alt={alt}
          loading={prioritas ? "eager" : "lazy"}
          fetchPriority={prioritas ? "high" : undefined}
          decoding="async"
          onError={saatGagal}
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
        />
      )}
    </div>
  );
}
