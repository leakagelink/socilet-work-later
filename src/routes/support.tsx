import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MessageCircle, Mail, Phone, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support Center | Socilet" },
      { name: "description", content: "Live chat, support tickets, FAQ and contact options for Socilet clients." },
    ],
  }),
  component: Support,
});

const faqs = [
  { q: "How does Work First, Pay Later work?", a: "We deliver project milestones first. You review and approve them, then pay per milestone according to a signed agreement. It is not a loan or financial product." },
  { q: "What if I'm not happy with the work?", a: "You can cancel within the first week with no obligation. After that, you only pay for milestones you've approved." },
  { q: "How long does a typical project take?", a: "Most websites: 2–4 weeks. Apps: 6–12 weeks. AI projects: 3–8 weeks. We'll give a precise timeline in your estimate." },
  { q: "Do you sign NDAs?", a: "Yes. We sign mutual NDAs before any sensitive scoping discussion." },
];

function Support() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", category: "general", message: "" });
  const [chat, setChat] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hi! I'm Socilet's assistant. How can I help today?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const msg = chatInput.trim();
    setChat((c) => [...c, { role: "user", text: msg }]);
    setChatInput("");
    setTimeout(() => {
      setChat((c) => [...c, { role: "bot", text: "Thanks! A specialist will pick this up shortly. For urgent help, open a ticket or WhatsApp us." }]);
    }, 600);
  };

  const submitTicket = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error("Please fill all required fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("support_tickets").insert(form);
    setSubmitting(false);
    if (error) return toast.error("Could not submit. Try again.");
    toast.success("Ticket submitted! We'll reply within 24 hours.");
    setForm({ name: "", email: "", subject: "", category: "general", message: "" });
  };

  return (
    <>
      <AppHeader title="Support Center" back />
      <main className="px-5 py-5">
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="ticket">Ticket</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-4">
            <Card className="bg-gradient-card flex h-[420px] flex-col border-border">
              <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {chat.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-secondary text-foreground"
                    }`}>{m.text}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 border-t border-border p-2">
                <Input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()} placeholder="Type a message..." />
                <Button onClick={sendChat} size="icon" className="bg-gradient-primary"><Send className="h-4 w-4" /></Button>
              </div>
            </Card>
            <div className="mt-4 grid grid-cols-3 gap-2">
              <a href="https://wa.me/" target="_blank" rel="noreferrer">
                <Card className="flex flex-col items-center gap-1 border-border bg-card p-3 text-center">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                  <p className="text-[10px]">WhatsApp</p>
                </Card>
              </a>
              <a href="mailto:hello@socilet.com">
                <Card className="flex flex-col items-center gap-1 border-border bg-card p-3 text-center">
                  <Mail className="h-5 w-5 text-primary-glow" />
                  <p className="text-[10px]">Email</p>
                </Card>
              </a>
              <a href="tel:+10000000000">
                <Card className="flex flex-col items-center gap-1 border-border bg-card p-3 text-center">
                  <Phone className="h-5 w-5 text-primary-glow" />
                  <p className="text-[10px]">Call</p>
                </Card>
              </a>
            </div>
          </TabsContent>

          <TabsContent value="ticket" className="mt-4 space-y-3">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
            <div><Label>Message</Label><Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
            <Button onClick={submitTicket} disabled={submitting} className="w-full bg-gradient-primary shadow-glow">
              {submitting ? "Submitting..." : "Submit ticket"}
            </Button>
          </TabsContent>

          <TabsContent value="faq" className="mt-4">
            <Accordion type="single" collapsible>
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </main>
    </>
  );
}
