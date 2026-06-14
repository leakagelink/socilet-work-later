import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, Lock, User as UserIcon, Loader2 } from "lucide-react";
import logo from "@/assets/socilet-logo.png";

export const Route = createFileRoute("/auth")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Sign In | Socilet" },
      { name: "description", content: "Sign in to Socilet to track your projects, estimates, referrals and support." },
    ],
  }),
  component: AuthPage,
});

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(6, "Min 6 characters").max(72);
const nameSchema = z.string().trim().min(2, "Enter your name").max(100);

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/profile" });
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const emailV = emailSchema.parse(email);
      const passV = passwordSchema.parse(password);

      if (mode === "signup") {
        const nameV = nameSchema.parse(fullName);
        const { error } = await supabase.auth.signUp({
          email: emailV,
          password: passV,
          options: {
            emailRedirectTo: `${window.location.origin}/profile`,
            data: { full_name: nameV },
          },
        });
        if (error) throw error;
        toast.success("Account created! Check your email to verify.");
        navigate({ to: "/profile" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: emailV,
          password: passV,
        });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/profile" });
      }
    } catch (err: unknown) {
      const msg = err instanceof z.ZodError ? err.issues[0].message : err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col px-5 py-6">
      <Link to="/" className="-ml-2 inline-flex w-fit items-center gap-1 rounded-full p-2 text-sm text-muted-foreground hover:bg-secondary">
        <ArrowLeft className="h-4 w-4" /> Back
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <img src={logo} alt="Socilet" width={44} height={44} className="rounded-xl shadow-glow" />
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            {mode === "login" ? "Welcome back" : "Create account"}
          </h1>
          <p className="text-xs text-muted-foreground">
            {mode === "login" ? "Sign in to continue" : "Track projects, estimates & referrals"}
          </p>
        </div>
      </div>

      <Card className="mt-6 border-border bg-card p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name" className="text-xs">Full name</Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" className="h-11 pl-10" required />
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-xs">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="h-11 pl-10" required />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-xs">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="h-11 pl-10" required minLength={6} />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="h-11 w-full bg-gradient-primary font-semibold shadow-glow">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "login" ? "Sign in" : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="mt-4 w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "New to Socilet? Create account" : "Already have an account? Sign in"}
        </button>
      </Card>

      <p className="mt-6 text-center text-[11px] leading-relaxed text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link to="/terms" className="underline hover:text-foreground">Terms of Service</Link>{" "}
        and{" "}
        <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
      </p>
      <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground/70">
        Socilet is a professional digital services provider — no income or approval guarantees are made.
      </p>
    </main>
  );
}
