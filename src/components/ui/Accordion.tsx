"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  readonly id: string;
  readonly title: string;
  readonly meta?: string;
  readonly content: ReactNode;
}

/**
 * Disclosure list built on real buttons with aria-expanded / aria-controls.
 *
 * Panels stay mounted and are hidden with `hidden`, so the content is present
 * for in-page search and never animated out of reach.
 */
export function Accordion({
  items,
  className,
  defaultOpenId,
  allowMultiple = true,
}: {
  items: readonly AccordionItem[];
  className?: string;
  defaultOpenId?: string;
  allowMultiple?: boolean;
}) {
  const baseId = useId();
  const [openIds, setOpenIds] = useState<readonly string[]>(
    defaultOpenId ? [defaultOpenId] : [],
  );

  function toggle(id: string) {
    setOpenIds((current) => {
      const isOpen = current.includes(id);
      if (isOpen) return current.filter((openId) => openId !== id);
      return allowMultiple ? [...current, id] : [id];
    });
  }

  return (
    <div className={cn("divide-y divide-current/10 border-y border-current/10", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div key={item.id}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-sand-ink"
              >
                <span className="flex flex-col gap-0.5">
                  <span className="font-medium">{item.title}</span>
                  {item.meta ? (
                    <span className="text-sm opacity-60">{item.meta}</span>
                  ) : null}
                </span>
                <Plus
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 opacity-50 transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-6"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
