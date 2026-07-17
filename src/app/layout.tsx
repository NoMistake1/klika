import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/metadata";

/**
 * Pass-through root layout.
 *
 * The real <html>/<body> live in [locale]/layout.tsx so that <html lang> can
 * reflect each page's language. This root exists only to give the app-root
 * routes that render outside the [locale] segment — the static
 * opengraph-image and the not-found boundary — a metadataBase, so their
 * Open Graph and Twitter image URLs resolve against the real origin instead
 * of falling back to http://localhost:3000.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
