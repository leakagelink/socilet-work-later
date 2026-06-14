import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, Globe, ShoppingBag, Smartphone, Database, Cloud, Bot, Wrench, Sparkles, Palette, FileCode, Link2, Layers, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/estimator")({
  head: () => ({
    meta: [
      { title: "AI Project Estimator | Socilet" },
      { name: "description", content: "Get a custom project estimate for web, app, AI or SaaS in under 2 minutes." },
    ],
  }),
  component: Estimator,
});

const projectTypes = [
  { id: "landing", label: "Landing Page", icon: Globe, base: 50, max: 50 },
  { id: "website", label: "Business Website", icon: Globe, base: 100, max: 1500 },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingBag, base: 200, max: 2500 },
  { id: "webapp", label: "Web Application", icon: Wrench, base: 50, max: 5000 },
  { id: "crm", label: "CRM", icon: Database, base: 50, max: 5000 },
  { id: "ai", label: "AI Automation", icon: Bot, base: 50, max: 5000 },
  { id: "mobile", label: "Mobile App", icon: Smartphone, base: 10000, max: 10000 },
  { id: "saas", label: "SaaS Product", icon: Cloud, base: 10000, max: 10000 },
];

const featuresList = [
  { id: "auth", label: "Authentication", cost: 300 },
  { id: "payments", label: "Payments / Checkout", cost: 600 },
  { id: "admin", label: "Admin dashboard", cost: 700 },
  { id: "notifications", label: "Push notifications", cost: 250 },
  { id: "chat", label: "Live chat / messaging", cost: 500 },
  { id: "ai", label: "AI features", cost: 800 },
  { id: "analytics", label: "Analytics & reports", cost: 400 },
  { id: "integrations", label: "3rd-party integrations", cost: 500 },
];

const timelines = [
  { id: "rush", label: "Under 2 weeks", mult: 1.4 },
  { id: "standard", label: "2–6 weeks", mult: 1 },
  { id: "flexible", label: "Flexible", mult: 0.9 },
];

const designOptions = [
  { id: "ready", label: "I have designs ready", desc: "Figma / mockups done", mult: 0.9 },
  { id: "partial", label: "Partial / wireframes", desc: "Some sketches", mult: 1 },
  { id: "need", label: "Need UI/UX design too", desc: "Start from scratch", mult: 1.25 },
];

const techOptions = [
  { id: "no-preference", label: "No preference" },
  { id: "react-next", label: "React / Next.js" },
  { id: "wordpress", label: "WordPress" },
  { id: "flutter", label: "Flutter" },
  { id: "react-native", label: "React Native" },
  { id: "shopify", label: "Shopify" },
  { id: "other", label: "Other" },
];

const referralSources = [
  { id: "google", label: "Google Search" },
  { id: "instagram", label: "Instagram" },
  { id: "referral", label: "Friend / Referral" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "youtube", label: "YouTube" },
  { id: "other", label: "Other" },
];

