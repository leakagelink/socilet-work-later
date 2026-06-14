import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import logo from "@/assets/socilet-logo.png";

export const Route = createFileRoute("/splash")({
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/" }), 1800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-hero">
      <img src={logo} alt="Socilet" width={120} height={120} className="animate-float drop-shadow-[0_20px_60px_rgba(79,70,229,0.5)]" />
      <h1 className="mt-6 font-display text-3xl font-bold text-gradient">Socilet</h1>
      <p className="mt-2 text-sm text-muted-foreground">Brand Your Dream</p>
    </div>
  );
}
