"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  IconBuildingCommunity,
  IconBuildingChurch,
  IconCake,
  IconMap2,
  IconSchool,
  IconUsers,
} from "@tabler/icons-react";
import { formatAngka } from "@/lib/data";

/*
  ============================================================
  DASHBOARD STATISTIK DESA GUNUNG ANYAR (Chart.js v4)
  ============================================================
  Sumber angka: data/statistik.json (data administrasi desa).
  Setiap kartu: judul + visual + kalimat insight + sumber.
*/

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

// Palet selaras identitas visual desa (lihat app/globals.css @theme)
const WARNA = {
  hutan700: "#2d5016",
  hutan600: "#3c6a1e",
  hutan500: "#4a7c2e",
  hutan400: "#6b9a4f",
  hutan300: "#9cbd84",
  emas500: "#d9a441",
  krem200: "#f0e9db",
  tinta600: "#46503f",
};

// Gradien vertikal untuk batang (bawah terang → atas tua) — dipakai scriptable
function gradienBatang(ctx, dari, ke) {
  const { chart } = ctx;
  const area = chart.chartArea;
  if (!area) return dari; // sebelum layout siap
  const g = chart.ctx.createLinearGradient(0, area.bottom, 0, area.top);
  g.addColorStop(0, dari);
  g.addColorStop(1, ke);
  return g;
}

// Opsi umum: responsif, tinggi diatur wadah, animasi tumbuh halus
const opsiDasar = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 1100, easing: "easeOutQuart" },
  plugins: {
    legend: {
      labels: { font: { family: "Inter" }, color: WARNA.tinta600, usePointStyle: true, boxWidth: 8 },
    },
    tooltip: {
      backgroundColor: "#1e2a1a",
      titleFont: { family: "Inter" },
      bodyFont: { family: "Inter" },
      padding: 10,
      cornerRadius: 8,
      displayColors: false,
    },
  },
};

// Plugin ringan: tulis nilai di atas tiap batang (direct label, lebih mudah dibaca)
const labelNilaiAtas = {
  id: "labelNilaiAtas",
  afterDatasetsDraw(chart) {
    const meta = chart.getDatasetMeta(0);
    if (!meta) return;
    const { ctx } = chart;
    ctx.save();
    ctx.font = "600 12px Inter, sans-serif";
    ctx.fillStyle = WARNA.hutan700;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    meta.data.forEach((bar, i) => {
      const v = chart.data.datasets[0].data[i];
      if (v == null) return;
      ctx.fillText(formatAngka(v), bar.x, bar.y - 6);
    });
    ctx.restore();
  },
};

/* ---------- Kartu pembungkus generik ---------- */
function Kartu({ judul, ikon: Ikon, insight, sumber, className = "", children }) {
  return (
    <div
      className={`flex flex-col rounded-card border border-krem-200 bg-white p-5 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-hutan-300/60 hover:shadow-float ${className}`}
    >
      <div className="flex items-center gap-2.5">
        {Ikon && (
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-hutan-100 to-hutan-300/50 text-hutan-700">
            <Ikon size={18} stroke={1.75} />
          </span>
        )}
        <h3 className="text-lg font-semibold text-hutan-900">{judul}</h3>
      </div>
      <div className="mt-4 flex-1">{children}</div>
      {insight && <p className="mt-4 text-sm leading-relaxed text-tinta-600">{insight}</p>}
      {sumber && (
        <p className="mt-3 border-t border-krem-200 pt-2 text-xs text-tinta-600/70">
          Sumber: {sumber}
        </p>
      )}
    </div>
  );
}

