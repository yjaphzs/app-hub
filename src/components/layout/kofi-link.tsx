import "@fontsource/quicksand/700.css"

/** "Buy Me a Ko-fi" with the wiggling cup, as in the apps' footers. */
export function KofiLink() {
  return (
    <a
      href="https://ko-fi.com/yjaphzs"
      target="_blank"
      rel="noreferrer noopener external"
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-[Quicksand] text-base font-bold tracking-tight transition-opacity outline-none hover:opacity-85 focus-visible:ring-3 focus-visible:ring-ring/50"
    >
      <img
        src="https://storage.ko-fi.com/cdn/cup-border.png"
        alt=""
        width={24}
        height={16}
        className="h-4 w-6 object-contain motion-safe:animate-[kofi-wiggle_3s_1.8s_infinite]"
      />
      Buy Me a Ko-fi
    </a>
  )
}
