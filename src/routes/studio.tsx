import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Principles, ClientExperience, FinalCTA, media } from "@/components/bk/shared";
import { Vision } from "@/components/bk/vision-svgs";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — BK Studio" },
      { name: "description", content: "Our principles and the shape of a BK Studio engagement — from discovery to scale." },
      { property: "og:title", content: "Studio — BK Studio" },
      { property: "og:description", content: "Principles, not features. The engagement, unhurried." },
      { property: "og:image", content: media.bronzeImg.url },
      { name: "twitter:image", content: media.bronzeImg.url },
    ],
  }),
  component: () => (
    <PageShell>
      <PageHeader
        num="Chapter 09"
        kicker="Studio"
        title={<>Principles first. <span className="italic">Systems always.</span></>}
        lede="How we think about hospitality growth, and how a partnership with the studio unfolds — from first conversation to compound scale."
      />
      <Vision />
      <Principles />
      <ClientExperience />
      <FinalCTA />
    </PageShell>
  ),
});
