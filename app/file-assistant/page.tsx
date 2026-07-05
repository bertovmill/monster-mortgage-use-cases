"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  Quote,
  Check,
  X,
  AlertCircle,
  Clock,
  FileText,
  Zap,
  Users,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  Gift,
  MessageSquare,
  Target,
  Repeat,
  ClipboardList,
  Copy,
  RefreshCw,
} from "lucide-react";
import { MOCK_FILES, type MortgageFile } from "@/lib/mock-file-data";
import { PageToc } from "@/components/page-toc";

const TOC_ITEMS = [
  { id: "brief",      label: "The Brief" },
  { id: "problem",    label: "The Problem" },
  { id: "definition", label: "Definition of Done" },
  { id: "files",      label: "Active Files" },
  { id: "demo",       label: "Live Demo",        indent: true },
  { id: "scale",      label: "How It Scales" },
];

const STAGE_COLORS: Record<string, string> = {
  "Pre-Approval":   "bg-purple-100 text-purple-700 border-purple-200",
  "Conditions":     "bg-amber-100 text-amber-700 border-amber-200",
  "Clear to Close": "bg-blue-100 text-blue-700 border-blue-200",
  "Closing":        "bg-orange-100 text-orange-700 border-orange-200",
  "Funded":         "bg-green-100 text-green-700 border-green-200",
};

const PRIORITY_STYLES = {
  urgent: { bar: "bg-red-500",   badge: "bg-red-50 text-red-600 border-red-200",   label: "Urgent" },
  active: { bar: "bg-amber-400", badge: "bg-amber-50 text-amber-700 border-amber-200", label: "Active" },
  smooth: { bar: "bg-green-500", badge: "bg-green-50 text-green-700 border-green-200", label: "Done" },
};

function parseAnalysis(raw: string) {
  const sections: { heading: string; content: string }[] = [];
  const lines = raw.split("\n");
  let current: { heading: string; lines: string[] } | null = null;

  for (const line of lines) {
    const headings = ["STATUS SUMMARY", "OUTSTANDING ITEMS", "IMMEDIATE ACTIONS", "DRAFT: CLIENT MESSAGE"];
    const matched = headings.find((h) => line.trim().startsWith(h));
    if (matched) {
      if (current) sections.push({ heading: current.heading, content: current.lines.join("\n").trim() });
      current = { heading: matched, lines: [] };
    } else if (current && line.trim() !== "---") {
      current.lines.push(line);
    }
  }
  if (current) sections.push({ heading: current.heading, content: current.lines.join("\n").trim() });
  return sections;
}

