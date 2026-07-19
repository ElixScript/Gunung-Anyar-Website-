"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getKategori } from "@/lib/site";
import { getLokasiById } from "@/lib/data";

/*
  ============================================================
  PETA INTERAKTIF (Leaflet + OpenStreetMap)
  ============================================================
  Komponen ini murni sisi-klien (Leaflet butuh objek `window`),
  sehingga di halaman /peta ia dimuat lewat dynamic import (ssr: false).
*/

// Glyph ikon (SVG putih) untuk tiap kategori — ditaruh di tengah penanda.
const GLYPHS = {
  umkm:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16v10H4z"/><path d="M4 9l1.2-4h13.6L20 9"/><path d="M4 9c0 1.5 1 2.5 2.4 2.5S8.8 10.5 8.8 9M8.8 9c0 1.5 1 2.5 2.4 2.5S13.6 10.5 13.6 9M13.6 9c0 1.5 1 2.5 2.4 2.5S20 10.5 20 9"/></svg>',
  pendidikan:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-4.5"/></svg>',
  ibadah:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-1 2-3 3.5-3 6a3 3 0 0 0 6 0c0-2.5-2-4-3-6z"/><path d="M5 21v-7h14v7"/><path d="M5 21h14"/><path d="M10 21v-3.5a2 2 0 0 1 4 0V21"/></svg>',
  olahraga:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 8l3.8 2.8-1.5 4.4H9.7l-1.5-4.4z"/></svg>',
  layanan:
    '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V6l8-3 8 3v15"/><path d="M9 21v-4h6v4"/><path d="M9 10h.01M15 10h.01M9 14h.01M15 14h.01"/></svg>',
};

// Membuat ikon penanda berbentuk lingkaran berwarna sesuai kategori
function buatIkon(kategori, aktif = false) {
  const meta = getKategori(kategori);
  const warna = meta ? meta.warna : "#4a7c2e";
  const glyph = GLYPHS[kategori] || "";
  return L.divIcon({
    className: "marker-kategori",
    html: `<div class="marker-pin ${aktif ? "aktif" : ""}" style="background:${warna}">${glyph}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17], // titik tengah lingkaran
    popupAnchor: [0, -18],
  });
}

// Mengaktifkan scroll-zoom HANYA setelah peta diklik/difokuskan,
// agar tidak mengganggu saat pengunjung menggulir halaman.
function KontrolScrollZoom() {
  const map = useMap();
  useEffect(() => {
    map.scrollWheelZoom.disable();
    const aktifkan = () => map.scrollWheelZoom.enable();
    const matikan = () => map.scrollWheelZoom.disable();
    map.on("focus", aktifkan); // klik pada peta memicu 'focus'
    map.on("blur", matikan);
    return () => {
      map.off("focus", aktifkan);
      map.off("blur", matikan);
    };
  }, [map]);
  return null;
}

// Menggeser (fly) peta ke lokasi terpilih agar tersorot di tengah peta.
function KontrolPilihan({ selectedId }) {
  const map = useMap();
  useEffect(() => {
    if (!selectedId) return;
    const lok = getLokasiById(selectedId);
    if (!lok) return;
    map.flyTo([lok.latitude, lok.longitude], Math.max(map.getZoom(), 16), {
      duration: 0.8,
    });
  }, [selectedId, map]);
  return null;
}

export default function MapView({
  lokasiTampil,
  selectedId,
  onSelect,
  onOpenDetail,
  center,
  zoom = 14,
}) {
  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full"
      // Aksesibilitas: beri deskripsi untuk pembaca layar
      aria-label="Peta interaktif lokasi dan potensi desa"
    >
      {/* Tile OpenStreetMap gratis — atribusi WAJIB tetap tampil (lisensi ODbL) */}
      <TileLayer
        attribution='&copy; Kontributor <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <KontrolScrollZoom />
      <KontrolPilihan selectedId={selectedId} />

      {lokasiTampil.map((lok) => (
        <Marker
          key={lok.id}
          position={[lok.latitude, lok.longitude]}
          icon={buatIkon(lok.kategori, lok.id === selectedId)}
          eventHandlers={{
            click: () => {
              // Sorot di peta (flyTo/highlight) sekaligus buka modal detail.
              onSelect && onSelect(lok.id);
              onOpenDetail && onOpenDetail(lok);
            },
          }}
        >
          {/* Label nama saat hover — gaya premium diatur di globals.css */}
          <Tooltip direction="top" offset={[0, -16]} opacity={1}>
            {lok.nama}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
