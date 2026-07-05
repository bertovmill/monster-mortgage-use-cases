import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Draft a personalized outreach message for a contact in the broker's referral network. Uses CRM context to write a warm, specific message.",
  inputSchema: z.object({
    contactName: z.string().describe("Full name of the contact"),
    contactType: z
      .enum(["Realtor", "Financial Planner", "Key Client", "Past Client"])
      .describe("Type of contact"),
    company: z.string().describe("Company or organization"),
    title: z.string().describe("Job title"),
    daysSinceContact: z.number().describe("Number of days since last touchpoint"),
    lastDeal: z.string().describe("Description of the last deal or referral"),
    dealsReferred: z.number().describe("Total number of deals referred to date"),
    notes: z.string().describe("Broker notes and relationship context"),
  }),
  async execute(input) {
    return {
      contact: input.contactName,
      type: input.contactType,
      daysOverdue: input.daysSinceContact > 90 ? input.daysSinceContact - 90 : 0,
      context: `${input.contactType} at ${input.company}. Last deal: ${input.lastDeal}. ${input.dealsReferred} deals referred total. Notes: ${input.notes}`,
      instruction:
        "Use this context to write a warm, personalized outreach message under 150 words. Reference the last deal and time since contact. End with one low-pressure call to action. Do not use generic openers.",
    };
  },
});
