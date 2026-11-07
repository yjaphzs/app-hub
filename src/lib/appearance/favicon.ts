import { hexToOklch, oklchToHex } from "@/lib/appearance/color"
import { deriveDark } from "@/lib/appearance/derive-scheme"
import {
  CUSTOM_SCHEME,
  DEFAULT_SCHEME,
  SCHEME_PRESETS,
  type SchemeChoice,
} from "@/lib/appearance/schemes"

const FAVICON_ID = "app-hub-favicon"

/** The logo as an SVG data URL: the scheme's bright accent on the black tile. */
export function faviconHref(markHex: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#000"/><g transform="translate(4 4)" fill="none" stroke="${markHex}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1.6"/><rect width="7" height="7" x="14" y="3" rx="1.6"/><rect width="7" height="7" x="14" y="14" rx="1.6"/><rect width="7" height="7" x="3" y="14" rx="1.6"/></g></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

/** The glyph color for a choice: its dark-mode accent, which always reads on black. */
export function faviconMark(choice: SchemeChoice): string | null {
  if (choice.scheme === DEFAULT_SCHEME) return null
  const seed =
    choice.scheme === CUSTOM_SCHEME
      ? choice.accent && hexToOklch(choice.accent)
      : SCHEME_PRESETS.find((preset) => preset.id === choice.scheme)?.dark
  return seed ? oklchToHex(deriveDark(seed).primary) : null
}

/**
 * Points the browser tab icon at a recolored SVG logo, or removes it for the
 * default amber so the static icons apply again. Home-screen and app icons are
 * fixed image files and keep the amber logo.
 */
export function applyFavicon(choice: SchemeChoice): void {
  const mark = faviconMark(choice)
  let link = document.getElementById(FAVICON_ID) as HTMLLinkElement | null
  if (!mark) return void link?.remove()
  if (!link) {
    link = document.createElement("link")
    link.id = FAVICON_ID
    link.rel = "icon"
    link.type = "image/svg+xml"
    document.head.appendChild(link)
  }
  link.href = faviconHref(mark)
}
