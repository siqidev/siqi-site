// client/src/pages/Home.tsx の accent*Class マップと同一。
// Tailwind JITは動的クラス名を検出できないため、完全なクラス名を返す。
export const accentTextClass: Record<string, string> = {
  "neon-magenta": "text-neon-magenta",
  primary: "text-primary",
  "neon-amber": "text-neon-amber",
  "neon-cyan": "text-neon-cyan",
};

export const accentCardClass: Record<string, string> = {
  "neon-magenta": "border-neon-magenta/25 hover:border-neon-magenta/50",
  primary: "border-primary/25 hover:border-primary/45",
  "neon-amber": "border-neon-amber/25 hover:border-neon-amber/45",
  "neon-cyan": "border-neon-cyan/25 hover:border-neon-cyan/45",
};

export const accentBadgeClass: Record<string, string> = {
  "neon-magenta": "border-neon-magenta/45 text-neon-magenta",
  primary: "border-primary/45 text-primary",
  "neon-amber": "border-neon-amber/45 text-neon-amber",
  "neon-cyan": "border-neon-cyan/45 text-neon-cyan",
};

export const accentLineClass: Record<string, string> = {
  "neon-magenta": "bg-neon-magenta/70",
  primary: "bg-primary/70",
  "neon-amber": "bg-neon-amber/70",
  "neon-cyan": "bg-neon-cyan/70",
};
