import gwaIcon from "@/assets/images/gwa-calculator/icon.jpg"
import gwaBg from "@/assets/images/gwa-calculator/bg.jpg"
import gwaScreenshot1 from "@/assets/images/gwa-calculator/screenshots/screenshot1.png"
import gwaScreenshot2 from "@/assets/images/gwa-calculator/screenshots/screenshot2.png"
import gwaScreenshot3 from "@/assets/images/gwa-calculator/screenshots/screenshot3.png"
import gwaScreenshot4 from "@/assets/images/gwa-calculator/screenshots/screenshot4.png"
import gwaScreenshot5 from "@/assets/images/gwa-calculator/screenshots/screenshot5.png"
import gwaScreenshot6 from "@/assets/images/gwa-calculator/screenshots/screenshot6.png"

import expenseTrackerIcon from "@/assets/images/expense-tracker/icon.jpg"
import expenseTrackerBg from "@/assets/images/expense-tracker/bg.jpg"
import expenseTrackerScreenshot1 from "@/assets/images/expense-tracker/screenshots/screenshot1.png"
import expenseTrackerScreenshot2 from "@/assets/images/expense-tracker/screenshots/screenshot2.png"
import expenseTrackerScreenshot3 from "@/assets/images/expense-tracker/screenshots/screenshot3.png"
import expenseTrackerScreenshot4 from "@/assets/images/expense-tracker/screenshots/screenshot4.png"
import expenseTrackerScreenshot5 from "@/assets/images/expense-tracker/screenshots/screenshot5.png"
import expenseTrackerScreenshot6 from "@/assets/images/expense-tracker/screenshots/screenshot6.png"

export interface AppItem {
  name: string
  description: string
  url: string
  tags: string[]
  screenshots: string[]
  icon: string
  bg: string
}

export const apps: AppItem[] = [
  {
    name: "GWA Calculator",
    description:
      "Calculate your General Weighted Average (GWA) easily. Add semesters, subjects, and get your cumulative GWA instantly.",
    url: "https://gwa-calculator.yjaphzs.xyz",
    tags: ["Education", "Calculator"],
    screenshots: [
      gwaScreenshot1,
      gwaScreenshot2,
      gwaScreenshot3,
      gwaScreenshot4,
      gwaScreenshot5,
      gwaScreenshot6,
    ],
    icon: gwaIcon,
    bg: gwaBg,
  },
  {
    name: "Expense Tracker",
    description:
      "Track your daily expenses and manage your budget effectively.",
    url: "https://expense-tracker.yjaphzs.xyz",
    tags: ["Finance", "Productivity"],
    screenshots: [
      expenseTrackerScreenshot1,
      expenseTrackerScreenshot2,
      expenseTrackerScreenshot3,
      expenseTrackerScreenshot4,
      expenseTrackerScreenshot5,
      expenseTrackerScreenshot6,
    ],
    icon: expenseTrackerIcon,
    bg: expenseTrackerBg,
  },
]
