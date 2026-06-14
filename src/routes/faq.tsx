import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppHeader } from "@/components/layout/AppHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { MessageCircle, HelpCircle, CreditCard, Gift, Globe } from "lucide-react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | Socilet — Zero Advance Payment Digital Services" },
      { name: "description", content: "Frequently asked questions about Socilet's zero advance payment model, WordPress & React pricing, affiliate program, services and more. Available in English and Hindi." },
      { property: "og:title", content: "FAQ | Socilet" },
      { property: "og:description", content: "Answers to payment, affiliate, and service questions." },
    ],
  }),
  component: FAQPage,
});

const categories = [
  { id: "payment", label: "Payment", labelHi: "पेमेंट", icon: CreditCard },
  { id: "affiliate", label: "Affiliate", labelHi: "एफ़िलिएट", icon: Gift },
  { id: "general", label: "General", labelHi: "सामान्य", icon: Globe },
] as const;

type CategoryId = typeof categories[number]["id"];

type QA = { q: string; a: string };
type QAPair = { en: QA; hi: QA };

const paymentFaqs: QAPair[] = [
  {
    en: { q: "Do I need to pay any advance for WordPress projects?", a: "No. For WordPress projects, you don't pay any advance. You only pay 100% after the project is completely delivered and you're satisfied with the work. This is the core of our zero advance payment model." },
    hi: { q: "क्या WordPress प्रोजेक्ट्स के लिए कोई एडवांस देना पड़ता है?", a: "नहीं। WordPress प्रोजेक्ट्स के लिए कोई एडवांस नहीं देना पड़ता। आप 100% पेमेंट तभी करते हैं जब प्रोजेक्ट पूरी तरह डिलीवर हो जाए और आप उससे संतुष्ट हों। यही हमारे ज़ीरो एडवांस पेमेंट मॉडल का मूल है।" },
  },
  {
    en: { q: "What payment structure do you follow for React-based projects?", a: "For React and custom development projects, we ask for a 45% milestone payment when 30% of the work is completed. The remaining balance is due upon successful project completion. Final pricing depends on requirements and complexity." },
    hi: { q: "React आधारित प्रोजेक्ट्स के लिए पेमेंट स्ट्रक्चर क्या है?", a: "React और कस्टम डेवलपमेंट प्रोजेक्ट्स में 30% काम पूरा होने पर 45% मील-स्टोन पेमेंट ली जाती है। बाकी राशि प्रोजेक्ट पूरा होने पर देय होती है। फ़ाइनल प्राइसिंग आवश्यकताओं और जटिलता पर निर्भर करती है।" },
  },
  {
    en: { q: "Do I need to provide my own domain?", a: "Yes. Clients provide their own domain so they retain full ownership of their web presence. We can help you purchase one if needed." },
    hi: { q: "क्या मुझे अपना डोमेन खुद देना होगा?", a: "हाँ। डोमेन क्लाइंट खुद लेते हैं ताकि उनकी वेब उपस्थिति पूरी तरह उनकी मालकियत में रहे। ज़रूरत हो तो डोमेन ख़रीदने में हम सहायता करते हैं।" },
  },
  {
    en: { q: "Do you provide hosting services?", a: "We include 1 year of free hosting with every WordPress project. For React and custom apps, hosting options are discussed during the proposal — we can deploy to your account or recommend cost-effective providers." },
    hi: { q: "क्या आप होस्टिंग सर्विस देते हैं?", a: "हर WordPress प्रोजेक्ट के साथ 1 साल की फ्री होस्टिंग शामिल है। React और कस्टम ऐप्स के लिए होस्टिंग प्रपोज़ल में डिस्कस होती है — हम आपके अकाउंट पर डिप्लॉय कर सकते हैं या किफ़ायती प्रोवाइडर सजेस्ट करते हैं।" },
  },
  {
    en: { q: "When do I make the final payment?", a: "For WordPress projects, the full 100% is paid only after project completion and your written approval. For React projects, the remaining balance (after the 45% milestone) is due on completion." },
    hi: { q: "फ़ाइनल पेमेंट कब करनी होती है?", a: "WordPress प्रोजेक्ट्स में 100% पेमेंट प्रोजेक्ट पूरा होने और आपके लिखित अप्रूवल के बाद ली जाती है। React प्रोजेक्ट्स में 45% मील-स्टोन के बाद बाकी राशि प्रोजेक्ट पूरा होने पर देय होती है।" },
  },
  {
    en: { q: "Are there any hidden charges?", a: "No. Every charge is itemised in the project proposal before work begins. There are no setup fees, no hidden taxes beyond statutory GST, and no surprise invoices." },
    hi: { q: "क्या कोई हिडन चार्ज होते हैं?", a: "नहीं। हर चार्ज प्रोजेक्ट शुरू होने से पहले प्रपोज़ल में स्पष्ट लिखा होता है। न कोई सेटअप फ़ी, न कोई छुपा टैक्स (केवल वैधानिक GST), न कोई सरप्राइज़ इनवॉइस।" },
  },
];

