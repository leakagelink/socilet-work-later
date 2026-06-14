import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Search, Gauge, Calculator, FileText, ChevronRight, X, Wrench } from "lucide-react";

const tools = [
  { to: "/tools/seo-checker", icon: Search, label: "SEO Checker", desc: "Audit your site", color: "from-emerald-400 to-teal-500", ring: "ring-emerald-400/40" },
  { to: "/tools/speed-test", icon: Gauge, label: "Speed Test", desc: "Core Web Vitals", color: "from-sky-400 to-blue-600", ring: "ring-sky-400/40" },
  { to: "/tools/quote-calculator", icon: Calculator, label: "Quote Calc", desc: "Smart estimate", color: "from-violet-400 to-purple-600", ring: "ring-violet-400/40" },
  { to: "/tools/quotation-maker", icon: FileText, label: "PDF Quote", desc: "Pro invoice PDF", color: "from-amber-400 to-orange-500", ring: "ring-amber-400/40" },
] as const;

export function FreeToolsSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (pathname === "/splash" || pathname === "/auth") return null;

  return (
    <>
      {/* Collapsed tab — pinned left, vertically centered */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open free tools"
          className="group fixed left-0 top-1/2 z-50 -translate-y-1/2 outline-none"
        >
          {/* Outer glow ring */}
          <span className="pointer-events-none absolute inset-0 -m-1 rounded-r-2xl bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-amber-400 opacity-60 blur-md transition-opacity group-hover:opacity-90" />

          <span className="relative flex flex-col items-center justify-center gap-1.5 rounded-r-2xl bg-slate-950/95 px-2.5 py-4 shadow-2xl ring-1 ring-white/15 backdrop-blur-md transition-all group-hover:px-3 group-active:scale-95 sm:px-3 sm:py-5">
            {/* Animated gradient border on the right edge */}
            <span className="absolute right-0 top-0 h-full w-[2px] bg-gradient-to-b from-cyan-400 via-fuchsia-500 to-amber-400" />

            <Wrench className="h-3.5 w-3.5 text-cyan-300 sm:h-4 sm:w-4" strokeWidth={2.5} />

            <span className="bg-gradient-to-b from-white via-fuchsia-100 to-amber-200 bg-clip-text text-[10px] font-black uppercase tracking-[0.2em] leading-none text-transparent [writing-mode:vertical-rl] rotate-180 sm:text-[11px]">
              Free Tools
            </span>

            <ChevronRight className="h-3 w-3 animate-pulse text-fuchsia-300 sm:h-3.5 sm:w-3.5" strokeWidth={2.5} />

            {/* Pulse dot */}
            <span className="absolute -right-1 -top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950" />
            </span>
          </span>
        </button>
      )}

      {/* Expanded panel */}
      {open && (
        <>
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150"
          />
          <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 animate-in slide-in-from-left-6 fade-in duration-200">
            {/* Outer gradient frame */}
            <div className="relative rounded-r-3xl bg-gradient-to-br from-cyan-500 via-fuchsia-500 to-amber-400 p-[1.5px] shadow-[0_0_40px_-5px_rgba(217,70,239,0.6)]">
              <div className="w-[200px] rounded-r-3xl bg-slate-950/95 p-3.5 backdrop-blur-xl sm:w-[220px] sm:p-4">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-slate-950 shadow-sm">
                    <Sparkles className="h-2.5 w-2.5" /> 100% Free
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
                    aria-label="Close"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <p className="mb-3 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-200 bg-clip-text text-xs font-black uppercase tracking-wider text-transparent">
                  Free Tools
                </p>

                {/* Vertical tools list */}
                <div className="flex flex-col gap-2">
                  {tools.map((t) => {
                    const active = pathname === t.to;
                    return (
                      <Link
                        key={t.to}
                        to={t.to}
                        onClick={() => setOpen(false)}
                        className={`group/item relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-2.5 py-2.5 transition-all active:scale-[0.98] ${
                          active
                            ? "border-fuchsia-400/60 bg-white/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.08]"
                        }`}
                      >
                        {/* Hover gradient sweep */}
                        <span className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${t.color} opacity-0 transition-opacity group-hover/item:opacity-10`} />

                        <div className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${t.color} text-white shadow-lg ring-2 ${t.ring}`}>
                          <t.icon className="h-4 w-4" strokeWidth={2.4} />
                        </div>
                        <div className="relative min-w-0 flex-1">
                          <p className="truncate text-[11px] font-bold text-white">{t.label}</p>
                          <p className="truncate text-[9px] text-slate-400">{t.desc}</p>
                        </div>
                        <ChevronRight className="relative h-3 w-3 shrink-0 text-slate-500 transition group-hover/item:translate-x-0.5 group-hover/item:text-white" />
                      </Link>
                    );
                  })}
                </div>

                {/* View all CTA */}
                <Link
                  to="/tools"
                  onClick={() => setOpen(false)}
                  className="group/cta relative mt-3 flex items-center justify-center gap-1 overflow-hidden rounded-xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-amber-400 py-2 text-[10px] font-black uppercase tracking-wider text-slate-950 shadow-lg transition active:scale-[0.98]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
                  <span className="relative">View All Tools</span>
                  <ChevronRight className="relative h-3 w-3" strokeWidth={3} />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
