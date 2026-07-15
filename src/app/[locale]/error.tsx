"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { defaultLocale } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

/**
 * Route-level error boundary.
 *
 * Error boundaries must be Client Components and receive no route params, so
 * this falls back to the default locale. It shows a recovery action rather
 * than a stack trace.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const dict = getDictionary(defaultLocale);

  useEffect(() => {
    // Surfaced in the browser console and Vercel runtime logs. No third-party
    // error reporting service is wired up.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70svh] items-center bg-cream py-32 text-navy">
      <Container>
        <div className="max-w-xl">
          <h1 className="text-title font-semibold text-balance">{dict.error.title}</h1>
          <p className="mt-5 leading-relaxed opacity-75">{dict.error.text}</p>
          <div className="mt-8">
            <Button onClick={reset} size="lg">
              <RotateCw aria-hidden="true" className="size-4" />
              {dict.error.retry}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
