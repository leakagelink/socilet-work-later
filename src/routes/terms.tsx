import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Socilet" },
      { name: "description", content: "Terms governing your use of Socilet's services and app." },
      { property: "og:title", content: "Terms of Service | Socilet" },
      { property: "og:description", content: "Terms governing your use of Socilet's services and app." },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <AppHeader title="Terms of Service" back />
      <main className="px-5 py-5">
        <article className="space-y-4 text-sm leading-relaxed text-foreground">
          <p className="text-xs text-muted-foreground">Last updated: 14 June 2026</p>

          <p>
            These Terms govern your use of the Socilet app and services. By creating an
            account or using the Service, you agree to these Terms.
          </p>

          <h2 className="font-display text-lg font-semibold">1. The Service</h2>
          <p>
            Socilet provides digital services including website development, mobile app
            development, AI solutions, SEO, social-media management and online ads, on a
            "work first, pay later" basis where applicable.
          </p>

          <h2 className="font-display text-lg font-semibold">2. Your account</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>You must be 18+ or have a parent/guardian's consent.</li>
            <li>Provide accurate information and keep it updated.</li>
            <li>You are responsible for activity under your account.</li>
          </ul>

          <h2 className="font-django text-lg font-semibold">3. Project scope & delivery</h2>
          <p>
            Each project's scope, timeline and price are confirmed in writing before work
            starts. Estimates shown in-app are indicative and not a binding quote.
          </p>

          <h2 className="font-display text-lg font-semibold">4. Payment</h2>
          <p>
            For "work first, pay later" projects, payment is due as per the milestones
            agreed in writing. Late payments may pause delivery or accrue interest.
          </p>

          <h2 className="font-display text-lg font-semibold">5. Acceptable use</h2>
          <p>
            Do not use the Service to upload unlawful, harmful, infringing or misleading
            content; do not reverse engineer, scrape or abuse our systems.
          </p>

          <h2 className="font-display text-lg font-semibold">6. Intellectual property</h2>
          <p>
            On full payment, deliverables (final code, designs) are transferred to you.
            Socilet retains rights to tools, libraries and methodologies used.
          </p>

          <h2 className="font-display text-lg font-semibold">7. Termination</h2>
          <p>
            You can stop using the Service and delete your account at any time. We may
            suspend accounts that violate these Terms.
          </p>

          <h2 className="font-display text-lg font-semibold">8. Disclaimer & liability</h2>
          <p>
            The Service is provided "as is". To the extent permitted by law, Socilet is not
            liable for indirect or consequential losses.
          </p>

          <h2 className="font-display text-lg font-semibold">9. Governing law</h2>
          <p>These Terms are governed by the laws of India. Courts in Indore, MP shall have exclusive jurisdiction.</p>

          <h2 className="font-display text-lg font-semibold">10. Contact</h2>
          <p>
            <a href="mailto:hello@socilet.in" className="text-primary underline">hello@socilet.in</a>
          </p>
        </article>
      </main>
    </>
  );
}
