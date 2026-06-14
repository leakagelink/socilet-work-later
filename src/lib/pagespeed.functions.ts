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
    if (!res.ok) {
      let msg = `PageSpeed request failed (${res.status})`;
      try {
        const err = (await res.json()) as { error?: { message?: string } };
        if (err?.error?.message) msg = err.error.message;
      } catch {}
      throw new Error(msg);
    }

    const json = (await res.json()) as {
      lighthouseResult: {
        categories: Record<string, { score: number | null; auditRefs?: Array<{ id: string }> }>;
        audits: Record<
          string,
          { title: string; score: number | null; displayValue?: string; scoreDisplayMode?: string }
        >;
      };
    };
    return json;
  });
