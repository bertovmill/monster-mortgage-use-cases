import { streamText } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { fileNotes } = await request.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    maxOutputTokens: 900,
    prompt: `You are an expert mortgage broker assistant. Analyze this file and produce a clear action plan.

FILE NOTES:
${fileNotes}

Produce a response in exactly this format:

STATUS SUMMARY
One sentence on where this deal stands overall.

OUTSTANDING ITEMS
List each pending item with a priority label: URGENT / SOON / WAITING. Be specific.

IMMEDIATE ACTIONS
Number the exact steps the broker should take today, in order.

DRAFT: CLIENT MESSAGE
Write a ready-to-send message to the client that (a) updates them on status, (b) clearly requests anything outstanding from them, (c) keeps the tone warm and professional.

---

Keep it tight and actionable. No filler.`,
  });

  return result.toTextStreamResponse();
}
