import { defineTool } from "eve/tools";
import { z } from "zod";

export default defineTool({
  description:
    "Analyze an active mortgage file and produce a structured briefing: status summary, outstanding items with priority, immediate broker actions, and a draft client message.",
  inputSchema: z.object({
    fileId: z.string().describe("File identifier (e.g. f-001)"),
    borrowers: z.string().describe("Borrower names"),
    stage: z
      .enum(["Pre-Approval", "Conditions", "Clear to Close", "Closing", "Funded"])
      .describe("Current stage of the mortgage file"),
    closingDate: z.string().describe("Target closing date"),
    referralSource: z.string().describe("Who referred this client"),
    notes: z.string().describe("Broker notes on the file status and outstanding items"),
  }),
  async execute(input) {
    const isUrgent =
      input.stage === "Conditions" || input.stage === "Clear to Close";
    return {
      fileId: input.fileId,
      borrowers: input.borrowers,
      stage: input.stage,
      closingDate: input.closingDate,
      urgent: isUrgent,
      referralSource: input.referralSource,
      notes: input.notes,
      instruction:
        "Produce a structured briefing with exactly these four sections: STATUS SUMMARY / OUTSTANDING ITEMS (each with URGENT/SOON/WAITING label) / IMMEDIATE ACTIONS (numbered) / DRAFT: CLIENT MESSAGE (ready to send, warm and professional).",
    };
  },
});
