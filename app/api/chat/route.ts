import { streamText, convertToModelMessages, tool, isStepCount } from "ai";
import { z } from "zod";
import type { UIMessage } from "ai";
import { ALL_CONTACTS } from "@/lib/mock-crm-data";

export const maxDuration = 60;

const SYSTEM_PROMPT = `You are a senior AI assistant for Monster Mortgage, a Canadian mortgage brokerage based in Toronto. You work alongside brokers to help them stay in front of their referral network and keep active files moving.

You have two core jobs:

**1. Referral network outreach**
You monitor the broker's contact database — Realtors, Financial Planners, and key clients. When a contact has gone too long without a touchpoint, you draft a personalized, warm outreach message using their CRM history: last deal, deals referred, relationship notes. You never write generic messages. Every message references something real.

**2. File workflow assistance**
You review active mortgage files and surface what is outstanding, what needs to happen today, and what the client should hear.

**Tone and style:**
- Warm and professional — never corporate or salesy
- Speak as the broker in first person when drafting outreach
- Be specific — reference deal amounts, time since contact, referral counts
- Keep outreach messages under 150 words
- Never use "I hope this message finds you well", "touching base", or "just checking in"
- Financial Planners get a more formal tone than Realtors or clients

**Active files:**
- Rodriguez (f-001): Conditions stage, URGENT, closes July 18. Missing employment letter and lawyer contact.
- Park (f-002): Clear to Close, closes July 22. Smooth — draft closing message.
- Khalil (f-003): Pre-Approval, closes Sept 5. Active.
- Whitfield (f-004): Funded June 30. Follow up for referral.

**What you never do:**
- Never make up contact details not in your knowledge
- Never send outreach without the broker reviewing it first
- Never promise rates, approvals, or timelines
- Flag anything urgent rather than quietly skipping it

Always use the lookup_contacts tool when the broker asks about contacts or who to reach out to. Use draft_message when they want to reach out to someone specific.`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: "anthropic/claude-sonnet-4.6",
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(5),
    tools: {
      lookup_contacts: tool({
        description: "Search and filter the broker's contact database. Use this to find contacts by name, type, status, or days since last contact. Returns full contact details including relationship notes.",
        inputSchema: z.object({
          filter: z.enum(["all", "overdue", "hot", "warm", "cold", "realtors", "financial_planners", "key_clients", "past_clients"]).optional().describe("Filter contacts by category or status. 'overdue' returns contacts not touched in 90+ days."),
          search: z.string().optional().describe("Search by name or company"),
        }),
        execute: async ({ filter, search }) => {
          let contacts = [...ALL_CONTACTS];

          if (search) {
            const q = search.toLowerCase();
            contacts = contacts.filter(c =>
              `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
              c.company.toLowerCase().includes(q)
            );
          }

          if (filter) {
            switch (filter) {
              case "overdue":
                contacts = contacts.filter(c => c.daysSinceContact >= 90);
                break;
              case "hot":
                contacts = contacts.filter(c => c.status === "hot");
                break;
              case "warm":
                contacts = contacts.filter(c => c.status === "warm");
                break;
              case "cold":
                contacts = contacts.filter(c => c.status === "cold");
                break;
              case "realtors":
                contacts = contacts.filter(c => c.contactType === "Realtor");
                break;
              case "financial_planners":
                contacts = contacts.filter(c => c.contactType === "Financial Planner");
                break;
              case "key_clients":
                contacts = contacts.filter(c => c.contactType === "Key Client");
                break;
              case "past_clients":
                contacts = contacts.filter(c => c.contactType === "Past Client");
                break;
            }
          }

          contacts.sort((a, b) => b.daysSinceContact - a.daysSinceContact);

          return {
            count: contacts.length,
            contacts: contacts.map(c => ({
              id: c.id,
              name: `${c.firstName} ${c.lastName}`,
              type: c.contactType,
              company: c.company,
              title: c.title,
              status: c.status,
              daysSinceContact: c.daysSinceContact,
              lastDeal: c.lastDeal,
              dealsReferred: c.dealsReferred,
              notes: c.notes,
              email: c.email,
            })),
          };
        },
      }),

      draft_message: tool({
        description: "Draft a personalized outreach message for a specific contact. Uses their CRM history to write a warm, specific message the broker can review and send.",
        inputSchema: z.object({
          contactId: z.string().optional().describe("Contact ID (e.g. c-001)"),
          contactName: z.string().optional().describe("Contact name if ID not known"),
          messageType: z.enum(["check_in", "referral_follow_up", "deal_update", "introduction", "re_engagement"]).describe("Type of message to draft"),
          additionalContext: z.string().optional().describe("Any additional context or specific points to include"),
        }),
        execute: async ({ contactId, contactName, messageType, additionalContext }) => {
          let contact = contactId
            ? ALL_CONTACTS.find(c => c.id === contactId)
            : contactName
              ? ALL_CONTACTS.find(c =>
                  `${c.firstName} ${c.lastName}`.toLowerCase().includes(contactName.toLowerCase())
                )
              : undefined;

          if (!contact) {
            return { error: "Contact not found. Use lookup_contacts first to find the right contact ID." };
          }

          return {
            contact: {
              name: `${contact.firstName} ${contact.lastName}`,
              type: contact.contactType,
              company: contact.company,
              daysSinceContact: contact.daysSinceContact,
              lastDeal: contact.lastDeal,
              dealsReferred: contact.dealsReferred,
              notes: contact.notes,
            },
            messageType,
            additionalContext,
            instruction: `Draft a ${messageType.replace(/_/g, " ")} message for ${contact.firstName} ${contact.lastName} at ${contact.company}. It has been ${contact.daysSinceContact} days since last contact. Their last deal was: ${contact.lastDeal}. They have referred ${contact.dealsReferred} deal(s) total. Broker notes: ${contact.notes}. ${additionalContext || ""} Write in first person as the broker. Under 150 words. No generic openers. Reference the last deal or something specific.`,
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
