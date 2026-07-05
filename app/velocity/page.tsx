"use client";

import { useState } from "react";
import { ALL_CONTACTS, type CRMContact, type ContactType } from "@/lib/mock-crm-data";
import {
  Search,
  ChevronDown,
  X,
  RefreshCw,
  Sparkles,
  Copy,
  Check,
  Plus,
  MoreHorizontal,
  Phone,
  Mail,
  FileText,
  Home,
  Users,
  BarChart2,
  Calendar,
  Settings,
  Bell,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";

const TYPE_COLORS: Record<ContactType, { bg: string; text: string; border: string }> = {
  Realtor:             { bg: "#EDE9FE", text: "#5B21B6", border: "#C4B5FD" },
  "Financial Planner": { bg: "#DBEAFE", text: "#1D4ED8", border: "#93C5FD" },
  "Key Client":        { bg: "#FEF3C7", text: "#92400E", border: "#FCD34D" },
  "Past Client":       { bg: "#F3F4F6", text: "#374151", border: "#D1D5DB" },
};

const STATUS_COLORS = {
  hot:  { bg: "#DCFCE7", text: "#166534", border: "#86EFAC" },
  warm: { bg: "#FEF9C3", text: "#854D0E", border: "#FDE047" },
  cold: { bg: "#DBEAFE", text: "#1E40AF", border: "#93C5FD" },
};

const NAV_ITEMS = [
  { label: "Home",      icon: Home },
  { label: "Mortgages", icon: FileText },
  { label: "Contacts",  icon: Users },
  { label: "Partners",  icon: Users },
  { label: "Lenders",   icon: BarChart2 },
  { label: "Reports",   icon: BarChart2 },
  { label: "Tasks",     icon: Calendar },
  { label: "Services",  icon: Settings },
];

const SIDEBAR_LINKS = [
  "Notes",
  "Active Activities",
  "Closed Activities",
  "Cadences",
  "Attachments",
  "Contact Roles",
  "Stage History",
  "Emails",
  "Products",
  "Action Plans",
];

export default function VelocityPage() {
  const [selected, setSelected] = useState<CRMContact | null>(null);
  const [filter, setFilter] = useState<ContactType | "All">("All");
  const [view, setView] = useState<"list" | "detail">("list");
  const [activeTab, setActiveTab] = useState<"overview" | "ai">("overview");
  const [message, setMessage] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = ALL_CONTACTS.filter((c) => {
    const matchType = filter === "All" || c.contactType === filter;
    const matchSearch = search === "" ||
      `${c.firstName} ${c.lastName} ${c.company}`.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  function openContact(c: CRMContact) {
    setSelected(c);
    setView("detail");
    setActiveTab("overview");
    setMessage("");
  }

  function backToList() {
    setView("list");
    setSelected(null);
    setMessage("");
  }

  async function generate() {
    if (!selected || streaming) return;
    setMessage("");
    setStreaming(true);

    const c = selected;
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
      setMessage("Error generating message.");
      setStreaming(false);
      return;
    }

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

  async function copyMsg() {
    if (!message) return;
    await navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif" }}
    >
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── TOP NAV BAR ── */}
        <div
          className="flex items-center gap-0 px-3 h-11 shrink-0"
          style={{ background: "#3D4147", borderBottom: "1px solid #2A2D32" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 mr-5">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white font-bold text-xs"
              style={{ background: "#006BB6" }}
            >
              V
            </div>
            <span className="text-white font-semibold text-sm">Velocity</span>
            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: "#2A2D32", color: "#9CA3AF" }}>
              CRM
            </span>
          </div>

          {/* Nav items */}
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-1.5 px-3 h-11 text-xs transition-colors"
              style={{
                color: item.label === "Contacts" ? "#FFFFFF" : "#B0B5BE",
                borderBottom: item.label === "Contacts" ? "2px solid #006BB6" : "2px solid transparent",
                background: item.label === "Contacts" ? "rgba(0,107,182,0.15)" : "transparent",
              }}
            >
              {item.label}
            </button>
          ))}

          <div className="flex-1" />

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3" style={{ color: "#9CA3AF" }} />
              <input
                placeholder="Search Velocity..."
                className="pl-7 pr-3 py-1 rounded text-xs w-44"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#F9FAFB",
                  outline: "none",
                }}
              />
            </div>
            <button className="p-1.5 rounded hover:bg-white/10">
              <Bell className="h-3.5 w-3.5" style={{ color: "#9CA3AF" }} />
            </button>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-semibold ml-1"
              style={{ background: "#006BB6" }}
            >
              B
            </div>
          </div>
        </div>

        {/* ── SUB NAV ── */}
        <div
          className="flex items-center px-4 h-9 gap-1 shrink-0"
          style={{ background: "#EDEDED", borderBottom: "1px solid #CCCCCC" }}
        >
          <span className="text-xs font-semibold" style={{ color: "#444444" }}>Contacts</span>
          <ChevronRight className="h-3 w-3 mx-1" style={{ color: "#888888" }} />
          <button
            className="text-xs px-2 py-0.5 rounded"
            style={{
              color: filter === "All" ? "#FFFFFF" : "#444444",
              background: filter === "All" ? "#006BB6" : "transparent",
            }}
            onClick={() => setFilter("All")}
          >
            All
          </button>
          {(["Realtor", "Financial Planner", "Key Client", "Past Client"] as ContactType[]).map((t) => (
            <button
              key={t}
              className="text-xs px-2 py-0.5 rounded transition-colors"
              style={{
                color: filter === t ? "#FFFFFF" : "#444444",
                background: filter === t ? "#006BB6" : "transparent",
              }}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
          <div className="flex-1" />
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3" style={{ color: "#888888" }} />
            <input
              placeholder="Search contacts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-6 pr-2 py-0.5 rounded text-xs w-40"
              style={{
                background: "#FFFFFF",
                border: "1px solid #BBBBBB",
                color: "#333333",
                outline: "none",
              }}
            />
          </div>
        </div>

        {/* ── CONTENT AREA ── */}
        <div className="flex flex-1 overflow-hidden">

          {view === "list" ? (
            /* ── LIST VIEW ── */
            <div className="flex-1 overflow-auto" style={{ background: "#F7F7F7" }}>
              {/* Toolbar */}
              <div
                className="flex items-center justify-between px-5 py-3 border-b"
                style={{ background: "#FFFFFF", borderColor: "#E0E0E0" }}
              >
                <div className="flex items-center gap-2">
                  <p className="text-sm font-semibold" style={{ color: "#222222" }}>
                    {filtered.length} Contact{filtered.length !== 1 ? "s" : ""}
                  </p>
                  <span
                    className="text-xs px-2 py-0.5 rounded font-mono"
                    style={{ background: "#F0F0F0", border: "1px solid #DDDDDD", color: "#666666" }}
                  >
                    Velocity DB v4.2
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-medium text-white"
                    style={{ background: "#006BB6" }}
                  >
                    <Plus className="h-3 w-3" />
                    New Contact
                  </button>
                  <button
                    className="p-1.5 rounded border"
                    style={{ borderColor: "#CCCCCC", background: "#FFFFFF" }}
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" style={{ color: "#666666" }} />
                  </button>
                </div>
              </div>

              {/* Table */}
              <div style={{ background: "#FFFFFF", margin: "12px", borderRadius: "4px", border: "1px solid #DDDDDD" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: "#F0F0F0", borderBottom: "1px solid #DDDDDD" }}>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "#555555" }}>
                        <div className="flex items-center gap-1">Contact Name <ChevronDown className="h-3 w-3" /></div>
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "#555555" }}>Contact Type</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold hidden md:table-cell" style={{ color: "#555555" }}>Organization</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "#555555" }}>
                        <div className="flex items-center gap-1">Last Activity <ChevronDown className="h-3 w-3" /></div>
                      </th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold hidden lg:table-cell" style={{ color: "#555555" }}>Deals Referred</th>
                      <th className="text-left px-4 py-2.5 text-xs font-semibold" style={{ color: "#555555" }}>Relationship</th>
                      <th className="px-4 py-2.5" />
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => {
                      const sc = STATUS_COLORS[c.status];
                      const tc = TYPE_COLORS[c.contactType];
                      const overdue = c.daysSinceContact > 90;
                      return (
                        <tr
                          key={c.id}
                          className="border-b cursor-pointer transition-colors"
                          style={{ borderColor: "#EEEEEE", background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "#EAF3FB")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = i % 2 === 0 ? "#FFFFFF" : "#FAFAFA")}
                          onClick={() => openContact(c)}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2.5">
                              <div
                                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0"
                                style={{ background: "#006BB6" }}
                              >
                                {c.firstName[0]}{c.lastName[0]}
                              </div>
                              <div>
                                <p className="text-xs font-semibold" style={{ color: "#006BB6" }}>
                                  {c.firstName} {c.lastName}
                                </p>
                                <p className="text-[10px]" style={{ color: "#888888" }}>{c.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="text-[10px] font-medium px-2 py-0.5 rounded border"
                              style={{ background: tc.bg, color: tc.text, borderColor: tc.border }}
                            >
                              {c.contactType}
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell">
                            <p className="text-xs" style={{ color: "#444444" }}>{c.company}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-medium" style={{ color: overdue ? "#DC2626" : "#555555" }}>
                              {c.daysSinceContact}d ago
                            </span>
                          </td>
                          <td className="px-4 py-3 hidden lg:table-cell">
                            <span className="text-xs" style={{ color: "#555555" }}>{c.dealsReferred} deals</span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className="text-[10px] font-medium px-2 py-0.5 rounded border capitalize"
                              style={{ background: sc.bg, color: sc.text, borderColor: sc.border }}
                            >
                              {c.status}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              className="text-xs px-2 py-0.5 rounded font-medium"
                              style={{ background: "#006BB6", color: "#FFFFFF" }}
                              onClick={(e) => { e.stopPropagation(); openContact(c); }}
                            >
                              Open
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-5 py-3" style={{ color: "#888888" }}>
                <span className="text-xs">Showing {filtered.length} of {ALL_CONTACTS.length} contacts</span>
                <span className="text-xs">Velocity CRM v4.2 · Monster Mortgage</span>
              </div>
            </div>

          ) : selected ? (
            /* ── DETAIL VIEW ── */
            <div className="flex flex-1 overflow-hidden">

              {/* Left sidebar */}
              <div
                className="w-44 shrink-0 border-r overflow-y-auto"
                style={{ background: "#F5F5F5", borderColor: "#DDDDDD" }}
              >
                {/* Back button */}
                <button
                  onClick={backToList}
                  className="flex items-center gap-1.5 px-3 py-2.5 w-full text-xs font-medium border-b transition-colors hover:bg-white"
                  style={{ color: "#006BB6", borderColor: "#DDDDDD" }}
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back to Contacts
                </button>

                {/* Sidebar links */}
                <div className="py-1">
                  {SIDEBAR_LINKS.map((link) => (
                    <button
                      key={link}
                      className="w-full text-left px-4 py-2 text-xs transition-colors hover:bg-white"
                      style={{ color: link === "Contact Roles" ? "#006BB6" : "#555555" }}
                    >
                      {link}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main detail content */}
              <div className="flex-1 overflow-auto" style={{ background: "#FFFFFF" }}>

                {/* Contact header bar */}
                <div
                  className="flex items-center justify-between px-5 py-3 border-b"
                  style={{ background: "#F0F0F0", borderColor: "#DDDDDD" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold"
                      style={{ background: "#006BB6" }}
                    >
                      {selected.firstName[0]}{selected.lastName[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold" style={{ color: "#222222" }}>
                          {selected.firstName} {selected.lastName}
                        </p>
                        <span
                          className="text-[10px] font-medium px-2 py-0.5 rounded border"
                          style={{
                            background: STATUS_COLORS[selected.status].bg,
                            color: STATUS_COLORS[selected.status].text,
                            borderColor: STATUS_COLORS[selected.status].border,
                          }}
                        >
                          {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "#666666" }}>
                        {selected.title} · {selected.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-white"
                      style={{ background: "#006BB6" }}
                    >
                      <Mail className="h-3 w-3" />
                      Send Email
                    </button>
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium border"
                      style={{ borderColor: "#CCCCCC", color: "#444444", background: "#FFFFFF" }}
                    >
                      <Phone className="h-3 w-3" />
                      Call
                    </button>
                    <button
                      className="p-1.5 rounded border"
                      style={{ borderColor: "#CCCCCC", background: "#FFFFFF" }}
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" style={{ color: "#666666" }} />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div
                  className="flex items-end border-b px-5 gap-0"
                  style={{ borderColor: "#DDDDDD", background: "#FAFAFA" }}
                >
                  {(["overview", "ai"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className="px-4 py-2.5 text-xs font-medium transition-colors"
                      style={{
                        color: activeTab === tab ? "#006BB6" : "#666666",
                        borderBottom: activeTab === tab ? "2px solid #006BB6" : "2px solid transparent",
                        background: activeTab === tab ? "#FFFFFF" : "transparent",
                      }}
                    >
                      {tab === "overview" ? "Overview" : "AI Outreach"}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="p-5">

                  {activeTab === "overview" && (
                    <div className="space-y-5">

                      {/* Contact Info */}
                      <section>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#888888" }}>
                          Contact Information
                        </h3>
                        <div
                          className="rounded border overflow-hidden"
                          style={{ borderColor: "#DDDDDD" }}
                        >
                          {[
                            { label: "Full Name",       value: `${selected.firstName} ${selected.lastName}` },
                            { label: "Email",           value: selected.email },
                            { label: "Phone",           value: selected.phone },
                            { label: "Organization",    value: selected.company },
                            { label: "Title",           value: selected.title },
                            { label: "Contact Type",    value: selected.contactType },
                          ].map(({ label, value }, i) => (
                            <div
                              key={label}
                              className="flex border-b last:border-b-0"
                              style={{ borderColor: "#EEEEEE", background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}
                            >
                              <div className="w-36 shrink-0 px-3 py-2 text-xs font-medium" style={{ color: "#666666" }}>{label}</div>
                              <div className="px-3 py-2 text-xs" style={{ color: "#333333" }}>{value}</div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Referral Activity */}
                      <section>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#888888" }}>
                          Referral Activity
                        </h3>
                        <div
                          className="rounded border overflow-hidden"
                          style={{ borderColor: "#DDDDDD" }}
                        >
                          {[
                            { label: "Deals Referred",   value: `${selected.dealsReferred} deals` },
                            { label: "Last Activity",    value: `${selected.daysSinceContact} days ago`, urgent: selected.daysSinceContact > 90 },
                            { label: "Last Deal",        value: selected.lastDeal },
                            { label: "Relationship",     value: selected.status.charAt(0).toUpperCase() + selected.status.slice(1) },
                          ].map(({ label, value, urgent }, i) => (
                            <div
                              key={label}
                              className="flex border-b last:border-b-0"
                              style={{ borderColor: "#EEEEEE", background: i % 2 === 0 ? "#FFFFFF" : "#FAFAFA" }}
                            >
                              <div className="w-36 shrink-0 px-3 py-2 text-xs font-medium" style={{ color: "#666666" }}>{label}</div>
                              <div className="px-3 py-2 text-xs" style={{ color: urgent ? "#DC2626" : "#333333", fontWeight: urgent ? 600 : 400 }}>{value}</div>
                            </div>
                          ))}
                        </div>
                      </section>

                      {/* Broker Notes */}
                      <section>
                        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#888888" }}>
                          Broker Notes
                        </h3>
                        <div
                          className="rounded border p-3 text-xs leading-relaxed"
                          style={{ borderColor: "#DDDDDD", background: "#FFFBF0", color: "#444444" }}
                        >
                          {selected.notes}
                        </div>
                      </section>

                    </div>
                  )}

                  {activeTab === "ai" && (
                    <div className="space-y-4">
                      {/* Context summary */}
                      <div
                        className="rounded border p-3"
                        style={{ borderColor: "#DDDDDD", background: "#F5F5F5" }}
                      >
                        <p className="text-xs font-semibold mb-1" style={{ color: "#444444" }}>Contact context loaded from Velocity</p>
                        <p className="text-xs" style={{ color: "#666666" }}>
                          {selected.contactType} · {selected.company} · Last activity: {selected.daysSinceContact} days ago · {selected.dealsReferred} deals referred
                        </p>
                        {selected.daysSinceContact > 90 && (
                          <div
                            className="mt-2 rounded px-2 py-1 text-xs font-medium"
                            style={{ background: "#FEE2E2", color: "#B91C1C", border: "1px solid #FCA5A5" }}
                          >
                            Overdue — {selected.daysSinceContact} days since last contact. At risk of going cold.
                          </div>
                        )}
                      </div>

                      {/* Generate button */}
                      <button
                        onClick={generate}
                        disabled={streaming}
                        className="flex items-center gap-2 px-4 py-2 rounded text-sm font-medium text-white disabled:opacity-60"
                        style={{ background: "#006BB6" }}
                      >
                        <Sparkles className="h-4 w-4" />
                        {streaming ? "Generating..." : message ? "Regenerate" : "Generate AI Outreach"}
                      </button>

                      {/* Output */}
                      {(message || streaming) && (
                        <div
                          className="rounded border"
                          style={{ borderColor: "#DDDDDD" }}
                        >
                          <div
                            className="flex items-center justify-between px-3 py-2 border-b"
                            style={{ borderColor: "#DDDDDD", background: "#F5F5F5" }}
                          >
                            <span className="text-xs font-semibold" style={{ color: "#444444" }}>
                              {streaming ? "Writing..." : "Draft message"}
                            </span>
                            {!streaming && message && (
                              <div className="flex gap-1">
                                <button
                                  onClick={generate}
                                  className="flex items-center gap-1 px-2 py-1 rounded text-xs border"
                                  style={{ borderColor: "#CCCCCC", color: "#555555", background: "#FFFFFF" }}
                                >
                                  <RefreshCw className="h-2.5 w-2.5" /> Regenerate
                                </button>
                                <button
                                  onClick={copyMsg}
                                  className="flex items-center gap-1 px-2 py-1 rounded text-xs border transition-all"
                                  style={{
                                    borderColor: copied ? "#86EFAC" : "#CCCCCC",
                                    color: copied ? "#166534" : "#555555",
                                    background: copied ? "#DCFCE7" : "#FFFFFF",
                                  }}
                                >
                                  {copied ? <Check className="h-2.5 w-2.5" /> : <Copy className="h-2.5 w-2.5" />}
                                  {copied ? "Copied!" : "Copy"}
                                </button>
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <p className="text-xs leading-relaxed whitespace-pre-wrap" style={{ color: "#333333" }}>
                              {message}
                              {streaming && <span className="inline-block w-1.5 h-3 ml-0.5 animate-pulse" style={{ background: "#006BB6" }} />}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
