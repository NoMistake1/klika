import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Users } from "lucide-react";
import { getDictionary, interpolate } from "@/content/dictionaries";
import { isLocale, localePath, resolveLocale, type Locale } from "@/lib/i18n";
import { buildPageMetadata } from "@/lib/metadata";
import { JsonLdScript, breadcrumbSchema } from "@/lib/structured-data";
import { presentedRooms } from "@/content/hotel";
import { bookStayHref } from "@/content/navigation";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { PageHeader } from "@/components/layout/PageHeader";
import { Price } from "@/components/ui/MenuBadges";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = resolveLocale((await params).locale);
  const dict = getDictionary(locale);

  return buildPageMetadata({
    locale,
    path: "/hotel/rooms",
    title: dict.roomsPage.title,
    description: dict.roomsPage.intro,
  });
}

export default async function RoomsPage({
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
        eyebrow={dict.roomsPage.eyebrow}
        title={dict.roomsPage.title}
        lede={dict.roomsPage.intro}
        crumbs={[
          { label: dict.hotelPage.eyebrow, path: "/hotel" },
          { label: dict.roomsPage.title },
        ]}
        className="lg:pt-44 lg:pb-32"
        // One asset serves both: the frame is wide, so a phone crops it
        // horizontally (the bed spans the full width, hence the centred X) while
        // desktop crops vertically — where 45% keeps the headboard and pillows
        // in the band instead of drifting onto the bedspread. Same height as the
        // other hotel subpages, and PageHeader adds the shared scrim.
        background={{
          src: "/images/hotel/bed.webp",
          width: 1672,
          height: 941,
          imgClassName: "object-[center_50%] md:object-[center_45%]",
        }}
      />

      <Section tone="warm-white">
        <Container>
          {/* Alternating image side keeps a six-item list from turning into a
              grid of identical cards. */}
          <ul className="space-y-20 lg:space-y-28">
            {presentedRooms.map((room, index) => {
              const isReversed = index % 2 === 1;

              return (
                <Reveal key={room.id} as="li">
                  <article className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-14">
                    <div
                      className={cn(
                        "relative aspect-[4/3] overflow-hidden bg-blue-light lg:col-span-7",
                        isReversed && "lg:order-2 lg:col-start-6",
                      )}
                    >
                      <SafeImage
                        image={room.image}
                        locale={locale}
                        fill
                        sizes="(min-width: 1024px) 58vw, 100vw"
                        priority={index === 0}
                      />
                    </div>

                    <div className={cn("lg:col-span-5", isReversed && "lg:order-1 lg:row-start-1")}>
                      <h2 className="text-heading font-semibold text-balance">
                        {room.name[locale]}
                      </h2>
                      <p className="mt-4 leading-relaxed opacity-75">
                        {room.description[locale]}
                      </p>

                      {room.capacity !== null ? (
                        <p className="mt-5 flex items-center gap-2 text-sm">
                          <Users aria-hidden="true" className="size-4 opacity-55" />
                          <span className="sr-only">{dict.rooms.capacity}: </span>
                          {interpolate(dict.rooms.upToGuests, { count: room.capacity })}
                        </p>
                      ) : null}

                      <h3 className="sr-only">{dict.rooms.features}</h3>
                      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                        {room.features[locale].map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm opacity-75">
                            <span
                              aria-hidden="true"
                              className="size-1 rounded-full bg-current opacity-50"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-6 border-t border-navy/10 pt-5">
                        <p className="flex items-baseline gap-2">
                          {room.priceCzk !== null ? (
                            <>
                              <span className="text-sm opacity-60">{dict.rooms.from}</span>
                              <Price
                                amountCzk={room.priceCzk}
                                locale={locale}
                                hasSeasonalException={room.hasSeasonalException}
                                className="text-2xl"
                              />
                              <span className="text-sm opacity-60">{dict.rooms.perNight}</span>
                            </>
                          ) : (
                            <Price
                              amountCzk={null}
                              locale={locale}
                              fallback={dict.rooms.priceOnRequest}
                              className="text-base"
                            />
                          )}
                        </p>
                        {room.hasSeasonalException ? (
                          <p className="mt-2 text-xs opacity-55">{dict.rooms.seasonalException}</p>
                        ) : null}
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button
                          href={`${localePath(locale, bookStayHref)}?room=${room.id}`}
                        >
                          {dict.actions.bookStay}
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Button>
                        <Button href={localePath(locale, "/hotel/pricing")} variant="outline">
                          {dict.actions.pricing}
                        </Button>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>

      <JsonLdScript
        schemas={[
          breadcrumbSchema(locale, [
            { name: dict.hotelPage.eyebrow, path: "/hotel" },
            { name: dict.roomsPage.title, path: "/hotel/rooms" },
          ]),
        ]}
      />
    </>
  );
}
