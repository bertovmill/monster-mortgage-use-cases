import { generateText } from "ai";
import { ALL_CONTACTS } from "@/lib/mock-crm-data";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  if (
    process.env.NODE_ENV === "production" &&
    request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return new Response("Unauthorized", { status: 401 });
  }

  const overdueContacts = ALL_CONTACTS
    .filter((c) => c.daysSinceContact >= 90)
    .sort((a, b) => b.daysSinceContact - a.daysSinceContact);

  const highPriority = overdueContacts.filter((c) => c.daysSinceContact >= 150);

  const contactSummary = overdueContacts
    .slice(0, 10)
    .map(
      (c) =>
        `${c.firstName} ${c.lastName} (${c.contactType}) — ${c.daysSinceContact} days overdue${c.daysSinceContact >= 150 ? " HIGH PRIORITY" : ""} | Notes: ${c.notes}`
    )
    .join("\n");

  const { text } = await generateText({
    model: "anthropic/claude-sonnet-4.6",
    maxOutputTokens: 600,
    prompt: `You are a mortgage broker's outreach assistant. Review these contacts who haven't been touched in 90+ days and produce a prioritized outreach action list.

Overdue contacts:
${contactSummary}

Write a brief action list (under 150 words) covering:
1. The top 3 high-priority contacts to reach today and why
2. Suggested channel for each (call, email, text)
3. One sentence on the overall database health

Be direct and specific. No generic advice.`,
  });

  return Response.json({
    ok: true,
    runAt: new Date().toISOString(),
    totalOverdue: overdueContacts.length,
    highPriority: highPriority.length,
    actionList: text,
  });
}
