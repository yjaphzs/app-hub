import { useState } from "react"
import { ArrowUpRightIcon, ImagesIcon } from "lucide-react"
import { motion } from "motion/react"

import { AppDetails } from "@/components/apps/app-details"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { AppItem } from "@/data/apps"

interface AppCardProps {
  app: AppItem
  index: number
}

/** One app: its art, what it does, and Open / Details. */
export function AppCard({ app, index }: AppCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.article
      id={app.id}
      aria-labelledby={`${app.id}-name`}
      className="group/card flex w-full scroll-mt-20 flex-col overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-lg"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* A bigger click target for the details; keyboard users have the Details button. */}
      <div
        className="relative aspect-4/3 cursor-pointer overflow-hidden bg-[#151517]"
        onClick={() => setOpen(true)}
      >
        <img
          src={app.card}
          alt=""
          width={1200}
          height={900}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-[1.03] motion-reduce:transition-none"
        />
        <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <ImagesIcon className="size-3.5" aria-hidden />
          {app.screenshots.length} screenshots
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <img
            src={app.icon}
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-lg ring-1 ring-border"
          />
          <div className="min-w-0">
            <h3
              id={`${app.id}-name`}
              className="truncate text-lg font-bold tracking-tight"
            >
              {app.name}
            </h3>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {app.host}
            </p>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {app.summary}
        </p>
        <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
          {app.tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline" className="h-6 px-2.5">
                {tag}
              </Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex gap-2 pt-2">
          <Button asChild className="h-11 flex-1 text-sm font-semibold">
            <a href={app.url} target="_blank" rel="noopener noreferrer">
              Open app
              <span className="sr-only">: {app.name} (opens in a new tab)</span>
              <ArrowUpRightIcon aria-hidden />
            </a>
          </Button>
          <Button
            variant="outline"
            className="h-11 px-4 text-sm"
            aria-label={`${app.name} details and screenshots`}
            onClick={() => setOpen(true)}
          >
            Details
          </Button>
        </div>
      </div>

      <AppDetails app={app} open={open} onOpenChange={setOpen} />
    </motion.article>
  )
}
