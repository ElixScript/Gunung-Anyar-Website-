"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { formatAngka } from "@/lib/data";

/*
  ============================================================
  DASHBOARD STATISTIK (Chart.js v4 + react-chartjs-2)
  ============================================================
  Semua grafik memakai data dari data/statistik.json.
  Setiap kartu grafik: judul + grafik + kalimat insight + sumber & tahun.
*/

// Registrasi modul Chart.js yang dipakai (wajib di v4)
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

// Palet warna grafik (selaras identitas visual desa)
const WARNA = {
  hutan: "#2d5016",
  hutanMedium: "#4a7c2e",
  hutanTerang: "#6b9a4f",
  emas: "#d9a441",
  terakota: "#c15f3c",
  biru: "#185fa5",
  ungu: "#534ab7",
  tosca: "#0f6e56",
};
const PALET_KATEGORI = [
  WARNA.hutanMedium, WARNA.emas, WARNA.terakota, WARNA.biru,
  WARNA.ungu, WARNA.tosca, WARNA.hutanTerang,
];

// Opsi umum: responsif & tidak mengunci rasio (tinggi diatur wadah)
const opsiDasar = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { labels: { font: { family: "Inter" }, color: "#46503f", usePointStyle: true } },
    tooltip: {
      backgroundColor: "#1e2a1a",
      titleFont: { family: "Inter" },
      bodyFont: { family: "Inter" },
      padding: 10,
      cornerRadius: 8,
    },
  },
};

// Wadah satu kartu grafik
function ChartCard({ judul, insight, sumber, children }) {
  return (
    <div className="flex flex-col rounded-card border border-krem-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-hutan-900">{judul}</h3>
      <div className="relative mt-4 h-64">{children}</div>
      {insight && <p className="mt-4 text-sm leading-relaxed text-tinta-600">{insight}</p>}
      {sumber && (
        <p className="mt-3 border-t border-krem-200 pt-2 text-xs text-tinta-600/70">
          Sumber: {sumber}
        </p>
      )}
    </div>
  );
}

