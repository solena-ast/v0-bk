import type { ReactNode } from "react";
import { Eyebrow, SectionHead } from "./shared";

/**
 * Custom, hand-drawn animated SVGs communicating BK Studio's vision.
 * All strokes use design tokens (cocoa / bronze / hairline) — no hardcoded colors.
 */

const COCOA = "var(--cocoa)";
const BRONZE = "var(--bronze)";
const HAIR = "var(--hairline)";

function Frame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <svg
      viewBox="0 0 320 220"
      role="img"
      aria-label={label}
      className="w-full h-auto overflow-visible"
    >
      <title>{label}</title>
      {children}
    </svg>
  );
}

/* 01 — Attention scattered becomes bookings owned */
export function SvgGravity() {
  const dots = [
    [28, 40], [60, 22], [96, 52], [40, 92], [74, 118], [22, 140],
    [104, 158], [58, 176], [18, 88], [92, 90],
  ];
  return (
    <Frame label="Scattered attention converging into owned bookings">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={BRONZE} opacity="0.55">
          <animate
            attributeName="opacity"
            values="0.2;0.9;0.2"
            dur={`${3 + (i % 5) * 0.6}s`}
            repeatCount="indefinite"
            begin={`${i * 0.22}s`}
          />
        </circle>
      ))}
      {dots.map(([x, y], i) => (
        <path
          key={`p${i}`}
          d={`M ${x} ${y} Q ${(x + 200) / 2} ${(y + 110) / 2 - 18} 206 110`}
          fill="none"
          stroke={HAIR}
          strokeWidth="1"
          className="flow-dash"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      <circle cx="206" cy="110" r="44" fill="none" stroke={HAIR} strokeWidth="1" />
      <circle cx="206" cy="110" r="30" fill="none" stroke={BRONZE} strokeWidth="1" opacity="0.6">
        <animate attributeName="r" values="30;34;30" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle cx="206" cy="110" r="7" fill={COCOA} />
      <line x1="250" y1="110" x2="308" y2="110" stroke={COCOA} strokeWidth="1" />
      <path d="M 300 105 L 308 110 L 300 115" fill="none" stroke={COCOA} strokeWidth="1" />
    </Frame>
  );
}

/* 02 — The compounding loop: guest becomes advocate */
export function SvgLoop() {
  const nodes = [
    { a: -90, t: "Discover" },
    { a: -18, t: "Book" },
    { a: 54, t: "Stay" },
    { a: 126, t: "Return" },
    { a: 198, t: "Refer" },
  ];
  const cx = 160, cy = 108, r = 66;
  return (
    <Frame label="The compounding guest loop: discover, book, stay, return, refer">
      <circle cx={cx} cy={cy} r={r + 22} fill="none" stroke={HAIR} strokeWidth="1" />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={BRONZE}
        strokeWidth="1.25"
        strokeDasharray="4 9"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from={`0 ${cx} ${cy}`}
          to={`360 ${cx} ${cy}`}
          dur="26s"
          repeatCount="indefinite"
        />
      </circle>
      {nodes.map((n, i) => {
        const rad = (n.a * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);
        const outX = cx + (r + 34) * Math.cos(rad);
        const outY = cy + (r + 34) * Math.sin(rad);
        return (
          <g key={n.t}>
            <line x1={x} y1={y} x2={outX} y2={outY} stroke={HAIR} strokeWidth="1" />
            <circle cx={x} cy={y} r="4.5" fill={COCOA} className="pulse-dot" style={{ animationDelay: `${i * 0.45}s` }} />
            <text
              x={outX}
              y={outY + 3}
              textAnchor={Math.cos(rad) > 0.2 ? "start" : Math.cos(rad) < -0.2 ? "end" : "middle"}
              fontFamily="var(--font-mono)"
              fontSize="8.5"
              letterSpacing="1.6"
              fill="var(--espresso)"
            >
              {n.t.toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="3" fill={BRONZE} />
    </Frame>
  );
}

/* 03 — Restraint: the system holds, the noise falls away */
export function SvgRestraint() {
  return (
    <Frame label="Layered systems compounding quietly over time">
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="18"
          y1={40 + i * 34}
          x2="302"
          y2={40 + i * 34}
          stroke={HAIR}
          strokeWidth="1"
        />
      ))}
      <path
        d="M 18 176 C 80 172 108 150 138 124 C 172 94 214 70 302 46"
        fill="none"
        stroke={COCOA}
        strokeWidth="1.5"
        strokeDasharray="520"
        strokeDashoffset="520"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="520;0"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </path>
      {[[18, 176], [138, 124], [220, 82], [302, 46]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill={BRONZE} className="pulse-dot" style={{ animationDelay: `${i * 0.6}s` }} />
      ))}
      {[
        [46, "Y1"], [116, "Y2"], [186, "Y3"], [256, "Y4"],
      ].map(([x, t]) => (
        <text key={t as string} x={x as number} y="204" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.6" fill="var(--espresso)" opacity="0.7">
          {t as string}
        </text>
      ))}
    </Frame>
  );
}

/* 04 — One system, many properties */
export function SvgSystem() {
  const leaves = [40, 82, 124, 166, 208];
  return (
    <Frame label="One operating system extending to many properties">
      <rect x="20" y="86" width="92" height="48" fill="none" stroke={COCOA} strokeWidth="1" />
      <text x="34" y="114" fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.8" fill={COCOA}>
        SYSTEM
      </text>
      {leaves.map((y, i) => (
        <g key={y}>
          <path
            d={`M 112 110 C 160 110 168 ${y} 216 ${y}`}
            fill="none"
            stroke={HAIR}
            strokeWidth="1"
            className="flow-dash"
            style={{ animationDelay: `${i * 0.5}s` }}
          />
          <rect x="216" y={y - 9} width="84" height="18" fill="none" stroke={HAIR} strokeWidth="1" />
          <circle cx="226" cy={y} r="2.5" fill={BRONZE}>
            <animate attributeName="opacity" values="0.3;1;0.3" dur="3.6s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
          </circle>
          <text x="236" y={y + 3} fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.4" fill="var(--espresso)">
            {["HOTEL", "LODGE", "VILLA", "BRAND", "TABLE"][i]}
          </text>
        </g>
      ))}
    </Frame>
  );
}

const panels = [
  {
    n: "01",
    t: "Attention becomes ownership",
    d: "Rented reach is scattered and temporary. We converge it into a system you own — one funnel, one guest record, one compounding asset.",
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
    d: "No spikes. A line that rises because the machinery beneath it is deliberate, measured and maintained.",
    svg: <SvgRestraint />,
  },
  {
    n: "04",
    t: "One system, many doors",
    d: "Built once, extended everywhere — new properties, new markets, the same operating system underneath.",
    svg: <SvgSystem />,
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
          lede="Four diagrams that carry the whole thesis of the studio. Watch them long enough and the argument makes itself."
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
      </div>
    </section>
  );
}
