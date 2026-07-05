// Simulated Monster Mortgage CRM contacts
// Presented in both HubSpot and Salesforce field formats for the demo

export type ContactType = "Realtor" | "Financial Planner" | "Key Client" | "Past Client";

export interface CRMContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  title: string;
  contactType: ContactType;
  lastActivityDate: string;       // ISO date string
  daysSinceContact: number;
  lastDeal: string;
  dealsReferred: number;
  notes: string;
  status: "hot" | "warm" | "cold";
}

// Raw contacts — source of truth
const CONTACTS: CRMContact[] = [
  // ── REALTORS ──
  {
    id: "c-001",
    firstName: "Sarah",
    lastName: "Chen",
    email: "sarah.chen@remax.ca",
    phone: "416-555-0182",
    company: "RE/MAX Hallmark",
    title: "Sales Representative",
    contactType: "Realtor",
    lastActivityDate: "2026-04-02",
    daysSinceContact: 94,
    lastDeal: "22 King St W #1204 — $745,000 closed",
    dealsReferred: 4,
    notes: "Top producer in downtown Toronto condos. Very active on Instagram — worth engaging there. Prefers text over email. Has a team of 3 junior agents she influences.",
    status: "warm",
  },
  {
    id: "c-002",
    firstName: "Ryan",
    lastName: "Patel",
    email: "ryan.patel@royallepage.ca",
    phone: "905-555-0247",
    company: "Royal LePage Meadowtowne",
    title: "Broker of Record",
    contactType: "Realtor",
    lastActivityDate: "2026-02-14",
    daysSinceContact: 141,
    lastDeal: "1482 Lakeshore Rd, Mississauga — $1.2M closed",
    dealsReferred: 2,
    notes: "Runs a high-volume team in Mississauga. Focused on the $800K–1.5M bracket. Mentioned he's frustrated with his current mortgage partner's response times — opportunity.",
    status: "cold",
  },
  {
    id: "c-003",
    firstName: "Jessica",
    lastName: "Ko",
    email: "jessica.ko@kw.com",
    phone: "416-555-0391",
    company: "Keller Williams Referred Urban Realty",
    title: "Real Estate Agent",
    contactType: "Realtor",
    lastActivityDate: "2026-05-10",
    daysSinceContact: 56,
    lastDeal: "88 Scott St #3702 — $619,000 closed",
    dealsReferred: 1,
    notes: "Newer relationship. First deal together went smoothly — she commented on how fast the approval came back. Worth nurturing into a consistent referral source.",
    status: "warm",
  },

  // ── FINANCIAL PLANNERS ──
  {
    id: "c-004",
    firstName: "Marcus",
    lastName: "Webb",
    email: "marcus.webb@edwardjones.com",
    phone: "905-555-0118",
    company: "Edward Jones",
    title: "Financial Advisor",
    contactType: "Financial Planner",
    lastActivityDate: "2026-01-20",
    daysSinceContact: 166,
    lastDeal: "Referred the Torino family — $1.4M investment property mortgage",
    dealsReferred: 3,
    notes: "HNW client base in Oakville. Focuses on retirement planning and wealth transfer. Has flagged that several of his clients are asking about using home equity for investing — warm lead for a HELOC conversation.",
    status: "cold",
  },
  {
    id: "c-005",
    firstName: "Aisha",
    lastName: "Thompson",
    email: "aisha.thompson@td.com",
    phone: "416-555-0552",
    company: "TD Wealth",
    title: "Senior Investment Advisor",
    contactType: "Financial Planner",
    lastActivityDate: "2026-03-28",
    daysSinceContact: 99,
    lastDeal: "Referred Priya Sharma — $580,000 first purchase",
    dealsReferred: 1,
    notes: "Met at a TD event 8 months ago. Younger advisor, building her book. Very receptive to partnership. Mentioned she has 6–8 clients per year who buy property.",
    status: "warm",
  },

  // ── KEY CLIENTS ──
  {
    id: "c-006",
    firstName: "James",
    lastName: "Torino",
    email: "james.torino@gmail.com",
    phone: "416-555-0773",
    company: "Self-employed (Torino Construction)",
    title: "Business Owner",
    contactType: "Key Client",
    lastActivityDate: "2026-05-01",
    daysSinceContact: 65,
    lastDeal: "Investment property #2 — 88 Harbour St, $1.05M (5yr fixed, 4.64%)",
    dealsReferred: 2,
    notes: "Has 2 investment properties with us. Mentioned at last renewal that he's watching the market for a third. Wife Lisa handles the finances — always CC her. Renewal on property #1 in 8 months.",
    status: "warm",
  },
  {
    id: "c-007",
    firstName: "Priya",
    lastName: "Sharma",
    email: "priya.sharma@gmail.com",
    phone: "647-555-0284",
    company: "Deloitte Canada",
    title: "Senior Consultant",
    contactType: "Key Client",
    lastActivityDate: "2026-06-02",
    daysSinceContact: 33,
    lastDeal: "First home purchase — 412 Davenport Rd #7, $580,000 (5yr fixed, 4.89%)",
    dealsReferred: 2,
    notes: "Referred two colleagues after her purchase. Very active and appreciative. Works in tech consulting, earning well — could be candidate for investment property conversation in 2–3 years.",
    status: "hot",
  },

  // ── PAST CLIENTS ──
  {
    id: "c-008",
    firstName: "David",
    lastName: "Park",
    email: "david.park@gmail.com",
    phone: "416-555-0941",
    company: "RBC Capital Markets",
    title: "Associate",
    contactType: "Past Client",
    lastActivityDate: "2025-12-10",
    daysSinceContact: 207,
    lastDeal: "First home — 55 Mercer St #2208, $612,000 (5yr variable, 5.15%)",
    dealsReferred: 0,
    notes: "Closed 18 months ago. Recently got married — congratulated him on LinkedIn. With dual income now, likely in position to refinance or purchase a second property. Has not referred anyone yet.",
    status: "cold",
  },
  {
    id: "c-009",
    firstName: "Linda",
    lastName: "Nguyen",
    email: "linda.nguyen@gmail.com",
    phone: "905-555-0628",
    company: "York Region School Board",
    title: "Vice Principal",
    contactType: "Past Client",
    lastActivityDate: "2025-11-03",
    daysSinceContact: 244,
    lastDeal: "Family home — 22 Willow Lane, Richmond Hill, $890,000 (5yr fixed, 4.79%)",
    dealsReferred: 1,
    notes: "Closed 2 years ago. Referred her sister-in-law last year. Very warm relationship. Renewal comes up in 3 years but worth staying in touch. Mentioned thinking about helping their son buy his first condo.",
    status: "cold",
  },
];

