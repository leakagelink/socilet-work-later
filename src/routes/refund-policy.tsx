import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";

export const Route = createFileRoute("/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy | Socilet" },
      { name: "description", content: "Refund and cancellation policy for Socilet services." },
      { property: "og:title", content: "Refund Policy | Socilet" },
      { property: "og:description", content: "Refund and cancellation policy for Socilet services." },
      { property: "og:url", content: "/refund-policy" },
    ],
    links: [{ rel: "canonical", href: "/refund-policy" }],
  }),
  component: RefundPolicy,
});

function RefundPolicy() {
  return (
    <>
      <AppHeader title="Refund Policy" back />
      <main className="px-5 py-5">
        <article className="space-y-4 text-sm leading-relaxed text-foreground">
          <p className="text-xs text-muted-foreground">Last updated: 14 June 2026</p>

          <h2 className="font-display text-lg font-semibold">1. Free to start</h2>
          <p>
            Using the Socilet app, browsing services, requesting estimates and submitting
            project enquiries is free. No charge is taken until a project is formally
            confirmed in writing.
          </p>

          <h2 className="font-display text-lg font-semibold">2. Cancellation before work begins</h2>
          <p>
            You can cancel a confirmed project before development begins for a full refund
            of any advance paid, minus payment-gateway fees.
          </p>

          <h2 className="font-display text-lg font-semibold">3. Cancellation after work begins</h2>
          <p>
            If work has started, refunds are pro-rated based on the milestones completed
            and the time spent. Completed milestones are non-refundable.
          </p>

          <h2 className="font-display text-lg font-semibold">4. Non-refundable items</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Third-party costs (domains, hosting, paid APIs, ad spend).</li>
            <li>Custom design or code already delivered and approved.</li>
            <li>Payment-gateway and transaction fees.</li>
          </ul>

          <h2 className="font-display text-lg font-semibold">5. How to request a refund</h2>
          <p>
            Email <a href="mailto:hello@socilet.in" className="text-primary underline">hello@socilet.in</a>
            {" "}with your project ID. Approved refunds are processed within 7–10 business days
            to the original payment method.
          </p>
        </article>
      </main>
    </>
  );
}
