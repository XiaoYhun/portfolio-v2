# Portfolio Design Brief — Diep Pham

## Owner content (from CV)

- **Name:** Diep Pham — Fullstack Engineer, Ho Chi Minh City
- **Contact:** xiaoyhun@gmail.com · github.com/XiaoYhun · 0839082127
- **Positioning:** 7+ years web development — 5y ReactJS, 2y fullstack (Python/Golang/Node.js), 3+y Web3 (EVM smart-contract integration with ethers.js/wagmi)
- **Extra:** AI-powered development (RAG, vector DBs, embeddings, LLM integration), web performance optimization (Core Web Vitals, bundle size, caching), AI-assisted workflows (Cursor, Claude Code)

### Tech stack (group for display)
- **Frontend:** React, Next.js, TypeScript, JavaScript, Tailwind CSS, Redux, TanStack Query, Zustand, MUI, Chakra UI, Framer Motion, Three.js, HTML/CSS animation
- **Backend:** Python (FastAPI), Golang, Node.js, REST APIs, PostgreSQL, Redis
- **Web3:** ethers.js, wagmi, EVM smart contracts, wallet connectivity, on-chain flows
- **AI:** RAG, vector databases, embeddings, prompt engineering, LLM integration

### Work experience (newest first)
1. **IP World** — Senior Fullstack Engineer · 1/2025–Present · https://ip.world — SocialFi/memecoin launch platform on Story Protocol. React/Next.js frontend, wallet + smart-contract integration, Golang backend contributions.
2. **UNIBOT** — Senior Frontend Engineer · 02/2024–12/2024 — Web3 apps: revshare.unibot.app, perps.unibot.app, unisol.app/swap, unibot.app. Owned most frontend, React + Tailwind + ethers.js.
3. **Kyber Network** — Frontend Engineer · 08/2021–01/2024 — KyberSwap: TradingView chart integration, KyberDAO (stake/migrate/vote), KyberAI insights dashboard, landing page, Vite migration + performance.
4. **2 Clicks Solution** — Fullstack Engineer · 04/2016–05/2019 — Automotive eCommerce site from scratch (React), ticket-managing + form-builder projects, Scrum master. .NET/React/Next.js.

### Personal projects / showcases
- **XNO.vn** — Fintech stock platform for Vietnam's market · https://xno.vn/
- **KyberSwap Landing Page** — https://kyberswap-landingpage.vercel.app/
- **YMart** — E-commerce with Next.js + Tailwind · https://ymart-delta.vercel.app/

### Education
HCMC University of Science — Information Technology (2012–2016)

## Design direction (from USER-PLAN + reference review)

- **Layout inspiration:** PortfolioHub template — sticky left profile panel, right column scrolls. User likes this.
- **Content structure inspiration:** Fastfolio — hero → tech stack → projects (live/source links) → experience list → contact/CV. NO pricing, NO workflow-process, NO testimonials/FAQ sections.
- **Theme:** dark primary, *slightly* warm — user feedback (2026-07-04): the first batch was TOO warm. Correct recipe: neutral dark charcoal base (#141414–#1a1918 range, barely-warm undertone), neutral warm-gray text (#e8e6e2-ish), and ONE restrained warm accent (muted amber/copper) used sparingly — links, highlights, small details only. No orange-saturated backgrounds, cards, or big gradients. Light theme is a bonus for final build.
- **Style:** clean, content-focused, animation-rich but modern/subtle.
- **Animation sources for final build (reactbits.dev):** Grainient background, Border-glow on box hover, Masonry for project images.

## Mockup phase rules

- 5 standalone HTML files in `design-mockups/`, no build step, system/Google fonts via CDN allowed.
- Basic animation only (CSS transitions, subtle gradient movement, hover states). Full animation comes in the Next.js phase.
- All use the real CV content above. Placeholder blocks/gradients for project images.
- Each file must render well at 1440px wide and be readable at mobile widths.

## The directions

Round 1 survivors (kept as-is for comparison):
1. **01-ember-panel.html — "Ember Panel"**: PortfolioHub layout (sticky left profile card) + Fastfolio content order. Warm charcoal, amber/copper accent. (Round-1 warmth — warmer than the new target palette.)
4. **04-terminal.html — "Warm Terminal"**: monospace developer-brand, gruvbox-warm palette, code-comment section headers. (Round-1 warmth.)

Round 2 (02/03/05 removed: too warm; 06/07/08 removed: too alike / too flat — user wants more *addictive* visuals).

Round 3 — variants of the 01 "Ember Panel" LAYOUT (sticky left profile panel + scrolling right column with Fastfolio content order), each with a different color set and styling personality, all bolder/more memorable than round 2:
9. **09-emerald-glass.html — "Emerald Glass"**: deep green-black base, emerald/mint accents, glassy translucent cards with backdrop blur, soft emerald glows, gradient mesh in hero.
10. **10-violet-neon.html — "Violet Neon"**: near-black indigo base, electric violet→magenta gradient accents, neon glow borders, vivid animated hero gradient, glowing stat numbers.
11. **11-mono-lime.html — "Mono Lime"**: strict black/white high-contrast brutalist-modern, oversized type, one electric lime accent, sharp corners, inverted hover states (lime fill).
12. **12-ocean-steel.html — "Ocean Steel"**: cool slate/steel blue base, cyan/ice accents, aurora-like cool gradient in hero, frosted cards, precise thin borders — techy and calm.
