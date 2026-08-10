import type { ReactNode } from "react";
import { Eyebrow, SectionHead } from "./shared";

/**
 * Hand-drawn animated diagrams communicating BK Studio's vision, plus
 * snapshot infographics lifted from the client consoles.
 * All strokes use design tokens (cocoa / bronze / hairline) — no hardcoded colors.
 */

const COCOA = "var(--cocoa)";
const BRONZE = "var(--bronze)";
const HAIR = "var(--hairline)";
const INK = "var(--espresso)";

function Frame({
  children,
  label,
  ratio = "0 0 320 220",
}: {
  children: ReactNode;
  label: string;
  ratio?: string;
}) {
  return (
    <svg viewBox={ratio} role="img" aria-label={label} className="w-full h-auto overflow-visible">
      <title>{label}</title>
      {children}
    </svg>
  );
}

function Mono({
  x,
  y,
  children,
  size = 8,
  anchor = "start",
  opacity = 1,
  fill = INK,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  anchor?: "start" | "middle" | "end";
  opacity?: number;
  fill?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="var(--font-mono)"
      fontSize={size}
      letterSpacing="1.5"
      fill={fill}
      opacity={opacity}
    >
      {children}
    </text>
  );
}

/* 01 — Rented attention converges into an owned funnel */
export function SvgGravity() {
  const sources = [
    [24, 34, "OTA"],
    [24, 66, "BROKER"],
    [24, 98, "SOCIAL"],
    [24, 130, "SEARCH"],
    [24, 162, "REFERRAL"],
  ] as const;
  return (
    <Frame label="Rented, scattered demand converging into one owned booking funnel">
      {sources.map(([x, y, t], i) => (
        <g key={t}>
          <rect x={x} y={y - 10} width="66" height="20" rx="2" fill="none" stroke={HAIR} strokeWidth="1" />
          <Mono x={x + 8} y={y + 3} size={7} opacity={0.85}>
            {t}
          </Mono>
          <path
            d={`M ${x + 68} ${y} C ${x + 120} ${y} 150 110 176 110`}
            fill="none"
            stroke={HAIR}
            strokeWidth="1"
            className="flow-dash"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle r="2.4" fill={BRONZE}>
            <animateMotion
              dur={`${3.6 + i * 0.4}s`}
              repeatCount="indefinite"
              begin={`${i * 0.5}s`}
              path={`M ${x + 68} ${y} C ${x + 120} ${y} 150 110 176 110`}
            />
            <animate attributeName="opacity" values="0;1;1;0" dur={`${3.6 + i * 0.4}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}

      {/* Funnel body */}
      <path d="M 176 74 L 244 74 L 222 128 L 198 128 Z" fill="none" stroke={COCOA} strokeWidth="1.2" />
      <path d="M 180 88 L 240 88" stroke={HAIR} strokeWidth="1" />
      <path d="M 188 108 L 232 108" stroke={HAIR} strokeWidth="1" />
      <rect x="198" y="128" width="24" height="34" fill="none" stroke={COCOA} strokeWidth="1.2" />
      <rect x="198" y="150" width="24" height="12" fill={BRONZE} opacity="0.28">
        <animate attributeName="height" values="4;12;4" dur="6s" repeatCount="indefinite" />
        <animate attributeName="y" values="158;150;158" dur="6s" repeatCount="indefinite" />
      </rect>
      <Mono x={210} y={178} anchor="middle" size={7.5}>
        OWNED
      </Mono>
      <line x1="252" y1="110" x2="300" y2="110" stroke={COCOA} strokeWidth="1" />
      <path d="M 293 105 L 300 110 L 293 115" fill="none" stroke={COCOA} strokeWidth="1" />
      <Mono x={276} y={100} anchor="middle" size={7.5} fill={BRONZE}>
        BOOKED
      </Mono>
    </Frame>
  );
}

/* 02 — The compounding guest loop */
export function SvgLoop() {
  const nodes = [
    { a: -90, t: "Discover" },
    { a: -18, t: "Book" },
    { a: 54, t: "Stay" },
    { a: 126, t: "Return" },
    { a: 198, t: "Refer" },
  ];
  const cx = 160,
    cy = 106,
    r = 62;
  const ring = `M ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy - 0.01}`;
  return (
    <Frame label="The compounding guest loop: discover, book, stay, return, refer">
      <circle cx={cx} cy={cy} r={r + 24} fill="none" stroke={HAIR} strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={BRONZE} strokeWidth="1.2" strokeDasharray="3 8" opacity="0.7">
        <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
      </circle>
      {[0, 1, 2].map((i) => (
        <circle key={i} r="3.4" fill={COCOA}>
          <animateMotion dur="9s" repeatCount="indefinite" begin={`${i * 3}s`} path={ring} rotate="auto" />
        </circle>
      ))}
      {nodes.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const outX = cx + (r + 32) * Math.cos(rad);
        const outY = cy + (r + 32) * Math.sin(rad);
        return (
          <g key={n.t}>
            <line x1={x} y1={y} x2={outX} y2={outY} stroke={HAIR} strokeWidth="1" />
            <circle cx={x} cy={y} r="4.5" fill="var(--linen-2)" stroke={COCOA} strokeWidth="1.2" />
            <circle cx={x} cy={y} r="2" fill={BRONZE} className="pulse-dot" style={{ animationDelay: `${i * 0.45}s` }} />
            <Mono
              x={outX}
              y={outY + 3}
              size={8}
              anchor={Math.cos(rad) > 0.2 ? "start" : Math.cos(rad) < -0.2 ? "end" : "middle"}
            >
              {n.t.toUpperCase()}
            </Mono>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="18" fill="none" stroke={HAIR} strokeWidth="1" />
      <Mono x={cx} y={cy + 3} anchor="middle" size={7.5} fill={BRONZE}>
        LTV ↑
      </Mono>
    </Frame>
  );
}

/* 03 — Quiet compounding vs. paid spikes */
export function SvgRestraint() {
  return (
    <Frame label="Compounding owned growth against volatile paid spikes">
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1="18" y1={38 + i * 34} x2="302" y2={38 + i * 34} stroke={HAIR} strokeWidth="1" />
      ))}
      {/* volatile paid line */}
      <path
        d="M 18 168 L 52 120 L 78 166 L 112 108 L 146 172 L 182 122 L 216 174 L 252 130 L 302 168"
        fill="none"
        stroke={HAIR}
        strokeWidth="1.4"
        strokeDasharray="3 4"
      />
      <Mono x={296} y={182} anchor="end" size={7} opacity={0.7}>
        RENTED REACH
      </Mono>
      {/* compounding owned curve */}
      <path
        d="M 18 174 C 84 170 112 148 140 122 C 174 90 216 66 302 42"
        fill="none"
        stroke={COCOA}
        strokeWidth="1.6"
        strokeDasharray="520"
        strokeDashoffset="520"
      >
        <animate attributeName="stroke-dashoffset" values="520;0" dur="5s" repeatCount="indefinite" />
      </path>
      {[
        [18, 174],
        [140, 122],
        [220, 78],
        [302, 42],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.4" fill={BRONZE} className="pulse-dot" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      <Mono x={296} y={32} anchor="end" size={7} fill={BRONZE}>
        OWNED SYSTEM
      </Mono>
      {[
        [40, "Y1"],
        [110, "Y2"],
        [180, "Y3"],
        [250, "Y4"],
      ].map(([x, t]) => (
        <Mono key={t as string} x={x as number} y={204} size={7.5} opacity={0.7}>
          {t as string}
        </Mono>
      ))}
    </Frame>
  );
}

/* 04 — One system, many doors (now including fleets) */
export function SvgSystem() {
  const leaves = [34, 74, 114, 154, 194];
  const labels = ["HOTEL", "LODGE", "VILLA", "TABLE", "FLEET"];
  return (
    <Frame label="One operating system extending to hotels, lodges, villas, restaurants and fleets">
      <rect x="18" y="84" width="94" height="52" fill="none" stroke={COCOA} strokeWidth="1.2" />
      <line x1="18" y1="100" x2="112" y2="100" stroke={HAIR} strokeWidth="1" />
      <Mono x={26} y={96} size={7} opacity={0.7}>
        BK OS
      </Mono>
      <Mono x={26} y={120} size={9} fill={COCOA}>
        ONE SPINE
      </Mono>
      {leaves.map((y, i) => (
        <g key={y}>
          <path
            d={`M 112 110 C 158 110 166 ${y} 212 ${y}`}
            fill="none"
            stroke={HAIR}
            strokeWidth="1"
            className="flow-dash"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <rect x="212" y={y - 10} width="90" height="20" fill="none" stroke={HAIR} strokeWidth="1" />
          <circle cx="222" cy={y} r="2.5" fill={BRONZE}>
            <animate attributeName="opacity" values="0.25;1;0.25" dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <Mono x={232} y={y + 3} size={7.5}>
            {labels[i]}
          </Mono>
        </g>
      ))}
    </Frame>
  );
}

/* 05 — Hospitality in motion: route, seats, load factor */
export function SvgFleet() {
  const stops = [
    [30, "DEPOT"],
    [104, "CITY A"],
    [178, "CITY B"],
    [252, "COAST"],
  ] as const;
  const seats = Array.from({ length: 40 }, (_, i) => i);
  return (
    <Frame label="A coach route: stops, seat inventory and rising load factor">
      {/* route line */}
      <line x1="30" y1="42" x2="290" y2="42" stroke={HAIR} strokeWidth="1" />
      <line x1="30" y1="42" x2="290" y2="42" stroke={BRONZE} strokeWidth="1.4" strokeDasharray="260" strokeDashoffset="260">
        <animate attributeName="stroke-dashoffset" values="260;0" dur="6s" repeatCount="indefinite" />
      </line>
      {stops.map(([x, t]) => (
        <g key={t}>
          <circle cx={x} cy={42} r="4" fill="var(--linen-2)" stroke={COCOA} strokeWidth="1.2" />
          <circle cx={x} cy={42} r="1.6" fill={COCOA} />
          <Mono x={x} y={28} anchor="middle" size={7}>
            {t}
          </Mono>
        </g>
      ))}
      <g>
        <rect x="-14" y="-7" width="28" height="14" rx="3" fill={COCOA} />
        <rect x="-9" y="-4" width="8" height="5" fill="var(--linen)" opacity="0.7" />
        <rect x="2" y="-4" width="8" height="5" fill="var(--linen)" opacity="0.7" />
        <animateMotion dur="6s" repeatCount="indefinite" path="M 30 42 L 290 42" />
      </g>

      {/* seat map */}
      <rect x="26" y="76" width="150" height="76" rx="10" fill="none" stroke={HAIR} strokeWidth="1" />
      {seats.map((i) => {
        const col = i % 10;
        const row = Math.floor(i / 10);
        const sold = (i * 7) % 10 < 8;
        return (
          <rect
            key={i}
            x={36 + col * 13}
            y={88 + row * 15}
            width="9"
            height="10"
            rx="1.5"
            fill={sold ? BRONZE : "none"}
            opacity={sold ? 0.75 : 1}
            stroke={sold ? "none" : HAIR}
            strokeWidth="1"
          >
            {sold ? (
              <animate attributeName="opacity" values="0.15;0.8" dur="0.6s" begin={`${i * 0.06}s`} fill="freeze" />
            ) : null}
          </rect>
        );
      })}
      <Mono x={26} y={166} size={7} opacity={0.75}>
        SEATS SOLD · 84%
      </Mono>

      {/* load factor bars */}
      {[
        [204, 34, "MON"],
        [226, 52, "TUE"],
        [248, 44, "WED"],
        [270, 66, "THU"],
        [292, 58, "FRI"],
      ].map(([x, h, t]) => (
        <g key={t as string}>
          <rect x={x as number} y={152 - (h as number)} width="12" height={h as number} fill={COCOA} opacity="0.85">
            <animate attributeName="height" values={`0;${h}`} dur="1.2s" fill="freeze" />
            <animate attributeName="y" values={`152;${152 - (h as number)}`} dur="1.2s" fill="freeze" />
          </rect>
          <Mono x={(x as number) + 6} y={166} anchor="middle" size={6.5} opacity={0.7}>
            {t as string}
          </Mono>
        </g>
      ))}
      <line x1="198" y1="152" x2="308" y2="152" stroke={HAIR} strokeWidth="1" />
      <Mono x={198} y={90} size={7} fill={BRONZE}>
        LOAD FACTOR
      </Mono>
    </Frame>
  );
}

/* ============================================================
   Snapshot infographics — console fragments
   ============================================================ */

function Donut({ pct, label, caption }: { pct: number; label: string; caption: string }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <Frame label={caption} ratio="0 0 160 150">
      <circle cx="80" cy="66" r={r} fill="none" stroke={HAIR} strokeWidth="9" />
      <circle
        cx="80"
        cy="66"
        r={r}
        fill="none"
        stroke={BRONZE}
        strokeWidth="9"
        strokeLinecap="butt"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform="rotate(-90 80 66)"
      >
        <animate attributeName="stroke-dasharray" values={`0 ${c};${(pct / 100) * c} ${c}`} dur="1.4s" fill="freeze" />
      </circle>
      <text x="80" y="70" textAnchor="middle" fontFamily="var(--font-serif)" fontSize="24" fill={COCOA}>
        {pct}%
      </text>
      <Mono x={80} y={118} anchor="middle" size={7.5}>
        {label}
      </Mono>
      <Mono x={80} y={132} anchor="middle" size={6.5} opacity={0.65}>
        {caption}
      </Mono>
    </Frame>
  );
}

function Sparkline() {
  return (
    <Frame label="Direct revenue pacing, twelve months" ratio="0 0 160 150">
      {[0, 1, 2].map((i) => (
        <line key={i} x1="14" y1={40 + i * 28} x2="148" y2={40 + i * 28} stroke={HAIR} strokeWidth="1" />
      ))}
      <path
        d="M 14 100 L 36 92 L 58 96 L 80 78 L 102 66 L 124 52 L 148 34"
        fill="none"
        stroke={COCOA}
        strokeWidth="1.6"
        strokeDasharray="240"
        strokeDashoffset="240"
      >
        <animate attributeName="stroke-dashoffset" values="240;0" dur="2s" fill="freeze" />
      </path>
      <path d="M 14 100 L 36 92 L 58 96 L 80 78 L 102 66 L 124 52 L 148 34 L 148 106 L 14 106 Z" fill={BRONZE} opacity="0.08" />
      <circle cx="148" cy="34" r="3.2" fill={BRONZE} className="pulse-dot" />
      <Mono x={14} y={124} size={7.5}>
        REVENUE / DIRECT
      </Mono>
      <Mono x={14} y={138} size={6.5} opacity={0.65}>
        +41% YOY · 12 MO
      </Mono>
    </Frame>
  );
}

function BarStack() {
  const bars = [
    ["DIRECT", 78],
    ["CHARTER", 54],
    ["AGENT", 38],
    ["BROKER", 22],
  ] as const;
  return (
    <Frame label="Channel mix by contribution" ratio="0 0 160 150">
      {bars.map(([t, w], i) => (
        <g key={t}>
          <Mono x={14} y={38 + i * 24} size={6.5} opacity={0.75}>
            {t}
          </Mono>
          <rect x={62} y={30 + i * 24} width="84" height="9" fill={HAIR} opacity="0.6" />
          <rect x={62} y={30 + i * 24} height="9" fill={i === 0 ? BRONZE : COCOA} opacity={i === 0 ? 0.85 : 0.6} width={(w / 100) * 84}>
            <animate attributeName="width" values={`0;${(w / 100) * 84}`} dur="1.2s" begin={`${i * 0.15}s`} fill="freeze" />
          </rect>
        </g>
      ))}
      <Mono x={14} y={134} size={6.5} opacity={0.65}>
        CHANNEL MIX · Q4
      </Mono>
    </Frame>
  );
}

function Gauge() {
  return (
    <Frame label="Fleet utilisation across the week" ratio="0 0 160 150">
      <path d="M 24 96 A 56 56 0 0 1 136 96" fill="none" stroke={HAIR} strokeWidth="9" />
      <path d="M 24 96 A 56 56 0 0 1 136 96" fill="none" stroke={BRONZE} strokeWidth="9" strokeDasharray="176" strokeDashoffset="176">
        <animate attributeName="stroke-dashoffset" values="176;40" dur="1.6s" fill="freeze" />
      </path>
      <line x1="80" y1="96" x2="118" y2="62" stroke={COCOA} strokeWidth="1.6">
        <animateTransform attributeName="transform" type="rotate" values="-70 80 96;0 80 96" dur="1.6s" fill="freeze" />
      </line>
      <circle cx="80" cy="96" r="3.5" fill={COCOA} />
      <Mono x={80} y={118} anchor="middle" size={7.5}>
        FLEET UTILISATION
      </Mono>
      <Mono x={80} y={132} anchor="middle" size={6.5} opacity={0.65}>
        84% · +23 PTS
      </Mono>
    </Frame>
  );
}

const snapshots = [
  { n: "S1", t: "Direct share", el: <Donut pct={64} label="DIRECT BOOKINGS" caption="vs. 42% at intake" /> },
  { n: "S2", t: "Revenue pacing", el: <Sparkline /> },
  { n: "S3", t: "Channel mix", el: <BarStack /> },
  { n: "S4", t: "Fleet utilisation", el: <Gauge /> },
];

const panels = [
  {
    n: "01",
    t: "Attention becomes ownership",
    d: "Rented reach is scattered and temporary. We funnel it into a system you own — one pipeline, one guest record, one compounding asset.",
    svg: <SvgGravity />,
  },
  {
    n: "02",
    t: "The loop, not the launch",
    d: "Discover, book, stay, return, refer. A guest is not a transaction; it is an orbit that tightens with every stay.",
    svg: <SvgLoop />,
  },
  {
    n: "03",
    t: "Quiet, compounding growth",
    d: "Paid reach spikes and collapses. An owned system rises because the machinery beneath it is deliberate, measured and maintained.",
    svg: <SvgRestraint />,
  },
  {
    n: "04",
    t: "One system, many doors",
    d: "Built once, extended everywhere — hotels, lodges, villas, tables and now fleets, on the same operating system.",
    svg: <SvgSystem />,
  },
  {
    n: "05",
    t: "Hospitality in motion",
    d: "For coach and transport operators the seat is the room and the route is the itinerary. Same spine: direct inventory, sold ahead of departure.",
    svg: <SvgFleet />,
  },
];

export function Vision() {
  return (
    <section className="relative border-y hairline bg-[var(--linen-2)] py-24 md:py-40 overflow-hidden">
      <div className="max-w-editorial container-x relative">
        <SectionHead
          num="02"
          kicker="The Vision"
          title={<>Drawn, <span className="italic">not described.</span></>}
          lede="Five diagrams that carry the whole thesis of the studio — and four console snapshots that show what it looks like once it's running."
        />
        <div className="mt-12 md:mt-20 grid grid-cols-1 lg:grid-cols-2 border-t border-l hairline">
          {panels.map((p) => (
            <article key={p.n} data-reveal className="border-b border-r hairline p-7 md:p-12">
              <Eyebrow num={p.n}>Diagram</Eyebrow>
              <div className="mt-8 md:mt-10">{p.svg}</div>
              <h3 className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] text-cocoa leading-tight mt-8 md:mt-10">
                {p.t}
              </h3>
              <p className="text-espresso text-[15px] leading-[1.7] max-w-[46ch] mt-3">{p.d}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 md:mt-24" data-reveal>
          <Eyebrow num="06">Snapshots</Eyebrow>
          <h3 className="font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] text-cocoa leading-tight mt-4">
            The console, <span className="italic">at a glance.</span>
          </h3>
          <div className="mt-8 md:mt-12 grid grid-cols-2 lg:grid-cols-4 border-t border-l hairline">
            {snapshots.map((s) => (
              <div key={s.n} data-reveal className="border-b border-r hairline p-5 md:p-8 bg-[var(--linen)]">
                <div className="flex items-center justify-between">
                  <span className="divider-num">{s.n}</span>
                  <span className="text-bronze text-[11px] font-mono">live</span>
                </div>
                <div className="mt-4">{s.el}</div>
                <p className="font-serif text-lg md:text-xl text-cocoa mt-4">{s.t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
