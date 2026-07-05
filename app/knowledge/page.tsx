"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageToc } from "@/components/page-toc";
import {
  Building2,
  Users,
  TrendingUp,
  Award,
  Globe,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  Eye,
  Target,
  Pencil,
  FlaskConical,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  Zap,
  BookOpen,
  Heart,
  BarChart3,
  Bot,
  Brain,
  CalendarClock,
  Wrench,
  MessageCircle,
  Network,
  Link2,
  FileSearch,
  Mail,
  Bell,
  Repeat,
  ShieldCheck,
} from "lucide-react";

const TABS = [
  { id: "monster-mortgage", label: "Monster Mortgage", icon: <Building2 className="h-3.5 w-3.5" /> },
  { id: "design-thinking",  label: "Design Thinking",  icon: <Lightbulb className="h-3.5 w-3.5" /> },
  { id: "ai-agents",        label: "AI Agents",         icon: <Bot className="h-3.5 w-3.5" /> },
];

const MM_TOC = [
  { id: "mm-overview",     label: "Company Overview" },
  { id: "mm-model",        label: "Business Model" },
  { id: "mm-market",       label: "Market Context" },
  { id: "mm-challenges",   label: "Industry Challenges" },
  { id: "mm-opportunity",  label: "The AI Opportunity" },
];

const DT_TOC = [
  { id: "dt-what",         label: "What is Design Thinking" },
  { id: "dt-stages",       label: "The 5 Stages" },
  { id: "dt-applied",      label: "Applied to Monster Mortgage" },
  { id: "dt-why",          label: "Why It Works Here" },
];

const AGENT_TOC = [
  { id: "ag-what",         label: "What is an AI Agent" },
  { id: "ag-blocks",       label: "Building Blocks" },
  { id: "ag-frameworks",   label: "Agent Frameworks" },
  { id: "ag-demo",         label: "In Action: Use Cases" },
];

