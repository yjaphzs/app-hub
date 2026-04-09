import type { AppItem } from "@/data/apps"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { ImageLightbox } from "@/components/ui/image-lightbox"
import { ExternalLink, XIcon, ZoomIn } from "lucide-react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface AppDetailDialogProps {
  app: AppItem
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppDetailDialog({
  app,
  open,
  onOpenChange,
}: AppDetailDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[90dvh] max-w-2xl gap-0 overflow-hidden rounded-t-2xl p-0 sm:rounded-2xl"
      >
        <DialogTitle className="sr-only">{app.name}</DialogTitle>
        <DialogDescription className="sr-only">
          {app.description}
        </DialogDescription>

        {/* Hero background */}
        <div className="relative h-36 shrink-0 overflow-hidden sm:h-52 md:h-64">
          <img
            src={app.bg}
            alt={`${app.name} background`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-card via-card/40 to-transparent" />

          {/* Close button */}
          <DialogClose asChild>
            <button
              type="button"
              className="absolute right-3 top-3 inline-flex size-8 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white"
              aria-label="Close"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </DialogClose>

          {/* App icon overlay */}
          <motion.div
            className="absolute bottom-3 left-4 flex items-center gap-2.5 sm:bottom-4 sm:left-5 sm:gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            {app.icon.startsWith("/") || app.icon.includes("/") ? (
              <img
                src={app.icon}
                alt={app.name}
                className="size-10 rounded-lg object-cover shadow-lg ring-1 ring-white/20 sm:size-12 sm:rounded-xl"
              />
            ) : (
              <span className="text-3xl drop-shadow-lg sm:text-4xl">
                {app.icon}
              </span>
            )}
            <div>
              <h2 className="text-base font-bold tracking-tight text-foreground sm:text-xl">
                {app.name}
              </h2>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4 overflow-y-auto p-4 pt-2 sm:gap-5 sm:p-5 sm:pt-2">
          {/* Description */}
          <motion.p
            className="text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {app.description}
          </motion.p>

          {/* Screenshots gallery */}
          {app.screenshots.length > 0 && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Screenshots
              </h3>
              <div
                className={cn(
                  "grid gap-2",
                  app.screenshots.length === 1
                    ? "grid-cols-1"
                    : "grid-cols-2 sm:grid-cols-3"
                )}
              >
                {app.screenshots.map((src, idx) => (
                  <ImageLightbox
                    key={idx}
                    images={app.screenshots}
                    initialIndex={idx}
                    alt={`${app.name} screenshot`}
                  >
                    <button
                      type="button"
                      className="group/thumb relative overflow-hidden rounded-lg ring-1 ring-border/50 transition-all hover:ring-primary/50"
                    >
                      <img
                        src={src}
                        alt={`${app.name} screenshot ${idx + 1}`}
                        className="aspect-video w-full object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover/thumb:bg-black/30">
                        <ZoomIn className="h-6 w-6 text-white opacity-0 transition-opacity group-hover/thumb:opacity-100" />
                      </div>
                    </button>
                  </ImageLightbox>
                ))}
              </div>
            </motion.div>
          )}

          {/* Launch button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild className="w-full cursor-pointer">
              <a
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Launch App
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
