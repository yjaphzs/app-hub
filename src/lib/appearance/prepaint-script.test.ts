import { describe, expect, it } from "vitest"

import { PREPAINT_SCRIPT } from "./prepaint-script"
import { SCHEME_CSS_KEY, SCHEME_KEY, THEME_KEY } from "./scheme-keys"

/** Runs the script against a fake page and returns what it did to <html>. */
function run(stored: Record<string, string>, prefersDark = false) {
  const classes = new Set<string>()
  const attrs: Record<string, string> = {}
  const styles: { id: string; textContent: string }[] = []
  const document = {
    documentElement: {
      classList: { add: (c: string) => classes.add(c) },
      setAttribute: (k: string, v: string) => (attrs[k] = v),
    },
    createElement: () => ({ id: "", textContent: "" }),
    head: {
      appendChild: (e: { id: string; textContent: string }) => styles.push(e),
    },
  }
  const localStorage = { getItem: (k: string) => stored[k] ?? null }
  const matchMedia = () => ({ matches: prefersDark })
  new Function("document", "localStorage", "matchMedia", PREPAINT_SCRIPT)(
    document,
    localStorage,
    matchMedia
  )
  return { classes: [...classes], attrs, styles }
}

describe("pre-paint script", () => {
  it("follows the device when nothing is saved", () => {
    expect(run({}).classes).toEqual(["light"])
    expect(run({}, true).classes).toEqual(["dark"])
  })

  it("uses the saved mode over the device", () => {
    expect(run({ [THEME_KEY]: "light" }, true).classes).toEqual(["light"])
    expect(run({ [THEME_KEY]: "dark" }).classes).toEqual(["dark"])
  })

  it("restores a saved scheme's stylesheet, but not for the default amber", () => {
    const teal = run({ [SCHEME_KEY]: "teal", [SCHEME_CSS_KEY]: ":root{}" })
    expect(teal.attrs["data-scheme"]).toBe("teal")
    expect(teal.styles).toHaveLength(1)
    expect(
      run({ [SCHEME_KEY]: "amber", [SCHEME_CSS_KEY]: ":root{}" }).styles
    ).toHaveLength(0)
  })
})
