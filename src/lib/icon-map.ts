// client/src/pages/Home.tsx の iconMap と同一。
// Astro テンプレート内で `const IconComp = iconMap[tag.icon]; <IconComp className="..." />`
// の形で使う（client:* ディレクティブなしなので静的HTMLとして出力され、JSは配信されない）。
import {
  Code,
  ExternalLink,
  Github,
  X,
  ArrowRight,
  Bot,
  Radio,
  Database,
  Gamepad2,
  Users,
  Brain,
  Award,
  BookOpen,
  Sparkles,
  Shield,
  Swords,
  Hash,
} from "lucide-react";
import type { ComponentType } from "react";

export const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Code,
  ExternalLink,
  Github,
  X,
  ArrowRight,
  Bot,
  Radio,
  Database,
  Gamepad2,
  Users,
  Brain,
  Award,
  BookOpen,
  Sparkles,
  Shield,
  Swords,
  Hash,
};
