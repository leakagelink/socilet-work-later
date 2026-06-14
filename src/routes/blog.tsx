import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Web, App & AI Insights | Socilet" },
      { name: "description", content: "Practical guides on website development, mobile app development, AI, SEO and digital growth." },
    ],
  }),
  component: Blog,
});

const CATS = ["All", "Web", "Apps", "AI", "SEO", "Growth"] as const;

const posts = [
  { slug: "why-pwas-win-2026", title: "Why PWAs win in 2026", cat: "Web", excerpt: "Installable web apps now match native UX while shipping 10x faster.", read: "5 min" },
  { slug: "ai-automation-for-smb", title: "AI automation for SMBs — start small", cat: "AI", excerpt: "Three workflows you can ship this month for under $2k.", read: "7 min" },
  { slug: "seo-checklist-mobile", title: "Mobile-first SEO checklist", cat: "SEO", excerpt: "The 12 things that move the needle for mobile rankings.", read: "6 min" },
  { slug: "rn-vs-flutter-2026", title: "React Native vs Flutter in 2026", cat: "Apps", excerpt: "How to choose the right cross-platform stack for your team.", read: "8 min" },
  { slug: "google-ads-roas", title: "Doubling Google Ads ROAS — a playbook", cat: "Growth", excerpt: "Audit, restructure, and the small bets that compound.", read: "9 min" },
];

function Blog() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<typeof CATS[number]>("All");

  const filtered = useMemo(
    () => posts.filter((p) =>
      (cat === "All" || p.cat === cat) &&
      (!q || p.title.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, cat]
  );

  const featured = posts[0];

  return (
    <>
      <AppHeader title="Blog" back />
      <main className="px-5 py-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="pl-9" />
        </div>

        <div className="mt-4 -mx-5 flex gap-2 overflow-x-auto px-5">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium ${
                cat === c ? "border-primary bg-primary/15 text-primary-glow" : "border-border bg-card text-muted-foreground"
              }`}
            >{c}</button>
          ))}
        </div>

        {cat === "All" && !q && (
          <Card className="mt-5 overflow-hidden border-primary/30 bg-gradient-primary p-5 text-primary-foreground shadow-glow">
            <p className="text-[10px] uppercase tracking-widest opacity-80">Featured</p>
            <h2 className="mt-1 font-display text-xl font-bold">{featured.title}</h2>
            <p className="mt-1 text-sm opacity-90">{featured.excerpt}</p>
            <p className="mt-3 text-xs opacity-75">{featured.read} read</p>
          </Card>
        )}

        <div className="mt-4 space-y-3">
          {filtered.map((p) => (
            <Link key={p.slug} to="/blog">
              <Card className="bg-gradient-card border-border p-4">
                <span className="text-[10px] uppercase tracking-widest text-primary-glow">{p.cat}</span>
                <p className="mt-1 font-semibold">{p.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{p.excerpt}</p>
                <p className="mt-2 text-[10px] text-muted-foreground">{p.read} read</p>
              </Card>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">No articles found.</p>
          )}
        </div>
      </main>
    </>
  );
}
