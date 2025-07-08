import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Briefcase, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

// Career data structure
interface Career {
  name: string;
  description: string;
  category?: string;
}

// Careers data - Starting with A and B
const careersData: Record<string, Career[]> = {
  A: [
    { name: 'Accountant', description: 'Manage financial records, prepare tax documents, and ensure compliance with financial regulations. Accountants analyze financial data to help businesses make informed decisions about investments, budgeting, and financial planning.' },
    { name: 'Actor', description: 'Perform in theater, film, television, or other entertainment mediums. Actors interpret scripts and bring characters to life through voice, movement, and emotion, often working with directors and other performers.' },
    { name: 'Aerospace Engineer', description: 'Design, develop, and test aircraft, spacecraft, and missiles. They work on propulsion systems, aerodynamics, and flight mechanics for aviation and space exploration, ensuring safety and efficiency.' },
    { name: 'Architect', description: 'Design buildings and structures, creating blueprints and overseeing construction projects. Architects balance functionality, safety, and aesthetic appeal while considering environmental impact and building codes.' },
    { name: 'Artist', description: 'Create visual art through various mediums including painting, sculpture, digital art, and mixed media. Artists express ideas and emotions through creative visual works, often exhibiting in galleries or working on commissions.' },
    { name: 'Astronaut', description: 'Travel to space to conduct scientific research, maintain spacecraft, and explore beyond Earth. Astronauts undergo extensive training in science, engineering, and physical fitness to handle the challenges of space travel.' },
    { name: 'Attorney', description: 'Provide legal advice, represent clients in court, and draft legal documents. Attorneys specialize in various areas of law including criminal, civil, corporate, and family law, advocating for their clients\' rights.' },
    { name: 'Audiologist', description: 'Diagnose and treat hearing and balance disorders. Audiologists work with patients of all ages to improve their hearing and communication abilities through hearing aids, therapy, and other treatments.' },
    { name: 'Author', description: 'Write books, articles, and other written content for publication. Authors research topics, develop narratives, and communicate ideas through the written word across various genres and formats.' },
    { name: 'Automotive Technician', description: 'Repair and maintain vehicles, diagnosing mechanical problems and performing routine maintenance. They work with engines, electrical systems, and computerized components in modern automobiles.' },
    { name: 'Animator', description: 'Create moving images and visual effects for films, television, video games, and digital media. Animators bring characters and stories to life using traditional hand-drawn techniques or computer animation software.' },
    { name: 'Anthropologist', description: 'Study human societies, cultures, and their development over time. Anthropologists conduct fieldwork, analyze cultural practices, and contribute to our understanding of human behavior and social structures.' },
    { name: 'Air Traffic Controller', description: 'Coordinate aircraft movements in airports and airspace to ensure safe and efficient air travel. Air traffic controllers monitor radar, communicate with pilots, and make critical decisions to prevent collisions and manage traffic flow.' },
    { name: 'Anesthesiologist', description: 'Administer anesthesia and monitor patients during surgical procedures. Anesthesiologists ensure patient safety and comfort during operations, managing pain relief and vital signs throughout medical procedures.' },
    { name: 'Agricultural Engineer', description: 'Design and develop equipment, systems, and structures for agricultural production. Agricultural engineers work on irrigation systems, farm machinery, and sustainable farming practices to improve food production efficiency.' },
    { name: 'Actuary', description: 'Analyze risk and uncertainty using mathematics, statistics, and financial theory. Actuaries work primarily in insurance and finance industries to assess the likelihood of future events and their financial impact.' },
    { name: 'Administrative Assistant', description: 'Provide clerical and administrative support to organizations and executives. Administrative assistants manage schedules, handle correspondence, organize files, and coordinate meetings and travel arrangements.' },
    { name: 'Advertising Manager', description: 'Plan and execute advertising campaigns to promote products or services. Advertising managers work with creative teams, analyze market trends, and coordinate with media outlets to reach target audiences effectively.' },
    { name: 'Archivist', description: 'Preserve and organize historical documents, records, and artifacts. Archivists work in museums, libraries, and government institutions to maintain cultural heritage and provide access to historical information.' },
    { name: 'Art Director', description: 'Oversee visual aspects of creative projects in advertising, publishing, film, or digital media. Art directors coordinate with designers, photographers, and other creative professionals to achieve desired aesthetic outcomes.' },
    { name: 'Athletic Trainer', description: 'Prevent, diagnose, and treat sports-related injuries. Athletic trainers work with athletes and active individuals to develop conditioning programs, provide emergency care, and facilitate rehabilitation.' },
    { name: 'Auctioneer', description: 'Conduct public sales of goods, property, or livestock through competitive bidding. Auctioneers use specialized speaking techniques to encourage bidding and ensure fair and efficient sales processes.' },
    { name: 'Auto Body Repairer', description: 'Restore damaged vehicles to their original condition. Auto body repairers work with metal, plastic, and composite materials to fix dents, replace parts, and refinish vehicle surfaces.' },
    { name: 'Avionics Technician', description: 'Install, maintain, and repair electronic systems in aircraft. Avionics technicians work on navigation, communication, and flight control systems to ensure aircraft safety and functionality.' },
    { name: 'Aquaculture Farmer', description: 'Raise fish, shellfish, and aquatic plants in controlled environments. Aquaculture farmers manage water quality, feeding schedules, and harvesting to produce seafood and aquatic products sustainably.' },
    { name: 'Appliance Repairer', description: 'Fix and maintain household and commercial appliances. Appliance repairers diagnose problems, replace parts, and ensure proper functioning of refrigerators, washers, dryers, and other equipment.' },
    { name: 'Appraiser', description: 'Determine the value of real estate, personal property, or businesses. Appraisers conduct thorough inspections, research market conditions, and provide objective valuations for various purposes.' },
    { name: 'Aquarium Curator', description: 'Manage aquatic exhibits and collections in aquariums and marine centers. Aquarium curators oversee animal care, educational programs, and research initiatives to promote marine conservation.' },
    { name: 'Aromatherapist', description: 'Use essential oils and aromatic compounds to promote health and well-being. Aromatherapists create custom blends and treatments to address physical, emotional, and mental health concerns.' },
    { name: 'Art Therapist', description: 'Use creative processes to help people express emotions and improve mental health. Art therapists work with individuals and groups to facilitate healing through artistic expression and creativity.' },
    { name: 'Assembler', description: 'Put together components to create finished products in manufacturing settings. Assemblers follow detailed instructions and use various tools to ensure products meet quality standards and specifications.' },
    { name: 'Astronomer', description: 'Study celestial objects and phenomena in the universe. Astronomers use telescopes, satellites, and computer models to research stars, planets, galaxies, and cosmic events.' },
    { name: 'Athletic Director', description: 'Oversee sports programs and athletic departments in schools or organizations. Athletic directors manage budgets, hire coaches, schedule events, and ensure compliance with regulations.' },
    { name: 'Auctioneer Assistant', description: 'Support auctioneers during sales events by handling paperwork, organizing items, and assisting bidders. Auctioneer assistants help ensure smooth and efficient auction operations.' },
    { name: 'Audio Engineer', description: 'Record, mix, and produce sound for music, film, television, and live events. Audio engineers use technical equipment and software to achieve desired sound quality and effects.' },
    { name: 'Automation Engineer', description: 'Design and implement automated systems for manufacturing and industrial processes. Automation engineers program robots, develop control systems, and optimize production efficiency.' },
    { name: 'Aviation Inspector', description: 'Examine aircraft and aviation facilities to ensure compliance with safety regulations. Aviation inspectors conduct thorough inspections and investigations to maintain aviation safety standards.' },
    { name: 'Acupuncturist', description: 'Practice traditional Chinese medicine by inserting thin needles into specific body points. Acupuncturists treat various health conditions and promote wellness through this ancient healing technique.' },
    { name: 'Addiction Counselor', description: 'Help individuals overcome substance abuse and behavioral addictions. Addiction counselors provide therapy, support groups, and treatment plans to facilitate recovery and prevent relapse.' },
    { name: 'Admissions Counselor', description: 'Guide prospective students through college or university application processes. Admissions counselors evaluate applications, conduct interviews, and help students find suitable educational opportunities.' },
    { name: 'Adventure Guide', description: 'Lead outdoor recreational activities and expeditions. Adventure guides ensure safety while providing educational and entertaining experiences in natural environments like mountains, rivers, and wilderness areas.' },
    { name: 'Aerial Photographer', description: 'Capture images and videos from aircraft, drones, or elevated positions. Aerial photographers work in real estate, surveying, journalism, and artistic projects requiring unique perspectives.' },
    { name: 'Affiliate Marketer', description: 'Promote products or services through online platforms and earn commissions on sales. Affiliate marketers use digital marketing strategies to drive traffic and conversions for partner businesses.' },
    { name: 'Agricultural Inspector', description: 'Examine crops, livestock, and agricultural facilities to ensure compliance with safety and quality standards. Agricultural inspectors protect public health and maintain industry regulations.' },
    { name: 'Air Marshal', description: 'Provide security on commercial aircraft to prevent hijacking and terrorist activities. Air marshals are specially trained law enforcement officers who work undercover during flights.' },
    { name: 'Aircraft Mechanic', description: 'Maintain and repair aircraft engines, systems, and structures. Aircraft mechanics ensure flight safety by performing inspections, troubleshooting problems, and replacing worn components.' },
    { name: 'Alarm Installer', description: 'Install and maintain security systems in residential and commercial buildings. Alarm installers work with electronic equipment, wiring, and monitoring systems to protect properties.' },
    { name: 'Allergist', description: 'Diagnose and treat allergic reactions and immune system disorders. Allergists help patients identify triggers, develop treatment plans, and manage conditions like asthma and food allergies.' },
    { name: 'Ambulance Driver', description: 'Transport patients to medical facilities while providing basic emergency care. Ambulance drivers must navigate quickly and safely while supporting paramedics and EMTs during emergencies.' },
    { name: 'Amusement Park Attendant', description: 'Operate rides and attractions while ensuring guest safety and enjoyment. Amusement park attendants monitor equipment, assist visitors, and maintain clean and safe entertainment environments.' },
    { name: 'Analytical Chemist', description: 'Analyze chemical compositions and properties of substances. Analytical chemists use sophisticated instruments and techniques to identify compounds and ensure product quality in various industries.' },
    { name: 'Animal Behaviorist', description: 'Study animal behavior patterns and psychology. Animal behaviorists work with pets, wildlife, and zoo animals to understand their needs and develop training or enrichment programs.' },
    { name: 'Animal Control Officer', description: 'Enforce animal-related laws and respond to animal emergencies. Animal control officers capture stray animals, investigate abuse cases, and educate the public about responsible pet ownership.' },
    { name: 'Animal Trainer', description: 'Teach animals specific behaviors for entertainment, assistance, or safety purposes. Animal trainers work with various species in zoos, circuses, film productions, and service animal programs.' },
    { name: 'Antique Dealer', description: 'Buy, sell, and appraise vintage and collectible items. Antique dealers have expertise in historical objects, market values, and authentication to serve collectors and enthusiasts.' },
    { name: 'App Developer', description: 'Create mobile applications for smartphones and tablets. App developers design user interfaces, write code, and test software to deliver functional and engaging mobile experiences.' },
    { name: 'Aquatic Biologist', description: 'Study marine and freshwater ecosystems and organisms. Aquatic biologists conduct research on water quality, fish populations, and environmental impacts to support conservation efforts.' },
    { name: 'Arbitrator', description: 'Resolve disputes between parties outside of court systems. Arbitrators listen to evidence, apply relevant laws, and make binding decisions to settle conflicts efficiently and fairly.' },
    { name: 'Archaeological Technician', description: 'Assist archaeologists in excavating and analyzing historical sites and artifacts. Archaeological technicians use specialized tools and techniques to preserve and document cultural heritage.' },
    { name: 'Arborist', description: 'Care for trees and woody plants in urban and natural environments. Arborists prune, treat diseases, remove hazardous trees, and provide expertise on tree health and safety.' },
    { name: 'Art Conservator', description: 'Preserve and restore artworks, historical objects, and cultural artifacts. Art conservators use scientific methods and artistic skills to maintain cultural heritage for future generations.' },
    { name: 'Art Critic', description: 'Analyze and evaluate artistic works for publications and media outlets. Art critics provide informed commentary on exhibitions, artistic movements, and cultural trends in the art world.' },
    { name: 'Art Gallery Manager', description: 'Oversee operations of art galleries and exhibition spaces. Art gallery managers coordinate exhibitions, manage sales, work with artists, and promote cultural events to the public.' },
    { name: 'Artificial Intelligence Specialist', description: 'Develop and implement AI systems and machine learning algorithms. AI specialists work on automation, data analysis, and intelligent systems across various industries and applications.' },
    { name: 'Asbestos Removal Worker', description: 'Safely remove hazardous asbestos materials from buildings and structures. Asbestos removal workers follow strict safety protocols to protect public health and environmental safety.' },
    { name: 'Assistant Principal', description: 'Support school principals in educational administration and student management. Assistant principals handle discipline, coordinate programs, and assist with daily operations in educational institutions.' }
  ],
  B: [
    { name: 'Baker', description: 'Prepare and bake bread, pastries, cakes, and other baked goods. Bakers work in commercial bakeries, restaurants, or run their own bakery businesses, combining culinary skills with business management.' },
    { name: 'Banker', description: 'Provide financial services to individuals and businesses, including loans, investments, and account management. Bankers help clients with financial planning and ensure compliance with banking regulations.' },
    { name: 'Biologist', description: 'Study living organisms and their interactions with the environment. Biologists conduct research, perform experiments, and contribute to scientific knowledge in areas like ecology, genetics, and molecular biology.' },
    { name: 'Broadcaster', description: 'Present news, entertainment, or educational content on television, radio, or digital platforms. Broadcasters research topics, conduct interviews, and communicate information to diverse audiences.' },
    { name: 'Builder', description: 'Construct residential and commercial buildings, working with various materials and following architectural plans. Builders coordinate with other trades and ensure projects meet safety and quality standards.' },
    { name: 'Business Analyst', description: 'Analyze business processes and systems to identify improvements and solutions. Business analysts work with stakeholders to understand requirements and recommend strategies for organizational efficiency.' },
    { name: 'Butcher', description: 'Prepare and cut meat products for retail sale or restaurant use. Butchers understand different cuts of meat, food safety regulations, and customer preferences while maintaining quality standards.' },
    { name: 'Bartender', description: 'Mix and serve alcoholic and non-alcoholic beverages in bars, restaurants, and events. Bartenders interact with customers, manage inventory, and create cocktails while ensuring responsible service.' },
    { name: 'Beautician', description: 'Provide beauty services including hair styling, makeup application, and skincare treatments. Beauticians work in salons, spas, or as freelancers, helping clients enhance their appearance and confidence.' },
    { name: 'Biochemist', description: 'Study the chemical processes within living organisms. Biochemists conduct research to understand biological functions and develop applications in medicine, agriculture, and biotechnology.' },
    { name: 'Bookkeeper', description: 'Maintain financial records and transactions for businesses and organizations. Bookkeepers track income, expenses, and accounts to ensure accurate financial documentation and reporting.' },
    { name: 'Botanist', description: 'Study plants and their ecosystems, including growth patterns, diseases, and environmental interactions. Botanists contribute to agriculture, conservation, and pharmaceutical research through plant science.' },
    { name: 'Bricklayer', description: 'Construct walls, buildings, and structures using bricks, blocks, and mortar. Bricklayers read blueprints, mix materials, and ensure structural integrity in construction projects.' },
    { name: 'Bus Driver', description: 'Transport passengers safely on scheduled routes or charter trips. Bus drivers maintain vehicles, follow traffic regulations, and provide customer service while ensuring passenger safety.' },
    { name: 'Business Owner', description: 'Start and operate their own companies across various industries. Business owners manage all aspects of their enterprises, from planning and financing to marketing and operations.' },
    { name: 'Biomedical Engineer', description: 'Design medical devices and equipment to improve healthcare outcomes. Biomedical engineers combine engineering principles with biological sciences to create innovative medical technologies.' },
    { name: 'Brand Manager', description: 'Develop and maintain brand identity and marketing strategies for products or companies. Brand managers oversee advertising campaigns, market research, and brand positioning initiatives.' },
    { name: 'Broadcast Technician', description: 'Operate and maintain equipment for radio and television broadcasts. Broadcast technicians ensure quality audio and video transmission while troubleshooting technical issues.' },
    { name: 'Budget Analyst', description: 'Review and analyze budget proposals and spending plans for organizations. Budget analysts help institutions allocate resources efficiently and monitor financial performance.' },
    { name: 'Building Inspector', description: 'Examine construction projects to ensure compliance with building codes and safety regulations. Building inspectors protect public safety by verifying proper construction practices.' },
    { name: 'Bailiff', description: 'Maintain order and security in courtrooms during legal proceedings. Bailiffs escort defendants, manage evidence, and ensure the safety of judges, attorneys, and court personnel.' },
    { name: 'Barber', description: 'Cut and style hair, trim beards, and provide grooming services primarily for men. Barbers use various tools and techniques to create desired hairstyles and maintain professional appearance.' },
    { name: 'Behavioral Therapist', description: 'Help individuals modify problematic behaviors and develop coping strategies. Behavioral therapists work with children and adults to address autism, ADHD, and other behavioral challenges.' },
    { name: 'Bicycle Mechanic', description: 'Repair and maintain bicycles, including adjusting gears, brakes, and wheels. Bicycle mechanics diagnose problems, replace parts, and ensure safe and efficient bike operation.' },
    { name: 'Billing Clerk', description: 'Process invoices, payments, and financial transactions for businesses and organizations. Billing clerks maintain accurate records and communicate with customers regarding account information.' },
    { name: 'Biostatistician', description: 'Apply statistical methods to biological and health-related data. Biostatisticians design studies, analyze research data, and contribute to medical and scientific discoveries.' },
    { name: 'Blacksmith', description: 'Shape and forge metal objects using traditional techniques and modern tools. Blacksmiths create decorative items, tools, and artistic pieces while preserving ancient metalworking crafts.' },
    { name: 'Blogger', description: 'Create written content for online platforms and websites. Bloggers research topics, write articles, and engage with audiences to share information, opinions, and expertise.' },
    { name: 'Blood Bank Technician', description: 'Collect, test, and store blood donations for medical use. Blood bank technicians ensure blood safety through careful screening, typing, and quality control procedures.' },
    { name: 'Boat Captain', description: 'Navigate and operate watercraft for transportation, recreation, or commercial purposes. Boat captains ensure passenger safety, maintain vessels, and comply with maritime regulations.' },
    { name: 'Bodyguard', description: 'Provide personal protection services for individuals who may face security threats. Bodyguards assess risks, plan security measures, and ensure client safety in various environments.' },
    { name: 'Bomb Disposal Expert', description: 'Safely identify, handle, and dispose of explosive devices. Bomb disposal experts work with law enforcement and military to protect public safety from explosive threats.' },
    { name: 'Border Patrol Agent', description: 'Monitor and secure national borders to prevent illegal entry and smuggling. Border patrol agents enforce immigration laws and protect national security at border crossings.' },
    { name: 'Bounty Hunter', description: 'Track and apprehend fugitives who have skipped bail or violated parole. Bounty hunters work with law enforcement and bail bond companies to bring suspects to justice.' },
    { name: 'Bowling Alley Attendant', description: 'Maintain bowling equipment and assist customers at bowling facilities. Bowling alley attendants set up lanes, rent shoes, and ensure a safe and enjoyable bowling experience.' },
    { name: 'Boxing Trainer', description: 'Teach boxing techniques and conditioning to amateur and professional fighters. Boxing trainers develop training programs, provide motivation, and ensure athlete safety during workouts.' },
    { name: 'Brewer', description: 'Produce beer and other fermented beverages using traditional and modern brewing techniques. Brewers manage fermentation processes, quality control, and recipe development.' },
    { name: 'Bridge Engineer', description: 'Design and oversee construction of bridges and similar structures. Bridge engineers ensure structural integrity, safety, and compliance with engineering standards and regulations.' },
    { name: 'Broadcast Journalist', description: 'Research, write, and present news stories for television, radio, or online media. Broadcast journalists investigate events, conduct interviews, and deliver timely information to audiences.' },
    { name: 'Building Maintenance Worker', description: 'Perform routine maintenance and repairs in commercial and residential buildings. Building maintenance workers handle plumbing, electrical, and general upkeep tasks.' },
    { name: 'Bulk Mail Clerk', description: 'Process and sort large volumes of mail for postal services and mailing companies. Bulk mail clerks operate sorting equipment and ensure efficient mail distribution.' },
    { name: 'Business Consultant', description: 'Advise organizations on improving operations, strategy, and performance. Business consultants analyze problems, recommend solutions, and help implement changes for better efficiency.' },
    { name: 'Business Development Manager', description: 'Identify and pursue new business opportunities and partnerships. Business development managers build relationships, negotiate deals, and drive company growth initiatives.' },
    { name: 'Business Intelligence Analyst', description: 'Analyze business data to provide insights for decision-making. Business intelligence analysts create reports, dashboards, and recommendations to improve business performance.' },
    { name: 'Business Process Analyst', description: 'Study and improve organizational workflows and procedures. Business process analysts identify inefficiencies and recommend process improvements to enhance productivity.' },
    { name: 'Business Reporter', description: 'Cover financial markets, corporate news, and economic trends for media outlets. Business reporters analyze market data, interview executives, and explain complex financial information.' },
    { name: 'Business Teacher', description: 'Educate students about business principles, entrepreneurship, and economics. Business teachers develop curricula, conduct classes, and prepare students for business careers.' },
    { name: 'Business Valuation Analyst', description: 'Determine the economic value of businesses and business assets. Business valuation analysts use financial analysis and market research to assess company worth for various purposes.' }
  ]
  // More letters will be added progressively
};

const CareersListPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLetter, setSelectedLetter] = useState<string>('A');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Hide footer on this page
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (footer) {
      footer.style.display = 'none';
    }

    return () => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = '';
      }
    };
  }, []);

  const handleBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const availableLetters = Object.keys(careersData);

  // Smart search filtering
  const filteredCareers = useMemo(() => {
    if (!searchQuery.trim()) {
      return careersData[selectedLetter] || [];
    }

    const query = searchQuery.toLowerCase();
    const allCareers = Object.values(careersData).flat();
    return allCareers.filter(career =>
      career.name.toLowerCase().includes(query) ||
      career.description.toLowerCase().includes(query)
    );
  }, [searchQuery, selectedLetter]);

  const handleLetterClick = (letter: string) => {
    if (availableLetters.includes(letter)) {
      setSelectedLetter(letter);
      setSelectedCareer(null);
      setSearchQuery(''); // Clear search when selecting letter
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCareerClick = (career: Career) => {
    setSelectedCareer(career);
  };

  const closeCareerModal = () => {
    setSelectedCareer(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Career Exploration Guide | 1000+ Career Options A-Z - St. Louis Demo JHS"
        description="Explore over 1000 career options from A-Z. Comprehensive career guide for students to discover their future profession with detailed descriptions and requirements."
        keywords="careers, career guide, job options, career exploration, student careers, career planning, job descriptions"
        url="/careers-list"
        type="website"
        pageType="educational"
      />

      {/* Back Button Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 py-3 sm:py-4 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <div className="flex-1">
              <h1 className="text-sm sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 sm:w-6 sm:h-6" />
                <span className="hidden sm:inline">Career Exploration Guide</span>
                <span className="sm:hidden">Careers A-Z</span>
              </h1>
              <p className="text-blue-200 text-xs sm:text-sm mt-1">
                <span className="hidden sm:inline">Discover 1000+ Career Options A-Z</span>
                <span className="sm:hidden">1000+ Options</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Search Bar */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-4 sticky top-16 z-30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search careers..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* A-Z Navigation */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-4 sm:py-6 sticky top-28 z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {alphabet.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                disabled={!availableLetters.includes(letter)}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold text-sm sm:text-base transition-all duration-300
                  ${availableLetters.includes(letter)
                    ? selectedLetter === letter && !searchQuery
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-gray-700 hover:bg-gray-600 text-white hover:shadow-lg'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  }
                `}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Careers List - Raw Document Style */}
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <motion.div
          key={searchQuery ? 'search' : selectedLetter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            {searchQuery ? `Search Results for "${searchQuery}"` : `Careers Starting with "${selectedLetter}"`}
          </h2>

          {filteredCareers.length > 0 ? (
            <div className="max-w-6xl mx-auto">
              {/* Raw document style layout - 2 columns on mobile, more on larger screens */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3 text-left">
                {filteredCareers.map((career, index) => (
                  <motion.button
                    key={career.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.02 }}
                    onClick={() => handleCareerClick(career)}
                    className="text-left hover:bg-gray-800/30 p-2 rounded transition-colors duration-200 group"
                  >
                    <h3 className="text-white text-sm sm:text-base font-normal underline decoration-gray-500 hover:decoration-blue-400 transition-colors duration-200 group-hover:text-blue-300 leading-relaxed">
                      {career.name}
                    </h3>
                  </motion.button>
                ))}
              </div>
            </div>
          ) : searchQuery ? (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                No careers found for "{searchQuery}"
              </p>
              <p className="text-gray-500 text-sm mt-2">
                Try a different search term or browse by letter.
              </p>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">
                Careers for letter "{selectedLetter}" coming soon!
              </p>
              <p className="text-gray-500 text-sm mt-2">
                We're building a comprehensive list of 1000+ careers.
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Career Detail Modal */}
      <AnimatePresence>
        {selectedCareer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeCareerModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedCareer.name}
                </h3>
                <button
                  onClick={closeCareerModal}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                  {selectedCareer.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareersListPage;
