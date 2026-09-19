---
workflow: product-launch-video
flow: automation
storyboard: no
message: "Your spare AI tokens should make you money"
destination: readme-embed
aspect: 1920x1080
language: en
length: 30s
angle: value-prop
---

## Intent

A 30s, soundless promo MP4 for the TokenSea landing page, embedded in the
GitHub README. It must sell the one idea — list unused AI credits / included
capacity, earn USD per request, cash out anywhere — in tight visual beats with
English caption-style text. Tone: confident, clean, slightly premium fintech;
matches the landing page brand (purple #7342E2, teal #2A9D8F, deep navy
#192837, cream #F2F2EE, white cards, soft shadows). Autoplays muted + loops in
README, so it must not rely on audio.

## Assets

- ../public/BG.mp4 — 6s blue shield-wave logo loop (brand token); used as
  opening/closing texture or underlay.
- ../src/assets/logo.png — TokenSea logo, used on title and end card.

## Customizations

- Count-up on market stats ($ volume / requests) for a live feel.
- Text-beat cuts on the three steps (Connect key → Autopilot pricing →
  Paid automatically).
- End card mirrors landing CTA ("Start selling").

## Notes

- No narration, no BGM, no captions file — visuals + on-screen text only.
- Copy drawn from the actual landing page so the video and site agree.
- Output `renders/video.mp4` at 1920x1080, H.264, muted-friendly.
