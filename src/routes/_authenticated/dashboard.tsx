import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, Eyebrow } from "@/components/bk/shared";
import { industries } from "@/lib/industries";
import { ConsoleCharts_ } from "@/components/bk/charts";
import { chartsFor } from "@/lib/console-charts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — BK Studio" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = Route.useRouteContext();
  const navigate = useNavigate();

  const profile = useQuery({
    queryKey: ["profile", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
      return data;
    },
  });

  const isAdmin = useQuery({
    queryKey: ["is_admin", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      return (data ?? []).some((r) => r.role === "admin");
    },
  });

  const metrics = useQuery({
    queryKey: ["metrics", user.id],
    queryFn: async () => {
      const { data } = await supabase.from("client_metrics").select("*").eq("user_id", user.id).order("sort_order");
      return data ?? [];
    },
  });

  const industry = industries.find((i) => i.slug === profile.data?.industry) ?? industries[0];

  // Auto-redirect first-time clients into the onboarding wizard.
  useEffect(() => {
    if (profile.isSuccess && profile.data && !profile.data.industry) {
      navigate({ to: "/onboarding", replace: true });
    }
  }, [profile.isSuccess, profile.data, navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const grouped = (metrics.data ?? []).reduce<Record<string, typeof metrics.data>>((acc, m) => {
    (acc[m.category] ??= []).push(m); return acc;
  }, {});

  return (
    <PageShell>
      <section className="max-w-editorial container-x pt-32 md:pt-40 pb-8 flex items-end justify-between flex-wrap gap-6">
        <div>
          <Eyebrow num="Your console">Signed in as {profile.data?.email ?? user.email}</Eyebrow>
          <h1 className="font-serif text-5xl md:text-6xl text-cocoa mt-4">Good to see you{profile.data?.full_name ? `, ${profile.data.full_name.split(" ")[0]}` : ""}.</h1>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/onboarding" className="btn btn-ghost">Redo onboarding</Link>
          {isAdmin.data && <Link to="/admin" className="btn btn-ghost">Admin</Link>}
          <button onClick={signOut} className="btn btn-primary">Sign out</button>
        </div>
      </section>

      <section className="max-w-editorial container-x py-10">
        {(metrics.data?.length ?? 0) === 0 ? (
          <div className="rounded-lg border hairline p-8 bg-[var(--linen-2)]">
            <div className="divider-num">Preview</div>
            <h2 className="font-serif text-3xl text-cocoa mt-2">Your dashboard will populate here.</h2>
            <p className="text-espresso mt-3 max-w-[56ch]">Once your engagement begins, monthly metrics land in this console. In the meantime, here's a preview of the {industry.name.toLowerCase()} console.</p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {industry.dashboard.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70">{s.label}</div>
                  <div className="font-serif text-3xl text-cocoa mt-1">{s.value}</div>
                  {s.delta && <div className="font-mono text-[11px] text-bronze mt-0.5">{s.delta}</div>}
                </div>
              ))}
            </div>
            <div className="mt-8">
              <ConsoleCharts_ charts={chartsFor(industry)} />
            </div>
          </div>
        ) : (
          Object.entries(grouped).map(([cat, list]) => (
            <div key={cat} className="mb-8">
              <div className="divider-num mb-4">{cat}</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {list!.map((m) => (
                  <div key={m.id} className="border hairline rounded-md p-4 bg-[var(--linen-2)]">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-espresso/70">{m.metric_name}</div>
                    <div className="font-serif text-3xl text-cocoa mt-1">{m.metric_value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
    </PageShell>
  );
}
