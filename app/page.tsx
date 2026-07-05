"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  FileText,
  Calendar,
  MessageSquare,
  ClipboardList,
  TrendingUp,
  ChevronRight,
  Users,
  Check,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* ── MEETING HEADER ── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-muted-foreground font-medium">Live demo prepared for July 7 meeting</span>
        </div>
        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-3">
          AI for Monster Mortgage brokers
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          Two use cases, ready to demo live today. Each one addresses a specific challenge
          Kristian outlined — built on your real contact data and file workflows.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 border border-border rounded-full px-3 py-1.5">
            <Calendar className="h-3.5 w-3.5" />
            July 7, 2026 · 12:30 PM · Kristian Harris + Nitish Mukhi
          </div>
        </div>
      </div>

      {/* ── TWO USE CASES ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <Link href="/outreach">
          <Card className="border-border shadow-sm hover:shadow-md hover:border-zinc-300 transition-all cursor-pointer overflow-hidden h-full">
            <div className="h-48 bg-muted/40 overflow-hidden flex items-center justify-center border-b border-border">
              <OutreachVisual />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Use Case 1</span>
                <Badge variant="outline" className="text-[10px] text-green-700 bg-green-50 border-green-200">Ready</Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
                Database &amp; Referral Communication
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Maintain constant, personalized contact with Realtors, Financial Planners, and key clients — at scale, from your existing CRM.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                View demo <ArrowRight className="h-3 w-3 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/file-assistant">
          <Card className="border-border shadow-sm hover:shadow-md hover:border-zinc-300 transition-all cursor-pointer overflow-hidden h-full">
            <div className="h-48 bg-muted/40 overflow-hidden flex items-center justify-center border-b border-border">
              <FileVisual />
            </div>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Use Case 2</span>
                <Badge variant="outline" className="text-[10px] text-green-700 bg-green-50 border-green-200">Ready</Badge>
              </div>
              <h3 className="text-sm font-semibold text-foreground leading-snug mb-1.5">
                File Workflow &amp; Process Improvement
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                Instantly surface what is outstanding, what goes out today, and generate ready-to-send client updates from your broker notes.
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                View demo <ArrowRight className="h-3 w-3 ml-0.5" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* ── QUICK-ACCESS CHIPS ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        <ToolChip href="/outreach" icon={<MessageSquare className="h-3.5 w-3.5" />} label="Draft outreach" />
        <ToolChip href="/outreach" icon={<Users className="h-3.5 w-3.5" />} label="View contacts" />
        <ToolChip href="/file-assistant" icon={<ClipboardList className="h-3.5 w-3.5" />} label="Analyze a file" />
        <ToolChip href="/hubspot" icon={<span className="text-[10px] font-bold" style={{ color: "#FF7A59" }}>HS</span>} label="HubSpot view" />
        <ToolChip href="/salesforce" icon={<span className="text-[10px] font-bold" style={{ color: "#0070D2" }}>SF</span>} label="Salesforce view" />
        <ToolChip href="#" icon={<TrendingUp className="h-3.5 w-3.5" />} label="More tools coming" showArrow />
      </div>

      <Separator className="mb-10" />

      {/* ── WHAT KRISTIAN ASKED FOR ── */}
      <section className="mb-10">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">What Kristian asked for</p>
        <div className="space-y-3">
          {[
            {
              label: "Database and Referral Communication",
              quote: "A way to maintain constant communication with my existing database and centers of influence, including Realtors, Financial Planners, and key clients.",
              href: "/outreach",
              status: "Fully built",
            },
            {
              label: "Process Improvement",
              quote: "Enhancing our workflow for existing files to improve individual performance while seeking more referrals.",
              href: "/file-assistant",
              status: "Fully built",
            },
          ].map((item) => (
            <Link key={item.label} href={item.href}>
              <Card className="border-border shadow-none hover:border-zinc-300 hover:shadow-sm transition-all cursor-pointer">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-green-100 border border-green-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-xs font-semibold text-foreground">{item.label}</p>
                      <Badge variant="outline" className="text-[10px] text-green-700 bg-green-50 border-green-200">{item.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed italic">&ldquo;{item.quote}&rdquo;</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PATH FORWARD ── */}
      <section>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">The Path Forward</p>
        <h2 className="text-lg font-semibold text-foreground mb-2">How we build this together</h2>
        <p className="text-sm text-muted-foreground mb-5 max-w-lg">
          Three phases, starting this week. Each delivers real value before the next begins.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <PhaseCard
            phase="Phase 1" timeline="Week 1–2" title="Connect &amp; Configure"
            items={["Map your CRM and workflow tools", "Set up Claude with your data", "Define top 5 outreach templates", "Test with a small contact segment"]}
          />
          <PhaseCard
            phase="Phase 2" timeline="Week 3–4" title="Automate &amp; Launch"
            items={["Deploy outreach sequences for all contact types", "Integrate file assistant into active deals", "Broker training (under 1 hour)", "Monitor and refine outputs"]}
            highlight
          />
          <PhaseCard
            phase="Phase 3" timeline="Month 2+" title="Scale &amp; Optimize"
            items={["Full database automation", "Referral trigger system live", "Performance dashboard", "Expand to new use cases"]}
          />
        </div>
      </section>

    </div>
  );
}

function ToolChip({ href, icon, label, showArrow }: { href: string; icon: React.ReactNode; label: string; showArrow?: boolean }) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-sm text-muted-foreground hover:text-foreground hover:border-zinc-300 hover:shadow-sm transition-all">
      {icon}
      <span className="text-xs">{label}</span>
      {showArrow && <ChevronRight className="h-3.5 w-3.5" />}
    </Link>
  );
}

