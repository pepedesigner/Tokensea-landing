import { chromium } from 'playwright'
import fs from 'fs'

const BASE = 'http://localhost:5199'
const out = '/Users/qumo/Documents/Others/Tokensea/promo/assets'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

// block the background video (it would make the page extremely tall/stuttery in capture)
await page.route('**/BG.mp4', (route) => route.abort())

await page.goto(BASE + '/', { waitUntil: 'networkidle', timeout: 60000 })
await page.waitForTimeout(2500)

// capture hero region first (above the fold)
const hero = await page.screenshot({ path: `${out}/web-hero.png`, clip: { x: 0, y: 0, width: 1920, height: 1080 } })
console.log('hero shot bytes:', fs.statSync(`${out}/web-hero.png`).size)

// full page screenshot at 1920 width (scroll through)
const full = await page.screenshot({ path: `${out}/web-full.png`, fullPage: true })
const buf = fs.statSync(`${out}/web-full.png`)
console.log('full page bytes:', buf.size)

const dims = await page.evaluate(() => ({ sw: window.innerWidth, sh: window.innerHeight, docH: document.documentElement.scrollHeight }))
console.log('dims:', JSON.stringify(dims))

// also capture the market section & how-it-works for closeups
const sections = [
  ['#market', `${out}/web-market.png`],
]
for (const [sel, path] of sections) {
  const el = await page.$(sel)
  if (el) {
    await el.screenshot({ path })
    console.log('shot', path, fs.statSync(path).size)
  } else console.log('missing', sel)
}

await browser.close()
