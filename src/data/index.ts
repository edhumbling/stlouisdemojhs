import { NavLink, DropdownItem, Event, NewsItem, StaffMember, Program, GalleryImage, Testimonial } from '../types';

export const navLinks: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'News & Events', path: '/news' },
  { label: 'STEM', path: '/stem' },
  { label: 'LearnHub', path: '/learnhub' },
  { label: 'AI Search', path: '/ai-search' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
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
    label: 'Administration',
    path: '/faculty',
    description: 'Meet our dedicated faculty and administrative staff',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7058.HEIC'
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
    image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Students in science lab',
    category: 'Academic'
  },
  {
    id: 2,
    src: 'https://images.pexels.com/photos/8617461/pexels-photo-8617461.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Art class painting session',
    category: 'Arts'
  },
  {
    id: 3,
    src: 'https://images.pexels.com/photos/8617551/pexels-photo-8617551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'School sports day',
    category: 'Sports'
  },
  {
    id: 4,
    src: 'https://images.pexels.com/photos/8423087/pexels-photo-8423087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Students in library',
    category: 'Academic'
  },
  {
    id: 5,
    src: 'https://images.pexels.com/photos/8617441/pexels-photo-8617441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'School concert performance',
    category: 'Arts'
  },
  {
    id: 6,
    src: 'https://images.pexels.com/photos/8617677/pexels-photo-8617677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Classroom discussion',
    category: 'Academic'
  },
  {
    id: 7,
    src: 'https://images.pexels.com/photos/8617839/pexels-photo-8617839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'Computer lab session',
    category: 'Technology'
  },
  {
    id: 8,
    src: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    alt: 'School assembly',
    category: 'Events'
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