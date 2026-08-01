import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Hero, WhoWeHelp, Framework, FinalCTA, media } from "@/components/bk/shared";
import { Vision } from "@/components/bk/vision-svgs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BK Studio — Hospitality Growth Systems" },
      { name: "description", content: "We build hospitality growth systems. Content, booking funnels, CRM, automation and communities for hotels, lodges, luxury Airbnb operators and travel brands." },
      { property: "og:title", content: "BK Studio — Hospitality Growth Systems" },
      { property: "og:description", content: "We build hospitality growth systems. Content, booking funnels, CRM, automation and communities for hotels, lodges, luxury Airbnb operators and travel brands." },
      { property: "og:image", content: media.gravityImg.url },
      { name: "twitter:image", content: media.gravityImg.url },
    ],
  }),
  component: () => (
    <PageShell>
      <Hero />
      <WhoWeHelp />
      <Vision />
      <Framework full={false} />
      <FinalCTA />
    </PageShell>
  ),
});
