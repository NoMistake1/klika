import { notFound } from "next/navigation";

/**
 * Catch-all for unmatched paths under a locale segment.
 *
 * Without this, a URL like /cs/does-not-exist or /nonsense/deep would fall
 * through to the framework's unstyled default 404. Routing it here means every
 * wrong turn lands on the branded not-found page inside a proper html shell.
 */
export default function CatchAllPage(): never {
  notFound();
}
