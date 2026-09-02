import type { ReactNode } from "react";

/**
 * Reusable, animated console charts.
 * All strokes/fills use design tokens (cocoa / bronze / hairline / espresso).
 */

const COCOA = "var(--cocoa)";
const BRONZE = "var(--bronze)";
const HAIR = "var(--hairline)";
const INK = "var(--espresso)";

function Mono({
  x, y, children, size = 8, anchor = "start", opacity = 1, fill = INK,
}: {
  x: number; y: number; children: ReactNode; size?: number;
  anchor?: "start" | "middle" | "end"; opacity?: number; fill?: string;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily="var(--font-mono)" fontSize={size} letterSpacing="1.4" fill={fill} opacity={opacity}>
      {children}
    </text>
  );
}

function Card({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <div className="border hairline rounded-md p-4 bg-[var(--linen)]">
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-espresso/75">{title}</span>
        {note && <span className="font-mono text-[10px] text-bronze">{note}</span>}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

/* ---------------- primitives ---------------- */

export function DonutChart({ pct, center, caption }: { pct: number; center?: string; caption?: string }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const on = (Math.min(100, Math.max(0, pct)) / 100) * c;
  return (
    <svg viewBox="0 0 160 128" role="img" aria-label={caption ?? `${pct} percent`} className="w-full h-auto">
      <circle cx="80" cy="62" r={r} fill="none" stroke={HAIR} strokeWidth="10" />
      <circle cx="80" cy="62" r={r} fill="none" stroke={BRONZE} strokeWidth="10" strokeDasharray={`${on} ${c}`} transform="rotate(-90 80 62)">
        <animate attributeName="stroke-dasharray" values={`0 ${c};${on} ${c}`} dur="1.3s" fill="freeze" />
      </circle>
      <circle cx="80" cy="62" r={r - 16} fill="none" stroke={HAIR} strokeWidth="1" opacity="0.7" />
      <text x="80" y="68" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="26" fill={COCOA}>
        {center ?? `${pct}%`}
      </text>
      {caption && <Mono x={80} y={118} anchor="middle" size={7} opacity={0.7}>{caption}</Mono>}
    </svg>
  );
}

export function AreaChart({ points, labels, caption }: { points: number[]; labels?: string[]; caption?: string }) {
  const w = 300, h = 120, pad = 14;
  const max = Math.max(...points) * 1.12 || 1;
  const min = Math.min(...points) * 0.85;
  const sx = (i: number) => pad + (i * (w - pad * 2)) / (points.length - 1);
  const sy = (v: number) => h - 26 - ((v - min) / (max - min || 1)) * (h - 52);
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${sx(i).toFixed(1)} ${sy(p).toFixed(1)}`).join(" ");
  const area = `${line} L ${sx(points.length - 1)} ${h - 26} L ${pad} ${h - 26} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label={caption ?? "trend"} className="w-full h-auto">
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={pad} y1={20 + i * 22} x2={w - pad} y2={20 + i * 22} stroke={HAIR} strokeWidth="1" />
      ))}
      <path d={area} fill={BRONZE} opacity="0.1" />
      <path d={line} fill="none" stroke={COCOA} strokeWidth="1.8" strokeDasharray="600" strokeDashoffset="600">
        <animate attributeName="stroke-dashoffset" values="600;0" dur="1.8s" fill="freeze" />
      </path>
      {points.map((p, i) => (
        <circle key={i} cx={sx(i)} cy={sy(p)} r={i === points.length - 1 ? 3.4 : 1.8} fill={i === points.length - 1 ? BRONZE : COCOA} opacity={i === points.length - 1 ? 1 : 0.5} />
      ))}
      {labels?.map((l, i) => (
        <Mono key={l + i} x={sx(i)} y={h - 10} anchor="middle" size={7} opacity={0.6}>{l}</Mono>
      ))}
    </svg>
  );
}

export function BarRows({ rows }: { rows: { label: string; pct: number; value?: string }[] }) {
  return (
    <svg viewBox={`0 0 300 ${rows.length * 26 + 8}`} role="img" aria-label="distribution" className="w-full h-auto">
      {rows.map((r, i) => {
        const y = 12 + i * 26;
        const wpx = (Math.min(100, r.pct) / 100) * 150;
        return (
          <g key={r.label}>
            <Mono x={0} y={y + 7} size={7.5} opacity={0.8}>{r.label.toUpperCase()}</Mono>
            <rect x={110} y={y} width="150" height="9" fill={HAIR} opacity="0.6" rx="1" />
            <rect x={110} y={y} height="9" rx="1" fill={i === 0 ? BRONZE : COCOA} opacity={i === 0 ? 0.9 : 0.55} width={wpx}>
              <animate attributeName="width" values={`0;${wpx}`} dur="1.1s" begin={`${i * 0.12}s`} fill="freeze" />
            </rect>
            <Mono x={300} y={y + 7} anchor="end" size={7.5} opacity={0.75}>{r.value ?? `${r.pct}%`}</Mono>
          </g>
        );
      })}
    </svg>
  );
}

