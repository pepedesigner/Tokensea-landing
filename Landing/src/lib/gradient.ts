// Single source for the brand accent gradient, shared by GradientText (flowing
// headline accent) and ScrollProgress (top bar) so the page uses one accent.
export const ACCENT_GRADIENT_COLORS = [
  '#dc2626',
  '#ea580c',
  '#eab308',
  '#16a34a',
  '#0891b2',
  '#2563eb',
  '#7c3aed',
]

export const ACCENT_GRADIENT_CSS = `linear-gradient(90deg, ${[
  ...ACCENT_GRADIENT_COLORS,
  ACCENT_GRADIENT_COLORS[0],
].join(', ')})`