const affiliateFaqs: QAPair[] = [
  {
    en: { q: "How does Socilet's affiliate program work?", a: "You receive a unique referral link from your affiliate dashboard. Share it with anyone who needs digital services — when they sign up and the project is completed, you earn a commission automatically tracked in your account." },
    hi: { q: "Socilet का एफ़िलिएट प्रोग्राम कैसे काम करता है?", a: "आपको एफ़िलिएट डैशबोर्ड से एक यूनीक रेफ़रल लिंक मिलती है। उसे किसी भी व्यक्ति के साथ शेयर करें जिसे डिजिटल सर्विसेज़ चाहिए — जब वो साइन-अप करके प्रोजेक्ट पूरा कराते हैं, तो आपके अकाउंट में कमीशन ऑटोमैटिकली ट्रैक हो जाता है।" },
  },
  {
    en: { q: "When do I receive my affiliate commission?", a: "Commissions are released 21 days after the referred project is marked completed. This buffer ensures the client is fully satisfied and protects both sides from refunds or disputes." },
    hi: { q: "एफ़िलिएट कमीशन कब मिलता है?", a: "रेफ़र किया गया प्रोजेक्ट पूरा होने के 21 दिन बाद कमीशन रिलीज़ होता है। यह बफ़र पीरियड क्लाइंट संतुष्टि सुनिश्चित करता है और रिफंड या डिस्प्यूट से दोनों पक्षों की सुरक्षा करता है।" },
  },
  {
    en: { q: "Is there a minimum payout threshold?", a: "Yes — the minimum withdrawable balance is ₹500. Once you reach it, you can request a payout to your bank account or UPI ID directly from the affiliate dashboard." },
    hi: { q: "क्या कोई मिनिमम पेआउट लिमिट है?", a: "हाँ — न्यूनतम विदड्रॉ करने योग्य राशि ₹500 है। यह राशि पूरी होते ही आप एफ़िलिएट डैशबोर्ड से सीधे अपने बैंक अकाउंट या UPI ID पर पेआउट रिक्वेस्ट कर सकते हैं।" },
  },
  {
    en: { q: "How much commission do I earn per referral?", a: "You earn 10% of the total project value for every successfully completed referral. Commission is calculated on the final invoice amount (excluding GST)." },
    hi: { q: "हर रेफ़रल पर कितना कमीशन मिलता है?", a: "हर सफलतापूर्वक पूरे हुए रेफ़रल पर आप कुल प्रोजेक्ट वैल्यू का 10% कमीशन कमाते हैं। कमीशन फ़ाइनल इनवॉइस अमाउंट पर (GST को छोड़कर) कैलकुलेट होता है।" },
  },
];

