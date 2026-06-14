import { useState, useEffect, useCallback } from "react";
import { Play, Star, X } from "lucide-react";
import { Card } from "@/components/ui/card";

type Testimonial = {
  id: string;
  client: string;
  project: string;
};

const VIDEOS: Testimonial[] = [
  { id: "Rz6PVUtVYks", client: "Successful Project", project: "Client testimonial" },
  { id: "4oogYX-_a38", client: "Satisfied Client", project: "Project review" },
  { id: "g57bSleJEEY", client: "Happy Client", project: "Brand success" },
  { id: "_8s-7gSdT5E", client: "Recent Project", project: "Delivery testimonial" },
  { id: "_A-NDWDF9aE", client: "Brand Your Dream", project: "Founder testimonial" },
];

function VideoModal({
  video,
  onClose,
}: {
  video: Testimonial | null;
  onClose: () => void;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!video) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [video, handleKeyDown]);

  if (!video) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${video.client} testimonial video`}
    >
      <div
        className="relative mx-4 w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-10 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-2xl">
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={`${video.client} — Socilet testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold text-white">{video.client}</p>
          <p className="text-xs text-white/70">{video.project}</p>
        </div>
      </div>
    </div>
  );
}

function VideoCard({ v, onSelect }: { v: Testimonial; onSelect: (v: Testimonial) => void }) {
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;

  return (
    <Card className="min-w-[260px] snap-start overflow-hidden border-border bg-card">
      <button
        type="button"
        onClick={() => onSelect(v)}
        aria-label={`Play testimonial from ${v.client}`}
        className="group relative block aspect-video w-full"
      >
        <img
          src={thumb}
          alt={`${v.client} testimonial thumbnail`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition group-hover:scale-110">
            <Play className="ml-0.5 h-6 w-6 fill-current" />
          </span>
        </div>
      </button>
      <div className="p-3">
        <div className="mb-1 flex gap-0.5 text-primary">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3 w-3 fill-current" />
          ))}
        </div>
        <p className="text-sm font-semibold">{v.client}</p>
        <p className="text-xs text-muted-foreground">{v.project}</p>
      </div>
    </Card>
  );
}

export function VideoTestimonials() {
  const [selected, setSelected] = useState<Testimonial | null>(null);

  return (
    <section className="px-5 py-6" aria-labelledby="video-testimonials-heading">
      <div className="mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-primary">
          Client stories
        </span>
        <h2
          id="video-testimonials-heading"
          className="font-display text-xl font-semibold"
        >
          Hear it from our clients
        </h2>
      </div>
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {VIDEOS.map((v) => (
          <VideoCard key={v.id} v={v} onSelect={setSelected} />
        ))}
      </div>
      <VideoModal video={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

