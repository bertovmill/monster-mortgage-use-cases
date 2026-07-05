export type FileStage = "Pre-Approval" | "Conditions" | "Clear to Close" | "Closing" | "Funded";
export type FilePriority = "urgent" | "active" | "smooth";

export interface MortgageFile {
  id: string;
  clients: string;
  property: string;
  city: string;
  purchasePrice: string;
  loanAmount: string;
  stage: FileStage;
  closingDate: string;
  daysToClose: number;
  priority: FilePriority;
  assignedBroker: string;
  lender: string;
  referralSource: string;
  notes: string;
}

export const MOCK_FILES: MortgageFile[] = [
  {
    id: "f-001",
    clients: "Carlos & Emily Rodriguez",
    property: "412 Maple Ave",
    city: "Oakville, ON",
    purchasePrice: "$889,000",
    loanAmount: "$711,200",
    stage: "Conditions",
    closingDate: "2026-07-18",
    daysToClose: 13,
    priority: "urgent",
    assignedBroker: "Kristian Harris",
    lender: "TD Bank",
    referralSource: "Ryan Patel (Royal LePage)",
    notes: `Clients: Carlos (self-employed, Torino Construction subcontractor) and Emily Rodriguez (RN at Oakville Trafalgar). First-time buyers.

Property: 412 Maple Ave, Oakville — $889,000 purchase, closing July 18.

OUTSTANDING CONDITIONS (TD Bank deadline: July 14):
- Carlos employment letter: His accountant (Marco Furtado, 905-555-0112) is dragging his feet. Need a 2-year self-employed income letter. URGENT.
- MLS listing confirmation: Realtor (Ryan Patel) said he'd send yesterday. Still waiting.
- Home inspection: DONE. Minor issues only, no deal-breakers.
- Lawyer contact info: Emily mentioned a lawyer referral from her sister but hasn't confirmed yet.

Client comms: Last spoke July 1. Emily texted asking for an update, I haven't replied yet. She sounds nervous about the timeline.

Referral note: This file came from Ryan Patel. Strong referral relationship — want to make sure this closes smoothly.`,
  },
  {
    id: "f-002",
    clients: "David & Michelle Park",
    property: "77 Birchwood Cres",
    city: "Mississauga, ON",
    purchasePrice: "$1,120,000",
    loanAmount: "$896,000",
    stage: "Clear to Close",
    closingDate: "2026-07-22",
    daysToClose: 17,
    priority: "active",
    assignedBroker: "Kristian Harris",
    lender: "RBC",
    referralSource: "Marcus Webb (Edward Jones)",
    notes: `Clients: David Park (RBC Capital Markets, salaried) and Michelle Park (dentist, incorporated). Move-up buyers — selling current home July 15.

Property: 77 Birchwood Cres, Mississauga — $1.12M, closing July 22. Bridge financing arranged.

STATUS: RBC issued clear to close July 3. All conditions satisfied. Bridge loan confirmed with TD (July 15–22 window).

Outstanding:
- Title insurance: Lawyer (Green & Associates) ordered June 30. Confirm receipt.
- Final walkthrough: Scheduled July 19 with Realtor Jessica Ko (KW). Confirm timing with clients.
- Key exchange logistics: Clients traveling July 14–17. Need to confirm who has power of attorney for signing.

Client comms: Very organized clients. Last update July 3. They appreciate proactive communication. No concerns — just keep them in the loop.

Referral note: Marcus Webb (Edward Jones) sent this one. HNW relationship. Send Marcus a thank-you note once funded.`,
  },
  {
    id: "f-003",
    clients: "Amir & Yasmin Khalil",
    property: "218 Lakeview Blvd #8",
    city: "Burlington, ON",
    purchasePrice: "$635,000",
    loanAmount: "$508,000",
    stage: "Pre-Approval",
    closingDate: "2026-09-05",
    daysToClose: 62,
    priority: "active",
    assignedBroker: "Kristian Harris",
    lender: "TBD",
    referralSource: "Priya Sharma (direct client referral)",
    notes: `Clients: Amir Khalil (software engineer, Google Canada, $185K T4) and Yasmin Khalil (on mat leave returning August, previously $92K).

Property: Townhome at 218 Lakeview Blvd #8, Burlington — $635K. Offer accepted June 28, closing Sept 5.

Pre-approval status: TD declined (Yasmin's mat leave income). Scotiabank pre-approval in progress — broker submitted June 30, waiting on underwriter.

Outstanding:
- Scotia response: Submitted June 30. Follow up with BDM (Sandra Morales, 416-555-0299) — should have an answer by July 7.
- Yasmin return-to-work letter: Her employer (Deloitte) HR is preparing. Estimated July 9.
- Amir T4 2025: Provided. Signed.
- Down payment verification: $127,000 from GIC (matures Aug 1) + $25K gift from Yasmin's parents. Gift letter needed.

Client comms: Amir is anxious — emailed twice this week. Has not told parents about the decline yet. Needs reassurance and a clear plan.

Referral note: Priya Sharma sent this. She's a hot client — referred 2 people already. Want to keep this relationship strong.`,
  },
  {
    id: "f-004",
    clients: "Sandra & Tom Whitfield",
    property: "8 Thornberry Rd",
    city: "Brampton, ON",
    purchasePrice: "$748,000",
    loanAmount: "$598,400",
    stage: "Funded",
    closingDate: "2026-06-30",
    daysToClose: -5,
    priority: "smooth",
    assignedBroker: "Kristian Harris",
    lender: "First National",
    referralSource: "Linda Nguyen (past client referral)",
    notes: `Clients: Sandra Whitfield (teacher, DDSB) and Tom Whitfield (electrician, union). First purchase for Sandra, Tom owns a rental in Hamilton.

Property: 8 Thornberry Rd, Brampton — $748K. Funded June 30. File closed clean.

Post-close actions:
- Send funded confirmation letter (haven't done this yet).
- Add to CRM: mark renewal date as June 30, 2031 (5yr fixed).
- Thank-you gift: clients mentioned they love Italian food. Recommend a local restaurant gift card.
- Linda Nguyen referral follow-up: Linda referred this file. Send her a thank-you. Also — she mentioned her son is looking to buy his first condo in the fall. Flag for follow-up in September.

Notes: Smooth file. Both clients very happy with the rate (4.64% 5yr fixed). Sandra already told two colleagues. Watch for inbound referrals.`,
  },
];
