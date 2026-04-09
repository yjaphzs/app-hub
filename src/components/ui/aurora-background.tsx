import { motion } from "motion/react"

export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Aurora layer 1 – top-left */}
      <motion.div
        className="absolute -left-1/4 -top-1/3 h-[90vh] w-[55vw] rounded-full opacity-40 blur-[100px] dark:opacity-25"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.75 0.15 280), oklch(0.7 0.12 230), transparent 70%)",
        }}
        animate={{
          x: [0, 80, -40, 0],
          y: [0, 60, -30, 0],
          scale: [1, 1.15, 0.95, 1],
          rotate: [0, 8, -5, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora layer 2 – center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[70vh] w-[50vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[90px] dark:opacity-18"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.78 0.12 200), oklch(0.7 0.08 170), transparent 70%)",
        }}
        animate={{
          x: ["-50%", "calc(-50% - 40px)", "calc(-50% + 30px)", "-50%"],
          y: ["-50%", "calc(-50% + 50px)", "calc(-50% - 40px)", "-50%"],
          scale: [0.95, 1.1, 1, 0.95],
          rotate: [0, 12, -8, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora layer 3 – bottom-right */}
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 h-[90vh] w-[55vw] rounded-full opacity-35 blur-[110px] dark:opacity-20"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.14 320), oklch(0.65 0.1 260), transparent 70%)",
        }}
        animate={{
          x: [0, -70, 50, 0],
          y: [0, -50, 40, 0],
          scale: [1.1, 0.9, 1.05, 1.1],
          rotate: [0, -10, 6, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay for grain effect */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  )
}
