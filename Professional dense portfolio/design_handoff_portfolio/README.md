# Handoff: Dense One-Page Developer Portfolio

## Overview
A dense, professional one-page portfolio for **Diep Pham, Senior Fullstack Engineer (React / Web3 / AI)**. Bento-grid layout: hero card, contact/education card, stats card, tech "toolbelt" row with real logos, 3 project cards with an animated hover preview popover, 4 experience cards with tech chips, and an availability footer.

Two visual variants are included; **3a Gradient Premium (light)** is the primary. **3b Aurora Dark (glass)** is an alternate skin of the same layout.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behavior, not production code to copy directly. The task is to **recreate these designs in the target codebase's existing environment** (React/Next.js recommended given the subject's stack) using its established patterns and libraries. If no environment exists yet, Next.js + Tailwind CSS is the natural choice.

`Portfolio Options.dc.html` contains multiple design iterations on one canvas. Implement the sections wrapped in `<div id="3a">` (and optionally `<div id="3b">`). Ignore sections 1a–1d and 2a — earlier explorations.

## Fidelity
**High-fidelity.** Colors, typography, spacing, radii, shadows and interactions are final. Recreate pixel-perfectly.

## Layout (both variants)
Page canvas: max-width **1180px**, centered. Outer container: white (`#fff`) / dark (`#070b16`), border-radius **24px**, padding **28px**.
Root grid: `display:grid; grid-template-columns:repeat(4,1fr); gap:12px;`

Row structure:
1. **Hero** — spans 2 cols. | **Contact + Education** — 1 col. | **Numbers** — 1 col.
2. **Toolbelt** — spans 4 cols.
3. **Projects** — spans 4 cols; inner grid `repeat(3,1fr); gap:12px`.
4. **Experience** — 4 cards, each spans 2 cols (2×2).
5. **Footer CTA** — spans 4 cols.

## Components — 3a Gradient Premium (primary)

### Hero card
- Background: `linear-gradient(135deg, #1d4ed8 0%, #4f46e5 55%, #7c3aed 100%)`, radius 18px, padding 24px 26px, shadow `0 12px 32px rgba(79,70,229,.35)`, white text.
- Avatar tile: 56×56, radius 14px, `rgba(255,255,255,.15)` bg, `1px solid rgba(255,255,255,.35)`, initials "DP" Sora 800 20px.
- Name: Sora 800 28px, line-height 1.1. Subtitle: Sora 600 13px `#c7d7fe` — "Senior Fullstack Engineer · React / Web3 / AI".
- Bio: 12.5px/1.6 `#e0e7ff`.
- Pills row (bottom-anchored, `margin-top:auto`): `rgba(255,255,255,.16)` bg, 11px/600, padding 4px 10px, radius 99px. Copy: "Frontend ownership", "Rapid delivery", "AI-assisted workflows".

### Contact + Education card
- Bg `#f1f5f9`, radius 18px, padding 18px 20px, column flex gap 7px, 12px `#334155`.
- Section labels: IBM Plex Mono 500 10px `#64748b`, letter-spacing .1em, uppercase ("CONTACT", "EDUCATION").
- Content: xiaoyhun@gmail.com · 0839 082 127 · District 10, Ho Chi Minh City · link github.com/XiaoYhun (`#4f46e5`, 600).
- Education: "B.Sc. Information Technology" (600 `#0f172a`), "HCMC University of Science · 2012–2016" (`#64748b`).

### Numbers card
- Bg `#f1f5f9`, radius 18px. Label "NUMBERS" (same label style).
- 2×2 grid, gap 10px. Values: Sora 800 24px with gradient text (`linear-gradient(135deg,#2563eb,#7c3aed)` + background-clip:text). Captions 10.5px `#64748b`.
- Data: 7+ years web dev / 5 years ReactJS / 3+ years Web3 / 10+ apps shipped.
- Footer line (11px `#64748b`, top border `#e2e8f0`): "Also: Photoshop · Scrum · mentoring".

### Toolbelt (tech icons row)
- Bg `#f8fafc`, `1px solid #e2e8f0`, radius 18px, padding 16px 18px. Label "TOOLBELT".
- 15 items, `justify-content:space-between`. Each item: 70px wide column, icon 26×26, label IBM Plex Mono 500 9px `#475569`.
- Hover: white bg, shadow `0 6px 16px rgba(20,40,90,.1)`, `translateY(-3px)`, transition .2s, radius 12px.
- Icons via CDN:
  - devicon: `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-original.svg` (react, typescript, tailwindcss, redux, threejs, solidity, go, python, nodejs, postgresql, redis, vitejs, dotnetcore)
  - simpleicons: `https://cdn.simpleicons.org/{slug}/{hexColor}` (nextdotjs/0f172a, reactquery/FF4154, framer/0055FF)