function OutreachVisual() {
  return (
    <div className="w-full h-full p-5 flex flex-col gap-2.5 justify-center">
      {[
        { initials: "SC", name: "Sarah Chen · Realtor · 94d", preview: "Hey Sarah, wanted to reach out about the King St deal..." },
        { initials: "MW", name: "Marcus Webb · Fin. Planner · 166d", preview: "Hi Marcus, a few of your clients have been asking about HELOCs..." },
        { initials: "JP", name: "James & Lisa · Key Client · 65d", preview: "Hi James, just a note on your renewal coming up in 8 months..." },
      ].map((item) => (
        <div key={item.initials} className="flex items-center gap-3 bg-background rounded-lg px-3 py-2.5 border border-border shadow-sm">
          <div className="w-7 h-7 rounded-full bg-zinc-800 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
            {item.initials}
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-foreground truncate">{item.name}</p>
            <p className="text-[11px] text-muted-foreground truncate">{item.preview}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function FileVisual() {
  return (
    <div className="w-full h-full p-5 flex flex-col gap-2.5 justify-center">
      <div className="bg-background rounded-lg px-3 py-2.5 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] font-semibold text-foreground">Carlos &amp; Emily Rodriguez</p>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border text-red-600 bg-red-50 border-red-200">URGENT</span>
        </div>
        <div className="space-y-1.5">
          {[
            { label: "Employment letter from accountant", status: "URGENT", color: "text-red-600 bg-red-50 border-red-200" },
            { label: "Lawyer contact from client", status: "SOON", color: "text-amber-600 bg-amber-50 border-amber-200" },
            { label: "Home inspection report", status: "DONE", color: "text-green-600 bg-green-50 border-green-200" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-2">
              <span className="text-[10px] text-muted-foreground truncate">{item.label}</span>
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border shrink-0 ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-background rounded-lg px-3 py-2.5 border border-border shadow-sm">
        <p className="text-[10px] font-semibold text-muted-foreground mb-1">DRAFT: CLIENT MESSAGE</p>
        <p className="text-[10px] text-muted-foreground italic leading-relaxed">&ldquo;Hi Emily, quick update on your file — everything is on track for July 18. The one thing we still need is Carlos&apos;s employment letter from Marco...&rdquo;</p>
      </div>
    </div>
  );
}

function PhaseCard({ phase, timeline, title, items, highlight }: { phase: string; timeline: string; title: string; items: string[]; highlight?: boolean }) {
  return (
    <Card className={`border-border shadow-sm ${highlight ? "ring-1 ring-foreground/10 bg-muted/20" : ""}`}>
      <CardContent className="p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-semibold text-muted-foreground">{phase}</span>
          <span className="text-xs text-muted-foreground">{timeline}</span>
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-3">{title}</h3>
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
              <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