export function GaugeChart({ pct, label, caption }: { pct: number; label?: string; caption?: string }) {
  const len = 176;
  const on = (Math.min(100, pct) / 100) * len;
  const angle = -90 + (Math.min(100, pct) / 100) * 180;
  return (
    <svg viewBox="0 0 160 128" role="img" aria-label={caption ?? `${pct} percent`} className="w-full h-auto">
      <path d="M 24 96 A 56 56 0 0 1 136 96" fill="none" stroke={HAIR} strokeWidth="10" />
      <path d="M 24 96 A 56 56 0 0 1 136 96" fill="none" stroke={BRONZE} strokeWidth="10" strokeDasharray={`${on} ${len}`}>
        <animate attributeName="stroke-dasharray" values={`0 ${len};${on} ${len}`} dur="1.5s" fill="freeze" />
      </path>
      <g>
        <line x1="80" y1="96" x2="80" y2="52" stroke={COCOA} strokeWidth="1.8">
          <animateTransform attributeName="transform" type="rotate" values={`-90 80 96;${angle} 80 96`} dur="1.5s" fill="freeze" />
        </line>
      </g>
      <circle cx="80" cy="96" r="3.5" fill={COCOA} />
      <text x="80" y="86" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="22" fill={COCOA}>{pct}%</text>
      {label && <Mono x={80} y={112} anchor="middle" size={7.5}>{label}</Mono>}
      {caption && <Mono x={80} y={124} anchor="middle" size={6.5} opacity={0.65}>{caption}</Mono>}
    </svg>
  );
}

/** Pipeline funnel — stages narrowing toward closed value. */
export function FunnelChart({ stages }: { stages: { label: string; value: string; pct: number }[] }) {
  const w = 600;
  return (
    <svg viewBox={`0 0 ${w} ${stages.length * 46 + 12}`} role="img" aria-label="pipeline funnel" className="w-full h-auto">
      {stages.map((s, i) => {
        const y = 8 + i * 46;
        const bw = Math.max(180, (s.pct / 100) * 460);
        const x = (w - bw) / 2;
        return (
          <g key={s.label}>
            <rect x={x} y={y} width={bw} height="34" rx="3" fill={i === stages.length - 1 ? BRONZE : COCOA} opacity={0.12 + i * 0.1}>
              <animate attributeName="width" values={`0;${bw}`} dur="1s" begin={`${i * 0.1}s`} fill="freeze" />
              <animate attributeName="x" values={`${w / 2};${x}`} dur="1s" begin={`${i * 0.1}s`} fill="freeze" />
            </rect>
            <Mono x={w / 2} y={y + 22} anchor="middle" size={11} fill={COCOA}>{`${s.label.toUpperCase()} · ${s.value}`}</Mono>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- console preview ---------------- */

export type ConsoleCharts = {
  donut: { pct: number; caption: string };
  gauge: { pct: number; label: string; caption: string };
  trend: { points: number[]; labels: string[]; caption: string };
  bars: { label: string; pct: number; value?: string }[];
  funnel?: { label: string; value: string; pct: number }[];
};

export function ConsoleCharts_({ charts }: { charts: ConsoleCharts }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card title="Direct share" note="live">
        <DonutChart pct={charts.donut.pct} caption={charts.donut.caption} />
      </Card>
      <Card title={charts.gauge.label} note="live">
        <GaugeChart pct={charts.gauge.pct} label={charts.gauge.label} caption={charts.gauge.caption} />
      </Card>
      <Card title="Pacing" note={charts.trend.caption}>
        <AreaChart points={charts.trend.points} labels={charts.trend.labels} caption={charts.trend.caption} />
      </Card>
      <Card title="Channel mix">
        <BarRows rows={charts.bars} />
      </Card>
      {charts.funnel && (
        <div className="sm:col-span-2">
          <Card title="Pipeline">
            <FunnelChart stages={charts.funnel} />
          </Card>
        </div>
      )}
    </div>
  );
}
