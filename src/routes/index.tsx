import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { VideoTestimonials } from "@/components/VideoTestimonials";
import { GoogleReviews } from "@/components/GoogleReviews";
import { portfolioProjects, getPortfolioColor } from "@/lib/portfolio-data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Globe, Smartphone, Sparkles, Search, Megaphone, Target,
  ArrowRight, ArrowUpRight, Shield, Clock, Wallet, Star, CheckCircle2, MessageCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Socilet — Work First, Pay Later | Digital Services" },
      { name: "description", content: "Websites, mobile apps, AI, SEO, social media and Google Ads. Pay only after we deliver. Trusted by growing brands." },
    ],
  }),
  component: Home,
});

const services = [
  { icon: Globe, title: "Websites", desc: "Fast, SEO-ready", to: "/services" },
  { icon: Smartphone, title: "Mobile Apps", desc: "iOS & Android", to: "/services" },
  { icon: Sparkles, title: "AI Solutions", desc: "Automate ops", to: "/services" },
  { icon: Search, title: "SEO", desc: "Rank higher", to: "/services" },
  { icon: Megaphone, title: "Social Media", desc: "Grow audience", to: "/services" },
  { icon: Target, title: "Google Ads", desc: "Drive leads", to: "/services" },
];

const reasons = [
  { icon: Shield, title: "Risk-free start", desc: "Begin work without upfront cost." },
  { icon: Clock, title: "Transparent tracking", desc: "Live updates on every milestone." },
  { icon: Wallet, title: "Flexible billing", desc: "Pay after deliverables are approved." },
];


