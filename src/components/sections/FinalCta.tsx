import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { bookStayHref, bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Cup, Waves } from "@/components/illustrations";

/**
 * Closing split CTA. The two halves carry the two brand worlds — light blue for
 * the hotel, navy and cream for the restaurant — meeting edge to edge with no
 * gutter, so the page ends on the same duality it opened with.
 */
export function FinalCta({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section aria-label={dict.finalCta.eyebrow} className="grid md:grid-cols-2">
      {/* Hotel */}
      <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-blue-light p-8 text-navy sm:p-12 lg:p-16">
        <Waves
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-2 left-0 h-12 w-full text-navy opacity-10"
        />
        <div className="relative">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
            {dict.finalCta.eyebrow}
          </p>
          <h2 className="font-display text-4xl leading-none sm:text-5xl">
            {dict.finalCta.hotelTitle}
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed opacity-75">{dict.finalCta.hotelText}</p>
        </div>
        <Button
          href={localePath(locale, bookStayHref)}
          variant="conversion"
          size="lg"
          className="relative self-start"
        >
          {dict.actions.bookStay}
          <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
      </div>

      {/* Restaurant */}
      <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-navy p-8 text-cream sm:p-12 lg:p-16">
        <Cup
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -bottom-6 h-32 w-32 text-blue opacity-10"
        />
        <div className="relative">
          <p className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-blue/70">
            {dict.finalCta.eyebrow}
          </p>
          <h2 className="font-display text-4xl leading-none text-blue sm:text-5xl">
            {dict.finalCta.restaurantTitle}
          </h2>
          <p className="mt-4 max-w-sm leading-relaxed opacity-80">
            {dict.finalCta.restaurantText}
          </p>
        </div>
        <Button
          href={localePath(locale, bookTableHref)}
          variant="conversion"
          size="lg"
          className="relative self-start"
        >
          {dict.actions.bookTable}
          <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
      </div>
    </section>
  );
}
