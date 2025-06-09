import { NavLink, DropdownItem, Event, NewsItem, StaffMember, Program, GalleryImage, Testimonial } from '../types';

export const navLinks: NavLink[] = [
  { label: 'News & Events', path: '/news' },
  { label: 'STEM', path: '/stem' },
  { label: 'Students Hub', path: '/learnhub' },
  { label: 'AI Search', path: '/ai-search' },
  { label: 'Gallery', path: '/gallery' },
];

// School dropdown menu items
export const schoolDropdownItems: DropdownItem[] = [
  {
    label: 'About',
    path: '/about',
    description: 'Learn about our school history, mission, and values',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?updatedAt=1748101842702'
  },
  {
    label: 'Academics',
    path: '/academics',
    description: 'Explore our comprehensive academic programs and curriculum',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6993.HEIC'
  },
  {
    label: 'Admissions',
    path: '/admissions',
    description: 'Learn about our admission process and requirements',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882'
  },
  {
    label: 'Administration',
    path: '/faculty',
    description: 'Meet our dedicated faculty and administrative staff',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-22%20at%2020.45.32_fdbdf1e5.png?updatedAt=1748195389676'
  },
  {
    label: 'Staff Resources',
    path: '/staff-resources',
    description: 'Access curriculum guides, teaching materials, and educational resources',
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    label: 'Alumni Community',
    path: '/alumni',
    description: 'Connect with our 30,000+ graduates and success stories',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

// Contact dropdown menu items
export const contactDropdownItems: DropdownItem[] = [
  {
    label: 'Contact Us',
    path: '/contact',
    description: 'Get in touch with our school administration',
    icon: 'Mail'
  },
  {
    label: 'Schedule Visit',
    path: '/schedule-visit',
    description: 'Book a tour of our campus and facilities',
    icon: 'Calendar'
  },
  {
    label: 'Partner With Us',
    path: '/partner',
    description: 'Collaborate with us through donations and partnerships',
    icon: 'Handshake'
  },
  {
    label: 'Media & Press',
    path: '/media',
    description: 'Press releases, media kit, and news coverage',
    icon: 'Newspaper'
  }
];

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Annual Science Fair',
    date: 'June 15, 2025',
    description: 'Students showcase their innovative science projects with awards for outstanding achievements.',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'Parent-Teacher Conference',
    date: 'July 2, 2025',
    description: 'An opportunity for parents to discuss their child\'s academic progress with teachers.',
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'Sports Day',
    date: 'July 20, 2025',
    description: 'Annual athletics competition featuring various sports and activities for all students.',
    image: 'https://images.pexels.com/photos/296301/pexels-photo-296301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 4,
    title: 'Cultural Festival',
    date: 'August 10, 2025',
    description: 'Celebration of diverse cultures through performances, exhibitions, and food.',
    image: 'https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'St. Louis Demonstration Students Win Regional Math Competition',
    date: 'May 10, 2025',
    summary: 'Our mathematics team secured first place at the regional competition.',
    content: 'We are proud to announce that our talented mathematics team has won first place at the Regional Mathematics Olympiad. The team, consisting of five students from grades 7 and 8, demonstrated exceptional problem-solving skills and mathematical reasoning.',
    image: 'https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 2,
    title: 'New Computer Lab Opens',
    date: 'April 22, 2025',
    summary: 'State-of-the-art computer lab enhances our technology curriculum.',
    content: 'St. Louis Demonstration Junior High School is pleased to announce the opening of our new computer lab equipped with 30 high-performance computers, interactive smart boards, and the latest educational software. This facility will significantly enhance our technology curriculum and provide students with hands-on experience with current technology.',
    image: 'https://images.pexels.com/photos/1181233/pexels-photo-1181233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: 3,
    title: 'School Receives Excellence in Education Award',
    date: 'March 15, 2025',
    summary: 'St. Louis Demonstration JHS recognized for outstanding educational programs.',
    content: 'St. Louis Demonstration Junior High School has been recognized with the Excellence in Education Award for its outstanding academic programs and student achievements. This prestigious award acknowledges our commitment to providing quality education and fostering a supportive learning environment.',
    image: 'https://images.pexels.com/photos/4778611/pexels-photo-4778611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
];

export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: 'Dr. Emily Johnson',
    position: 'Principal',
    department: 'Administration',
    image: 'https://images.pexels.com/photos/5212320/pexels-photo-5212320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Dr. Johnson has been an educator for over 15 years, with a Ph.D. in Educational Leadership. She is dedicated to fostering a supportive learning environment where every student can thrive.'
  },
  {
    id: 2,
    name: 'Mr. David Chen',
    position: 'Vice Principal',
    department: 'Administration',
    image: 'https://images.pexels.com/photos/8422419/pexels-photo-8422419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Mr. Chen has been with St. Louis Demonstration for 8 years and specializes in curriculum development. He works closely with teachers to ensure high-quality educational programs.'
  },
  {
    id: 3,
    name: 'Ms. Sarah Williams',
    position: 'Head of Mathematics',
    department: 'Mathematics',
    image: 'https://images.pexels.com/photos/5905445/pexels-photo-5905445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Ms. Williams holds a Master\'s degree in Mathematics Education and has been teaching for 12 years. Her innovative teaching methods have helped many students develop a love for mathematics.'
  },
  {
    id: 4,
    name: 'Mr. James Rodriguez',
    position: 'Science Coordinator',
    department: 'Science',
    image: 'https://images.pexels.com/photos/8197527/pexels-photo-8197527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Mr. Rodriguez is passionate about making science accessible and exciting for all students. He has led the school\'s science team to multiple regional championships.'
  },
  {
    id: 5,
    name: 'Mrs. Olivia Patel',
    position: 'Language Arts Teacher',
    department: 'Language Arts',
    image: 'https://images.pexels.com/photos/5905902/pexels-photo-5905902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Mrs. Patel specializes in creative writing and literature. She has published several articles on innovative teaching strategies for language arts.'
  },
  {
    id: 6,
    name: 'Mr. Robert Thompson',
    position: 'Physical Education',
    department: 'Athletics',
    image: 'https://images.pexels.com/photos/6326377/pexels-photo-6326377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    bio: 'Coach Thompson has been with St. Louis Demonstration for 10 years. He believes in promoting physical fitness and teamwork through a variety of sports and activities.'
  }
];

