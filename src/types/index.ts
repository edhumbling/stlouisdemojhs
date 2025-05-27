export interface NavLink {
  label: string;
  path: string;
}

export interface DropdownItem {
  label: string;
  path: string;
  description: string;
  image?: string;
  icon?: string;
}

export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  image?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
}

export interface StaffMember {
  id: number;
  name: string;
  position: string;
  department: string;
  image: string;
  bio: string;
}

export interface Program {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  image?: string;
}