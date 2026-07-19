import {
  IconMapPin,
  IconPhone,
  IconMail,
  IconClock,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { PageHero, SectionHeading } from "@/components/ui";
import Reveal from "@/components/Reveal";
import MiniMap from "@/components/peta/MiniMap";
import { site } from "@/lib/site";
import { getLokasiById } from "@/lib/data";

export const metadata = {
  title: "Kontak & Pengaduan",
  description: `Hubungi Pemerintah ${site.namaDesa}. Alamat, telepon, email, jam pelayanan, dan lokasi kantor desa.`,
  alternates: { canonical: "/kontak" },
};

export default function KontakPage() {
  const kantorDesa = getLokasiById("loc-007");

  const infoKontak = [
    { icon: IconMapPin, label: "Alamat", isi: site.kontak.alamat },
    { icon: IconPhone, label: "Telepon", isi: site.kontak.telepon, href: `tel:${site.kontak.telepon.replace(/\s/g, "")}` },
    { icon: IconMail, label: "Email", isi: site.kontak.email, href: `mailto:${site.kontak.email}` },
    { icon: IconClock, label: "Jam Pelayanan", isi: site.kontak.jamPelayanan },
  ];

  const sosial = [
    { href: site.sosial.instagram, icon: IconBrandInstagram, label: "Instagram" },
    { href: site.sosial.facebook, icon: IconBrandFacebook, label: "Facebook" },
    { href: site.sosial.youtube, icon: IconBrandYoutube, label: "YouTube" },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kontak & Pengaduan"
        judul="Hubungi Kami"
        deskripsi="Ada pertanyaan, usulan, atau pengaduan? Sampaikan kepada Pemerintah Desa Gunung Anyar melalui saluran berikut."
      />

      <section className="container-desa py-12">
        <div className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Kolom kiri: kartu informasi + kanal kontak langsung */}
          <Reveal className="h-full">
            <div className="flex h-full flex-col rounded-card border border-krem-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading eyebrow="Informasi" judul="Kantor Desa Gunung Anyar" />

              <ul className="mt-6 space-y-4">
                {infoKontak.map((k) => (
                  <li key={k.label} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-hutan-100 text-hutan-700">
                      <k.icon size={20} />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-hutan-900">{k.label}</p>
                      {k.href ? (
                        <a href={k.href} className="text-sm text-tinta-600 transition-colors hover:text-hutan-700">
                          {k.isi}
                        </a>
                      ) : (
                        <p className="text-sm text-tinta-600">{k.isi}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="my-6 border-krem-200" />

              {/* Kanal langsung: WhatsApp & email */}
              <div className="mt-auto">
                <p className="text-sm font-semibold text-hutan-900">Hubungi langsung</p>
                <p className="mt-1 text-sm text-tinta-600">
                  Sampaikan pertanyaan atau pengaduan Anda lewat WhatsApp atau email — kami akan menanggapi secepatnya.
                </p>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={`https://wa.me/${site.kontak.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lift transition-all hover:-translate-y-0.5"
                  >
                    <IconBrandWhatsapp size={18} /> Chat WhatsApp
                  </a>
                  <a
                    href={`mailto:${site.kontak.email}`}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-hutan-300 px-5 py-3 text-sm font-semibold text-hutan-700 transition-all hover:-translate-y-0.5 hover:bg-hutan-100"
                  >
                    <IconMail size={18} /> Kirim Email
                  </a>
                </div>

                {/* Media sosial */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="mr-1 text-sm text-tinta-600">Ikuti kami:</span>
                  {sosial.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid h-11 w-11 place-items-center rounded-full border border-krem-200 bg-white text-hutan-700 transition-colors hover:bg-hutan-100"
                    >
                      <s.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Kolom kanan: peta lokasi kantor desa (mengisi tinggi kolom) */}
          <Reveal className="h-full" delay={120}>
            <MiniMap
              lokasi={kantorDesa ? [kantorDesa] : []}
              center={site.koordinat}
              zoom={15}
              tinggi="h-80 lg:h-full lg:min-h-[420px]"
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
