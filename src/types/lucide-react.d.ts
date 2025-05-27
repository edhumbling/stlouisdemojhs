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

  // Add other icons as needed
  const lucideReact: {
    [key: string]: LucideIcon;
  };

  export default lucideReact;
}
