"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import {
  IconSearch,
  IconX,
  IconMapPin,
  IconListSearch,
  IconRipple,
  IconMountain,
  IconPlant2,
  IconCoffee,
  IconBuildingCommunity,
  IconStethoscope,
  IconMasksTheater,
  IconChefHat,
  IconFeather,
  IconCube,
  IconSeeding,
  IconGrain,
  IconEgg,
  IconFlame,
  IconWall,
  IconBallFootball,
  IconBallVolleyball,
  IconSchool,
  IconMoodKid,
  IconMoonStars,
  IconBuildingMosque,
  IconBook,
  IconBuildingStore,
} from "@tabler/icons-react";
import { kategoriLokasi, getKategori } from "@/lib/site";
import { getLokasi } from "@/lib/data";

// Ikon khas tiap lokasi pada kartu daftar — dipetakan dari field "ikon"
// di data/lokasi.json agar setiap tempat punya identitas visual sendiri
// (bukan pin yang sama semua). Fallback: IconMapPin.
const IKON_LOKASI = {
  ripple: IconRipple,
  mountain: IconMountain,
  "plant-2": IconPlant2,
  coffee: IconCoffee,
  "building-community": IconBuildingCommunity,
  stethoscope: IconStethoscope,
  "masks-theater": IconMasksTheater,
  "chef-hat": IconChefHat,
  feather: IconFeather,
  cube: IconCube,
  seeding: IconSeeding,
  grain: IconGrain,
  egg: IconEgg,
  flame: IconFlame,
  wall: IconWall,
  "ball-football": IconBallFootball,
  "ball-volleyball": IconBallVolleyball,
  school: IconSchool,
  "mood-kid": IconMoodKid,
  "moon-stars": IconMoonStars,
  "building-mosque": IconBuildingMosque,
  book: IconBook,
  "building-store": IconBuildingStore,
};

/*
  Pengendali halaman Peta.
  - Peta Leaflet dimuat dinamis (tanpa SSR) karena butuh objek browser.
  - Menyediakan: filter kategori, kotak pencarian, legenda, dan daftar lokasi
    (list view) yang tersinkron dengan peta.
  - Membaca parameter URL ?loc=<id> untuk langsung membuka lokasi tertentu
    (dipakai oleh tautan "Lihat di Peta" dari halaman UMKM/Potensi).
*/

