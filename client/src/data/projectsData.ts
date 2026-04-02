// プロジェクトメタデータの正本。Home PROJECTSセクション・各ページが参照する。

export interface ProjectTag {
  icon: string; // lucide-react icon名
  labelKey: string;
}

export interface ProjectButton {
  labelKey: string;
  href: string;
  variant: "primary" | "outline";
}

export interface ProjectBadge {
  src: string;
  alt: string;
  href: string;
}

export interface ProjectMeta {
  id: string;
  path: string;
  image?: string;
  titleKey: string;
  descKey: string;
  categoryKey: string;
  version?: string;
  accentColor: string; // tailwind色名（neon-magenta, primary, neon-amber等）
  tags: ProjectTag[];
  buttons: ProjectButton[];
  badges?: ProjectBadge[];
}

export const projects: ProjectMeta[] = [
  {
    id: "avatar-ui",
    path: "/avatarui",
    image: "/images/avatar-ui-demo.gif",
    titleKey: "projects.avatarui.title",
    descKey: "projects.avatarui.desc",
    categoryKey: "projects.avatarui.category",
    version: "v0.5.0",
    accentColor: "neon-magenta",
    tags: [
      { icon: "Bot", labelKey: "projects.avatarui.tag1" },
      { icon: "Database", labelKey: "projects.avatarui.tag2" },
      { icon: "ArrowRight", labelKey: "projects.avatarui.tag3" },
    ],
    buttons: [
      { labelKey: "projects.avatarui.btn1", href: "https://github.com/siqidev/avatar-ui", variant: "primary" },
      { labelKey: "projects.avatarui.btn2", href: "https://github.com/siqidev/avatar-ui", variant: "outline" },
    ],
    badges: [
      { src: "https://orynth.dev/api/badge/avatar-ui?theme=dark&style=default", alt: "Featured on Orynth", href: "https://orynth.dev/projects/avatar-ui" },
      { src: "/images/geckoterminal-logo.png", alt: "GeckoTerminal", href: "https://www.geckoterminal.com/solana/pools/ky7frWSyXRcHKvN7UXyPuhA5rjP1ypDPDJNEHxJubmJ" },
    ],
  },
  {
    id: "spectra",
    path: "/spectra",
    titleKey: "projects.spectra.title",
    descKey: "projects.spectra.desc",
    categoryKey: "projects.spectra.category",
    accentColor: "primary",
    tags: [
      { icon: "Sparkles", labelKey: "projects.spectra.tag1" },
      { icon: "Radio", labelKey: "projects.spectra.tag2" },
      { icon: "Shield", labelKey: "projects.spectra.tag3" },
    ],
    buttons: [
      { labelKey: "projects.spectra.btn1", href: "https://x.com/SCUN7X", variant: "primary" },
    ],
  },
  {
    id: "roblox",
    path: "/roblox",
    titleKey: "projects.roblox.title",
    descKey: "projects.roblox.desc",
    categoryKey: "projects.roblox.category",
    accentColor: "neon-magenta",
    tags: [
      { icon: "Gamepad2", labelKey: "projects.roblox.tag1" },
      { icon: "Swords", labelKey: "projects.roblox.tag2" },
      { icon: "Users", labelKey: "projects.roblox.tag3" },
    ],
    buttons: [
      { labelKey: "projects.roblox.btn1", href: "https://www.roblox.com/games/118630117741072", variant: "primary" },
    ],
  },
  {
    id: "novels",
    path: "/novels",
    titleKey: "projects.novels.title",
    descKey: "projects.novels.desc",
    categoryKey: "projects.novels.category",
    accentColor: "neon-amber",
    tags: [
      { icon: "Award", labelKey: "projects.novels.tag1" },
      { icon: "BookOpen", labelKey: "projects.novels.tag2" },
      { icon: "Brain", labelKey: "projects.novels.tag3" },
    ],
    buttons: [
      { labelKey: "projects.novels.btn1", href: "https://note.com/shinokimio/n/n8a2a3511d9b1", variant: "primary" },
    ],
  },
];
