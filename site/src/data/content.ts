// Icon URL helpers
const DEV = (n: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${n}/${n}-original.svg`;
const SI = (slug: string, hex: string) => `https://cdn.simpleicons.org/${slug}/${hex}`;

export interface TechIcon {
  l: string;
  /** light-theme icon (toolbelt / project card footer / experience chips) */
  ia: string;
  /** dark-panel icon (project popover chips) */
  ib: string;
}

const T: Record<string, TechIcon> = {
  "React": { l: "React", ia: DEV("react"), ib: SI("react", "7dd3fc") },
  "Next.js": { l: "Next.js", ia: SI("nextdotjs", "0f172a"), ib: SI("nextdotjs", "7dd3fc") },
  "TypeScript": { l: "TypeScript", ia: DEV("typescript"), ib: SI("typescript", "7dd3fc") },
  "Tailwind": { l: "Tailwind", ia: DEV("tailwindcss"), ib: SI("tailwindcss", "7dd3fc") },
  "Redux": { l: "Redux", ia: DEV("redux"), ib: SI("redux", "7dd3fc") },
  "TanStack": { l: "TanStack", ia: SI("reactquery", "FF4154"), ib: SI("reactquery", "7dd3fc") },
  "Framer": { l: "Framer", ia: SI("framer", "0055FF"), ib: SI("framer", "7dd3fc") },
  "Golang": { l: "Golang", ia: DEV("go"), ib: SI("go", "7dd3fc") },
  "Python": { l: "Python", ia: DEV("python"), ib: SI("python", "7dd3fc") },
  "Node.js": { l: "Node.js", ia: DEV("nodejs"), ib: SI("nodedotjs", "7dd3fc") },
  "PostgreSQL": { l: "PostgreSQL", ia: DEV("postgresql"), ib: SI("postgresql", "7dd3fc") },
  "Redis": { l: "Redis", ia: DEV("redis"), ib: SI("redis", "7dd3fc") },
  "Vite": { l: "Vite", ia: DEV("vitejs"), ib: SI("vite", "7dd3fc") },
  ".NET": { l: ".NET", ia: DEV("dotnetcore"), ib: SI("dotnet", "7dd3fc") },
};

const chip = (names: string[]): TechIcon[] => names.map((l) => T[l]);

export const techIcon = (label: string): TechIcon | undefined => T[label];

export const profile = {
  name: "Diep Pham",
  initials: "DP",
  title: "Senior Fullstack Engineer",
  subtitle: "Senior Fullstack Engineer · React / Web3 / AI",
  bio: "7+ years shipping fast, clean frontends and the backends behind them. 3+ years wiring EVM smart contracts into React apps. Performance obsessive — rendering efficiency, bundle size, Core Web Vitals.",
  pills: ["Frontend ownership", "Rapid delivery", "AI-assisted workflows"],
};

export const contact = {
  email: "xiaoyhun@gmail.com",
  phone: "0839 082 127",
  location: "District 10, Ho Chi Minh City",
  github: "https://github.com/XiaoYhun",
  githubLabel: "github.com/XiaoYhun",
};

export const education = {
  degree: "B.Sc. Information Technology",
  school: "HCMC University of Science · 2012–2016",
};

export const stats = {
  items: [
    { value: "7+", caption: "years web dev" },
    { value: "5", caption: "years ReactJS" },
    { value: "3+", caption: "years Web3" },
    { value: "10+", caption: "apps shipped" },
  ],
  also: "Also: Photoshop · Scrum · mentoring",
};

export const toolbelt: TechIcon[] = chip([
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Redux",
  "TanStack",
  "Framer",
  "Golang",
  "Python",
  "Node.js",
  "PostgreSQL",
  "Redis",
  "Vite",
]);

export interface Project {
  name: string;
  tag: string;
  desc: string;
  detail: string;
  url: string;
  link: string;
  tech: TechIcon[];
  /** Optional — detail view simply omits the image block when there is none. */
  screenshot?: string;
  company?: string;
}

export const projects: Project[] = [
  {
    name: "Fintech Stock Platform",
    tag: "Fintech",
    desc: "Web platform for Vietnam's stock market — real-time data, charting, portfolio tooling.",
    detail:
      "Real-time market data feeds, TradingView-grade charting, watchlists and portfolio analytics for VN-market retail investors.",
    url: "https://xno.vn/",
    link: "xno.vn",
    tech: chip(["Next.js", "TypeScript", "TanStack", "Tailwind"]),
    screenshot: "/projects/xno.png",
  },
  {
    name: "KyberSwap Landing Page",
    tag: "Web3",
    desc: "Animated marketing site for KyberSwap, built and deployed end-to-end.",
    detail:
      "Scroll-driven animations and interactive hero built with Framer Motion; deployed as the dev version of the official KyberSwap landing.",
    url: "https://kyberswap-landingpage.vercel.app/",
    link: "kyberswap-landingpage.vercel.app",
    tech: chip(["React", "Framer", "Vite"]),
    screenshot: "/projects/kyberswap.png",
    company: "Kyber Network",
  },
  {
    name: "E-commerce Website",
    tag: "Retail",
    desc: "Full storefront built with Next.js and Tailwind CSS.",
    detail:
      "Product catalog, cart and checkout flows with SSR pages, optimized images and a fully responsive storefront.",
    url: "https://ymart-delta.vercel.app/",
    link: "ymart-delta.vercel.app",
    tech: chip(["Next.js", "Tailwind", "React", "Vite"]),
    screenshot: "/projects/ymart.png",
  },
  // Shipped at work — every remaining live URL listed in the CV, so the grid
  // covers the whole link surface rather than just the "personal project" three.
  {
    name: "IP World Platform",
    tag: "Web3",
    desc: "SocialFi & memecoin launch platform on Story Protocol.",
    detail:
      "Turns memes, brands and cultural content into programmable, tradable on-chain assets. Wallet connectivity, smart-contract interactions and on-chain token-creation flows, with backend and Web3 infrastructure in Golang.",
    url: "https://ip.world",
    link: "ip.world",
    tech: chip(["React", "Next.js", "Golang"]),
    company: "IP World",
  },
  {
    name: "Unibot Revshare",
    tag: "Web3",
    desc: "Revenue-share dashboard for Unibot holders.",
    detail:
      "Holder revenue-distribution dashboard, one of the Web3 frontends built and maintained with React and ethers.js across the Unibot suite.",
    url: "https://revshare.unibot.app",
    link: "revshare.unibot.app",
    tech: chip(["React", "Tailwind", "Vite"]),
    company: "UNIBOT",
  },
  {
    name: "Unibot Perps",
    tag: "Web3",
    desc: "Perpetuals trading interface.",
    detail:
      "Perpetual-futures trading UI for the Unibot ecosystem, built with React and ethers.js on a clean, scalable ReactJS + TailwindCSS codebase.",
    url: "https://perps.unibot.app",
    link: "perps.unibot.app",
    tech: chip(["React", "Tailwind", "Vite"]),
    company: "UNIBOT",
  },
  {
    name: "Unisol Swap",
    tag: "Web3",
    desc: "Swap product on Solana.",
    detail:
      "Token-swap frontend extending the Unibot product family onto Solana, sharing its React + TailwindCSS foundations.",
    url: "https://unisol.app/swap",
    link: "unisol.app/swap",
    tech: chip(["React", "Tailwind", "Vite"]),
    company: "UNIBOT",
  },
  {
    name: "unibot.app",
    tag: "Web3",
    desc: "Main product site for the Telegram trading bot.",
    detail:
      "The primary product surface for Unibot's Telegram-native DeFi trading suite, spanning its EVM and Solana product lines.",
    url: "https://unibot.app",
    link: "unibot.app",
    tech: chip(["React", "Tailwind", "Vite"]),
    company: "UNIBOT",
  },
];

export const personalProjects: Project[] = [
  {
    name: "This Portfolio",
    tag: "Personal",
    desc: "The site you're looking at — a dense bento portfolio.",
    detail:
      "Single-page bento layout with a switchable view system, hover previews and spring animations. Built with Next.js 16, Tailwind CSS 4 and Motion, developed AI-assisted with Claude Code.",
    url: "https://github.com/XiaoYhun",
    link: "github.com/XiaoYhun",
    tech: chip(["Next.js", "TypeScript", "Tailwind", "Framer"]),
    screenshot: "/projects/portfolio.png",
  },
];

export interface CompanyProduct {
  name: string;
  desc: string;
  tech: TechIcon[];
  url?: string;
  link?: string;
  projectName?: string;
}

export const companyProducts: Record<string, CompanyProduct[]> = {
  "IP World": [
    {
      name: "IP World Platform",
      desc: "SocialFi & memecoin launch platform on Story Protocol — wallet connectivity, smart-contract interactions and on-chain token-creation flows.",
      url: "https://ipworld.vercel.app",
      link: "ip.world",
      tech: chip(["React", "Next.js", "Golang"]),
      projectName: "IP World Platform",
    },
  ],
  "UNIBOT": [
    {
      name: "Unibot Revshare",
      desc: "Revenue-share dashboard for Unibot holders.",
      url: "https://revshare.unibot.app",
      link: "revshare.unibot.app",
      tech: chip(["React", "Tailwind", "Vite"]),
      projectName: "Unibot Revshare",
    },
    {
      name: "Unibot Perps",
      desc: "Perpetuals trading interface.",
      url: "https://perps.unibot.app",
      link: "perps.unibot.app",
      tech: chip(["React", "Tailwind", "Vite"]),
      projectName: "Unibot Perps",
    },
    {
      name: "Unisol Swap",
      desc: "Swap product on Solana.",
      url: "https://unisol.app/swap",
      link: "unisol.app/swap",
      tech: chip(["React", "Tailwind", "Vite"]),
      projectName: "Unisol Swap",
    },
    {
      name: "unibot.app",
      desc: "Main product site for the Telegram trading bot.",
      url: "https://unibot.app",
      link: "unibot.app",
      tech: chip(["React", "Tailwind", "Vite"]),
      projectName: "unibot.app",
    },
  ],
  "Kyber Network": [
    {
      name: "KyberSwap DEX",
      desc: "TradingView chart UI and KyberDAO stake / migrate / vote pages.",
      tech: chip(["React", "TypeScript", "Vite"]),
    },
    {
      name: "KyberAI",
      desc: "AI-powered token-insights dashboard (deprecated post-exploit).",
      tech: chip(["React", "TypeScript"]),
    },
    {
      name: "KyberSwap Landing Page",
      desc: "Animated marketing site, built and deployed end-to-end.",
      url: "https://kyberswap-landingpage.vercel.app/",
      link: "kyberswap-landingpage.vercel.app",
      tech: chip(["React", "Framer", "Vite"]),
      projectName: "KyberSwap Landing Page",
    },
  ],
  "2Clicks Solution": [
    {
      name: "Automotive e-commerce frontend",
      desc: "Storefront built from scratch with React.",
      tech: chip(["React", ".NET"]),
    },
    {
      name: "Issue-ticket management site",
      desc: "Internal tooling for ticket workflows.",
      tech: chip([".NET", "React"]),
    },
    {
      name: "Form-builder site",
      desc: "Custom form-builder product.",
      tech: chip([".NET", "React"]),
    },
  ],
};

export interface Job {
  company: string;
  role: string;
  period: string;
  blurb: string;
  bullets: [string, string, string, string];
  tech: TechIcon[];
  /** company website */
  url: string;
  link: string;
}

export const jobs: Job[] = [
  {
    company: "IP World",
    role: "Senior Fullstack Engineer",
    period: "01/2025 — present",
    blurb:
      "SocialFi & memecoin launch platform on the Story Protocol ecosystem — turning memes, brands and cultural IP into tradable on-chain assets.",
    bullets: [
      "Developed and maintained scalable frontend applications with React.js and Next.js.",
      "Integrated wallet connectivity, smart-contract interactions and on-chain transaction flows for token creation.",
      "Contributed to backend & Web3 infrastructure in Golang — API communication and blockchain data handling.",
      "Owned major frontend tasks end-to-end; used Cursor & Claude Code to turn designs into production UI fast.",
    ],
    tech: chip(["React", "Next.js", "Golang"]),
    url: "https://ipworld.vercel.app",
    link: "ip.world",
  },
  {
    company: "UNIBOT",
    role: "Senior Frontend Engineer",
    period: "02/2024 — 12/2024",
    blurb:
      "Telegram-native DeFi trading suite — bots, perps and swap products across EVM and Solana.",
    bullets: [
      "Built & maintained multiple Web3 apps: revshare.unibot.app, perps.unibot.app, unisol.app/swap, unibot.app.",
      "Owned most frontend work at the company — rapid delivery without compromising code quality.",
      "Specialized in fast ReactJS + TailwindCSS development on clean, scalable codebases.",
      "Collaborated with backend and smart-contract teams for seamless blockchain integration.",
    ],
    tech: chip(["React", "Tailwind", "Vite"]),
    url: "https://unibot.app",
    link: "unibot.app",
  },
  {
    company: "Kyber Network",
    role: "Frontend Engineer",
    period: "08/2021 — 01/2024",
    blurb: "One of the longest-running DEX aggregators in DeFi — KyberSwap.",
    bullets: [
      "Shipped major KyberSwap features: TradingView chart UI, KyberDAO stake / migrate / vote pages.",
      "Built KyberAI — an AI-powered token-insights dashboard (since deprecated post-exploit).",
      "Improved performance: faster load times, migration of the build system to Vite.",
      "Created animated, interactive UI components; integrated APIs and contracts via ethers.js.",
    ],
    tech: chip(["React", "TypeScript", "Vite"]),
    url: "https://kyber.network",
    link: "kyber.network",
  },
  {
    company: "2Clicks Solution",
    role: "Fullstack Engineer",
    period: "04/2016 — 05/2019",
    blurb: "Outsourced product studio — automotive e-commerce and internal tools.",
    bullets: [
      "Built an automotive e-commerce frontend from scratch with React.",
      "Contributed to an issue-ticket management site and a custom form-builder site.",
      "Acted as Scrum master; mentored juniors and unblocked teammates.",
      "Shaped feature roadmaps and future project scope with the team.",
    ],
    tech: chip([".NET", "React", "Next.js"]),
    url: "https://2clicksolutions.com",
    link: "2clicksolutions.com",
  },
];