function Home() {
  return (
    <>
      <AppHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-background px-5 pb-12 pt-8 text-foreground sm:px-8 sm:pt-12 md:pb-20 md:pt-16">
          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
              {/* Copy column */}
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Work First · Pay Later
                </span>

                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Brand your dream <br className="hidden sm:block" />
                  with <span className="text-foreground underline decoration-primary decoration-4 underline-offset-4">Socilet</span>
                </h1>

                <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-foreground/80 sm:text-lg">
                  Websites, apps, AI & growth — shipped by a senior team. Start today, pay only after we deliver.
                </p>

                {/* Trust strip */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-foreground/75">
                  <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary" /> Zero upfront</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> Milestone-based</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-current text-primary" /> 4.9 / 5 rated</span>
                </div>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                  <Button asChild size="lg" className="bg-gradient-primary shadow-glow hover-scale">
                    <Link to="/estimator">
                      Get instant estimate <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-border bg-background/40 backdrop-blur-sm">
                    <Link to="/portfolio">See our work</Link>
                  </Button>
                </div>

                {/* Social proof */}
                <div className="mt-7 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {["bg-gradient-to-br from-pink-400 to-violet-500", "bg-gradient-to-br from-blue-400 to-cyan-500", "bg-gradient-to-br from-emerald-400 to-indigo-500", "bg-gradient-to-br from-amber-400 to-rose-500"].map((c, i) => (
                      <div key={i} className={`h-7 w-7 rounded-full border-2 border-background ${c}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">120+ brands</span> shipped this year
                  </p>
                </div>
              </div>

              {/* Visual column */}
              <div className="relative hidden md:block">
                <div className="relative mx-auto aspect-square w-full max-w-md">
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-primary opacity-20 blur-2xl" />
                  <Card className="relative h-full overflow-hidden rounded-[2rem] border-primary/20 bg-gradient-card p-6 shadow-glow">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Project Tracker</span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                      </span>
                    </div>
                    <p className="mt-2 font-display text-xl font-bold">Bloom Co. — Shopify rebuild</p>

                    <div className="mt-6 space-y-3">
                      {[
                        { label: "Discovery", done: true },
                        { label: "Design system", done: true },
                        { label: "Development", done: false, active: true },
                        { label: "Launch", done: false },
                      ].map((m) => (
                        <div key={m.label} className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/40 p-3 backdrop-blur-sm">
                          <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${m.done ? "bg-primary text-primary-foreground" : m.active ? "bg-primary/20 text-primary-glow" : "bg-muted text-muted-foreground"}`}>
                            {m.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-3.5 w-3.5" />}
                          </div>
                          <span className={`text-sm ${m.done ? "line-through opacity-60" : "font-medium"}`}>{m.label}</span>
                          {m.active && <span className="ml-auto text-[10px] font-semibold uppercase text-primary-glow">In progress</span>}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-xl bg-gradient-primary p-3 text-primary-foreground">
                      <div className="flex items-center justify-between text-xs opacity-90">
                        <span>Paid so far</span>
                        <span>50%</span>
                      </div>
                      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-primary-foreground/20">
                        <div className="h-full w-1/2 rounded-full bg-primary-foreground" />
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="px-5 py-8">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">Services</h2>
            <Link to="/services" className="text-xs text-primary-glow">View all →</Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {services.map(({ icon: Icon, title, desc, to }) => (
              <Link key={title} to={to}>
                <Card className="bg-gradient-card border-border p-4 transition hover:shadow-glow">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Free Tools banner */}
        <section className="px-5 py-4">
          <Link to="/tools" className="relative block">
            <Card className="relative border-primary/30 bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-amber-500/10 py-5 pl-12 pr-5 transition hover:shadow-glow">
              {/* Left side popup badge — protrudes from card */}
              <div className="absolute -left-2 top-1/2 z-10 -translate-y-1/2">
                <div className="relative flex flex-col items-center justify-center rounded-r-xl rounded-l-md bg-gradient-to-r from-primary via-fuchsia-500 to-fuchsia-600 px-3 py-3 shadow-glow ring-2 ring-white/20">
                  <span className="text-[11px] font-black uppercase tracking-wider text-white leading-none">Free</span>
                  <span className="mt-0.5 text-[9px] font-bold text-white/80 leading-none">Tools</span>
                  <span className="absolute -right-1.5 -top-1.5 flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-white" />
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 rounded-full bg-background/80 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                <Sparkles className="h-3 w-3" /> 100% Free
              </span>
              <h3 className="mt-2 font-display text-lg font-bold">Free Tools for Your Business</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                SEO Checker · Speed Test · Quote Calculator · PDF Quotation Maker
              </p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                Explore all tools <ArrowRight className="h-3 w-3" />
              </div>
            </Card>
          </Link>
        </section>

        {/* Why Choose */}
        <section className="px-5 py-4">
          <h2 className="mb-4 font-display text-xl font-semibold">Why Socilet</h2>
          <div className="space-y-3">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <Card key={title} className="bg-gradient-card flex items-start gap-3 border-border p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary-glow">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Work First Pay Later */}
        <section className="px-5 py-6">
          <Card className="relative overflow-hidden border-primary/30 bg-gradient-primary p-6 text-primary-foreground shadow-glow">
            <Sparkles className="absolute right-4 top-4 h-5 w-5 opacity-60" />
            <h3 className="font-display text-lg font-bold">Work First, Pay Later</h3>
            <p className="mt-2 text-sm opacity-90">
              We deliver milestones first. You review, approve, and pay as you go — with transparent tracking the whole way.
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {["Milestone-based delivery", "Live project dashboard", "Cancel anytime in week 1"].map((t) => (
                <li key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> {t}</li>
              ))}
            </ul>
            <p className="mt-3 text-[10px] opacity-70">Subject to scope and signed agreement. Not a financial product.</p>
          </Card>
        </section>

        {/* Featured Portfolio */}
        <section className="px-5 py-6">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-glow">
                Featured work
              </span>
              <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
                Recent projects we shipped
              </h2>
            </div>
            <Link
              to="/portfolio"
              className="group inline-flex items-center gap-1 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground/80 transition hover:border-primary/40 hover:text-primary-glow"
            >
              All <ArrowUpRight className="h-3 w-3 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible sm:px-0 sm:mx-0 lg:grid-cols-4">
            {portfolioProjects.slice(0, 8).map((p, i) => (
              <a
                key={p.id}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative min-w-[78%] snap-start sm:min-w-0"
              >
                <Card className="relative h-full overflow-hidden border-border/60 bg-card p-0 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
                  {/* Cover */}
                  <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${getPortfolioColor(i)}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display text-3xl font-bold text-white/90 drop-shadow-sm">
                        {p.title.charAt(0)}
                      </span>
                    </div>
                    <span className="absolute left-2 top-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/90 backdrop-blur-sm">
                      {p.cat}
                    </span>
                    <span className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition group-hover:opacity-100">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  {/* Content */}
                  <div className="space-y-1.5 p-3">
                    <p className="truncate text-sm font-semibold transition group-hover:text-primary-glow">
                      {p.title}
                    </p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">{p.tag}</p>
                    <div className="flex items-center gap-1.5 pt-1 text-[10px] font-medium text-emerald-400">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      {p.result}
                    </div>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        </section>
        {/* Video Testimonials */}
        <VideoTestimonials />

        {/* Google Reviews */}
        <GoogleReviews />

        {/* CTA */}
        <section className="px-5 py-8">
          <Card className="border-border bg-surface-elevated p-5 text-center">
            <h3 className="font-display text-lg font-bold">Ready to start?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Get a custom estimate in under 2 minutes.</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button asChild className="bg-gradient-primary shadow-glow">
                <Link to="/estimator">Estimate</Link>
              </Button>
              <Button asChild variant="outline" className="bg-transparent">
                <Link to="/support"><MessageCircle className="mr-1 h-4 w-4" /> Chat</Link>
              </Button>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}
