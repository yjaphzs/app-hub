import { apps } from "@/data/apps"
import { AppCard } from "@/components/app-card"
import { Moon, Sun, Dot } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useTheme } from "@/components/theme-provider"
import { motion, AnimatePresence } from "motion/react"
import appHubLogo from "@/assets/images/app-hub.jpg"
import { AuroraBackground } from "@/components/ui/aurora-background"

export function App() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div className="relative z-10 mx-auto flex min-h-svh max-w-4xl flex-col px-4 py-8 sm:px-6 sm:py-12">
      <AuroraBackground />

      {/* Header */}
      <motion.header
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <a href="https://yjaphzs.xyz/" target="_blank" rel="noopener noreferrer">
            <motion.img
              src={appHubLogo}
              alt="App Hub"
              className="relative z-20 h-9 w-9 rounded-lg object-cover shadow-md ring-1 ring-border/50 sm:h-11 sm:w-11 sm:rounded-xl"
              whileHover={{ scale: 1.1, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            />
          </a>
          <div>
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">App Hub</h1>
            <p className="text-sm text-muted-foreground">
              All my web apps, one click away.
            </p>
          </div>
        </div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              setTheme(
                theme === "system"
                  ? "light"
                  : theme === "light"
                    ? "dark"
                    : "system"
              )
            }
            aria-label="Toggle theme"
            className="cursor-pointer rounded-full"
          >
            <AnimatePresence mode="wait" initial={false}>
              {resolvedTheme === "dark" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: -90, scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </motion.header>

      {/* Divider */}
      <motion.div
        className="my-5 h-px bg-border sm:my-8"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
      />

      {/* App count */}
      <motion.p
        className="mb-4 text-sm font-medium text-muted-foreground sm:mb-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {apps.length} apps available
      </motion.p>

      {/* App grid */}
      <main className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {apps.map((app, index) => (
          <AppCard key={app.name} app={app} index={index} />
        ))}
      </main>

      {/* Footer */}
      <motion.div
        className="mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Separator className="mt-4 mb-3 sm:mt-6 sm:mb-4" />
        <footer className="flex items-center justify-center gap-0 pb-4 text-[10px] text-muted-foreground sm:pb-6 sm:text-[11px]">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <a
              href="https://yjaphzs.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-foreground"
            >
              Jan Bautista
            </a>
            <Dot className="inline h-4 w-4" />
            All rights reserved.
          </p>
        </footer>
      </motion.div>
    </div>
  )
}

export default App
