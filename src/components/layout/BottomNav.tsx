import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Calculator, Briefcase, Gift, User } from "lucide-react";

const leftItems = [
  { to: "/", label: "Home", icon: Home },
  { to: "/estimator", label: "Estimate", icon: Calculator },
] as const;

const rightItems = [
  { to: "/portfolio", label: "Portfolio", icon: Briefcase },
  { to: "/profile", label: "Profile", icon: User },
] as const;

const centerItem = { to: "/referral", label: "Refer", icon: Gift } as const;

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  active: boolean;
}) {
  return (
    <li className="flex justify-center">
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className={`group flex h-14 w-full max-w-[76px] flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 ease-out ${
          active ? "bg-primary/[0.08]" : "active:scale-95"
        }`}
      >
        <Icon
          className={`h-5 w-5 transition-colors duration-200 ${
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
          strokeWidth={active ? 2.4 : 1.8}
        />
        <span
          className={`text-[10px] font-medium leading-none transition-colors duration-200 ${
            active
              ? "text-primary"
              : "text-muted-foreground group-hover:text-foreground"
          }`}
        >
          {label}
        </span>
      </Link>
    </li>
  );
}

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname === "/splash" || pathname === "/auth") return null;

  const centerActive =
    pathname === centerItem.to || pathname.startsWith(centerItem.to);

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 border-t border-border/50 bg-background/90 shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.08)] backdrop-blur-2xl">
      <ul className="grid grid-cols-5 items-end px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1">
        {leftItems.map(({ to, label, icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              label={label}
              icon={icon}
              active={active}
            />
          );
        })}

        {/* Center floating CTA */}
        <li key={centerItem.to} className="relative flex justify-center">
          <Link
            to={centerItem.to}
            aria-current={centerActive ? "page" : undefined}
            className="relative -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary shadow-glow ring-4 ring-background transition-all duration-200 ease-out hover:scale-110 active:scale-95"
          >
            <centerItem.icon
              className={`h-5 w-5 transition-colors duration-200 ${
                centerActive ? "text-white" : "text-white/90"
              }`}
              strokeWidth={2.2}
            />
          </Link>
          <span
            className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold whitespace-nowrap transition-colors duration-200 ${
              centerActive ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {centerItem.label}
          </span>
        </li>

        {rightItems.map(({ to, label, icon }) => {
          const active = pathname === to || (to !== "/" && pathname.startsWith(to));
          return (
            <NavLink
              key={to}
              to={to}
              label={label}
              icon={icon}
              active={active}
            />
          );
        })}
      </ul>
    </nav>
  );
}
