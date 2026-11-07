import { createContext, useContext, useEffect, useMemo, useState } from "react"

import type { ThemeMode } from "@/lib/appearance/preference"
import { isThemeMode } from "@/lib/appearance/preference"
import { THEME_KEY } from "@/lib/appearance/scheme-keys"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: ThemeMode
  storageKey?: string
}

type ThemeProviderState = {
  theme: ThemeMode
  resolvedTheme: "dark" | "light"
  setTheme: (theme: ThemeMode) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// The browser bar color: the page background in each mode.
const THEME_COLORS = { light: "#ffffff", dark: "#111111" }

function getSystemTheme(): "dark" | "light" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function readStored(key: string, fallback: ThemeMode): ThemeMode {
  try {
    const stored = localStorage.getItem(key)
    return isThemeMode(stored) ? stored : fallback
  } catch {
    return fallback
  }
}

/** Light, dark, or the device's mode. The pre-paint script applies it before React loads. */
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = THEME_KEY,
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStored(storageKey, defaultTheme)
  )
  const [systemTheme, setSystemTheme] = useState<"dark" | "light">(
    getSystemTheme
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = (e: MediaQueryListEvent) =>
      setSystemTheme(e.matches ? "dark" : "light")
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const resolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((meta) =>
        meta.setAttribute("content", THEME_COLORS[resolvedTheme])
      )
  }, [resolvedTheme])

  const value = useMemo<ThemeProviderState>(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (next: ThemeMode) => {
        try {
          localStorage.setItem(storageKey, next)
        } catch {
          /* private mode: the choice still applies for this visit */
        }
        setTheme(next)
      },
    }),
    [theme, resolvedTheme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