export default function KnowledgePage() {
  const [tab, setTab] = useState<"monster-mortgage" | "design-thinking" | "ai-agents">("monster-mortgage");
  const toc = tab === "monster-mortgage" ? MM_TOC : tab === "design-thinking" ? DT_TOC : AGENT_TOC;

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 flex gap-12 items-start">
      <div className="flex-1 min-w-0">

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Knowledge Base</p>
          </div>
          <h1 className="text-2xl font-semibold text-foreground mb-2">Research &amp; Context</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Background research to inform the conversation with Kristian. Two documents: who Monster Mortgage is, and the problem-solving framework behind this approach.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mb-8 p-1 rounded-lg bg-muted/50 w-fit border border-border">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all"
              style={{
                background: tab === t.id ? "white" : "transparent",
                color: tab === t.id ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                boxShadow: tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* ── MONSTER MORTGAGE TAB ── */}
        {tab === "monster-mortgage" && (
          <div className="space-y-10">

            {/* Overview */}
            <section id="mm-overview">
              <SectionLabel>Company Overview</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">Who is Monster Mortgage</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Monster Mortgage (MonsterMortgage.ca) is one of Canada's longest-running independent mortgage brokerages, founded in 1997 and headquartered in Toronto.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {[
                  { icon: <Award className="h-4 w-4" />, value: "25+ years", label: "in business" },
                  { icon: <Users className="h-4 w-4" />, value: "100,000+", label: "Canadians helped" },
                  { icon: <Globe className="h-4 w-4" />, value: "20+", label: "lender relationships" },
                  { icon: <Award className="h-4 w-4" />, value: "3x", label: "Brokerage of the Year" },
                ].map((s) => (
                  <Card key={s.label} className="border-border shadow-none">
                    <CardContent className="p-4 flex flex-col gap-1">
                      <div className="text-muted-foreground">{s.icon}</div>
                      <p className="text-xl font-bold text-foreground">{s.value}</p>
                      <p className="text-xs text-muted-foreground">{s.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <InfoCard title="What they do">
                  Monster Mortgage is an independent broker, not a lender. They act as an intermediary between Canadian homebuyers and a network of 20+ lenders including TD, Scotiabank, BMO, Home Capital Group, and Meridian. Their role is to find the best product and rate for each client's situation across multiple institutions simultaneously.
                </InfoCard>
                <InfoCard title="Who they serve">
                  Their client base spans first-time buyers, move-up buyers, investors, self-employed Canadians, newcomers, and people with non-traditional credit profiles. The non-bank access they offer is especially valuable for anyone a traditional bank would decline or underserve.
                </InfoCard>
              </div>
            </section>

            <Separator />

            {/* Business Model */}
            <section id="mm-model">
              <SectionLabel>Business Model</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">How the business actually works</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Understanding the economics helps explain why referrals and repeat business are so disproportionately valuable.
              </p>

              <div className="space-y-3 mb-5">
                <ModelRow
                  step="1"
                  title="A client needs a mortgage"
                  body="Typically triggered by a realtor referral, a past client referring someone, or direct inbound. The quality and warmth of the referral source heavily determines conversion."
                />
                <ModelRow
                  step="2"
                  title="The broker qualifies the file"
                  body="Broker reviews income, credit, property, down payment, and goal. The faster and more accurately this is done, the better the client experience and the more files a broker can handle."
                />
                <ModelRow
                  step="3"
                  title="The broker shops lenders"
                  body="With access to 20+ lenders, the broker can often find terms a single bank cannot match. This is the core value proposition over going directly to a bank."
                />
                <ModelRow
                  step="4"
                  title="The deal closes — and the referral cycle begins"
                  body="The broker earns a finder's fee from the lender. But the real long-term value is in the relationship. A satisfied client renews, refers, and buys again. A realtor who had a smooth transaction sends the next buyer."
                />
              </div>

              <Card className="border-border shadow-none bg-muted/20">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-foreground mb-3">The referral flywheel</p>
                  <div className="flex items-center gap-0 flex-wrap">
                    {["Great client experience", "Realtor stays loyal", "Client refers a friend", "New file opens", "Broker earns again"].map((step, i, arr) => (
                      <div key={step} className="flex items-center">
                        <span className="text-xs px-2.5 py-1.5 rounded-md bg-background border border-border text-foreground">{step}</span>
                        {i < arr.length - 1 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground mx-1 shrink-0" />}
                      </div>
                    ))}
                    <div className="flex items-center ml-1">
                      <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* Market Context */}
            <section id="mm-market">
              <SectionLabel>Market Context</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">The Canadian mortgage market in 2026</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                The environment Monster Mortgage is operating in right now — and why timing matters.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                <ContextCard
                  icon={<TrendingUp className="h-4 w-4" />}
                  title="The renewal wave"
                  body="Over 1.15 million Canadian mortgages are up for renewal in 2026 alone. This is the largest renewal cycle in decades — a massive opportunity for brokers who stay top of mind with past clients."
                  tag="Opportunity"
                  tagColor="text-green-700 bg-green-50 border-green-200"
                />
                <ContextCard
                  icon={<Users className="h-4 w-4" />}
                  title="Referrals are king"
                  body="71% of brokers say referrals from existing clients are their best source of new business — up from 64% the previous year. The shift away from purely realtor-dependent models is accelerating."
                  tag="Trend"
                  tagColor="text-blue-700 bg-blue-50 border-blue-200"
                />
                <ContextCard
                  icon={<AlertTriangle className="h-4 w-4" />}
                  title="Competition is intensifying"
                  body="The digital mortgage market is maturing. Brokers who rely on passive referrals are losing ground to those with active communication systems. Silent brokers lose to visible ones."
                  tag="Pressure"
                  tagColor="text-amber-700 bg-amber-50 border-amber-200"
                />
              </div>

              <InfoCard title="Why Monster Mortgage's position is strong — and fragile">
                25 years of brand equity and 100,000 client relationships is an enormous asset. But that asset decays silently. A client who bought in 2019 and hasn't heard from their broker since is not a loyal client — they are an unclaimed renewal. The brokerage with the best follow-up system, not the best historical reputation, wins that renewal.
              </InfoCard>
            </section>

            <Separator />

            {/* Industry Challenges */}
            <section id="mm-challenges">
              <SectionLabel>Industry Challenges</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">What is actually hard about this business</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                The specific friction points Kristian's two use cases are targeting — validated by industry research.
              </p>

              <div className="space-y-3">
                {[
                  {
                    title: "Communication decay after close",
                    body: "The moment a mortgage closes, communication typically stops. There is no business reason to reach out until renewal — so most brokers don't. But that silence is where referrals die. The client moves on. The realtor finds another broker who stays in touch.",
                    severity: "critical",
                  },
                  {
                    title: "Generic outreach gets ignored",
                    body: "A quarterly email newsletter sent to 200 contacts at once is better than silence, but not much. A Realtor who closed 4 deals with you needs a different message than a past client whose renewal is 8 months away. One-size messaging signals that the broker doesn't really know them.",
                    severity: "high",
                  },
                  {
                    title: "File management is reactive, not proactive",
                    body: "Most brokers spend their mornings triaging — reading emails, checking texts, trying to remember what is outstanding on which file. Without a system that surfaces what matters first, urgent items get missed and clients experience the silence as disorganisation.",
                    severity: "high",
                  },
                  {
                    title: "Referral moments are untracked",
                    body: "A funded file is the highest-leverage moment to ask for a referral. The client is happy, the deal is done, goodwill is at peak. But most brokers are already onto the next file. The thank-you goes unsent. The referral ask never happens. The opportunity passes.",
                    severity: "medium",
                  },
                  {
                    title: "Scale doesn't compound",
                    body: "A broker with 50 active files is not twice as effective as one with 25. They are often slower, more error-prone, and less communicative. Without systems that scale with volume, growth actually hurts service quality.",
                    severity: "medium",
                  },
                ].map((c) => (
                  <ChallengeCard key={c.title} {...c} />
                ))}
              </div>
            </section>

            <Separator />

            {/* AI Opportunity */}
            <section id="mm-opportunity">
              <SectionLabel>The AI Opportunity</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">Where Claude fits into Monster Mortgage</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Claude does not replace the broker. It removes the manual work that prevents brokers from doing what they are actually good at — building relationships and closing deals.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    before: "Broker has 200 contacts and touches 20 per month at best",
                    after: "Claude drafts personalised outreach for all 200, broker approves and sends in minutes",
                    icon: <Users className="h-4 w-4" />,
                  },
                  {
                    before: "Mornings lost to re-reading files to find what is missing",
                    after: "Claude reads broker notes and returns a prioritised action list in under 2 minutes",
                    icon: <BarChart3 className="h-4 w-4" />,
                  },
                  {
                    before: "Client messages drafted under pressure, often delayed or skipped",
                    after: "Claude drafts a ready-to-send update the moment broker pastes their notes",
                    icon: <Zap className="h-4 w-4" />,
                  },
                  {
                    before: "Funded files never followed up, referral moments missed",
                    after: "Funded file triggers a Claude-drafted thank-you and referral ask automatically",
                    icon: <Heart className="h-4 w-4" />,
                  },
                ].map((item, i) => (
                  <Card key={i} className="border-border shadow-none">
                    <CardContent className="p-4">
                      <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center mb-3 text-muted-foreground">{item.icon}</div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-red-50 text-red-600 border-red-200 shrink-0 mt-0.5">Before</span>
                          <p className="text-xs text-muted-foreground leading-relaxed">{item.before}</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded border bg-green-50 text-green-700 border-green-200 shrink-0 mt-0.5">After</span>
                          <p className="text-xs text-foreground leading-relaxed">{item.after}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

          </div>
        )}

        {/* ── DESIGN THINKING TAB ── */}
        {tab === "design-thinking" && (
          <div className="space-y-10">

            {/* What is it */}
            <section id="dt-what">
              <SectionLabel>Framework</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">What is Design Thinking</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Design Thinking is a problem-solving methodology developed at Stanford's d.school. It prioritises deeply understanding people before designing solutions — so you solve the right problem, not just the obvious one.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-5">
                <InfoCard title="The core idea">
                  Most business problems are solved by jumping straight to solutions. Design Thinking insists on spending more time understanding the problem first. The insight is that the most obvious solution is rarely the right one — the real problem is usually one level deeper than it first appears.
                </InfoCard>
                <InfoCard title="Why it matters for software">
                  Building the wrong thing quickly is worse than building the right thing slowly. Design Thinking prevents building features nobody uses, automations that don't match how people actually work, and tools that solve the stated problem while missing the real one.
                </InfoCard>
              </div>

              <Card className="border-border shadow-none bg-muted/20">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-foreground mb-2">The key distinction</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Design Thinking separates <span className="font-medium text-foreground">problem space</span> (what is actually wrong and why) from <span className="font-medium text-foreground">solution space</span> (what to build). Most teams live in solution space. Design Thinking forces time in problem space first — because a brilliant solution to the wrong problem helps nobody.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator />

            {/* The 5 stages */}
            <section id="dt-stages">
              <SectionLabel>Methodology</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">The 5 stages</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Originally developed by IDEO and Stanford's d.school. Widely used by Apple, IBM, Google, and most leading product teams. The process is non-linear — insights from later stages regularly send teams back to earlier ones.
              </p>

              <div className="space-y-3">
                {[
                  {
                    number: "01",
                    icon: <Heart className="h-4 w-4" />,
                    stage: "Empathise",
                    tagline: "Understand the person, not the problem statement",
                    description: "Observe and engage with the people you are designing for. Set aside assumptions. The goal is to understand their actual experience — what they do, feel, and why — not what they say they want. This is where most teams skip ahead, and where most failures originate.",
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                  },
                  {
                    number: "02",
                    icon: <Target className="h-4 w-4" />,
                    stage: "Define",
                    tagline: "Frame the right problem before solving any problem",
                    description: "Synthesise what you learned in the Empathise stage into a clear problem statement. The best problem statements are human-centred (focused on a person's need, not a business goal) and specific enough to guide ideation. A sharp definition is worth more than a hundred feature ideas.",
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                  },
                  {
                    number: "03",
                    icon: <Lightbulb className="h-4 w-4" />,
                    stage: "Ideate",
                    tagline: "Generate many solutions before committing to one",
                    description: "With the problem well-defined, generate as many solutions as possible without judgement. Quantity over quality at this stage — the goal is to break out of obvious first answers and find unexpected approaches. The best idea is rarely the first idea.",
                    color: "text-amber-700 bg-amber-50 border-amber-200",
                  },
                  {
                    number: "04",
                    icon: <Pencil className="h-4 w-4" />,
                    stage: "Prototype",
                    tagline: "Build to learn, not to ship",
                    description: "Create cheap, fast versions of the most promising ideas to test assumptions. A prototype can be a sketch, a slide deck, a clickable mockup, or a working demo. The purpose is to make an idea tangible enough to get real feedback — not to build the final product.",
                    color: "text-orange-700 bg-orange-50 border-orange-200",
                  },
                  {
                    number: "05",
                    icon: <FlaskConical className="h-4 w-4" />,
                    stage: "Test",
                    tagline: "Learn from real people, not assumptions",
                    description: "Put prototypes in front of real users. Observe what works and what doesn't. Treat failure as information. The goal is not to validate your solution — it is to learn what the solution actually needs to be. Good testing sends teams back to earlier stages with sharper understanding.",
                    color: "text-green-700 bg-green-50 border-green-200",
                  },
                ].map((s) => (
                  <Card key={s.stage} className="border-border shadow-none overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-1 shrink-0" style={{ background: s.color.includes("purple") ? "#7E22CE" : s.color.includes("blue") ? "#1D4ED8" : s.color.includes("amber") ? "#92400E" : s.color.includes("orange") ? "#C2410C" : "#166534" }} />
                        <div className="p-4 flex-1">
                          <div className="flex items-start gap-3">
                            <div className="flex flex-col items-center gap-1 shrink-0">
                              <span className={`text-[10px] font-bold font-mono px-1.5 py-0.5 rounded border ${s.color}`}>{s.number}</span>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-sm font-semibold text-foreground">{s.stage}</p>
                                <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${s.color}`}>
                                  {s.icon}
                                </span>
                              </div>
                              <p className="text-xs font-medium text-muted-foreground italic mb-2">{s.tagline}</p>
                              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Applied to Monster Mortgage */}
            <section id="dt-applied">
              <SectionLabel>Application</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">Design Thinking applied to Monster Mortgage</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                How the five stages map onto the work we are doing with Kristian right now — and what each stage produced.
              </p>

              <div className="space-y-3">
                {[
                  {
                    stage: "Empathise",
                    color: "bg-purple-50 text-purple-700 border-purple-200",
                    what: "We read Kristian's email, studied the broker workflow, and looked at the actual data structure of how contacts and files are managed.",
                    output: "Understanding that the real pain is not 'we need a CRM' — it's that relationships decay silently because personalised outreach is manually expensive, and files are managed reactively.",
                  },
                  {
                    stage: "Define",
                    color: "bg-blue-50 text-blue-700 border-blue-200",
                    what: "We translated Kristian's two requests into specific, solvable problem statements with measurable definitions of done.",
                    output: "\"A Monster Mortgage broker needs a way to maintain consistent, personalised contact with 200+ relationships without it costing 10 minutes per message\" and \"A broker needs to instantly know what is outstanding and what to communicate on every active file.\"",
                  },
                  {
                    stage: "Ideate",
                    color: "bg-amber-50 text-amber-700 border-amber-200",
                    what: "We considered multiple approaches: email templates, CRM automation, scheduled reminders, AI drafting assistants.",
                    output: "The right solution is AI-assisted drafting from live CRM data — not pre-written templates, which feel generic, and not full automation, which removes the broker's voice.",
                  },
                  {
                    stage: "Prototype",
                    color: "bg-orange-50 text-orange-700 border-orange-200",
                    what: "We built a working demo app — not slides, not a concept deck, but something Kristian can actually use in the meeting.",
                    output: "This app. Live CRM data, live AI generation, real streaming output. The demo is the prototype — and it can become the product.",
                  },
                  {
                    stage: "Test",
                    color: "bg-green-50 text-green-700 border-green-200",
                    what: "The July 7 meeting is the test. Kristian uses the demo with his own mental model of his contacts and files.",
                    output: "We will learn what resonates, what is missing, and what the next iteration needs to be. The goal is not to sell — it is to learn what to build next.",
                  },
                ].map((item) => (
                  <Card key={item.stage} className="border-border shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border shrink-0 mt-0.5 ${item.color}`}>{item.stage}</span>
                        <div>
                          <p className="text-xs font-medium text-foreground mb-1">{item.what}</p>
                          <div className="flex items-start gap-1.5">
                            <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0 mt-0.5" />
                            <p className="text-xs text-muted-foreground leading-relaxed italic">{item.output}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator />

            {/* Why it works */}
            <section id="dt-why">
              <SectionLabel>Why This Approach</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">Why Design Thinking works for this problem</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Most technology projects fail not because of bad engineering but because they solve the wrong problem. Design Thinking is insurance against that failure.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[
                  {
                    icon: <Eye className="h-4 w-4" />,
                    title: "It starts with the human, not the technology",
                    body: "AI is powerful but directionless without a human need to serve. Design Thinking ensures every feature we build traces back to something a broker actually experiences as a problem — not something that seemed like a good idea in a meeting.",
                  },
                  {
                    icon: <RefreshCw className="h-4 w-4" />,
                    title: "It embraces iteration",
                    body: "The first version of anything is a hypothesis. Building fast, testing with real users, and refining based on feedback is more effective than spending months designing in isolation. This app is already on version 3 of the approach, having refined based on Kristian's email.",
                  },
                  {
                    icon: <Target className="h-4 w-4" />,
                    title: "It keeps scope honest",
                    body: "Feature creep is the enemy of shipped products. When every decision is tested against \"does this serve the defined human need?\", the answer is usually 'no' for 80% of ideas. Design Thinking produces focused, purposeful tools, not complex ones.",
                  },
                  {
                    icon: <CheckCircle2 className="h-4 w-4" />,
                    title: "It matches how Berto works",
                    body: "Consulting through building — show the how, then iterate together — is the prototype stage in action. The July 7 meeting is not a sales pitch; it is a test session. Whatever Kristian says shapes the next iteration.",
                  },
                ].map((card) => (
                  <Card key={card.title} className="border-border shadow-none">
                    <CardContent className="p-4">
                      <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center mb-3 text-muted-foreground">{card.icon}</div>
                      <p className="text-sm font-semibold text-foreground mb-1.5">{card.title}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{card.body}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-border shadow-none bg-muted/20">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-foreground mb-2">The bottom line for this meeting</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This app is not a finished product — it is a working prototype built from Kristian's words. The right response to the demo is not "we'll take it." It is "here's what we'd change." That feedback is the most valuable output of July 7, because it moves us from Prototype into the Test stage and tells us exactly what to build in Phase 2.
                  </p>
                </CardContent>
              </Card>
            </section>

          </div>
        )}

        {/* ── AI AGENTS TAB ── */}
        {tab === "ai-agents" && (
          <div className="space-y-10">

            {/* What is an AI Agent */}
            <section id="ag-what">
              <SectionLabel>What is an AI Agent</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">Beyond a chatbot</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                A chatbot answers questions when you ask. An AI agent acts on your behalf — watching, deciding, and doing — without you having to be there. It has memory, it can use tools, it can schedule its own work, and it can coordinate other agents.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: "Chatbot", description: "You ask. It answers. Session ends. Forgets everything.", icon: <MessageCircle className="h-4 w-4" />, muted: true },
                  { label: "Automation", description: "A trigger fires a fixed sequence. No context, no judgement.", icon: <Repeat className="h-4 w-4" />, muted: true },
                  { label: "AI Agent", description: "Persistent. Remembers. Uses tools. Acts on a schedule. Coordinates others.", icon: <Bot className="h-4 w-4" />, muted: false },
                ].map((c) => (
                  <Card key={c.label} className={`border-border shadow-none ${!c.muted ? "ring-1 ring-foreground/10 bg-muted/20" : ""}`}>
                    <CardContent className="p-4">
                      <div className={`w-7 h-7 rounded-md flex items-center justify-center mb-3 ${c.muted ? "bg-muted text-muted-foreground" : "bg-foreground text-background"}`}>
                        {c.icon}
                      </div>
                      <p className={`text-sm font-semibold mb-1.5 ${c.muted ? "text-muted-foreground" : "text-foreground"}`}>{c.label}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{c.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Building Blocks */}
            <section id="ag-blocks">
              <SectionLabel>Building Blocks</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">What every agent is made of</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Whether you build on Eve, Claude, Hermes, or OpenClaw — every agent framework gives you the same core primitives. These are the pieces that make the magic work.
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: <Brain className="h-4 w-4" />,
                    name: "Memory",
                    tagline: "The agent remembers",
                    description: "Agents store facts, preferences, and history across sessions. A broker agent remembers that Ryan Patel prefers text over email, referred 2 deals, and was last contacted 141 days ago — without being told again.",
                    color: "text-purple-700 bg-purple-50 border-purple-200",
                    demo: "Used in: Outreach demo — every contact's history is loaded from CRM memory",
                    demoHref: "/outreach",
                  },
                  {
                    icon: <CalendarClock className="h-4 w-4" />,
                    name: "Scheduled Tasks",
                    tagline: "The agent acts on a cadence",
                    description: "Agents can schedule their own work. A renewal agent fires at 90, 60, and 30 days before a client's mortgage matures. An outreach agent queues a touchpoint the moment a contact goes 90 days without contact.",
                    color: "text-blue-700 bg-blue-50 border-blue-200",
                    demo: "Imagine: Ryan Patel's outreach drafts itself at day 90 — no prompt needed",
                    demoHref: "/outreach",
                  },
                  {
                    icon: <Wrench className="h-4 w-4" />,
                    name: "Tools",
                    tagline: "The agent can do things",
                    description: "Tools let agents read and write to the world: query a CRM, send an email, look up a rate, update a file status, fetch a document. The agent decides which tool to call based on the task.",
                    color: "text-amber-700 bg-amber-50 border-amber-200",
                    demo: "Used in: File Assistant — reads broker notes, surfaces missing items, drafts client message",
                    demoHref: "/file-assistant",
                  },
                  {
                    icon: <Link2 className="h-4 w-4" />,
                    name: "Connections",
                    tagline: "The agent plugs into your stack",
                    description: "Connections are pre-built integrations with external services — HubSpot, Salesforce, Velocity, Gmail, Slack. The agent authenticates once and can read or write to any connected system.",
                    color: "text-orange-700 bg-orange-50 border-orange-200",
                    demo: "Used in: HubSpot, Salesforce, Velocity simulations — live CRM data flows in",
                    demoHref: "/hubspot",
                  },
                  {
                    icon: <Mail className="h-4 w-4" />,
                    name: "Channels",
                    tagline: "The agent communicates where it needs to",
                    description: "Channels define how the agent sends and receives messages: email, SMS, Slack, a broker portal, or a webhook. The same agent can send a text to a Realtor and a formal email to a Financial Planner.",
                    color: "text-green-700 bg-green-50 border-green-200",
                    demo: "Next step: wire the generated outreach directly to email send via a channel",
                    demoHref: "/outreach",
                  },
                  {
                    icon: <Network className="h-4 w-4" />,
                    name: "Subagents",
                    tagline: "The agent delegates",
                    description: "A coordinator agent can spawn specialist subagents: an Outreach Agent handles Realtors, a File Agent tracks conditions, a Renewal Agent monitors expiry dates. Each is focused; the coordinator orchestrates.",
                    color: "text-sky-700 bg-sky-50 border-sky-200",
                    demo: "Vision: one Monster Mortgage agent managing Outreach, File, and Renewal specialists",
                    demoHref: "/",
                  },
                  {
                    icon: <FileSearch className="h-4 w-4" />,
                    name: "Instructions",
                    tagline: "The agent has a personality and rules",
                    description: "Instructions define who the agent is and how it behaves. For Monster Mortgage: always sound like the broker, never mention competing lenders, flag anything urgent in a file, never send a message that hasn't been reviewed.",
                    color: "text-rose-700 bg-rose-50 border-rose-200",
                    demo: "Used in: every AI prompt — the system prompt is the agent's instructions",
                    demoHref: "/outreach",
                  },
                  {
                    icon: <ShieldCheck className="h-4 w-4" />,
                    name: "Evals",
                    tagline: "The agent improves over time",
                    description: "Evals test the agent's outputs against known-good examples. Did the message land? Was the file summary accurate? Evals let you measure quality, catch regressions, and improve the agent without guessing.",
                    color: "text-zinc-700 bg-zinc-100 border-zinc-200",
                    demo: "Future phase: score outreach quality based on open rates and referral conversions",
                    demoHref: "/",
                  },
                ].map((block) => (
                  <Card key={block.name} className="border-border shadow-none overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex">
                        <div className="w-1 shrink-0" style={{ background: block.color.includes("purple") ? "#7E22CE" : block.color.includes("blue") ? "#1D4ED8" : block.color.includes("amber") ? "#B45309" : block.color.includes("orange") ? "#C2410C" : block.color.includes("green") ? "#166534" : block.color.includes("sky") ? "#0369A1" : block.color.includes("rose") ? "#BE123C" : "#3F3F46" }} />
                        <div className="p-4 flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`inline-flex items-center justify-center w-6 h-6 rounded border ${block.color}`}>{block.icon}</span>
                                <p className="text-sm font-semibold text-foreground">{block.name}</p>
                                <span className="text-xs text-muted-foreground italic">{block.tagline}</span>
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed mb-2">{block.description}</p>
                              <a href={block.demoHref} className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                                <Zap className="h-2.5 w-2.5" />
                                {block.demo}
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Agent Frameworks */}
            <section id="ag-frameworks">
              <SectionLabel>Agent Frameworks</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">What you can build on</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                The building blocks above exist in every major agent framework. The choice of framework is a technical decision — the outcome for Monster Mortgage is the same regardless of which one is used.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Eve",
                    maker: "Vercel",
                    tagline: "Filesystem-first durable agents",
                    description: "An agent is a directory: instructions, tools, connections, and schedules are all files. Eve compiles and runs it. Native Vercel deployment, built on the AI SDK.",
                    badge: "Used in this demo",
                    badgeColor: "bg-green-100 text-green-700 border-green-200",
                  },
                  {
                    name: "Claude Agents",
                    maker: "Anthropic",
                    tagline: "Native tool use, multi-agent orchestration",
                    description: "Claude's built-in agent capabilities: tool use, computer use, MCP integrations, and multi-agent pipelines. Best for complex reasoning and document-heavy workflows.",
                    badge: "Powers the AI in this app",
                    badgeColor: "bg-purple-100 text-purple-700 border-purple-200",
                  },
                  {
                    name: "Hermes",
                    maker: "Hermes Agent",
                    tagline: "Multi-channel communication agent",
                    description: "Specializes in structured communication flows — email, SMS, Slack — with built-in scheduling and contact management. Strong fit for outreach-heavy use cases.",
                    badge: "Strong fit for Use Case 1",
                    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
                  },
                  {
                    name: "OpenClaw",
                    maker: "Open source",
                    tagline: "Composable agent primitives",
                    description: "Open-source framework for composing agents from modular primitives. Highly customizable, self-hosted, integrates with any LLM provider.",
                    badge: "Flexible for custom builds",
                    badgeColor: "bg-zinc-100 text-zinc-700 border-zinc-200",
                  },
                ].map((fw) => (
                  <Card key={fw.name} className="border-border shadow-none">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground">{fw.name}</p>
                          <p className="text-xs text-muted-foreground">{fw.maker}</p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${fw.badgeColor}`}>{fw.badge}</span>
                      </div>
                      <p className="text-xs font-medium text-foreground mb-1.5 italic">{fw.tagline}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{fw.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* In Action */}
            <section id="ag-demo">
              <SectionLabel>In Action: Monster Mortgage Use Cases</SectionLabel>
              <h2 className="text-xl font-semibold text-foreground mb-1">The building blocks, demonstrated live</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-2xl">
                Every page in this app is a live demo of one or more agent building blocks working together. This is not theoretical.
              </p>
              <div className="space-y-3">
                {[
                  {
                    page: "Outreach",
                    href: "/outreach",
                    blocks: ["Memory", "Tools", "Connections"],
                    what: "Agent reads contact history from the CRM (Memory + Connections), then calls Claude to generate a personalized message (Tool). Next step: add Scheduled Tasks so it fires automatically at day 90.",
                    color: "bg-purple-50 border-purple-200",
                    labelColor: "bg-purple-100 text-purple-700 border-purple-200",
                  },
                  {
                    page: "File Assistant",
                    href: "/file-assistant",
                    blocks: ["Memory", "Tools", "Instructions"],
                    what: "Agent reads the broker's notes (Memory), applies a structured analysis prompt (Instructions), and outputs a prioritized action list plus a draft client message (Tools). Outstanding items never fall through.",
                    color: "bg-blue-50 border-blue-200",
                    labelColor: "bg-blue-100 text-blue-700 border-blue-200",
                  },
                  {
                    page: "HubSpot / Salesforce / Velocity",
                    href: "/hubspot",
                    blocks: ["Connections", "Memory"],
                    what: "Three separate CRM connections demonstrating that the agent is platform-agnostic. Whether Monster Mortgage is on Velocity, HubSpot, or Salesforce — the agent reads the same data and outputs the same quality.",
                    color: "bg-amber-50 border-amber-200",
                    labelColor: "bg-amber-100 text-amber-700 border-amber-200",
                  },
                  {
                    page: "Phase 2 (not yet built)",
                    href: "/",
                    blocks: ["Scheduled Tasks", "Channels", "Subagents", "Evals"],
                    what: "The full broker agent: outreach fires on a cadence without manual triggers, messages go directly to email or SMS, a subagent monitors renewals, and an eval layer scores output quality against open rates and referral conversions.",
                    color: "bg-zinc-50 border-zinc-200",
                    labelColor: "bg-zinc-100 text-zinc-600 border-zinc-200",
                  },
                ].map((row) => (
                  <Card key={row.page} className={`border shadow-none ${row.color}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <a href={row.href} className="text-sm font-semibold text-foreground hover:underline flex items-center gap-1">
                          {row.page}
                          <ChevronRight className="h-3 w-3" />
                        </a>
                        <div className="flex gap-1 flex-wrap justify-end">
                          {row.blocks.map((b) => (
                            <span key={b} className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${row.labelColor}`}>{b}</span>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{row.what}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-border shadow-none bg-muted/20 mt-5">
                <CardContent className="p-5">
                  <p className="text-xs font-semibold text-foreground mb-2">The conversation to have with Kristian</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    What you are seeing today is Memory, Tools, and Connections — the core of the agent, proven on your real contacts and files. Scheduled Tasks, Channels, and Subagents are the next layer. They take the manual step out entirely: the agent acts on its own, at the right time, through the right channel, without a broker having to remember to do it.
                  </p>
                </CardContent>
              </Card>
            </section>

          </div>
        )}

      </div>

      {/* ── TOC ── */}
      <PageToc items={toc} />
    </div>
  );
}

/* ── Sub-components ── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{children}</p>;
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <p className="text-xs font-semibold text-foreground mb-2">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{children as string}</p>
      </CardContent>
    </Card>
  );
}

function ModelRow({ step, title, body }: { step: string; title: string; body: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{step}</div>
      <div>
        <p className="text-sm font-medium text-foreground mb-0.5">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

function ContextCard({ icon, title, body, tag, tagColor }: { icon: React.ReactNode; title: string; body: string; tag: string; tagColor: string }) {
  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground">{icon}</div>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${tagColor}`}>{tag}</span>
        </div>
        <p className="text-sm font-semibold text-foreground mb-1.5">{title}</p>
        <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
      </CardContent>
    </Card>
  );
}

function ChallengeCard({ title, body, severity }: { title: string; body: string; severity: string }) {
  const colors = {
    critical: { dot: "bg-red-500", badge: "text-red-600 bg-red-50 border-red-200", label: "Critical" },
    high:     { dot: "bg-amber-500", badge: "text-amber-700 bg-amber-50 border-amber-200", label: "High" },
    medium:   { dot: "bg-yellow-400", badge: "text-yellow-700 bg-yellow-50 border-yellow-200", label: "Medium" },
  }[severity] ?? { dot: "bg-gray-400", badge: "text-gray-600 bg-gray-50 border-gray-200", label: severity };

  return (
    <Card className="border-border shadow-none">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`w-2 h-2 rounded-full ${colors.dot} shrink-0 mt-1.5`} />
          <div className="flex-1">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border shrink-0 ${colors.badge}`}>{colors.label}</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{body}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
