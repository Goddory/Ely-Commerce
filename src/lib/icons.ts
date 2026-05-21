import {
  BookOpen,
  Calculator,
  PenTool,
  Atom,
  FlaskConical,
  Dna,
  Clock,
  Globe,
  Monitor,
  Scale,
  Factory,
  Tractor,
  TrendingUp,
  Library,
  Target,
  HelpCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  Calculator,
  PenTool,
  Atom,
  FlaskConical,
  Dna,
  Clock,
  Globe,
  Monitor,
  Scale,
  Factory,
  Tractor,
  TrendingUp,
  Library,
  Target,
};

export function resolveIcon(iconName: string): LucideIcon {
  return ICON_MAP[iconName] ?? HelpCircle;
}
