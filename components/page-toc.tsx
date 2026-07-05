"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
  indent?: boolean;
}

export function PageToc({ items, scrollContainerId }: { items: TocItem[]; scrollContainerId?: string }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const root = scrollContainerId ? document.getElementById(scrollContainerId) : null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        root,
        rootMargin: "-10% 0px -70% 0px",
        threshold: 0,
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, scrollContainerId]);

  function scrollTo(id: string) {
    const scrollRoot = scrollContainerId ? document.getElementById(scrollContainerId) : null;
    const el = document.getElementById(id);
    if (!el) return;
    if (scrollRoot) {
      const offset = el.offsetTop - scrollRoot.offsetTop - 16;
      scrollRoot.scrollTo({ top: offset, behavior: "smooth" });
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="w-44">
      <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-3">On This Page</p>
      <div className="relative border-l border-border">
        <ul className="space-y-0">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "block w-full text-left py-1.5 text-xs leading-snug transition-colors border-l-2 -ml-px",
                    item.indent ? "pl-5" : "pl-3",
                    isActive
                      ? "border-[var(--mm-teal)] text-foreground font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
                  )}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
