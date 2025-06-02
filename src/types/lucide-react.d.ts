declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
  }

  export type LucideIcon = ComponentType<LucideProps>;

  export const ArrowLeft: LucideIcon;
  export const GraduationCap: LucideIcon;
  export const Users: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Award: LucideIcon;
  export const Quote: LucideIcon;
  export const Calculator: LucideIcon;
  export const Microscope: LucideIcon;
  export const Globe: LucideIcon;
  export const Lightbulb: LucideIcon;
  export const Computer: LucideIcon;
  export const Palette: LucideIcon;
  export const Music: LucideIcon;
  export const ChevronRight: LucideIcon;
  export const Heart: LucideIcon;
  export const Languages: LucideIcon;
  export const Wrench: LucideIcon;
  export const DollarSign: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Mic: LucideIcon;
  export const FileText: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const Smartphone: LucideIcon;
  export const Code: LucideIcon;
  export const Zap: LucideIcon;
  export const Rocket: LucideIcon;
  export const Library: LucideIcon;
  export const Book: LucideIcon;
  export const Archive: LucideIcon;
  export const Bot: LucideIcon;
  export const MousePointer: LucideIcon;
  export const Wind: LucideIcon;
  export const Mail: LucideIcon;
  export const Calendar: LucideIcon;
  export const FileCheck: LucideIcon;
  export const Repeat: LucideIcon;
  export const Target: LucideIcon;
  export const Play: LucideIcon;

  // Add other icons as needed
  const lucideReact: {
    [key: string]: LucideIcon;
  };

  export default lucideReact;
}
