"use client";

import { useEffect, useRef, useState } from "react";

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
  const [tampil, setTampil] = useState(0);
  const [selesai, setSelesai] = useState(false);
  const reduced = useReducedMotion();

  const fmt = format || ((n) => Math.round(n).toLocaleString("id-ID"));

  useEffect(() => {
    const el = ref.current;
    if (!el || selesai) return;

    // Tanpa animasi: langsung tampilkan nilai akhir
    if (reduced || typeof IntersectionObserver === "undefined") {
      setTampil(nilai);
      setSelesai(true);
      return;
    }

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
          setTampil(nilai * e);
          if (t < 1) raf = requestAnimationFrame(loop);
          else setSelesai(true);
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
  }, [nilai, durasi, reduced, selesai]);

  return (
    <span ref={ref} className={className}>
      {fmt(tampil)}
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
