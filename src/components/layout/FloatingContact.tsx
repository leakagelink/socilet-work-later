import { useState } from "react";
import { MessageCircle, Mail, X } from "lucide-react";

export function FloatingContact() {
  const [open, setOpen] = useState(false);

  const phone = "919301499921";
  const email = "hello@socilet.in";

  return (
    <div className="fixed bottom-[4.5rem] right-4 z-50 flex flex-col items-end gap-2">
      {/* Contact options */}
      {open && (
        <div className="flex flex-col items-end gap-2 animate-in slide-in-from-bottom-2 fade-in duration-200">
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 active:scale-95"
          >
            <MessageCircle className="h-4 w-4" />
            Chat on WhatsApp
          </a>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg transition hover:scale-105 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            {email}
          </a>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition hover:scale-110 active:scale-95 ${
          open
            ? "bg-muted text-muted-foreground"
            : "bg-[#25D366] text-white"
        }`}
        aria-label={open ? "Close contact options" : "Open contact options"}
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>
    </div>
  );
}
