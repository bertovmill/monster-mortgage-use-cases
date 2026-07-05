"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Quote,
  Mail,
  Zap,
  Link2,
  Calendar,
  X,
  Check,
  AlertCircle,
  TrendingDown,
  Users,
  Clock,
  MessageSquare,
  Repeat,
  Target,
  CheckCircle2,
  Database,
  ChevronRight,
  ExternalLink,
  Copy,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { ALL_CONTACTS, type CRMContact, type ContactType } from "@/lib/mock-crm-data";
import { PageToc } from "@/components/page-toc";

const TOC_ITEMS = [
  { id: "brief",      label: "The Brief" },
  { id: "problem",    label: "The Problem" },
  { id: "definition", label: "Definition of Done" },
  { id: "crm",        label: "Connect CRM" },
  { id: "contacts",   label: "Contact Database", indent: true },
  { id: "demo",       label: "Live Demo",         indent: true },
  { id: "scale",      label: "How It Scales" },
];

type CRMSystem = "hubspot" | "salesforce" | "velocity" | null;

const STATUS_COLORS: Record<string, string> = {
  hot: "bg-green-100 text-green-700 border-green-200",
  warm: "bg-amber-100 text-amber-700 border-amber-200",
  cold: "bg-blue-100 text-blue-700 border-blue-200",
};

const TYPE_COLORS: Record<ContactType, string> = {
  "Realtor": "bg-purple-100 text-purple-700 border-purple-200",
  "Financial Planner": "bg-sky-100 text-sky-700 border-sky-200",
  "Key Client": "bg-orange-100 text-orange-700 border-orange-200",
  "Past Client": "bg-zinc-100 text-zinc-600 border-zinc-200",
};

