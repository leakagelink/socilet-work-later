import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Bell, Sparkles, Briefcase, Tag } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications | Socilet" },
      { name: "description", content: "Project updates, offers, and case studies." },
    ],
  }),
  component: Notifications,
});

const items = [
  { icon: Tag, title: "Launch offer: 15% off SEO", time: "Just now", desc: "Limited time for new projects this month.", tone: "primary" },
  { icon: Briefcase, title: "New case study: MetroFit App", time: "2h ago", desc: "How we reached 50k downloads in 90 days.", tone: "muted" },
  { icon: Sparkles, title: "Your estimate is ready", time: "Yesterday", desc: "View your saved estimate in Profile.", tone: "muted" },
  { icon: Bell, title: "Follow-up reminder", time: "2 days ago", desc: "A consultant will call you tomorrow at 4pm.", tone: "muted" },
];

function Notifications() {
  return (
    <>
      <AppHeader title="Notifications" back />
      <main className="px-5 py-4 space-y-2">
        {items.map(({ icon: Icon, title, time, desc, tone }, i) => (
          <Card key={i} className="flex items-start gap-3 border-border bg-card p-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
              tone === "primary" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-primary-glow"
            }`}><Icon className="h-5 w-5" /></div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{title}</p>
                <span className="text-[10px] text-muted-foreground">{time}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
            </div>
          </Card>
        ))}
      </main>
    </>
  );
}
