export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="label sr-only z-[100] bg-ink px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {label}
    </a>
  );
}
