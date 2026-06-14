import { useState } from "react";
import { Play, Star } from "lucide-react";
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

function VideoCard({ v }: { v: Testimonial }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`;

  return (
    <Card className="min-w-[260px] snap-start overflow-hidden border-border bg-card">
      <div className="relative aspect-video bg-muted">
        {playing ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`}
            title={`${v.client} — Socilet testimonial`}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play testimonial from ${v.client}`}
            className="group absolute inset-0 block"
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
        )}
      </div>
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
          <VideoCard key={v.id} v={v} />
        ))}
      </div>
    </section>
  );
}
