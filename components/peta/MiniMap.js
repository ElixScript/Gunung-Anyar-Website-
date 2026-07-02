"use client";

import dynamic from "next/dynamic";

/*
  Peta kecil sederhana (satu atau beberapa penanda) tanpa panel filter.
  Dipakai di halaman Profil (letak geografis) dan Kontak (lokasi kantor desa).
  Menggunakan ulang komponen MapView agar konsisten.
*/
const MapView = dynamic(() => import("@/components/peta/MapView"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center bg-hutan-100 text-sm text-tinta-600">
      Memuat peta…
    </div>
  ),
});

export default function MiniMap({ lokasi = [], center, zoom = 15, tinggi = "h-72" }) {
  return (
    <div className={`${tinggi} overflow-hidden rounded-card border border-krem-200 shadow-sm`}>
      <MapView
        lokasiTampil={lokasi}
        selectedId={null}
        onSelect={() => {}}
        center={center}
        zoom={zoom}
      />
    </div>
  );
}
