import { AppearanceButton } from "@/components/appearance/appearance-button"
import { BrandMark } from "@/components/layout/brand-mark"

/** Sticky top bar, like the apps': the brand on the left, Appearance on the right. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 pt-[env(safe-area-inset-top)] backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-2 px-4">
        <a
          href="/"
          className="flex min-w-0 items-center gap-2 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-8 shrink-0 overflow-hidden rounded-md">
            <BrandMark />
          </span>
          <span className="truncate text-base font-extrabold tracking-tight sm:text-xl">
            App Hub
          </span>
        </a>
        <AppearanceButton />
      </div>
    </header>
  )
}
