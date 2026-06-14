import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell } from "lucide-react";
import logo from "@/assets/socilet-logo.png";

export function AppHeader({ title, back, showBell = true }: { title?: string; back?: boolean; showBell?: boolean }) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-border bg-background/85 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        {back ? (
          <Link to="/" className="-ml-1 rounded-full p-2 hover:bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        ) : (
          <img src={logo} alt="Socilet" width={40} height={40} className="rounded-lg" />
        )}
        {title && (
          <span className="font-display text-base font-semibold tracking-tight">
            {title}
          </span>
        )}
      </div>
      {showBell && (
        <Link to="/notifications" className="rounded-full p-2 hover:bg-secondary">
          <Bell className="h-5 w-5 text-muted-foreground" />
        </Link>
      )}
    </header>
  );
}
