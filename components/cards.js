import Link from "next/link";
import { IconArrowRight, IconMapPin, IconCalendar } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import { BadgeKategori } from "@/components/ui";
import { formatTanggal, fotoKecil } from "@/lib/data";

/*
  Kartu Potensi — dipakai di Beranda & halaman Potensi.
  Menampilkan foto, badge kategori, nama, deskripsi singkat, dan tautan
  untuk melihat lokasi tersebut langsung di peta (?loc=id).
*/
export function PotensiCard({ lokasi }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-hutan-300/60 hover:shadow-float">
      <div className="relative overflow-hidden">
        {/* Foto hidup: zoom lembut saat kartu di-hover */}
        <SmartImage
          src={lokasi.foto}
          thumb={fotoKecil(lokasi.foto)}
          alt={`Foto ${lokasi.nama}`}
          ratio="16/9"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        {/* Gradasi tipis agar badge selalu terbaca */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-hutan-900/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          aria-hidden="true"
        />
        <div className="absolute left-3 top-3">
          <BadgeKategori kategori={lokasi.kategori} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-hutan-900 transition-colors duration-300 group-hover:text-hutan-700">
          {lokasi.nama}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-tinta-600">
          {lokasi.deskripsi}
        </p>
        <Link
          href={`/peta/?loc=${lokasi.id}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-hutan-700 transition-colors hover:text-hutan-800"
        >
          <IconMapPin size={16} />
          <span className="link-garis">Lihat di peta</span>
          <IconArrowRight
            size={15}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}

/*
  Kartu Berita — dipakai di Beranda & halaman Berita.
*/
export function BeritaCard({ berita }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-card border border-krem-200 bg-white shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-hutan-300/60 hover:shadow-float">
      <Link href={`/berita/${berita.slug}`} className="block overflow-hidden">
        <SmartImage
          src={berita.thumbnail}
          thumb={fotoKecil(berita.thumbnail)}
          alt={`Ilustrasi berita: ${berita.judul}`}
          ratio="16/9"
          imgClassName="transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-tinta-600">
          <span className="rounded-full bg-hutan-100 px-2.5 py-1 font-semibold text-hutan-800">
            {berita.kategori}
          </span>
          <span className="inline-flex items-center gap-1">
            <IconCalendar size={13} />
            {formatTanggal(berita.tanggal)}
          </span>
        </div>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-hutan-900">
          <Link href={`/berita/${berita.slug}`} className="hover:text-hutan-700">
            {berita.judul}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-tinta-600">
          {berita.ringkasan}
        </p>
        <Link
          href={`/berita/${berita.slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-hutan-700 transition-colors hover:text-hutan-800"
        >
          <span className="link-garis">Baca selengkapnya</span>
          <IconArrowRight
            size={15}
            className="transition-transform duration-300 ease-out group-hover:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );
}
