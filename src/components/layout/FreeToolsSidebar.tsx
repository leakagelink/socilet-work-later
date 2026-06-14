import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Sparkles, Search, Gauge, Calculator, FileText, ChevronRight, X } from "lucide-react";

const tools = [
  { to: "/tools/seo-checker", icon: Search, label: "SEO Checker", color: "from-emerald-500 to-teal-500" },
  { to: "/tools/speed-test", icon: Gauge, label: "Speed Test", color: "from-blue-500 to-cyan-500" },
  { to: "/tools/quote-calculator", icon: Calculator, label: "Quote Calc", color: "from-violet-500 to-fuchsia-500" },
  { to: "/tools/quotation-maker", icon: FileText, label: "PDF Quote", color: "from-amber-500 to-orange-500" },
] as const;

export function FreeToolsSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Hide on splash / auth
  if (pathname === "/splash" || pathname === "/auth") return null;

  return (
    <>
      {/* Collapsed tab — pinned left, vertically centered */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open free tools"
          className="fixed left-0 top-1/2 z-50 -translate-y-1/2 group"
        >
          <div className="relative flex flex-col items-center justify-center gap-1 rounded-r-2xl bg-gradient-to-r from-primary via-fuchsia-500 to-fuchsia-600 px-2.5 py-3.5 shadow-[0_0_20px_rgba(192,38,211,0.5)] ring-2 ring-white/25 transition group-hover:px-3">
            <Sparkles className="h-3.5 w-3.5 text-white" />
            <span className="text-[10px] font-black uppercase tracking-wider text-white leading-none [writing-mode:vertical-rl] rotate-180">
              Free Tools
            </span>
            <ChevronRight className="h-3 w-3 text-white/90" />
            {/* Pulse dot */}
            <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-background" />
            </span>
          </div>
        </button>
      )}

      {/* Expanded panel — vertically centered, slides from left */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            aria-label="Close"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150"
          />
          <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 animate-in slide-in-from-left-4 fade-in duration-200">
            <div className="relative w-[170px] rounded-r-2xl border border-l-0 border-primary/40 bg-background/95 p-3 shadow-2xl backdrop-blur-xl">
              {/* Header */}
              <div className="mb-2 flex items-center justify-between">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-primary to-fuchsia-500 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                  <Sparkles className="h-2.5 w-2.5" /> 100% Free
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full p-1 text-muted-foreground hover:bg-secondary"
                  aria-label="Close"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="mb-2 text-[11px] font-bold text-foreground">Free Tools</p>

              {/* Vertical tools list */}
              <div className="flex flex-col gap-1.5">
                {tools.map((t) => {
                  const active = pathname === t.to;
                  return (
                    <Link
                      key={t.to}
                      to={t.to}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center gap-2 rounded-lg border px-2 py-2 transition ${
                        active
                          ? "border-primary/50 bg-primary/10"
                          : "border-border/60 bg-card hover:border-primary/40 hover:bg-primary/5"
                      }`}
                    >
                      <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${t.color} text-white shadow-sm`}>
                        <t.icon className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-[11px] font-semibold text-foreground">{t.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* View all */}
              <Link
                to="/tools"
                onClick={() => setOpen(false)}
                className="mt-2 flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-primary to-fuchsia-500 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white"
              >
                View all <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
