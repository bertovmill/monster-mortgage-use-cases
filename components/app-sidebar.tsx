"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Home,
  Mail,
  FileText,
  ChevronDown,
  Settings,
  Users,
  Zap,
  Calendar,
  Star,
  TrendingUp,
  Database,
  BookOpen,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
];

const TOOL_ITEMS = [
  { href: "/outreach", icon: Mail, label: "Outreach", isNew: false },
  { href: "/file-assistant", icon: FileText, label: "File Assistant", isNew: false },
  { href: "/hubspot", icon: Database, label: "HubSpot Data", isNew: false },
  { href: "/salesforce", icon: Database, label: "Salesforce Data", isNew: false },
  { href: "/velocity", icon: Database, label: "Velocity CRM", isNew: false },
  { href: "#", icon: Users, label: "Client Database", muted: true },
  { href: "#", icon: TrendingUp, label: "Pipeline", muted: true },
];

const PINNED_ITEMS = [
  { href: "#", icon: Star, label: "Top Realtors", muted: true },
  { href: "#", icon: Zap, label: "Quick Drafts", muted: true },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 flex flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-sidebar-border">
        <Image
          src="/monster-mortgage-logo.png"
          alt="Monster Mortgage"
          width={160}
          height={40}
          className="object-contain"
          priority
        />
      </div>

      {/* Workspace switcher */}
      <div className="px-3 mt-3 mb-1">
        <button className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[var(--mm-teal)] shrink-0" />
            <span className="truncate">Broker Tools</span>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-sidebar-foreground/50 shrink-0" />
        </button>
      </div>

      <ScrollArea className="flex-1 px-3">
        {/* Main nav */}
        <nav className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.href} {...item} active={pathname === item.href} />
          ))}
        </nav>

        <div className="my-3 h-px bg-sidebar-border" />

        <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2">
          Challenges
        </p>
        <nav className="space-y-0.5">
          {TOOL_ITEMS.map((item) => (
            <NavItem key={item.label} {...item} active={pathname === item.href} />
          ))}
        </nav>

        <div className="my-3 h-px bg-sidebar-border" />

        <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2">
          Context
        </p>
        <nav className="space-y-0.5 mb-3">
          <NavItem href="/knowledge" icon={BookOpen} label="Research & Context" active={pathname === "/knowledge"} />
        </nav>

        <div className="my-3 h-px bg-sidebar-border" />

        <p className="text-[10px] font-semibold text-sidebar-foreground/40 uppercase tracking-wider px-3 mb-2">
          Pinned
        </p>
        <nav className="space-y-0.5">
          {PINNED_ITEMS.map((item) => (
            <NavItem key={item.label} {...item} active={false} />
          ))}
        </nav>
      </ScrollArea>

      {/* Bottom */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <div className="flex items-start gap-2 px-3 py-2">
          <Calendar className="h-4 w-4 text-[var(--mm-teal)] mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold text-sidebar-foreground">Meeting with Kristian</p>
            <p className="text-xs text-sidebar-foreground/50">July 7 · 12:30 PM in-office</p>
          </div>
        </div>
        <NavItem href="#" icon={Settings} label="Settings" active={false} />
      </div>
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  isNew,
  muted,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  isNew?: boolean;
  muted?: boolean;
}) {
  const cls = `w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
    active
      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium border-l-2 border-[var(--mm-teal)]"
      : muted
      ? "text-sidebar-foreground/30 cursor-default"
      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
  }`;

  const inner = (
    <>
      <div className="flex items-center gap-2.5">
        <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[var(--mm-teal)]" : ""}`} />
        <span>{label}</span>
      </div>
      {isNew && (
        <Badge className="bg-[var(--mm-teal)] text-white text-[10px] px-1.5 py-0 rounded-full font-medium">
          New
        </Badge>
      )}
    </>
  );

  if (muted || href === "#") {
    return <div className={cls}>{inner}</div>;
  }

  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