const generalFaqs: QAPair[] = [
  {
    en: { q: "What digital services does Socilet offer?", a: "We offer website development, mobile app development, AI spokesperson video creation, SEO services, Google Ads management, social media marketing, and business profile (Google My Business) listing — all available under the zero advance payment model." },
    hi: { q: "Socilet कौन-कौन सी डिजिटल सर्विसेज़ देती है?", a: "हम वेबसाइट डेवलपमेंट, मोबाइल ऐप डेवलपमेंट, AI स्पोक्सपर्सन वीडियो, SEO, Google Ads मैनेजमेंट, सोशल मीडिया मार्केटिंग और Google Business Profile (GMB) लिस्टिंग सर्विसेज़ देते हैं — सभी ज़ीरो एडवांस पेमेंट मॉडल पर उपलब्ध हैं।" },
  },
  {
    en: { q: "What technologies do you use?", a: "Frontend: React, Next.js, TypeScript, Tailwind CSS. Backend: Node.js, Supabase, Python, PHP/Laravel, WordPress. Mobile: React Native, Flutter, native iOS/Android. Hosting: Vercel, AWS, DigitalOcean, Cloudflare." },
    hi: { q: "आप कौन-कौन सी टेक्नोलॉजीज़ इस्तेमाल करते हैं?", a: "Frontend: React, Next.js, TypeScript, Tailwind CSS। Backend: Node.js, Supabase, Python, PHP/Laravel, WordPress। मोबाइल: React Native, Flutter, Native iOS/Android। होस्टिंग: Vercel, AWS, DigitalOcean, Cloudflare।" },
  },
  {
    en: { q: "How long does it take to complete a project?", a: "Standard business websites take 2–4 weeks. E-commerce stores take 4–8 weeks. Mobile apps typically take 2–6 months depending on scope. AI spokesperson videos are delivered in 3–7 days." },
    hi: { q: "एक प्रोजेक्ट पूरा होने में कितना समय लगता है?", a: "स्टैंडर्ड बिज़नेस वेबसाइट 2–4 हफ़्तों में बनती है। ई-कॉमर्स स्टोर 4–8 हफ़्तों में। मोबाइल ऐप्स 2–6 महीनों में (स्कोप पर निर्भर)। AI स्पोक्सपर्सन वीडियो 3–7 दिनों में डिलीवर होते हैं।" },
  },
  {
    en: { q: "Do you provide ongoing support after delivery?", a: "Yes — every project comes with 1 month of free post-launch bug-fix support. After that, affordable monthly maintenance packages are available that include hosting, security, content updates and new features." },
    hi: { q: "क्या डिलीवरी के बाद सपोर्ट मिलती है?", a: "हाँ — हर प्रोजेक्ट के साथ 1 महीने का फ्री पोस्ट-लॉन्च बग-फ़िक्स सपोर्ट मिलता है। उसके बाद किफ़ायती मासिक मेंटेनेंस पैकेज उपलब्ध हैं जिनमें होस्टिंग, सिक्योरिटी, कंटेंट अपडेट्स और नए फ़ीचर्स शामिल हैं।" },
  },
  {
    en: { q: "Where is Socilet located?", a: "Socilet's office is in Ayodhya Nagar, Bhopal, Madhya Pradesh (PIN 462041), India. We serve clients across India as well as in USA, Canada, UK, Australia and UAE." },
    hi: { q: "Socilet का ऑफ़िस कहाँ है?", a: "Socilet का ऑफ़िस अयोध्या नगर, भोपाल, मध्य प्रदेश (पिन 462041) में है। हम पूरे भारत के साथ-साथ USA, Canada, UK, Australia और UAE के क्लाइंट्स को भी सर्विस देते हैं।" },
  },
  {
    en: { q: "How do I get started?", a: "Contact us via the form on socilet.in, message us on WhatsApp at +91 93011 39140, or email contact@socilet.in. We'll schedule a free consultation and send a detailed proposal within 24–48 hours." },
    hi: { q: "Socilet के साथ शुरुआत कैसे करें?", a: "socilet.in के कॉन्टैक्ट फ़ॉर्म से संपर्क करें, WhatsApp +91 93011 39140 पर मैसेज करें, या contact@socilet.in पर ईमेल करें। हम फ्री कंसल्टेशन शेड्यूल करेंगे और 24–48 घंटों में डिटेल्ड प्रपोज़ल भेजेंगे।" },
  },
];

