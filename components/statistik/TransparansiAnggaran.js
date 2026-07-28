"use client";

import { useState, useEffect, useCallback } from "react";
import {
  IconArrowsMaximize,
  IconDownload,
  IconX,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";

/*
  Galeri dokumen transparansi anggaran desa (APBDes).
  Berbeda dari Lightbox umum yang memangkas gambar ke 16/9, penampil di sini
  menampilkan dokumen SECARA UTUH (object-contain, bisa digulir) karena
  infografis/laporan berformat potret dan padat teks — semua angka harus
  tetap terbaca. Tiap kartu bisa diklik untuk memperbesar & mengunduh.
*/
export default function TransparansiAnggaran({ dokumen }) {
  const [index, setIndex] = useState(null);
  const terbuka = index !== null;
  const aktif = terbuka ? dokumen[index] : null;

  const keNext = useCallback(
    () => setIndex((i) => (i + 1) % dokumen.length),
    [dokumen.length]
  );
  const kePrev = useCallback(
    () => setIndex((i) => (i - 1 + dokumen.length) % dokumen.length),
    [dokumen.length]
  );

  useEffect(() => {
    if (!terbuka) return;
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight" && dokumen.length > 1) keNext();
      if (e.key === "ArrowLeft" && dokumen.length > 1) kePrev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [terbuka, keNext, kePrev, dokumen.length]);

  return (
    <>
      {/* Kartu dokumen */}
      <div className="grid gap-6 sm:grid-cols-2">
        {dokumen.map((d, i) => (
          <figure
            key={d.src}
            className="group flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-hutan-300/60 hover:shadow-float"
          >
            <button
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Perbesar ${d.judul}`}
              className="relative block w-full overflow-hidden bg-krem-200/60"
            >
              {/* Pratinjau utuh dokumen; tinggi dibatasi agar kartu ringkas.
                  Versi kecil sudah cukup di sini — dokumen penuh baru diunduh
                  saat kartu diklik. */}
              <img
                src={d.thumb || d.src}
                alt={d.judul}
                loading="lazy"
                className="mx-auto max-h-[440px] w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              {/* Gradasi + ajakan perbesar saat hover */}
              <span className="pointer-events-none absolute inset-0 flex items-end justify-center bg-gradient-to-t from-hutan-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-hutan-800 shadow-lift">
                  <IconArrowsMaximize size={16} />
                  Klik untuk memperbesar
                </span>
              </span>
            </button>

            <figcaption className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <span className="text-xs font-semibold uppercase tracking-wide text-emas-600">
                  Tahun Anggaran {d.tahun}
                </span>
                <h3 className="mt-0.5 truncate font-semibold text-hutan-900">{d.judul}</h3>
              </div>
              <a
                href={d.src}
                download
                onClick={(e) => e.stopPropagation()}
                aria-label={`Unduh ${d.judul}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-hutan-300 px-3.5 py-2 text-sm font-semibold text-hutan-700 transition-colors hover:bg-hutan-100"
              >
                <IconDownload size={16} />
                Unduh
              </a>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Penampil dokumen penuh (bisa digulir) */}
      {terbuka && (
        <div
          className="animasi-overlay fixed inset-0 z-[1000] bg-hutan-900/90 backdrop-blur-lg"
          role="dialog"
          aria-modal="true"
          aria-label={aktif.judul}
          onClick={() => setIndex(null)}
        >
          {/* Bilah atas: judul + unduh + tutup */}
          <div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 bg-gradient-to-b from-hutan-900/90 to-transparent p-4 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{aktif.judul}</p>
              <p className="text-xs text-white/60">
                {index + 1} / {dokumen.length} · TA {aktif.tahun}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={aktif.src}
                download
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-full bg-emas-500 px-4 py-2 text-sm font-semibold text-hutan-900 transition-colors hover:bg-emas-600"
              >
                <IconDownload size={16} />
                <span className="hidden sm:inline">Unduh</span>
              </a>
              <button
                type="button"
                onClick={() => setIndex(null)}
                aria-label="Tutup"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition-all duration-300 hover:rotate-90 hover:bg-white/20"
              >
                <IconX size={22} />
              </button>
            </div>
          </div>

          {/* Area gambar: penuh & dapat digulir vertikal */}
          <div
            className="h-full w-full overflow-y-auto overscroll-contain px-4 py-20 sm:px-6"
            onClick={() => setIndex(null)}
          >
            <img
              src={aktif.src}
              alt={aktif.judul}
              className="animasi-modal mx-auto w-auto max-w-full rounded-lg shadow-float sm:max-w-[820px]"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Navigasi antar dokumen */}
          {dokumen.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); kePrev(); }}
                aria-label="Dokumen sebelumnya"
                className="absolute left-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
              >
                <IconChevronLeft size={28} />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); keNext(); }}
                aria-label="Dokumen berikutnya"
                className="absolute right-3 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
              >
                <IconChevronRight size={28} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
