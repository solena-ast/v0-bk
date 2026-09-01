import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell, PageHeader, Eyebrow, media } from "@/components/bk/shared";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { industries } from "@/lib/industries";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BK Studio" },
      { name: "description", content: "A conversation is the natural first step. Tell us about your property and we'll be in touch." },
      { property: "og:title", content: "Contact — BK Studio" },
      { property: "og:description", content: "Book a strategy session." },
      { property: "og:image", content: media.gravityImg.url },
      { name: "twitter:image", content: media.gravityImg.url },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  industry: z.string().max(60).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(3000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", industry: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setBusy(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      industry: parsed.data.industry || null,
      message: parsed.data.message,
    });
    setBusy(false);
    if (error) { toast.error(error.message); return; }
    setSent(true);
    setForm({ name: "", email: "", company: "", industry: "", message: "" });
    toast.success("Thank you. We'll be in touch.");
  }

  return (
    <PageShell>
      <PageHeader
        num="Chapter 11"
        kicker="Contact"
        title={<>Begin with a <span className="italic">conversation.</span></>}
        lede="Tell us about your property, your audience and the outcome you want. We reply personally within two working days."
      />
      <section className="max-w-editorial container-x pb-32 md:pb-48">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <form className="md:col-span-7 space-y-6" onSubmit={submit} data-reveal>
            <Row label="Your name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa" />
            </Row>
            <Row label="Email">
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa" />
            </Row>
            <Row label="Brand or property">
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa" />
            </Row>
            <Row label="Industry">
              <select value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa">
                <option value="">Select…</option>
                {industries.map((i) => <option key={i.slug} value={i.slug}>{i.name}</option>)}
              </select>
            </Row>
            <Row label="What are you building?">
              <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full bg-transparent border-b hairline py-3 text-cocoa text-[16px] focus:outline-none focus:border-cocoa resize-none" />
            </Row>
            <button type="submit" disabled={busy} className="btn btn-primary mt-6">
              {busy ? "Sending…" : sent ? "Sent ✓" : "Send Request →"}
            </button>
          </form>
          <aside className="md:col-span-4 md:col-start-9 space-y-8" data-reveal>
            <div>
              <Eyebrow num="A">Email</Eyebrow>
              <a href="mailto:studio@bk.studio" className="font-serif text-2xl md:text-3xl text-cocoa mt-3 block break-words">studio@bk.studio</a>
            </div>
            <div>
              <Eyebrow num="B">Studio</Eyebrow>
              <p className="text-espresso text-[15px] leading-[1.7] mt-3">Sebuleni Center, Riara Road,<br/>Nairobi, Kenya.<br/>Partners globally.</p>
            </div>
            <div>
              <Eyebrow num="C">Availability</Eyebrow>
              <p className="text-espresso text-[15px] leading-[1.7] mt-3">Taking on three new partners for Q1.</p>
              <div className="mt-4 border hairline rounded-md p-4 bg-[var(--linen-2)]">
                <span className="font-mono text-[10px] uppercase tracking-widest text-espresso/75">Partner slots filled</span>
                <div className="mt-3"><GaugeChart pct={70} caption="7 OF 10 · Q1 COHORT" /></div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="divider-num">{label}</span>
      {children}
    </label>
  );
}
