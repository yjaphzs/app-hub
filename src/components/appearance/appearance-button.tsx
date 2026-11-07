import { useState, type ReactNode } from "react"
import { PaletteIcon } from "lucide-react"

import { AppearanceDialog } from "@/components/appearance/appearance-dialog"
import { Button } from "@/components/ui/button"

interface AppearanceButtonProps {
  /** A labeled button instead of the header's icon button. */
  children?: ReactNode
  className?: string
}

/** Opens the Appearance settings (mode and color scheme). */
export function AppearanceButton({
  children,
  className,
}: AppearanceButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <>
      {children ? (
        <Button
          variant="outline"
          className={className}
          onClick={() => setOpen(true)}
        >
          <PaletteIcon />
          {children}
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon-lg"
          aria-label="Appearance"
          className={className}
          onClick={() => setOpen(true)}
        >
          <PaletteIcon className="size-5" />
        </Button>
      )}
      <AppearanceDialog open={open} onOpenChange={setOpen} />
    </>
  )
}
