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
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <img
        src={logo}
        alt="Socilet"
        width={96}
        height={96}
        className="h-24 w-24 object-contain"
      />
      <p className="mt-1 text-sm text-muted-foreground">Work First · Pay Later</p>
    </div>
  );
}
