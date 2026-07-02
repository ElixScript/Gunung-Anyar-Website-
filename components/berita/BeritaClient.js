"use client";

import { useState, useMemo } from "react";
import { IconSearch } from "@tabler/icons-react";
import { BeritaCard } from "@/components/cards";

/*
  Daftar berita dengan pencarian judul, filter kategori, dan tombol
  "muat lebih banyak" (pagination sederhana).
*/
const PER_HALAMAN = 6;

export default function BeritaClient({ berita }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [batas, setBatas] = useState(PER_HALAMAN);

  // Daftar kategori unik dari data
  const kategoriList = useMemo(
    () => ["Semua", ...Array.from(new Set(berita.map((b) => b.kategori)))],
    [berita]
  );

  const terfilter = useMemo(() => {
    const q = cari.trim().toLowerCase();
    return berita.filter((b) => {
      if (kategori !== "Semua" && b.kategori !== kategori) return false;
      if (q && !b.judul.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [berita, cari, kategori]);

  const tampil = terfilter.slice(0, batas);

  return (
    <div>
      {/* Kontrol: filter kategori + pencarian */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {kategoriList.map((k) => {
            const aktif = kategori === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => {
                  setKategori(k);
                  setBatas(PER_HALAMAN);
                }}
                aria-pressed={aktif}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                  aktif
                    ? "border-transparent bg-hutan-700 text-white shadow-sm"
                    : "border-krem-200 bg-white text-tinta-600 hover:border-hutan-300"
                }`}
              >
                {k}
              </button>
            );
          })}
        </div>
        <div className="relative w-full lg:w-64">
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tinta-600"
          />
          <input
            type="search"
            value={cari}
            onChange={(e) => {
              setCari(e.target.value);
              setBatas(PER_HALAMAN);
            }}
            placeholder="Cari judul berita…"
            aria-label="Cari berita"
            className="w-full rounded-full border border-krem-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-hutan-500"
          />
        </div>
      </div>

      {/* Grid berita */}
      {tampil.length === 0 ? (
        <p className="mt-10 text-center text-tinta-600">
          Tidak ada berita yang cocok dengan pencarian.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tampil.map((b) => (
            <BeritaCard key={b.slug} berita={b} />
          ))}
        </div>
      )}

      {/* Tombol muat lebih banyak */}
      {batas < terfilter.length && (
        <div className="mt-10 text-center">
          <button
            type="button"
            onClick={() => setBatas((n) => n + PER_HALAMAN)}
            className="inline-flex items-center rounded-full border border-hutan-300 px-6 py-3 text-sm font-semibold text-hutan-700 transition-colors hover:bg-hutan-100"
          >
            Muat lebih banyak
          </button>
        </div>
      )}
    </div>
  );
}
