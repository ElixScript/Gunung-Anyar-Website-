import StructuredData from "@/components/StructuredData";
import { PageHero } from "@/components/ui";
import UmkmClient from "@/components/umkm/UmkmClient";
import { getLokasiByKategori } from "@/lib/data";
import { site } from "@/lib/site";

export const metadata = {
  title: "Ekonomi & UMKM",
  description: `Direktori UMKM dan produk unggulan ${site.namaDesa}. Hubungi pelaku usaha langsung via WhatsApp dan temukan lokasinya di peta desa.`,
  alternates: { canonical: "/umkm" },
};

/*
  Tiap UMKM didaftarkan sebagai LocalBusiness lengkap dengan koordinat, supaya
  usaha warga bisa muncul sendiri-sendiri di pencarian lokal — bukan cuma
  halaman direktorinya.
*/
function dataTerstrukturUmkm() {
  const umkm = getLokasiByKategori("umkm");
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Direktori UMKM ${site.namaDesa}`,
    numberOfItems: umkm.length,
    itemListElement: umkm.map((u, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: u.nama,
        description: u.deskripsi,
        image: `${site.url}${u.foto}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: u.alamat || site.kontak.alamat,
          addressLocality: `Kecamatan ${site.kecamatan}`,
          addressRegion: site.provinsi,
          addressCountry: "ID",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: u.latitude,
          longitude: u.longitude,
        },
        ...(u.detail?.whatsapp && { telephone: `+${u.detail.whatsapp}` }),
      },
    })),
  };
}

export default function UmkmPage() {
  return (
    <>
      <StructuredData data={dataTerstrukturUmkm()} />
      <PageHero
        eyebrow="Ekonomi & UMKM"
        judul="Direktori UMKM Desa"
        deskripsi="Dukung ekonomi desa dengan membeli produk unggulan langsung dari pelaku usaha lokal. Hubungi via WhatsApp atau kunjungi lokasinya."
      />
      <section className="container-desa py-12">
        <UmkmClient />
      </section>
    </>
  );
}
