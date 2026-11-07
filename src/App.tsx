import { AppCard } from "@/components/apps/app-card"
import { Hero } from "@/components/home/hero"
import { Perks } from "@/components/home/perks"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { apps } from "@/data/apps"

export function App() {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4">
        <Hero />
        <section aria-labelledby="apps-title" className="pb-12 sm:pb-16">
          <div className="mb-4 flex items-baseline justify-between gap-2">
            <h2
              id="apps-title"
              className="text-xl font-bold tracking-tight sm:text-2xl"
            >
              The apps
            </h2>
            <p className="text-sm text-muted-foreground">
              {apps.length} apps, all free
            </p>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {apps.map((app, index) => (
              <li key={app.id} className="flex">
                <AppCard app={app} index={index} />
              </li>
            ))}
          </ul>
        </section>
        <Perks />
      </main>
      <SiteFooter />
    </div>
  )
}

export default App
