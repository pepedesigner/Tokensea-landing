<p align="center">
  <img src="Landing/media/logo.png" alt="TokenSea" width="88" />
</p>

<h1 align="center">TokenSea</h1>

<p align="center"><b>Sell your spare AI tokens for cash.</b></p>

<p align="center">
  Marketing site and seller console for the TokenSea AI surplus marketplace.
</p>

<p align="center">
  <a href="Landing/media/tokensea-promo.mp4">
    <img src="Landing/media/promo-poster.png" alt="TokenSea promo — sell spare AI tokens for cash" width="720" />
  </a>
</p>

<p align="center">
  <b>▶ Click the poster to play the 30s promo</b>
</p>

---

## What is TokenSea?

TokenSea is an **AI surplus marketplace**. Instead of letting prepaid API
credits or included subscription capacity sit idle, sellers list it on the
market and earn USD while buyers route their requests through it.

- **Connect a key** — link an AI API key or provider account. It is encrypted
  per listing and never kept on file.
- **Autopilot pricing** — TokenSea prices your listing to win demand. Set an
  optional minimum; it never goes below it.
- **Paid automatically** — earn per request. USD batches to your wallet at $5
  or after 72 hours.

## What is in this repository

| Path | What it is |
| --- | --- |
| `Landing/` | The site: a Vite + React single-page app (routes, components, design tokens) |
| `Landing/promo/` | HyperFrames composition that renders the 30s promo video |
| `Landing/public/` | Static assets served as-is — hero video, favicon, social card |
| `Landing/media/` | Stills used by this README and the promo poster |

`Dashboard/` is a separate product with its own repository. It can sit alongside
this one locally, and is git-ignored here.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page — hero, live market, how it works, payouts, CTA |
| `/pricing` | What's paying — market snapshot, fees, payouts, FAQ |
| `/docs` | Seller guide — connect a key, pricing, payouts, FAQ |
| `/dashboard` | Seller console — overview, listings, earnings, withdraw |
| `/account` | Sign in / create account |
| `/lookup` | Seller support — look up a batch or payout |

## Tech stack

- [Vite](https://vite.dev) + [React](https://react.dev) 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-first `@theme` token layer
- [GSAP](https://gsap.com) + ScrollTrigger for scroll animation,
  [Framer Motion](https://www.framer.com/motion/) for the mobile menu
- [lucide-react](https://lucide.dev) icons
- [HyperFrames](https://hyperframes.heygen.com) for the promo video composition

## Design system

The UI follows the shared TokenSea "Orbio" visual language — the same one the
Dashboard uses:

- **0px corners everywhere** — square, terminal-like geometry with no rounding
- **Palette** — paper `#faf8f4`, ink `#14110e`, bronze `#ba905c`,
  neon lime `#c9ff3f`
- **Type** — Manrope for UI and headings, JetBrains Mono for labels, IDs and
  numerals
- **Micro-labels** — uppercase mono badges with a neon-lime tint

Tokens are declared once in `Landing/src/index.css` (`@theme`), and the shared
controls built on them live in `Landing/src/components/ui/` — `Button`,
`Input`, `Badge`, `Card` and `Tabs`.

## Getting started

```bash
cd Landing
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Promo video

The promo is rendered from `Landing/promo/index.html`:

```bash
cd Landing/promo
npx hyperframes preview   # studio
npx hyperframes render    # -> promo/renders/video.mp4
```

## Deployment

The site is a static SPA deployed to Vercel as the **tokensea-landing** project
(production: <https://tokensea-landing.vercel.app>). `Landing/vercel.json`
rewrites every route to `index.html` so client-side routing works on refresh.

```bash
cd Landing
vercel --prod
```

## License

Private repository — all rights reserved.
