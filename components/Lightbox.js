"use client";

import { useEffect, useCallback } from "react";
import { IconX, IconChevronLeft, IconChevronRight, IconDownload } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";

/*
  Lightbox generik (dipakai halaman Galeri & Infografis).
  Terkontrol lewat prop `index`: null = tertutup, angka = indeks item aktif.

  Prop:
  - items        : array { src, caption, kategori? }
  - index        : number | null
  - onClose      : fungsi menutup
  - onNav(i)     : pindah ke indeks i
  - unduh        : tampilkan tombol unduh (default false)
*/
export default function Lightbox({ items, index, onClose, onNav, unduh = false }) {
  const terbuka = index !== null && index >= 0 && index < items.length;
  const item = terbuka ? items[index] : null;

  const keNext = useCallback(() => onNav((index + 1) % items.length), [index, items.length, onNav]);
  const kePrev = useCallback(() => onNav((index - 1 + items.length) % items.length), [index, items.length, onNav]);

  // Navigasi keyboard: Esc menutup, panah kiri/kanan berpindah
  useEffect(() => {
    if (!terbuka) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") keNext();
      if (e.key === "ArrowLeft") kePrev();
    };
    window.addEventListener("keydown", onKey);
    // Kunci scroll latar saat lightbox terbuka
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [terbuka, onClose, keNext, kePrev]);

  if (!terbuka) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-hutan-900/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={item.caption || "Tampilan gambar"}
      onClick={onClose}
    >
      {/* Tombol tutup */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <IconX size={24} />
      </button>

      {/* Tombol sebelumnya */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); kePrev(); }}
          aria-label="Gambar sebelumnya"
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <IconChevronLeft size={28} />
        </button>
      )}

      {/* Konten gambar */}
      <figure
        className="max-h-[85vh] w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-card bg-black/20">
          <SmartImage
            src={item.src}
            alt={item.caption || ""}
            ratio="16/9"
            label={item.caption}
          />
        </div>
        <figcaption className="mt-3 flex items-center justify-between gap-4 text-white">
          <span className="text-sm">
            {item.caption}
            <span className="ml-2 text-white/60">
              {index + 1} / {items.length}
            </span>
          </span>
          {unduh && (
            <a
              href={item.src}
              download
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full bg-emas-500 px-4 py-2 text-sm font-semibold text-hutan-900 transition-colors hover:bg-emas-600"
            >
              <IconDownload size={16} />
              Unduh
            </a>
          )}
        </figcaption>
      </figure>

      {/* Tombol berikutnya */}
      {items.length > 1 && (
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); keNext(); }}
          aria-label="Gambar berikutnya"
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <IconChevronRight size={28} />
        </button>
      )}
    </div>
  );
}
