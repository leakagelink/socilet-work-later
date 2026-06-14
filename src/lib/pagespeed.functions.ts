import { createServerFn } from "@tanstack/react-start";

type Input = {
  url: string;
  strategy: "mobile" | "desktop";
  categories: Array<"seo" | "performance" | "accessibility" | "best-practices">;
};

export const runPageSpeedFn = createServerFn({ method: "POST" })
  .inputValidator((data: Input) => {
    if (!data || typeof data.url !== "string" || !data.url.trim()) {
      throw new Error("URL is required");
    }
    const strategy = data.strategy === "desktop" ? "desktop" : "mobile";
    const categories =
      Array.isArray(data.categories) && data.categories.length
        ? data.categories
        : (["performance"] as Input["categories"]);
    return { url: data.url.trim(), strategy, categories };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY;
    if (!apiKey) {
      throw new Error("PageSpeed API key not configured");
    }

    const params = new URLSearchParams();
    params.set("url", data.url);
    params.set("strategy", data.strategy);
    params.set("key", apiKey);
    for (const c of data.categories) params.append("category", c);

    const api = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params.toString()}`;

    const res = await fetch(api);
    const json: any = await res.json().catch(() => ({}));

    // Google returns 200 even when Lighthouse fails — check runtimeError
    const runtimeError = json?.lighthouseResult?.runtimeError;
    if (runtimeError?.code && runtimeError.code !== "NO_ERROR") {
      const code = runtimeError.code as string;
      let friendly = `Couldn't analyze this site (${code}).`;
      if (code === "FAILED_DOCUMENT_REQUEST") {
        friendly =
          "Google couldn't load this site — it timed out or blocked the request. Try a different URL, or check that the site is publicly accessible.";
      } else if (code === "DNS_FAILURE") {
        friendly = "DNS lookup failed. Check the URL spelling.";
      } else if (code === "NO_FCP") {
        friendly = "The page never finished rendering. It may be broken or too slow.";
      }
      throw new Error(friendly);
    }

    if (!res.ok || !json?.lighthouseResult) {
      const msg = json?.error?.message || `PageSpeed request failed (${res.status})`;
      throw new Error(msg);
    }

    return json as {
      lighthouseResult: {
        categories: Record<string, { score: number | null; auditRefs?: Array<{ id: string }> }>;
        audits: Record<
          string,
          { title: string; score: number | null; displayValue?: string; scoreDisplayMode?: string }
        >;
      };
    };
  });

