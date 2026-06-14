import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Users, Trophy, Gift } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Referral Program | Socilet" },
      { name: "description", content: "Refer businesses to Socilet and earn rewards. Track referrals and share via WhatsApp." },
    ],
  }),
  component: Referral,
});

function getOrCreateCode() {
  if (typeof window === "undefined") return "SOCILET";
  let c = localStorage.getItem("socilet:refCode");
  if (!c) {
    c = "SOC" + Math.random().toString(36).slice(2, 7).toUpperCase();
    localStorage.setItem("socilet:refCode", c);
  }
  return c;
}

function Referral() {
  const [code, setCode] = useState("SOCILET");
  useEffect(() => setCode(getOrCreateCode()), []);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/estimator?ref=${code}` : "";
  const message = `Hey! Get 10% off your next project with Socilet (web, app, AI, ads). Use my code ${code} — I'll also earn 10% as a thank-you. Start here: ${shareUrl}`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(code); toast.success("Code copied!"); } catch { toast.error("Copy failed"); }
  };
  const whatsapp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };
  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: "Socilet", text: message, url: shareUrl }); } catch {}
    } else { whatsapp(); }
  };

  return (
    <>
      <AppHeader title="Referral Program" back />
      <main className="px-5 py-5">
        <Card className="relative overflow-hidden border-primary/30 bg-gradient-primary p-6 text-primary-foreground shadow-glow">
          <Gift className="absolute right-4 top-4 h-5 w-5 opacity-60" />
          <p className="text-xs uppercase tracking-widest opacity-80">Your unique code</p>
          <p className="mt-2 font-display text-3xl font-bold tracking-widest">{code}</p>
          <p className="mt-2 text-xs opacity-90">
            <span className="font-semibold">You earn 10%</span> commission · <span className="font-semibold">They get 10% off</span> their project
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button onClick={copy} variant="secondary" className="bg-white/15 text-primary-foreground hover:bg-white/25">
              <Copy className="mr-1 h-4 w-4" /> Copy
            </Button>
            <Button onClick={share} variant="secondary" className="bg-white/15 text-primary-foreground hover:bg-white/25">
              <Share2 className="mr-1 h-4 w-4" /> Share
            </Button>
          </div>
          <Button onClick={whatsapp} variant="secondary" className="mt-2 w-full bg-[#25D366] text-white hover:bg-[#1ebe57]">
            Invite via WhatsApp
          </Button>
        </Card>

        <section className="mt-6">
          <h2 className="mb-3 font-display text-lg font-semibold">Your stats</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Users, label: "Invited", value: "0" },
              { icon: Trophy, label: "Converted", value: "0" },
              { icon: Gift, label: "Rewards", value: "$0" },
            ].map(({ icon: Icon, label, value }) => (
              <Card key={label} className="bg-gradient-card flex flex-col items-center gap-1 border-border p-3">
                <Icon className="h-4 w-4 text-primary-glow" />
                <p className="font-display text-lg font-bold">{value}</p>
                <p className="text-[10px] text-muted-foreground">{label}</p>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-3 font-display text-lg font-semibold">How it works</h2>
          <ol className="space-y-3">
            {[
              "Share your code with any business owner.",
              "They start a project using your code.",
              "You receive service credits once their project kicks off.",
            ].map((s, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary-glow">{i + 1}</span>
                <p className="pt-1 text-sm text-muted-foreground">{s}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[10px] text-muted-foreground">
            Rewards are service credits applied to future Socilet projects. Not cash. Terms apply.
          </p>
        </section>
      </main>
    </>
  );
}
