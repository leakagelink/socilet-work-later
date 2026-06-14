import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Wrench, Briefcase, Gift, User } from "lucide-react";

const normalItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/estimator", label: "Estimate", icon: Calculator },
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const referItem = { to: "/referral", label: "Refer", icon: Gift } as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/splash" || pathname === "/auth") return null;

  const referActive = pathname === referItem.to || pathname.startsWith(referItem.to);

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-border bg-background/85 backdrop-blur-xl">
      <ul className="flex items-center justify-around px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {normalItems.map(({ to, label, icon: Icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <li key={to}>
              <Link
                to={to}
                className="flex min-w-[56px] flex-col items-center gap-1 rounded-xl px-3 py-1.5 transition"
              >
                <Icon
                  className={`h-5 w-5 transition ${active ? "text-primary" : "text-muted-foreground"}`}
                  strokeWidth={active ? 2.4 : 1.8}
                />
                <span className={`text-[10px] font-medium ${active ? "text-primary" : "text-muted-foreground"}`}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}

        {/* Refer — highlighted CTA */}
        <li key={referItem.to}>
          <Link
            to={referItem.to}
            className="relative flex -translate-y-3 flex-col items-center gap-1 rounded-2xl bg-gradient-primary px-4 py-2.5 shadow-glow transition hover:scale-105 active:scale-95"
          >
            <referItem.icon
              className={`h-5 w-5 transition ${referActive ? "text-white" : "text-white/90"}`}
              strokeWidth={2.4}
            />
            <span className={`text-[10px] font-semibold ${referActive ? "text-white" : "text-white/90"}`}>
              {referItem.label}
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

