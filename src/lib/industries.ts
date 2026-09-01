import glassImg from "@/assets/glass.jpg.asset.json";
import coachNightImg from "@/assets/coach-night.jpg.asset.json";
import timberImg from "@/assets/timber.jpg.asset.json";
import bronzeImg from "@/assets/bronze.jpg.asset.json";
import moroccoImg from "@/assets/morocco.jpg.asset.json";
import interiorImg from "@/assets/interior.jpg.asset.json";
import { assetUrl } from "@/lib/media";

export type Industry = {
  slug: string;
  chapter: string;
  name: string;
  tagline: string;
  hero: string;
  philosophy: string;
  useCase: { title: string; body: string };
  pipeline: { step: string; label: string; body: string }[];
  deliverables: string[];
  dashboard: {
    label: string;
    stats: { label: string; value: string; delta?: string }[];
    rows: { name: string; a: string; b: string; c: string }[];
    kpi: string;
  };
};

export const industries: Industry[] = [
  {
    slug: "boutique-hotels",
    chapter: "Chapter 11",
    name: "Boutique Hotels",
    tagline: "Design-led properties, quietly filled.",
    hero: assetUrl(interiorImg),
    philosophy:
      "A boutique hotel isn't a room inventory — it's a point of view. We build the systems that translate that point of view into full occupancy at rate integrity, without diluting the brand in OTA fine print.",
    useCase: {
      title: "The 24-key city hotel losing 32% to OTA fees",
      body: "You have a beautiful property, a growing Instagram, and a growing dependence on Booking.com. We rebuild the direct-booking spine so guests find, trust, and book you — often before they ever open the OTAs.",
    },
    pipeline: [
      { step: "01", label: "Brand & booking audit", body: "Voice, imagery, funnel gaps, rate parity, PMS integration state." },
      { step: "02", label: "Direct booking engine", body: "A conversion-obsessed reservation flow tuned to your property's ADR." },
      { step: "03", label: "Editorial content system", body: "Weekly stories, room films, chef features — designed for organic discovery." },
      { step: "04", label: "CRM & concierge automation", body: "Pre-arrival, in-stay, and post-stay sequences that raise NPS and repeat rate." },
      { step: "05", label: "Loyalty & referral loop", body: "Members-only rate, private windows, guest-to-guest invites." },
    ],
    deliverables: [
      "Direct booking site + engine",
      "Editorial content calendar (12 mo)",
      "CRM automation (12+ flows)",
      "Loyalty membership program",
      "Monthly performance review",
      "OTA reduction roadmap",
    ],
    dashboard: {
      label: "Boutique Hotel Console",
      kpi: "Direct booking share",
      stats: [
        { label: "Direct share", value: "64%", delta: "+22 pts" },
        { label: "ADR", value: "$412", delta: "+9%" },
        { label: "RevPAR", value: "$334", delta: "+18%" },
        { label: "NPS", value: "72", delta: "+11" },
      ],
      rows: [
        { name: "Direct site",  a: "1,284 bkgs", b: "$412 ADR", c: "$529k" },
        { name: "OTA (blended)", a: "612 bkgs",   b: "$378 ADR", c: "$231k" },
        { name: "Members rate", a: "204 bkgs",   b: "$389 ADR", c: "$79k"  },
        { name: "Corporate",    a: "142 bkgs",   b: "$355 ADR", c: "$50k"  },
      ],
    },
  },
  {
    slug: "safari-lodges",
    chapter: "Chapter 12",
    name: "Safari Lodges & Resorts",
    tagline: "Remote luxury, deeply booked.",
    hero: assetUrl(timberImg),
    philosophy:
      "Lodges live and die by season, guide quality, and word of mouth. We treat marketing as guide training extended: the story you tell before arrival is the story guests carry home.",
    useCase: {
      title: "A 14-suite lodge, 60% seasonality, 4 direct enquiries a week",
      body: "You have world-class experiences and world-average lead flow. We build the enquiry pipeline, the trade-agent portal, and the story engine that fills the shoulder season.",
    },
    pipeline: [
      { step: "01", label: "Land & story audit", body: "Guides, wildlife calendar, chef, spa, and the invisible details that convert." },
      { step: "02", label: "Enquiry-to-booking funnel", body: "Bespoke enquiry form, trade-agent portal, and a reservations desk playbook." },
      { step: "03", label: "Cinematic content library", body: "Guide films, wildlife journals, chef mise en place — evergreen and licensable." },
      { step: "04", label: "Trade & agent automation", body: "Rate letters, FAM trip flow, agent-only inventory windows." },
      { step: "05", label: "Repeat guest program", body: "Private release windows for previous guests before public inventory opens." },
    ],
    deliverables: [
      "Enquiry funnel + agent portal",
      "Cinematic film library",
      "Trade newsletter engine",
      "Reservations playbook",
      "Repeat-guest release calendar",
      "Season-by-season pacing dashboard",
    ],
    dashboard: {
      label: "Lodge Reservations Console",
      kpi: "Shoulder-season occupancy",
      stats: [
        { label: "Occupancy", value: "78%", delta: "+19 pts" },
        { label: "ADR", value: "$1,840", delta: "+7%" },
        { label: "Agent share", value: "41%", delta: "+8 pts" },
        { label: "Repeat guests", value: "28%", delta: "+12 pts" },
      ],
      rows: [
        { name: "Direct enquiries", a: "412",   b: "38% conv", c: "$2.9M" },
        { name: "Trade agents",    a: "1,104", b: "44% conv", c: "$4.7M" },
        { name: "Repeat window",   a: "88",    b: "71% conv", c: "$1.1M" },
        { name: "FAM trips",       a: "24",    b: "n/a",      c: "seed"  },
      ],
    },
  },
  {
    slug: "luxury-airbnb",
    chapter: "Chapter 13",
    name: "Luxury Airbnb & Villas",
    tagline: "Portfolios that behave like a brand.",
    hero: assetUrl(glassImg),
    philosophy:
      "A portfolio of villas is only as strong as the single, unified brand behind them. We move you off platform dependency and onto a branded booking layer that compounds each property's marketing.",
    useCase: {
      title: "12 villas, 6 platforms, one exhausted operator",
      body: "You have gorgeous homes and no leverage. We consolidate identity, inventory, and voice into a single brand — then reroute demand through your own funnel.",
    },
    pipeline: [
      { step: "01", label: "Portfolio brand system", body: "One brand, one voice, one booking layer above the platforms." },
      { step: "02", label: "Owned booking site", body: "Direct reservations with channel-manager sync to Airbnb, Booking, Plum, Onefinestay." },
      { step: "03", label: "Concierge & upsell flow", body: "Pre-arrival questionnaire, in-stay concierge, curated experience marketplace." },
      { step: "04", label: "Owner reporting portal", body: "If you manage for owners, they get a clean monthly view — not a spreadsheet." },
      { step: "05", label: "Repeat & referral engine", body: "Guests return for the collection, not a single house." },
    ],
    deliverables: [
      "Portfolio identity + site",
      "Channel manager + direct engine",
      "Concierge upsell flow",
      "Owner reporting portal",
      "Repeat & referral automation",
      "Monthly performance review",
    ],
    dashboard: {
      label: "Portfolio Operator Console",
      kpi: "Direct share across portfolio",
      stats: [
        { label: "Direct share", value: "47%", delta: "+30 pts" },
        { label: "Avg nightly", value: "$1,220", delta: "+11%" },
        { label: "Occupancy", value: "82%", delta: "+9 pts" },
        { label: "Upsell attach", value: "38%", delta: "+22 pts" },
      ],
      rows: [
        { name: "Direct site",  a: "302 stays", b: "$1,265 avg", c: "$1.71M" },
        { name: "Airbnb",       a: "418 stays", b: "$1,180 avg", c: "$2.21M" },
        { name: "Booking.com",  a: "231 stays", b: "$1,140 avg", c: "$1.18M" },
        { name: "Concierge",    a: "394 attach", b: "$412 avg",  c: "$162k" },
      ],
    },
  },
  {
    slug: "travel-brands",
    chapter: "Chapter 14",
    name: "Travel Brands & DMCs",
    tagline: "Destinations that sell themselves.",
    hero: assetUrl(moroccoImg),
    philosophy:
      "Tour operators and destination brands sell trust as much as itineraries. We build the editorial infrastructure that lets a traveller feel the trip before they book it.",
    useCase: {
      title: "A DMC with 300 leads a month and no clear pipeline",
      body: "You have demand but no shape to it. We put form to the flow — capture, score, route, and convert — while a content engine keeps organic demand rising.",
    },
    pipeline: [
      { step: "01", label: "Positioning & destination story", body: "What makes this operator, in this region, uncopyable." },
      { step: "02", label: "Lead qualification engine", body: "Multi-step enquiry, scoring, routing to the right consultant." },
      { step: "03", label: "Itinerary presentation", body: "Beautiful digital itineraries that close 2× faster than PDFs." },
      { step: "04", label: "Destination editorial hub", body: "Field notes, guide interviews, seasonal briefs — the traveller's pre-arrival ritual." },
      { step: "05", label: "Post-trip re-engagement", body: "Trip films, private next-trip menus, referral incentives." },
    ],
    deliverables: [
      "Positioning document",
      "Enquiry + CRM pipeline",
      "Digital itinerary system",
      "Editorial destination hub",
      "Post-trip retention flow",
      "Consultant playbook",
    ],
    dashboard: {
      label: "Operator Pipeline Console",
      kpi: "Enquiry → booked value",
      stats: [
        { label: "Booked value", value: "$4.8M", delta: "+41%" },
        { label: "Enquiries",   value: "1,214", delta: "+27%" },
        { label: "Close rate",  value: "34%",   delta: "+9 pts" },
        { label: "Repeat trips",value: "22%",   delta: "+14 pts" },
      ],
      rows: [
        { name: "Bespoke enquiries", a: "612", b: "38% close", c: "$3.1M" },
        { name: "Group departures",  a: "204", b: "42% close", c: "$1.2M" },
        { name: "Repeat travellers", a: "148", b: "61% close", c: "$0.9M" },
        { name: "Referral partners", a: "72",  b: "48% close", c: "$0.4M" },
      ],
    },
  },
  {
    slug: "restaurants",
    chapter: "Chapter 15",
    name: "Restaurants & Chef Brands",
    tagline: "Full covers, on brand.",
    hero: assetUrl(bronzeImg),
    philosophy:
      "A restaurant lives at the intersection of walk-by, algorithm, and reputation. We build the systems that turn a single seat into a returning guest, and a single dish into a story that travels.",
    useCase: {
      title: "A destination restaurant filling Fridays and empty on Wednesdays",
      body: "You don't need more diners — you need better mid-week ones. We build the content, membership, and CRM layer that flattens the demand curve without discounting the brand.",
    },
    pipeline: [
      { step: "01", label: "Menu & story audit", body: "Chef's voice, produce provenance, room, playlist — everything that becomes content." },
      { step: "02", label: "Reservations & waitlist system", body: "First-party booking, waitlist SMS, no-show reduction flow." },
      { step: "03", label: "Culinary content engine", body: "Dish films, chef notes, supplier stories — weekly, on brand." },
      { step: "04", label: "Membership & tasting club", body: "Private tastings, chef's counter windows, seasonal drops." },
      { step: "05", label: "PR-loop retention", body: "Guest re-engagement + media placement designed to compound." },
    ],
    deliverables: [
      "Reservation stack + no-show flow",
      "Weekly culinary content",
      "Membership + tasting program",
      "SMS + email retention flows",
      "PR placement roadmap",
      "Cover-pacing dashboard",
    ],
    dashboard: {
      label: "Restaurant Operator Console",
      kpi: "Cover density × ATV",
      stats: [
        { label: "Covers / week", value: "1,842", delta: "+18%" },
        { label: "ATV", value: "$168", delta: "+11%" },
        { label: "No-show rate", value: "2.1%", delta: "−4.6 pts" },
        { label: "Repeat guests", value: "44%", delta: "+13 pts" },
      ],
      rows: [
        { name: "First-party bkgs", a: "1,204", b: "$172 ATV", c: "$207k" },
        { name: "Waitlist walk-ins", a: "412",  b: "$154 ATV", c: "$63k"  },
        { name: "Members",           a: "168",  b: "$248 ATV", c: "$41k"  },
        { name: "Private events",    a: "58",   b: "$3,900 avg", c: "$226k" },
      ],
    },
  },
  {
    slug: "coach-transport",
    chapter: "Chapter 16",
    name: "Coach & Transport Operators",
    tagline: "Every seat sold, every route earning.",
    hero: assetUrl(coachNightImg),
    philosophy:
      "A coach line is hospitality in motion. The seat is the room, the route is the itinerary, and the driver is the concierge. We build the same owned-demand spine we build for hotels — direct ticketing, route-level storytelling, and a rider record that returns — so you stop renting demand from aggregators and charter brokers.",
    useCase: {
      title: "A 22-coach fleet at 61% load factor, half its seats sold by brokers",
      body: "Your fleet is immaculate and your margin is not. We rebuild direct ticketing, put charter enquiries into a real pipeline, and turn each route into a story travellers choose deliberately — lifting load factor without cutting fares.",
    },
    pipeline: [
      { step: "01", label: "Fleet & route audit", body: "Load factor by route and departure, broker dependency, charter mix, fare integrity." },
      { step: "02", label: "Direct ticketing engine", body: "A conversion-tuned booking flow with seat selection, live inventory and wallet-ready tickets." },
      { step: "03", label: "Route editorial system", body: "Route films, on-board interiors, driver and destination stories — built for organic discovery." },
      { step: "04", label: "Charter & group pipeline", body: "Enquiry scoring, instant quoting, corporate and tour-operator portals." },
      { step: "05", label: "Rider loyalty loop", body: "Passes, commuter tiers, and SMS re-booking that make the second trip automatic." },
    ],
    deliverables: [
      "Direct ticketing site + seat map",
      "Route-level editorial library",
      "Charter quoting + CRM pipeline",
      "Rider loyalty & pass program",
      "Fleet utilisation dashboard",
      "Broker reduction roadmap",
    ],
    dashboard: {
      label: "Fleet Operations Console",
      kpi: "Load factor × direct share",
      stats: [
        { label: "Direct bookings", value: "18,420", delta: "+38%" },
        { label: "Route conversion", value: "6.4%", delta: "+2.7 pts" },
        { label: "Charter pipeline", value: "$1.2M", delta: "312 confirmed" },
        { label: "Fleet utilisation", value: "84%", delta: "+23 pts" },
      ],
      rows: [
        { name: "Direct ticketing", a: "18,420 seats", b: "$78 fare", c: "$1.44M" },
        { name: "Charter & groups", a: "312 charters", b: "$2,640 avg", c: "$824k" },
        { name: "Broker / OTA",     a: "9,110 seats",  b: "$66 fare", c: "$601k" },
        { name: "Commuter passes",  a: "1,240 passes", b: "$210 avg", c: "$260k" },
      ],
    },
  },
];

export const industryBySlug = (slug: string) => industries.find((i) => i.slug === slug);
