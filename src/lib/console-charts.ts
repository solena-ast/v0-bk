import type { Industry } from "@/lib/industries";
import type { ConsoleCharts } from "@/components/bk/charts";

const MONTHS = ["JAN", "MAR", "MAY", "JUL", "SEP", "NOV", "NOW"];

const pctOf = (v?: string) => {
  const m = v?.match(/(\d+(?:\.\d+)?)\s*%/);
  return m ? Number(m[1]) : undefined;
};

/** Transport-specific console: direct bookings, route conversion, charter pipeline, fleet utilisation. */
export const transportCharts: ConsoleCharts = {
  donut: { pct: 58, caption: "TICKETING · VS 27% AT INTAKE" },
  gauge: { pct: 84, label: "FLEET UTILISATION", caption: "22 COACHES · +23 PTS" },
  trend: {
    points: [1180, 1240, 1390, 1420, 1610, 1780, 1944],
    labels: MONTHS,
    caption: "DIRECT SEATS / WEEK",
  },
  bars: [
    { label: "Direct ticketing", pct: 62, value: "18,420" },
    { label: "Charter & groups", pct: 28, value: "312" },
    { label: "Broker / OTA", pct: 31, value: "9,110" },
    { label: "Commuter passes", pct: 14, value: "1,240" },
  ],
  funnel: [
    { label: "Route views", value: "184k", pct: 100 },
    { label: "Seat selected", value: "31.2k", pct: 66 },
    { label: "Checkout", value: "13.9k", pct: 44 },
    { label: "Tickets sold", value: "11.8k", pct: 30 },
  ],
};

const charterPipeline = [
  { label: "Enquiries", value: "486", pct: 100 },
  { label: "Quoted", value: "351", pct: 70 },
  { label: "Negotiation", value: "168", pct: 46 },
  { label: "Confirmed", value: "312 · $824k", pct: 28 },
];

export function chartsFor(industry: Industry): ConsoleCharts {
  if (industry.slug === "coach-transport") {
    return { ...transportCharts, funnel: charterPipeline };
  }

  const stats = industry.dashboard.stats;
  const donutPct = pctOf(stats[0]?.value) ?? 64;
  const gaugeStat = stats.find((s) => pctOf(s.value) !== undefined && s !== stats[0]) ?? stats[0];

  const rows = industry.dashboard.rows;
  const bars = rows.slice(0, 4).map((r, i) => ({
    label: r.name,
    pct: Math.max(14, 80 - i * 17),
    value: r.a,
  }));

  return {
    donut: { pct: donutPct, caption: industry.dashboard.kpi.toUpperCase().slice(0, 26) },
    gauge: {
      pct: pctOf(gaugeStat?.value) ?? 72,
      label: (gaugeStat?.label ?? "Occupancy").toUpperCase(),
      caption: gaugeStat?.delta ? gaugeStat.delta.toUpperCase() : "TRAILING 30 DAYS",
    },
    trend: { points: [42, 46, 51, 55, 63, 71, 82], labels: MONTHS, caption: "OWNED DEMAND INDEX" },
    bars,
  };
}
