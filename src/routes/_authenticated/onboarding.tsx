import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, Eyebrow } from "@/components/bk/shared";
import { industries, industryBySlug } from "@/lib/industries";
import { assetUrl } from "@/lib/media";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [{ title: "Welcome — BK Studio" }, { name: "robots", content: "noindex" }],
  }),
  component: Onboarding,
});

type Step = 0 | 1 | 2 | 3;

function Onboarding() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const [step, setStep] = useState<Step>(0);
  const [full_name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [industry, setIndustry] = useState<string>("");
  const [property, setProperty] = useState("");
  const [size, setSize] = useState("");
  const [busy, setBusy] = useState(false);

  // Hydrate defaults from profile once it loads
  useMemo(() => {
    const p = profile.data;
    if (p) {
      setName((n) => n || p.full_name || "");
      setCompany((c) => c || p.company || "");
      setIndustry((i) => i || p.industry || "");
    }
  }, [profile.data]);

  const chosen = industry ? industryBySlug(industry) : undefined;

  const canNext =
    (step === 0 && full_name.trim().length > 0 && company.trim().length > 0) ||
    (step === 1 && !!industry) ||
    (step === 2 && property.trim().length > 0) ||
    step === 3;

  async function finish() {
    if (!chosen) return;
    setBusy(true);
    try {
      const { error: pErr } = await supabase
        .from("profiles")
        .update({ full_name, company, industry })
        .eq("id", user.id);
      if (pErr) throw pErr;

      // Wipe any prior placeholder metrics for a clean regeneration.
      await supabase.from("client_metrics").delete().eq("user_id", user.id);

      const rows = [
        ...chosen.dashboard.stats.map((s, i) => ({
          user_id: user.id,
          category: "Headline",
          metric_name: s.label,
          metric_value: s.delta ? `${s.value} (${s.delta})` : s.value,
          sort_order: i,
        })),
        ...chosen.dashboard.rows.map((r, i) => ({
          user_id: user.id,
          category: "Channels",
          metric_name: r.name,
          metric_value: `${r.a} · ${r.b} · ${r.c}`,
          sort_order: i,
        })),
        {
          user_id: user.id,
          category: "Property",
          metric_name: property,
          metric_value: size || "—",
          sort_order: 0,
        },
      ];
      const { error: mErr } = await supabase.from("client_metrics").insert(rows);
      if (mErr) throw mErr;

      qc.invalidateQueries();
      toast.success("Workspace ready.");
      navigate({ to: "/dashboard", replace: true });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <section className="max-w-editorial container-x pt-32 md:pt-40 pb-24">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Eyebrow num={`Step 0${step + 1} / 04`}>Client onboarding</Eyebrow>
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1 w-10 rounded-full transition-colors ${i <= step ? "bg-cocoa" : "bg-[var(--hairline)]"}`}
              />
            ))}
          </div>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl text-cocoa mt-6">
          {step === 0 && "Let's set up your workspace."}
          {step === 1 && "Which world do you operate in?"}
          {step === 2 && "Tell us about the property."}
          {step === 3 && "Your console, ready to preview."}
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-7">
            {step === 0 && (
              <div className="space-y-4">
                <Field label="Your full name" value={full_name} onChange={setName} />
                <Field label="Company / brand" value={company} onChange={setCompany} />
                <Field label="Your role (optional)" value={role} onChange={setRole} placeholder="Founder, GM, Head of Marketing…" />
              </div>
            )}

            {step === 1 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {industries.map((i) => {
                  const active = industry === i.slug;
                  return (
                    <button
                      key={i.slug}
                      type="button"
                      onClick={() => setIndustry(i.slug)}
                      className={`text-left rounded-lg border p-4 bg-[var(--linen-2)] transition-all ${active ? "border-cocoa ring-1 ring-cocoa" : "hairline hover:border-cocoa/40"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-14 w-14 rounded overflow-hidden shrink-0 bg-[var(--linen)]">
                          <img src={assetUrl(i.hero)} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="divider-num">{i.chapter}</div>
                          <div className="font-serif text-lg text-cocoa mt-0.5">{i.name}</div>
                        </div>
                      </div>
                      <p className="text-espresso text-[13px] mt-3 leading-relaxed">{i.tagline}</p>
                    </button>
                  );
                })}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Field label="Property or brand name" value={property} onChange={setProperty} placeholder="The Ivory House" />
                <Field label="Size (rooms / villas / seats)" value={size} onChange={setSize} placeholder="24 keys" />
                <p className="text-espresso text-[13px]">
                  We'll pre-seed your console with realistic placeholder metrics for a{" "}
                  <span className="text-cocoa">{chosen?.name.toLowerCase()}</span>. Your studio lead
                  will replace them with live figures at kickoff.
                </p>
              </div>
            )}

            {step === 3 && chosen && (
              <div className="border hairline rounded-lg p-6 bg-[var(--linen-2)]">
                <div className="divider-num">{chosen.dashboard.label}</div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-5">
                  {chosen.dashboard.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70">
                        {s.label}
                      </div>
                      <div className="font-serif text-3xl text-cocoa mt-1">{s.value}</div>
                      {s.delta && (
                        <div className="font-mono text-[11px] text-bronze mt-0.5">{s.delta}</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <ConsoleCharts_ charts={chartsFor(chosen)} />
                </div>

                <div className="mt-6 rounded-md overflow-hidden border hairline">
                  {chosen.dashboard.rows.map((r) => (
                    <div key={r.name} className="grid grid-cols-4 px-3 py-2 text-[13px] border-b hairline last:border-b-0">
                      <div className="text-cocoa">{r.name}</div>
                      <div className="text-espresso">{r.a}</div>
                      <div className="text-espresso">{r.b}</div>
                      <div className="text-espresso text-right">{r.c}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="col-span-12 md:col-span-4 md:col-start-9">
            <div className="border hairline rounded-lg p-5 bg-[var(--linen-2)]">
              <div className="divider-num">Summary</div>
              <dl className="mt-4 space-y-3 text-[13px]">
                <Row k="Name" v={full_name || "—"} />
                <Row k="Company" v={company || "—"} />
                <Row k="Industry" v={chosen?.name || "—"} />
                <Row k="Property" v={property || "—"} />
                <Row k="Size" v={size || "—"} />
              </dl>
            </div>
            <p className="text-espresso text-[12px] mt-4 leading-relaxed">
              You can reopen this wizard any time from your dashboard.
            </p>
          </aside>
        </div>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => (Math.max(0, s - 1) as Step))}
            disabled={step === 0}
            className="btn btn-ghost disabled:opacity-40"
          >
            ← Back
          </button>
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep((s) => ((s + 1) as Step))}
              disabled={!canNext}
              className="btn btn-primary disabled:opacity-40"
            >
              Continue <span aria-hidden>→</span>
            </button>
          ) : (
            <button type="button" onClick={finish} disabled={busy} className="btn btn-primary">
              {busy ? "Building your console…" : "Generate my dashboard →"}
            </button>
          )}
        </div>
      </section>
    </PageShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-espresso font-mono text-[10px] uppercase tracking-widest">{k}</dt>
      <dd className="text-cocoa text-right truncate">{v}</dd>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] font-mono uppercase tracking-widest text-espresso mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border hairline rounded-md bg-[var(--linen)] px-3 py-2.5 text-cocoa focus:outline-none focus:border-cocoa"
      />
    </label>
  );
}
