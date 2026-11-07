import { cn } from "@/lib/utils"

/**
 * The hub mark (a 2 × 2 grid of tiles, as in the original artwork) drawn as
 * SVG so it follows the color scheme: `--logo-tile` behind, `--logo-mark` for
 * the glyph. Both default to the black tile and the accent (index.css); a
 * scheme whose accent is too dark for black swaps them (lib/appearance). The
 * paths match the tab icon in lib/appearance/favicon.ts.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      <rect width="32" height="32" fill="var(--logo-tile)" />
      <g
        transform="translate(4 4)"
        fill="none"
        stroke="var(--logo-mark)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="7" height="7" x="3" y="3" rx="1.6" />
        <rect width="7" height="7" x="14" y="3" rx="1.6" />
        <rect width="7" height="7" x="14" y="14" rx="1.6" />
        <rect width="7" height="7" x="3" y="14" rx="1.6" />
      </g>
    </svg>
  )
}
