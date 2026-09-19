# TokenSea — Landing

The marketing site and seller console for TokenSea. This directory is the app
root; see the [root README](../README.md) for the project overview, the design
system and deployment notes.

## Layout

| Path | What it is |
| --- | --- |
| `src/pages/` | Route components — home, pricing, docs, dashboard, account, lookup |
| `src/components/` | Page sections and shared building blocks |
| `src/components/ui/` | Shared controls — `Button`, `Input`, `Badge`, `Card`, `Tabs` |
| `src/index.css` | Tailwind v4 `@theme` design tokens (palette, 0px radius, fonts) |
| `public/` | Static assets served as-is — hero video, favicon, social card |
| `promo/` | HyperFrames composition for the promo video |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Deployment

This directory is deployed to the **tokensea-landing** Vercel project:

```bash
vercel --prod
```

`vercel.json` rewrites every route to `index.html` so client-side routing works
on refresh.