export default function StatCharts({ data }) {
  const sumberUmum = `${data.sumber_data}`;

  // 1) Penduduk per dusun (bar berkelompok laki/perempuan)
  const dusunData = {
    labels: data.penduduk_per_dusun.map((d) => d.dusun.replace("Dusun ", "")),
    datasets: [
      {
        label: "Laki-laki",
        data: data.penduduk_per_dusun.map((d) => d.laki_laki),
        backgroundColor: WARNA.hutanMedium,
        borderRadius: 6,
      },
      {
        label: "Perempuan",
        data: data.penduduk_per_dusun.map((d) => d.perempuan),
        backgroundColor: WARNA.emas,
        borderRadius: 6,
      },
    ],
  };

  // 2) Mata pencaharian (donut)
  const kerjaData = {
    labels: data.mata_pencaharian.map((m) => m.jenis),
    datasets: [
      {
        data: data.mata_pencaharian.map((m) => m.jumlah),
        backgroundColor: PALET_KATEGORI,
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };
  const kerjaTerbanyak = [...data.mata_pencaharian].sort((a, b) => b.jumlah - a.jumlah)[0];

  // 3) Piramida penduduk (bar horizontal; laki-laki = nilai negatif)
  const piramidaData = {
    labels: data.kelompok_usia.map((u) => u.kelompok),
    datasets: [
      {
        label: "Laki-laki",
        data: data.kelompok_usia.map((u) => -u.laki_laki),
        backgroundColor: WARNA.hutanMedium,
        borderRadius: 4,
      },
      {
        label: "Perempuan",
        data: data.kelompok_usia.map((u) => u.perempuan),
        backgroundColor: WARNA.emas,
        borderRadius: 4,
      },
    ],
  };
  const opsiPiramida = {
    ...opsiDasar,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        ticks: {
          // Tampilkan angka absolut (buang tanda minus untuk sisi laki-laki)
          callback: (v) => formatAngka(Math.abs(v)),
          font: { family: "Inter" },
        },
        grid: { color: "#f0e9db" },
      },
      y: { stacked: true, grid: { display: false }, ticks: { font: { family: "Inter" } } },
    },
    plugins: {
      ...opsiDasar.plugins,
      tooltip: {
        ...opsiDasar.plugins.tooltip,
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${formatAngka(Math.abs(ctx.parsed.x))} jiwa`,
        },
      },
    },
  };

  // 4) Tren jumlah penduduk 5 tahun (line)
  const trenData = {
    labels: data.tren_penduduk_5_tahun.map((t) => t.tahun),
    datasets: [
      {
        label: "Jumlah penduduk",
        data: data.tren_penduduk_5_tahun.map((t) => t.jumlah),
        borderColor: WARNA.hutan,
        backgroundColor: "rgba(74,124,46,0.15)",
        fill: true,
        tension: 0.35,
        pointBackgroundColor: WARNA.emas,
        pointRadius: 4,
      },
    ],
  };
  const tren = data.tren_penduduk_5_tahun;
  const pertumbuhan = tren.length > 1 ? tren[tren.length - 1].jumlah - tren[0].jumlah : 0;

  // 5) Tingkat pendidikan (bar horizontal)
  const pendidikanData = {
    labels: data.tingkat_pendidikan.map((p) => p.jenjang),
    datasets: [
      {
        label: "Jumlah warga",
        data: data.tingkat_pendidikan.map((p) => p.jumlah),
        backgroundColor: WARNA.tosca,
        borderRadius: 6,
      },
    ],
  };

  // 6) Skor IDM (gauge setengah lingkaran)
  const idm = data.idm;
  const idmData = {
    labels: ["Skor", "Sisa"],
    datasets: [
      {
        data: [idm.skor * 100, 100 - idm.skor * 100],
        backgroundColor: [WARNA.emas, "#f0e9db"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "72%",
      },
    ],
  };
  const opsiIdm = {
    ...opsiDasar,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* 1. Penduduk per dusun */}
      <ChartCard
        judul="Jumlah Penduduk per Dusun"
        insight={`Dusun dengan penduduk terbanyak menjadi pusat aktivitas warga. Total penduduk desa ${formatAngka(data.ringkasan.jumlah_penduduk)} jiwa yang tersebar di ${data.ringkasan.jumlah_dusun} dusun.`}
        sumber={sumberUmum}
      >
        <Bar
          data={dusunData}
          options={{
            ...opsiDasar,
            scales: {
              x: { grid: { display: false }, ticks: { font: { family: "Inter" } } },
              y: { grid: { color: "#f0e9db" }, ticks: { font: { family: "Inter" } } },
            },
          }}
        />
      </ChartCard>

      {/* 2. Mata pencaharian */}
      <ChartCard
        judul="Komposisi Mata Pencaharian"
        insight={`Sebagian besar warga bekerja sebagai ${kerjaTerbanyak.jenis.toLowerCase()} (${formatAngka(kerjaTerbanyak.jumlah)} orang), menegaskan corak desa yang bertumpu pada sektor pertanian.`}
        sumber={sumberUmum}
      >
        <Doughnut
          data={kerjaData}
          options={{
            ...opsiDasar,
            plugins: {
              ...opsiDasar.plugins,
              legend: { ...opsiDasar.plugins.legend, position: "right" },
            },
          }}
        />
      </ChartCard>

      {/* 3. Piramida penduduk */}
      <ChartCard
        judul="Struktur Usia & Jenis Kelamin"
        insight="Piramida penduduk menunjukkan sebaran usia produktif (25–44 tahun) yang cukup besar — potensi tenaga kerja bagi pembangunan desa."
        sumber={sumberUmum}
      >
        <Bar data={piramidaData} options={opsiPiramida} />
      </ChartCard>

      {/* 4. Tren penduduk */}
      <ChartCard
        judul="Tren Jumlah Penduduk (5 Tahun)"
        insight={`Jumlah penduduk ${pertumbuhan >= 0 ? "bertambah" : "berkurang"} sekitar ${formatAngka(Math.abs(pertumbuhan))} jiwa dalam lima tahun terakhir, menandakan pertumbuhan yang relatif stabil.`}
        sumber={sumberUmum}
      >
        <Line
          data={trenData}
          options={{
            ...opsiDasar,
            scales: {
              x: { grid: { display: false }, ticks: { font: { family: "Inter" } } },
              y: { grid: { color: "#f0e9db" }, ticks: { font: { family: "Inter" } } },
            },
          }}
        />
      </ChartCard>

      {/* 5. Tingkat pendidikan */}
      <ChartCard
        judul="Tingkat Pendidikan Terakhir"
        insight="Peningkatan jumlah lulusan SMA dan perguruan tinggi menunjukkan makin tingginya kesadaran warga terhadap pendidikan."
        sumber={sumberUmum}
      >
        <Bar
          data={pendidikanData}
          options={{
            ...opsiDasar,
            indexAxis: "y",
            plugins: { ...opsiDasar.plugins, legend: { display: false } },
            scales: {
              x: { grid: { color: "#f0e9db" }, ticks: { font: { family: "Inter" } } },
              y: { grid: { display: false }, ticks: { font: { family: "Inter" } } },
            },
          }}
        />
      </ChartCard>

      {/* 6. Skor IDM (gauge) */}
      <ChartCard
        judul="Indeks Desa Membangun (IDM)"
        insight={`Dengan skor ${idm.skor.toFixed(4)}, desa berstatus "${idm.status}". Status ini menjadi acuan arah program pembangunan berikutnya.`}
        sumber={`Kemendesa PDTT, ${idm.tahun}`}
      >
        <div className="relative h-full">
          <Doughnut data={idmData} options={opsiIdm} />
          {/* Angka & status di tengah gauge */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-4 text-center">
            <span className="font-display text-4xl font-semibold text-hutan-900">
              {idm.skor.toFixed(3)}
            </span>
            <span className="mt-1 rounded-full bg-emas-100 px-3 py-1 text-sm font-semibold text-emas-600">
              {idm.status}
            </span>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
