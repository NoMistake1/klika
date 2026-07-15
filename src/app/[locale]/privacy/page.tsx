import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Info, Mail } from "lucide-react";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { billingEntities, hotelEmail } from "@/content/contact";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/privacy",
    title: dict.privacy.title,
    description: dict.privacy.intro,
    // Placeholder wording; keep it out of the index until the operator supplies
    // the binding text.
    index: false,
  });
}

/**
 * Privacy policy placeholder.
 *
 * Intentionally empty of legal text. A privacy policy is a binding statement
 * about what a business does with personal data — inventing plausible-sounding
 * clauses here would be both legally worthless and actively misleading. The
 * page exists, is linked, and states plainly that the operator's text is
 * pending, with a real contact in the meantime.
 */
export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <>
      <PageHeader
        locale={locale}
        dict={dict}
        eyebrow={dict.privacy.eyebrow}
        title={dict.privacy.title}
        lede={dict.privacy.intro}
        crumbs={[{ label: dict.privacy.title }]}
        tone="cream"
      />

      <Section tone="warm-white">
        <Container size="narrow">
          <div className="border-l-2 border-terracotta pl-5">
            <h2 className="flex items-center gap-2.5 text-lg font-semibold">
              <Info aria-hidden="true" className="size-4 shrink-0 text-terracotta" />
              {dict.privacy.placeholderTitle}
            </h2>
            <p className="mt-3 leading-relaxed opacity-80">{dict.privacy.placeholderText}</p>
          </div>

          <div className="mt-12 border-t border-navy/15 pt-8">
            <h2 className="text-lg font-semibold">{dict.privacy.contactTitle}</h2>
            <Button href={`mailto:${hotelEmail}`} variant="outline" className="mt-4">
              <Mail aria-hidden="true" className="size-4" />
              {hotelEmail}
            </Button>
          </div>

          <div className="mt-12 border-t border-navy/15 pt-8">
            <h2 className="text-lg font-semibold">{dict.privacy.operatorsTitle}</h2>
            <div className="mt-5 grid gap-8 sm:grid-cols-2">
              {billingEntities.map((entity) => (
                <div key={entity.id}>
                  <h3 className="text-xs font-semibold tracking-[0.2em] uppercase opacity-55">
                    {entity.role[locale]}
                  </h3>
                  <address className="mt-2 text-sm leading-relaxed not-italic">
                    <span className="font-medium">{entity.name}</span>
                    <br />
                    {entity.addressLines.map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                    <span className="opacity-70">
                      {dict.contactPage.companyId}: {entity.companyId}
                      <br />
                      {dict.contactPage.vatId}: {entity.vatId}
                    </span>
                  </address>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[breadcrumbSchema(locale, [{ name: dict.privacy.title, path: "/privacy" }])]}
      />
    </>
  );
}
