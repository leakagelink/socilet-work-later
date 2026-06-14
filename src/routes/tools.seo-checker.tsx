import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, CheckCircle2, AlertCircle, XCircle, Loader2 } from "lucide-react";

export const Route = createFileRoute("/tools/seo-checker")({
  head: () => ({
    meta: [
      { title: "Free SEO Score Checker | Socilet" },
      { name: "description", content: "Check any website's SEO score instantly. Real data from Google PageSpeed Insights." },
    ],
  }),
  component: SeoChecker;
});

type Audit = { id: string; title: string; score: number | null; displayValue?: string };
type Result = {
  url: string;
  seoScore: number;
  perfScore: number;
  accessibilityScore: number;
  bestPracticesScore: number;
  passed: Audit[];
  failed: Audit[];
};

async function runPageSpeed(url: string): Promise<Result> {
  const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&category=seo&category=performance&category=accessibility&category=best-practices&strategy=mobile`;
  const res = await fetch(api);
  if (!res.ok) throw new Error("Failed to fetch SEO data");
  const data = await res.json();
  const cats = data.lighthouseResult.categories;
  const audits = data.lighthouseResult.audits;
  const seoAuditRefs = cats.seo.auditRefs as Array<{ id: string }>;
  const passed: Audit[] = [];
  const failed: Audit[] = [];
  for (const ref of seoAuditRefs) {
    const a = audits[ref.id];
    if (!a || a.scoreDisplayMode === "notApplicable" || a.scoreDisplayMode === "manual") continue;
    const item: Audit = { id: ref.id, title: a.title, score: a.score, displayValue: a.displayValue };
    if (a.score === 1) passed.push(item);
    else failed.push(item);
  }
  return {
    url,
    seoScore: Math.round((cats.seo.score ?? 0) * 100),
    perfScore: Math.round((cats.performance.score ?? 0) * 100),
    accessibilityScore: Math.round((cats.accessibility.score ?? 0) * 100),
    bestPracticesScore: Math.round((cats["best-practices"].score ?? 0) * 100),
    passed,
    failed,
  };
}

function normalizeUrl(input: string) {
  let u = input.trim();
  if (!/^https?:\/\//i.test(u)) u = "https://" + u;
  return u;
}

function scoreColor(score: number) {
  if (score >= 90) return "text-emerald-500";
  if (score >= 50) return "text-amber-500";
  return "text-red-500";
}

function ScoreRing({ score, label }: { score: number; label: string }) {
  const circ = 2 * Math.PI * 28;
  const offset = circ - (score / 100) * circ;
  const color = score >= 90 ? "#10b981" : score >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-16 w-16">
        <svg className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r="28" stroke="hsl(var(--muted))" strokeWidth="5" fill="none" />
          <circle cx="32" cy="32" r="28" stroke={color} strokeWidth="5" fill="none"
            strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${scoreColor(score)}`}>
          {score}
        </div>
      </div>
      <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
    </div>
  );
}

function SeoChecker() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const check = async () => {
    if (!url.trim()) return;
    setLoading(true); setError(""); setResult(null);
    try {
      const r = await runPageSpeed(normalizeUrl(url));
      setResult(r);
    } catch (e: any) {
      setError(e.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader />
      <main className="px-5 pb-12 pt-4">
        <Link to="/tools" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> All tools
        </Link>

        <div className="mt-3">
          <h1 className="font-display text-2xl font-bold">SEO Score Checker</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Live data from Google PageSpeed Insights. Run weekly to track progress.
          </p>
        </div>

        <Card className="mt-5 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="yourwebsite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && check()}
              disabled={loading}
            />
            <Button onClick={check} disabled={loading || !url.trim()} className="bg-gradient-primary">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            </Button>
          </div>
          {loading && (
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Analyzing… this takes 20-40 seconds.
            </p>
          )}
          {error && <p className="mt-3 text-center text-xs text-red-500">{error}</p>}
        </Card>

        {result && (
          <>
            <Card className="mt-4 p-4">
              <p className="truncate text-xs text-muted-foreground">{result.url}</p>
              <div className="mt-4 grid grid-cols-4 gap-2">
                <ScoreRing score={result.seoScore} label="SEO" />
                <ScoreRing score={result.perfScore} label="Speed" />
                <ScoreRing score={result.accessibilityScore} label="A11y" />
                <ScoreRing score={result.bestPracticesScore} label="Best" />
              </div>
            </Card>

            {result.failed.length > 0 && (
              <Card className="mt-4 p-4">
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <XCircle className="h-4 w-4 text-red-500" /> Issues to fix ({result.failed.length})
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.failed.map((a) => (
                    <li key={a.id} className="flex items-start gap-2 text-xs">
                      <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                      <span>{a.title}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            <Card className="mt-4 p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Passing ({result.passed.length})
              </h3>
              <ul className="mt-3 space-y-1.5">
                {result.passed.map((a) => (
                  <li key={a.id} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500" />
                    <span>{a.title}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {result.seoScore < 90 && (
              <Card className="mt-4 border-primary/40 bg-primary/5 p-4 text-center">
                <p className="text-sm font-semibold">Want us to fix these for you?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Our team can boost your SEO to 90+ in 2-4 weeks. Pay only after results.
                </p>
                <Button asChild className="mt-3 bg-gradient-primary" size="sm">
                  <Link to="/estimator">Get free SEO audit & quote</Link>
                </Button>
              </Card>
            )}
          </>
        )}
      </main>
    </>
  );
}