export const programs: Program[] = [
  {
    id: 1,
    title: 'Core Academic Subjects',
    description: 'English Language, Mathematics, Integrated Science, and Social Studies form the foundation of our rigorous academic curriculum, developing critical thinking and analytical skills.',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7124.HEIC?updatedAt=1748101842702'
  },
  {
    id: 2,
    title: 'Technology & Computing',
    description: 'Computing (ICT) and Career Technology (formerly BDT) prepare students for the digital age with hands-on experience in technology, design, and innovation.',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6993.HEIC'
  },
  {
    id: 3,
    title: 'Cultural & Creative Arts',
    description: 'Creative Arts and Design, Music, Ghanaian Language and Culture (Asante Twi), and French foster creativity, cultural awareness, and global communication skills.',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7058.HEIC'
  },
  {
    id: 4,
    title: 'Character & Values Education',
    description: 'Religious and Moral Education (RME) develops ethical reasoning, moral values, and character formation essential for responsible citizenship.',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7033.HEIC?updatedAt=1748185379182'
  }
];

// Raw gallery data
const rawGalleryImages: GalleryImage[] = [
  // Original Hero Slider Images - The Foundation Collection
  {
    id: 35,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MgqIz8s7W0LQyCA6JY2x5PlO4s79mU8GbXkh3',
    alt: 'Original Hero Slider Image 1 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 36,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MpSjSHqcrmoUMKTuGeYChinNlws9Hd3XQRWBO',
    alt: 'Original Hero Slider Image 2 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 37,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1McgTvUDyC0e41iyIWj2N9gloVHaOsx7JDtz8K',
    alt: 'Original Hero Slider Image 3 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 38,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1Mtqqjxq2Z4OUSfDyHBMwru2hG3KJe97qYaoNx',
    alt: 'Original Hero Slider Image 4 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 39,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MSsSuPjLzTgIL0eaoWJ8UQBqvRNFysYxGXktA',
    alt: 'Original Hero Slider Image 5 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 40,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MC9tZ4UzDLioRYz5qf92ZpIJwTgmKdEu6AcFh',
    alt: 'Original Hero Slider Image 6 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 41,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1Mwf9R6zhW0NcVsvA1quWUypQ6IChZY53j4PSK',
    alt: 'Original Hero Slider Image 7 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 42,
    src: 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MvnyEMdmbxU06Mca57V3tJ1r8NOShqgZsCH9p',
    alt: 'Original Hero Slider Image 8 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 43,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2006.05.16_f4d2c9bc.jpg?updatedAt=1748174479174',
    alt: 'Original Hero Slider Image 9 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },
  {
    id: 44,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2006.05.16_4d8aef13.jpg?updatedAt=1748174478883',
    alt: 'Original Hero Slider Image 10 - St. Louis Demo JHS',
    category: 'Original Hero Collection'
  },

  {
    id: 27,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7296.HEIC?updatedAt=1748689144881',
    alt: 'Election activities and student engagement',
    category: 'School Events'
  },
  {
    id: 28,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7318.HEIC?updatedAt=1748688793115',
    alt: 'Student election participation and civic learning',
    category: 'School Events'
  },
  {
    id: 29,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7323.HEIC?updatedAt=1748689153632',
    alt: 'Democratic process and student voting',
    category: 'School Events'
  },
  {
    id: 30,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7325.HEIC?updatedAt=1748689152846',
    alt: 'Election day activities and student participation',
    category: 'School Events'
  },
  {
    id: 31,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7297.HEIC?updatedAt=1748689148423',
    alt: 'Civic education and student democracy in action',
    category: 'School Events'
  },
  {
    id: 32,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7304.HEIC?updatedAt=1748689146289',
    alt: 'Student election process and community engagement',
    category: 'School Events'
  },
  {
    id: 33,
    src: 'https://ik.imagekit.io/humbling/election%20st%20louis/IMG_7319.HEIC?updatedAt=1748689144891',
    alt: 'Election learning experience and student involvement',
    category: 'School Events'
  },
  {
    id: 1,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882',
    alt: 'Students in classroom learning environment',
    category: 'Academic Life'
  },
  {
    id: 2,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7126.HEIC?updatedAt=1748185717978',
    alt: 'Interactive classroom activities',
    category: 'Academic Life'
  },
  {
    id: 3,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7113.HEIC?updatedAt=1748185722552',
    alt: 'Students engaged in group work',
    category: 'Academic Life'
  },
  {
    id: 4,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7120.HEIC?updatedAt=1748185723844',
    alt: 'Collaborative learning session',
    category: 'Academic Life'
  },
  {
    id: 5,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6908.JPG',
    alt: 'School campus and facilities',
    category: 'Campus Life'
  },
  {
    id: 6,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7075.HEIC?updatedAt=1748185477324',
    alt: 'Students in practical learning',
    category: 'Academic Life'
  },
  {
    id: 7,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7078.HEIC?updatedAt=1748185473127',
    alt: 'Hands-on learning activities',
    category: 'Academic Life'
  },
  {
    id: 8,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7029.HEIC?updatedAt=1748185491679',
    alt: 'Student presentations and discussions',
    category: 'Academic Life'
  },
  {
    id: 9,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7092.HEIC?updatedAt=1748185637223',
    alt: 'Creative learning environment',
    category: 'Academic Life'
  },
  {
    id: 10,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7040.HEIC?updatedAt=1748185399093',
    alt: 'Students working together',
    category: 'Academic Life'
  },
  {
    id: 11,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7077.HEIC?updatedAt=1748185424393',
    alt: 'Classroom instruction and learning',
    category: 'Academic Life'
  },
  {
    id: 12,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7059.HEIC?updatedAt=1748185431948',
    alt: 'Student engagement activities',
    category: 'Academic Life'
  },
  {
    id: 13,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7038.HEIC?updatedAt=1748185428399',
    alt: 'Interactive learning sessions',
    category: 'Academic Life'
  },
  {
    id: 14,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7052.HEIC?updatedAt=1748185308897',
    alt: 'Students in focused study',
    category: 'Academic Life'
  },
  {
    id: 15,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7019.HEIC?updatedAt=1748185277103',
    alt: 'Collaborative project work',
    category: 'Academic Life'
  },
  {
    id: 16,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7033.HEIC?updatedAt=1748185379182',
    alt: 'Classroom discussions and debates',
    category: 'Academic Life'
  },
  {
    id: 17,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7016.HEIC?updatedAt=1748185375411',
    alt: 'Students presenting their work',
    category: 'Academic Life'
  },
  {
    id: 18,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7112.HEIC?updatedAt=1748185713991',
    alt: 'Active learning environment',
    category: 'Academic Life'
  },
  {
    id: 19,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7035.HEIC?updatedAt=1748185340320',
    alt: 'Students in creative activities',
    category: 'Academic Life'
  },
  {
    id: 20,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.jpg',
    alt: 'School community and student life',
    category: 'Campus Life'
  },
  {
    id: 21,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6921.JPG',
    alt: 'Students in school environment',
    category: 'Campus Life'
  },
  {
    id: 22,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6914.JPG',
    alt: 'School facilities and learning spaces',
    category: 'Campus Life'
  },
  {
    id: 23,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6912.JPG',
    alt: 'Student activities and engagement',
    category: 'Campus Life'
  },
  {
    id: 24,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_6910.JPG',
    alt: 'School life and student interactions',
    category: 'Campus Life'
  },
  {
    id: 25,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/513d7145-56da-4e4c-9b7d-aed333870067.jpg',
    alt: 'School community and student activities',
    category: 'Campus Life'
  },
  {
    id: 26,
    src: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/57d8e0dd-d63c-44c3-8525-047656ef22e5.jpg',
    alt: 'Student engagement and school environment',
    category: 'Campus Life'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "St. Louis Demonstration has provided my child with an exceptional education and supportive environment. The teachers are dedicated and truly care about each student's success.",
    author: "Jane Cooper",
    role: "Parent",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 2,
    quote: "The STEM program at St. Louis Demonstration inspired my passion for science. The hands-on approach and dedicated teachers made learning exciting and meaningful.",
    author: "Michael Brown",
    role: "Former Student",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  },
  {
    id: 3,
    quote: "As a community partner, we've witnessed the incredible impact St. Louis Demonstration has on developing well-rounded, thoughtful, and prepared young individuals.",
    author: "Sarah Johnson",
    role: "Community Partner",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  }
];

// Optimized gallery data with indexing for faster performance
class GalleryDataManager {
  private images: GalleryImage[];
  private categoryIndex: Map<string, GalleryImage[]>;
  private categories: string[];

  constructor(images: GalleryImage[]) {
    this.images = images;
    this.categoryIndex = new Map();
    this.categories = [];
    this.buildIndexes();
  }

  private buildIndexes() {
    const categoryMap = new Map<string, GalleryImage[]>();
    const categorySet = new Set<string>();

    // Build category index for O(1) filtering
    for (const image of this.images) {
      categorySet.add(image.category);

      if (!categoryMap.has(image.category)) {
        categoryMap.set(image.category, []);
      }
      categoryMap.get(image.category)!.push(image);
    }

    this.categoryIndex = categoryMap;
    this.categories = ['All', ...Array.from(categorySet).sort()];
  }

  getAllImages(): GalleryImage[] {
    return this.images;
  }

  getImagesByCategory(category: string): GalleryImage[] {
    if (category === 'All') {
      return this.images;
    }
    return this.categoryIndex.get(category) || [];
  }

  getCategories(): string[] {
    return this.categories;
  }

  // Get images in chunks for progressive loading
  getImagesChunk(startIndex: number, chunkSize: number = 20): GalleryImage[] {
    return this.images.slice(startIndex, startIndex + chunkSize);
  }
}

// Create optimized gallery manager
const galleryManager = new GalleryDataManager(rawGalleryImages);

// Export optimized gallery data
export const galleryImages = galleryManager.getAllImages();
export const getGalleryImagesByCategory = (category: string) => galleryManager.getImagesByCategory(category);
export const getGalleryCategories = () => galleryManager.getCategories();
export const getGalleryImagesChunk = (startIndex: number, chunkSize?: number) =>
  galleryManager.getImagesChunk(startIndex, chunkSize);

export const navigationItems = [
  { label: 'Home', path: '/' },
  { label: 'Students Hub', path: '/students-hub' },
  { label: 'SHS Database', path: '/shs-database' },
  { label: 'Schedule Visit', path: '/schedule-visit' },
  { label: 'Contact', path: '/contact' }
];