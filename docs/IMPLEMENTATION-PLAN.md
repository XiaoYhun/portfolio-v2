# Portfolio Website — Implementation Plan

**Decision (user, 2026-07-04):** layout = mockup 01 "Ember Panel" (sticky left profile panel + scrolling right column); visual theme = mockup 10 "Violet Neon" (near-black indigo, violet→magenta gradients, neon glow). Fully animated Next.js build.

Content source of truth: `docs/DESIGN-BRIEF.md` (real CV data). Mockup references: `design-mockups/01-ember-panel.html` (structure), `design-mockups/10-violet-neon.html` (skin).

## Stack

- **Next.js 16** (App Router, TypeScript, Turbopack) in `site/`
- **Tailwind CSS v4** (CSS-first config via `@theme`)
- **motion** (Framer Motion API — `motion/react`) for section/scroll animations
- **next-themes** for dark (default) / light theme toggle
- **reactbits** components via shadcn CLI (verified registry endpoints):
  - `npx shadcn@latest add https://reactbits.dev/r/Grainient-TS-TW` — WebGL grainy gradient hero background (dep: `ogl`). Props include colors, distortion, grain, speed; auto-pauses offscreen.
  - `npx shadcn@latest add https://reactbits.dev/r/BorderGlow-TS-TW` — cursor-reactive glowing border for cards (no deps).
  - `npx shadcn@latest add https://reactbits.dev/r/Masonry-TS-TW` — GSAP masonry grid for project imagery (dep: `gsap`). Items: {id, img, url, height}.

## Design tokens (dark, from mockup 10)

```css
--bg:#0a0a14; --bg-alt:#11101e; --panel:#100f1c; --card:#151426; --card-hover:#1a1830;
--border:rgba(139,92,246,0.22); --border-strong:rgba(139,92,246,0.55);
--text:#edeaf6; --text-dim:#948fa8; --text-dimmer:#6b6680;
--violet:#8b5cf6; --magenta:#d946ef;
--violet-glow:rgba(139,92,246,0.35); --magenta-glow:rgba(217,70,239,0.3);
--grad:linear-gradient(135deg,var(--violet),var(--magenta)); --radius:16px;
```

Light theme: keep violet/magenta accents; bg #faf9fc, panel #ffffff, card #f4f2fa, text #17141f, dim #5d5870, borders rgba(139,92,246,0.25). Must stay readable — accents may need darkening (violet #7c3aed).

Fonts: **Space Grotesk** (headings) + **Inter** (body) via `next/font/google`.

## Architecture

```
site/src/
  app/layout.tsx        # fonts, ThemeProvider, metadata
  app/page.tsx          # <ProfilePanel/> + <main> sections
  app/globals.css       # @theme tokens, base styles
  data/content.ts       # ALL text content typed (profile, stats, stack, experience, projects)
  components/
    ProfilePanel.tsx    # sticky left panel: avatar, identity, socials, CTAs, Nav
    Nav.tsx             # scroll-spy nav (IntersectionObserver)
    ThemeToggle.tsx
    sections/Hero.tsx   # Grainient bg + availability chip + headline + CTAs
    sections/Stats.tsx  # animated count-up tiles
    sections/TechStack.tsx
    sections/Experience.tsx
    sections/Projects.tsx  # BorderGlow cards + Masonry gallery
    sections/Contact.tsx
    ui/Grainient.tsx ui/BorderGlow.tsx ui/Masonry.tsx  # from reactbits
    ui/Reveal.tsx       # motion whileInView fade-up wrapper
    ui/GradientText.tsx
```

Sections/IDs (scroll-spy anchors): `home`, `stack`, `experience`, `projects`, `contact`.

## Section specs

- **ProfilePanel** (340px, sticky, full height; top-bar variant under 1024px): avatar with violet-magenta conic ring, name, role, location, socials (GitHub/email/phone), gradient "Hire Me" + outline "Download CV" (links to `/cv.pdf`), nav with icons + glowing active dot, © footer. Panel bg `--panel`, right border `--border`.
- **Hero**: Grainient background (violet/magenta/indigo palette, subtle — text must stay readable; dark overlay gradient on top), chip "Available for new opportunities" with pulsing dot, H1 "Building fast, reliable **web & Web3** products for 7+ years." (bold span in gradient text), summary paragraph, CTAs (View Projects gradient, Get in Touch outline). Staggered entrance animation.
- **Stats**: 4 tiles (7+ Years Experience, 3+ Years Web3, 4 Companies, 10+ Products Shipped), gradient numbers, count-up on first view, BorderGlow or glow-on-hover.
- **TechStack**: 4 groups (Frontend/Backend/Web3/AI) from brief; pills that flip to gradient bg on hover; staggered reveal.
- **Experience**: 4 rows (IP World, UNIBOT, Kyber Network, 2 Clicks Solution) with role, dates, bullets from brief; gradient left-border slide-in on hover; timeline feel.
- **Projects**: cards for XNO.vn, KyberSwap Landing Page, YMart (+ optional UNIBOT suite/KyberSwap work entries) wrapped in BorderGlow; placeholder gradient art (real screenshots later); below cards, a Masonry gallery block with placeholder images (picsum or local gradients) to be swapped for real shots.
- **Contact**: big gradient email link, socials, small print.

## Animation rules

- Use `motion/react` `whileInView` (once: true, margin: -80px) fade-up with slight stagger; 0.5–0.7s ease-out.
- Respect `prefers-reduced-motion` (motion's `useReducedMotion` — disable Grainient animation speed / count-ups).
- Hover micro-interactions ≤200ms. No scroll-jacking.

## Build phases

1. **Scaffold (main loop):** create-next-app, deps, fonts, tokens in globals.css, `data/content.ts`, reactbits installs, empty section stubs so imports compile.
2. **Parallel Sonnet agents (separate files only, no page.tsx edits):**
   - Agent A: ProfilePanel + Nav + ThemeToggle
   - Agent B: Hero + Stats + TechStack (+ Reveal, GradientText helpers)
   - Agent C: Experience + Projects + Contact
3. **Integrate & verify (main loop):** wire page.tsx, `npm run dev`, Chrome walkthrough (scroll-spy, animations, hovers, light theme, mobile width), fix.
4. Later: real project screenshots, cv.pdf asset, SEO/OG meta, deploy (Vercel).
