import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, Briefcase, Tag, BellRing } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { PushNotifications } from "@capacitor/push-notifications";
import { supabase } from "@/integrations/supabase/client";
import { registerPushNotifications } from "@/lib/push-notifications";
import { toast } from "sonner";

export const Route = createFileRoute("/notifications")({
  ssr: false,
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
  const [isNative, setIsNative] = useState(false);
  const [permission, setPermission] = useState<"prompt" | "granted" | "denied" | "unknown">("unknown");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const native = Capacitor.isNativePlatform();
    setIsNative(native);
    if (!native) return;
    PushNotifications.checkPermissions()
      .then((s) => setPermission(s.receive as "prompt" | "granted" | "denied"))
      .catch(() => setPermission("unknown"));
  }, []);

  const handleEnable = async () => {
    setBusy(true);
    try {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        toast.error("Please sign in first to enable notifications.");
        setBusy(false);
        return;
      }
      await registerPushNotifications(data.user.id);
      const status = await PushNotifications.checkPermissions();
      setPermission(status.receive as "prompt" | "granted" | "denied");
      if (status.receive === "granted") toast.success("Notifications enabled");
      else if (status.receive === "denied") toast.error("Permission denied. Enable from system Settings.");
    } catch (e: any) {
      toast.error(e?.message ?? "Could not enable notifications");
    } finally {
      setBusy(false);
    }
  };

  const showRationale = isNative && permission !== "granted";

  return (
    <>
      <AppHeader title="Notifications" back />
      <main className="px-5 py-4 space-y-3">
        {showRationale && (
          <Card className="border-primary/30 bg-gradient-card p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <BellRing className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">Stay updated on your projects</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  We use notifications only to alert you about project updates, your
                  estimate status, support replies, and limited-time offers. You can
                  turn them off any time from your phone's Settings.
                </p>
                <Button
                  size="sm"
                  className="mt-3"
                  onClick={handleEnable}
                  disabled={busy || permission === "denied"}
                >
                  {permission === "denied"
                    ? "Blocked — open Settings"
                    : busy
                      ? "Enabling…"
                      : "Enable notifications"}
                </Button>
              </div>
            </div>
          </Card>
        )}

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
