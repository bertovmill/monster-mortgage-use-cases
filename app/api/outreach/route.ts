import { streamText } from "ai";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const {
    contactType,
    contactName,
    lastTouch,
    contactNotes,
    company,
    title,
    dealsReferred,
  } = await request.json();

  const crmContext = [
    company && `Company: ${company}`,
    title && `Title: ${title}`,
    dealsReferred !== undefined && `Deals referred to date: ${dealsReferred}`,
  ]
    .filter(Boolean)
    .join("\n");

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    maxOutputTokens: 600,
    prompt: `You are a top-performing Canadian mortgage broker's communication assistant. Write a warm, professional, personalized outreach message based on the CRM data below.

Contact type: ${contactType}
Contact name: ${contactName}
Last touch point: ${lastTouch}
${crmContext}
Context / notes: ${contactNotes}

Instructions:
- Write a natural, genuine message — not salesy, not corporate
- Reference specific details from the CRM data (the last deal, time since contact, context notes)
- Keep it under 150 words
- Tone: more casual with Realtors and clients, more professional with Financial Planners
- End with one clear but low-pressure call to action
- Do NOT use phrases like "I hope this message finds you well", "touching base", or "just checking in"
- Write in first person as the broker (no signature needed)

Output only the message text. No subject line, no labels, no preamble.`,
  });

  return result.toTextStreamResponse();
}
