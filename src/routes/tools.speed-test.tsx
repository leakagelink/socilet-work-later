import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Gauge, Loader2, Smartphone, Monitor } from "lucide-react";
import { runPageSpeedFn } from "@/lib/pagespeed.functions";


export const Route = createFileRoute("/tools/speed-test")({
  head: () => ({
    meta: [
      { title: "Free Website Speed Test | Socilet" },
      { name: "description", content: "Test your website speed with real Google PageSpeed data. LCP, CLS, FCP, TBT metrics." },
    ],
  }),
  component: SpeedTest,
});

type Metric = { label: string; value: string; score: number | null };
type Result = {
  url: string;
  strategy: "mobile" | "desktop";
  perfScore: number;
  metrics: Metric[];
};

function normalizeUrl(input: string) {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

function parseSpeed(url: string, strategy: "mobile" | "desktop", data: any): Result {
  const audits = data.lighthouseResult.audits;
  const perf = data.lighthouseResult.categories.performance;
  const ids: Array<[string, string]> = [
    ["first-contentful-paint", "FCP"],
    ["largest-contentful-paint", "LCP"],
    ["total-blocking-time", "TBT"],
    ["cumulative-layout-shift", "CLS"],
    ["speed-index", "Speed Index"],
    ["interactive", "TTI"],
  ];
  const metrics: Metric[] = ids.map(([id, label]) => ({
    label,
    value: audits[id]?.displayValue ?? "—",
    score: audits[id]?.score ?? null,
  }));
  return { url, strategy, perfScore: Math.round((perf?.score ?? 0) * 100), metrics };
}


function color(score: number) {
  if (score >= 90) return { ring: "#10b981", text: "text-emerald-500", grade: "Fast" };
  if (score >= 50) return { ring: "#f59e0b", text: "text-amber-500", grade: "Average" };
  return { ring: "#ef4444", text: "text-red-500", grade: "Slow" };
}

function SpeedTest() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const run = async () => {
    if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      setResult(await runSpeed(normalizeUrl(url), strategy));
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const c = result ? color(result.perfScore) : null;
  const circ = 2 * Math.PI * 44;

  return (
    <>
      <AppHeader />
      <main className="px-5 pb-12 pt-4">
        <Link to="/tools" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> All tools
        </Link>

        <div className="mt-3">
          <h1 className="font-display text-2xl font-bold">Website Speed Test</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Real Google PageSpeed data — Core Web Vitals + performance score.
          </p>
        </div>

        <Card className="mt-5 p-4">
          <div className="mb-3 flex gap-2">
            <button
              onClick={() => setStrategy("mobile")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${strategy === "mobile" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Mobile
            </button>
            <button
              onClick={() => setStrategy("desktop")}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${strategy === "desktop" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"}`}
            >
              <Monitor className="h-3.5 w-3.5" /> Desktop
            </button>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run()}
              disabled={loading}
            />
            <Button onClick={run} disabled={loading || !url.trim()} className="bg-gradient-primary">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Gauge className="h-4 w-4" />}
            </Button>
          </div>
          {loading && <p className="mt-3 text-center text-xs text-muted-foreground">Running real Lighthouse test… 20-40s.</p>}
          {error && <p className="mt-3 text-center text-xs text-red-500">{error}</p>}
        </Card>

        {result && c && (
          <>
            <Card className="mt-4 p-5 text-center">
              <p className="truncate text-xs text-muted-foreground">{result.url}</p>
              <div className="mt-4 flex justify-center">
                <div className="relative h-28 w-28">
                  <svg className="h-28 w-28 -rotate-90">
                    <circle cx="56" cy="56" r="44" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                    <circle cx="56" cy="56" r="44" stroke={c.ring} strokeWidth="8" fill="none"
                      strokeDasharray={circ} strokeDashoffset={circ - (result.perfScore / 100) * circ}
                      strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-bold ${c.text}`}>{result.perfScore}</span>
                    <span className="text-[10px] text-muted-foreground">/ 100</span>
                  </div>
                </div>
              </div>
              <p className={`mt-2 text-sm font-semibold ${c.text}`}>{c.grade}</p>
            </Card>

            <Card className="mt-4 p-4">
              <h3 className="text-sm font-semibold">Core Web Vitals</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {result.metrics.map((m) => {
                  const mc = m.score === null ? "text-muted-foreground" : color((m.score ?? 0) * 100).text;
                  return (
                    <div key={m.label} className="rounded-lg border border-border/60 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{m.label}</p>
                      <p className={`mt-1 text-lg font-bold ${mc}`}>{m.value}</p>
                    </div>
                  );
                })}
              </div>
            </Card>

            {result.perfScore < 90 && (
              <Card className="mt-4 border-primary/40 bg-primary/5 p-4 text-center">
                <p className="text-sm font-semibold">Slow site = lost sales</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We can get you to 90+ score. Pay only after delivery.
                </p>
                <Button asChild className="mt-3 bg-gradient-primary" size="sm">
                  <Link to="/estimator">Get speed optimization quote</Link>
                </Button>
              </Card>
            )}
          </>
        )}
      </main>
    </>
  );
}
