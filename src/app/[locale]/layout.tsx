import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { fontVariables } from "@/lib/fonts";
import { getDictionary } from "@/content/dictionaries";
import { localeTags, locales, resolveLocale } from "@/lib/i18n";
import { absoluteUrl, siteUrl } from "@/lib/metadata";
import { mainNavigation } from "@/content/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { IntroGate, LoadingScreen } from "@/components/layout/LoadingScreen";
import { JsonLdScript, organizationSchema } from "@/lib/structured-data";

/**
 * Root layout.
 *
 * It lives under [locale] rather than at src/app/layout.tsx so that
 * <html lang> can reflect the actual language of the page. A layout at the app
 * root cannot read route params, which would leave every English and German
 * page announcing itself as Czech to screen readers and crawlers.
 *
 * The root "/" redirect to "/cs" is configured in next.config.ts.
 */

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFDF9" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1D35" },
  ],
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${dict.siteName} — ${dict.tagline}`,
      template: `%s | ${dict.siteName}`,
    },
    description: dict.hero.subheadline,
    // The supplied favicon set. Android home-screen icons are wired through
    // the manifest, whose relative icon paths resolve against its own URL.
    icons: {
      icon: [
        { url: "/images/logos/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/images/logos/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/images/logos/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      ],
      shortcut: "/images/logos/favicon/favicon.ico",
      apple: "/images/logos/favicon/apple-touch-icon.png",
    },
    manifest: "/images/logos/favicon/site.webmanifest",
    applicationName: dict.siteName,
    authors: [{ name: dict.siteName }],
    creator: dict.siteName,
    publisher: dict.siteName,
    formatDetection: { telephone: true, address: true, email: true },
    openGraph: {
      type: "website",
      locale,
      siteName: dict.siteName,
      url: absoluteUrl(`/${locale}`),
      title: `${dict.siteName} — ${dict.tagline}`,
      description: dict.hero.subheadline,
    },
    twitter: {
      card: "summary_large_image",
      title: `${dict.siteName} — ${dict.tagline}`,
      description: dict.hero.subheadline,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  // An unknown segment still needs a valid document; the page below it calls
  // notFound(), so the 404 renders inside a correctly formed html shell.
  const locale = resolveLocale(raw);
  const dict = getDictionary(locale);

  return (
    // suppressHydrationWarning covers exactly one thing: <IntroGate /> stamps
    // data-intro on this element before React hydrates, so the attribute is
    // legitimately absent from the server HTML. It does not extend to children.
    <html
      lang={localeTags[locale]}
      className={fontVariables}
      suppressHydrationWarning
    >
      {/* No manual <head>: React reconciles that subtree on hydration and
          strips the tags Next injected there — including the viewport meta,
          which silently drops mobile to the 980px fallback layout. The intro
          script therefore lives at the top of <body>, where it still runs
          before the rest of the body is parsed or painted. */}
      <body className="min-h-dvh bg-warm-white antialiased">
        <IntroGate />
        <LoadingScreen />
        <SkipLink label={dict.a11y.skipToContent} />
        <Header items={mainNavigation} locale={locale} dict={dict} />
        <main id="main" tabIndex={-1} className="focus-visible:outline-none">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <JsonLdScript schemas={[organizationSchema(locale)]} />
      </body>
    </html>
  );
}
