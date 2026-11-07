import gwaIcon from "@/assets/images/gwa-calculator/icon.jpg"
import gwaCard from "@/assets/images/gwa-calculator/card.webp"
import gwaShot1 from "@/assets/images/gwa-calculator/screenshots/screenshot1.webp"
import gwaShot2 from "@/assets/images/gwa-calculator/screenshots/screenshot2.webp"
import gwaShot3 from "@/assets/images/gwa-calculator/screenshots/screenshot3.webp"
import gwaShot4 from "@/assets/images/gwa-calculator/screenshots/screenshot4.webp"
import gwaShot5 from "@/assets/images/gwa-calculator/screenshots/screenshot5.webp"
import gwaShot6 from "@/assets/images/gwa-calculator/screenshots/screenshot6.webp"

import etIcon from "@/assets/images/expense-tracker/icon.jpg"
import etCard from "@/assets/images/expense-tracker/card.webp"
import etShot1 from "@/assets/images/expense-tracker/screenshots/screenshot1.webp"
import etShot2 from "@/assets/images/expense-tracker/screenshots/screenshot2.webp"
import etShot3 from "@/assets/images/expense-tracker/screenshots/screenshot3.webp"
import etShot4 from "@/assets/images/expense-tracker/screenshots/screenshot4.webp"
import etShot5 from "@/assets/images/expense-tracker/screenshots/screenshot5.webp"
import etShot6 from "@/assets/images/expense-tracker/screenshots/screenshot6.webp"

export interface Screenshot {
  src: string
  /** What the screen shows, for screen readers and the viewer. */
  alt: string
}

export interface AppItem {
  id: string
  name: string
  url: string
  /** The address without https://, shown under the name. */
  host: string
  /** One line for the card. */
  summary: string
  /** A short paragraph for the details sheet. */
  description: string
  highlights: string[]
  tags: string[]
  icon: string
  /** 4:3 art with phones, shown on the card. */
  card: string
  /** Phone screens, 390 x 763 at 2x. */
  screenshots: Screenshot[]
}

export const apps: AppItem[] = [
  {
    id: "gwa-calculator",
    name: "GWA Calculator",
    url: "https://gwa-calculator.yjaphzs.xyz",
    host: "gwa-calculator.yjaphzs.xyz",
    summary:
      "Compute your General Weighted Average and see your academic honors as you type.",
    description:
      "Enter your subjects, grades, and units to get your GWA and honor standing right away. Save each semester, follow your cumulative GWA and Latin honors, and share a picture of your result. Your data stays in your browser; sign in to save your progress and sync across devices.",
    highlights: [
      "Your GWA and honor standing, updated as you type",
      "Saved semesters, a cumulative GWA, and Latin honors",
      "Share images of your result in many styles and moods",
      "Badges, What if? sliders, and a barkada challenge with friends",
      "Printable reports of your grades for your own reference",
    ],
    tags: ["Education", "Calculator", "No sign-up"],
    icon: gwaIcon,
    card: gwaCard,
    screenshots: [
      {
        src: gwaShot1,
        alt: "The calculator with a GWA of 1.438 and its honor",
      },
      { src: gwaShot2, alt: "Making a share image of a result" },
      { src: gwaShot3, alt: "A barkada challenge on the leaderboard" },
      { src: gwaShot4, alt: "Achievements and badges" },
      { src: gwaShot5, alt: "What if? sliders for future grades" },
      { src: gwaShot6, alt: "A cheer for a better GWA than last term" },
    ],
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    url: "https://expense-tracker.yjaphzs.xyz",
    host: "expense-tracker.yjaphzs.xyz",
    summary:
      "Track your income and expenses across wallets, with budgets and charts.",
    description:
      "Log what comes in and goes out of your cash and e-wallets, set monthly budgets, and let recurring bills add themselves. Charts show where your money goes. It works offline in your browser; sign in to save your data and sync across devices.",
    highlights: [
      "Income and expenses across cash and e-wallets, with transfers",
      "Monthly budgets, overall and per category",
      "Recurring transactions that add themselves when due",
      "Charts and rankings of where your money goes",
      "Export to Excel or CSV, or print a report",
    ],
    tags: ["Finance", "Budgeting", "Works offline"],
    icon: etIcon,
    card: etCard,
    screenshots: [
      { src: etShot1, alt: "Total balance and wallets" },
      { src: etShot2, alt: "The list of expenses" },
      { src: etShot3, alt: "A chart of this week's expense categories" },
      { src: etShot4, alt: "Monthly budgets and recent transactions" },
      { src: etShot5, alt: "Recurring bills and income" },
      { src: etShot6, alt: "Appearance settings with color schemes" },
    ],
  },
]
