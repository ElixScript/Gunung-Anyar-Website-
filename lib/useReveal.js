"use client";

import { useEffect } from "react";

/*
  Hook scroll-reveal ringan (pengganti AOS.js).
  Semua elemen ber-class `.reveal` di halaman akan diberi class `.is-visible`
  saat masuk ke viewport, memicu animasi halus yang didefinisikan di globals.css.

  Cara pakai: panggil useReveal() sekali di komponen halaman (client component).
*/
export function useReveal() {
  useEffect(() => {
    const elemen = document.querySelectorAll(".reveal:not(.is-visible)");
    if (elemen.length === 0) return;

    // Jika browser tak mendukung IntersectionObserver, tampilkan langsung.
    if (typeof IntersectionObserver === "undefined") {
      elemen.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // animasi cukup sekali
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    elemen.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
