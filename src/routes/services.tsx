import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Sparkles, Search, Megaphone, Target, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Web, App, AI, SEO, Social, Ads | Socilet" },
      { name: "description", content: "Website development, mobile app development, AI solutions, SEO, social media management, Google Ads, and business listing services." },
    ],
  }),
  component: Services,
});

const services = [
  { icon: Globe, title: "Website Development", desc: "Marketing sites, landing pages, web apps — fast and conversion-focused.", points: ["Custom design", "SEO ready", "CMS integration"] },
  { icon: Smartphone, title: "App Development", desc: "Native-quality iOS & Android apps and cross-platform PWAs.", points: ["React Native", "App store launch", "Push notifications"] },
  { icon: Sparkles, title: "AI Solutions", desc: "Chatbots, automation, custom GPTs and document AI for your workflow.", points: ["Custom GPTs", "Workflow automation", "Data extraction"] },
  { icon: Search, title: "SEO Services", desc: "Technical SEO, content, and link strategy to grow organic traffic.", points: ["Audit & roadmap", "On-page optimization", "Monthly reporting"] },
  { icon: Megaphone, title: "Social Media Management", desc: "Content, scheduling, community and creative for steady growth.", points: ["Content calendar", "Reels & carousels", "Analytics"] },
  { icon: Target, title: "Google Ads Management", desc: "High-intent search & shopping campaigns optimized for ROI.", points: ["Keyword research", "Landing pages", "Conversion tracking"] },
  { icon: MapPin, title: "Business Listing", desc: "Google Business Profile, maps and local directory setup.", points: ["GBP setup", "Local citations", "Review management"] },
];

function Services() {
  return (
    <>
      <AppHeader title="Services" back />
      <main className="px-5 py-5">
        <h1 className="font-display text-2xl font-bold">Everything you need to grow</h1>
        <p className="mt-1 text-sm text-muted-foreground">Start any service with our Work First, Pay Later model.</p>

        <div className="mt-6 space-y-3">
          {services.map(({ icon: Icon, title, desc, points }) => (
            <Card key={title} className="bg-gradient-card border-border p-5">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              <ul className="mt-3 space-y-1.5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary-glow" /> {p}
                  </li>
                ))}
              </ul>
              <Button asChild size="sm" className="mt-4 w-full bg-gradient-primary shadow-glow">
                <Link to="/estimator">Get estimate <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </>
  );
}
