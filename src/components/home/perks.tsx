import {
  PaletteIcon,
  QrCodeIcon,
  RefreshCwIcon,
  UserRoundCheckIcon,
} from "lucide-react"

import { AppearanceButton } from "@/components/appearance/appearance-button"

const PERKS = [
  {
    icon: UserRoundCheckIcon,
    title: "No account needed",
    text: "Start right away. Your data stays in your browser until you choose to sign in.",
  },
  {
    icon: RefreshCwIcon,
    title: "Sync when you sign in",
    text: "Save your data to your account and pick up where you left off on any device.",
  },
  {
    icon: QrCodeIcon,
    title: "Move it by QR code",
    text: "Send your data to another device with a QR code, or back it up to a file.",
  },
  {
    icon: PaletteIcon,
    title: "Make it yours",
    text: "Light or dark, in amber or any color you pick.",
    tryIt: true,
  },
]

/** What both apps share, with a way to try the color schemes right here. */
export function Perks() {
  return (
    <section aria-labelledby="perks-title" className="pb-14 sm:pb-20">
      <h2
        id="perks-title"
        className="text-xl font-bold tracking-tight sm:text-2xl"
      >
        Every app comes with
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {PERKS.map(({ icon: Icon, title, text, tryIt }) => (
          <li key={title} className="flex gap-3 rounded-xl border bg-card p-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon className="size-5" aria-hidden />
            </span>
            <div className="flex min-w-0 flex-col items-start gap-1">
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{text}</p>
              {tryIt && (
                <AppearanceButton className="mt-2">
                  Try it here
                </AppearanceButton>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
