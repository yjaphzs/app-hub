import { Fragment } from "react"

import { KofiLink } from "@/components/layout/kofi-link"
import { apps } from "@/data/apps"

const LINKS = [
  ...apps.map((app) => ({ label: app.name, href: app.url })),
  { label: "yjaphzs.xyz", href: "https://www.yjaphzs.xyz/" },
]

/** Ko-fi, links to the apps, and the credit line: the same footer as the apps. */
export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 px-4 pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <KofiLink />
        <nav
          aria-label="More from JPB"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-muted-foreground"
        >
          {LINKS.map((link, index) => (
            <Fragment key={link.href}>
              {index > 0 && (
                <span aria-hidden className="text-border">
                  •
                </span>
              )}
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            </Fragment>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} App Hub · Made by{" "}
          <a
            href="https://www.yjaphzs.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium transition-colors hover:text-primary"
          >
            JPB
          </a>
        </p>
      </div>
    </footer>
  )
}
