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
import KontakForm from "@/components/kontak/KontakForm";
import { site } from "@/lib/site";
import { getLokasiById } from "@/lib/data";

export const metadata = {
  title: "Kontak & Pengaduan",
  description: `Hubungi Pemerintah ${site.namaDesa}. Alamat, telepon, email, jam pelayanan, lokasi kantor desa, dan formulir pesan.`,
  alternates: { canonical: "/kontak" },
};

const faq = [
  {
    t: "Bagaimana cara mengurus surat keterangan di desa?",
    j: "Datang ke kantor desa pada jam pelayanan dengan membawa KTP dan dokumen pendukung. Petugas akan membantu proses pengurusan surat yang Anda butuhkan.",
  },
  {
    t: "Bagaimana cara memasarkan produk UMKM saya di website ini?",
    j: "Hubungi perangkat desa atau kirim pesan melalui formulir di halaman ini. Sampaikan nama usaha, produk, foto, dan kontak Anda untuk didaftarkan ke direktori UMKM.",
  },
  {
    t: "Apakah data pada website ini sudah final?",
    j: "Sebagian data masih berupa contoh dan akan terus diperbarui bersama perangkat desa agar sesuai kondisi terbaru.",
  },
];

export default function KontakPage() {
  const kantorDesa = getLokasiById("loc-007");

  const infoKontak = [
    { icon: IconMapPin, label: "Alamat", isi: site.kontak.alamat },
    { icon: IconPhone, label: "Telepon", isi: site.kontak.telepon },
    { icon: IconMail, label: "Email", isi: site.kontak.email, href: `mailto:${site.kontak.email}` },
    { icon: IconClock, label: "Jam Pelayanan", isi: site.kontak.jamPelayanan },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kontak & Pengaduan"
        judul="Hubungi Kami"
        deskripsi="Ada pertanyaan, usulan, atau pengaduan? Sampaikan kepada Pemerintah Desa Gunung Anyar melalui saluran berikut."
      />

      <section className="container-desa py-12">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Kolom kiri: info + peta + sosial */}
          <Reveal>
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
                      <a href={k.href} className="text-sm text-tinta-600 hover:text-hutan-700">
                        {k.isi}
                      </a>
                    ) : (
                      <p className="text-sm text-tinta-600">{k.isi}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* WhatsApp cepat + media sosial */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`https://wa.me/${site.kontak.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
              >
                <IconBrandWhatsapp size={18} /> Chat WhatsApp
              </a>
              <div className="flex gap-2">
                {[
                  { href: site.sosial.instagram, icon: IconBrandInstagram, label: "Instagram" },
                  { href: site.sosial.facebook, icon: IconBrandFacebook, label: "Facebook" },
                  { href: site.sosial.youtube, icon: IconBrandYoutube, label: "YouTube" },
                ].map((s) => (
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

            {/* Peta lokasi kantor desa */}
            <div className="mt-6">
              <MiniMap
                lokasi={kantorDesa ? [kantorDesa] : []}
                center={site.koordinat}
                zoom={15}
                tinggi="h-72"
              />
            </div>
          </Reveal>

          {/* Kolom kanan: formulir */}
          <Reveal delay={120}>
            <div className="rounded-card border border-krem-200 bg-white p-6 shadow-sm sm:p-8">
              <SectionHeading eyebrow="Formulir" judul="Kirim pesan" className="mb-6" />
              <KontakForm />
            </div>
          </Reveal>
        </div>

        {/* FAQ */}
        <div className="mt-16 max-w-3xl">
          <SectionHeading eyebrow="FAQ" judul="Pertanyaan yang sering diajukan" className="mb-6" />
          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.t}
                className="group rounded-2xl border border-krem-200 bg-white p-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-medium text-hutan-900">
                  {f.t}
                  <span className="text-hutan-600 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-tinta-600">{f.j}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