- Order: React, Next.js, TypeScript, Tailwind, Redux, TanStack, Framer, Three.js, Solidity, Golang, Python, Node.js, PostgreSQL, Redis, Vite.

### Project cards (×3)
- White bg, `1px solid #e2e8f0`, radius 18px, padding 16px 18px, shadow `0 3px 12px rgba(20,40,90,.06)`, cursor pointer, transition all .25s.
- Hover: border `#7c3aed`, shadow `0 14px 32px rgba(124,58,237,.16)`, `translateY(-3px)`.
- Header row: title Sora 700 14.5px `#0f172a` + tag pill (10px/700 `#4f46e5`, bg `linear-gradient(135deg,#eff6ff,#f5f3ff)`, radius 99px, padding 3px 8px).
- Description 11.5px/1.5 `#475569`.
- Footer row: tech icons 16×16 (gap 8px) + external link right-aligned (11px/600 `#4f46e5`) "domain ↗".
- Content:
  1. **Fintech Stock Platform** [Fintech] — "Web platform for Vietnam's stock market — real-time data, charting, portfolio tooling." → xno.vn. Tech: Next.js, TypeScript, TanStack, Tailwind.
  2. **KyberSwap Landing Page** [Web3] — "Animated marketing site for KyberSwap, built and deployed end-to-end." → kyberswap-landingpage.vercel.app. Tech: React, Framer, Three.js, Vite.
  3. **E-commerce Website** [Retail] — "Full storefront built with Next.js and Tailwind CSS." → ymart-delta.vercel.app. Tech: Next.js, Tailwind, React, Vite.

### Project hover popover (key interaction)
- Absolutely positioned above the card: `bottom: calc(100% + 14px); left:50%`, width **420px**, z-index 40.
- Gradient ring: outer wrapper `linear-gradient(135deg,#2563eb,#7c3aed)`, radius 20px, **padding 2px** (ring effect); inner panel `#0f172a`, radius 18px, padding 12px. Shadow `0 30px 70px rgba(50,30,150,.35)`.
- Inside: screenshot area (full width × 214px, radius 12px, overflow hidden — real project screenshot), then title row (Sora 700 14px white + domain in IBM Plex Mono 10px `#a5b4fc`), detail paragraph 11px/1.55 `#94a3b8`, tech chips (bg `#1e293b`, text `#c7d2fe` IBM Plex Mono 10px, radius 8px, padding 4px 9px, 12px icon + label).
- Caret: centered below panel, 9px transparent borders, top color `#5b34d6`.
- Animation: hidden state `opacity:0; visibility:hidden; translateY(10px)`; shown `opacity:1; visibility:visible; translateY(0)`. Transition: `opacity .28s ease, transform .28s cubic-bezier(.2,.8,.2,1), visibility .28s`. Trigger: mouseenter/mouseleave on card.
- Popover detail copy per project is in the HTML (`detail` field in the logic class).

### Experience cards (×4, each spans 2 cols)
- Same card chrome as project cards (white, `#e2e8f0` border, radius 18px, padding 16px 20px).
- Header: "Company · Role" — company Sora 700 14.5px `#0f172a`, role `#4f46e5`; period right-aligned IBM Plex Mono 500 10.5px `#94a3b8`, nowrap.
- Context blurb: 11px italic `#64748b`.
- 4 bullets: 12px/1.55 `#475569`, `padding-left:16px`, gap 3px.
- Tech chip row at bottom (top border `#f1f5f9`, padding-top 8px, `margin-top:auto`): chips bg `#f1f5f9`, `#334155`, IBM Plex Mono 10px, radius 8px, 12px icon.
- Jobs (full bullet text lives in the HTML logic class `jobs3` array):
  1. IP World · Senior Fullstack Engineer · 01/2025 — present (React, Next.js, Golang, Solidity)
  2. UNIBOT · Senior Frontend Engineer · 02/2024 — 12/2024 (React, Tailwind, Solidity, Vite)
  3. Kyber Network · Frontend Engineer · 08/2021 — 01/2024 (React, TypeScript, Vite, Solidity)
  4. 2Clicks Solution · Fullstack Engineer · 04/2016 — 05/2019 (.NET, React, Next.js)

