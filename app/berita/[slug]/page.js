import Link from "next/link";
import { notFound } from "next/navigation";
import { IconChevronRight, IconCalendar, IconUser, IconArrowLeft } from "@tabler/icons-react";
import SmartImage from "@/components/SmartImage";
import { BeritaCard } from "@/components/cards";
import { getBerita, getBeritaBySlug, formatTanggal } from "@/lib/data";

// Membuat halaman statis untuk setiap slug berita (wajib untuk output: export)
export function generateStaticParams() {
  return getBerita().map((b) => ({ slug: b.slug }));
}

// Metadata unik per artikel (SEO + Open Graph)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) return { title: "Berita tidak ditemukan" };
  return {
    title: berita.judul,
    description: berita.ringkasan,
    alternates: { canonical: `/berita/${slug}` },
    openGraph: {
      type: "article",
      title: berita.judul,
      description: berita.ringkasan,
      images: [berita.thumbnail],
    },
  };
}

export default async function BeritaDetailPage({ params }) {
  const { slug } = await params;
  const berita = getBeritaBySlug(slug);
  if (!berita) notFound();

  // Artikel terkait: kategori sama, selain artikel ini (maks 3)
  const terkait = getBerita()
    .filter((b) => b.slug !== slug && b.kategori === berita.kategori)
    .slice(0, 3);

  return (
    <article className="pb-8">
      {/* Header artikel */}
      <div className="bg-hutan-900 text-white">
        <div className="container-desa py-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-hutan-100/70">
            <Link href="/" className="hover:text-emas-300">Beranda</Link>
            <IconChevronRight size={14} />
            <Link href="/berita" className="hover:text-emas-300">Berita</Link>
            <IconChevronRight size={14} />
            <span className="text-white/90">{berita.judul}</span>
          </nav>

          <span className="mt-6 inline-block rounded-full bg-emas-500 px-3 py-1 text-xs font-semibold text-hutan-900">
            {berita.kategori}
          </span>
          <h1 className="mt-3 max-w-3xl text-3xl leading-tight text-white sm:text-4xl">
            {berita.judul}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-hutan-100/80">
            <span className="inline-flex items-center gap-1.5">
              <IconCalendar size={16} /> {formatTanggal(berita.tanggal)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <IconUser size={16} /> {berita.penulis}
            </span>
          </div>
        </div>
      </div>

      {/* Gambar utama */}
      <div className="container-desa -mt-2">
        <div className="overflow-hidden rounded-card border border-krem-200 shadow-lift">
          <SmartImage src={berita.thumbnail} alt={berita.judul} ratio="16/9" label={berita.judul} />
        </div>
      </div>

      {/* Isi artikel */}
      <div className="container-desa mt-10 max-w-3xl">
        <div className="space-y-5 text-lg leading-relaxed text-tinta">
          {berita.konten.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href="/berita"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-hutan-700 hover:text-hutan-800"
          >
            <IconArrowLeft size={16} />
            Kembali ke daftar berita
          </Link>
        </div>
      </div>

      {/* Artikel terkait */}
      {terkait.length > 0 && (
        <section className="container-desa mt-16">
          <h2 className="text-2xl font-semibold text-hutan-900">Berita terkait</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {terkait.map((b) => (
              <BeritaCard key={b.slug} berita={b} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
