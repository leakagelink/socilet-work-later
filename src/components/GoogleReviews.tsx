import { Card } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  initials: string;
  color: string;
  when: string;
  text: string;
}

const reviews: Review[] = [
  {
    name: "Nature Singh",
    initials: "NS",
    color: "from-emerald-500 to-teal-500",
    when: "a month ago",
    text: "Amazing work! He created a beautiful premium-looking landing page for us at a very reasonable price. The design is clean, modern, and fast-loading — exactly what we wanted.",
  },
  {
    name: "PIYUSH Bhuyan",
    initials: "PB",
    color: "from-blue-500 to-indigo-500",
    when: "a year ago",
    text: "The company is really genuine and very good communication between client and developer. I love the team and specially Dhiraj — he was literally punctual and dedicated towards his task. Hope your company grows well.",
  },
  {
    name: "Shahrukh Khan",
    initials: "SK",
    color: "from-violet-500 to-purple-500",
    when: "a year ago",
    text: "Aadi was absolutely amazing! I would (and will) definitely hire him again in a heartbeat. Thorough, easy to communicate with, completed requests in a timely manner — understood exactly what I needed.",
  },
  {
    name: "Rajan Nayak",
    initials: "RN",
    color: "from-amber-500 to-orange-500",
    when: "a year ago",
    text: "Awesome work by team 😀 The customer support team is top-notch, always available to help with any questions. The pricing plans are very affordable and they offer a free option for those just starting out.",
  },
  {
    name: "Promotion Interval",
    initials: "PI",
    color: "from-rose-500 to-pink-500",
    when: "a year ago",
    text: "We are an Influencer Marketing Agency. Dheeraj and his team made a website for us on an urgent call in very less time and didn't compromise on quality. Best results within budget. Best firm for Web Development.",
  },
  {
    name: "Aaqib R.",
    initials: "AR",
    color: "from-cyan-500 to-blue-500",
    when: "a year ago",
    text: "Dheeraj did a great job on my portfolio website. Quick, professional, and delivered exactly what I needed. Highly recommend!",
  },
  {
    name: "Sakshi Rathod",
    initials: "SR",
    color: "from-fuchsia-500 to-rose-500",
    when: "a year ago",
    text: "Dheeraj Tagde has worked upon my project and has done very good work. I am very impressed by him and his company Socilet. Thanks to him and his team for a good job.",
  },
  {
    name: "Dhruv Thakar",
    initials: "DT",
    color: "from-indigo-500 to-violet-500",
    when: "a year ago",
    text: "Awesome work — delivered exactly what we needed.",
  },
  {
    name: "So Medium",
    initials: "SM",
    color: "from-pink-500 to-rose-500",
    when: "a year ago",
    text: "Great work done within 2 days.",
  },
  {
    name: "Yash",
    initials: "Y",
    color: "from-teal-500 to-emerald-500",
    when: "a year ago",
    text: "Really great service & fast as well!!",
  },
  {
    name: "Raja Yadav",
    initials: "RY",
    color: "from-slate-500 to-zinc-500",
    when: "a year ago",
    text: "Very good job.",
  },
  {
    name: "Jyotsana Uparwat",
    initials: "JU",
    color: "from-blue-500 to-cyan-500",
    when: "a year ago",
    text: "Highly recommended — 5 stars.",
  },
];

export function GoogleReviews() {
  return (
    <section className="px-5 py-6">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary-glow">
            Client Reviews
          </span>
          <h2 className="mt-1 font-display text-xl font-semibold sm:text-2xl">
            Loved by founders & teams
          </h2>
        </div>
        <div className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-bold">4.9</span>
            <span className="text-[10px] text-muted-foreground">· {reviews.length}+</span>
          </div>
        </div>
      </div>

      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 scrollbar-hide">
        {reviews.map((r) => (
          <Card
            key={r.name}
            className="relative flex min-w-[82%] snap-start flex-col border-border/60 bg-gradient-card p-4 sm:min-w-[320px]"
          >
            <Quote className="absolute right-3 top-3 h-5 w-5 text-primary/20" />

            <div className="mb-3 flex items-center gap-2.5">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${r.color} text-xs font-bold text-white shadow-sm`}
              >
                {r.initials}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{r.name}</p>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-2.5 w-2.5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1 text-[10px] text-muted-foreground">· {r.when}</span>
                </div>
              </div>
            </div>

            <p className="line-clamp-5 text-xs leading-relaxed text-foreground/85">{r.text}</p>
          </Card>
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] text-muted-foreground">
        Sourced from our verified Google Business Profile.
      </p>
    </section>
  );
}
