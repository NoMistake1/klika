"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TabItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly content: ReactNode;
}

/**
 * WAI-ARIA tabs with manual activation.
 *
 * Arrow keys move focus and selection within the list, Home/End jump to the
 * ends, and only the active tab stays in the page tab order (roving tabindex)
 * — so Tab moves out of the tablist to the panel rather than through every tab.
 */
export function Tabs({
  items,
  className,
  label,
}: {
  items: readonly TabItem[];
  className?: string;
  /** Accessible name for the tablist, e.g. "Doprava". */
  label: string;
}) {
  const baseId = useId();
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  if (items.length === 0) return null;

  function focusTab(id: string) {
    setActiveId(id);
    tabRefs.current.get(id)?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const index = items.findIndex((item) => item.id === activeId);
    if (index === -1) return;

    let nextIndex: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % items.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + items.length) % items.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = items.length - 1;
        break;
      default:
        return;
    }

    const next = items[nextIndex];
    if (next) {
      event.preventDefault();
      focusTab(next.id);
    }
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className="scrollbar-none -mx-1 flex snap-x gap-1 overflow-x-auto px-1 pb-1"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) tabRefs.current.set(item.id, node);
                else tabRefs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-${item.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${baseId}-${item.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "inline-flex min-h-11 shrink-0 snap-start items-center gap-2 rounded-[2px] border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "border-navy bg-navy text-warm-white"
                  : "border-current/20 hover:border-current/50",
              )}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          role="tabpanel"
          id={`${baseId}-${item.id}-panel`}
          aria-labelledby={`${baseId}-${item.id}-tab`}
          hidden={item.id !== activeId}
          tabIndex={0}
          className="mt-8 focus-visible:outline-2"
        >
          {item.content}
        </div>
      ))}
    </div>
  );
}
