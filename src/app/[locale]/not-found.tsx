import Link from "next/link";
import { getDictionary } from "@/content/dictionaries";
import { defaultLocale, localePath } from "@/lib/i18n";
import { mainNavigation } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { HandwrittenNote } from "@/components/ui/HandwrittenNote";
import { Rooftops } from "@/components/illustrations";

/**
 * Branded 404.
 *
 * Rendered for unknown paths and unknown locales alike. Next.js does not pass
 * route params to a not-found boundary, so this falls back to Czech — the
 * default locale — rather than guessing wrongly from a URL that is, by
 * definition, not one we recognise.
 */
export default function NotFound() {
  const locale = defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="relative flex min-h-[80svh] items-center overflow-hidden bg-blue-light py-32 text-navy">
      <Rooftops
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full text-navy opacity-10"
      />

      <Container className="relative">
        <div className="max-w-2xl">
          <p className="font-display text-7xl leading-none text-navy/25 sm:text-8xl">
            {dict.notFound.code}
          </p>
          <h1 className="mt-6 text-title font-semibold text-balance">{dict.notFound.title}</h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed opacity-75 sm:text-lg">
            {dict.notFound.text}
          </p>

          <HandwrittenNote className="mt-6" arrow="right">
            {dict.notFound.handwritten}
          </HandwrittenNote>

          <div className="mt-9">
            <Button href={localePath(locale)} size="lg">
              {dict.notFound.home}
            </Button>
          </div>

          <nav aria-label={dict.notFound.suggestions} className="mt-12">
            <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
              {dict.notFound.suggestions}
            </h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {mainNavigation.map((item) => (
                <li key={item.id}>
                  <Link
                    href={localePath(locale, item.href)}
                    className="link-underline inline-flex min-h-8 items-center text-sm"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
}
