import { createFileRoute } from "@tanstack/react-router";
import { AppHeader } from "@/components/layout/AppHeader";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Socilet" },
      { name: "description", content: "How Socilet collects, uses, stores and protects your personal data." },
      { property: "og:title", content: "Privacy Policy | Socilet" },
      { property: "og:description", content: "How Socilet collects, uses, stores and protects your personal data." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <>
      <AppHeader title="Privacy Policy" back />
      <main className="px-5 py-5">
        <article className="prose prose-sm max-w-none space-y-4 text-sm leading-relaxed text-foreground">
          <p className="text-xs text-muted-foreground">Last updated: 14 June 2026</p>

          <p>
            Socilet ("we", "us", "our") operates the Socilet mobile and web application
            (the "Service"). This Privacy Policy explains what information we collect, how
            we use it, and the choices you have. By using the Service you agree to this
            policy.
          </p>

          <h2 className="font-display text-lg font-semibold">1. Information we collect</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li><strong>Account data:</strong> name, email, password (hashed), phone (optional).</li>
            <li><strong>Project data:</strong> estimates, project details, support tickets, referral activity.</li>
            <li><strong>Device data:</strong> device model, OS version, app version, language.</li>
            <li><strong>Push tokens:</strong> Firebase Cloud Messaging (FCM) tokens to send notifications.</li>
            <li><strong>Usage logs:</strong> basic analytics and crash reports to improve reliability.</li>
          </ul>

          <h2 className="font-display text-lg font-semibold">2. How we use your data</h2>
          <ul className="list-disc space-y-1 pl-5">
            <li>Create and manage your account.</li>
            <li>Deliver requested services (estimates, projects, support).</li>
            <li>Send transactional and service-related notifications.</li>
            <li>Prevent fraud, abuse and ensure security.</li>
            <li>Comply with legal obligations.</li>
          </ul>

          <h2 className="font-display text-lg font-semibold">3. Sharing</h2>
          <p>
            We do not sell your personal data. We share data only with processors that
            help us run the Service (hosting, database, authentication, push notifications,
            email). All processors are bound by data-processing agreements.
          </p>

          <h2 className="font-display text-lg font-semibold">4. Data retention</h2>
          <p>
            We keep your account data while your account is active. When you delete your
            account, we remove your personal data within 30 days, except where retention
            is required by law (e.g. tax invoices).
          </p>

          <h2 className="font-display text-lg font-semibold">5. Your rights</h2>
          <p>
            You can access, correct, export or delete your data at any time from
            <strong> Profile → Delete my account</strong>, or by emailing us. You can also
            withdraw consent for push notifications from your device settings.
          </p>

          <h2 className="font-display text-lg font-semibold">6. Children</h2>
          <p>The Service is not directed to children under 13. We do not knowingly collect data from children.</p>

          <h2 className="font-display text-lg font-semibold">7. Security</h2>
          <p>
            We use HTTPS, encrypted storage, row-level security on the database, and
            industry-standard authentication. No system is 100% secure; please use a strong
            unique password.
          </p>

          <h2 className="font-display text-lg font-semibold">8. Changes</h2>
          <p>
            We may update this policy. Material changes will be notified inside the app or
            via email.
          </p>

          <h2 className="font-display text-lg font-semibold">9. Contact</h2>
          <p>
            Questions or data requests:{" "}
            <a href="mailto:hello@socilet.in" className="text-primary underline">hello@socilet.in</a>
          </p>
        </article>
      </main>
    </>
  );
}
