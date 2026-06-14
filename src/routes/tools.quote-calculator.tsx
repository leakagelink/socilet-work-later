import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Check, TrendingDown, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tools/quote-calculator")({
  head: () => ({
    meta: [
      { title: "Design Quote Calculator with Competitor Comparison | Socilet" },
      { name: "description", content: "Instant project quote + see what agencies, freelancers and competitors charge for the same work." },
    ],
  }),
  component: QuoteCalculator,
});

const projectTypes = [
  { id: "landing", label: "Landing Page", base: 400 },
  { id: "website", label: "Business Website", base: 900 },
  { id: "ecommerce", label: "E-commerce Store", base: 1800 },
  { id: "webapp", label: "Web Application", base: 3500 },
  { id: "mobile", label: "Mobile App", base: 4000 },
  { id: "saas", label: "SaaS Product", base: 6000 },
];

const features = [
  { id: "design", label: "Custom UI/UX Design", cost: 600 },
  { id: "cms", label: "CMS / Admin Panel", cost: 700 },
  { id: "auth", label: "User Authentication", cost: 300 },
  { id: "payments", label: "Payment Integration", cost: 500 },
  { id: "ai", label: "AI Features", cost: 900 },
  { id: "seo", label: "SEO Optimization", cost: 350 },
];

// Industry multipliers based on real market data
const competitors = [
  { name: "Top Agencies (US/EU)", mult: 4.5, note: "Premium branding, 12+ wk delivery" },
  { name: "Mid-size Agencies", mult: 2.8, note: "8-10 wk delivery, generic process" },
  { name: "Indian/Asian Agencies", mult: 1.6, note: "Cheaper but variable quality" },
  { name: "Freelancers (Upwork)", mult: 1.2, note: "Risky, no team backup" },
];

function QuoteCalculator() {
  const [type, setType] = useState(projectTypes[1].id);
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const ourPrice = useMemo(() => {
    const t = projectTypes.find((p) => p.id === type)!;
    const featSum = features.filter((f) => selected.includes(f.id)).reduce((s, f) => s + f.cost, 0);
    return t.base + featSum;
  }, [type, selected]);

  return (
    <>
      <AppHeader />
      <main className="px-5 pb-12 pt-4">
        <Link to="/tools" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> All tools
        </Link>

        <div className="mt-3">
          <h1 className="font-display text-2xl font-bold">Quote Calculator</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Get your estimate + see what competitors charge for the same project.
          </p>
        </div>

        <Card className="mt-5 p-4">
          <h3 className="text-sm font-semibold">1. Project type</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {projectTypes.map((p) => (
              <button
                key={p.id}
                onClick={() => setType(p.id)}
                className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition ${type === p.id ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground"}`}
              >
                {p.label}
                <span className="block text-[10px] text-muted-foreground">from ${p.base}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-sm font-semibold">2. Features (optional)</h3>
          <div className="mt-3 space-y-2">
            {features.map((f) => {
              const on = selected.includes(f.id);
              return (
                <button
                  key={f.id}
                  onClick={() => toggle(f.id)}
                  className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs transition ${on ? "border-primary bg-primary/10" : "border-border"}`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`flex h-4 w-4 items-center justify-center rounded border ${on ? "border-primary bg-primary" : "border-border"}`}>
                      {on && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                    </span>
                    {f.label}
                  </span>
                  <span className="text-muted-foreground">+${f.cost}</span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Our price */}
        <Card className="mt-4 border-primary/40 bg-gradient-to-br from-primary/15 to-fuchsia-500/10 p-5 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/70 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
            <Sparkles className="h-3 w-3" /> Socilet Price
          </span>
          <p className="mt-3 font-display text-4xl font-bold text-gradient">
            ${ourPrice.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">Work first · Pay later · No upfront</p>
        </Card>

        {/* Competitor comparison */}
        <Card className="mt-4 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <TrendingDown className="h-4 w-4 text-emerald-500" /> What competitors charge
          </h3>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Same scope, different providers — market rates:
          </p>
          <div className="mt-3 space-y-2">
            {competitors.map((c) => {
              const price = Math.round(ourPrice * c.mult);
              const savings = price - ourPrice;
              const savingsPct = Math.round((savings / price) * 100);
              return (
                <div key={c.name} className="rounded-lg border border-border/60 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.note}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-foreground">${price.toLocaleString()}</p>
                      {savings > 0 && (
                        <p className="text-[10px] font-semibold text-emerald-500">
                          Save {savingsPct}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="mt-5 flex flex-col gap-2">
          <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
            <Link to="/estimator">Get detailed estimate & start project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              to="/tools/quotation-maker"
              search={{ type, features: selected.join(","), price: ourPrice } as any}
            >
              Generate PDF quotation
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
}
