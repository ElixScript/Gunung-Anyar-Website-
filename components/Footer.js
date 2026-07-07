import Link from "next/link";
import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { site, navItems } from "@/lib/site";

/*
  Footer global — tampil di semua halaman.
  Berisi identitas desa, sitemap mini, kontak, media sosial,
  copyright, dan kredit tim KKN (sesuai brief bagian 7.11).
*/
export default function Footer() {
  const tahun = new Date().getFullYear();

  return (
    <footer className="mt-20 bg-hutan-900 text-hutan-100">
      <div className="container-desa grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Identitas desa */}
        <div>
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/lambang-bondowoso.png"
              alt={`Lambang Kabupaten ${site.kabupaten}`}
              width={44}
              height={44}
              className="h-11 w-11 shrink-0 object-contain"
            />
            <span className="font-display text-xl font-semibold text-white">
              {site.namaDesa}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-hutan-100/80">
            {site.tagline}
          </p>
          <p className="mt-3 text-xs text-hutan-100/60">
            Kec. {site.kecamatan}, Kab. {site.kabupaten}, {site.provinsi}
          </p>
        </div>

        {/* Sitemap mini */}
        <nav aria-label="Peta situs">
          <h2 className="font-display text-base font-semibold text-white">
            Halaman
          </h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-hutan-100/80 transition-colors hover:text-emas-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Kontak singkat */}
        <div>
          <h2 className="font-display text-base font-semibold text-white">
            Kontak Desa
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-hutan-100/80">
            <li className="flex gap-2.5">
              <IconMapPin size={18} className="mt-0.5 shrink-0 text-emas-300" />
              <span>{site.kontak.alamat}</span>
            </li>
            <li className="flex gap-2.5">
              <IconPhone size={18} className="shrink-0 text-emas-300" />
              <span>{site.kontak.telepon}</span>
            </li>
            <li className="flex gap-2.5">
              <IconMail size={18} className="shrink-0 text-emas-300" />
              <a
                href={`mailto:${site.kontak.email}`}
                className="hover:text-emas-300"
              >
                {site.kontak.email}
              </a>
            </li>
            <li className="flex gap-2.5">
              <IconClock size={18} className="mt-0.5 shrink-0 text-emas-300" />
              <span>{site.kontak.jamPelayanan}</span>
            </li>
          </ul>
        </div>

        {/* Media sosial + kredit */}
        <div>
          <h2 className="font-display text-base font-semibold text-white">
            Ikuti Kami
          </h2>
          <div className="mt-4 flex gap-3">
            <a
              href={site.sosial.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram desa"
              className="grid h-10 w-10 place-items-center rounded-full bg-hutan-800 text-hutan-100 transition-colors hover:bg-emas-500 hover:text-hutan-900"
            >
              <IconBrandInstagram size={20} />
            </a>
            <a
              href={site.sosial.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook desa"
              className="grid h-10 w-10 place-items-center rounded-full bg-hutan-800 text-hutan-100 transition-colors hover:bg-emas-500 hover:text-hutan-900"
            >
              <IconBrandFacebook size={20} />
            </a>
            <a
              href={site.sosial.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube desa"
              className="grid h-10 w-10 place-items-center rounded-full bg-hutan-800 text-hutan-100 transition-colors hover:bg-emas-500 hover:text-hutan-900"
            >
              <IconBrandYoutube size={20} />
            </a>
          </div>

          {/* Logo kampus/KKN (placeholder) */}
          <div className="mt-6 rounded-xl border border-hutan-800 bg-hutan-800/40 p-3 text-xs text-hutan-100/70">
            Program KKN {site.kampus} · {site.tahunKKN}
          </div>
        </div>
      </div>

      {/* Baris copyright & kredit tim */}
      <div className="border-t border-hutan-800">
        <div className="container-desa flex flex-col gap-2 py-5 text-xs text-hutan-100/70 md:flex-row md:items-center md:justify-between">
          <p>
            © {tahun} Pemerintah {site.namaDesa} &amp; Tim KKN {site.kampus}
          </p>
          <p>
            Pengembangan web, pemetaan potensi &amp; riset data oleh Tim KKN{" "}
            {site.tahunKKN}
          </p>
        </div>
      </div>
    </footer>
  );
}
