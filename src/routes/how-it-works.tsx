import { createFileRoute, Link } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calculator, FileSearch, Layers, CheckCircle2, Wallet,
  Shield, Clock, ArrowRight, Sparkles, MessageCircle
} from "lucide-react";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works | Socilet — Work First, Pay Later" },
      { name: "description", content: "Learn how Socilet's Work First, Pay Later model works in 4 simple steps. Zero advance, milestone-based delivery, pay only after approval." },
      { property: "og:title", content: "How It Works | Socilet" },
      { property: "og:description", content: "Zero advance payment. Milestone-based delivery. Pay only after you approve." },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    num: "01",
    icon: Calculator,
    title: "Get Your Estimate",
    titleHi: "अपना एस्टीमेट लें",
    desc: "Use our AI estimator to get an instant price range for your project. Takes under 2 minutes. No commitment required.",
    descHi: "हमारे AI एस्टीमेटर से तुरंत प्राइस रेंज जानें। 2 मिनट से भी कम समय। कोई कमिटमेंट नहीं।",
    cta: "Get estimate →",
    ctaTo: "/estimator",
    color: "from-emerald-400 to-teal-500",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-400/30",
  },
  {
    num: "02",
    icon: FileSearch,
    title: "Scope & Agreement",
    titleHi: "स्कोप और एग्रीमेंट",
    desc: "We schedule a free discovery call, define milestones, and sign a mutual agreement. You know exactly what you're getting and when.",
    descHi: "हम फ्री डिस्कवरी कॉल रखते हैं, मील-स्टोन तय करते हैं, और म्यूचुअल एग्रीमेंट साइन करते हैं। आप जानते हैं कि क्या मिलेगा और कब।",
    cta: "Book a call →",
    ctaTo: "/support",
    color: "from-sky-400 to-cyan-500",
    bg: "bg-sky-500/10",
    ring: "ring-sky-400/30",
  },
  {
    num: "03",
    icon: Layers,
    title: "Milestone Delivery",
    titleHi: "मील-स्टोन डिलीवरी",
    desc: "We build and deliver each milestone for your review. Live project tracking keeps you updated. Revisions included at every stage.",
    descHi: "हम हर मील-स्टोन बनाकर रिव्यू के लिए भेजते हैं। लाइव ट्रैकिंग से अपडेटेड रहें। हर स्टेज पर रिवीजन शामिल।",
    cta: null,
    ctaTo: null,
    color: "from-violet-400 to-fuchsia-500",
    bg: "bg-violet-500/10",
    ring: "ring-violet-400/30",
  },
  {
    num: "04",
    icon: CheckCircle2,
    title: "Review & Pay",
    titleHi: "रिव्यू और पेमेंट",
    desc: "You review, approve, and pay only for milestones you accept. For WordPress: 100% after completion. For React: 45% at 30% done, rest on finish.",
    descHi: "आप रिव्यू करें, अप्रूव करें, और केवल स्वीकृत मील-स्टोन के लिए पे करें। WordPress: पूरा होने के बाद 100%। React: 30% पर 45%, बाकी फिनिश पर।",
    cta: null,
    ctaTo: null,
    color: "from-amber-400 to-orange-500",
    bg: "bg-amber-500/10",
    ring: "ring-amber-400/30",
  },
];

const trustPoints = [
  { icon: Shield, title: "Zero Advance", desc: "No upfront payment. Ever." },
  { icon: Clock, title: "Live Tracking", desc: "See progress in real-time." },
  { icon: Wallet, title: "Pay Per Milestone", desc: "Only pay what you approve." },
];

function HowItWorks() {
  return (
    <>
      <AppHeader title="How It Works" back />
      <main className="px-5 py-5">
        {/* Hero */}
        <section className="mb-8">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/35 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" /> Work First · Pay Later
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight">
            How Socilet works
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We deliver first. You review, approve, and pay. A simple 4-step process designed to eliminate risk and build trust from day one.
          </p>
        </section>

        {/* Steps Timeline */}
        <section className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-violet-500/40 to-amber-500/40" />

          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === steps.length - 1;
              return (
                <div key={step.num} className="relative pl-12">
                  {/* Number badge */}
                  <div className={`absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold shadow-lg ${step.ring} ring-2`}>
                    {step.num}
                  </div>

                  <Card className={`border-border ${step.bg} p-4`}>
                    <div className="flex items-start gap-3">
                      <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${step.color} text-white shadow-md`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{step.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                        {step.cta && step.ctaTo && (
                          <Button asChild size="sm" variant="ghost" className="mt-2 h-auto p-0 text-xs font-semibold text-primary-glow hover:text-primary hover:bg-transparent">
                            <Link to={step.ctaTo}>
                              {step.cta}
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>

                  {/* Connector dot for non-last items */}
                  {!isLast && (
                    <div className="absolute left-[15px] top-[52px] h-2 w-2 rounded-full bg-muted-foreground/30" />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust strip */}
        <section className="mt-8">
          <h2 className="mb-4 font-display text-lg font-semibold">Why clients trust us</h2>
          <div className="grid grid-cols-3 gap-2">
            {trustPoints.map((t) => {
              const Icon = t.icon;
              return (
                <Card key={t.title} className="border-border bg-card p-3 text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary-glow">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-[11px] font-semibold leading-tight">{t.title}</p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground leading-tight">{t.desc}</p>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Risk free note */}
        <Card className="mt-6 border-primary/30 bg-gradient-primary p-5 text-primary-foreground">
          <h3 className="font-display text-lg font-bold">Cancel anytime in Week 1</h3>
          <p className="mt-2 text-sm opacity-90">
            Not feeling it? Cancel within the first week with zero obligation. We only win when you're genuinely happy with the work.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {["No setup fees", "No hidden charges", "Full ownership transfer on final payment"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> {item}
              </li>
            ))}
          </ul>
        </Card>

        {/* CTA */}
        <section className="mt-6 text-center">
          <p className="text-sm font-medium">Ready to start risk-free?</p>
          <div className="mt-3 flex flex-col gap-2">
            <Button asChild size="lg" className="bg-gradient-primary shadow-glow">
              <Link to="/estimator">
                Get instant estimate <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://wa.me/919301139140" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4 text-[#25D366]" /> Ask on WhatsApp
              </a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
