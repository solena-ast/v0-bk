import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, CaseStudies, Community, FinalCTA, Eyebrow, media } from "@/components/bk/shared";
import { AreaChart, BarRows, DonutChart, FunnelChart, GaugeChart } from "@/components/bk/charts";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — BK Studio" },
      { name: "description", content: "Selected engagements from the last twenty-four months. Presented like consulting case files, not campaigns." },
      { property: "og:title", content: "Work — BK Studio" },
      { property: "og:description", content: "Quiet numbers. Loud outcomes." },
      { property: "og:image", content: media.moroccoImg.url },
      { name: "twitter:image", content: media.moroccoImg.url },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        num="Chapter 05"
        kicker="Selected Work"
        title={<>Quiet numbers. <span className="italic">Loud outcomes.</span></>}
        lede="A small sample of engagements. Editorial presentation, minimal statistics, real results."
      />
      <PortfolioBand />
      <CaseStudies />
      <Community />
      <FinalCTA />
    </PageShell>
  ),
});

function Panel({ n, title, note, children }: { n: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <div data-reveal className="border-b border-r hairline p-6 md:p-8 bg-[var(--linen)]">
      <div className="flex items-center justify-between">
        <span className="divider-num">{n}</span>
        {note && <span className="font-mono text-[10px] text-bronze uppercase tracking-widest">{note}</span>}
      </div>
      <div className="mt-5">{children}</div>
      <p className="font-serif text-lg text-cocoa mt-4">{title}</p>
    </div>
  );
}

function PortfolioBand() {
  return (
    <section className="max-w-editorial container-x pb-16 md:pb-24">
      <Eyebrow num="Portfolio">Across the book</Eyebrow>
      <h2 className="font-serif text-[clamp(1.6rem,3.4vw,2.8rem)] text-cocoa leading-tight mt-4">
        Twenty-four months, <span className="italic">measured.</span>
      </h2>
      <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l hairline">
        <Panel n="A1" title="Median direct share" note="portfolio">
          <DonutChart pct={61} caption="UP FROM 34% AT INTAKE" />
        </Panel>
        <Panel n="A2" title="Occupancy / utilisation" note="blended">
          <GaugeChart pct={82} caption="+19 PTS SINCE KICKOFF" />
        </Panel>
        <Panel n="A3" title="Owned demand index" note="24 mo">
          <AreaChart points={[38, 44, 49, 58, 66, 74, 88]} labels={["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "NOW"]} caption="OWNED DEMAND" />
        </Panel>
        <Panel n="A4" title="Where revenue comes from" note="mix">
          <BarRows rows={[
            { label: "Direct", pct: 61, value: "61%" },
            { label: "Repeat", pct: 22, value: "22%" },
            { label: "Agent", pct: 11, value: "11%" },
            { label: "OTA", pct: 6, value: "6%" },
          ]} />
        </Panel>
        <div className="sm:col-span-2 lg:col-span-4 border-b border-r hairline p-6 md:p-8 bg-[var(--linen-2)]" data-reveal>
          <div className="divider-num">A5 · The funnel we rebuild</div>
          <div className="mt-5 max-w-[720px] mx-auto">
            <FunnelChart stages={[
              { label: "Discovery", value: "1.4M", pct: 100 },
              { label: "Considered", value: "312k", pct: 68 },
              { label: "Enquiry / checkout", value: "94k", pct: 44 },
              { label: "Booked direct", value: "38k", pct: 26 },
            ]} />
          </div>
        </div>
      </div>
    </section>
  );
}

