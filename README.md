# TokenSea — Sell spare AI tokens for cash

[![TokenSea promo — sell spare AI tokens for cash](media/promo-poster.png)](media/tokensea-promo.mp4)

<p align="center">
  <b>▶ Click the poster to play the 30s promo · List unused AI API credits or
  included capacity, earn USD per request, and cash out anywhere.</b>
</p>

---

## What is TokenSea?

TokenSea is an **AI surplus marketplace**. Instead of letting prepaid API
credits or included subscription capacity sit idle, you list it on the market:

- **Connect a key** — link an AI API key or provider account. It's encrypted
  per listing and never kept on file.
- **Autopilot pricing** — TokenSea prices your listing to win demand. Set an
  optional minimum; it never goes below it.
- **Paid automatically** — earn per request. USD batches to your wallet at $5
  or after 72 hours.

## Featured on the landing page

- **Market** — live demand: model, winning price per 1M tokens, 24h volume.
- **How it works** — the three-step seller flow.
- **Payouts** — cash out to Revolut, Monzo, Chime, Zelle, Venmo, Cash App,
  Wise, or PayPal. No TokenSea fees to sell.
- **Seller console** — listings, earnings, batches, and withdrawals.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page — hero, market, how it works, payouts, CTA |
| `/pricing` | What's paying — market snapshot, fees, payouts, FAQ |
| `/docs` | Seller guide — connect, pricing, payouts, FAQ |
| `/dashboard` | Seller console — overview, listings, earnings, withdraw |
| `/account` | Sign in / create account |
| `/lookup` | Seller support — look up a batch or payout |

## Tech stack

- [Vite](https://vite.dev) + [React](https://react.dev) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + inline design tokens
- [GSAP](https://gsap.com) scroll animations, [Framer Motion](https://www.framer.com/motion/) menus
- [HyperFrames](https://hyperframes.heygen.com) — promo video composition in [`promo/`](promo/)

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
```

The promo video is rendered from [`promo/index.html`](promo/index.html):

```bash
cd promo
npx hyperframes preview   # studio
npx hyperframes render    # → promo/renders/video.mp4
```

## License

Private repository — all rights reserved.
