import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Printer, Plus, X } from "lucide-react";

export const Route = createFileRoute("/tools/quotation-maker")({
  head: () => ({
    meta: [
      { title: "Free Quotation Maker — Generate PDF Quotes | Socilet" },
      { name: "description", content: "Create professional quotations in 60 seconds. Free, no signup, download as PDF." },
    ],
  }),
  component: QuotationMaker,
});

type Item = { desc: string; qty: number; price: number };

function QuotationMaker() {
  const [biz, setBiz] = useState({ name: "Your Business", email: "", phone: "" });
  const [client, setClient] = useState({ name: "", email: "" });
  const [quoteNo, setQuoteNo] = useState(`Q-${Date.now().toString().slice(-6)}`);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [validity, setValidity] = useState("30 days");
  const [items, setItems] = useState<Item[]>([
    { desc: "Website Design & Development", qty: 1, price: 900 },
  ]);
  const [taxPct, setTaxPct] = useState(0);
  const [notes, setNotes] = useState("Work first · Pay later · 50% on milestone, 50% on delivery.");
  const [showPreview, setShowPreview] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const tax = (subtotal * taxPct) / 100;
  const total = subtotal + tax;

  const updateItem = (idx: number, patch: Partial<Item>) =>
    setItems((list) => list.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  const addItem = () => setItems((l) => [...l, { desc: "", qty: 1, price: 0 }]);
  const removeItem = (idx: number) => setItems((l) => l.filter((_, i) => i !== idx));

  const printIt = () => window.print();

  if (showPreview) {
    return (
      <>
        <div className="no-print sticky top-0 z-50 flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
          <button onClick={() => setShowPreview(false)} className="text-xs font-medium text-muted-foreground">
            ← Edit
          </button>
          <Button onClick={printIt} size="sm" className="bg-gradient-primary">
            <Download className="mr-1 h-3.5 w-3.5" /> Download PDF
          </Button>
        </div>
        <div className="quote-print mx-auto max-w-[800px] bg-white p-8 text-gray-900 print:p-12">
          <div className="flex items-start justify-between border-b-2 border-gray-900 pb-4">
            <div>
              <h1 className="text-3xl font-bold">{biz.name}</h1>
              {biz.email && <p className="text-sm text-gray-600">{biz.email}</p>}
              {biz.phone && <p className="text-sm text-gray-600">{biz.phone}</p>}
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">QUOTATION</h2>
              <p className="text-sm">#{quoteNo}</p>
              <p className="text-sm text-gray-600">{date}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-gray-500">Quote for</p>
            <p className="font-semibold">{client.name || "—"}</p>
            {client.email && <p className="text-sm text-gray-600">{client.email}</p>}
          </div>

          <table className="mt-6 w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-900 text-left">
                <th className="py-2">Description</th>
                <th className="py-2 text-right">Qty</th>
                <th className="py-2 text-right">Price</th>
                <th className="py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, i) => (
                <tr key={i} className="border-b border-gray-200">
                  <td className="py-3">{it.desc || "—"}</td>
                  <td className="py-3 text-right">{it.qty}</td>
                  <td className="py-3 text-right">${it.price.toLocaleString()}</td>
                  <td className="py-3 text-right font-medium">${(it.qty * it.price).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={3} className="pt-3 text-right text-sm">Subtotal</td><td className="pt-3 text-right">${subtotal.toLocaleString()}</td></tr>
              {taxPct > 0 && <tr><td colSpan={3} className="text-right text-sm">Tax ({taxPct}%)</td><td className="text-right">${tax.toLocaleString()}</td></tr>}
              <tr className="border-t-2 border-gray-900"><td colSpan={3} className="pt-2 text-right font-bold">TOTAL</td><td className="pt-2 text-right text-xl font-bold">${total.toLocaleString()}</td></tr>
            </tfoot>
          </table>

          <div className="mt-6">
            <p className="text-xs uppercase tracking-wider text-gray-500">Notes</p>
            <p className="mt-1 whitespace-pre-line text-sm">{notes}</p>
            <p className="mt-3 text-xs text-gray-500">Valid for {validity}</p>
          </div>

          <div className="mt-12 border-t border-gray-300 pt-4 text-center text-[10px] text-gray-400">
            Generated with Socilet Free Quotation Maker · socilet.com
          </div>
        </div>
        <style>{`
          @media print {
            .no-print { display: none !important; }
            body { background: white; }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <AppHeader />
      <main className="px-5 pb-12 pt-4">
        <Link to="/tools" className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-3 w-3" /> All tools
        </Link>

        <div className="mt-3">
          <h1 className="font-display text-2xl font-bold">Quotation Maker</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Free, professional PDF quote in 60 seconds. No signup needed.
          </p>
        </div>

        <Card className="mt-5 p-4">
          <h3 className="text-sm font-semibold">Your business</h3>
          <div className="mt-3 space-y-2">
            <Input placeholder="Business name" value={biz.name} onChange={(e) => setBiz({ ...biz, name: e.target.value })} />
            <Input placeholder="Email" value={biz.email} onChange={(e) => setBiz({ ...biz, email: e.target.value })} />
            <Input placeholder="Phone" value={biz.phone} onChange={(e) => setBiz({ ...biz, phone: e.target.value })} />
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-sm font-semibold">Client</h3>
          <div className="mt-3 space-y-2">
            <Input placeholder="Client name" value={client.name} onChange={(e) => setClient({ ...client, name: e.target.value })} />
            <Input placeholder="Client email" value={client.email} onChange={(e) => setClient({ ...client, email: e.target.value })} />
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-sm font-semibold">Quote details</h3>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div><Label className="text-[10px]">Quote #</Label><Input value={quoteNo} onChange={(e) => setQuoteNo(e.target.value)} /></div>
            <div><Label className="text-[10px]">Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
          </div>
          <div className="mt-2"><Label className="text-[10px]">Valid for</Label><Input value={validity} onChange={(e) => setValidity(e.target.value)} /></div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-sm font-semibold">Line items</h3>
          <div className="mt-3 space-y-3">
            {items.map((it, i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-muted-foreground">Item {i + 1}</span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(i)} className="text-muted-foreground"><X className="h-3.5 w-3.5" /></button>
                  )}
                </div>
                <Input className="mt-2" placeholder="Description" value={it.desc} onChange={(e) => updateItem(i, { desc: e.target.value })} />
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Qty" value={it.qty} onChange={(e) => updateItem(i, { qty: Number(e.target.value) || 0 })} />
                  <Input type="number" placeholder="Price" value={it.price} onChange={(e) => updateItem(i, { price: Number(e.target.value) || 0 })} />
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" size="sm" className="mt-3 w-full" onClick={addItem}>
            <Plus className="mr-1 h-3.5 w-3.5" /> Add item
          </Button>
          <div className="mt-3">
            <Label className="text-[10px]">Tax %</Label>
            <Input type="number" value={taxPct} onChange={(e) => setTaxPct(Number(e.target.value) || 0)} />
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-sm font-semibold">Notes / terms</h3>
          <Textarea className="mt-3" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Card>

        <Card className="mt-4 border-primary/30 bg-primary/5 p-4 text-center">
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="mt-1 font-display text-3xl font-bold text-gradient">${total.toLocaleString()}</p>
        </Card>

        <div className="mt-5 flex gap-2">
          <Button onClick={() => setShowPreview(true)} size="lg" className="flex-1 bg-gradient-primary shadow-glow">
            <Printer className="mr-1 h-4 w-4" /> Preview & download PDF
          </Button>
        </div>
      </main>
    </>
  );
}
