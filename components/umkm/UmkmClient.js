"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { IconSearch, IconBrandWhatsapp, IconMapPin, IconUser, IconTag } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import { getLokasiByKategori } from "@/lib/data";

/*
  Direktori UMKM.
  Mengambil semua lokasi berkategori "umkm" dari data/lokasi.json.
  Fitur: pencarian nama/produk, tombol WhatsApp langsung, dan tautan
  "Lihat di Peta" yang membuka /peta?loc=<id> (popup otomatis terbuka).
*/
export default function UmkmClient() {
  const umkm = getLokasiByKategori("umkm");
  const [cari, setCari] = useState("");

  const tampil = useMemo(() => {
    const q = cari.trim().toLowerCase();
    if (!q) return umkm;
    return umkm.filter((u) => {
      const teks = `${u.nama} ${u.detail?.produk || ""} ${u.detail?.pemilik || ""}`.toLowerCase();
      return teks.includes(q);
    });
  }, [umkm, cari]);

  return (
    <div>
      {/* Pencarian */}
      <div className="relative max-w-md">
        <IconSearch
          size={18}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-tinta-600"
        />
        <input
          type="search"
          value={cari}
          onChange={(e) => setCari(e.target.value)}
          placeholder="Cari usaha atau produk…"
          aria-label="Cari UMKM"
          className="w-full rounded-full border border-krem-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-hutan-500"
        />
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tampil.map((u) => {
          const d = u.detail || {};
          const waText = encodeURIComponent(
            `Halo, saya melihat ${u.nama} di website Desa Gunung Anyar dan tertarik dengan produknya.`
          );
          return (
            <article
              key={u.id}
              className="flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <SmartImage src={u.foto} alt={`Produk ${u.nama}`} ratio="4/3" />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-hutan-900">{u.nama}</h3>
                <p className="mt-2 text-sm leading-relaxed text-tinta-600">{u.deskripsi}</p>

                <ul className="mt-4 flex-1 space-y-2 border-t border-krem-200 pt-4 text-sm text-tinta-600">
                  {d.pemilik && (
                    <li className="flex items-center gap-2">
                      <IconUser size={16} className="text-hutan-600" /> {d.pemilik}
                    </li>
                  )}
                  {d.produk && (
                    <li className="flex items-start gap-2">
                      <IconTag size={16} className="mt-0.5 text-hutan-600" /> {d.produk}
                    </li>
                  )}
                  {d.harga && (
                    <li className="ml-6 font-semibold text-hutan-800">{d.harga}</li>
                  )}
                </ul>

                <div className="mt-5 flex flex-wrap gap-2">
                  {d.whatsapp && (
                    <a
                      href={`https://wa.me/${d.whatsapp}?text=${waText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                    >
                      <IconBrandWhatsapp size={17} />
                      WhatsApp
                    </a>
                  )}
                  <Link
                    href={`/peta/?loc=${u.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-krem-200 px-4 py-2 text-sm font-semibold text-hutan-700 hover:border-hutan-300"
                  >
                    <IconMapPin size={17} />
                    Lihat di Peta
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {tampil.length === 0 && (
        <p className="mt-8 text-center text-tinta-600">
          Tidak ada UMKM yang cocok dengan pencarian.
        </p>
      )}
    </div>
  );
}
