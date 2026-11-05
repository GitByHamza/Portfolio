import type { OfferKey } from './pricing.ts'

export const offerIndex: { key: OfferKey; slug: string; name: string; description: string; demo: string }[] = [
  { key: 'tech', slug: 'tech-retail', name: 'Tech Retail OS', description: 'An online store and back office for computer, gaming and CCTV shops, with PC compatibility checks, branch inventory and serial-number warranty tracking.', demo: 'https://store-demo-eight.vercel.app/?mode=pc' },
  { key: 'laptop', slug: 'laptop-retail', name: 'Laptop Retail OS', description: 'A retail system for new, used and imported laptop dealers, with condition grades, battery health, RAM and SSD upgrades, and WhatsApp orders.', demo: 'https://store-demo-eight.vercel.app/?mode=laptop' },
  { key: 'console', slug: 'console-retail', name: 'Console & Games Retail OS', description: 'A retail system for console and game shops, with trade-in quotes, condition labels, serial warranty records and stock across branches.', demo: 'https://console-store-demo.vercel.app/' },
]