export default function FileAssistantPage() {
  const [selectedFile, setSelectedFile] = useState<MortgageFile | null>(null);
  const [customNotes, setCustomNotes] = useState("");
  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [useCustom, setUseCustom] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function selectFile(f: MortgageFile) {
    setSelectedFile(f);
    setUseCustom(false);
    setResult("");
  }

  async function generate() {
    const notes = useCustom ? customNotes : selectedFile?.notes;
    if (!notes || busy || streaming) return;
    setBusy(true);
    setResult("");

    const res = await fetch("/api/file-assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileNotes: notes }),
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

  const activeFile = selectedFile;
  const sections = result ? parseAnalysis(result) : [];

  return (
    <div className="flex h-full overflow-hidden">

      {/* ── MAIN CONTENT (scrolls) ── */}
      <div className="flex-1 overflow-y-auto" id="file-assistant-scroll">
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
                    &ldquo;Process Improvement: Enhancing our workflow for existing files
                    to improve individual performance while seeking more referrals.&rdquo;
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── PROBLEM BREAKDOWN ── */}
        <div id="problem" className="mb-8">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">The Problem</p>
          <h2 className="text-xl font-semibold text-foreground mb-1">What is actually slowing files down</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
            Every broker has 10–30 active files at once. The work is in the gaps: tracking what is missing,
            what needs to go out today, and who needs an update before they start to worry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <ProblemCard icon={<ClipboardList className="h-4 w-4" />} title="No single source of truth" body="Outstanding items live in emails, texts, sticky notes, and broker notes. Nothing is prioritized. Things fall through." />
            <ProblemCard icon={<MessageSquare className="h-4 w-4" />} title="Client communication is reactive" body="Clients call when they are anxious. By then, the relationship is already strained. A proactive update would have prevented the call." />
            <ProblemCard icon={<Gift className="h-4 w-4" />} title="Referral moments get missed" body="A happy client at funding is the most likely referral source. But brokers are already onto the next file and never follow up at the right moment." />
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
                    "Broker manually re-reads every file each morning to find what is missing",
                    "Client messages drafted from scratch under time pressure",
                    "Outstanding items spread across email chains and texts",
                    "Funded files get no follow-up and referral moments are lost",
                    "Brokers with more files are slower, not faster",
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
                    "Claude reads broker notes and surfaces every outstanding item with a priority",
                    "Draft client update ready in seconds, broker just reviews and sends",
                    "Immediate action list ordered by urgency, every morning",
                    "Funded files automatically flagged for referral follow-up and thank-you",
                    "The more files a broker has, the more value Claude adds",
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
            Not just &ldquo;faster.&rdquo; These are the specific outcomes that mark this challenge complete.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <SolvedCard icon={<Clock className="h-4 w-4" />} metric="&lt; 2 min" label="per file review" body="A broker pastes their notes and has a full status summary, priority list, and client draft in under two minutes." />
            <SolvedCard icon={<Repeat className="h-4 w-4" />} metric="Zero" label="missed follow-ups" body="Every funded file triggers a referral ask and thank-you flow. No happy client goes uncontacted after closing." />
            <SolvedCard icon={<Target className="h-4 w-4" />} metric="+referrals" label="from existing files" body="The files that already closed become the source of the next deal. Claude converts satisfied clients into active referrers." />
          </div>
        </div>

        <Separator className="mb-8" />

        {/* ── FILE LIST ── */}
        <div id="files" className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Step 1</p>
              <h2 className="text-xl font-semibold text-foreground">Select an active file</h2>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-mono">4 files loaded</Badge>
              <button
                onClick={() => { setSelectedFile(null); setUseCustom(true); setResult(""); }}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors border ${
                  useCustom ? "bg-foreground text-background border-foreground" : "border-border text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                + Paste my own notes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MOCK_FILES.map((f) => {
              const p = PRIORITY_STYLES[f.priority];
              const isSelected = selectedFile?.id === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => selectFile(f)}
                  className={`text-left rounded-xl border transition-all overflow-hidden ${
                    isSelected ? "ring-1 ring-foreground border-foreground shadow-sm" : "border-border hover:border-zinc-300 hover:shadow-sm"
                  }`}
                >
                  <div className={`h-1 ${p.bar}`} />
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-sm font-semibold text-foreground leading-snug">{f.clients}</p>
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${p.badge}`}>{p.label}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{f.property}, {f.city}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${STAGE_COLORS[f.stage]}`}>{f.stage}</span>
                      <span className="text-[10px] text-muted-foreground">
                        {f.daysToClose > 0 ? `Closes in ${f.daysToClose}d` : "Funded"}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{f.purchasePrice}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-2">via {f.referralSource}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── DEMO ── */}
        {(activeFile || useCustom) && (
          <>
            <Separator className="mb-8" />
            <div id="demo" className="mb-2">
              <Badge variant="outline" className="text-xs font-mono mb-3">LIVE DEMO</Badge>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {activeFile ? `Analyzing: ${activeFile.clients}` : "Paste your file notes"}
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-xl">
                {activeFile
                  ? `Claude is reading the full broker notes for this file — outstanding items, client status, referral source — and will return a priority list and a ready-to-send client message.`
                  : "Paste your broker notes below. Claude will read everything and return a status summary, action list, and client draft."}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Input panel */}
              <Card className="border-border shadow-sm">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {activeFile ? "File Notes (broker input)" : "Your Notes"}
                  </p>

                  {activeFile && (
                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${STAGE_COLORS[activeFile.stage]}`}>{activeFile.stage}</span>
                      <span className="text-[10px] text-muted-foreground">{activeFile.closingDate}</span>
                      <span className="text-[10px] text-muted-foreground">{activeFile.lender}</span>
                    </div>
                  )}

                  <div className="bg-muted/40 rounded-md border border-border p-3 mb-4 max-h-72 overflow-y-auto">
                    {useCustom ? (
                      <textarea
                        value={customNotes}
                        onChange={(e) => setCustomNotes(e.target.value)}
                        placeholder="Paste your broker notes here. Include anything: what is outstanding, client status, lender updates, closing date, referral source..."
                        className="w-full text-xs text-foreground leading-relaxed bg-transparent resize-none outline-none min-h-48"
                      />
                    ) : (
                      <p className="text-xs text-foreground leading-relaxed whitespace-pre-wrap">{activeFile?.notes}</p>
                    )}
                  </div>

                  <Button
                    onClick={generate}
                    disabled={busy || streaming || (useCustom && !customNotes.trim())}
                    className="w-full h-9 text-sm"
                  >
                    {busy ? "Reading file..." : streaming ? "Analyzing..." : "Analyze file"}
                    {!busy && !streaming && <ArrowRight className="ml-2 h-3.5 w-3.5" />}
                  </Button>
                </CardContent>
              </Card>

              {/* Output panel */}
              <Card className="border-border shadow-sm">
                <CardContent className="p-5 min-h-64">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Claude Analysis
                    </p>
                    {result && !streaming && (
                      <div className="flex gap-1.5">
                        <button
                          onClick={generate}
                          className="flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-colors hover:bg-muted/40 border-border text-muted-foreground"
                        >
                          <RefreshCw className="h-3 w-3" /> Rerun
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
                          {copied ? "Copied!" : "Copy all"}
                        </button>
                      </div>
                    )}
                  </div>

                  {!result && !streaming && (
                    <div className="flex flex-col items-center justify-center h-48 gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground text-center">
                        Hit analyze to get the status summary, action list, and client draft
                      </p>
                    </div>
                  )}

                  {result && sections.length > 0 ? (
                    <div className="space-y-4">
                      {sections.map((s) => (
                        <AnalysisSection key={s.heading} heading={s.heading} content={s.content} streaming={streaming && s === sections[sections.length - 1]} />
                      ))}
                    </div>
                  ) : result ? (
                    <p className={`text-xs text-foreground leading-relaxed whitespace-pre-wrap ${streaming ? "stream-cursor" : ""}`}>
                      {result}
                    </p>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {!activeFile && !useCustom && (
          <>
            <Separator className="mb-8" />
            <Card className="border-border shadow-none bg-muted/20 mb-8">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Select a file above to run the live demo, or paste your own broker notes.</p>
              </CardContent>
            </Card>
          </>
        )}

        <Separator className="my-8" />

        {/* ── HOW IT SCALES ── */}
        <div id="scale">
          <h2 className="text-base font-semibold text-foreground mb-4">How this scales across your brokerage</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ValueCard icon={<FileText className="h-4 w-4" />} title="Any format" body="Broker notes, email threads, CRM records, text messages. Claude reads anything and finds what matters." />
            <ValueCard icon={<Zap className="h-4 w-4" />} title="Morning briefing" body="Every broker starts their day with a Claude-generated file digest: what is urgent, what goes out today, who needs a call." />
            <ValueCard icon={<TrendingUp className="h-4 w-4" />} title="Referral trigger" body="Funded files are automatically flagged. Claude drafts the thank-you, the referral ask, and the follow-up schedule in one shot." />
          </div>
        </div>

        {/* ── WHAT A REFERRAL TRIGGER LOOKS LIKE ── */}
        <div className="mt-8">
          <Card className="border-border shadow-none bg-muted/20">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm font-semibold text-foreground">The referral loop this creates</p>
              </div>
              <div className="flex items-center gap-0 flex-wrap">
                {[
                  "File closes",
                  "Claude drafts thank-you",
                  "Broker sends in 30 seconds",
                  "Client feels valued",
                  "Refers a friend",
                  "New file opens",
                ].map((step, i, arr) => (
                  <div key={step} className="flex items-center">
                    <span className="text-xs text-foreground px-2.5 py-1.5 rounded-md bg-background border border-border">
                      {step}
                    </span>
                    {i < arr.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1 shrink-0" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

      </div>

      </div>{/* end inner padding */}

      {/* ── TOC (fixed, never scrolls) ── */}
      <aside className="w-52 shrink-0 border-l border-border px-5 py-8 overflow-y-auto">
        <PageToc items={TOC_ITEMS} />
      </aside>

    </div>
  );
}

/* ── Section renderer ── */

const SECTION_ICONS: Record<string, React.ReactNode> = {
  "STATUS SUMMARY":       <CheckCircle2 className="h-3.5 w-3.5" />,
  "OUTSTANDING ITEMS":    <AlertCircle className="h-3.5 w-3.5" />,
  "IMMEDIATE ACTIONS":    <ClipboardList className="h-3.5 w-3.5" />,
  "DRAFT: CLIENT MESSAGE":<MessageSquare className="h-3.5 w-3.5" />,
};

const SECTION_COLORS: Record<string, string> = {
  "STATUS SUMMARY":        "text-blue-600 bg-blue-50 border-blue-200",
  "OUTSTANDING ITEMS":     "text-amber-700 bg-amber-50 border-amber-200",
  "IMMEDIATE ACTIONS":     "text-foreground bg-muted/40 border-border",
  "DRAFT: CLIENT MESSAGE": "text-green-700 bg-green-50 border-green-200",
};

function AnalysisSection({ heading, content, streaming }: { heading: string; content: string; streaming: boolean }) {
  const color = SECTION_COLORS[heading] ?? "text-muted-foreground bg-muted/40 border-border";
  const icon = SECTION_ICONS[heading];

  return (
    <div>
      <div className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md border w-fit mb-1.5 ${color}`}>
        {icon}
        {heading}
      </div>
      <p className={`text-xs text-foreground leading-relaxed whitespace-pre-wrap ${streaming ? "stream-cursor" : ""}`}>
        {content}
      </p>
    </div>
  );
}

/* ── Sub-components ── */

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
