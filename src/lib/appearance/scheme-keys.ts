// Storage contract between scheme-store.ts, the theme provider, and the inline
// pre-paint script (prepaint-script.ts). Raw strings, not JSON, so the script
// stays tiny. No imports, so vite.config.ts can load it.
export const SCHEME_KEY = "app_hub_scheme"
export const ACCENT_KEY = "app_hub_scheme_accent"
export const SCHEME_CSS_KEY = "app_hub_scheme_css"
export const SCHEME_STYLE_ID = "app-hub-scheme"
/** Light, dark, or system (theme-provider.tsx). */
export const THEME_KEY = "app-hub-theme"
