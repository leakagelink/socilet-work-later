import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio & Case Studies | Socilet" },
      { name: "description", content: "Real client projects: websites, apps, AI tools, and ecommerce. See screenshots, tech stack, and results." },
    ],
  }),
  component: Portfolio,
});

const CATS = ["All", "Web", "Mobile", "AI", "Ecommerce", "SaaS"] as const;

const projects = [
  { id: "bloom", title: "Bloom Commerce", cat: "Ecommerce", tag: "Shopify rebuild", color: "from-pink-500/40 to-violet-500/40", stack: ["Shopify", "React", "Klaviyo"], result: "+112% revenue in 90 days" },
  { id: "finedge", title: "FinEdge CRM", cat: "SaaS", tag: "Custom CRM", color: "from-blue-500/40 to-cyan-500/40", stack: ["Next.js", "Postgres", "Stripe"], result: "Saved 32 hrs/week per rep" },
  { id: "metrofit", title: "MetroFit App", cat: "Mobile", tag: "iOS & Android", color: "from-emerald-500/40 to-indigo-500/40", stack: ["React Native", "Firebase"], result: "50k downloads, 4.8★" },
  { id: "lumen", title: "Lumen AI Chat", cat: "AI", tag: "Support bot", color: "from-amber-500/40 to-rose-500/40", stack: ["OpenAI", "Pinecone"], result: "Cut response time by 78%" },
  { id: "northwind", title: "Northwind Site", cat: "Web", tag: "Corporate site", color: "from-slate-500/40 to-blue-500/40", stack: ["Astro", "Tailwind"], result: "Lighthouse 100/100" },
  { id: "kasa", title: "Kasa Bookings", cat: "Web", tag: "Booking platform", color: "from-fuchsia-500/40 to-orange-500/40", stack: ["Next.js", "Supabase"], result: "+3x booking conversion" },
];

function Portfolio() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATS[number]>("All");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCat = cat === "All" || p.cat === cat;
      const ql = q.toLowerCase();
      const matchQ = !q || p.title.toLowerCase().includes(ql) || p.tag.toLowerCase().includes(ql);
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

        <div className="mt-4 -mx-5 flex gap-2 overflow-x-auto px-5 pb-1">
          {CATS.map((c) => (
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

        <div className="mt-5 space-y-4">
          {filtered.map((p) => (
            <Card key={p.id} className="overflow-hidden border-border bg-card">
              <div className={`aspect-[16/9] bg-gradient-to-br ${p.color}`} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{p.title}</p>
                  <Badge variant="secondary" className="text-[10px]">{p.cat}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{p.tag}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-md bg-secondary px-2 py-0.5 text-[10px] text-muted-foreground">{s}</span>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2 text-xs text-primary-glow">
                  <ExternalLink className="h-3 w-3" /> {p.result}
                </div>
              </div>
            </Card>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No projects match your search.</p>
          )}
        </div>
      </main>
    </>
  );
}
