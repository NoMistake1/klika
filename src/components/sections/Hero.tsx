import type { Dictionary } from "@/content/dictionaries";
import { localePath, type Locale } from "@/lib/i18n";
import { bookStayHref, bookTableHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { BookingBar } from "@/components/booking/BookingBar";

/**
 * Homepage hero.
 *
 * Server-rendered: the headline and calls to action are in the initial HTML and
 * do not depend on the video, the loading screen, or any client JavaScript.
 */
export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden pt-28 pb-8 text-cream">
      {/* Real production media: art-directed posters and the optimized
          desktop/mobile video loops, selected per viewport inside. */}
      <HeroVideo />

      <Container className="relative">
        <div className="max-w-4xl">
          <p className="mb-5 flex items-center gap-2.5">
            {/* A short tick, not a divider — keeps the eye on the annotation. */}
            <span aria-hidden="true" className="h-px w-5 bg-blue" />
            <HandwrittenNote className="text-2xl sm:text-3xl">
              {dict.hero.handwritten}
            </HandwrittenNote>
          </p>

          <h1 className="text-display font-semibold text-balance">{dict.hero.headline}</h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85 sm:text-xl">
            {dict.hero.subheadline}
          </p>

          {/* Two intentional actions. They stretch to equal width on a phone
              and sit as a balanced pair from sm up. */}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button
              href={localePath(locale, bookStayHref)}
              variant="conversion"
              size="lg"
              className="justify-center sm:min-w-56"
            >
              {dict.actions.bookStay}
            </Button>
            <Button
              href={localePath(locale, bookTableHref)}
              variant="secondary"
              size="lg"
              className="justify-center sm:min-w-56"
            >
              {dict.actions.bookTable}
            </Button>
          </div>

          {/* Feature strip */}
          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cream/20 pt-5 text-sm text-cream/80">
            {dict.hero.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-blue" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <BookingBar locale={locale} dict={dict} className="mt-10" />
      </Container>
    </section>
  );
}
