import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Check, ChevronRight, Globe, ShoppingBag, Smartphone, Database, Cloud, Bot, Wrench, Sparkles } from "lucide-react";
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
  { id: "website", label: "Website", icon: Globe, base: 800 },
  { id: "ecommerce", label: "Ecommerce", icon: ShoppingBag, base: 1500 },
  { id: "mobile", label: "Mobile App", icon: Smartphone, base: 3000 },
  { id: "crm", label: "CRM", icon: Database, base: 2500 },
  { id: "saas", label: "SaaS", icon: Cloud, base: 5000 },
  { id: "ai", label: "AI Automation", icon: Bot, base: 2000 },
  { id: "custom", label: "Custom Software", icon: Wrench, base: 3500 },
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

function Estimator() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [projectType, setProjectType] = useState<string>("");
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const base = projectTypes.find((p) => p.id === projectType)?.base ?? 0;
  const featuresCost = features.reduce((s, id) => s + (featuresList.find((f) => f.id === id)?.cost ?? 0), 0);
  const mult = timelines.find((t) => t.id === timeline)?.mult ?? 1;
  const min = Math.round((base + featuresCost) * mult);
  const max = Math.round(min * 1.5);

  const toggleFeature = (id: string) =>
    setFeatures((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const submit = async () => {
    if (!contact.name || !contact.email) {
      toast.error("Please add your name and email");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("estimates").insert({
      project_type: projectType,
      features,
      timeline,
      budget_min: min,
      budget_max: max,
      name: contact.name,
      email: contact.email,
      phone: contact.phone || null,
      notes: contact.notes || null,
    });
    setSubmitting(false);
    if (error) return toast.error("Could not save estimate. Try again.");
    try { localStorage.setItem("socilet:lastEstimate", JSON.stringify({ projectType, features, timeline, min, max, at: Date.now() })); } catch {}
    toast.success("Estimate saved! We'll be in touch.");
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
              <p className="mt-1 font-display text-3xl font-bold text-gradient">
                ${min.toLocaleString()} – ${max.toLocaleString()}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Indicative only. Final scope confirmed after a short discovery call.
              </p>
            </Card>
          </section>
        )}

        {step === 4 && (
          <section>
            <h2 className="font-display text-xl font-semibold">Your details</h2>
            <p className="mb-4 text-sm text-muted-foreground">We'll send your estimate & a free consult.</p>
            <div className="space-y-3">
              <div><Label>Full name</Label><Input value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Jane Cooper" /></div>
              <div><Label>Email</Label><Input type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="jane@company.com" /></div>
              <div><Label>Phone (optional)</Label><Input value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+1 555 000 1234" /></div>
              <div><Label>Notes (optional)</Label><Textarea value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} placeholder="Tell us a bit more about your project..." /></div>
            </div>
            <Card className="bg-gradient-card mt-4 border-border p-4">
              <p className="text-xs text-muted-foreground">Your estimate</p>
              <p className="font-display text-lg font-semibold text-gradient">
                ${min.toLocaleString()} – ${max.toLocaleString()}
              </p>
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
              disabled={(step === 1 && !projectType) || (step === 3 && !timeline)}
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