/* ---------- Breakdown agama (data didominasi satu kategori) ---------- */
function BreakdownAgama({ data }) {
  const total = data.reduce((s, a) => s + a.jumlah, 0);
  const maks = Math.max(...data.map((a) => a.jumlah), 1);
  const persenTeks = (n) => {
    if (n === 0) return "0%";
    const p = (n / total) * 100;
    if (p < 0.1) return "<0,1%";
    return `${p.toLocaleString("id-ID", { maximumFractionDigits: 1 })}%`;
  };

  return (
    <ul className="space-y-3">
      {data.map((a) => {
        const kosong = a.jumlah === 0;
        const lebar = kosong ? 0 : Math.max((a.jumlah / maks) * 100, 2);
        return (
          <li key={a.nama}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className={kosong ? "text-tinta-600/45" : "font-medium text-hutan-900"}>
                {a.nama}
              </span>
              <span className="shrink-0 tabular-nums">
                <span className={kosong ? "text-tinta-600/45" : "font-semibold text-hutan-900"}>
                  {formatAngka(a.jumlah)}
                </span>
                <span className="ml-1.5 text-xs text-tinta-600/70">{persenTeks(a.jumlah)}</span>
              </span>
            </div>
            <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-krem-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-hutan-400 to-hutan-700 transition-[width] duration-1000 ease-out"
                style={{ width: `${lebar}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Tile angka besar (wilayah / sekolah) ---------- */
function Tile({ ikon: Ikon, nilai, label, sub }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-krem-200 bg-gradient-to-br from-krem to-hutan-100/50 p-4 text-center">
      {Ikon && (
        <span className="mb-2 grid h-10 w-10 place-items-center rounded-full bg-white/70 text-hutan-700 shadow-sm">
          <Ikon size={20} stroke={1.75} />
        </span>
      )}
      <span className="font-display text-3xl font-semibold leading-none text-hutan-900">
        {formatAngka(nilai)}
      </span>
      <span className="mt-1.5 text-sm font-medium text-hutan-800">{label}</span>
      {sub && <span className="mt-0.5 text-xs text-tinta-600/70">{sub}</span>}
    </div>
  );
}

export default function StatCharts({ data }) {
  const sumber = data.sumber_data;
  const totalPenduduk = data.ringkasan.jumlah_penduduk;

  /* 1) Rentang usia — bar vertikal, satu seri, gradien + label nilai */
  const usiaData = {
    labels: data.rentang_usia.map((u) => u.kelompok),
    datasets: [
      {
        label: "Jumlah jiwa",
        data: data.rentang_usia.map((u) => u.jumlah),
        backgroundColor: (ctx) => gradienBatang(ctx, WARNA.hutan400, WARNA.hutan700),
        hoverBackgroundColor: (ctx) => gradienBatang(ctx, WARNA.hutan500, WARNA.hutan700),
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 84,
      },
    ],
  };
  const usiaTertinggi = [...data.rentang_usia].sort((a, b) => b.jumlah - a.jumlah)[0];
  const opsiUsia = {
    ...opsiDasar,
    layout: { padding: { top: 22 } },
    plugins: {
      ...opsiDasar.plugins,
      legend: { display: false },
      tooltip: {
        ...opsiDasar.plugins.tooltip,
        callbacks: { label: (c) => `${formatAngka(c.parsed.y)} jiwa` },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { family: "Inter" }, color: WARNA.tinta600 } },
      y: {
        beginAtZero: true,
        grid: { color: WARNA.krem200 },
        ticks: { font: { family: "Inter" }, color: WARNA.tinta600, callback: (v) => formatAngka(v) },
      },
    },
  };

  /* 2) Jenis kelamin — donut + total di tengah */
  const jk = data.jenis_kelamin;
  const jkData = {
    labels: jk.map((g) => g.kategori),
    datasets: [
      {
        data: jk.map((g) => g.jumlah),
        backgroundColor: [WARNA.hutan500, WARNA.emas500],
        borderColor: "#fff",
        borderWidth: 3,
        hoverOffset: 6,
      },
    ],
  };
  const opsiJk = {
    ...opsiDasar,
    cutout: "68%",
    plugins: {
      ...opsiDasar.plugins,
      legend: { ...opsiDasar.plugins.legend, position: "bottom" },
      tooltip: {
        ...opsiDasar.plugins.tooltip,
        callbacks: {
          label: (c) => {
            const p = ((c.parsed / totalPenduduk) * 100).toLocaleString("id-ID", { maximumFractionDigits: 1 });
            return `${c.label}: ${formatAngka(c.parsed)} jiwa (${p}%)`;
          },
        },
      },
    },
  };
  const lk = jk.find((g) => g.kategori === "Laki-laki")?.jumlah ?? 0;
  const pr = jk.find((g) => g.kategori === "Perempuan")?.jumlah ?? 0;
  const rasio = pr ? Math.round((lk / pr) * 100) : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 1. Rentang usia — lebar penuh */}
      <Kartu
        className="lg:col-span-2"
        ikon={IconCake}
        judul="Sebaran Penduduk menurut Rentang Usia"
        insight={`Kelompok usia produktif 19–59 tahun mendominasi dengan ${formatAngka(
          usiaTertinggi.jumlah
        )} jiwa, diikuti kelompok 16–18 tahun (1.152 jiwa) — menandakan besarnya potensi tenaga kerja sekaligus usia sekolah menengah di desa.`}
        sumber={sumber}
      >
        <div className="relative h-72 sm:h-80">
          <Bar data={usiaData} options={opsiUsia} plugins={[labelNilaiAtas]} />
        </div>
      </Kartu>

      {/* 2. Jenis kelamin — donut */}
      <Kartu
        ikon={IconUsers}
        judul="Komposisi Jenis Kelamin"
        insight={`Jumlah perempuan (${formatAngka(pr)} jiwa) sedikit lebih banyak dari laki-laki (${formatAngka(
          lk
        )} jiwa), dengan rasio jenis kelamin sekitar ${rasio} laki-laki per 100 perempuan.`}
        sumber={sumber}
      >
        <div className="relative h-64">
          <Doughnut data={jkData} options={opsiJk} />
          {/* Total di tengah donut */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center pb-8 text-center">
            <span className="font-display text-3xl font-semibold text-hutan-900">
              {formatAngka(totalPenduduk)}
            </span>
            <span className="text-xs font-medium uppercase tracking-wide text-tinta-600/80">
              Total Jiwa
            </span>
          </div>
        </div>
      </Kartu>

      {/* 3. Agama — breakdown */}
      <Kartu
        ikon={IconBuildingChurch}
        judul="Penduduk menurut Agama"
        insight="Mayoritas warga memeluk agama Islam (99,8%), dengan keberagaman kecil dari pemeluk Kristen dan Katolik yang hidup berdampingan secara rukun."
        sumber={sumber}
      >
        <BreakdownAgama data={data.agama} />
      </Kartu>

      {/* 4. Wilayah administratif — tiles */}
      <Kartu
        ikon={IconBuildingCommunity}
        judul="Pembagian Wilayah Administratif"
        insight={`Wilayah desa terbagi menjadi ${data.wilayah_administratif.rw} Rukun Warga (RW) dan ${data.wilayah_administratif.rt} Rukun Tetangga (RT) yang menjangkau seluruh dusun.`}
        sumber={sumber}
      >
        <div className="grid h-full grid-cols-2 gap-4">
          <Tile ikon={IconBuildingCommunity} nilai={data.wilayah_administratif.rw} label="Rukun Warga" sub="RW" />
          <Tile ikon={IconMap2} nilai={data.wilayah_administratif.rt} label="Rukun Tetangga" sub="RT" />
        </div>
      </Kartu>

      {/* 5. Jumlah sekolah — tiles */}
      <Kartu
        ikon={IconSchool}
        judul="Sarana Pendidikan"
        insight={`Tersedia ${data.ringkasan.jumlah_sekolah} satuan pendidikan — ${data.sekolah
          .map((s) => `${s.jumlah} ${s.jenjang}`)
          .join(", ")} — yang menopang akses belajar dari jenjang dasar hingga menengah.`}
        sumber={sumber}
      >
        <div className="grid h-full grid-cols-3 gap-3">
          {data.sekolah.map((s) => (
            <Tile key={s.jenjang} ikon={IconSchool} nilai={s.jumlah} label={s.jenjang} />
          ))}
        </div>
      </Kartu>
    </div>
  );
}
