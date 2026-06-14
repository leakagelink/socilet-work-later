import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, FileText, Briefcase, Ticket, Gift, ChevronRight, Bell, BookOpen, Wrench, Shield, LogOut, LogIn, HelpCircle, Route as RouteIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/profile")({
  ssr: false,
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
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("socilet:lastEstimate");
      if (raw) setEstimate(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
      .then(({ data }) => setFullName(data?.full_name ?? null));
  }, [user]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out");
    navigate({ to: "/" });
  };

  const menu = [
    { to: "/estimator" as const, icon: FileText, label: "Saved estimates", desc: estimate ? "1 saved" : "None yet" },
    { to: "/portfolio" as const, icon: Briefcase, label: "Submitted projects", desc: "Track via support" },
    { to: "/how-it-works" as const, icon: RouteIcon, label: "How it works", desc: "Our process" },
    { to: "/faq" as const, icon: HelpCircle, label: "FAQ", desc: "Questions answered" },
    { to: "/support" as const, icon: Ticket, label: "Support tickets", desc: "Open / closed" },
    { to: "/referral" as const, icon: Gift, label: "Referrals", desc: "Earn credits" },
    { to: "/notifications" as const, icon: Bell, label: "Notifications", desc: "Updates & offers" },
    { to: "/blog" as const, icon: BookOpen, label: "Blog", desc: "Read insights" },
    { to: "/services" as const, icon: Wrench, label: "Services", desc: "Explore all" },
  ];

  return (
    <>
      <AppHeader title="Profile" back />
      <main className="px-5 py-5">
        <Card className="bg-gradient-card flex items-center gap-3 border-border p-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow">
            <User className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-display font-semibold truncate">
              {loading ? "…" : fullName ?? (user ? user.email : "Guest")}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user ? user.email : "Sign in to track your projects"}
            </p>
          </div>
          {!loading && !user && (
            <Button asChild size="sm" className="bg-gradient-primary">
              <Link to="/auth"><LogIn className="mr-1 h-3.5 w-3.5" />Sign in</Link>
            </Button>
          )}
        </Card>

        {isAdmin && (
          <Link to="/admin">
            <Card className="mt-3 flex items-center gap-3 border-primary/40 bg-primary/10 p-3.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground shadow-glow">
                <Shield className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Admin Dashboard</p>
                <p className="text-[11px] text-muted-foreground">Leads, estimates, tickets</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Card>
          </Link>
        )}

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

        {user && (
          <Button onClick={handleLogout} variant="outline" className="mt-5 w-full">
            <LogOut className="mr-2 h-4 w-4" /> Sign out
          </Button>
        )}

        <p className="mt-6 text-center text-[10px] text-muted-foreground">
          Socilet · Brand Your Dream · v1.0
        </p>
      </main>
    </>
  );
}
