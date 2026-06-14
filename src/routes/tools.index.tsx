import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import {
  Gauge,
  Search,
  Calculator,
  FileText,
  ArrowUpRight,
  Sparkles,
  Wrench,
  ShieldCheck,
  Zap,
  Infinity as InfinityIcon,
} from "lucide-react";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Tools — SEO, Speed Test, Quote Calculator | Socilet" },
      {
        name: "description",
        content:
          "Free SEO score checker, website speed test, design quote calculator with competitor comparison, and quotation maker.",
      },
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
    gradient: "from-emerald-400 to-teal-500",
    ring: "shadow-[0_8px_30px_-8px_rgba(16,185,129,0.55)]",
    glow: "bg-emerald-500/20",
  },
  {
    to: "/tools/speed-test",
    icon: Gauge,
    title: "Website Speed Test",
    desc: "Real Google PageSpeed data — performance, LCP, CLS scores.",
    tag: "Live data",
    gradient: "from-sky-400 to-cyan-500",
    ring: "shadow-[0_8px_30px_-8px_rgba(6,182,212,0.55)]",
    glow: "bg-cyan-500/20",
  },
  {
    to: "/tools/quote-calculator",
    icon: Calculator,
    title: "Design Quote Calculator",
    desc: "Get instant estimate + see what competitors charge for the same work.",
    tag: "Smart compare",
    gradient: "from-violet-400 to-fuchsia-500",
    ring: "shadow-[0_8px_30px_-8px_rgba(217,70,239,0.55)]",
    glow: "bg-fuchsia-500/20",
  },
  {
    to: "/tools/quotation-maker",
    icon: FileText,
    title: "Quotation Maker",
    desc: "Create a professional PDF quote in 60 seconds — your branding.",
    tag: "Free PDF",
    gradient: "from-amber-400 to-orange-500",
    ring: "shadow-[0_8px_30px_-8px_rgba(245,158,11,0.55)]",
    glow: "bg-amber-500/20",
  },
] as const;

function ToolsHub() {
  return (
    <>
      <AppHeader />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 pb-16 pt-6 text-white sm:px-6">
        {/* Ambient glow orbs */}
        <div className="pointer-events-none absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute top-40 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[100px]" />
        <div className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl">
          {/* Hero */}
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300 backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              100% Free Forever
            </span>

            <h1 className="mt-4 font-display text-4xl font-black leading-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-transparent">
                Free Tools
              </span>
              <span className="block text-white/90">that grow your business</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-sm text-slate-300 sm:text-base">
              Audit, estimate &amp; quote — everything in one place. No signup, no limits.
            </p>

            {/* Trust pills */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              <Pill icon={ShieldCheck} label="No signup" />
              <Pill icon={InfinityIcon} label="Unlimited use" />
              <Pill icon={Zap} label="Instant results" />
            </div>
          </div>

          {/* Tools grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((t) => (
              <Link key={t.to} to={t.to} className="group block">
                <div
                  className={`relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${t.ring}`}
                >
                  {/* Corner glow */}
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full ${t.glow} blur-2xl transition-opacity duration-300 group-hover:opacity-100`}
                  />

                  <div className="relative flex items-start gap-4">
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} shadow-lg`}
                    >
                      <t.icon className="h-6 w-6 text-white" strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-base font-bold text-white sm:text-lg">
                          {t.title}
                        </h3>
                        <span
                          className={`rounded-full bg-gradient-to-r ${t.gradient} px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow`}
                        >
                          {t.tag}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-300 sm:text-sm">
                        {t.desc}
                      </p>

                      <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-white/80 transition group-hover:text-white">
                        Open tool
                        <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950/80 to-slate-900/80 p-5 text-center backdrop-blur-xl">
            <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-amber-400">
              <Wrench className="h-5 w-5 text-white" />
            </div>
            <p className="text-sm font-semibold text-white">
              More free tools dropping every month
            </p>
            <p className="mt-1 text-xs text-slate-400">
              💡 Bookmark this page — your daily growth toolkit.
            </p>
          </div>

          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-slate-500">
              <Sparkles className="h-3 w-3" /> Crafted by Socilet
            </span>
          </div>
        </div>
      </main>
    </>
  );
}

function Pill({ icon: Icon, label }: { icon: typeof ShieldCheck; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-200 backdrop-blur">
      <Icon className="h-3 w-3 text-cyan-300" />
      {label}
    </span>
  );
}
