"use client";

import { useState } from "react";
import { IconArrowsMaximize } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import Lightbox from "@/components/Lightbox";

/*
  Grid infografis statis hasil desain tim riset.
  Thumbnail bisa diklik untuk membuka versi penuh (lightbox) + tombol unduh.
  Grid: 3 kolom desktop, 2 tablet, 1 mobile.
*/
export default function InfografisGallery({ items }) {
  const [index, setIndex] = useState(null);

  // Data untuk lightbox (butuh field `src` dan `caption`)
  const lightboxItems = items.map((it) => ({ src: it.src, caption: it.judul }));

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="relative">
              <SmartImage src={it.src} alt={it.judul} ratio="4/3" label={it.judul} />
              <span className="absolute inset-0 flex items-center justify-center bg-hutan-900/0 opacity-0 transition-all group-hover:bg-hutan-900/30 group-hover:opacity-100">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/90 text-hutan-800">
                  <IconArrowsMaximize size={20} />
                </span>
              </span>
            </div>
            <div className="p-4">
              <span className="text-xs font-semibold uppercase tracking-wide text-emas-600">
                {it.kategori}
              </span>
              <h3 className="mt-1 font-semibold text-hutan-900">{it.judul}</h3>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        items={lightboxItems}
        index={index}
        onClose={() => setIndex(null)}
        onNav={setIndex}
        unduh
      />
    </>
  );
}
