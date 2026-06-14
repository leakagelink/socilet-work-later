import { useState, useEffect } from "react";
import logo from "@/assets/socilet-logo.png";

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export function SplashScreen({ onComplete, minDisplayTime = 700 }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 150);
    const exitTimer = setTimeout(() => setPhase("exit"), minDisplayTime);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, minDisplayTime + 200);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [minDisplayTime, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo */}
      <div
        className={`relative transition-all duration-700 ${
          phase === "enter" ? "scale-90 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <img
          src={logo}
          alt="Socilet"
          className="h-20 w-20 object-contain sm:h-24 sm:w-24"
        />
      </div>


      {/* Tagline */}
      <p
        className={`mt-1 text-sm text-muted-foreground transition-all duration-700 delay-300 ${
          phase === "enter" ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        Work First · Pay Later
      </p>

      {/* Minimal progress bar */}
      <div
        className={`mt-8 h-[2px] w-24 overflow-hidden rounded-full bg-muted transition-all duration-700 delay-500 ${
          phase === "enter" ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      >
        <div
          className="h-full rounded-full bg-primary"
          style={{
            animation: "loadProgress 1.6s ease-out forwards",
          }}
        />
      </div>
    </div>
  );
}
