export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="dna-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>
      <path
        d="M8 6h11a14 14 0 0 1 0 28H8z"
        fill="none"
        stroke="url(#dna-logo)"
        strokeWidth="2.5"
      />
      <path
        d="M14 12c8 3 8 13 0 16M24 12c-8 3-8 13 0 16"
        fill="none"
        stroke="url(#dna-logo)"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}