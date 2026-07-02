"use client";

import { useEffect, useRef, useState } from "react";

/*
  Wrapper animasi scroll-reveal.
  Karena ini client component, ia tetap bisa dipakai di dalam halaman
  server (untuk SEO) — cukup bungkus section dengan <Reveal>...</Reveal>.

  Prop:
  - as: tag HTML pembungkus (default "div")
  - delay: jeda animasi dalam ms (untuk efek berurutan)
*/
export default function Reveal({ children, as: Tag = "div", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [terlihat, setTerlihat] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setTerlihat(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTerlihat(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${terlihat ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
