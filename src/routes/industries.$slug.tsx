import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, Eyebrow, FinalCTA } from "@/components/bk/shared";
import { industryBySlug, industries, type Industry } from "@/lib/industries";
import { AreaChart, BarRows, DonutChart, FunnelChart, GaugeChart } from "@/components/bk/charts";
import { chartsFor } from "@/lib/console-charts";


export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const ind = industryBySlug(params.slug);
    if (!ind) throw notFound();
    return { ind };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Industry — BK Studio" }, { name: "robots", content: "noindex" }] };
    const { ind } = loaderData;
    return {
      meta: [
        { title: `${ind.name} — BK Studio` },
        { name: "description", content: ind.tagline },
        { property: "og:title", content: `${ind.name} — BK Studio` },
        { property: "og:description", content: ind.tagline },
        { property: "og:image", content: ind.hero },
        { name: "twitter:image", content: ind.hero },
      ],
    };
  },
  notFoundComponent: () => (
    <PageShell>
      <div className="max-w-editorial container-x pt-40 pb-24 text-center">
        <h1 className="font-serif text-5xl text-cocoa">Chapter not found</h1>
        <Link to="/industries" className="btn btn-ghost mt-8 inline-flex">All industries</Link>
      </div>
    </PageShell>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const { ind } = Route.useLoaderData() as { ind: Industry };
  const charts = chartsFor(ind);
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative pt-40 md:pt-56 pb-24 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={ind.hero} alt="" className="w-full h-full object-cover opacity-[0.35] drift" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--linen)]/60 via-[var(--linen)]/70 to-[var(--linen)]" />
        </div>
        <div className="max-w-editorial container-x" data-reveal>
          <Eyebrow num={ind.chapter}>{ind.name}</Eyebrow>
          <h1 className="font-serif mt-8 text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.02em] text-cocoa">
            {ind.tagline.split(",")[0]},
            <br /><span className="italic text-espresso">{ind.tagline.split(",").slice(1).join(",").trim() || "on repeat."}</span>
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="max-w-editorial container-x py-16 md:py-24 grid grid-cols-12 gap-8" data-reveal>
        <div className="col-span-12 md:col-span-4">
          <Eyebrow num="Philosophy">Point of view</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-7">
          <p className="font-serif text-2xl md:text-3xl leading-[1.35] text-cocoa">{ind.philosophy}</p>
        </div>
      </section>

      <div className="rule max-w-editorial mx-auto container-x" />

      {/* Use case */}
      <section className="max-w-editorial container-x py-16 md:py-24 grid grid-cols-12 gap-8" data-reveal>
        <div className="col-span-12 md:col-span-4">
          <Eyebrow num="Use case">Where we come in</Eyebrow>
        </div>
        <div className="col-span-12 md:col-span-7">
          <h3 className="font-serif text-3xl text-cocoa">{ind.useCase.title}</h3>
          <p className="mt-4 text-espresso text-[16px] leading-[1.7] max-w-[58ch]">{ind.useCase.body}</p>
        </div>
      </section>

      <div className="rule max-w-editorial mx-auto container-x" />

      {/* Pipeline */}
      <section className="max-w-editorial container-x py-20 md:py-28" data-reveal>
        <Eyebrow num="Pipeline">The engagement, step by step</Eyebrow>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {ind.pipeline.map((p) => (
            <div key={p.step} className="border hairline rounded-lg p-5 bg-[var(--linen-2)]">
              <div className="divider-num">{p.step}</div>
              <h4 className="font-serif text-xl text-cocoa mt-2 leading-tight">{p.label}</h4>
              <p className="text-espresso text-[13px] leading-relaxed mt-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rule max-w-editorial mx-auto container-x" />

      {/* Deliverables */}
      <section className="max-w-editorial container-x py-20 md:py-28 grid grid-cols-12 gap-8" data-reveal>
        <div className="col-span-12 md:col-span-4">
          <Eyebrow num="Deliverables">What you get</Eyebrow>
          <h3 className="font-serif text-4xl text-cocoa mt-4">A discrete, well-made set.</h3>
        </div>
        <ul className="col-span-12 md:col-span-7 divide-y hairline">
          {ind.deliverables.map((d, i) => (
            <li key={d} className="py-4 flex items-baseline gap-6">
              <span className="divider-num w-10">0{i + 1}</span>
              <span className="font-serif text-xl text-cocoa">{d}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="rule max-w-editorial mx-auto container-x" />

      {/* Dashboard preview */}
      <section className="max-w-editorial container-x py-20 md:py-28" data-reveal>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <Eyebrow num="Preview">Your operator console</Eyebrow>
            <h3 className="font-serif text-4xl text-cocoa mt-4">A live view of what we compound.</h3>
            <p className="text-espresso text-[15px] mt-3 max-w-[52ch]">Every client gets a private console. Below is a representative snapshot of the {ind.name.toLowerCase()} dashboard.</p>
          </div>
          <Link to="/auth" className="btn btn-ghost">Sign in to your dashboard</Link>
        </div>

        <div className="mt-10 rounded-xl border hairline bg-[var(--linen-2)] overflow-hidden shadow-[var(--shadow-warm)]">
          <div className="flex items-center justify-between px-5 py-3 border-b hairline bg-[var(--linen)]">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_oklab,var(--bronze)_60%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_oklab,var(--espresso)_35%,transparent)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_oklab,var(--cocoa)_35%,transparent)]" />
              <span className="ml-3 font-mono text-[11px] text-espresso uppercase tracking-widest">{ind.dashboard.label}</span>
            </div>
            <span className="font-mono text-[11px] text-espresso">Last 30 days</span>
          </div>
          <div className="p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6 border-b hairline">
            {ind.dashboard.stats.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70">{s.label}</div>
                <div className="font-serif text-3xl text-cocoa mt-1">{s.value}</div>
                {s.delta && <div className="font-mono text-[11px] text-bronze mt-0.5">{s.delta}</div>}
              </div>
            ))}
          </div>
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mb-3">{ind.dashboard.kpi}</div>
                <AreaChart points={charts.trend.points} labels={charts.trend.labels} caption={charts.trend.caption} />
                <div className="mt-6 grid grid-cols-2 gap-6">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mb-2">Direct share</div>
                    <DonutChart pct={charts.donut.pct} caption={charts.donut.caption} />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mb-2">{charts.gauge.label}</div>
                    <GaugeChart pct={charts.gauge.pct} caption={charts.gauge.caption} />
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-5">
                <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mb-3">Channel contribution</div>
                <BarRows rows={charts.bars} />
                {charts.funnel && (
                  <>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mt-6 mb-3">Pipeline</div>
                    <FunnelChart stages={charts.funnel} />
                  </>
                )}
                <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70 mt-6 mb-3">Channels</div>
                <div className="divide-y hairline border hairline rounded-md">
                  {ind.dashboard.rows.map((r) => (
                    <div key={r.name} className="grid grid-cols-4 gap-2 px-4 py-3 items-center">
                      <div className="col-span-2 text-cocoa text-[13px]">{r.name}</div>
                      <div className="font-mono text-[11px] text-espresso">{r.a}</div>
                      <div className="font-mono text-[11px] text-espresso text-right">{r.c}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other industries */}
      <section className="max-w-editorial container-x pb-24" data-reveal>
        <Eyebrow num="Continue">Other chapters</Eyebrow>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {industries.filter(i => i.slug !== ind.slug).map((i) => (
            <Link key={i.slug} to="/industries/$slug" params={{ slug: i.slug }} className="border hairline rounded-md p-4 hover:bg-[var(--linen-2)] transition">
              <div className="divider-num">{i.chapter}</div>
              <div className="font-serif text-xl text-cocoa mt-1">{i.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <FinalCTA />
    </PageShell>
  );
}
