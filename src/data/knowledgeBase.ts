/**

 * Comprehensive Knowledge Base for St. Louis Demo JHS RAG System

 * Contains real, detailed information from all website pages

 */



export interface KnowledgeChunk {

  id: string;

  category: string;

  title: string;

  content: string;

  keywords: string[];

  source: string;

  priority: number; // Higher = more important for search results

}



export const schoolKnowledgeBase: KnowledgeChunk[] = [

  // ===== SCHOOL BASIC INFORMATION =====

  {

    id: 'school-location-address',

    category: 'Contact & Location',

    title: 'School Location and Address',

    content: `St. Louis Demonstration Junior High School is located in Suame Mbrom, Kumasi, in the Ashanti Region of Ghana.



    Full Address: P.O. Box 3041, Mbrom-Kumasi, Ashanti Region, Ghana

    GPS Digital Address: AK-015-1612

    Geographic Coordinates: Latitude 6.6885, Longitude -1.6244

    

    The school is situated in Mbrom, Kumasi, which is in the Ashanti Region of Ghana. We are easily accessible by public transport and private vehicles.`,

    keywords: ['location', 'address', 'where', 'situated', 'find', 'gps', 'kumasi', 'mbrom', 'ashanti', 'ghana', 'coordinates', 'map'],

    source: 'Contact Page & SEO Data',

    priority: 10,

  },

  {

    id: 'contact-information',

    category: 'Contact & Location',

    title: 'Contact Information',

    content: `You can contact St. Louis Demonstration Junior High School through the following channels:



    Phone: +233 24 475 8575 (Direct School Contact)

    

    Email Contacts:

    - Alumni Affairs: emma@stlouisdemojhs.com

    - PTA Coordination: michelle@stlouisdemojhs.com

    - General Inquiries: Contact through our website form

    

    Social Media:

    - Facebook: facebook.com/stlouisdemojhs

    - WhatsApp Channel: whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q

    - TikTok: @st.louis.demonstr

    

    Office Hours: Monday to Friday, 8:00 AM - 4:00 PM (Ghana Time)

    

    Website: www.stlouisdemojhs.com`,

    keywords: ['contact', 'phone', 'email', 'call', 'reach', 'social media', 'facebook', 'whatsapp', 'tiktok', 'office hours'],

    source: 'Contact Page & Public Data',

    priority: 10,

  },

  {

    id: 'school-about',

    category: 'General Information',

    title: 'About St. Louis Demonstration JHS',

    content: `St. Louis Demonstration Junior High School is a premier Catholic educational institution in Ghana. 

    

    Founded: 1977

    Type: Catholic Demonstration Junior High School

    Location: Suame Mbrom, Kumasi, Ashanti Region, Ghana

    

    Mission: We are committed to providing excellence in education, character development, and community engagement. As a Catholic demonstration school, we combine academic rigor with moral and spiritual development, preparing students for success in their future endeavors.

    

    Core Values:

    - Excellence in academics and character

    - Integrity and honesty

    - Respect for all individuals

    - Responsibility and accountability

    - Innovation and creativity

    - Strong moral and spiritual foundation

    

    Vision: To be a beacon of educational excellence in the Ashanti Region, known for producing well-rounded students who excel academically, morally, and socially.`,

    keywords: ['about', 'school', 'history', 'mission', 'vision', 'values', 'catholic', 'demonstration', 'founded', 'when established'],

    source: 'About Page & SEO Data',

    priority: 9,

  },



  // ===== ACADEMIC PROGRAMS =====

  {

    id: 'core-curriculum',

    category: 'Academics',

    title: 'Core Academic Curriculum',

    content: `St. Louis Demo JHS offers the complete Ghana Education Service Junior High School curriculum with all mandatory subjects:



    CORE SUBJECTS:

    1. Mathematics - Advanced problem-solving, numerical literacy, algebraic thinking, geometry, and mathematical reasoning

    2. English Language - Reading comprehension, writing skills, grammar, literature, communication, and critical thinking

    3. Integrated Science - Physics, Chemistry, Biology foundations, scientific method, experiments, and practical work

    4. Social Studies - History, Geography, Civic education, Cultural studies, Ghanaian history, and global awareness



    ADDITIONAL REQUIRED SUBJECTS:

    5. Religious and Moral Education - Character development, ethical reasoning, moral values, and spiritual growth

    6. Ghanaian Language - Local language proficiency, cultural preservation, and indigenous knowledge

    7. French - International language skills, global communication, francophone culture

    8. Career Technology - Practical skills, vocational training, technical education

    9. Computing/ICT - Digital literacy, programming basics, computer skills, technology integration

    10. Creative Arts and Design - Artistic expression, creativity, visual arts, design thinking

    11. Music - Musical education, performance skills, cultural appreciation, rhythm and theory



    All subjects prepare students for the Basic Education Certificate Examination (BECE) and transition to Senior High School.`,

    keywords: ['subjects', 'curriculum', 'courses', 'what taught', 'academics', 'classes', 'mathematics', 'english', 'science', 'social studies', 'french', 'ict', 'computing', 'music', 'arts'],

    source: 'Academics Page',

    priority: 9,

  },

  {

    id: 'stem-programs',

    category: 'Programs',

    title: 'STEM Education Programs',

    content: `St. Louis Demo JHS offers cutting-edge STEM (Science, Technology, Engineering, Mathematics) programs:



    ROBOTICS PROGRAM:

    - Hands-on robotics training and competitions

    - Building and programming robots

    - STEM robotics club activities

    - Participation in national robotics competitions



    SPACE EXPLORATION PROGRAM:

    - Introduction to astronomy and space science

    - Rocket building and experiments

    - Space technology and satellite studies

    - Virtual space missions and simulations



    CODING & PROGRAMMING:

    - Introduction to programming languages (Python, Scratch)

    - Web development basics

    - App development fundamentals

    - Coding clubs and hackathons



    TECHNOLOGY EDUCATION:

    - Modern computer labs with latest equipment

    - Digital literacy training

    - Multimedia and design tools

    - Technology-integrated learning



    STEM LABS:

    - Well-equipped science laboratories

    - Modern robotics workshop

    - Technology innovation hub

    - Maker space for creative projects



    Students participate in STEM competitions, science fairs, and hands-on learning experiences to develop critical thinking and problem-solving skills.`,

    keywords: ['stem', 'robotics', 'coding', 'programming', 'space', 'technology', 'science labs', 'engineering', 'innovation'],

    source: 'STEM Page',

    priority: 8,

  },



  // ===== ADMISSIONS =====

  {

    id: 'admissions-process',

    category: 'Admissions',

    title: 'Admissions Process and Requirements',

    content: `Admissions to St. Louis Demonstration JHS are open throughout the year. We welcome motivated students who are eager to learn and grow.



    ADMISSION PROCESS:

    1. Online Application - Submit application through our website

    2. Entrance Assessment - Academic evaluation in core subjects

    3. Interview - Meeting with admissions team and school leadership

    4. Document Verification - Review of academic records

    5. Admission Decision - Notification within 2 weeks

    6. Enrollment - Complete registration and fee payment



    REQUIREMENTS:

    - Completed primary school education

    - Primary school leaving certificate

    - Birth certificate

    - Recent passport photographs

    - Medical records and health certificate

    - Guardian/parent identification



    FINANCIAL AID:

    - Scholarships available for qualified students

    - Merit-based scholarships for academic excellence

    - Need-based financial assistance

    - Payment plans available



    APPLICATION PERIODS:

    - Main intake: August/September

    - Mid-year intake: January (limited spaces)

    - Applications accepted year-round



    For admission inquiries, contact us through our website or visit the school office.`,

    keywords: ['admission', 'admissions', 'enroll', 'enrollment', 'apply', 'application', 'requirements', 'how to join', 'entrance', 'scholarship', 'financial aid'],

    source: 'Admissions Page',

    priority: 9,

  },



  // ===== FACILITIES =====

  {

    id: 'school-facilities',

    category: 'Facilities',

    title: 'School Facilities and Infrastructure',

    content: `St. Louis Demo JHS features modern facilities to support quality education:



    ACADEMIC FACILITIES:

    - Spacious, well-ventilated classrooms with modern furniture

    - Science laboratories (Physics, Chemistry, Biology)

    - Computer labs with latest technology

    - Well-stocked library with books and digital resources

    - ICT center with internet connectivity

    - STEM robotics workshop



    SPORTS & RECREATION:

    - Sports fields for football, volleyball, athletics

    - Indoor sports facilities

    - Physical education equipment

    - Play areas and recreational spaces



    OTHER FACILITIES:

    - Assembly hall for events and gatherings

    - Cafeteria and dining area

    - First aid and health center

    - Administrative offices

    - Staff rooms and meeting spaces

    - Secure and clean washrooms

    - Backup power supply



    LEARNING ENVIRONMENT:

    - Safe and secure school compound

    - Green spaces and gardens

    - Conducive learning atmosphere

    - Clean and well-maintained premises

    - Disability-accessible features



    All facilities are regularly maintained to provide the best possible learning environment for our students.`,

    keywords: ['facilities', 'infrastructure', 'classrooms', 'labs', 'library', 'sports', 'equipment', 'campus', 'grounds'],

    source: 'About Page & Facilities',

    priority: 7,

  },



  // ===== FACULTY & STAFF =====

  {

    id: 'faculty-staff',

    category: 'Faculty',

    title: 'Faculty and Staff',

    content: `Our dedicated faculty and staff are committed to student success:



    TEACHING STAFF:

    - Highly qualified and experienced teachers

    - Subject specialists in all core and elective subjects

    - Continuous professional development programs

    - Passionate educators dedicated to student growth

    - Average teacher experience: 10+ years



    SUPPORT STAFF:

    - Guidance and counseling officers

    - Librarians and resource specialists

    - ICT and technology support staff

    - Administrative personnel

    - Security and maintenance staff



    PROFESSIONAL DEVELOPMENT:

    - Regular training workshops

    - Curriculum update sessions

    - Technology integration training

    - Best practices sharing

    - Collaboration with education experts



    STUDENT SUPPORT:

    - Personalized attention to student needs

    - Mentorship programs

    - Academic counseling

    - Career guidance

    - Remedial classes for struggling students

    - Extension programs for gifted students



    Our faculty-student ratio ensures individual attention and quality instruction for every student.`,

    keywords: ['teachers', 'faculty', 'staff', 'educators', 'instructors', 'counselors', 'qualified', 'experienced'],

    source: 'Faculty Page',

    priority: 7,

  },



  // ===== EXTRACURRICULAR =====

  {

    id: 'extracurricular-activities',

    category: 'Activities',

    title: 'Extracurricular Activities and Clubs',

    content: `Students can participate in diverse extracurricular activities for holistic development:



    ACADEMIC CLUBS:

    - Science Club - Experiments, projects, science fairs

    - Mathematics Club - Problem-solving, competitions

    - Debate Club - Public speaking, critical thinking

    - Reading Club - Book discussions, literacy

    - French Club - Language practice, cultural activities

    - ICT Club - Coding, tech projects



    STEM & INNOVATION:

    - Robotics Club - Building and programming robots

    - STEM Club - Science and technology projects

    - Innovation Lab - Creative problem-solving

    - Coding Club - Programming and app development



    CREATIVE ARTS:

    - Music and Dance - Performances, cultural shows

    - Drama Club - Theatre, acting, productions

    - Art Club - Drawing, painting, creative expression

    - Creative Writing - Poetry, stories, journalism



    SPORTS:

    - Football, volleyball, basketball

    - Athletics and track events

    - Table tennis and indoor games

    - Inter-school competitions

    - Sports day events



    COMMUNITY SERVICE:

    - Environmental club - Tree planting, cleanup

    - Community outreach programs

    - Peer tutoring and mentorship

    - Charity and fundraising events



    All students are encouraged to participate in at least one extracurricular activity to develop social skills, leadership, and diverse talents.`,

    keywords: ['extracurricular', 'activities', 'clubs', 'sports', 'music', 'drama', 'science club', 'robotics club', 'debate', 'community service'],

    source: 'Students Hub',

    priority: 6,

  },



  // ===== CAREER GUIDANCE =====

  {

    id: 'career-guidance-shs',

    category: 'Guidance',

    title: 'Career Guidance and SHS Placement',

    content: `We provide comprehensive career guidance to help students make informed decisions:



    CAREER COUNSELING:

    - Individual career counseling sessions

    - Career aptitude tests and assessments

    - Exploration of different career paths

    - Information on various professions

    - Industry visits and career talks



    SHS PLACEMENT SUPPORT:

    - Guidance on choosing Senior High Schools

    - Information on SHS programs and tracks (General, Business, Technical, Agricultural, Visual Arts, Home Economics)

    - BECE preparation and exam strategies

    - School selection assistance

    - Application process support



    POST-JHS OPTIONS:

    - Information on nursing institutions

    - Teacher training colleges

    - Technical and Vocational Education (TVET) schools

    - Universities and tertiary institutions

    - Professional institutes

    - Military academies

    - Agricultural colleges

    - Business schools

    - Art and creative schools



    SCHOLARSHIP OPPORTUNITIES:

    - Database of scholarship programs

    - Application assistance

    - Financial aid information

    - Merit scholarship guidance



    RESOURCES:

    - Educational pathway guide

    - Career exploration materials

    - SHS prospectuses and information

    - Online resources and databases

    - Alumni mentorship network



    Our career guidance program ensures every student has clear pathways to future success.`,

    keywords: ['career', 'guidance', 'counseling', 'shs', 'senior high', 'placement', 'university', 'college', 'scholarship', 'future', 'pathway', 'tvet'],

    source: 'Educational Guide Page',

    priority: 8,

  },



  // ===== STUDENTS HUB =====

  {

    id: 'students-resources',

    category: 'Student Resources',

    title: 'Student Resources and Learning Materials',

    content: `Comprehensive resources available to support student learning:



    DIGITAL RESOURCES:

    - Online learning platforms

    - Educational videos and tutorials

    - Interactive learning modules

    - Digital library access

    - E-books and reference materials



    LEARNING TOOLS:

    - AI-powered study assistant (Louis AI)

    - Subject-specific learning materials

    - Practice exams and quizzes

    - BECE past questions and solutions

    - Study guides and notes



    TEXTBOOKS:

    - Complete JHS curriculum textbooks

    - Reference books for all subjects

    - Supplementary reading materials

    - Workbooks and exercise books



    MULTIMEDIA RESOURCES:

    - Educational videos

    - Audio learning materials

    - Interactive simulations

    - Virtual labs and experiments



    CAREER RESOURCES:

    - Career exploration tools

    - University and SHS information

    - Scholarship databases

    - Career videos and interviews



    FINANCIAL LITERACY:

    - Money management education

    - Financial literacy programs

    - Budgeting and saving tips

    - Economic understanding



    All resources are accessible through our website and school systems to support continuous learning.`,

    keywords: ['resources', 'learning materials', 'textbooks', 'digital', 'study', 'help', 'support', 'ai', 'louis ai', 'tools'],

    source: 'Students Hub & Resources Pages',

    priority: 7,

  },



  // ===== FINANCIAL =====

  {

    id: 'fees-donations',

    category: 'Financial',

    title: 'School Fees and Donation Information',

    content: `Information about fees, donations, and financial support:



    SCHOOL FEES:

    - Fees vary by grade level

    - Payment plans available

    - Financial assistance for qualified students

    - Scholarship programs for deserving students

    - Contact the school office for detailed fee structure



    DONATION PROGRAMS:

    - One-time donations accepted

    - Monthly giving programs (₵10 to ₵5000)

    - PayPal donations for international supporters

    - Bank transfer options (Ghana, UK, Europe, USA)

    - Mobile money payments



    DONATION USES:

    - Infrastructure development and maintenance

    - Technology upgrades and equipment

    - Scholarship programs

    - Teacher training and development

    - Educational materials and resources

    - Extracurricular programs

    - Library expansion



    TRANSPARENCY:

    - 100% of donations go directly to school development

    - Regular updates to donors

    - Impact reports and accountability

    - Tax-deductible receipts where applicable



    SPONSORSHIP:

    - Corporate sponsorship opportunities

    - Partnership programs

    - Alumni support programs

    - PTA fundraising initiatives



    For specific fee information or to make a donation, visit our donation page or contact the school office.`,

    keywords: ['fees', 'tuition', 'cost', 'payment', 'donation', 'sponsor', 'contribute', 'support', 'financial', 'scholarship'],

    source: 'Donation Pages',

    priority: 6,

  },



  // ===== PTA & ALUMNI =====

  {

    id: 'pta-alumni',

    category: 'Community',

    title: 'PTA and Alumni Information',

    content: `Active parent and alumni engagement at St. Louis Demo JHS:



    PARENT-TEACHER ASSOCIATION (PTA):

    - Contact: michelle@stlouisdemojhs.com

    - Regular PTA meetings and events

    - Parent engagement in school activities

    - Fundraising and support initiatives

    - Parent education workshops

    - Collaboration with school administration



    PTA ACTIVITIES:

    - School improvement projects

    - Student welfare programs

    - Cultural and social events

    - Fundraising campaigns

    - Parent-teacher conferences

    - School development planning



    ALUMNI NETWORK:

    - Contact: emma@stlouisdemojhs.com

    - Active alumni association

    - Mentorship programs for current students

    - Career talks and guidance

    - Alumni reunions and events

    - Giving back initiatives



    ALUMNI SUPPORT:

    - Scholarship funds

    - Facility improvements

    - Mentorship and career guidance

    - Networking opportunities

    - Alumni success stories



    COMMUNITY ENGAGEMENT:

    - School open days

    - Community outreach programs

    - Partnership with local organizations

    - Social responsibility initiatives



    Both PTA and alumni play crucial roles in supporting student success and school development.`,

    keywords: ['pta', 'parent', 'teacher', 'association', 'alumni', 'community', 'partnership', 'support', 'engagement'],

    source: 'PTA & Alumni Pages',

    priority: 5,

  },



  // ===== TECHNOLOGY =====

  {

    id: 'technology-innovation',

    category: 'Technology',

    title: 'Technology and Digital Innovation',

    content: `St. Louis Demo JHS embraces technology for enhanced learning:



    DIGITAL LEARNING:

    - Progressive Web App (PWA) with offline capabilities

    - Mobile-optimized website and resources

    - Interactive educational content

    - Online assessment tools

    - Virtual classroom capabilities

    - Remote learning support



    AI ASSISTANT:

    - Louis AI chatbot for 24/7 student support

    - Educational assistance and guidance

    - School information access

    - Learning resource recommendations

    - Instant answers to common questions



    ICT INFRASTRUCTURE:

    - High-speed internet connectivity

    - Modern computer labs

    - Interactive whiteboards

    - Multimedia resources

    - Digital library access

    - Cloud-based learning platforms



    TECHNOLOGY INTEGRATION:

    - Technology in all subject areas

    - Digital literacy across curriculum

    - Coding and programming education

    - STEM technology tools

    - Educational apps and software



    ONLINE PRESENCE:

    - Comprehensive school website

    - Social media engagement (Facebook, WhatsApp, TikTok)

    - Online enrollment and applications

    - Digital communication with parents

    - Virtual tours and showcases



    Our commitment to technology ensures students are prepared for the digital future.`,

    keywords: ['technology', 'digital', 'online', 'ai', 'louis ai', 'chatbot', 'internet', 'computer', 'ict', 'innovation', 'app'],

    source: 'Technology Pages',

    priority: 6,

  },



  // ===== SPECIAL PROGRAMS =====

  {

    id: 'special-programs',

    category: 'Programs',

    title: 'Special Programs and Initiatives',

    content: `Additional programs to enrich student experience:



    LEADERSHIP DEVELOPMENT:

    - Student government and prefect system

    - Leadership training workshops

    - Public speaking and debate

    - Team building activities

    - Responsibility and accountability training



    CHARACTER EDUCATION:

    - Religious and moral education

    - Values-based teaching

    - Ethics and integrity training

    - Respect and responsibility

    - Community service learning



    FINANCIAL LITERACY:

    - Money management education

    - Saving and budgeting skills

    - Economic understanding

    - Entrepreneurship basics

    - Financial decision-making



    LANGUAGE PROGRAMS:

    - English proficiency enhancement

    - French language instruction

    - Ghanaian language preservation

    - Communication skills development

    - Reading and literacy programs



    TVET INTEGRATION:

    - Technical and Vocational Education

    - Hands-on practical skills

    - Career technology education

    - Workshop and laboratory experiences

    - Industry connections



    WELLNESS PROGRAMS:

    - Health education

    - Physical education and sports

    - Mental health awareness

    - Nutrition education

    - Safety and first aid



    These programs complement academic instruction for well-rounded student development.`,

    keywords: ['special programs', 'leadership', 'character', 'financial literacy', 'wellness', 'tvet', 'health', 'values'],

    source: 'Various Program Pages',

    priority: 5,

  },



  // ===== EVENTS & ACTIVITIES =====

  {

    id: 'events-calendar',

    category: 'Events',

    title: 'School Events and Activities Calendar',

    content: `Regular events and activities throughout the academic year:



    ACADEMIC EVENTS:

    - BECE examinations preparation

    - Mid-term and end-of-term exams

    - Speech and prize giving day

    - Academic competitions

    - Science fairs and exhibitions

    - Mathematics olympiad



    CULTURAL EVENTS:

    - Cultural festivals and celebrations

    - Independence Day celebrations

    - Founders' Day commemoration

    - Music and drama performances

    - Art exhibitions

    - Language week activities



    SPORTS EVENTS:

    - Inter-house sports competitions

    - Athletics meets

    - Football tournaments

    - Sports Day

    - Inter-school competitions



    COMMUNITY EVENTS:

    - Open house and visiting days

    - Parent-teacher conferences

    - PTA meetings

    - Alumni reunions

    - Community service days

    - Fundraising events



    RELIGIOUS ACTIVITIES:

    - Mass and chapel services

    - Spiritual retreats

    - Prayer sessions

    - Religious education programs



    SPECIAL OCCASIONS:

    - Graduation ceremonies

    - Award ceremonies

    - Career days

    - College fairs

    - Field trips and excursions



    Check our calendar page or social media for specific event dates and details.`,

    keywords: ['events', 'activities', 'calendar', 'celebrations', 'sports day', 'cultural', 'competitions', 'graduation'],

    source: 'Calendar & Events Page',

    priority: 4,

  },



  // ===== FREQUENTLY ASKED =====

  {

    id: 'enrollment-age',

    category: 'Admissions',

    title: 'Enrollment Age and Grade Levels',

    content: `St. Louis Demo JHS enrolls students in the standard Junior High School grades:



    GRADE LEVELS: JHS 1, JHS 2, JHS 3



    TYPICAL AGE RANGE:

    - JHS 1: 12-13 years old

    - JHS 2: 13-14 years old  

    - JHS 3: 14-15 years old



    ADMISSION REQUIREMENTS:

    - Completed primary 6 (P6) education

    - Primary school leaving certificate

    - Age-appropriate for JHS level



    Students complete the three-year JHS program and sit for the Basic Education Certificate Examination (BECE) at the end of JHS 3.`,

    keywords: ['age', 'grade', 'level', 'jhs 1', 'jhs 2', 'jhs 3', 'how old', 'enrollment age', 'class'],

    source: 'Admissions Page',

    priority: 8,

  },

  {

    id: 'school-hours',

    category: 'General Information',

    title: 'School Hours and Schedule',

    content: `School operates Monday through Friday with a structured daily schedule:



    OFFICE HOURS: 8:00 AM - 4:00 PM (Monday to Friday)

    

    INSTRUCTIONAL HOURS: Generally 8:00 AM - 3:00 PM

    

    DAILY SCHEDULE (Typical):

    - Morning Assembly: 7:45 AM

    - Classes: 8:00 AM - 3:00 PM (with breaks)

    - Lunch Break: Midday

    - Short Breaks: Between class periods

    - After-School Activities: 3:00 PM - 5:00 PM



    TERM SYSTEM:

    - Three terms per academic year

    - Follows Ghana Education Service calendar

    

    For specific schedules and timetables, contact the school office or visit in person.`,

    keywords: ['hours', 'time', 'schedule', 'when', 'open', 'class time', 'school hours', 'timetable'],

    source: 'Contact Page',

    priority: 7,

  },

  // ===== CURRENT SCHOOL LEADERSHIP =====

  {

    id: 'current-headmistress',

    category: 'Administration & Leadership',

    title: 'Current Headmistress Information',

    content: `The current headmistress of St. Louis Demonstration Junior High School is [NAME TO BE UPDATED]. 

    For the most current information about the school's leadership, including the headmistress, please contact the school directly at +233 20 870 5290 or visit the school office during business hours.

    The school administration is committed to providing quality education and maintaining the high standards that St. Louis Demonstration JHS is known for.`,

    keywords: ['headmistress', 'principal', 'current', 'leadership', 'administration', 'head', 'director', 'who is', 'current head', 'school head'],

    source: 'School Administration',

    priority: 9,

  },

];



/**

 * Get all knowledge chunks

 */

export function getAllKnowledge(): KnowledgeChunk[] {

  return schoolKnowledgeBase;

}



/**

 * Search knowledge base by category

 */

export function getKnowledgeByCategory(category: string): KnowledgeChunk[] {

  return schoolKnowledgeBase.filter(

    chunk => chunk.category.toLowerCase() === category.toLowerCase()

  );

}



/**

 * Get high priority knowledge chunks

 */

export function getHighPriorityKnowledge(): KnowledgeChunk[] {

  return schoolKnowledgeBase

    .filter(chunk => chunk.priority >= 8)

    .sort((a, b) => b.priority - a.priority);

}