### Footer CTA
- Bg `#0f172a`, radius 18px, padding 16px 24px, flex space-between, text `#e2e8f0`.
- Left: green status dot (9px circle `#4ade80`, glow `box-shadow:0 0 10px #4ade80`) + "Open to senior frontend / fullstack roles" (Sora 600 13px).
- Center: "Coding · Travelling · Movies" (12px `#94a3b8`).
- Right: "Get in touch" button — `linear-gradient(135deg,#2563eb,#7c3aed)`, white Sora 600 12.5px, padding 9px 20px, radius 99px, `mailto:xiaoyhun@gmail.com`. Hover: `filter:brightness(1.15)`.

## Variant 3b Aurora Dark (alternate skin, same layout)
- Container `#070b16` with two decorative radial glow orbs (`pointer-events:none`): top-left cyan `radial-gradient(circle, rgba(34,211,238,.16), transparent 65%)` 480px; top-right violet `rgba(167,139,250,.15)` 520px.
- Cards: `rgba(255,255,255,.04)` bg, `1px solid rgba(255,255,255,.09)`, `backdrop-filter:blur(8px)`.
- Name: gradient text `linear-gradient(100deg,#e0f2fe,#22d3ee 45%,#a78bfa)`. Accent: cyan `#22d3ee`; labels cyan; body `#8da2c0`; headings `#f1f5fb`.
- Icons: monochrome cyan via `https://cdn.simpleicons.org/{slug}/7dd3fc`.
- Project hover: border `rgba(34,211,238,.5)` + glow `0 0 30px rgba(34,211,238,.12)`.
- Popover: `rgba(10,16,30,.92)` + `backdrop-filter:blur(14px)`, border `rgba(34,211,238,.35)`, shadow `0 30px 70px rgba(0,5,20,.6), 0 0 40px rgba(34,211,238,.12)`.
- CTA button: `linear-gradient(135deg,#06b6d4,#8b5cf6)`.

## Interactions & Behavior
- **Project popover**: show on card mouseenter, hide on mouseleave (see specs above). Only one open at a time. On touch devices, substitute tap-to-toggle.
- **Toolbelt icons**: lift + highlight on hover (.2s).
- **Project cards**: lift + colored border/shadow on hover (.25s).
- All links open in new tab (`target="_blank"`) except mailto.
- No routing/nav — single page. Consider popover overflow at viewport top: if implementing responsively, flip popover below the card when near the top edge.

## State Management
- `hoveredProject: string | null` — which project's popover is visible. That's the only state.
- All content is static; drive it from a typed data file (projects[], jobs[], toolbelt[]) mirroring the arrays in the HTML logic class.

## Design Tokens (3a)
- **Colors**: primary gradient `#2563eb→#7c3aed` (135deg); ink `#0f172a`; body `#475569`; muted `#64748b`; faint `#94a3b8`; borders `#e2e8f0`; card alt bg `#f1f5f9` / `#f8fafc`; accent link `#4f46e5`; dark panel `#0f172a`; chip dark `#1e293b`; success `#4ade80`.
- **Fonts** (Google Fonts): Sora (600/700/800 — headings, names, buttons), Public Sans (400–700 — body), IBM Plex Mono (400/500 — labels, periods, chips, domains).
- **Radii**: container 24px; cards 18px; popover 20/18px; icon tiles/screenshot 12–14px; pills/buttons 99px; chips 8px.
- **Spacing**: grid gap 12px; card padding 16–24px; in-card gaps 6–9px.
- **Shadows**: card `0 3px 12px rgba(20,40,90,.06)`; card hover `0 14px 32px rgba(124,58,237,.16)`; hero `0 12px 32px rgba(79,70,229,.35)`; popover `0 30px 70px rgba(50,30,150,.35)`; page `0 20px 50px rgba(20,40,90,.12)`.
- **Motion**: hover transitions .2–.25s; popover .28s with `cubic-bezier(.2,.8,.2,1)`.

## Assets
- Tech logos loaded from CDNs (devicon + simpleicons) — see Toolbelt section for exact URLs. For production, consider self-hosting the SVGs.
- Project screenshots: not included — the design uses drop-zone placeholders. Capture real screenshots of xno.vn, the KyberSwap landing page, and the Ymart storefront at ~1200×630 and place them in the popovers (376×214 display area, `object-fit:cover`).
- Google Fonts import: `family=Sora:wght@400;600;700;800`, `family=IBM+Plex+Mono:wght@400;500`, `family=Public+Sans:wght@400;500;600;700;800`.

## Files
- `Portfolio Options.dc.html` — the design canvas. Sections `#3a` and `#3b` are the deliverables; the logic class at the bottom holds all content data (projects, jobs, toolbelt, icon URL builders).
- `image-slot.js`, `support.js` — prototype runtime helpers; reference only, do not port.
