import { ArrowUpRightIcon } from "lucide-react"
import { motion } from "motion/react"

import { apps } from "@/data/apps"

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
})

/** The headline, plus a one-tap link to each app. */
export function Hero() {
  return (
    <section className="relative isolate pt-10 pb-10 sm:pt-16 sm:pb-14">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -z-10 h-112 w-screen -translate-x-1/2 bg-[radial-gradient(45%_60%_at_20%_35%,color-mix(in_oklch,var(--primary)_24%,transparent),transparent)]"
      />
      <motion.p
        {...rise(0)}
        className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-muted-foreground"
      >
        <span aria-hidden className="size-2 rounded-full bg-primary" />
        {apps.length} free web apps
      </motion.p>
      <motion.h1
        {...rise(0.06)}
        className="mt-4 max-w-3xl text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-6xl"
      >
        All my web apps,
        <br />
        <span className="relative inline-block">
          <span
            aria-hidden
            className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-10 h-[0.38em] rounded-sm bg-primary/50"
          />
          one tap away.
        </span>
      </motion.h1>
      <motion.p
        {...rise(0.12)}
        className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg"
      >
        Free tools for school and everyday money. Open one in your browser and
        start right away, no account needed.
      </motion.p>
      <motion.ul {...rise(0.18)} className="mt-6 flex flex-wrap gap-2">
        {apps.map((app) => (
          <li key={app.id}>
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-full border bg-card pr-4 pl-1.5 text-sm font-semibold shadow-xs transition-colors outline-none hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <img
                src={app.icon}
                alt=""
                width={32}
                height={32}
                className="size-8 rounded-full"
              />
              {app.name}
              <ArrowUpRightIcon className="size-4 text-muted-foreground" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </li>
        ))}
      </motion.ul>
    </section>
  )
}
