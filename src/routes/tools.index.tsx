import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Gauge, Search, Calculator, FileText, ArrowUpRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Tools — SEO, Speed Test, Quote Calculator | Socilet" },
      { name: "description", content: "Free SEO score checker, website speed test, design quote calculator with competitor comparison, and quotation maker." },
    ],
  }),
  component: ToolsHub,
});

const tools = [
  {
    to: "/tools/seo-checker",
    icon: Search,
    title: "SEO Score Checker",
    desc: "Check any site's SEO health & track improvements weekly.",
    tag: "Most popular",
    color: "from-emerald-500/20 to-teal-500/10",
  },
  {
    to: "/tools/speed-test",
    icon: Gauge,
    title: "Website Speed Test",
    desc: "Real Google PageSpeed data — performance, LCP, CLS scores.",
    tag: "Live data",
    color: "from-blue-500/20 to-cyan-500/10",
  },
  {
    to: "/tools/quote-calculator",
    icon: Calculator,
    title: "Design Quote Calculator",
    desc: "Get instant estimate + see what competitors charge for the same work.",
    tag: "Smart compare",
    color: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    to: "/tools/quotation-maker",
    icon: FileText,
    title: "Quotation Maker",
    desc: "Create a professional PDF quote in 60 seconds — your branding.",
    tag: "Free PDF",
    color: "from-amber-500/20 to-orange-500/10",
  },
] as const;

function ToolsHub() {
  return (
    <>
      <AppHeader />
      <main className="px-5 pb-12 pt-6">
        <div className="mb-6 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" /> 100% Free Forever
          </span>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight">
            Free Tools
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need to plan, compare and grow — no signup required.
          </p>
        </div>

        <div className="space-y-3">
          {tools.map((t) => (
            <Link key={t.to} to={t.to}>
              <Card className={`group relative overflow-hidden border-border/60 bg-gradient-to-br ${t.color} p-4 transition hover:scale-[1.01] hover:shadow-glow`}>
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-background/80 backdrop-blur">
                    <t.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{t.title}</h3>
                      <span className="rounded-full bg-background/70 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        {t.tag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{t.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-primary" />
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <Card className="mt-6 border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">
            💡 Bookmark this page — new free tools added every month.
          </p>
        </Card>
      </main>
    </>
  );
}
