import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Globe, Smartphone, Sparkles, Search, Megaphone, Target,
  ArrowRight, Shield, Clock, Wallet, Star, CheckCircle2, MessageCircle,
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

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

const testimonials = [
  { name: "Priya R.", role: "Founder, Bloom Co.", quote: "Socilet shipped our store in 3 weeks. Sales doubled in month one." },
  { name: "Arjun M.", role: "CEO, FinEdge", quote: "Their AI automation saved us 30+ hours every week. Real ROI." },
  { name: "Sara K.", role: "Marketing Lead", quote: "Best agency we've worked with. Communication is unmatched." },
];

function Home() {
  return (
    <>
      <AppHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-hero px-5 pb-12 pt-8 sm:px-8 sm:pt-12 md:pb-20 md:pt-16">
          {/* Background image + gradient overlays */}
          <img
            src={heroBg}
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-accent/25 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,transparent_40%,hsl(var(--background))_95%)]"
          />

          <div className="relative mx-auto max-w-6xl">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
              {/* Copy column */}
              <div className="animate-fade-in">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-glow backdrop-blur-sm">
                  <Sparkles className="h-3.5 w-3.5" /> Work First · Pay Later
                </span>

                <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
                  Brand your dream <br className="hidden sm:block" />
                  with <span className="text-gradient">Socilet</span>
                </h1>

                <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Websites, apps, AI & growth — shipped by a senior team. Start today, pay only after we deliver.
                </p>

                {/* Trust strip */}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5"><Shield className="h-3.5 w-3.5 text-primary-glow" /> Zero upfront</span>
                  <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary-glow" /> Milestone-based</span>
                  <span className="inline-flex items-center gap-1.5"><Star className="h-3.5 w-3.5 fill-current text-primary-glow" /> 4.9 / 5 rated</span>
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
        <section className="px-5 py-4">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">Featured work</h2>
            <Link to="/portfolio" className="text-xs text-primary-glow">All projects →</Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 -mx-5 px-5">
            {[
              { title: "Bloom Commerce", tag: "Shopify rebuild", color: "from-pink-500/30 to-violet-500/30" },
              { title: "FinEdge CRM", tag: "Custom SaaS", color: "from-blue-500/30 to-cyan-500/30" },
              { title: "MetroFit App", tag: "iOS & Android", color: "from-emerald-500/30 to-indigo-500/30" },
            ].map((p) => (
              <Card key={p.title} className="min-w-[240px] snap-start overflow-hidden border-border bg-card">
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.color}`} />
                <div className="p-3">
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.tag}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-5 py-4">
          <h2 className="mb-4 font-display text-xl font-semibold">Clients love us</h2>
          <div className="space-y-3">
            {testimonials.map((t) => (
              <Card key={t.name} className="bg-gradient-card border-border p-4">
                <div className="mb-2 flex gap-0.5 text-primary-glow">
                  {[0,1,2,3,4].map(i => <Star key={i} className="h-3.5 w-3.5 fill-current" />)}
                </div>
                <p className="text-sm">{t.quote}</p>
                <p className="mt-2 text-xs text-muted-foreground">{t.name} · {t.role}</p>
              </Card>
            ))}
          </div>
        </section>

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
