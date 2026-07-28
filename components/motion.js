"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect di klien, useEffect saat render di server (menghindari warning)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/*
  ============================================================
  UTILITAS MOTION RINGAN (tanpa library, GPU-friendly)
  ============================================================
  - ScrollProgress : bar progres baca di atas layar
  - CountUp        : angka berhitung saat masuk viewport
  - Tilt           : kartu miring halus 3D mengikuti kursor
  Semua menghormati prefers-reduced-motion & hanya memakai
  transform/opacity (60fps, GPU accelerated).
*/

// Hook kecil: true bila pengguna meminta pengurangan animasi
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------- Bar progres scroll (dipasang di Navbar) ---------- */
export function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = barRef.current;
      if (!el) return;
      const maks = document.documentElement.scrollHeight - window.innerHeight;
      const rasio = maks > 0 ? Math.min(window.scrollY / maks, 1) : 0;
      el.style.transform = `scaleX(${rasio})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-[2.5px] origin-left bg-gradient-to-r from-hutan-500 via-emas-500 to-emas-300"
      style={{ transform: "scaleX(0)" }}
    />
  );
}

/* ---------- Angka berhitung (statistik) ----------
   Prop:
   - nilai   : angka akhir (number)
   - durasi  : ms (default 1600)
   - suffix  : teks setelah angka, mis. " ha"
   - format  : fungsi format (default: pemisah ribuan id-ID) */
export function CountUp({ nilai, durasi = 1600, suffix = "", format, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const fmt = format || ((n) => Math.round(n).toLocaleString("id-ID"));

  /*
    Angka ditulis langsung ke DOM lewat ref, bukan lewat state. Versi state
    memicu render ulang React ~90 kali per angka (satu per frame); halaman
    Statistik punya empat penghitung sekaligus. Pola ini sama dengan
    ScrollProgress di atas.

    Nilai akhir sudah tercetak di HTML hasil build, jadi angka tetap terbaca
    bagi mesin pencari dan pengunjung tanpa JavaScript. Reset ke nol dilakukan
    di layout effect — sebelum browser sempat melukis — supaya tidak ada kedip.
  */
  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Formatter dibuat ulang di dalam effect agar tidak perlu ref yang dibaca
    // saat render (dilarang React) sekaligus tetap sinkron dengan prop.
    const f = format || ((n) => Math.round(n).toLocaleString("id-ID"));
    const tulis = (n) => {
      el.textContent = f(n) + suffix;
    };

    // Tanpa animasi: biarkan nilai akhir apa adanya
    if (reduced || typeof IntersectionObserver === "undefined") return;

    tulis(0);
    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const mulai = performance.now();
        const loop = (kini) => {
          const t = Math.min((kini - mulai) / durasi, 1);
          // easeOutExpo — cepat di awal, mendarat lembut
          const e = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          tulis(nilai * e);
          if (t < 1) raf = requestAnimationFrame(loop);
          else tulis(nilai); // pastikan mendarat tepat di angka aslinya
        };
        raf = requestAnimationFrame(loop);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [nilai, durasi, reduced, suffix, format]);

  return (
    <span ref={ref} className={className}>
      {fmt(nilai)}
      {suffix}
    </span>
  );
}

/* ---------- Kartu miring 3D halus mengikuti kursor ----------
   Efek maksimum 5°, nonaktif otomatis di perangkat sentuh
   dan saat prefers-reduced-motion. */
export function Tilt({ children, maks = 5, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    // Lewati perangkat sentuh — tilt hanya untuk kursor presisi
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let rx = 0;
    let ry = 0;

    const render = () => {
      raf = 0;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry = px * maks;
      rx = -py * maks;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onLeave = () => {
      rx = 0;
      ry = 0;
      if (!raf) raf = requestAnimationFrame(render);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [maks, reduced]);

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
