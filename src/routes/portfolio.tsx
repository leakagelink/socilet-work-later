import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, Globe } from "lucide-react";
import { PORTFOLIO_CATS, portfolioProjects, getPortfolioColor } from "@/lib/portfolio-data";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio & Case Studies | Socilet" },
      { name: "description", content: "Real client projects: websites, apps, AI tools, ecommerce, trading platforms, and SaaS. Explore 30+ live projects." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof PORTFOLIO_CATS[number]>("All");

  const filtered = useMemo(() => {
    return portfolioProjects.filter((p) => {
      const matchCat = cat === "All" || p.cat === cat;
      const ql = q.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(ql) || p.tag.toLowerCase().includes(ql) || p.stack.some(s => s.toLowerCase().includes(ql));
      return matchCat && matchQ;
    });
  }, [q, cat]);

  return (
    <>
      <AppHeader title="Portfolio" back />
      <main className="px-5 py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects..." className="pl-9" />
        </div>

        <div className="mt-4 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 scrollbar-hide">
          {PORTFOLIO_CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                cat === c ? "border-primary bg-primary/15 text-primary-glow" : "border-border bg-card text-muted-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <a key={p.id} href={p.url} target="_blank" rel="noopener noreferrer" className="group block">
              <Card className="h-full overflow-hidden border-border bg-card transition hover:border-primary/30 hover:shadow-md">
                <div className={`relative aspect-[16/9] bg-gradient-to-br ${getPortfolioColor(i)} flex items-center justify-center`}>
                  <Globe className="h-8 w-8 text-white/60" />
                  <div className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 opacity-0 transition group-hover:opacity-100">
                    <ExternalLink className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold group-hover:text-primary transition">{p.title}</p>
                    <Badge variant="secondary" className="text-[10px]">{p.cat}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.tag}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-xs text-emerald-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {p.result}
                  </div>
                </div>
              </Card>
            </a>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full py-8 text-center text-sm text-muted-foreground">No projects match your search.</p>
          )}
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">{portfolioProjects.length}+ projects delivered. All links open in a new tab.</p>
        </div>
      </main>
    </>
  );
}
