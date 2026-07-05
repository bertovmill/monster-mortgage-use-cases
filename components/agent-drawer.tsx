"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/react-ai-sdk";
import { useDrawer } from "./agent-drawer-context";
import { Sparkles } from "lucide-react";

function AgentChat() {
  const runtime = useChatRuntime({
    transport: new AssistantChatTransport({ api: "/api/chat" }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="flex flex-col h-full">
        <Thread />
      </div>
    </AssistantRuntimeProvider>
  );
}

export function AgentDrawer() {
  const { isOpen, close } = useDrawer();

  return (
    <Sheet open={isOpen} onOpenChange={open => { if (!open) close(); }}>
      <SheetContent
        side="right"
        className="w-[420px] sm:w-[480px] p-0 flex flex-col bg-background border-l border-border"
      >
        <SheetHeader className="px-4 py-3 border-b border-border shrink-0">
          <SheetTitle className="flex items-center gap-2 text-sm font-semibold">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            Monster Mortgage AI
          </SheetTitle>
          <p className="text-xs text-muted-foreground mt-0.5">
            Ask about contacts, draft outreach, or review active files
          </p>
        </SheetHeader>
        <div className="flex-1 overflow-hidden">
          <AgentChat />
        </div>
      </SheetContent>
    </Sheet>
  );
}
