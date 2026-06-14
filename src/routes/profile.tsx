import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Briefcase, Ticket, Gift, ChevronRight, Bell, BookOpen, Wrench } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile | Socilet" },
      { name: "description", content: "Saved estimates, submitted projects, support tickets and referral stats." },
    ],
  }),
  component: Profile,
});

type Estimate = { projectType: string; min: number; max: number; at: number };

function Profile() {
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  useEffect(() => {
    try {
      const raw = localStorage.getItem("socilet:lastEstimate");
      if (raw) setEstimate(JSON.parse(raw));
    } catch {}
  }, []);

  const menu = [
    { to: "/estimator", icon: FileText, label: "Saved estimates", desc: estimate ? "1 saved" : "None yet" },
    { to: "/portfolio", icon: Briefcase, label: "Submitted projects", desc: "Track via support" },
    { to: "/support", icon: Ticket, label: "Support tickets", desc: "Open / closed" },
    { to: "/referral", icon: Gift, label: "Referrals", desc: "Earn credits" },
    { to: "/notifications", icon: Bell, label: "Notifications", desc: "Updates & offers" },
    { to: "/blog", icon: BookOpen, label: "Blog", desc: "Read insights" },
    { to: "/services", icon: Wrench, label: "Services", desc: "Explore all" },
  ] as const;

  return (
    <>
      <AppHeader title="Profile" back />
      <main className="px-5 py-5">
        <Card className="bg-gradient-card flex items-center gap-3 border-border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
            <User className="h-6 w-6" />
          </div>
          <div>
            <p className="font-display font-semibold">Guest</p>
            <p className="text-xs text-muted-foreground">Sign in coming soon</p>
          </div>
        </Card>

        {estimate && (
          <Card className="mt-4 border-primary/30 bg-primary/10 p-4">
            <p className="text-[10px] uppercase tracking-widest text-primary-glow">Last estimate</p>
            <p className="mt-1 font-display text-lg font-semibold capitalize">{estimate.projectType}</p>
            <p className="text-gradient font-display text-xl font-bold">
              ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
            </p>
            <Button asChild size="sm" className="mt-3 bg-gradient-primary">
              <Link to="/estimator">New estimate</Link>
            </Button>
          </Card>
        )}

        <div className="mt-5 space-y-2">
          {menu.map(({ to, icon: Icon, label, desc }) => (
            <Link key={label} to={to}>
              <Card className="flex items-center gap-3 border-border bg-card p-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-primary-glow">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-[11px] text-muted-foreground">{desc}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          Socilet · Brand Your Dream · v1.0
        </p>
      </main>
    </>
  );
}
