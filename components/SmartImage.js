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
  - ratio    : "16/9" (default), "4/3", "1/1", "3/4"
  - label    : teks yang ditampilkan pada placeholder (default = alt)
  - fit      : "cover" (default, memangkas) atau "contain" (foto utuh)
*/
export default function SmartImage({
  src,
  alt = "",
  ratio = "16/9",
  label,
  fit = "cover",
  className = "",
  imgClassName = "",
}) {
  const [gagal, setGagal] = useState(!src);

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
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setGagal(true)}
          className={`h-full w-full ${fit === "contain" ? "object-contain" : "object-cover"} ${imgClassName}`}
        />
      )}
    </div>
  );
}
