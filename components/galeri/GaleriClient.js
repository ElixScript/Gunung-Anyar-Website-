"use client";

import { useState, useMemo } from "react";
import { IconZoomScan } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import Lightbox from "@/components/Lightbox";

/*
  Galeri foto dengan filter kategori + lightbox.
  Foto dimuat lazy (bawaan SmartImage). Klik foto membuka tampilan penuh
  dengan navigasi next/prev dan caption.
*/
export default function GaleriClient({ items, kategoriList }) {
  const [tab, setTab] = useState("Semua");
  const [index, setIndex] = useState(null);

  const tabs = ["Semua", ...kategoriList];

  const tampil = useMemo(
    () => (tab === "Semua" ? items : items.filter((it) => it.kategori === tab)),
    [items, tab]
  );

  return (
    <div>
      {/* Tab filter */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter galeri">
        {tabs.map((t) => {
          const aktif = tab === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={aktif}
              onClick={() => setTab(t)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                aktif
                  ? "border-transparent bg-hutan-700 text-white shadow-sm"
                  : "border-krem-200 bg-white text-tinta-600 hover:border-hutan-300"
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Grid foto */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {tampil.map((it, i) => (
          <button
            key={`${it.src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative overflow-hidden rounded-2xl"
            aria-label={`Perbesar: ${it.caption}`}
          >
            <SmartImage src={it.src} alt={it.caption} ratio="1/1" label={it.caption} />
            <span className="absolute inset-0 flex items-center justify-center bg-hutan-900/0 opacity-0 transition-all group-hover:bg-hutan-900/40 group-hover:opacity-100">
              <IconZoomScan size={26} className="text-white" />
            </span>
            <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-hutan-900/80 to-transparent p-2 text-left text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              {it.caption}
            </span>
          </button>
        ))}
      </div>

      {tampil.length === 0 && (
        <p className="mt-8 text-center text-tinta-600">Belum ada foto pada kategori ini.</p>
      )}

      {/* Lightbox memakai daftar yang sedang tampil agar navigasi konsisten */}
      <Lightbox
        items={tampil}
        index={index}
        onClose={() => setIndex(null)}
        onNav={setIndex}
      />
    </div>
  );
}
