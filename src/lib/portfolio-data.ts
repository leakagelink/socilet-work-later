export const PORTFOLIO_CATS = ["All", "Business", "Landing Page", "Blog", "SaaS", "CRM & ERP", "Trading", "AI", "Social Media"] as const;

const COLORS = [
  "from-pink-500/40 to-violet-500/40",
  "from-blue-500/40 to-cyan-500/40",
  "from-emerald-500/40 to-indigo-500/40",
  "from-amber-500/40 to-rose-500/40",
  "from-slate-500/40 to-blue-500/40",
  "from-fuchsia-500/40 to-orange-500/40",
  "from-teal-500/40 to-lime-500/40",
  "from-red-500/40 to-yellow-500/40",
  "from-indigo-500/40 to-purple-500/40",
  "from-green-500/40 to-emerald-500/40",
  "from-orange-500/40 to-red-500/40",
  "from-cyan-500/40 to-blue-500/40",
];

export function getPortfolioColor(index: number) {
  return COLORS[index % COLORS.length];
}

export interface PortfolioItem {
  id: string;
  title: string;
  cat: string;
  tag: string;
  url: string;
  stack: string[];
  result: string;
}

export const portfolioProjects: PortfolioItem[] = [
  // Business Portfolio
  { id: "incorpwale", title: "IncorpWale", cat: "Business", tag: "Business incorporation & legal services", url: "https://incorpwale.com", stack: ["Web", "Business"], result: "Live & running" },
  { id: "karnatakaginger", title: "Karnataka Ginger", cat: "Business", tag: "Ginger export & trading", url: "https://karnatakagingerintr.in", stack: ["Web", "Export"], result: "Live & running" },
  { id: "chicfusion", title: "Chic Fusion Makeovers", cat: "Business", tag: "Beauty & makeover services", url: "https://chicfusionmakeovers.in", stack: ["Web", "Beauty"], result: "Live & running" },
  { id: "gayatrikashyap", title: "Gayatri Kashyap", cat: "Business", tag: "Personal brand portfolio", url: "https://gayatrikashyap.in", stack: ["Web", "Portfolio"], result: "Live & running" },
  { id: "dheerajtagde", title: "Dheeraj Tagde", cat: "Business", tag: "Personal brand & portfolio", url: "https://dheerajtagde.in", stack: ["Web", "Portfolio"], result: "Live & running" },
  { id: "navbharat", title: "Navbharat Fertilizer", cat: "Business", tag: "Agriculture & fertilizer", url: "https://navbharatfertilizer.com", stack: ["Web", "Agriculture"], result: "Live & running" },
  { id: "catejaspandya", title: "Catejas Pandya", cat: "Business", tag: "Personal portfolio", url: "https://catejaspandya.com", stack: ["Web", "Portfolio"], result: "Live & running" },
  { id: "kbglobal", title: "KB Global Multicommodities", cat: "Business", tag: "Commodity trading platform", url: "https://kbglobalmulticommodities.com", stack: ["Web", "Trading"], result: "Live & running" },
  { id: "globalcareer", title: "Global Career 365", cat: "Business", tag: "Career coaching & jobs", url: "https://globalcareer365.in", stack: ["Web", "Career"], result: "Live & running" },

  // Landing Page
  { id: "kidsbundle", title: "Kids Bundle", cat: "Landing Page", tag: "Kids product landing page", url: "https://kidsbundle.xyz", stack: ["Landing", "Ecommerce"], result: "Live & running" },

  // Blog
  { id: "healthayurveda", title: "Health & Ayurveda Tips", cat: "Blog", tag: "Health & wellness blog", url: "https://healthandayurvedatips.com", stack: ["Blog", "Health"], result: "Live & running" },
  { id: "gardeningindia", title: "Gardening With India", cat: "Blog", tag: "Gardening & plants blog", url: "https://gardeningwithindia.com", stack: ["Blog", "Lifestyle"], result: "Live & running" },

  // SaaS
  { id: "blogauto", title: "Blog Automation Pro", cat: "SaaS", tag: "AI blog automation tool", url: "https://blogautomationpro.in", stack: ["SaaS", "AI"], result: "Live & running" },
  { id: "aistudent", title: "AI Student Access", cat: "SaaS", tag: "AI education platform", url: "https://aistudentaccessprogram.in", stack: ["SaaS", "Education"], result: "Live & running" },
  { id: "applaunch", title: "App Launch Studio", cat: "SaaS", tag: "App launch & marketing", url: "https://applaunchstudio.online", stack: ["SaaS", "Marketing"], result: "Live & running" },
  { id: "buildmybiz", title: "Build My Biz Online", cat: "SaaS", tag: "Business builder platform", url: "https://buildmybizonline.in", stack: ["SaaS", "Business"], result: "Live & running" },
  { id: "100bizideas", title: "100 Business Ideas", cat: "SaaS", tag: "Business ideas directory", url: "https://100businessideas.in", stack: ["SaaS", "Content"], result: "Live & running" },
  { id: "cryptoarb", title: "Crypto Arb Mastery", cat: "SaaS", tag: "Crypto arbitrage course/tool", url: "https://cryptoarbmastery.in", stack: ["SaaS", "Crypto"], result: "Live & running" },
  { id: "aiseseekho", title: "AI Se Seekho", cat: "SaaS", tag: "AI learning platform", url: "https://aiseseekho.in", stack: ["SaaS", "Education"], result: "Live & running" },
  { id: "loansalahkaar", title: "Loan Salahkaar", cat: "SaaS", tag: "Loan advisory platform", url: "https://loansalahkaar.com", stack: ["SaaS", "Finance"], result: "Live & running" },
  { id: "onlineseva", title: "Online Seva Help", cat: "SaaS", tag: "Government services helper", url: "https://Onlinesevahelp.in", stack: ["SaaS", "Govt"], result: "Live & running" },
  { id: "imageutility", title: "Image Utility", cat: "SaaS", tag: "Image tools & utilities", url: "https://imageutility.in", stack: ["SaaS", "Tools"], result: "Live & running" },

  // CRM & ERP
  { id: "bytevigil", title: "ByteVigil", cat: "CRM & ERP", tag: "Security & monitoring SaaS", url: "https://bytevigil.one", stack: ["SaaS", "Security"], result: "Live & running" },
  { id: "shoporo", title: "Shoporo", cat: "CRM & ERP", tag: "Ecommerce & store management", url: "https://shoporo.in", stack: ["Ecommerce", "SaaS"], result: "Live & running" },
  { id: "inboxbeam", title: "InboxBeam", cat: "CRM & ERP", tag: "Email delivery & outreach", url: "https://inboxbeam.in", stack: ["SaaS", "Email"], result: "Live & running" },
  { id: "vaultiq", title: "VaultIQ", cat: "CRM & ERP", tag: "Financial vault & intelligence", url: "https://vaultiq.in", stack: ["SaaS", "Finance"], result: "Live & running" },

  // Trading
  { id: "growfx", title: "GrowFX Trade", cat: "Trading", tag: "Forex & trading platform", url: "https://growfxtrade.com", stack: ["Web", "Trading"], result: "Live & running" },
  { id: "tradixo", title: "Tradixo FX", cat: "Trading", tag: "Forex trading platform", url: "https://tradixofx.com", stack: ["Web", "Trading"], result: "Live & running" },

  // AI
  { id: "aiautotools", title: "AI Automation Tools", cat: "AI", tag: "AI tools directory", url: "https://aiautomationtools.in", stack: ["AI", "Automation"], result: "Live & running" },
  { id: "aimehendi", title: "AI Mehendi", cat: "AI", tag: "AI mehendi design generator", url: "https://aimehendi.in", stack: ["AI", "Design"], result: "Live & running" },

  // Social Media
  { id: "gigmint", title: "GigMint", cat: "Social Media", tag: "Gig marketplace platform", url: "https://gigmint.online", stack: ["Marketplace", "Social"], result: "Live & running" },
  { id: "sharebuzz", title: "ShareBuzz", cat: "Social Media", tag: "Social sharing & MLM platform", url: "https://sharebuzz.fun", stack: ["Social", "MLM"], result: "Live & running" },
];
