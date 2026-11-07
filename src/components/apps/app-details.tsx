import { ArrowUpRightIcon, CheckIcon } from "lucide-react"

import { ScreenshotStrip } from "@/components/apps/screenshot-strip"
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/shared/responsive-dialog"
import { Button } from "@/components/ui/button"
import type { AppItem } from "@/data/apps"

interface AppDetailsProps {
  app: AppItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** An app's screenshots and highlights. A bottom sheet on phones. */
export function AppDetails({ app, open, onOpenChange }: AppDetailsProps) {
  return (
    <ResponsiveDialog open={open} onOpenChange={onOpenChange}>
      <ResponsiveDialogContent className="max-h-[90dvh] grid-rows-[auto_minmax(0,1fr)_auto] gap-0 p-0 sm:max-w-2xl">
        <ResponsiveDialogHeader className="flex-row items-center gap-3 p-4 sm:px-5 sm:pt-5">
          <img
            src={app.icon}
            alt=""
            width={48}
            height={48}
            className="size-12 shrink-0 rounded-xl ring-1 ring-border"
          />
          <div className="flex min-w-0 flex-col gap-1 text-left">
            <ResponsiveDialogTitle className="text-lg leading-tight font-bold">
              {app.name}
            </ResponsiveDialogTitle>
            <ResponsiveDialogDescription className="truncate font-mono text-xs">
              {app.host}
            </ResponsiveDialogDescription>
          </div>
        </ResponsiveDialogHeader>

        <ResponsiveDialogBody className="flex flex-col gap-5 px-4 pb-4 sm:overflow-y-auto sm:px-5">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {app.description}
          </p>
          <ScreenshotStrip app={app} />
          <section
            aria-labelledby={`${app.id}-highlights`}
            className="flex flex-col gap-2"
          >
            <h3
              id={`${app.id}-highlights`}
              className="text-sm font-medium text-muted-foreground"
            >
              What you can do
            </h3>
            <ul className="grid gap-2 sm:grid-cols-2">
              {app.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm">
                  <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <CheckIcon className="size-3" strokeWidth={3} aria-hidden />
                  </span>
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        </ResponsiveDialogBody>

        <ResponsiveDialogFooter className="m-0 flex-col-reverse sm:flex-row sm:justify-end sm:px-5">
          <ResponsiveDialogClose asChild>
            <Button variant="outline" className="h-11 sm:h-9">
              Close
            </Button>
          </ResponsiveDialogClose>
          <Button asChild className="h-11 font-semibold sm:h-9">
            <a href={app.url} target="_blank" rel="noopener noreferrer">
              Open {app.name}
              <ArrowUpRightIcon aria-hidden />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
