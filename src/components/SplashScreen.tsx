import { useState, useEffect } from "react";
import logo from "@/assets/socilet-logo.png";

interface SplashScreenProps {
  onComplete?: () => void;
  minDisplayTime?: number;
}

export function SplashScreen({ onComplete, minDisplayTime = 2500 }: SplashScreenProps) {
  const [phase, setPhase] = useState<"enter" | "hold" | "exit" | "done">("enter");

  useEffect(() => {
    const enterTimer = setTimeout(() => setPhase("hold"), 800);
    const holdTimer = setTimeout(() => setPhase("exit"), minDisplayTime);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, minDisplayTime + 600);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(holdTimer);
      clearTimeout(doneTimer);
    };
  }, [minDisplayTime, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ${
        phase === "exit" ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120, 60, 220, 0.35), transparent),
          radial-gradient(ellipse 60% 40% at 80% 80%, rgba(200, 60, 180, 0.18), transparent),
          linear-gradient(160deg, #0f0a1a 0%, #1a0e2e 40%, #2d1b4e 100%)
        `,
      }}
    >
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              background: `rgba(180, 120, 255, ${Math.random() * 0.5 + 0.2})`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glow ring behind logo */}
      <div
        className={`relative mb-8 transition-all duration-1000 ${
          phase === "enter" ? "scale-50 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-3xl" style={{ transform: "scale(1.8)" }} />
        <div className="absolute inset-0 rounded-full bg-pink-500/10 blur-2xl" style={{ transform: "scale(1.4)" }} />
        <img
          src={logo}
          alt="Socilet"
          className="relative h-28 w-28 object-contain drop-shadow-2xl sm:h-36 sm:w-36"
          style={{
            filter: "drop-shadow(0 0 30px rgba(168, 85, 247, 0.5))",
          }}
        />
      </div>

      {/* Brand name */}
      <h1
        className={`font-display text-4xl font-bold tracking-tight text-white transition-all duration-700 delay-200 sm:text-5xl ${
          phase === "enter" ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        <span className="text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #c084fc, #f472b6)", WebkitBackgroundClip: "text", backgroundClip: "text" }}>
          Socilet
        </span>
      </h1>

      {/* Tagline */}
      <p
        className={`mt-3 text-sm font-medium tracking-wide text-purple-200/70 transition-all duration-700 delay-500 sm:text-base ${
          phase === "enter" ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        }`}
      >
        Work First · Pay Later
      </p>

      {/* Animated progress bar */}
      <div
        className={`mt-10 h-[2px] w-32 overflow-hidden rounded-full bg-white/10 transition-all duration-700 delay-700 sm:w-40 ${
          phase === "enter" ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
        }`}
      >
        <div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899, #a855f7)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite, loadProgress 2s ease-out forwards",
          }}
        />
      </div>

      {/* Bottom tag */}
      <p
        className={`absolute bottom-8 text-xs tracking-widest uppercase text-white/20 transition-all duration-700 delay-1000 ${
          phase === "enter" ? "opacity-0" : "opacity-100"
        }`}
      >
        Digital Excellence
      </p>
    </div>
  );
}
