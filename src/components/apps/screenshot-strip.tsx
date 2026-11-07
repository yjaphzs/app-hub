import { useRef } from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ImageLightbox } from "@/components/ui/image-lightbox"
import type { AppItem } from "@/data/apps"

/** The app's phone screens in a row to swipe; tap one to see it full size. */
export function ScreenshotStrip({ app }: { app: AppItem }) {
  const row = useRef<HTMLUListElement>(null)
  const images = app.screenshots.map((shot) => shot.src)
  const alts = app.screenshots.map((shot) => shot.alt)

  const page = (direction: 1 | -1) => {
    const list = row.current
    if (list) list.scrollBy({ left: direction * list.clientWidth * 0.8 })
  }

  return (
    <section
      aria-labelledby={`${app.id}-screens`}
      className="flex flex-col gap-2"
    >
      <div className="flex items-center justify-between gap-2">
        <h3
          id={`${app.id}-screens`}
          className="text-sm font-medium text-muted-foreground"
        >
          Screenshots
        </h3>
        <div className="hidden gap-1 md:flex">
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Earlier screenshots"
            onClick={() => page(-1)}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="More screenshots"
            onClick={() => page(1)}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <ul
        ref={row}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto scroll-smooth px-4 pt-1 pb-3 motion-reduce:scroll-auto sm:-mx-5 sm:scroll-px-5 sm:px-5"
      >
        {app.screenshots.map((shot, index) => (
          <li key={shot.src} className="shrink-0 snap-start">
            <ImageLightbox
              images={images}
              alts={alts}
              initialIndex={index}
              alt={app.name}
            >
              <button
                type="button"
                aria-label={`View screenshot ${index + 1}: ${shot.alt}`}
                className="block overflow-hidden rounded-xl ring-1 ring-border transition-shadow outline-none hover:ring-2 hover:ring-primary focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <img
                  src={shot.src}
                  alt=""
                  width={390}
                  height={763}
                  loading="lazy"
                  decoding="async"
                  className="aspect-390/763 w-32 object-cover sm:w-36"
                />
              </button>
            </ImageLightbox>
          </li>
        ))}
      </ul>
    </section>
  )
}