// ── HubSpot format ──
export function toHubSpotFormat(c: CRMContact) {
  return {
    id: `hs_${c.id}`,
    properties: {
      hs_object_id: `hs_${c.id}`,
      firstname: c.firstName,
      lastname: c.lastName,
      email: c.email,
      phone: c.phone,
      company: c.company,
      jobtitle: c.title,
      lifecyclestage: c.contactType === "Past Client" || c.contactType === "Key Client" ? "customer" : "lead",
      hs_lead_source: "Referral Network",
      lastmodifieddate: c.lastActivityDate,
      hs_analytics_last_visit_timestamp: c.lastActivityDate,
      // Custom Monster Mortgage properties
      contact_type__c: c.contactType,
      last_deal__c: c.lastDeal,
      deals_referred__c: String(c.dealsReferred),
      days_since_contact__c: String(c.daysSinceContact),
      broker_notes__c: c.notes,
      relationship_status__c: c.status,
    },
    createdAt: "2024-01-15T09:00:00.000Z",
    updatedAt: c.lastActivityDate + "T14:32:00.000Z",
    archived: false,
  };
}

// ── Salesforce format ──
export function toSalesforceFormat(c: CRMContact) {
  return {
    Id: `003${c.id.replace("c-", "").padStart(12, "0")}IAA`,
    FirstName: c.firstName,
    LastName: c.lastName,
    Email: c.email,
    Phone: c.phone,
    Account: { Name: c.company, Id: `001${c.id.replace("c-", "").padStart(12, "0")}AAA` },
    Title: c.title,
    Department: null,
    LastActivityDate: c.lastActivityDate,
    LeadSource: "Referral",
    // Custom fields
    Contact_Type__c: c.contactType,
    Last_Deal__c: c.lastDeal,
    Deals_Referred__c: c.dealsReferred,
    Days_Since_Contact__c: c.daysSinceContact,
    Broker_Notes__c: c.notes,
    Relationship_Status__c: c.status,
    CreatedDate: "2024-01-15T09:00:00.000+0000",
    SystemModstamp: c.lastActivityDate + "T14:32:00.000+0000",
    attributes: {
      type: "Contact",
      url: `/services/data/v59.0/sobjects/Contact/003${c.id}`,
    },
  };
}

export const ALL_CONTACTS = CONTACTS;
export const HUBSPOT_CONTACTS = CONTACTS.map(toHubSpotFormat);
export const SALESFORCE_CONTACTS = CONTACTS.map(toSalesforceFormat);
