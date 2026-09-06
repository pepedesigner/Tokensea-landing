import { chromium } from 'playwright'
import fs from 'fs'

const BASE = 'http://localhost:5199'
const out = '/Users/qumo/Documents/Others/Tokensea/promo/assets'
fs.mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.route('**/BG.mp4', (route) => route.abort())

await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2000)

// Hide decorative floating chips/bubbles so the market table reads clean.
await page.evaluate(() => {
  const hide = (sel) => document.querySelectorAll(sel).forEach((el) => (el.style.opacity = '0'))
  hide('[data-model-chip]')
  hide('[data-model-bubble]')
  hide('[data-models-watermark]')
})

// scroll to the #market card area (y 1736 in natural flow), then find the white card top
await page.evaluate(() => window.scrollTo(0, 1736))
await page.waitForTimeout(1500)

const card = await page.evaluate(() => {
  const el = document.querySelector('#market [data-models-card]')
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { top: r.top, left: r.left, w: r.width, h: r.height }
})
console.log('card rect:', JSON.stringify(card))

// capture market card cleanly
if (card) {
  const el = await page.$('#market [data-models-card]')
  await el.screenshot({ path: `${out}/web-market-clean.png` })
  console.log('market-clean saved', fs.statSync(`${out}/web-market-clean.png`).size)
}
await browser.close()
