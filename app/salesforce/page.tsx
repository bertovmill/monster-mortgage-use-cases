"use client";

import { useState } from "react";
import { ALL_CONTACTS, type CRMContact, type ContactType } from "@/lib/mock-crm-data";
import {
  Search,
  ChevronDown,
  Plus,
  MoreHorizontal,
  X,
  Mail,
  Phone,
  Clock,
  ExternalLink,
  SlidersHorizontal,
  RefreshCw,
  Grid3X3,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

const TYPE_COLORS: Record<ContactType, { bg: string; text: string }> = {
  Realtor:             { bg: "#F3E8FF", text: "#7E22CE" },
  "Financial Planner": { bg: "#DBEAFE", text: "#1D4ED8" },
  "Key Client":        { bg: "#FEF3C7", text: "#92400E" },
  "Past Client":       { bg: "#F3F4F6", text: "#374151" },
};

const STATUS_COLORS = {
  hot:  { bg: "#DCFCE7", text: "#166534" },
  warm: { bg: "#FEF9C3", text: "#854D0E" },
  cold: { bg: "#DBEAFE", text: "#1E40AF" },
};

export default function SalesforcePage() {
  const [selected, setSelected] = useState<CRMContact | null>(null);
  const [filter, setFilter] = useState<ContactType | "All">("All");
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const filtered = filter === "All"
    ? ALL_CONTACTS
    : ALL_CONTACTS.filter((c) => c.contactType === filter);

  function toggleCheck(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleAll() {
    if (checked.size === filtered.length) {
      setChecked(new Set());
    } else {
      setChecked(new Set(filtered.map((c) => c.id)));
    }
  }

  return (
    <div className="flex h-full overflow-hidden" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div className="flex-1 flex flex-col overflow-hidden bg-white">

        {/* Salesforce Lightning nav */}
        <div style={{ background: "#032D60" }}>
          <div className="flex items-center justify-between px-4 py-1" style={{ background: "#16325C", borderBottom: "1px solid #0A1E3D" }}>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M12 2C9.243 2 7 4.243 7 7c0 1.657.805 3.13 2.047 4.053C6.688 12.148 5 14.386 5 17h14c0-2.614-1.688-4.852-4.047-5.947C16.195 10.13 17 8.657 17 7c0-2.757-2.243-5-5-5z" fill="#00A1E0"/>
                </svg>
              </div>
              <span className="text-white font-bold text-sm tracking-tight">Salesforce</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3" style={{ color: "#8CA7C9" }} />
                <input placeholder="Search Salesforce" className="pl-7 pr-3 py-1 rounded text-xs w-48"
                  style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", color: "#E8F0FE" }} />
              </div>
              <Bell className="h-4 w-4 cursor-pointer" style={{ color: "#8CA7C9" }} />
              <HelpCircle className="h-4 w-4 cursor-pointer" style={{ color: "#8CA7C9" }} />
              <Settings className="h-4 w-4 cursor-pointer" style={{ color: "#8CA7C9" }} />
              <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white text-[10px] font-bold">B</div>
            </div>
          </div>
          <div className="flex items-center gap-1 px-4 h-11">
            <button className="p-1.5 rounded hover:bg-white/10 transition-colors mr-1">
              <Grid3X3 className="h-4 w-4 text-white" />
            </button>
            <div className="flex items-center gap-1 mr-3">
              <span className="text-white font-medium text-sm">Sales</span>
              <ChevronDown className="h-3.5 w-3.5 text-blue-300" />
            </div>
            {["Home", "Leads", "Contacts", "Accounts", "Opportunities", "Reports"].map((item) => (
              <button key={item} className="px-3 py-1.5 text-sm rounded transition-colors"
                style={{ color: item === "Contacts" ? "white" : "#93C5FD", background: item === "Contacts" ? "rgba(255,255,255,0.15)" : "transparent", borderBottom: item === "Contacts" ? "2px solid #00A1E0" : "2px solid transparent" }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 px-6 py-2 text-xs border-b" style={{ borderColor: "#E5E7EB", background: "#F3F6F9" }}>
          <span style={{ color: "#0070D2" }}>Contacts</span>
          <ChevronRight className="h-3 w-3" style={{ color: "#9CA3AF" }} />
          <span style={{ color: "#374151" }}>All Contacts</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-semibold" style={{ color: "#111827" }}>Contacts</h1>
              <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{ALL_CONTACTS.length} items · Monster Mortgage view</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs border transition-colors hover:bg-gray-50" style={{ borderColor: "#D1D5DB", color: "#374151" }}>
                <SlidersHorizontal className="h-3 w-3" /> Filters
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs border transition-colors hover:bg-gray-50" style={{ borderColor: "#D1D5DB", color: "#374151" }}>
                <RefreshCw className="h-3 w-3" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs text-white font-medium transition-opacity hover:opacity-90" style={{ background: "#0070D2" }}>
                <Plus className="h-3.5 w-3.5" /> New Contact
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border" style={{ borderColor: "#0070D2", color: "#0070D2", background: "#EBF5FE" }}>
              All Contacts <ChevronDown className="h-3 w-3" />
            </button>
            {(["All", "Realtor", "Financial Planner", "Key Client", "Past Client"] as const).map((t) => (
              <button key={t} onClick={() => setFilter(t)}
                className="px-2.5 py-1 rounded text-xs border transition-colors"
                style={{ background: filter === t ? "#EBF5FE" : "white", borderColor: filter === t ? "#0070D2" : "#D1D5DB", color: filter === t ? "#0070D2" : "#374151" }}>
                {t}
              </button>
            ))}
          </div>

          {/* AI hint banner */}
          <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded text-xs" style={{ background: "#EBF5FE", border: "1px solid #BAD7F8" }}>
            <Sparkles className="h-3.5 w-3.5 shrink-0" style={{ color: "#0070D2" }} />
            <span style={{ color: "#1D4ED8" }}>
              Click any contact to view their record and generate a personalized AI outreach message directly from Salesforce.
            </span>
          </div>

          {/* Table */}
          <div className="rounded border overflow-hidden" style={{ borderColor: "#DDDBDA" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "#F3F2F2", borderBottom: "1px solid #DDDBDA" }}>
                  <th className="w-10 px-3 py-2.5">
                    <input type="checkbox" checked={checked.size === filtered.length && filtered.length > 0}
                      onChange={toggleAll} className="rounded" style={{ accentColor: "#0070D2" }} />
                  </th>
                  {[
                    { label: "Name", field: "FirstName / LastName" },
                    { label: "Contact Type", field: "Contact_Type__c" },
                    { label: "Account Name", field: "Account.Name" },
                    { label: "Last Activity", field: "Days_Since_Contact__c" },
                    { label: "Last Deal", field: "Last_Deal__c" },
                    { label: "Deals Referred", field: "Deals_Referred__c" },
                    { label: "Status", field: "Relationship_Status__c" },
                  ].map((col) => (
                    <th key={col.label} className="text-left px-3 py-2.5">
                      <span className="text-xs font-semibold" style={{ color: "#3E3E3C" }}>{col.label}</span>
                      <span className="block font-mono text-[9px] mt-0.5" style={{ color: "#9CA3AF" }}>{col.field}</span>
                    </th>
                  ))}
                  <th className="w-10 px-3 py-2.5" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const isSelected = selected?.id === c.id;
                  const isChecked = checked.has(c.id);
                  const typeColor = TYPE_COLORS[c.contactType];
                  const statusColor = STATUS_COLORS[c.status];
                  return (
                    <tr key={c.id} onClick={() => setSelected(isSelected ? null : c)}
                      className="cursor-pointer transition-colors"
                      style={{ background: isSelected ? "#EBF5FE" : isChecked ? "#F0F7FF" : i % 2 === 0 ? "white" : "#FAFAF9", borderBottom: "1px solid #F3F2F2", borderLeft: isSelected ? "3px solid #0070D2" : "3px solid transparent" }}>
                      <td className="px-3 py-2.5" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" checked={isChecked} onChange={() => toggleCheck(c.id)} className="rounded" style={{ accentColor: "#0070D2" }} />
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xs font-medium" style={{ color: "#0070D2" }}>{c.firstName} {c.lastName}</p>
                        <p className="text-[11px]" style={{ color: "#6B7280" }}>{c.title}</p>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: typeColor.bg, color: typeColor.text }}>
                          {c.contactType}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xs truncate max-w-40" style={{ color: "#0070D2" }}>{c.company}</p>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xs font-medium" style={{ color: c.daysSinceContact > 150 ? "#DC2626" : c.daysSinceContact > 90 ? "#D97706" : "#059669" }}>
                          {c.daysSinceContact}d ago
                        </p>
                        <p className="text-[10px]" style={{ color: "#9CA3AF" }}>{c.lastActivityDate}</p>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xs truncate max-w-44" style={{ color: "#374151" }}>{c.lastDeal}</p>
                      </td>
                      <td className="px-3 py-2.5">
                        <p className="text-xs font-semibold" style={{ color: "#111827" }}>{c.dealsReferred}</p>
                      </td>
                      <td className="px-3 py-2.5">
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded capitalize" style={{ background: statusColor.bg, color: statusColor.text }}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-3 py-2.5">
                        <button onClick={(e) => e.stopPropagation()} className="p-1 rounded hover:bg-gray-100">
                          <MoreHorizontal className="h-3.5 w-3.5" style={{ color: "#9CA3AF" }} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex items-center justify-between px-4 py-2.5 border-t" style={{ borderColor: "#DDDBDA", background: "#F3F2F2" }}>
              <p className="text-xs" style={{ color: "#6B7280" }}>{filtered.length} of {ALL_CONTACTS.length} contacts</p>
              <div className="flex items-center gap-1">
                {["10", "25", "50"].map((n) => (
                  <button key={n} className="px-2 py-1 text-xs rounded border"
                    style={{ borderColor: n === "25" ? "#0070D2" : "#D1D5DB", color: n === "25" ? "#0070D2" : "#6B7280", background: n === "25" ? "#EBF5FE" : "white" }}>
                    {n}
                  </button>
                ))}
                <span className="text-xs ml-1" style={{ color: "#6B7280" }}>per page</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTACT DETAIL + AI PANEL ── */}
      {selected && (
        <SFContactPanel contact={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function SFContactPanel({ contact, onClose }: { contact: CRMContact; onClose: () => void }) {
  const [tab, setTab] = useState<"properties" | "ai">("properties");
  const [message, setMessage] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const accentColor = "#0070D2";

  async function generate() {
    if (busy || streaming) return;
    setBusy(true);
    setMessage("");

    const res = await fetch("/api/outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactType: contact.contactType,
        contactName: `${contact.firstName} ${contact.lastName}`,
        lastTouch: `${contact.daysSinceContact} days ago — ${contact.lastDeal}`,
        contactNotes: contact.notes,
        company: contact.company,
        title: contact.title,
        dealsReferred: contact.dealsReferred,
      }),
    });

    if (!res.ok || !res.body) {
      setMessage("Error: check that ANTHROPIC_API_KEY is set in .env.local");
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
      setMessage(text);
    }
    setStreaming(false);
  }

  async function copy() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const typeColor = TYPE_COLORS[contact.contactType];

  return (
    <div className="w-96 shrink-0 border-l flex flex-col overflow-hidden" style={{ borderColor: "#DDDBDA", background: "white" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "#DDDBDA", background: "#F3F2F2" }}>
        <p className="text-sm font-semibold" style={{ color: "#3E3E3C" }}>Contact Detail</p>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-200">
          <X className="h-4 w-4" style={{ color: "#706E6B" }} />
        </button>
      </div>

      <div className="p-4 border-b" style={{ borderColor: "#DDDBDA" }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: "#0070D2" }}>
            {contact.firstName[0]}{contact.lastName[0]}
          </div>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#0070D2" }}>{contact.firstName} {contact.lastName}</p>
            <p className="text-xs" style={{ color: "#706E6B" }}>{contact.title}</p>
            <p className="text-xs" style={{ color: "#706E6B" }}>{contact.company}</p>
          </div>
          <span className="ml-auto text-[10px] font-medium px-1.5 py-0.5 rounded" style={{ background: typeColor.bg, color: typeColor.text }}>
            {contact.contactType}
          </span>
        </div>
        <div className="flex gap-2">
          {[{ icon: <Mail className="h-3.5 w-3.5" />, label: "Email" }, { icon: <Phone className="h-3.5 w-3.5" />, label: "Call" }, { icon: <Clock className="h-3.5 w-3.5" />, label: "Log" }].map((a) => (
            <button key={a.label} className="flex-1 flex items-center justify-center gap-1 py-1.5 rounded border text-xs transition-colors hover:bg-blue-50"
              style={{ borderColor: "#0070D2", color: "#0070D2" }}>
              {a.icon} {a.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex border-b" style={{ borderColor: "#DDDBDA" }}>
        {[{ key: "properties", label: "Properties" }, { key: "ai", label: "AI Outreach" }].map((t) => (
          <button key={t.key} onClick={() => setTab(t.key as typeof tab)}
            className="flex-1 py-2.5 text-xs font-medium transition-colors"
            style={{ color: tab === t.key ? accentColor : "#706E6B", borderBottom: tab === t.key ? `2px solid ${accentColor}` : "2px solid transparent", background: "transparent" }}>
            {t.key === "ai" && <Sparkles className="h-3 w-3 inline mr-1" />}
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {tab === "properties" && (
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#706E6B" }}>Contact Information</p>
              <button className="text-xs" style={{ color: accentColor }}>Edit <ExternalLink className="h-3 w-3 inline" /></button>
            </div>
            <div className="space-y-3">
              <SFPropRow label="FirstName" value={contact.firstName} />
              <SFPropRow label="LastName" value={contact.lastName} />
              <SFPropRow label="Email" value={contact.email} link />
              <SFPropRow label="Phone" value={contact.phone} />
              <SFPropRow label="Account.Name" value={contact.company} link />
              <SFPropRow label="Title" value={contact.title} />
              <SFPropRow label="LeadSource" value="Referral" />
              <SFPropRow label="LastActivityDate" value={contact.lastActivityDate} />
              <div className="pt-2 pb-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#00A1E0" }}>Monster Mortgage Custom Fields</p>
              </div>
              <SFPropRow label="Contact_Type__c" value={contact.contactType} highlight />
              <SFPropRow label="Days_Since_Contact__c" value={`${contact.daysSinceContact} days`} highlight={contact.daysSinceContact > 90} />
              <SFPropRow label="Last_Deal__c" value={contact.lastDeal} />
              <SFPropRow label="Deals_Referred__c" value={String(contact.dealsReferred)} />
              <SFPropRow label="Relationship_Status__c" value={contact.status} highlight />
              <div>
                <p className="text-[10px] font-mono mb-1" style={{ color: "#9CA3AF" }}>Broker_Notes__c</p>
                <p className="text-xs leading-relaxed p-2 rounded" style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#374151" }}>
                  {contact.notes}
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "ai" && (
          <div className="p-4 flex flex-col gap-3">
            <div className="rounded-lg p-3 text-xs" style={{ background: "#F3F6F9", border: "1px solid #DDDBDA" }}>
              <p className="font-semibold mb-1.5" style={{ color: "#3E3E3C" }}>Reading from Salesforce</p>
              <div className="space-y-1">
                <CtxRow label="Contact type" value={contact.contactType} />
                <CtxRow label="Last touch" value={`${contact.daysSinceContact} days ago`} urgent={contact.daysSinceContact > 90} />
                <CtxRow label="Last deal" value={contact.lastDeal} />
                <CtxRow label="Deals referred" value={String(contact.dealsReferred)} />
                <CtxRow label="Status" value={contact.status} />
              </div>
            </div>

            {!message && (
              <button onClick={generate} disabled={busy || streaming}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-medium text-white transition-opacity disabled:opacity-60"
                style={{ background: accentColor }}>
                <Sparkles className="h-4 w-4" />
                {busy ? "Reading Salesforce data..." : "Generate AI outreach"}
                {!busy && <ArrowRight className="h-3.5 w-3.5" />}
              </button>
            )}

            {(message || streaming) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#706E6B" }}>Generated message</p>
                  <div className="flex gap-1.5">
                    {message && !streaming && (
                      <button onClick={generate}
                        className="text-[10px] px-2 py-1 rounded border transition-colors hover:bg-gray-50"
                        style={{ borderColor: "#DDDBDA", color: "#706E6B" }}>
                        Regenerate
                      </button>
                    )}
                    {message && (
                      <button onClick={copy}
                        className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-colors"
                        style={{ borderColor: copied ? "#86EFAC" : "#DDDBDA", color: copied ? "#166534" : "#3E3E3C", background: copied ? "#DCFCE7" : "white" }}>
                        {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="rounded p-3 text-xs leading-relaxed whitespace-pre-wrap"
                  style={{ background: "#F9FAFB", border: "1px solid #E5E7EB", color: "#374151" }}>
                  <span className={streaming ? "stream-cursor" : ""}>{message}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SFPropRow({ label, value, link, highlight }: { label: string; value: string; link?: boolean; highlight?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <p className="text-[10px] font-mono shrink-0 mt-0.5" style={{ color: "#9CA3AF" }}>{label}</p>
      <p className="text-xs text-right leading-relaxed"
        style={{ color: link ? "#0070D2" : highlight ? "#92400E" : "#3E3E3C", fontWeight: highlight ? 500 : 400 }}>
        {value}
      </p>
    </div>
  );
}

function CtxRow({ label, value, urgent }: { label: string; value: string; urgent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span style={{ color: "#9CA3AF" }}>{label}</span>
      <span className="font-medium" style={{ color: urgent ? "#DC2626" : "#374151" }}>{value}</span>
    </div>
  );
}
