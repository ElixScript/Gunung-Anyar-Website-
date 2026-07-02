"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconMenu2,
  IconX,
  IconChevronDown,
  IconMapPin,
} from "@tabler/icons-react";
import { site, navItems } from "@/lib/site";

/*
  Navbar sticky yang tampil di semua halaman.
  - Highlight menu halaman aktif (berdasarkan URL saat ini)
  - Dropdown untuk "Peta & Potensi" (desktop hover/klik, mobile accordion)
  - Hamburger menu untuk layar kecil
  - Latar menjadi solid saat halaman di-scroll
*/
export default function Navbar() {
  const pathname = usePathname();
  const [menuTerbuka, setMenuTerbuka] = useState(false); // menu mobile
  const [dropdownTerbuka, setDropdownTerbuka] = useState(false); // dropdown mobile
  const [discroll, setDiscroll] = useState(false);

  // Deteksi scroll untuk mengubah gaya navbar
  useEffect(() => {
    const onScroll = () => setDiscroll(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu mobile setiap kali pindah halaman
  useEffect(() => {
    setMenuTerbuka(false);
    setDropdownTerbuka(false);
  }, [pathname]);

  // Sebuah menu dianggap aktif jika URL sama, atau salah satu child-nya cocok
  const isAktif = (item) => {
    if (item.href === "/") return pathname === "/";
    if (pathname === item.href || pathname.startsWith(item.href + "/")) return true;
    if (item.children) return item.children.some((c) => pathname.startsWith(c.href));
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-[900] transition-colors duration-300 ${
        discroll || menuTerbuka
          ? "bg-krem/95 shadow-md backdrop-blur"
          : "bg-krem/80 backdrop-blur"
      }`}
    >
      <nav
        className="container-desa flex items-center justify-between py-3"
        aria-label="Navigasi utama"
      >
        {/* Logo / nama desa */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-hutan-700 text-white">
            <IconMapPin size={22} stroke={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold text-hutan-900">
              {site.namaDesa}
            </span>
            <span className="block text-[11px] uppercase tracking-wider text-tinta-600">
              Kec. {site.kecamatan}, {site.kabupaten}
            </span>
          </span>
        </Link>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isAktif(item)
                      ? "bg-hutan-100 text-hutan-800"
                      : "text-tinta hover:bg-hutan-100/60 hover:text-hutan-800"
                  }`}
                  aria-haspopup="true"
                >
                  {item.label}
                  <IconChevronDown
                    size={15}
                    className="transition-transform group-hover:rotate-180"
                  />
                </Link>
                {/* Dropdown desktop (muncul saat hover/fokus) */}
                <ul className="invisible absolute left-0 top-full min-w-[210px] translate-y-1 rounded-2xl border border-krem-200 bg-white p-2 opacity-0 shadow-lift transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className={`block rounded-xl px-3 py-2 text-sm transition-colors ${
                          pathname === child.href
                            ? "bg-hutan-100 text-hutan-800"
                            : "text-tinta hover:bg-hutan-100/60"
                        }`}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isAktif(item)
                      ? "bg-hutan-100 text-hutan-800"
                      : "text-tinta hover:bg-hutan-100/60 hover:text-hutan-800"
                  }`}
                  aria-current={isAktif(item) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Tombol hamburger (mobile/tablet) */}
        <button
          type="button"
          onClick={() => setMenuTerbuka((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg text-hutan-800 hover:bg-hutan-100 lg:hidden"
          aria-label={menuTerbuka ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuTerbuka}
        >
          {menuTerbuka ? <IconX size={24} /> : <IconMenu2 size={24} />}
        </button>
      </nav>

      {/* Menu mobile (drawer) */}
      {menuTerbuka && (
        <div className="border-t border-krem-200 bg-krem lg:hidden">
          <ul className="container-desa flex flex-col gap-1 py-3">
            {navItems.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      className={`flex-1 rounded-lg px-3 py-2.5 font-medium ${
                        isAktif(item) ? "text-hutan-800" : "text-tinta"
                      }`}
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDropdownTerbuka((v) => !v)}
                      className="grid h-10 w-10 place-items-center rounded-lg text-hutan-800 hover:bg-hutan-100"
                      aria-label="Buka submenu"
                      aria-expanded={dropdownTerbuka}
                    >
                      <IconChevronDown
                        size={18}
                        className={`transition-transform ${dropdownTerbuka ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                  {dropdownTerbuka && (
                    <ul className="ml-3 border-l-2 border-hutan-100 pl-3">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={`block rounded-lg px-3 py-2 text-sm ${
                              pathname === child.href
                                ? "text-hutan-800"
                                : "text-tinta-600"
                            }`}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block rounded-lg px-3 py-2.5 font-medium ${
                      isAktif(item)
                        ? "bg-hutan-100 text-hutan-800"
                        : "text-tinta"
                    }`}
                    aria-current={isAktif(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