function Estimator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [userBudget, setUserBudget] = useState<string>("");
  const [designStatus, setDesignStatus] = useState<string>("");
  const [pagesCount, setPagesCount] = useState<string>("");
  const [techPref, setTechPref] = useState<string>("");
  const [referenceLinks, setReferenceLinks] = useState<string>("");
  const [referralSource, setReferralSource] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [referralApplied, setReferralApplied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Auto-capture ?ref= from URL or previously saved code
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const fromUrl = params.get("ref");
      const stored = localStorage.getItem("socilet:refUsed");
      const code = (fromUrl || stored || "").trim().toUpperCase();
      const myCode = (localStorage.getItem("socilet:refCode") || "").toUpperCase();
      // Don't let users apply their own code
      if (code && code !== myCode) {
        setReferralCode(code);
        setReferralApplied(true);
        if (fromUrl) localStorage.setItem("socilet:refUsed", code);
      }
    } catch {}
  }, []);

  const isLanding = projectType === "landing";
  const stepFlow = isLanding ? [1, 4, 5] : [1, 2, 3, 4, 5];
  const currentIdx = Math.max(0, stepFlow.indexOf(step));
  const totalSteps = stepFlow.length;
  const displayStep = currentIdx + 1;
  const progress = (displayStep / totalSteps) * 100;
  const isLastStep = currentIdx === stepFlow.length - 1;
  const goNext = () => setStep(stepFlow[Math.min(currentIdx + 1, stepFlow.length - 1)]);
  const goBack = () => setStep(stepFlow[Math.max(currentIdx - 1, 0)]);

  const proj = projectTypes.find((p) => p.id === projectType);
  const base = proj?.base ?? 0;
  const maxBase = proj?.max ?? base;
  const featuresCost = features.reduce((s, id) => s + (featuresList.find((f) => f.id === id)?.cost ?? 0), 0);
  const mult = timelines.find((t) => t.id === timeline)?.mult ?? 1;
  const designMult = designOptions.find((d) => d.id === designStatus)?.mult ?? 1;
  const pagesNum = pagesCount ? Math.min(Number(pagesCount), 200) : 0;
  const pagesCost = pagesNum > 5 ? (pagesNum - 5) * 80 : 0;
  const rawMin = Math.round(((base + featuresCost + pagesCost) * mult) * designMult);
  const rawMax = Math.round(((maxBase + featuresCost + pagesCost) * mult) * designMult);
  const discountPct = referralApplied ? 0.1 : 0;
  const min = Math.round(rawMin * (1 - discountPct));
  const max = Math.round(rawMax * (1 - discountPct));
  const discountAmount = rawMin - min;

  const toggleFeature = (id: string) =>
    setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const submit = async () => {
    if (!contact.name || !contact.email) {
      toast.error("Please add your name and email");
      return;
    }
    setSubmitting(true);
    const budgetNum = userBudget ? Number(userBudget.replace(/[^0-9.]/g, "")) : null;
    const finalCode = referralApplied ? referralCode.trim().toUpperCase() : null;
    const { error } = await supabase.from("estimates").insert({
      project_type: projectType,
      features,
      timeline,
      budget_min: min,
      budget_max: max,
      user_budget: budgetNum,
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      notes: contact.notes || null,
      design_status: designStatus || null,
      pages_count: pagesNum || null,
      tech_preference: techPref || null,
      reference_links: referenceLinks || null,
      referral_source: referralSource || null,
      referral_code: finalCode,
      discount_amount: finalCode ? discountAmount : null,
    });
    if (!error && finalCode) {
      // Track referral conversion (referrer gets 10% commission)
      await supabase.from("referrals").insert({
        code: finalCode,
        referred_email: contact.email,
        status: "converted",
      });
    }
    setSubmitting(false);
    if (error) return toast.error("Could not save estimate. Try again.");
    try { localStorage.setItem("socilet:lastEstimate", JSON.stringify({ projectType, features, timeline, min, max, userBudget: budgetNum, at: Date.now() })); } catch {}
    toast.success(
      finalCode
        ? "10% referral discount applied! Our team will be in touch shortly."
        : budgetNum
          ? "Budget received! Our team will confirm on email & WhatsApp shortly."
          : "Estimate saved! We'll be in touch."
    );
    navigate({ to: "/profile" });
  };

  return (
    <>
      <AppHeader title="AI Project Estimator" back />
      <main className="px-5 py-5">
        <Progress value={progress} className="mb-1 h-1.5" />
        <p className="mb-5 text-xs text-muted-foreground">Step {step} of {totalSteps}</p>

        {step === 1 && (
          <section>
            <h2 className="font-display text-xl font-semibold">What are you building?</h2>
            <p className="mb-4 text-sm text-muted-foreground">Pick the closest match.</p>
            <div className="grid grid-cols-2 gap-3">
              {projectTypes.map(({ id, label, icon: Icon }) => {
                const active = projectType === id;
                return (
                  <button
                    key={id}
                    onClick={() => setProjectType(id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active ? "border-primary bg-primary/10 shadow-glow" : "border-border bg-card hover:bg-secondary"
                    }`}
                  >
                    <Icon className={`mb-2 h-5 w-5 ${active ? "text-primary-glow" : "text-muted-foreground"}`} />
                    <p className="text-sm font-semibold">{label}</p>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Which features?</h2>
            <p className="mb-4 text-sm text-muted-foreground">Select all that apply.</p>
            <div className="space-y-2">
              {featuresList.map((f) => {
                const active = features.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggleFeature(f.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-3 transition ${
                      active ? "border-primary bg-primary/10" : "border-border bg-card"
                    }`}
                  >
                    <span className="text-sm font-medium">{f.label}</span>
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                      active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                    }`}>
                      {active && <Check className="h-3.5 w-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Scope & tech</h2>
            <p className="mb-4 text-sm text-muted-foreground">Helps us estimate more accurately.</p>

            <div className="mb-5">
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <Palette className="h-4 w-4 text-primary-glow" /> Design status
              </Label>
              <div className="space-y-2">
                {designOptions.map((d) => {
                  const active = designStatus === d.id;
                  return (
                    <button
                      key={d.id}
                      onClick={() => setDesignStatus(d.id)}
                      className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                        active ? "border-primary bg-primary/10" : "border-border bg-card"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium">{d.label}</p>
                        <p className="text-[11px] text-muted-foreground">{d.desc}</p>
                      </div>
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        active ? "border-primary bg-primary text-primary-foreground" : "border-border"
                      }`}>
                        {active && <Check className="h-3 w-3" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-5">
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <Layers className="h-4 w-4 text-primary-glow" /> Approx. pages / screens
              </Label>
              <Input
                type="number"
                inputMode="numeric"
                min={1}
                max={200}
                value={pagesCount}
                onChange={(e) => setPagesCount(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder="e.g. 8"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">Rough number is fine.</p>
            </div>

            <div className="mb-5">
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <FileCode className="h-4 w-4 text-primary-glow" /> Tech preference
              </Label>
              <div className="flex flex-wrap gap-2">
                {techOptions.map((t) => {
                  const active = techPref === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTechPref(t.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                        active ? "border-primary bg-primary/15 text-primary-glow" : "border-border bg-card text-muted-foreground"
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <Label className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
                <Link2 className="h-4 w-4 text-primary-glow" /> Reference websites / apps (optional)
              </Label>
              <Textarea
                value={referenceLinks}
                onChange={(e) => setReferenceLinks(e.target.value)}
                placeholder="Paste 1-3 links you like the look or feel of…"
                rows={3}
              />
            </div>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Timeline</h2>
            <p className="mb-4 text-sm text-muted-foreground">When do you need this live?</p>
            <div className="space-y-2">
              {timelines.map((t) => {
                const active = timeline === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTimeline(t.id)}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
                      active ? "border-primary bg-primary/10" : "border-border bg-card"
                    }`}
                  >
                    <span className="text-sm font-medium">{t.label}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                );
              })}
            </div>

            <Card className="bg-gradient-card mt-6 border-primary/30 p-5">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Estimated range</p>
              {referralApplied && (
                <p className="mt-1 text-sm text-muted-foreground line-through">
                  ${rawMin.toLocaleString()} – ${rawMax.toLocaleString()}
                </p>
              )}
              <p className="mt-1 font-display text-3xl font-bold text-gradient">
                ${min.toLocaleString()} – ${max.toLocaleString()}
              </p>
              {referralApplied && (
                <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-500">
                  <Tag className="h-3 w-3" /> 10% referral discount applied
                </p>
              )}
              <p className="mt-1 text-[11px] text-muted-foreground">
                Indicative only. Final scope confirmed after a short discovery call.
              </p>
            </Card>
          </section>
        )}

        {step === 5 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Your details</h2>
            <p className="mb-4 text-sm text-muted-foreground">We'll send your estimate & a free consult.</p>
            <div className="space-y-3">
              <div><Label>Full name</Label><Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Jane Cooper" /></div>
              <div><Label>Email</Label><Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="jane@company.com" /></div>
              <div><Label>Phone (optional)</Label><Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+1 555 000 1234" /></div>
              <div><Label>Notes (optional)</Label><Textarea value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} placeholder="Tell us a bit more about your project..." /></div>
              <div>
                <Label>How did you find us? (optional)</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {referralSources.map((r) => {
                    const active = referralSource === r.id;
                    return (
                      <button
                        key={r.id}
                        onClick={() => setReferralSource(r.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          active ? "border-primary bg-primary/15 text-primary-glow" : "border-border bg-card text-muted-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            <Card className="mt-4 border-emerald-500/30 bg-emerald-500/5 p-4">
              <Label className="flex items-center gap-1.5 text-sm font-semibold">
                <Tag className="h-4 w-4 text-emerald-500" /> Referral code (optional)
              </Label>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Got a code from a friend? Get 10% off your project.
              </p>
              <div className="mt-2 flex gap-2">
                <Input
                  value={referralCode}
                  onChange={(e) => { setReferralCode(e.target.value.toUpperCase()); setReferralApplied(false); }}
                  placeholder="e.g. SOCABC12"
                  className="uppercase"
                  disabled={referralApplied}
                />
                {referralApplied ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => { setReferralApplied(false); setReferralCode(""); try { localStorage.removeItem("socilet:refUsed"); } catch {} }}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => {
                      const c = referralCode.trim().toUpperCase();
                      const myCode = (localStorage.getItem("socilet:refCode") || "").toUpperCase();
                      if (!c) return toast.error("Enter a referral code");
                      if (c === myCode) return toast.error("You can't use your own referral code");
                      if (!/^SOC[A-Z0-9]{4,}$/.test(c)) return toast.error("Invalid code format");
                      setReferralApplied(true);
                      try { localStorage.setItem("socilet:refUsed", c); } catch {}
                      toast.success("10% discount applied!");
                    }}
                  >
                    Apply
                  </Button>
                )}
              </div>
              {referralApplied && (
                <p className="mt-2 text-[11px] font-medium text-emerald-500">
                  ✓ 10% off applied — you save ${discountAmount.toLocaleString()}
                </p>
              )}
            </Card>
            <Card className="bg-gradient-card mt-4 border-border p-4">
              <p className="text-xs text-muted-foreground">Your estimate</p>
              {referralApplied && (
                <p className="text-xs text-muted-foreground line-through">
                  ${rawMin.toLocaleString()} – ${rawMax.toLocaleString()}
                </p>
              )}
              <p className="font-display text-lg font-semibold text-gradient">
                ${min.toLocaleString()} – ${max.toLocaleString()}
              </p>
            </Card>

            {/* Budget proposal */}
            <Card className="mt-4 border-primary/30 bg-primary/5 p-4">
              <div className="flex items-start gap-2">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" />
                <div className="flex-1">
                  <Label className="text-sm font-semibold">Your budget (optional)</Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Share what you can invest. If it's workable, our team will confirm on email & WhatsApp.
                  </p>
                  <div className="relative mt-2">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">$</span>
                    <Input
                      type="text"
                      inputMode="numeric"
                      value={userBudget}
                      onChange={(e) => setUserBudget(e.target.value.replace(/[^0-9.]/g, ""))}
                      placeholder="e.g. 1500"
                      className="pl-7"
                    />
                  </div>
                  {userBudget && (
                    <p className="mt-2 rounded-md bg-background/60 px-2 py-1.5 text-[11px] text-muted-foreground">
                      Proposing <span className="font-semibold text-foreground">${Number(userBudget).toLocaleString()}</span>. We'll review & reply within 24 hours.
                    </p>
                  )}
                </div>
              </div>
            </Card>
          </section>
        )}

        <div className="mt-8 flex gap-2">
          {step > 1 && (
            <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setStep(step - 1)}>Back</Button>
          )}
          {step < totalSteps ? (
            <Button
              className="flex-1 bg-gradient-primary shadow-glow"
              disabled={(step === 1 && !projectType) || (step === 4 && !timeline)}
              onClick={() => setStep(step + 1)}
            >
              Continue
            </Button>
          ) : (
            <Button className="flex-1 bg-gradient-primary shadow-glow" disabled={submitting} onClick={submit}>
              <Sparkles className="mr-1 h-4 w-4" /> {submitting ? "Saving..." : "Get my estimate"}
            </Button>
          )}
        </div>

        {step === 1 && (
          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have a project? <Link to="/support" className="text-primary-glow">Chat with us →</Link>
          </p>
        )}
      </main>
    </>
  );
}
