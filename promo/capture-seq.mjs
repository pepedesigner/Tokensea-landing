import { chromium } from 'playwright'
import fs from 'fs'

const BASE = 'http://localhost:5199'
const out = '/Users/qumo/Documents/Others/Tokensea/promo/assets/webseq'
fs.mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.route('**/BG.mp4', (route) => route.abort())

await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2000)

// find positions of key sections in natural flow
const secs = await page.evaluate(() => {
  const out = {}
  for (const sel of ['[data-features-heading]', '#market', '[data-model-meta]']) {
    const el = document.querySelector(sel)
    if (el) out[sel] = el.getBoundingClientRect().top + window.scrollY
  }
  out.docH = document.documentElement.scrollHeight
  return out
})
console.log('sections:', JSON.stringify(secs))

// walk scroll positions and screenshot each
const stops = [0, 700, 1500, 2300, secs['#market'] ?? 2800, (secs['#market'] ?? 2800) + 400]
let i = 0
for (const y of stops) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await page.waitForTimeout(900) // let scroll-triggered animations settle
  await page.screenshot({ path: `${out}/seq-${String(i).padStart(2, '0')}-y${y}.png` })
  console.log('shot', i, 'y=', y)
  i++
}
await browser.close()
