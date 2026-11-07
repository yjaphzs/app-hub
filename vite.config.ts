/// <reference types="vitest/config" />
import path from "path"
import { defineConfig, type Plugin } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

import { PREPAINT_SCRIPT } from "./src/lib/appearance/prepaint-script"

/** Puts the light/dark and color-scheme script at the top of <head>, so nothing flashes. */
function prepaint(): Plugin {
  return {
    name: "app-hub-prepaint",
    transformIndexHtml: () => [
      { tag: "script", children: PREPAINT_SCRIPT, injectTo: "head-prepend" },
    ],
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [prepaint(), react(), tailwindcss()],
  build: {
    outDir: "build",
    minify: "esbuild",
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-[hash].js`,
        chunkFileNames: `assets/[name]-[hash].js`,
        assetFileNames: `assets/[name]-[hash].[ext]`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
})
