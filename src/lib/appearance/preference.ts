/** Light, dark, or follow the device. */
export type ThemeMode = "light" | "dark" | "system"

// What the custom picker starts on before the user chooses a color.
export const DEFAULT_ACCENT = "#7c3aed"

export const THEME_MODES: ThemeMode[] = ["light", "dark", "system"]

export const isThemeMode = (value: unknown): value is ThemeMode =>
  THEME_MODES.includes(value as ThemeMode)
