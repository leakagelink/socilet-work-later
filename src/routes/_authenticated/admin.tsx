import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Calendar, FileText, Users, Ticket as TicketIcon, Gift } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard | Socilet" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Lead = { id: string; name: string; email: string; phone: string | null; service: string | null; message: string | null; created_at: string };
type Estimate = { id: string; name: string; email: string; project_type: string; budget_min: number | null; budget_max: number | null; timeline: string | null; created_at: string };
type Ticket = { id: string; name: string; email: string; subject: string; status: string; created_at: string };
type Referral = { id: string; code: string; referrer_email: string | null; status: string; created_at: string };

function AdminPage() {
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return navigate({ to: "/auth" });
      const { data: roleRow } = await supabase
        .from("user_roles").select("role").eq("user_id", u.user.id).eq("role", "admin").maybeSingle();
      if (!roleRow) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setAuthorized(true);

      const [l, e, t, r] = await Promise.all([
        supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("estimates").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("support_tickets").select("*").order("created_at", { ascending: false }).limit(100),
        supabase.from("referrals").select("*").order("created_at", { ascending: false }).limit(100),
      ]);
      if (l.error) toast.error("Leads: " + l.error.message);
      setLeads((l.data as Lead[]) ?? []);
      setEstimates((e.data as Estimate[]) ?? []);
      setTickets((t.data as Ticket[]) ?? []);
      setReferrals((r.data as Referral[]) ?? []);
      setLoading(false);
    })();
  }, [navigate]);

  if (loading) {
    return (
      <>
        <AppHeader title="Admin" back />
        <div className="flex flex-1 items-center justify-center py-20"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      </>
    );
  }

  if (!authorized) {
    return (
      <>
        <AppHeader title="Admin" back />
        <main className="px-5 py-10 text-center">
          <h2 className="font-display text-xl font-bold">Access denied</h2>
          <p className="mt-2 text-sm text-muted-foreground">Admin role required to view this panel.</p>
        </main>
      </>
    );
  }

  const stats = [
    { label: "Leads", value: leads.length, icon: Users },
    { label: "Estimates", value: estimates.length, icon: FileText },
    { label: "Tickets", value: tickets.length, icon: TicketIcon },
    { label: "Referrals", value: referrals.length, icon: Gift },
  ];

  return (
    <>
      <AppHeader title="Admin" back />
      <main className="px-4 py-4">
        <div className="grid grid-cols-2 gap-2">
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} className="border-border bg-gradient-card p-3">
              <div className="flex items-center justify-between">
                <Icon className="h-4 w-4 text-primary-glow" />
                <span className="text-2xl font-bold text-gradient">{value}</span>
              </div>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="leads" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="estimates">Quotes</TabsTrigger>
            <TabsTrigger value="tickets">Tickets</TabsTrigger>
            <TabsTrigger value="referrals">Refer</TabsTrigger>
          </TabsList>

          <TabsContent value="leads" className="mt-3 space-y-2">
            {leads.length === 0 && <EmptyMsg label="No leads yet" />}
            {leads.map((l) => (
              <Card key={l.id} className="border-border bg-card p-3">
                <div className="flex items-start justify-between">
                  <p className="font-semibold">{l.name}</p>
                  <span className="text-[10px] text-muted-foreground">{fmt(l.created_at)}</span>
                </div>
                <Row icon={Mail}>{l.email}</Row>
                {l.phone && <Row icon={Phone}>{l.phone}</Row>}
                {l.service && <Badge variant="secondary" className="mt-2">{l.service}</Badge>}
                {l.message && <p className="mt-2 text-xs text-muted-foreground">{l.message}</p>}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="estimates" className="mt-3 space-y-2">
            {estimates.length === 0 && <EmptyMsg label="No estimates yet" />}
            {estimates.map((e) => (
              <Card key={e.id} className="border-border bg-card p-3">
                <div className="flex items-start justify-between">
                  <p className="font-semibold capitalize">{e.project_type}</p>
                  <span className="text-[10px] text-muted-foreground">{fmt(e.created_at)}</span>
                </div>
                <p className="text-xs text-muted-foreground">{e.name} · {e.email}</p>
                {e.budget_min != null && (
                  <p className="text-gradient mt-1 font-display font-bold">
                    ${e.budget_min?.toLocaleString()} – ${e.budget_max?.toLocaleString()}
                  </p>
                )}
                {e.timeline && <Row icon={Calendar}>{e.timeline}</Row>}
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tickets" className="mt-3 space-y-2">
            {tickets.length === 0 && <EmptyMsg label="No tickets yet" />}
            {tickets.map((t) => (
              <Card key={t.id} className="border-border bg-card p-3">
                <div className="flex items-start justify-between">
                  <p className="font-semibold">{t.subject}</p>
                  <Badge variant={t.status === "open" ? "default" : "secondary"}>{t.status}</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{t.name} · {t.email}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">{fmt(t.created_at)}</p>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="referrals" className="mt-3 space-y-2">
            {referrals.length === 0 && <EmptyMsg label="No referrals yet" />}
            {referrals.map((r) => (
              <Card key={r.id} className="border-border bg-card p-3">
                <div className="flex items-start justify-between">
                  <p className="font-mono font-semibold">{r.code}</p>
                  <Badge variant="secondary">{r.status}</Badge>
                </div>
                {r.referrer_email && <p className="text-xs text-muted-foreground">{r.referrer_email}</p>}
                <p className="mt-1 text-[10px] text-muted-foreground">{fmt(r.created_at)}</p>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}

function Row({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
      <Icon className="h-3 w-3" /> {children}
    </p>
  );
}
function EmptyMsg({ label }: { label: string }) {
  return <p className="py-10 text-center text-sm text-muted-foreground">{label}</p>;
}
function fmt(s: string) {
  return new Date(s).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}
