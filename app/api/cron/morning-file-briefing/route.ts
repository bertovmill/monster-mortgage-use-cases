import { generateText } from "ai";
import { MOCK_FILES } from "@/lib/mock-file-data";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const activeFiles = MOCK_FILES.filter((f) =>
    ["Conditions", "Clear to Close"].includes(f.stage)
  ).sort((a, b) => {
    const urgency: Record<string, number> = { urgent: 0, active: 1, smooth: 2 };
    return (urgency[a.priority] ?? 2) - (urgency[b.priority] ?? 2);
  });

  const filesSummary = activeFiles
    .map(
      (f) =>
        `File: ${f.clients} | Stage: ${f.stage} | Priority: ${f.priority} | Closing: ${f.closingDate} (${f.daysToClose}d) | Notes: ${f.notes}`
    )
    .join("\n");

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    maxOutputTokens: 800,
    prompt: `You are a mortgage broker assistant. It is 7am Monday-Friday. Review these active files and produce a concise morning briefing the broker can act on immediately.

Active files:
${filesSummary}

Write a short briefing (under 200 words) covering:
1. Most urgent file and exactly what needs to happen today
2. Any files going out today
3. One sentence on the overall pipeline health

Be direct. No fluff.`,
  });

  return Response.json({
    ok: true,
    runAt: new Date().toISOString(),
    filesReviewed: activeFiles.length,
    briefing: text,
  });
}
