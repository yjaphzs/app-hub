import { ArrowUpRightIcon, LayoutGridIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

/** A few real pieces of the page in the current colors, to judge a choice before closing. */
export function AppearancePreview() {
  return (
    <div
      aria-hidden
      className="flex flex-col gap-3 rounded-lg border bg-card p-3"
    >
      <p className="text-lg leading-tight font-extrabold tracking-tight">
        All my web apps,{" "}
        <span className="rounded-sm bg-primary/50 px-0.5">one tap away.</span>
      </p>
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutGridIcon className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Your apps</p>
          <p className="truncate text-xs text-muted-foreground">
            Buttons and highlights use your color
          </p>
        </div>
        <Button tabIndex={-1} className="h-9">
          Open app
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  )
}
