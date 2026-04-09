import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import {
  Loader2,
  XIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ImageLightboxProps {
  images: string[]
  initialIndex: number
  alt?: string
  children: React.ReactNode
}

const MIN_ZOOM = 1
const MAX_ZOOM = 5
const ZOOM_STEP = 0.5
const WHEEL_ZOOM_STEP = 0.25

export function ImageLightbox({
  images,
  initialIndex,
  alt = "Screenshot",
  children,
}: ImageLightboxProps) {
  const [open, setOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex)
  const [zoom, setZoom] = React.useState(MIN_ZOOM)
  const [position, setPosition] = React.useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const dragStartRef = React.useRef({ x: 0, y: 0 })
  const positionRef = React.useRef({ x: 0, y: 0 })

  const total = images.length

  React.useEffect(() => {
    if (open) {
      setCurrentIndex(initialIndex)
      setZoom(MIN_ZOOM)
      setPosition({ x: 0, y: 0 })
      positionRef.current = { x: 0, y: 0 }
    }
  }, [open, initialIndex])

  React.useEffect(() => {
    setZoom(MIN_ZOOM)
    setPosition({ x: 0, y: 0 })
    positionRef.current = { x: 0, y: 0 }
    setIsLoading(true)
  }, [currentIndex])

  const goNext = React.useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total)
  }, [total])

  const goPrev = React.useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total)
  }, [total])

  const zoomIn = React.useCallback(() => {
    setZoom((prev) => Math.min(prev + ZOOM_STEP, MAX_ZOOM))
  }, [])

  const zoomOut = React.useCallback(() => {
    setZoom((prev) => {
      const next = Math.max(prev - ZOOM_STEP, MIN_ZOOM)
      if (next === MIN_ZOOM) {
        setPosition({ x: 0, y: 0 })
        positionRef.current = { x: 0, y: 0 }
      }
      return next
    })
  }, [])

  const resetZoom = React.useCallback(() => {
    setZoom(MIN_ZOOM)
    setPosition({ x: 0, y: 0 })
    positionRef.current = { x: 0, y: 0 }
  }, [])

  React.useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault()
          if (zoom === MIN_ZOOM) goNext()
          break
        case "ArrowLeft":
          e.preventDefault()
          if (zoom === MIN_ZOOM) goPrev()
          break
        case "Escape":
          e.preventDefault()
          setOpen(false)
          break
        case "+":
        case "=":
          e.preventDefault()
          zoomIn()
          break
        case "-":
          e.preventDefault()
          zoomOut()
          break
        case "0":
          e.preventDefault()
          resetZoom()
          break
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [open, goNext, goPrev, zoomIn, zoomOut, resetZoom, zoom])

  const handleWheel = React.useCallback((e: React.WheelEvent) => {
    e.stopPropagation()
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + WHEEL_ZOOM_STEP, MAX_ZOOM))
    } else {
      setZoom((prev) => {
        const next = Math.max(prev - WHEEL_ZOOM_STEP, MIN_ZOOM)
        if (next === MIN_ZOOM) {
          setPosition({ x: 0, y: 0 })
          positionRef.current = { x: 0, y: 0 }
        }
        return next
      })
    }
  }, [])

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      if (zoom > MIN_ZOOM) {
        e.preventDefault()
        setIsDragging(true)
        dragStartRef.current = {
          x: e.clientX - positionRef.current.x,
          y: e.clientY - positionRef.current.y,
        }
      }
    },
    [zoom]
  )

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging || zoom <= MIN_ZOOM) return
      const newPos = {
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      }
      positionRef.current = newPos
      setPosition(newPos)
    },
    [isDragging, zoom]
  )

  const handleMouseUp = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (zoom > MIN_ZOOM && e.touches.length === 1) {
        setIsDragging(true)
        dragStartRef.current = {
          x: e.touches[0].clientX - positionRef.current.x,
          y: e.touches[0].clientY - positionRef.current.y,
        }
      }
    },
    [zoom]
  )

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging || zoom <= MIN_ZOOM || e.touches.length !== 1) return
      const newPos = {
        x: e.touches[0].clientX - dragStartRef.current.x,
        y: e.touches[0].clientY - dragStartRef.current.y,
      }
      positionRef.current = newPos
      setPosition(newPos)
    },
    [isDragging, zoom]
  )

  const handleTouchEnd = React.useCallback(() => {
    setIsDragging(false)
  }, [])

  const clickOriginRef = React.useRef({ x: 0, y: 0 })
  const handleImageMouseDown = React.useCallback((e: React.MouseEvent) => {
    clickOriginRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const handleImageClick = React.useCallback(
    (e: React.MouseEvent) => {
      const dx = Math.abs(e.clientX - clickOriginRef.current.x)
      const dy = Math.abs(e.clientY - clickOriginRef.current.y)
      if (dx > 5 || dy > 5) return

      e.stopPropagation()
      if (zoom === MIN_ZOOM) {
        setZoom(2)
      } else {
        resetZoom()
      }
    },
    [zoom, resetZoom]
  )

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex items-center justify-center outline-none"
          aria-describedby={undefined}
          onPointerDownOutside={() => setOpen(false)}
        >
          <DialogPrimitive.Title className="sr-only">
            Image viewer — {alt}
          </DialogPrimitive.Title>

          {/* Top bar */}
          <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between px-2 py-2 sm:px-4 sm:py-3">
            <span className="select-none text-sm font-medium tabular-nums text-white/90">
              {currentIndex + 1} / {total}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                onClick={zoomOut}
                disabled={zoom <= MIN_ZOOM}
                aria-label="Zoom out"
              >
                <ZoomOut className="h-5 w-5" />
              </button>
              <span className="min-w-12 select-none text-center text-xs font-medium tabular-nums text-white/70">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white disabled:pointer-events-none disabled:opacity-40"
                onClick={zoomIn}
                disabled={zoom >= MAX_ZOOM}
                aria-label="Zoom in"
              >
                <ZoomIn className="h-5 w-5" />
              </button>
              {zoom > MIN_ZOOM && (
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  onClick={resetZoom}
                  aria-label="Reset zoom"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              )}
              <DialogPrimitive.Close asChild>
                <button
                  type="button"
                  className="inline-flex size-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  aria-label="Close"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </DialogPrimitive.Close>
            </div>
          </div>

          {/* Main image area */}
          <div
            className={cn(
              "flex h-full w-full items-center justify-center px-4 py-14 sm:px-14 md:px-20",
              zoom > MIN_ZOOM ? "overflow-hidden" : "",
              zoom > MIN_ZOOM
                ? isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
                : "cursor-zoom-in"
            )}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {isLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-white" />
              </div>
            )}
            <img
              src={images[currentIndex]}
              alt={`${alt} ${currentIndex + 1}`}
              className={cn(
                "max-h-full rounded-lg shadow-2xl select-none",
                zoom > MIN_ZOOM
                  ? "max-w-none"
                  : "max-w-full cursor-zoom-in object-contain",
                isDragging
                  ? "cursor-grabbing"
                  : zoom > MIN_ZOOM
                    ? "cursor-grab"
                    : "",
                !isDragging && "transition-transform duration-200",
                isLoading && "invisible"
              )}
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
              draggable={false}
              onMouseDown={handleImageMouseDown}
              onClick={handleImageClick}
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Bottom dots */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/40 px-3 py-1.5">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    resetZoom()
                    setCurrentIndex(idx)
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-200",
                    idx === currentIndex
                      ? "w-4 bg-white"
                      : "w-1.5 bg-white/40 hover:bg-white/70"
                  )}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