const faqMap: Record<CategoryId, QAPair[]> = {
  payment: paymentFaqs,
  affiliate: affiliateFaqs,
  general: generalFaqs,
};

function FAQPage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [cat, setCat] = useState<CategoryId>("payment");
  const [search, setSearch] = useState("");

  const allFaqs = faqMap[cat];
  const filtered = search.trim()
    ? allFaqs.filter((pair) => {
        const text = (lang === "en" ? pair.en.q + " " + pair.en.a : pair.hi.q + " " + pair.hi.a).toLowerCase();
        return text.includes(search.toLowerCase());
      })
    : allFaqs;

  return (
    <>
      <AppHeader title="FAQ" back />
      <main className="px-5 py-5">
        {/* Header */}
        <div className="mb-4">
          <h1 className="font-display text-2xl font-bold">Frequently Asked Questions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lang === "en" ? "Everything you need to know before starting your project." : "प्रोजेक्ट शुरू करने से पहले जानने योग्य हर बात।"}
          </p>
        </div>

        {/* Language toggle + Search */}
        <div className="mb-4 flex items-center gap-2">
          <div className="flex rounded-full border border-border bg-card p-0.5">
            <button
              onClick={() => setLang("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                lang === "en" ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLang("hi")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                lang === "hi" ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground"
              }`}
            >
              हिन्दी
            </button>
          </div>
          <div className="relative flex-1">
            <HelpCircle className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={lang === "en" ? "Search questions..." : "सवाल खोजें..."}
              className="w-full rounded-full border border-border bg-card py-1.5 pl-8 pr-3 text-xs outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Category tabs */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((c) => {
            const Icon = c.icon;
            const active = cat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium transition ${
                  active ? "border-primary bg-primary/15 text-primary-glow" : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {lang === "en" ? c.label : c.labelHi}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion */}
        <Card className="border-border bg-card">
          <Accordion type="single" collapsible className="px-1">
            {filtered.map((pair, i) => {
              const qa = lang === "en" ? pair.en : pair.hi;
              return (
                <AccordionItem key={`${cat}-${i}`} value={`${cat}-item-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-semibold">{qa.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{qa.a}</AccordionContent>
                </AccordionItem>
              );
            })}
            {filtered.length === 0 && (
              <div className="py-8 text-center text-sm text-muted-foreground">
                {lang === "en" ? "No matching questions found." : "कोई मैचिंग सवाल नहीं मिला।"}
              </div>
            )}
          </Accordion>
        </Card>

        {/* Still have questions CTA */}
        <Card className="mt-6 border-primary/30 bg-gradient-primary p-5 text-primary-foreground">
          <h3 className="font-display text-lg font-bold">
            {lang === "en" ? "Still have questions?" : "अभी भी सवाल हैं?"}
          </h3>
          <p className="mt-1 text-sm opacity-90">
            {lang === "en"
              ? "Reach out and our team will respond within a few business hours."
              : "हमें संपर्क करें — हम कुछ घंटों में रिप्लाई करते हैं।"}
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button asChild variant="secondary" className="flex-1 bg-primary-foreground text-foreground hover:bg-primary-foreground/90">
              <a href="https://wa.me/919301139140" target="_blank" rel="noreferrer">
                <MessageCircle className="mr-1.5 h-4 w-4 text-[#25D366]" />
                {lang === "en" ? "Ask on WhatsApp" : "WhatsApp पर पूछें"}
              </a>
            </Button>
            <Button asChild variant="secondary" className="flex-1 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/25">
              <Link to="/support">
                {lang === "en" ? "Get a Free Consultation" : "फ्री कंसल्टेशन लें"}
              </Link>
            </Button>
          </div>
        </Card>
      </main>
    </>
  );
}
