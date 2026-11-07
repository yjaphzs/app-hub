import { useTheme } from "@/components/theme-provider"
import { DEFAULT_ACCENT } from "@/lib/appearance/preference"
import { setScheme, useScheme } from "@/lib/appearance/scheme-store"
import { CUSTOM_SCHEME } from "@/lib/appearance/schemes"

/**
 * The look picked in the Appearance dialog: color scheme, custom accent, and
 * light/dark/system. Changes apply right away and are saved on this device.
 */
export function useAppearance() {
  const { theme, setTheme } = useTheme()
  const choice = useScheme()

  const selectScheme = (scheme: string) =>
    setScheme(
      scheme === CUSTOM_SCHEME
        ? { scheme, accent: choice.accent ?? DEFAULT_ACCENT }
        : { scheme }
    )

  const setAccent = (accent: string) =>
    setScheme({ scheme: CUSTOM_SCHEME, accent })

  return { choice, mode: theme, selectScheme, setAccent, setMode: setTheme }
}
