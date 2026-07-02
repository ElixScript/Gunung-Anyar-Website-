"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  IconMapPin,
  IconClock,
  IconRoute,
  IconPlant2,
  IconRuler2,
  IconScale,
  IconUser,
  IconTag,
  IconCalendarEvent,
} from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import { BadgeKategori } from "@/components/ui";
import { kategoriLokasi, getKategori } from "@/lib/site";
import { getLokasi } from "@/lib/data";

/*
  Halaman Potensi Desa (sisi-klien untuk filter tab).
  Menggunakan data yang SAMA dengan peta (data/lokasi.json) agar konsisten.
  Setiap kartu menampilkan field berbeda sesuai kategorinya.
*/
export default function PotensiClient() {
  const semua = getLokasi();
  const [tab, setTab] = useState("semua");

  const tabs = [{ key: "semua", label: "Semua", warna: "#2d5016" }, ...kategoriLokasi];

  const tampil = useMemo(
    () => (tab === "semua" ? semua : semua.filter((l) => l.kategori === tab)),
    [semua, tab]
  );

  return (
    <div>
      {/* Tab filter kategori */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter kategori potensi">
        {tabs.map((t) => {
          const aktif = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={aktif}
              onClick={() => setTab(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                aktif
                  ? "border-transparent text-white shadow-sm"
                  : "border-krem-200 bg-white text-tinta-600 hover:border-hutan-300"
              }`}
              style={aktif ? { backgroundColor: t.warna } : undefined}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Grid kartu potensi */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tampil.map((lok) => (
          <KartuPotensiDetail key={lok.id} lok={lok} />
        ))}
      </div>

      {tampil.length === 0 && (
        <p className="mt-8 text-center text-tinta-600">Belum ada data untuk kategori ini.</p>
      )}
    </div>
  );
}

// Baris detail (ikon + teks)
function Baris({ icon: Icon, children }) {
  if (!children) return null;
  return (
    <li className="flex items-start gap-2 text-sm text-tinta-600">
      <Icon size={16} className="mt-0.5 shrink-0 text-hutan-600" />
      <span>{children}</span>
    </li>
  );
}

function KartuPotensiDetail({ lok }) {
  const d = lok.detail || {};
  const meta = getKategori(lok.kategori);

  return (
    <article className="flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <SmartImage src={lok.foto} alt={`Foto ${lok.nama}`} ratio="16/9" />
        <div className="absolute left-3 top-3">
          <BadgeKategori kategori={lok.kategori} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-hutan-900">{lok.nama}</h3>
        <p className="mt-2 text-sm leading-relaxed text-tinta-600">{lok.deskripsi}</p>

        {/* Detail spesifik per kategori */}
        <ul className="mt-4 flex-1 space-y-2 border-t border-krem-200 pt-4">
          {/* Wisata & Fasilitas */}
          <Baris icon={IconClock}>{d.jam_operasional}</Baris>
          <Baris icon={IconRoute}>{d.rute}</Baris>
          {/* Pertanian */}
          <Baris icon={IconPlant2}>{d.komoditas && `Komoditas: ${d.komoditas}`}</Baris>
          <Baris icon={IconRuler2}>{d.luas_lahan && `Luas lahan: ${d.luas_lahan}`}</Baris>
          <Baris icon={IconScale}>{d.estimasi_hasil && `Estimasi hasil: ${d.estimasi_hasil}`}</Baris>
          {/* UMKM */}
          <Baris icon={IconUser}>{d.pemilik && `Pemilik: ${d.pemilik}`}</Baris>
          <Baris icon={IconTag}>
            {d.produk && `${d.produk}${d.harga ? ` — ${d.harga}` : ""}`}
          </Baris>
          {/* Budaya */}
          <Baris icon={IconCalendarEvent}>{d.waktu_tampil}</Baris>
          <Baris icon={IconUser}>{d.kontak_ketua}</Baris>
        </ul>

        <Link
          href={`/peta/?loc=${lok.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-hutan-700 hover:text-hutan-800"
          style={{ color: meta?.warna }}
        >
          <IconMapPin size={16} />
          Lihat di peta
        </Link>
      </div>
    </article>
  );
}