export default function OutreachPage() {
  const [crm, setCrm] = useState<CRMSystem>(null);
  const [connecting, setConnecting] = useState<CRMSystem>(null);
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [filterType, setFilterType] = useState<ContactType | "All">("All");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function connectCRM(system: CRMSystem) {
    setConnecting(system);
    await new Promise((r) => setTimeout(r, 1400));
    setCrm(system);
    setConnecting(null);
    setSelectedContact(null);
    setResult("");
  }

  function selectContact(c: CRMContact) {
    setSelectedContact(c);
    setResult("");
  }

  async function generate() {
    if (!selectedContact || busy || streaming) return;
    setBusy(true);
    setResult("");

    const c = selectedContact;
    const res = await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactType: c.contactType,
        contactName: `${c.firstName} ${c.lastName}`,
        lastTouch: `${c.daysSinceContact} days ago — ${c.lastDeal}`,
        contactNotes: c.notes,
        company: c.company,
        title: c.title,
        dealsReferred: c.dealsReferred,
      }),
    });

    if (!res.ok || !res.body) {
      setResult("Error: check that ANTHROPIC_API_KEY is set in .env.local");
      setBusy(false);
      return;
    }

    setBusy(false);
    setStreaming(true);
    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let text = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      text += dec.decode(value, { stream: true });
      setResult(text);
    }
    setStreaming(false);
  }

  const filtered = filterType === "All"
    ? ALL_CONTACTS
    : ALL_CONTACTS.filter((c) => c.contactType === filterType);

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── MAIN CONTENT (scrolls) ── */}
      <div className="flex-1 overflow-y-auto" id="outreach-scroll">
      <div className="max-w-4xl mx-auto px-8 py-8">

      {/* ── BRIEF ── */}
      <div id="brief">
      <Card className="border-border bg-muted/30 mb-8 shadow-none">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
              <Quote className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-xs font-semibold text-foreground">Kristian Harris, Head of Sales</p>
                <Badge variant="outline" className="text-[10px] font-normal">From: Jun 25 email</Badge>
              </div>
              <p className="text-base text-foreground leading-relaxed font-medium">
                &ldquo;Database and Referral Communication: A way to maintain constant communication
                with my existing database and centers of influence, including Realtors,
                Financial Planners, and key clients.&rdquo;
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* ── PROBLEM BREAKDOWN ── */}
      <div id="problem" className="mb-8">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">The Problem</p>
        <h2 className="text-xl font-semibold text-foreground mb-1">What is actually breaking down</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
          Mortgage brokers build strong relationships to win deals. But those relationships silently decay
          the moment a file closes, because there is no scalable way to stay present.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <ProblemCard icon={<Clock className="h-4 w-4" />} title="Outreach takes too long" body="Writing a personalized message to a Realtor takes 10 minutes. Multiply that by 200 contacts and it never happens." />
          <ProblemCard icon={<MessageSquare className="h-4 w-4" />} title="Generic messages don't land" body="A Realtor needs different messaging than a Financial Planner or a past client. One-size templates get ignored." />
          <ProblemCard icon={<TrendingDown className="h-4 w-4" />} title="Referrals go to whoever is top of mind" body="When a Realtor's client needs a mortgage, they call the broker they heard from most recently. Silence loses deals." />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-border shadow-none">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="h-3 w-3 text-red-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Without Claude</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Broker has 200+ contacts and touches maybe 20 per month",
                  "Messages are rushed, generic, or copy-pasted",
                  "No system to track who was contacted or when",
                  "Realtors and FPs forget who the broker is between deals",
                  "Referral pipeline is unpredictable and feast-or-famine",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <AlertCircle className="h-3.5 w-3.5 text-red-400 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-none bg-muted/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-3 w-3 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-foreground">Problem solved</p>
              </div>
              <ul className="space-y-2.5">
                {[
                  "Every contact gets a relevant, personalized touchpoint on a set cadence",
                  "Claude tailors each message by contact type, history, and context",
                  "CRM tracks last contact date, Claude knows exactly what to say next",
                  "Brokers stay top of mind with Realtors and FPs between every deal",
                  "Referral flow becomes consistent and predictable",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <Check className="h-3.5 w-3.5 text-green-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── DEFINITION OF DONE ── */}
      <div id="definition" className="mb-8">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Definition of Done</p>
        <h2 className="text-xl font-semibold text-foreground mb-1">What does solved actually look like</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
          Not just &ldquo;we have AI.&rdquo; Here is the specific outcome that means this challenge is complete.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SolvedCard icon={<Users className="h-4 w-4" />} metric="100%" label="of your database" body="Every Realtor, Financial Planner, and key client receives a meaningful touchpoint at least once per quarter, automatically." />
          <SolvedCard icon={<Repeat className="h-4 w-4" />} metric="Zero" label="manual drafting" body="A broker reviews and approves, but never writes from scratch. Claude handles the draft based on contact type and history." />
          <SolvedCard icon={<Target className="h-4 w-4" />} metric="+referrals" label="within 60 days" body="Within 2 months of consistent outreach, referral volume from the existing network measurably increases." />
        </div>
      </div>

      <Separator className="mb-8" />

      {/* ── CRM CONNECTION ── */}
      <div id="crm" className="mb-8">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Step 1</p>
        <h2 className="text-xl font-semibold text-foreground mb-1">Connect your CRM</h2>
        <p className="text-sm text-muted-foreground mb-5">
          Claude reads directly from your existing contact database. Select your CRM to load Monster Mortgage&apos;s contacts.
        </p>

        <div className="flex items-center gap-3 flex-wrap">
          <CRMButton
            system="hubspot"
            label="HubSpot"
            color="#FF7A59"
            bgColor="#FFF4F1"
            borderColor="#FFCAB8"
            logo="HS"
            connected={crm === "hubspot"}
            connecting={connecting === "hubspot"}
            onClick={() => connectCRM("hubspot")}
          />
          <CRMButton
            system="salesforce"
            label="Salesforce"
            color="#00A1E0"
            bgColor="#F0F9FF"
            borderColor="#BAE6FD"
            logo="SF"
            connected={crm === "salesforce"}
            connecting={connecting === "salesforce"}
            onClick={() => connectCRM("salesforce")}
          />
          <CRMButton
            system="velocity"
            label="Velocity"
            color="#006BB6"
            bgColor="#EFF6FF"
            borderColor="#BFDBFE"
            logo="V"
            connected={crm === "velocity"}
            connecting={connecting === "velocity"}
            onClick={() => connectCRM("velocity")}
          />
          {crm === "hubspot" && (
            <Link
              href="/hubspot"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-orange-50"
              style={{ borderColor: "#FFCAB8", color: "#FF7A59" }}
            >
              View in HubSpot
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
          {crm === "salesforce" && (
            <Link
              href="/salesforce"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-blue-50"
              style={{ borderColor: "#BAE6FD", color: "#0070D2" }}
            >
              View in Salesforce
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
          {crm === "velocity" && (
            <Link
              href="/velocity"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:bg-blue-50"
              style={{ borderColor: "#BFDBFE", color: "#006BB6" }}
            >
              View in Velocity
              <ExternalLink className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>

      {/* ── CONTACT TABLE ── */}
      {crm && (
        <div id="contacts" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-semibold text-foreground">
                {ALL_CONTACTS.length} contacts loaded from {crm === "hubspot" ? "HubSpot" : crm === "salesforce" ? "Salesforce" : "Velocity"}
              </p>
              <Badge variant="outline" className="text-[10px] font-mono">
                {crm === "hubspot" ? "CRM API v3" : crm === "salesforce" ? "REST API v59.0" : "Velocity DB v4.2"}
              </Badge>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1.5 mb-3 flex-wrap">
            {(["All", "Realtor", "Financial Planner", "Key Client", "Past Client"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilterType(t)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterType === t
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Table */}
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Contact</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden md:table-cell">Company</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Last Contact</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground hidden lg:table-cell">Deals Referred</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr
                      key={c.id}
                      onClick={() => selectContact(c)}
                      className={`border-b border-border last:border-0 cursor-pointer transition-colors ${
                        selectedContact?.id === c.id
                          ? "bg-muted/60"
                          : "hover:bg-muted/30"
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                            {c.firstName[0]}{c.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-foreground text-xs">{c.firstName} {c.lastName}</p>
                            <p className="text-[11px] text-muted-foreground">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${TYPE_COLORS[c.contactType]}`}>
                          {c.contactType}
                        </span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <p className="text-xs text-muted-foreground truncate max-w-36">{c.company}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className={`text-xs font-medium ${c.daysSinceContact > 150 ? "text-red-500" : c.daysSinceContact > 60 ? "text-amber-600" : "text-foreground"}`}>
                          {c.daysSinceContact}d ago
                        </p>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <p className="text-xs text-muted-foreground">{c.dealsReferred} deal{c.dealsReferred !== 1 ? "s" : ""}</p>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border capitalize ${STATUS_COLORS[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {selectedContact?.id === c.id ? (
                          <CheckCircle2 className="h-4 w-4 text-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* ── DEMO ── */}
      {selectedContact && (
        <>
          <Separator className="mb-8" />
          <div id="demo" className="mb-2">
            <Badge variant="outline" className="text-xs font-mono mb-3">LIVE DEMO</Badge>
            <h2 className="text-xl font-semibold text-foreground mb-2">Generate outreach for {selectedContact.firstName} {selectedContact.lastName}</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-xl">
              Claude is reading {selectedContact.firstName}&apos;s full CRM record — contact type, last deal, days since last touch, and broker notes — to write a message that actually resonates.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* CRM data panel */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {crm === "hubspot" ? "HubSpot" : "Salesforce"} Record
                  </p>
                  <Badge variant="outline" className={`text-[10px] ${TYPE_COLORS[selectedContact.contactType]}`}>
                    {selectedContact.contactType}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <CRMField label={crm === "hubspot" ? "firstname / lastname" : "FirstName / LastName"} value={`${selectedContact.firstName} ${selectedContact.lastName}`} />
                  <CRMField label={crm === "hubspot" ? "company" : "Account.Name"} value={selectedContact.company} />
                  <CRMField label={crm === "hubspot" ? "jobtitle" : "Title"} value={selectedContact.title} />
                  <CRMField
                    label={crm === "hubspot" ? "days_since_contact__c" : "Days_Since_Contact__c"}
                    value={`${selectedContact.daysSinceContact} days`}
                    highlight={selectedContact.daysSinceContact > 90}
                  />
                  <CRMField
                    label={crm === "hubspot" ? "last_deal__c" : "Last_Deal__c"}
                    value={selectedContact.lastDeal}
                  />
                  <CRMField
                    label={crm === "hubspot" ? "deals_referred__c" : "Deals_Referred__c"}
                    value={`${selectedContact.dealsReferred} deal${selectedContact.dealsReferred !== 1 ? "s" : ""} referred`}
                  />
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground mb-1">
                      {crm === "hubspot" ? "broker_notes__c" : "Broker_Notes__c"}
                    </p>
                    <p className="text-xs text-foreground leading-relaxed bg-muted/40 rounded-md px-3 py-2 border border-border">
                      {selectedContact.notes}
                    </p>
                  </div>
                </div>

                <Button onClick={generate} disabled={busy || streaming} className="w-full mt-5 h-9 text-sm">
                  {busy ? "Reading CRM data..." : streaming ? "Writing message..." : `Generate message for ${selectedContact.firstName}`}
                  {!busy && !streaming && <ArrowRight className="ml-2 h-3.5 w-3.5" />}
                </Button>
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="border-border shadow-sm">
              <CardContent className="p-5 min-h-64">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Generated Outreach
                  </p>
                  {result && !streaming && (
                    <div className="flex gap-1.5">
                      <button
                        onClick={generate}
                        className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-colors hover:bg-muted/40"
                        style={{ borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                      >
                        <RefreshCw className="h-3 w-3" /> Regenerate
                      </button>
                      <button
                        onClick={copyResult}
                        className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-colors"
                        style={{
                          borderColor: copied ? "#86EFAC" : "hsl(var(--border))",
                          color: copied ? "#166534" : "hsl(var(--foreground))",
                          background: copied ? "#DCFCE7" : "transparent",
                        }}
                      >
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  )}
                </div>
                {result ? (
                  <div className={`text-sm text-foreground leading-relaxed whitespace-pre-wrap ${streaming ? "stream-cursor" : ""}`}>
                    {result}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground text-center">
                      Hit generate to draft a message for {selectedContact.firstName}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {crm && !selectedContact && (
        <Card className="border-border shadow-none bg-muted/20 mb-8">
          <CardContent className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Select a contact from the table above to generate a personalized outreach message.</p>
          </CardContent>
        </Card>
      )}

      {!crm && (
        <>
          <Separator className="mb-8" />
          <Card className="border-border shadow-none bg-muted/20">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">Connect HubSpot or Salesforce above to load your contact database and run the demo.</p>
            </CardContent>
          </Card>
        </>
      )}

      <Separator className="my-8" />

      <div id="scale">
        <h2 className="text-base font-semibold text-foreground mb-4">How this scales across your brokerage</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ValueCard icon={<Link2 className="h-4 w-4" />} title="Any CRM" body="Works with Salesforce, HubSpot, Follow Up Boss, Zoho, or any system you already use." />
          <ValueCard icon={<Zap className="h-4 w-4" />} title="50x Faster" body="Draft 50 personalized messages in the time it takes to write one. No copy-paste, no generic templates." />
          <ValueCard icon={<Calendar className="h-4 w-4" />} title="Automated Cadence" body="Set it once. Claude sends the right message to the right person at the right time, on autopilot." />
        </div>
      </div>

      </div>{/* end inner padding */}
      </div>{/* end scrolling content */}

      {/* ── TOC (fixed, never scrolls) ── */}
      <aside className="w-52 shrink-0 border-l border-border px-5 py-8 overflow-y-auto">
        <PageToc items={TOC_ITEMS} scrollContainerId="outreach-scroll" />
      </aside>

    </div>
  );
}

/* ── Sub-components ── */

function CRMButton({
  label, color, bgColor, borderColor, logo, connected, connecting, onClick,
}: {
  system: string; label: string; color: string; bgColor: string; borderColor: string;
  logo: string; connected: boolean; connecting: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={connecting !== false && !connected}
      className="flex items-center gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all disabled:opacity-60"
      style={{
        background: connected ? bgColor : "white",
        borderColor: connected ? color : borderColor,
        color: connected ? color : "#374151",
        boxShadow: connected ? `0 0 0 1px ${color}40` : undefined,
      }}
    >
      <div
        className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
        style={{ background: color }}
      >
        {logo}
      </div>
      <span>{label}</span>
      {connecting ? (
        <span className="text-xs text-muted-foreground">Connecting...</span>
      ) : connected ? (
        <span className="flex items-center gap-1 text-xs" style={{ color }}>
          <CheckCircle2 className="h-3.5 w-3.5" />
          Connected
        </span>
      ) : null}
    </button>
  );
}

function CRMField({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <p className="text-[10px] font-mono text-muted-foreground shrink-0 mt-0.5">{label}</p>
      <p className={`text-xs text-right leading-relaxed ${highlight ? "text-amber-600 font-medium" : "text-foreground"}`}>
        {value}
      </p>
    </div>
  );
}

function ProblemCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <div className="w-7 h-7 rounded-md bg-red-50 border border-red-100 flex items-center justify-center mb-3 text-red-500">{icon}</div>
        <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}

function SolvedCard({ icon, metric, label, body }: { icon: React.ReactNode; metric: string; label: string; body: string }) {
  return (
    <Card className="border-border shadow-none bg-muted/20">
      <CardContent className="p-4">
        <div className="w-7 h-7 rounded-md bg-foreground/5 flex items-center justify-center mb-3 text-foreground">{icon}</div>
        <p className="text-2xl font-bold text-foreground">{metric}</p>
        <p className="text-xs font-medium text-muted-foreground mb-2">{label}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}

function ValueCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center mb-3 text-muted-foreground">{icon}</div>
        <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}
