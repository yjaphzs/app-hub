import * as React from "react"
import type { AppItem } from "@/data/apps"
import { Badge } from "@/components/ui/badge"
import { AppDetailDialog } from "@/components/app-detail-dialog"
import { motion } from "motion/react"

interface AppCardProps {
  app: AppItem
  index: number
}

export function AppCard({ app, index }: AppCardProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative flex aspect-4/3 cursor-pointer flex-col justify-end overflow-hidden rounded-2xl border border-border/50 text-left shadow-sm transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src={app.bg}
            alt=""
            className="h-full w-full object-cover"
            initial={{ scale: 1.15 }}
            whileHover={{ scale: 1.25 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          {/* Semi-transparent overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 via-60% to-black/25 transition-all duration-500 group-hover:from-black/95 group-hover:via-black/60" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 sm:p-5">
          <div className="flex items-center gap-2">
            {app.icon.startsWith("/") || app.icon.includes("/") ? (
              <motion.img
                src={app.icon}
                alt={app.name}
                className="size-8 rounded-lg object-cover shadow-md ring-1 ring-white/20 sm:size-9"
                whileHover={{ scale: 1.15, rotate: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              />
            ) : (
              <motion.span
                className="text-2xl drop-shadow-lg sm:text-3xl"
                whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {app.icon}
              </motion.span>
            )}
            <h3 className="text-base font-semibold tracking-tight text-white drop-shadow-sm sm:text-lg">
              {app.name}
            </h3>
          </div>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {app.tags.map((tag, tagIndex) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.15 + 0.2 + tagIndex * 0.08 }}
              >
                <Badge
                  variant="secondary"
                  className="border-white/10 bg-white/15 text-white/90 backdrop-blur-sm transition-colors group-hover:bg-white/25 group-hover:text-white"
                >
                  {tag}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.button>

      <AppDetailDialog app={app} open={open} onOpenChange={setOpen} />
    </>
  )
}
