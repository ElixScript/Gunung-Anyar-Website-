"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { IconSearch, IconX, IconMapPin, IconListSearch } from "@tabler/icons-react";
import { kategoriLokasi, getKategori } from "@/lib/site";
import { getLokasi } from "@/lib/data";

/*
  Pengendali halaman Peta.
  - Peta Leaflet dimuat dinamis (tanpa SSR) karena butuh objek browser.
  - Menyediakan: filter kategori, kotak pencarian, legenda, dan daftar lokasi
    (list view) yang tersinkron dengan peta.
  - Membaca parameter URL ?loc=<id> untuk langsung membuka lokasi tertentu
    (dipakai oleh tautan "Lihat di Peta" dari halaman UMKM/Potensi).
*/

// Peta di-load hanya di klien; tampilkan placeholder saat memuat.
const MapView = dynamic(() => import("@/components/peta/MapView"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-hutan-100 text-sm text-tinta-600">
      Memuat peta…
    </div>
  ),
});

export default function PetaClient({ center }) {
  const semuaLokasi = getLokasi();
  const searchParams = useSearchParams();
  const locAwal = searchParams.get("loc");

  // Kategori aktif (semua aktif secara default)
  const [kategoriAktif, setKategoriAktif] = useState(
    () => new Set(kategoriLokasi.map((k) => k.key))
  );
  const [cari, setCari] = useState("");
  const [selectedId, setSelectedId] = useState(locAwal || null);

  // Jika halaman dibuka dengan ?loc=..., pastikan kategorinya aktif & pilih lokasi
  useEffect(() => {
    if (!locAwal) return;
    const lok = semuaLokasi.find((l) => l.id === locAwal);
    if (lok) {
      setKategoriAktif((prev) => new Set(prev).add(lok.kategori));
      setSelectedId(locAwal);
    }
  }, [locAwal, semuaLokasi]);

  const toggleKategori = (key) => {
    setKategoriAktif((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const resetFilter = () => {
    setKategoriAktif(new Set(kategoriLokasi.map((k) => k.key)));
    setCari("");
  };

  // Lokasi yang tampil = lolos filter kategori + cocok pencarian nama
  const lokasiTampil = useMemo(() => {
    const kunci = cari.trim().toLowerCase();
    return semuaLokasi.filter((l) => {
      if (!kategoriAktif.has(l.kategori)) return false;
      if (kunci && !l.nama.toLowerCase().includes(kunci)) return false;
      return true;
    });
  }, [semuaLokasi, kategoriAktif, cari]);

  // Saat memilih lokasi dari daftar/pencarian
  const pilihLokasi = (id) => {
    const lok = semuaLokasi.find((l) => l.id === id);
    if (lok) setKategoriAktif((prev) => new Set(prev).add(lok.kategori));
    // Set ulang agar useEffect di peta memicu flyTo walau id sama
    setSelectedId(null);
    requestAnimationFrame(() => setSelectedId(id));
  };

  return (
    <div className="space-y-6">
      {/* ---------- Baris kontrol: filter kategori + pencarian ---------- */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter kategori lokasi">
          {kategoriLokasi.map((k) => {
            const aktif = kategoriAktif.has(k.key);
            return (
              <button
                key={k.key}
                type="button"
                onClick={() => toggleKategori(k.key)}
                aria-pressed={aktif}
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all ${
                  aktif
                    ? "border-transparent text-white shadow-sm"
                    : "border-krem-200 bg-white text-tinta-600 hover:border-hutan-300"
                }`}
                style={aktif ? { backgroundColor: k.warna } : undefined}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: aktif ? "#fff" : k.warna }}
                />
                {k.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={resetFilter}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium text-hutan-700 underline-offset-2 hover:underline"
          >
            <IconX size={15} />
            Reset
          </button>
        </div>

        {/* Kotak pencarian */}
        <div className="relative w-full lg:w-72">
          <IconSearch
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tinta-600"
          />
          <input
            type="search"
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari nama lokasi…"
            aria-label="Cari lokasi berdasarkan nama"
            className="w-full rounded-full border border-krem-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-hutan-500"
          />
        </div>
      </div>

      {/* ---------- Peta ---------- */}
      <div className="h-[350px] overflow-hidden rounded-card border border-krem-200 shadow-sm md:h-[500px]">
        <MapView
          lokasiTampil={lokasiTampil}
          selectedId={selectedId}
          onSelect={setSelectedId}
          center={center}
          zoom={14}
        />
      </div>

      {/* ---------- Legenda ---------- */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-krem-200 bg-white px-5 py-3 text-sm">
        <span className="font-semibold text-hutan-900">Legenda:</span>
        {kategoriLokasi.map((k) => (
          <span key={k.key} className="inline-flex items-center gap-2 text-tinta-600">
            <span className="h-3.5 w-3.5 rounded-full border border-white shadow" style={{ backgroundColor: k.warna }} />
            {k.label}
          </span>
        ))}
      </div>

      {/* ---------- Daftar lokasi (list view) ----------
          Penting untuk aksesibilitas & SEO: mesin pencari tidak dapat membaca
          isi di dalam peta interaktif, sehingga daftar ini menyediakan
          teks yang dapat diindeks sekaligus navigasi alternatif tanpa peta. */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-semibold text-hutan-900">
          <IconListSearch size={20} className="text-hutan-600" />
          Daftar Lokasi ({lokasiTampil.length})
        </h2>
        <p className="mt-1 text-sm text-tinta-600">
          Klik salah satu lokasi untuk menyorotnya di peta.
        </p>

        {lokasiTampil.length === 0 ? (
          <p className="mt-6 rounded-xl bg-krem-200 px-4 py-6 text-center text-sm text-tinta-600">
            Tidak ada lokasi yang cocok. Coba ubah filter atau kata kunci pencarian.
          </p>
        ) : (
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {lokasiTampil.map((lok) => {
              const meta = getKategori(lok.kategori);
              const dipilih = lok.id === selectedId;
              return (
                <li key={lok.id}>
                  <button
                    type="button"
                    onClick={() => pilihLokasi(lok.id)}
                    className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${
                      dipilih ? "border-emas-500 bg-emas-100/50" : "border-krem-200 bg-white"
                    }`}
                  >
                    <span
                      className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white"
                      style={{ backgroundColor: meta ? meta.warna : "#4a7c2e" }}
                    >
                      <IconMapPin size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-semibold text-hutan-900">{lok.nama}</span>
                      <span className="mt-0.5 block text-xs font-medium" style={{ color: meta?.warna }}>
                        {meta?.label}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm text-tinta-600">
                        {lok.deskripsi}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
