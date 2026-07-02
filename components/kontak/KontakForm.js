"use client";

import { useState } from "react";
import { IconSend, IconCircleCheck, IconAlertTriangle } from "@tabler/icons-react";
import { site } from "@/lib/site";

/*
  Formulir kontak untuk situs statis (tanpa backend) menggunakan Formspree.

  CARA SETUP (gratis):
  1. Daftar di https://formspree.io lalu buat "form" baru.
  2. Salin ID form Anda (bagian setelah /f/, contoh: "mzbqwxyz").
  3. Tempel ID tersebut pada `formspreeId` di file lib/site.js.
  Selesai — kiriman pesan akan masuk ke email yang Anda daftarkan.
*/
export default function KontakForm() {
  const [status, setStatus] = useState("idle"); // idle | mengirim | sukses | gagal
  const belumDiatur = !site.formspreeId || site.formspreeId === "xxxxxxxx";

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("mengirim");
    const form = e.target;
    const data = new FormData(form);

    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sukses");
        form.reset();
      } else {
        setStatus("gagal");
      }
    } catch {
      setStatus("gagal");
    }
  }

  if (status === "sukses") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-card border border-hutan-300 bg-hutan-100/60 p-8 text-center">
        <IconCircleCheck size={44} className="text-hutan-600" />
        <h3 className="text-xl font-semibold text-hutan-900">Pesan terkirim!</h3>
        <p className="text-sm text-tinta-600">
          Terima kasih telah menghubungi kami. Pesan Anda akan segera kami tanggapi.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 text-sm font-semibold text-hutan-700 underline-offset-2 hover:underline"
        >
          Kirim pesan lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {belumDiatur && (
        <p className="flex items-start gap-2 rounded-xl border border-emas-300 bg-emas-100/50 px-4 py-3 text-xs text-tinta-600">
          <IconAlertTriangle size={16} className="mt-0.5 shrink-0 text-emas-600" />
          Formulir belum aktif. Atur <code>formspreeId</code> di file{" "}
          <code>lib/site.js</code> (lihat panduan di README).
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className="mb-1.5 block text-sm font-medium text-tinta">
            Nama <span className="text-terakota-500">*</span>
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            className="w-full rounded-xl border border-krem-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-hutan-500"
          />
        </div>
        <div>
          <label htmlFor="kontak" className="mb-1.5 block text-sm font-medium text-tinta">
            Email / No. HP <span className="text-terakota-500">*</span>
          </label>
          <input
            id="kontak"
            name="email"
            type="text"
            required
            className="w-full rounded-xl border border-krem-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-hutan-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subjek" className="mb-1.5 block text-sm font-medium text-tinta">
          Subjek
        </label>
        <input
          id="subjek"
          name="subjek"
          type="text"
          className="w-full rounded-xl border border-krem-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-hutan-500"
        />
      </div>

      <div>
        <label htmlFor="pesan" className="mb-1.5 block text-sm font-medium text-tinta">
          Pesan <span className="text-terakota-500">*</span>
        </label>
        <textarea
          id="pesan"
          name="pesan"
          rows={5}
          required
          className="w-full resize-y rounded-xl border border-krem-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-hutan-500"
        />
      </div>

      {status === "gagal" && (
        <p className="flex items-center gap-2 text-sm text-terakota-600">
          <IconAlertTriangle size={16} />
          Maaf, pesan gagal terkirim. Silakan coba lagi atau hubungi kami langsung via email.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "mengirim" || belumDiatur}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-emas-500 px-6 py-3 text-sm font-semibold text-hutan-900 shadow-lift transition-all hover:bg-emas-600 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <IconSend size={17} />
        {status === "mengirim" ? "Mengirim…" : "Kirim Pesan"}
      </button>

      {/* Alternatif tanpa formulir */}
      <p className="text-xs text-tinta-600/80">
        Atau kirim email langsung ke{" "}
        <a href={`mailto:${site.kontak.email}`} className="font-semibold text-hutan-700 hover:underline">
          {site.kontak.email}
        </a>
      </p>
    </form>
  );
}
