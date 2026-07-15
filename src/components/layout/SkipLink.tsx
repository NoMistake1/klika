/**
 * Skip-to-content link. Visually hidden until focused, then the first thing a
 * keyboard user lands on.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-[2px] focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-warm-white"
    >
      {label}
    </a>
  );
}
