"use client";

import { useEffect, useRef } from "react";

/*
  Lapisan visual hero beranda (client) — teks hero tetap di server (SEO).
  Terdiri dari:
  - Foto latar dengan slow settle-zoom (ala opening dokumenter)
  - Color grading: gradasi hijau gelap + warm tone emas
  - Dua blob cahaya organik yang mengambang + bergeser mengikuti kursor
  Semua gerakan berbasis transform (GPU) & mati saat reduced-motion.
*/
export default function HeroVisual() {
  const lapisRef = useRef(null); // wadah blob yang digeser kursor

  useEffect(() => {
    const wadah = lapisRef.current;
    if (!wadah) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const render = () => {
      raf = 0;
      // Dua kecepatan berbeda memberi kedalaman (depth parallax)
      const a = wadah.children[0];
      const b = wadah.children[1];
      if (a) a.style.transform = `translate3d(${tx * 26}px, ${ty * 20}px, 0)`;
      if (b) b.style.transform = `translate3d(${tx * -18}px, ${ty * -14}px, 0)`;
    };
    const onMove = (e) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Foto latar — slow zoom sinematik saat halaman terbuka */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/images/hero/hero-desa.jpg"
          alt=""
          className="animasi-hero-zoom absolute inset-0 h-full w-full object-cover"
        />
      </div>

      {/* Color grading: hijau pekat kiri-bawah → hangat kanan-atas */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-hutan-900/95 via-hutan-900/70 to-hutan-800/45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_20%,rgba(217,164,65,0.16),transparent_55%)]"
        aria-hidden="true"
      />
      {/* Vignette bawah agar transisi ke konten terasa menyatu */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-hutan-900/80 to-transparent"
        aria-hidden="true"
      />

      {/* Blob cahaya organik — float sendiri + parallax kursor */}
      <div ref={lapisRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-32 top-1/4 h-96 w-96 will-change-transform">
          <div className="animasi-ambang-a h-full w-full rounded-full bg-emas-500/20 blur-3xl" />
        </div>
        <div className="absolute -left-24 bottom-8 h-80 w-80 will-change-transform">
          <div className="animasi-ambang-b h-full w-full rounded-full bg-hutan-400/25 blur-3xl" />
        </div>
      </div>
    </>
  );
}
