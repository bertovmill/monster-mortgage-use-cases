"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, Bell, ChevronRight, Sparkles } from "lucide-react";
import { useDrawer } from "./agent-drawer-context";

const CRUMBS: Record<string, string> = {
  "/": "Dashboard",
  "/outreach": "Database & Referral Comms",
  "/file-assistant": "File Workflow Assistant",
  "/hubspot": "HubSpot Data",
  "/salesforce": "Salesforce Data",
  "/knowledge": "Research & Context",
  "/velocity": "Velocity CRM",
};

export function TopBar() {
  const pathname = usePathname();
  const label = CRUMBS[pathname] ?? "Page";
  const { toggle, isOpen } = useDrawer();

  return (
    <header className="h-14 shrink-0 border-b border-border flex items-center justify-between px-6 bg-background">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Home</span>
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        <span className="font-medium text-foreground">{label}</span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 flex-1 max-w-sm mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            className="pl-9 h-8 text-sm bg-muted/50 border-border focus-visible:ring-1"
            placeholder="Search everything..."
          />
        </div>
        <kbd className="hidden md:flex items-center gap-1 px-1.5 py-0.5 rounded border border-border text-[10px] text-muted-foreground font-mono">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant={isOpen ? "default" : "outline"}
          size="sm"
          className="h-8 gap-1.5 text-xs font-medium"
          onClick={toggle}
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI Agent
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <Bell className="h-4 w-4" />
        </Button>
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center text-white text-xs font-semibold">
          B
        </div>
      </div>
    </header>
  );
}