import DetailLokasi from "@/components/peta/DetailLokasi";

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
  // Lokasi yang detailnya sedang dibuka pada modal (null = modal tertutup)
  const [detailLokasi, setDetailLokasi] = useState(null);
  // Kategori yang sedang dibuka pada daftar lokasi di bawah peta
  const [kategoriTab, setKategoriTab] = useState(kategoriLokasi[0].key);

  // Jika halaman dibuka dengan ?loc=..., pastikan kategorinya aktif, pilih
  // lokasi, buka tab kategorinya, dan langsung buka modal detailnya.
  useEffect(() => {
    if (!locAwal) return;
    const lok = semuaLokasi.find((l) => l.id === locAwal);
    if (lok) {
      setKategoriAktif((prev) => new Set(prev).add(lok.kategori));
      setKategoriTab(lok.kategori);
      setSelectedId(locAwal);
      setDetailLokasi(lok);
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

  // Saat memilih lokasi dari daftar/pencarian: sorot di peta + buka modal detail
  const pilihLokasi = (id) => {
    const lok = semuaLokasi.find((l) => l.id === id);
    if (lok) {
      setKategoriAktif((prev) => new Set(prev).add(lok.kategori));
      setDetailLokasi(lok);
    }
    // Set ulang agar useEffect di peta memicu flyTo walau id sama
    setSelectedId(null);
    requestAnimationFrame(() => setSelectedId(id));
  };

  return (
    <div className="space-y-6">
      {/* ---------- Peta + panel legenda/filter di kanan ----------
          Peta di kiri (tinggi 3/4 dari ukuran semula), panel legenda & filter
          kategori di kanan. Tombol kategori sekaligus berfungsi sebagai legenda
          berwarna, sehingga tak perlu bar legenda terpisah. */}
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Peta */}
        <div className="h-[264px] overflow-hidden rounded-card border border-krem-200 shadow-lift transition-shadow duration-500 hover:shadow-float md:h-[375px]">
          <MapView
            lokasiTampil={lokasiTampil}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onOpenDetail={setDetailLokasi}
            center={center}
            zoom={14}
          />
        </div>

        {/* Panel kanan: pencarian + legenda/filter kategori */}
        <aside className="flex flex-col gap-4">
          {/* Kotak pencarian */}
          <div className="relative">
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

          {/* Legenda & filter kategori — panel kaca mengambang */}
          <div className="panel-kaca rounded-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-hutan-900">Legenda &amp; Filter</h2>
              <button
                type="button"
                onClick={resetFilter}
                className="inline-flex items-center gap-1 text-xs font-medium text-hutan-700 underline-offset-2 hover:underline"
              >
                <IconX size={14} />
                Reset
              </button>
            </div>
            <p className="mt-1 text-xs text-tinta-600">
              Klik kategori untuk menyaring titik yang tampil di peta.
            </p>
            <ul className="mt-3 space-y-2" role="group" aria-label="Filter kategori lokasi">
              {kategoriLokasi.map((k) => {
                const aktif = kategoriAktif.has(k.key);
                return (
                  <li key={k.key}>
                    <button
                      type="button"
                      onClick={() => toggleKategori(k.key)}
                      aria-pressed={aktif}
                      className={`flex w-full items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-left text-sm font-medium transition-all duration-300 ease-out active:scale-[0.98] ${
                        aktif
                          ? "border-transparent text-white shadow-sm hover:shadow-lift"
                          : "border-krem-200 bg-white text-tinta-600 hover:-translate-y-0.5 hover:border-hutan-300 hover:shadow-sm"
                      }`}
                      style={aktif ? { backgroundColor: k.warna } : undefined}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: aktif ? "#fff" : k.warna }}
                        />
                        {k.label}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wide opacity-80">
                        {aktif ? "Aktif" : "Off"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
      </div>

      {/* ---------- Daftar lokasi (pilih kategori → kartu) ----------
          Penting untuk aksesibilitas & SEO: mesin pencari tidak dapat membaca
          isi di dalam peta interaktif, sehingga daftar ini menyediakan
          teks yang dapat diindeks sekaligus navigasi alternatif tanpa peta.
          Alur: pengunjung memilih satu kategori lewat tombol berwarna,
          barulah kartu lokasi kategori itu tampil — daftar tetap ringkas
          walau total lokasinya banyak. */}
      <div className="rounded-card border border-krem-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="flex items-center gap-2 text-xl font-semibold text-hutan-900">
            <IconListSearch size={20} className="text-hutan-600" />
            Daftar Lokasi
            <span className="rounded-full bg-hutan-100 px-2.5 py-0.5 text-sm font-semibold text-hutan-700">
              {lokasiTampil.length}
            </span>
          </h2>
          <p className="text-sm text-tinta-600">
            Pilih kategori, lalu klik lokasi untuk menyorotnya di peta &amp; melihat detail.
          </p>
        </div>

        {/* Pemilih kategori: tombol berwarna dengan ikon + jumlah lokasi */}
        <div
          className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5"
          role="tablist"
          aria-label="Pilih kategori lokasi"
        >
          {kategoriLokasi.map((k) => {
            const jumlah = lokasiTampil.filter((l) => l.kategori === k.key).length;
            const aktif = kategoriTab === k.key;
            const IkonKategori = IKON_LOKASI[k.icon] || IconMapPin;
            return (
              <button
                key={k.key}
                type="button"
                role="tab"
                aria-selected={aktif}
                onClick={() => setKategoriTab(k.key)}
                className={`group flex flex-col items-center gap-1.5 rounded-2xl border px-3 py-3.5 text-center transition-all duration-300 ease-out active:scale-[0.97] ${
                  aktif
                    ? "border-transparent text-white shadow-lift"
                    : "border-krem-200 bg-krem/50 text-tinta-600 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                }`}
                style={aktif ? { backgroundColor: k.warna } : undefined}
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-300 ease-out group-hover:scale-110 ${
                    aktif ? "bg-white/20 text-white" : "text-white"
                  }`}
                  style={aktif ? undefined : { backgroundColor: k.warna }}
                >
                  <IkonKategori size={19} stroke={1.9} />
                </span>
                <span className={`text-xs font-semibold leading-snug ${aktif ? "text-white" : "text-hutan-900"}`}>
                  {k.label}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                    aktif ? "bg-white/25 text-white" : "bg-krem-200 text-tinta-600"
                  }`}
                >
                  {jumlah} lokasi
                </span>
              </button>
            );
          })}
        </div>

        {/* Kartu lokasi kategori terpilih — muncul bertahap saat kategori diganti */}
        {(() => {
          const meta = getKategori(kategoriTab);
          const items = lokasiTampil.filter((l) => l.kategori === kategoriTab);
          if (items.length === 0) {
            return (
              <p className="mt-5 rounded-xl bg-krem-200 px-4 py-6 text-center text-sm text-tinta-600">
                Tidak ada lokasi pada kategori ini yang cocok dengan filter/pencarian.
                Coba kategori lain atau ubah kata kunci.
              </p>
            );
          }
          return (
            <ul key={kategoriTab} className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((lok, i) => {
                const dipilih = lok.id === selectedId;
                const IkonLokasi = IKON_LOKASI[lok.ikon] || IconMapPin;
                return (
                  <li
                    key={lok.id}
                    className="animasi-kartu"
                    style={{ animationDelay: `${i * 45}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => pilihLokasi(lok.id)}
                      className={`group flex h-full w-full items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lift active:scale-[0.99] ${
                        dipilih
                          ? "border-emas-500 bg-emas-100/50 shadow-glow-emas"
                          : "border-krem-200 bg-white hover:border-hutan-300/60"
                      }`}
                    >
                      <span
                        className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full text-white shadow-sm transition-transform duration-300 ease-out group-hover:scale-110"
                        style={{ backgroundColor: meta ? meta.warna : "#4a7c2e" }}
                      >
                        <IkonLokasi size={18} stroke={1.9} />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-hutan-900">{lok.nama}</span>
                        <span className="mt-1 line-clamp-2 block text-sm text-tinta-600">
                          {lok.deskripsi}
                        </span>
                        <span
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold"
                          style={{ color: meta?.warna }}
                        >
                          <IconMapPin size={13} />
                          Lihat di peta
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          );
        })()}
      </div>

      {/* ---------- Modal detail lokasi (muncul saat marker/daftar diklik) ---------- */}
      <DetailLokasi lokasi={detailLokasi} onClose={() => setDetailLokasi(null)} />
    </div>
  );
}
