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
    { name: 'Assistant Principal', description: 'Support school principals in educational administration and student management. Assistant principals handle discipline, coordinate programs, and assist with daily operations in educational institutions.' },
    { name: 'Astronomer', description: 'Study celestial objects and phenomena in the universe. Astronomers use telescopes, satellites, and computer models to research stars, planets, galaxies, and cosmic events to understand the cosmos.' },
    { name: 'Athletic Coach', description: 'Train and guide athletes in various sports and physical activities. Athletic coaches develop training programs, teach techniques, and motivate athletes to achieve their performance goals.' },
    { name: 'Auctioneer Clerk', description: 'Assist auctioneers with administrative tasks and auction operations. Auctioneer clerks handle paperwork, record sales, and help coordinate smooth auction events.' },
    { name: 'Audio Technician', description: 'Set up and operate sound equipment for events, recordings, and broadcasts. Audio technicians ensure high-quality sound production and troubleshoot technical audio issues.' },
    { name: 'Auto Parts Salesperson', description: 'Sell automotive parts and accessories to customers and repair shops. Auto parts salespeople have knowledge of vehicle components and help customers find the right parts.' },
    { name: 'Aviation Mechanic', description: 'Maintain and repair aircraft engines, systems, and components. Aviation mechanics ensure aircraft safety and airworthiness through thorough inspections and maintenance procedures.' },
    { name: 'Admissions Officer', description: 'Evaluate applications and make decisions about student admissions to educational institutions. Admissions officers review academic records, test scores, and personal statements.' },
    { name: 'Advertising Executive', description: 'Develop and oversee advertising campaigns and marketing strategies. Advertising executives work with clients to create compelling promotional content and brand messaging.' },
    { name: 'Aerospace Technician', description: 'Support aerospace engineers in designing and testing aircraft and spacecraft. Aerospace technicians assist with prototype development, testing procedures, and quality control.' },
    { name: 'Agricultural Scientist', description: 'Research and develop improved farming methods, crop varieties, and agricultural technologies. Agricultural scientists work to increase food production and sustainability.' },
    { name: 'Air Quality Specialist', description: 'Monitor and analyze air pollution levels and environmental conditions. Air quality specialists work to protect public health and ensure compliance with environmental regulations.' },
    { name: 'Alarm Technician', description: 'Install, maintain, and repair security alarm systems in residential and commercial properties. Alarm technicians ensure proper functioning of security equipment.' },
    { name: 'Alternative Medicine Practitioner', description: 'Provide non-traditional healing treatments such as herbal medicine, homeopathy, and energy healing. Alternative medicine practitioners offer holistic health approaches.' },
    { name: 'Ambulatory Care Nurse', description: 'Provide nursing care in outpatient settings such as clinics and medical offices. Ambulatory care nurses assist with procedures, patient education, and follow-up care.' },
    { name: 'Amusement Ride Operator', description: 'Operate and monitor amusement park rides and attractions. Amusement ride operators ensure guest safety, conduct safety checks, and provide entertainment experiences.' },
    { name: 'Analytical Scientist', description: 'Conduct scientific analysis and research using advanced laboratory techniques. Analytical scientists work in pharmaceuticals, environmental testing, and quality control.' },
    { name: 'Anesthesia Technician', description: 'Assist anesthesiologists with equipment and patient care during surgical procedures. Anesthesia technicians prepare equipment and monitor patients under anesthesia.' },
    { name: 'Animal Caretaker', description: 'Provide daily care for animals in shelters, veterinary clinics, and research facilities. Animal caretakers feed, clean, and monitor animal health and welfare.' },
    { name: 'Animal Nutritionist', description: 'Develop and recommend nutrition plans for various animal species. Animal nutritionists work with pet food companies, farms, and zoos to optimize animal health.' },
    { name: 'Animation Director', description: 'Oversee the creative and technical aspects of animated productions. Animation directors guide artistic vision and coordinate animation teams for films and games.' },
    { name: 'Antique Appraiser', description: 'Evaluate and determine the value of antique items and collectibles. Antique appraisers have expertise in historical objects, craftsmanship, and market values.' },
    { name: 'Apartment Manager', description: 'Oversee residential apartment complexes and tenant relations. Apartment managers handle leasing, maintenance coordination, and property management duties.' },
    { name: 'Appellate Court Clerk', description: 'Manage court records and proceedings in appellate courts. Appellate court clerks handle case filings, scheduling, and administrative support for judges.' },
    { name: 'Application Developer', description: 'Design and create software applications for computers and mobile devices. Application developers write code, test programs, and update software features.' },
    { name: 'Apprentice Electrician', description: 'Learn electrical trade skills under supervision of experienced electricians. Apprentice electricians gain hands-on experience while completing formal training programs.' },
    { name: 'Aquarium Designer', description: 'Plan and create aquatic environments for homes, businesses, and public displays. Aquarium designers combine artistic vision with knowledge of aquatic ecosystems.' },
    { name: 'Arbitration Specialist', description: 'Facilitate dispute resolution between parties outside of traditional court systems. Arbitration specialists help resolve conflicts efficiently and fairly.' },
    { name: 'Architectural Drafter', description: 'Create technical drawings and blueprints for construction projects. Architectural drafters use computer-aided design software to produce detailed building plans.' },
    { name: 'Archive Specialist', description: 'Organize and preserve historical documents and records. Archive specialists catalog materials, maintain storage conditions, and assist researchers accessing collections.' },
    { name: 'Armed Security Guard', description: 'Provide security services while carrying firearms for high-risk situations. Armed security guards protect valuable assets and maintain safety in sensitive environments.' },
    { name: 'Art Auctioneer', description: 'Conduct auctions for artwork and collectibles. Art auctioneers have expertise in art valuation and use specialized techniques to facilitate art sales.' },
    { name: 'Art Handler', description: 'Transport, install, and care for artwork in galleries and museums. Art handlers ensure proper handling and preservation of valuable artistic pieces.' },
    { name: 'Art Instructor', description: 'Teach artistic techniques and creative skills to students of various ages. Art instructors guide students in developing their artistic abilities and creative expression.' },
    { name: 'Art Restorer', description: 'Repair and restore damaged artwork and historical artifacts. Art restorers use specialized techniques to preserve cultural heritage and artistic masterpieces.' },
    { name: 'Artificial Limb Maker', description: 'Design and create prosthetic devices for amputees. Artificial limb makers combine engineering skills with medical knowledge to improve patient mobility.' },
    { name: 'Assembly Line Worker', description: 'Work on manufacturing production lines assembling products. Assembly line workers follow specific procedures to ensure quality and efficiency in production.' },
    { name: 'Asset Manager', description: 'Oversee and optimize investment portfolios and financial assets. Asset managers make strategic decisions to maximize returns and minimize risks for clients.' },
    { name: 'Assisted Living Coordinator', description: 'Manage services and care programs in assisted living facilities. Assisted living coordinators ensure residents receive appropriate care and support services.' },
    { name: 'Astrologer', description: 'Interpret celestial movements and their supposed influence on human affairs. Astrologers provide readings and guidance based on astrological principles and chart analysis.' },
    { name: 'Athletic Equipment Manager', description: 'Maintain and organize sports equipment for teams and athletic programs. Athletic equipment managers ensure proper equipment care and availability for athletes.' },
    { name: 'Athletic Recruiter', description: 'Identify and recruit talented athletes for college and professional sports programs. Athletic recruiters evaluate player skills and potential for team success.' },
    { name: 'Atmospheric Scientist', description: 'Study weather patterns, climate change, and atmospheric phenomena. Atmospheric scientists conduct research to understand and predict weather and climate conditions.' },
    { name: 'Auction House Assistant', description: 'Support auction operations and customer service at auction houses. Auction house assistants help with cataloging, customer inquiries, and event coordination.' },
    { name: 'Audio Visual Technician', description: 'Set up and operate audio-visual equipment for events and presentations. Audio visual technicians ensure proper functioning of sound and video systems.' },
    { name: 'Audit Clerk', description: 'Assist auditors with financial record examination and verification. Audit clerks help gather documentation and perform basic audit procedures under supervision.' },
    { name: 'Auto Damage Appraiser', description: 'Assess vehicle damage and estimate repair costs for insurance claims. Auto damage appraisers inspect damaged vehicles and determine fair settlement amounts.' },
    { name: 'Auto Glass Installer', description: 'Replace and repair windshields and vehicle windows. Auto glass installers work with specialized tools and materials to ensure proper installation and safety.' },
    { name: 'Automated Systems Technician', description: 'Maintain and repair automated manufacturing and industrial systems. Automated systems technicians troubleshoot robotic equipment and control systems.' },
    { name: 'Automobile Designer', description: 'Create concepts and designs for new vehicle models. Automobile designers combine artistic creativity with engineering knowledge to develop appealing and functional vehicles.' },
    { name: 'Aviation Safety Inspector', description: 'Ensure compliance with aviation safety regulations and standards. Aviation safety inspectors conduct inspections and investigations to maintain flight safety.' },
    { name: 'Aviary Keeper', description: 'Care for birds in zoos, wildlife centers, and aviaries. Aviary keepers provide daily care, monitor bird health, and maintain appropriate habitat conditions.' },
    { name: 'Academic Advisor', description: 'Guide students in course selection and academic planning. Academic advisors help students navigate degree requirements and achieve educational goals.' },
    { name: 'Access Control Specialist', description: 'Manage security systems that control building and area access. Access control specialists install and maintain electronic security systems and access cards.' },
    { name: 'Accounts Payable Clerk', description: 'Process invoices and manage outgoing payments for organizations. Accounts payable clerks ensure timely payment of bills and maintain accurate financial records.' },
    { name: 'Accounts Receivable Clerk', description: 'Manage incoming payments and customer account balances. Accounts receivable clerks track payments, send invoices, and follow up on overdue accounts.' },
    { name: 'Acquisition Specialist', description: 'Manage procurement processes and vendor relationships for organizations. Acquisition specialists negotiate contracts and ensure cost-effective purchasing decisions.' },
    { name: 'Activity Director', description: 'Plan and coordinate recreational activities in healthcare and senior living facilities. Activity directors enhance quality of life through engaging programs and social events.' },
    { name: 'Acupressure Therapist', description: 'Apply pressure to specific body points to promote healing and wellness. Acupressure therapists use traditional techniques to relieve pain and stress.' },
    { name: 'Addiction Specialist', description: 'Provide specialized treatment for substance abuse and behavioral addictions. Addiction specialists develop treatment plans and support recovery processes.' },
    { name: 'Adjunct Professor', description: 'Teach college courses on a part-time or temporary basis. Adjunct professors bring professional expertise to academic settings while maintaining other careers.' },
    { name: 'Administrative Coordinator', description: 'Support organizational operations through administrative tasks and coordination. Administrative coordinators manage schedules, communications, and office procedures.' },
    { name: 'Adoption Counselor', description: 'Guide families through adoption processes and provide emotional support. Adoption counselors help match children with suitable families and navigate legal requirements.' },
    { name: 'Adult Education Teacher', description: 'Provide educational instruction to adult learners in various subjects. Adult education teachers help students complete degrees or learn new skills.' },
    { name: 'Adventure Photographer', description: 'Capture images in challenging outdoor and extreme environments. Adventure photographers document expeditions, sports, and natural phenomena.' },
    { name: 'Advertising Copywriter', description: 'Create persuasive written content for advertising campaigns. Advertising copywriters craft messages that engage audiences and promote products or services.' },
    { name: 'Advocacy Coordinator', description: 'Organize advocacy efforts and campaigns for causes and organizations. Advocacy coordinators mobilize support and promote policy changes.' },
    { name: 'Aerobics Instructor', description: 'Lead group fitness classes and aerobic exercise sessions. Aerobics instructors motivate participants and ensure safe, effective workouts.' },
    { name: 'Aerospace Welder', description: 'Perform specialized welding for aircraft and spacecraft components. Aerospace welders work with advanced materials and precision requirements.' },
    { name: 'Affirmative Action Officer', description: 'Ensure equal opportunity and diversity compliance in organizations. Affirmative action officers develop policies and monitor hiring practices.' },
    { name: 'After-School Coordinator', description: 'Manage after-school programs and activities for children. After-school coordinators provide safe, educational environments for students.' },
    { name: 'Agricultural Economist', description: 'Analyze economic factors affecting agriculture and food systems. Agricultural economists study market trends, policy impacts, and farm profitability.' },
    { name: 'Agricultural Technician', description: 'Assist agricultural scientists with research and farm operations. Agricultural technicians collect data, maintain equipment, and support crop and livestock studies.' },
    { name: 'Agronomist', description: 'Study soil management and crop production to improve agricultural yields. Agronomists develop sustainable farming practices and crop improvement strategies.' },
    { name: 'AIDS Counselor', description: 'Provide support and education to individuals affected by HIV/AIDS. AIDS counselors offer testing, counseling, and resource connections.' },
    { name: 'Air Conditioning Installer', description: 'Install and set up air conditioning systems in residential and commercial buildings. AC installers ensure proper system installation and operation.' },
    { name: 'Air Force Officer', description: 'Serve in leadership roles within the United States Air Force. Air Force officers command units, manage operations, and ensure mission success.' },
    { name: 'Air Traffic Control Specialist', description: 'Coordinate aircraft movements in controlled airspace and airports. Air traffic control specialists ensure safe and efficient air traffic flow.' },
    { name: 'Aircraft Dispatcher', description: 'Plan flight routes and monitor aircraft operations for airlines. Aircraft dispatchers ensure flight safety and efficiency through careful planning.' },
    { name: 'Aircraft Painter', description: 'Apply protective and decorative coatings to aircraft surfaces. Aircraft painters use specialized techniques and materials for aviation applications.' },
    { name: 'Airline Pilot', description: 'Operate commercial aircraft for passenger and cargo transportation. Airline pilots require extensive training and certification for safe flight operations.' },
    { name: 'Airport Security Screener', description: 'Screen passengers and baggage for security threats at airports. Airport security screeners use detection equipment and follow safety protocols.' },
    { name: 'Alarm System Designer', description: 'Design security alarm systems for residential and commercial properties. Alarm system designers create customized security solutions.' },
    { name: 'Alcohol and Drug Counselor', description: 'Provide treatment and support for substance abuse issues. Alcohol and drug counselors help clients achieve and maintain sobriety.' },
    { name: 'Allergist Assistant', description: 'Support allergists in diagnosing and treating allergic conditions. Allergist assistants prepare patients, administer tests, and provide care coordination.' },
    { name: 'Alternative Energy Technician', description: 'Install and maintain renewable energy systems like solar panels and wind turbines. Alternative energy technicians support sustainable energy solutions.' },
    { name: 'Ambulance Dispatcher', description: 'Coordinate emergency medical services and ambulance responses. Ambulance dispatchers manage emergency calls and deploy medical resources efficiently.' },
    { name: 'American Sign Language Interpreter', description: 'Translate between spoken language and American Sign Language. ASL interpreters facilitate communication for deaf and hard-of-hearing individuals.' },
    { name: 'Amusement Park Designer', description: 'Create and design theme park attractions and entertainment experiences. Amusement park designers combine creativity with engineering for thrilling experiences.' },
    { name: 'Analytical Chemist', description: 'Analyze chemical compositions and properties of substances using advanced techniques. Analytical chemists ensure product quality and safety in various industries.' },
    { name: 'Anatomy Professor', description: 'Teach human anatomy and physiology to medical and science students. Anatomy professors combine teaching with research in biological sciences.' },
    { name: 'Ancient History Specialist', description: 'Study and research ancient civilizations and historical periods. Ancient history specialists preserve knowledge of past cultures and societies.' },
    { name: 'Anesthesiologist Assistant', description: 'Support anesthesiologists during surgical procedures and patient care. Anesthesiologist assistants monitor patients and assist with anesthesia administration.' },
    { name: 'Animal Acupuncturist', description: 'Provide acupuncture treatments for animals to promote healing and wellness. Animal acupuncturists use traditional techniques adapted for veterinary care.' },
    { name: 'Animal Breeder', description: 'Selectively breed animals to improve genetic traits and characteristics. Animal breeders work with livestock, pets, and specialty animals.' },
    { name: 'Animal Chiropractor', description: 'Provide chiropractic care for animals to improve mobility and reduce pain. Animal chiropractors use manual therapy techniques for animal patients.' },
    { name: 'Animal Massage Therapist', description: 'Provide therapeutic massage for animals to promote healing and relaxation. Animal massage therapists help with rehabilitation and wellness.' },
    { name: 'Animal Photographer', description: 'Specialize in photographing animals for various purposes including portraits and wildlife documentation. Animal photographers capture the beauty and behavior of animals.' },
    { name: 'Animal Psychologist', description: 'Study animal behavior and psychology to understand animal cognition and emotions. Animal psychologists research animal minds and behavior patterns.' },
    { name: 'Animal Shelter Manager', description: 'Oversee operations of animal shelters and rescue organizations. Animal shelter managers coordinate adoptions, volunteer programs, and animal care.' },
    { name: 'Animal Welfare Inspector', description: 'Investigate animal cruelty cases and ensure proper animal care standards. Animal welfare inspectors enforce animal protection laws and regulations.' },
    { name: 'Animation Producer', description: 'Oversee animated film and television production projects. Animation producers manage budgets, schedules, and creative teams for animated content.' },
    { name: 'Announcer', description: 'Provide live commentary and announcements for events, radio, and television. Announcers use clear speech and engaging delivery to inform audiences.' },
    { name: 'Answering Service Operator', description: 'Handle incoming calls and messages for businesses and organizations. Answering service operators provide professional communication services.' },
    { name: 'Anthropology Professor', description: 'Teach anthropology and conduct research on human cultures and societies. Anthropology professors combine education with scholarly research.' },
    { name: 'Anti-Money Laundering Specialist', description: 'Detect and prevent financial crimes and money laundering activities. AML specialists monitor transactions and ensure regulatory compliance.' },
    { name: 'Antique Furniture Restorer', description: 'Repair and restore antique furniture to preserve historical pieces. Antique furniture restorers use traditional techniques and materials.' },
    { name: 'Apartment Leasing Agent', description: 'Show rental properties and assist prospective tenants with leasing processes. Apartment leasing agents help people find suitable housing.' },
    { name: 'API Developer', description: 'Create application programming interfaces for software systems. API developers enable different software applications to communicate and share data.' },
    { name: 'Apiary Manager', description: 'Manage beehives and honey production operations. Apiary managers oversee bee colonies, harvest honey, and maintain hive health.' },
    { name: 'App Store Optimizer', description: 'Optimize mobile applications for better visibility and downloads in app stores. App store optimizers use marketing strategies to increase app success.' },
    { name: 'Appliance Sales Representative', description: 'Sell home appliances and provide product information to customers. Appliance sales representatives help customers choose suitable appliances for their needs.' },
    { name: 'Application Security Analyst', description: 'Test and secure software applications against cyber threats. Application security analysts identify vulnerabilities and implement protective measures.' }
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
    { name: 'Business Valuation Analyst', description: 'Determine the economic value of businesses and business assets. Business valuation analysts use financial analysis and market research to assess company worth for various purposes.' },
    { name: 'Bus Mechanic', description: 'Repair and maintain public transportation buses and commercial vehicles. Bus mechanics ensure vehicle safety and reliability for passenger transportation services.' },
    { name: 'Buyer', description: 'Purchase goods and materials for retail stores and organizations. Buyers analyze market trends, negotiate with suppliers, and select products that meet customer demands.' },
    { name: 'Bakery Manager', description: 'Oversee bakery operations including production, staff management, and customer service. Bakery managers ensure quality products and efficient business operations.' },
    { name: 'Bank Teller', description: 'Process customer transactions and provide basic banking services. Bank tellers handle deposits, withdrawals, and account inquiries while maintaining accurate records.' },
    { name: 'Bankruptcy Attorney', description: 'Specialize in bankruptcy law and help clients navigate financial difficulties. Bankruptcy attorneys guide individuals and businesses through debt relief processes.' },
    { name: 'Baseball Coach', description: 'Train and guide baseball players in techniques, strategy, and teamwork. Baseball coaches develop player skills and lead teams in competitive play.' },
    { name: 'Basketball Coach', description: 'Teach basketball skills and coach teams in competitive play. Basketball coaches develop game strategies and help players improve their athletic performance.' },
    { name: 'Beach Lifeguard', description: 'Monitor beach safety and rescue swimmers in distress. Beach lifeguards maintain water safety, provide first aid, and enforce beach regulations.' },
    { name: 'Beauty Consultant', description: 'Advise clients on cosmetics, skincare, and beauty products. Beauty consultants help customers choose products that enhance their appearance and meet their needs.' },
    { name: 'Bed and Breakfast Owner', description: 'Operate small hospitality businesses providing lodging and meals. Bed and breakfast owners create welcoming environments for travelers and tourists.' },
    { name: 'Behavioral Analyst', description: 'Study human behavior patterns and provide insights for various applications. Behavioral analysts work in psychology, marketing, and organizational development.' },
    { name: 'Benefits Administrator', description: 'Manage employee benefit programs and insurance plans. Benefits administrators help employees understand and utilize their workplace benefits effectively.' },
    { name: 'Beverage Server', description: 'Serve drinks and provide customer service in restaurants and bars. Beverage servers take orders, prepare drinks, and ensure customer satisfaction.' },
    { name: 'Bicycle Courier', description: 'Deliver packages and documents using bicycles in urban areas. Bicycle couriers provide fast, environmentally-friendly delivery services in busy city centers.' },
    { name: 'Bilingual Translator', description: 'Convert written or spoken content between different languages. Bilingual translators facilitate communication across language barriers in various professional settings.' },
    { name: 'Bioengineering Technician', description: 'Assist bioengineers in developing medical devices and biological systems. Bioengineering technicians support research and development in biotechnology applications.' },
    { name: 'Bioinformatics Specialist', description: 'Analyze biological data using computational tools and methods. Bioinformatics specialists work at the intersection of biology, computer science, and statistics.' },
    { name: 'Biological Technician', description: 'Support biological research by conducting experiments and collecting data. Biological technicians work in laboratories, field studies, and research institutions.' },
    { name: 'Biomechanical Engineer', description: 'Apply engineering principles to biological systems and medical applications. Biomechanical engineers develop prosthetics, medical devices, and rehabilitation equipment.' },
    { name: 'Biomedical Equipment Technician', description: 'Maintain and repair medical equipment in healthcare facilities. Biomedical equipment technicians ensure proper functioning of life-saving medical devices.' },
    { name: 'Biotechnology Researcher', description: 'Conduct research in biotechnology applications and genetic engineering. Biotechnology researchers develop new treatments, products, and scientific understanding.' },
    { name: 'Bird Trainer', description: 'Train birds for entertainment, education, or conservation purposes. Bird trainers work with various species to develop specific behaviors and skills.' },
    { name: 'Birth Doula', description: 'Provide emotional and physical support to women during childbirth. Birth doulas offer non-medical assistance and advocacy during labor and delivery.' },
    { name: 'Blockchain Developer', description: 'Create and maintain blockchain-based applications and systems. Blockchain developers work with cryptocurrency, smart contracts, and distributed ledger technologies.' },
    { name: 'Blood Bank Supervisor', description: 'Oversee blood collection, testing, and storage operations. Blood bank supervisors ensure safety protocols and quality control in blood banking facilities.' },
    { name: 'Boat Builder', description: 'Construct and repair boats and marine vessels. Boat builders work with various materials and techniques to create seaworthy watercraft.' },
    { name: 'Body Shop Estimator', description: 'Assess vehicle damage and estimate repair costs for auto body work. Body shop estimators provide accurate cost estimates for insurance and customer purposes.' },
    { name: 'Boiler Operator', description: 'Operate and maintain boiler systems in industrial and commercial facilities. Boiler operators ensure safe and efficient heating and power generation.' },
    { name: 'Bookbinder', description: 'Bind books and other printed materials using traditional and modern techniques. Bookbinders create durable and attractive finished products for publishers and customers.' },
    { name: 'Booking Agent', description: 'Arrange performances and appearances for entertainers and speakers. Booking agents negotiate contracts and coordinate schedules for their clients.' },
    { name: 'Border Security Agent', description: 'Monitor international borders and enforce immigration laws. Border security agents inspect travelers and cargo to maintain national security.' },
    { name: 'Bowling Instructor', description: 'Teach bowling techniques and skills to players of all levels. Bowling instructors help students improve their game and enjoy the sport.' },
    { name: 'Brand Ambassador', description: 'Represent companies and promote products at events and in public. Brand ambassadors create positive brand awareness and customer engagement.' },
    { name: 'Bread Baker', description: 'Specialize in baking various types of bread and baked goods. Bread bakers master traditional and artisanal baking techniques for quality products.' },
    { name: 'Breakfast Cook', description: 'Prepare breakfast items in restaurants and food service establishments. Breakfast cooks specialize in morning meal preparation and service.' },
    { name: 'Bridge Operator', description: 'Control movable bridges to allow boat traffic to pass. Bridge operators coordinate with marine and vehicle traffic to ensure safe passage.' },
    { name: 'Broadcast Engineer', description: 'Maintain and operate broadcasting equipment for radio and television stations. Broadcast engineers ensure quality signal transmission and equipment functionality.' },
    { name: 'Brokerage Clerk', description: 'Process securities transactions and maintain trading records. Brokerage clerks support financial advisors and traders in investment operations.' },
    { name: 'Budget Coordinator', description: 'Assist in budget planning and financial management for organizations. Budget coordinators help track expenses and ensure fiscal responsibility.' },
    { name: 'Building Contractor', description: 'Manage construction projects from planning to completion. Building contractors coordinate trades, materials, and schedules for successful project delivery.' },
    { name: 'Building Engineer', description: 'Maintain and operate building systems including HVAC, electrical, and plumbing. Building engineers ensure optimal building performance and occupant comfort.' },
    { name: 'Bulk Food Handler', description: 'Process and package bulk food products in manufacturing facilities. Bulk food handlers ensure food safety and quality in production environments.' }
  ],
  C: [
    { name: 'Carpenter', description: 'Build and repair wooden structures, furniture, and fixtures. Carpenters work on construction projects, custom furniture, and home renovations using various woodworking tools and techniques.' },
    { name: 'Chef', description: 'Plan menus, prepare meals, and manage kitchen operations in restaurants and food service establishments. Chefs combine culinary skills with creativity to create memorable dining experiences.' },
    { name: 'Computer Programmer', description: 'Write, test, and maintain software code for applications and systems. Computer programmers use various programming languages to create software solutions for businesses and consumers.' },
    { name: 'Counselor', description: 'Provide guidance and support to individuals facing personal, emotional, or psychological challenges. Counselors help clients develop coping strategies and improve their mental health and well-being.' },
    { name: 'Civil Engineer', description: 'Design and oversee construction of infrastructure projects like roads, bridges, and buildings. Civil engineers ensure public safety and environmental sustainability in construction projects.' },
    { name: 'Cashier', description: 'Process customer transactions and handle payments in retail stores and businesses. Cashiers provide customer service, operate point-of-sale systems, and maintain accurate transaction records.' },
    { name: 'Chiropractor', description: 'Diagnose and treat musculoskeletal disorders, particularly spine-related conditions. Chiropractors use manual adjustment techniques and other therapies to relieve pain and improve mobility.' },
    { name: 'Chemist', description: 'Study the composition, structure, and properties of matter. Chemists conduct research, develop new materials and products, and analyze chemical processes in various industries.' },
    { name: 'Construction Worker', description: 'Perform physical labor on construction sites, including building, demolition, and site preparation. Construction workers operate equipment and follow safety protocols on various projects.' },
    { name: 'Customer Service Representative', description: 'Assist customers with inquiries, complaints, and product information. Customer service representatives resolve issues, process orders, and maintain positive customer relationships.' },
    { name: 'Cybersecurity Specialist', description: 'Protect computer systems and networks from digital threats and attacks. Cybersecurity specialists implement security measures, monitor for breaches, and respond to security incidents.' },
    { name: 'Cinematographer', description: 'Capture visual images for films, television, and digital media. Cinematographers work with directors to create the visual style and mood of productions through camera work and lighting.' },
    { name: 'Clinical Psychologist', description: 'Assess, diagnose, and treat mental health disorders and emotional problems. Clinical psychologists use therapy and psychological testing to help patients improve their mental health.' },
    { name: 'Cosmetologist', description: 'Provide beauty services including hair cutting, coloring, styling, and skincare treatments. Cosmetologists work in salons and spas to help clients enhance their appearance.' },
    { name: 'Court Reporter', description: 'Create verbatim transcripts of legal proceedings, depositions, and meetings. Court reporters use specialized equipment to capture spoken words accurately for legal records.' },
    { name: 'Crane Operator', description: 'Operate heavy machinery to lift and move materials on construction sites. Crane operators require specialized training and certification to safely handle large construction equipment.' },
    { name: 'Creative Director', description: 'Lead creative teams and oversee artistic vision for advertising, media, and design projects. Creative directors guide concept development and ensure brand consistency across campaigns.' },
    { name: 'Credit Analyst', description: 'Evaluate creditworthiness of individuals and businesses applying for loans. Credit analysts assess financial risk and make recommendations for lending decisions.' },
    { name: 'Cruise Ship Worker', description: 'Provide various services aboard cruise ships, including hospitality, entertainment, and maintenance. Cruise ship workers travel while serving passengers from around the world.' },
    { name: 'Curator', description: 'Manage and organize collections in museums, galleries, and cultural institutions. Curators research artifacts, plan exhibitions, and educate the public about cultural heritage.' },
    { name: 'Customs Officer', description: 'Inspect goods and people entering or leaving a country to enforce trade and immigration laws. Customs officers prevent smuggling and ensure compliance with regulations.' },
    { name: 'Cybersecurity Analyst', description: 'Monitor and analyze security threats to protect organizational data and systems. Cybersecurity analysts implement protective measures and respond to security breaches.' },
    { name: 'Call Center Agent', description: 'Handle incoming and outgoing phone calls for customer service, sales, or support. Call center agents assist customers with inquiries and resolve issues over the phone.' },
    { name: 'Camera Operator', description: 'Operate cameras for television, film, and video productions. Camera operators work with directors and cinematographers to capture footage according to creative specifications.' },
    { name: 'Camp Counselor', description: 'Supervise and lead activities for children and teens at summer camps and recreational programs. Camp counselors ensure safety while providing fun and educational experiences.' },
    { name: 'Canine Handler', description: 'Train and work with dogs for various purposes including law enforcement, security, and therapy. Canine handlers develop strong bonds with their working dogs.' },
    { name: 'Car Salesperson', description: 'Sell new and used vehicles to customers at automotive dealerships. Car salespeople help customers find suitable vehicles and negotiate purchase terms.' },
    { name: 'Cardiac Technician', description: 'Assist in diagnosing and treating heart conditions using specialized medical equipment. Cardiac technicians perform tests and monitor patients during cardiac procedures.' },
    { name: 'Career Counselor', description: 'Help individuals explore career options and develop professional goals. Career counselors provide guidance on job searching, resume writing, and career transitions.' },
    { name: 'Caregiver', description: 'Provide personal care and assistance to elderly, disabled, or ill individuals. Caregivers help with daily activities, medication management, and emotional support.' },
    { name: 'Cartographer', description: 'Create maps and charts using geographic data and surveying information. Cartographers use technology and artistic skills to produce accurate and useful geographic representations.' },
    { name: 'Casino Dealer', description: 'Operate table games in casinos and gaming establishments. Casino dealers manage card games, handle chips, and ensure fair play while providing entertainment to guests.' },
    { name: 'Caterer', description: 'Plan and provide food services for events, parties, and special occasions. Caterers coordinate menus, prepare food, and manage service staff for various gatherings.' },
    { name: 'Cemetery Worker', description: 'Maintain cemetery grounds and assist with burial services. Cemetery workers perform landscaping, grave digging, and administrative duties to maintain respectful memorial spaces.' },
    { name: 'Ceramic Artist', description: 'Create pottery, sculptures, and decorative objects using clay and ceramic materials. Ceramic artists combine artistic vision with technical skills in firing and glazing techniques.' },
    { name: 'Chaplain', description: 'Provide spiritual guidance and support in hospitals, military, prisons, and other institutions. Chaplains offer counseling and religious services to people of various faiths.' },
    { name: 'Chemical Engineer', description: 'Design processes for manufacturing chemicals, pharmaceuticals, and other products. Chemical engineers optimize production methods and ensure safety in industrial operations.' },
    { name: 'Child Care Worker', description: 'Supervise and care for children in daycare centers, schools, and private homes. Child care workers provide educational activities and ensure child safety and development.' },
    { name: 'Choreographer', description: 'Create and teach dance routines for performances, films, and events. Choreographers combine artistic creativity with knowledge of movement and music to design compelling dances.' },
    { name: 'City Planner', description: 'Design and organize urban development projects and land use policies. City planners work with communities to create sustainable and functional urban environments.' },
    { name: 'Claims Adjuster', description: 'Investigate insurance claims and determine coverage and compensation amounts. Claims adjusters interview claimants, inspect damage, and negotiate settlements.' },
    { name: 'Cleaning Service Worker', description: 'Maintain cleanliness in residential and commercial buildings. Cleaning service workers perform various cleaning tasks and use specialized equipment and products.' },
    { name: 'Clinical Laboratory Technician', description: 'Perform medical tests on blood, tissue, and other body fluids. Clinical laboratory technicians use sophisticated equipment to help diagnose diseases and monitor health.' },
    { name: 'Clock Repairer', description: 'Repair and maintain clocks and timepieces. Clock repairers work with mechanical and electronic timing devices to restore proper function.' },
    { name: 'Closet Organizer', description: 'Design and organize storage spaces for homes and businesses. Closet organizers help clients maximize space efficiency and organization.' },
    { name: 'Cloud Computing Specialist', description: 'Manage and implement cloud-based computing solutions. Cloud computing specialists help organizations migrate to and optimize cloud technologies.' },
    { name: 'Coach Driver', description: 'Operate passenger coaches and tour buses for transportation services. Coach drivers provide safe and comfortable travel experiences for passengers.' },
    { name: 'Coal Miner', description: 'Extract coal from underground mines and surface operations. Coal miners operate heavy equipment and follow safety protocols in mining environments.' },
    { name: 'Coast Guard Officer', description: 'Serve in maritime law enforcement and rescue operations. Coast Guard officers protect waterways and assist mariners in distress.' },
    { name: 'Coating Technician', description: 'Apply protective and decorative coatings to various surfaces and materials. Coating technicians work in manufacturing and industrial applications.' },
    { name: 'Coffee Roaster', description: 'Roast coffee beans to achieve desired flavor profiles. Coffee roasters combine art and science to create quality coffee products.' },
    { name: 'Coin Dealer', description: 'Buy, sell, and appraise coins and currency for collectors. Coin dealers have expertise in numismatics and precious metals markets.' },
    { name: 'Cold Storage Manager', description: 'Oversee refrigerated storage facilities and temperature-controlled environments. Cold storage managers ensure proper preservation of perishable goods.' },
    { name: 'College Admissions Counselor', description: 'Guide prospective students through college application processes. College admissions counselors help students find suitable educational opportunities.' },
    { name: 'Color Consultant', description: 'Advise clients on color schemes for interior design and branding. Color consultants use color theory to create appealing and effective color combinations.' },
    { name: 'Combat Medic', description: 'Provide medical care in military combat situations. Combat medics are trained to treat injuries under dangerous and challenging conditions.' },
    { name: 'Commercial Diver', description: 'Perform underwater work for construction, inspection, and repair projects. Commercial divers work in challenging underwater environments for various industries.' },
    { name: 'Commercial Pilot', description: 'Fly aircraft for cargo transport, charter flights, and commercial aviation. Commercial pilots transport passengers and goods safely and efficiently.' },
    { name: 'Community Health Worker', description: 'Provide health education and basic care in community settings. Community health workers bridge gaps between healthcare systems and underserved populations.' },
    { name: 'Compliance Officer', description: 'Ensure organizations follow laws, regulations, and internal policies. Compliance officers monitor adherence to legal and ethical standards.' },
    { name: 'Computer Hardware Engineer', description: 'Design and develop computer components and systems. Computer hardware engineers create processors, memory devices, and other computing hardware.' },
    { name: 'Computer Support Specialist', description: 'Provide technical assistance and troubleshooting for computer users. Computer support specialists help resolve hardware and software issues.' },
    { name: 'Concrete Finisher', description: 'Smooth and finish concrete surfaces in construction projects. Concrete finishers ensure proper texture and appearance of concrete installations.' },
    { name: 'Conference Planner', description: 'Organize and coordinate professional conferences and meetings. Conference planners manage logistics, speakers, and attendee experiences.' },
    { name: 'Conservation Scientist', description: 'Protect and manage natural resources and ecosystems. Conservation scientists work to preserve biodiversity and environmental sustainability.' },
    { name: 'Construction Estimator', description: 'Calculate costs and materials needed for construction projects. Construction estimators provide accurate project budgets and resource planning.' },
    { name: 'Construction Foreman', description: 'Supervise construction crews and ensure project quality and safety. Construction foremen coordinate work activities and maintain construction standards.' },
    { name: 'Consumer Advocate', description: 'Represent consumer interests and rights in various industries. Consumer advocates work to protect consumers from unfair practices and policies.' },
    { name: 'Content Creator', description: 'Develop engaging content for digital platforms and media. Content creators produce videos, articles, and multimedia content for online audiences.' },
    { name: 'Contract Negotiator', description: 'Negotiate terms and conditions for business contracts and agreements. Contract negotiators ensure favorable terms and legal compliance.' },
    { name: 'Convenience Store Manager', description: 'Oversee daily operations of convenience stores and retail outlets. Convenience store managers manage inventory, staff, and customer service.' }
  ],
  D: [
    { name: 'Doctor', description: 'Diagnose and treat illnesses, injuries, and medical conditions. Doctors examine patients, prescribe medications, and provide medical care across various specialties and healthcare settings.' },
    { name: 'Dentist', description: 'Diagnose and treat problems with teeth, gums, and oral health. Dentists perform cleanings, fillings, extractions, and other procedures to maintain oral health and prevent disease.' },
    { name: 'Data Scientist', description: 'Analyze large datasets to extract insights and patterns for business decision-making. Data scientists use statistical methods, machine learning, and programming to solve complex problems.' },
    { name: 'Detective', description: 'Investigate crimes and gather evidence to solve criminal cases. Detectives interview witnesses, analyze evidence, and work with law enforcement to bring criminals to justice.' },
    { name: 'Designer', description: 'Create visual concepts and designs for various media and products. Designers work in graphic design, web design, fashion, interior design, and other creative fields.' },
    { name: 'Delivery Driver', description: 'Transport goods and packages to customers and businesses. Delivery drivers navigate routes efficiently while ensuring safe and timely delivery of items.' },
    { name: 'Diesel Mechanic', description: 'Repair and maintain diesel engines in trucks, buses, and heavy equipment. Diesel mechanics diagnose problems and perform maintenance to keep vehicles operating efficiently.' },
    { name: 'Dietitian', description: 'Provide nutrition counseling and develop meal plans for individuals and groups. Dietitians help people improve their health through proper nutrition and dietary choices.' },
    { name: 'Director', description: 'Lead and coordinate creative projects in film, television, theater, and other media. Directors guide artistic vision and manage production teams to create compelling content.' },
    { name: 'Dispatcher', description: 'Coordinate and communicate with emergency services, transportation, and delivery personnel. Dispatchers manage schedules, routes, and respond to urgent situations.' },
    { name: 'Dog Trainer', description: 'Teach dogs obedience, tricks, and specialized behaviors. Dog trainers work with pet owners to improve dog behavior and strengthen human-animal relationships.' },
    { name: 'Drone Pilot', description: 'Operate unmanned aerial vehicles for various commercial and recreational purposes. Drone pilots capture aerial footage, conduct inspections, and perform specialized missions.' },
    { name: 'Database Administrator', description: 'Manage and maintain computer databases for organizations. Database administrators ensure data security, performance, and accessibility while troubleshooting technical issues.' },
    { name: 'Dance Instructor', description: 'Teach various dance styles and techniques to students of all ages. Dance instructors choreograph routines, provide technique instruction, and prepare students for performances.' },
    { name: 'Daycare Provider', description: 'Care for children in daycare facilities or home-based settings. Daycare providers supervise activities, ensure safety, and support early childhood development.' },
    { name: 'Debt Collector', description: 'Contact debtors to collect overdue payments and negotiate payment plans. Debt collectors work to recover outstanding debts for creditors and collection agencies.' },
    { name: 'Deck Hand', description: 'Assist with ship operations and maintenance on boats and vessels. Deck hands perform various tasks to support maritime operations and vessel safety.' },
    { name: 'Demolition Worker', description: 'Safely tear down buildings and structures using specialized equipment. Demolition workers follow safety protocols to clear sites for new construction.' },
    { name: 'Dental Assistant', description: 'Support dentists during procedures and help with patient care. Dental assistants prepare instruments, take X-rays, and provide chairside assistance.' },
    { name: 'Dental Hygienist', description: 'Clean teeth and provide preventive dental care to patients. Dental hygienists educate patients about oral health and perform routine cleanings.' },
    { name: 'Department Store Manager', description: 'Oversee retail department operations including sales, inventory, and staff. Department store managers ensure efficient operations and customer satisfaction.' },
    { name: 'Desktop Publisher', description: 'Design and layout printed materials using computer software. Desktop publishers create brochures, newsletters, and other publications.' },
    { name: 'Development Coordinator', description: 'Support fundraising and development activities for nonprofit organizations. Development coordinators help secure funding and donor relationships.' },
    { name: 'Diagnostic Medical Sonographer', description: 'Use ultrasound equipment to create images for medical diagnosis. Diagnostic medical sonographers help doctors diagnose medical conditions.' },
    { name: 'Diamond Cutter', description: 'Cut and shape diamonds and precious stones for jewelry. Diamond cutters use precision tools and techniques to create beautiful gemstones.' },
    { name: 'Digital Marketing Specialist', description: 'Develop and implement online marketing strategies and campaigns. Digital marketing specialists use various digital channels to reach target audiences.' },
    { name: 'Dining Room Manager', description: 'Oversee restaurant dining room operations and customer service. Dining room managers ensure smooth service and positive dining experiences.' },
    { name: 'Diplomatic Security Agent', description: 'Provide security for diplomatic personnel and facilities. Diplomatic security agents protect embassies, consulates, and diplomatic missions.' },
    { name: 'Disability Services Coordinator', description: 'Help individuals with disabilities access services and accommodations. Disability services coordinators advocate for accessibility and inclusion.' }
  ],
  E: [
    { name: 'Engineer', description: 'Design, build, and maintain various systems, structures, and technologies. Engineers work in multiple specialties including mechanical, electrical, software, and environmental engineering.' },
    { name: 'Electrician', description: 'Install, maintain, and repair electrical systems in buildings and equipment. Electricians ensure safe electrical operations and troubleshoot electrical problems.' },
    { name: 'Emergency Medical Technician', description: 'Provide emergency medical care and transport patients to medical facilities. EMTs respond to medical emergencies and provide life-saving treatment in critical situations.' },
    { name: 'Event Planner', description: 'Organize and coordinate special events, conferences, and celebrations. Event planners manage logistics, vendors, and timelines to create successful gatherings.' },
    { name: 'Editor', description: 'Review and revise written content for publications, websites, and media. Editors ensure accuracy, clarity, and quality in various forms of written communication.' },
    { name: 'Economist', description: 'Study economic trends, markets, and financial systems. Economists analyze data to understand economic behavior and provide insights for policy and business decisions.' },
    { name: 'Environmental Scientist', description: 'Study environmental problems and develop solutions for pollution, conservation, and sustainability. Environmental scientists work to protect ecosystems and human health.' },
    { name: 'Entrepreneur', description: 'Start and develop new business ventures and innovations. Entrepreneurs identify opportunities, take risks, and create value through innovative products and services.' },
    { name: 'Epidemiologist', description: 'Study patterns and causes of diseases in populations. Epidemiologists investigate disease outbreaks and develop strategies for disease prevention and public health.' },
    { name: 'Esthetician', description: 'Provide skincare treatments and beauty services. Estheticians perform facials, hair removal, and other cosmetic procedures to improve skin health and appearance.' },
    { name: 'Ethics Officer', description: 'Ensure organizations comply with ethical standards and regulations. Ethics officers develop policies, investigate violations, and promote ethical behavior in business practices.' },
    { name: 'Exercise Physiologist', description: 'Design fitness and rehabilitation programs based on scientific principles. Exercise physiologists help people improve health through customized exercise and wellness programs.' },
    { name: 'Exterminator', description: 'Control and eliminate pest infestations in residential and commercial properties. Exterminators use various methods to safely remove insects, rodents, and other unwanted pests.' },
    { name: 'Emergency Dispatcher', description: 'Receive and coordinate emergency calls for police, fire, and medical services. Emergency dispatchers quickly assess situations and deploy appropriate emergency response teams.' },
    { name: 'Equipment Operator', description: 'Operate heavy machinery and equipment for construction, mining, and industrial projects. Equipment operators require specialized training to safely handle complex machinery.' },
    { name: 'Escape Room Designer', description: 'Create immersive puzzle experiences and escape room challenges. Escape room designers combine creativity with problem-solving to design engaging entertainment.' },
    { name: 'Estate Planner', description: 'Help clients plan for the transfer of assets and wealth. Estate planners provide legal and financial advice for inheritance and legacy planning.' },
    { name: 'Ethical Hacker', description: 'Test computer systems for security vulnerabilities using authorized hacking techniques. Ethical hackers help organizations improve their cybersecurity defenses.' },
    { name: 'Ethnomusicologist', description: 'Study music in cultural and social contexts around the world. Ethnomusicologists research musical traditions and their cultural significance.' },
    { name: 'Event Coordinator', description: 'Assist with planning and executing events and special occasions. Event coordinators handle logistics and ensure successful event implementation.' },
    { name: 'Evidence Technician', description: 'Collect and process physical evidence for law enforcement investigations. Evidence technicians maintain chain of custody and preserve evidence integrity.' },
    { name: 'Executive Assistant', description: 'Provide high-level administrative support to executives and senior management. Executive assistants manage schedules, communications, and special projects.' },
    { name: 'Executive Chef', description: 'Lead kitchen operations and menu development in restaurants and food service. Executive chefs oversee culinary teams and maintain food quality standards.' },
    { name: 'Exercise Equipment Technician', description: 'Repair and maintain fitness equipment in gyms and health clubs. Exercise equipment technicians ensure safe and functional exercise machines.' },
    { name: 'Exhibit Designer', description: 'Create displays and exhibitions for museums, trade shows, and events. Exhibit designers combine artistic vision with practical display solutions.' },
    { name: 'Export Specialist', description: 'Manage international shipping and export documentation. Export specialists ensure compliance with international trade regulations and customs requirements.' },
    { name: 'Eye Bank Technician', description: 'Process and preserve donated eye tissue for transplantation. Eye bank technicians help restore sight through corneal transplant procedures.' },
    { name: 'Elevator Technician', description: 'Install, maintain, and repair elevators and escalators. Elevator technicians ensure safe vertical transportation in buildings and facilities.' },
    { name: 'Emergency Management Director', description: 'Plan and coordinate emergency response and disaster preparedness programs. Emergency management directors help communities prepare for and respond to emergencies.' }
  ],
  F: [
    { name: 'Farmer', description: 'Grow crops and raise livestock for food production. Farmers manage agricultural operations, from planting and harvesting to animal care and land management.' },
    { name: 'Fashion Designer', description: 'Create clothing and accessory designs for the fashion industry. Fashion designers combine artistic vision with knowledge of textiles and market trends.' },
    { name: 'Firefighter', description: 'Respond to fires and emergency situations to protect lives and property. Firefighters provide rescue services, medical aid, and fire prevention education.' },
    { name: 'Financial Advisor', description: 'Help individuals and businesses make investment and financial planning decisions. Financial advisors provide guidance on retirement, insurance, and wealth management.' },
    { name: 'Flight Attendant', description: 'Ensure passenger safety and comfort during air travel. Flight attendants provide emergency assistance, serve meals, and maintain cabin safety protocols.' },
    { name: 'Florist', description: 'Design and arrange flowers for various occasions and events. Florists create bouquets, centerpieces, and floral displays for weddings, funerals, and celebrations.' },
    { name: 'Forensic Scientist', description: 'Analyze physical evidence from crime scenes using scientific methods. Forensic scientists help solve crimes through laboratory analysis and expert testimony.' },
    { name: 'Film Director', description: 'Guide the creative and technical aspects of film production. Film directors work with actors, cinematographers, and crew to bring stories to life on screen.' },
    { name: 'Fitness Trainer', description: 'Help clients achieve health and fitness goals through exercise programs. Fitness trainers design workouts, provide motivation, and ensure safe exercise practices.' },
    { name: 'Food Scientist', description: 'Study the physical, chemical, and biological properties of food. Food scientists develop new products, improve food safety, and enhance nutritional value.' },
    { name: 'Foreign Language Interpreter', description: 'Translate spoken language in real-time for meetings, conferences, and events. Foreign language interpreters facilitate communication across language barriers.' },
    { name: 'Funeral Director', description: 'Coordinate funeral services and support grieving families. Funeral directors handle arrangements, legal requirements, and provide compassionate care during difficult times.' },
    { name: 'Freelance Writer', description: 'Create written content for various clients and publications. Freelance writers work independently on articles, blogs, marketing copy, and other written materials.' },
    { name: 'Factory Worker', description: 'Operate machinery and perform assembly tasks in manufacturing facilities. Factory workers ensure production quality and efficiency in industrial settings.' },
    { name: 'Family Therapist', description: 'Provide counseling services to families and couples. Family therapists help resolve conflicts, improve communication, and strengthen family relationships.' },
    { name: 'Farm Equipment Operator', description: 'Operate and maintain agricultural machinery and equipment. Farm equipment operators work with tractors, harvesters, and other specialized farming tools.' },
    { name: 'Fashion Buyer', description: 'Select and purchase clothing and accessories for retail stores. Fashion buyers analyze trends, negotiate with suppliers, and choose products for their target market.' },
    { name: 'Fast Food Manager', description: 'Oversee operations in quick-service restaurants. Fast food managers handle staff scheduling, inventory, customer service, and quality control.' },
    { name: 'Federal Agent', description: 'Investigate federal crimes and enforce federal laws. Federal agents work for agencies like the FBI, DEA, and ATF to protect national security.' },
    { name: 'Fence Installer', description: 'Install and repair fences for residential and commercial properties. Fence installers work with various materials including wood, metal, and vinyl.' },
    { name: 'Ferry Operator', description: 'Navigate passenger and vehicle ferries across waterways. Ferry operators ensure safe transportation and follow maritime safety protocols.' },
    { name: 'Field Service Technician', description: 'Repair and maintain equipment at customer locations. Field service technicians travel to various sites to provide technical support and repairs.' },
    { name: 'File Clerk', description: 'Organize and maintain paper and electronic filing systems. File clerks ensure documents are properly stored and easily retrievable when needed.' },
    { name: 'Film Editor', description: 'Assemble and edit video footage to create final film products. Film editors work with directors to craft compelling narratives through post-production.' },
    { name: 'Financial Analyst', description: 'Analyze financial data and market trends to guide investment decisions. Financial analysts provide recommendations for businesses and investment firms.' },
    { name: 'Fire Inspector', description: 'Examine buildings and facilities for fire safety compliance. Fire inspectors ensure proper fire prevention measures and safety equipment installation.' },
    { name: 'Fish and Game Warden', description: 'Enforce hunting and fishing regulations and protect wildlife. Fish and game wardens patrol natural areas and educate the public about conservation.' },
    { name: 'Fitness Equipment Technician', description: 'Repair and maintain exercise machines and fitness equipment. Fitness equipment technicians ensure gym equipment operates safely and efficiently.' },
    { name: 'Flight Engineer', description: 'Monitor aircraft systems and assist pilots during flight operations. Flight engineers ensure proper aircraft performance and safety during flights.' }
  ],
  G: [
    { name: 'Graphic Designer', description: 'Create visual designs for print and digital media. Graphic designers combine typography, images, and color to communicate messages effectively.' },
    { name: 'Game Developer', description: 'Design and program video games for various platforms. Game developers create interactive entertainment experiences using programming and creative skills.' },
    { name: 'Geologist', description: 'Study the Earth\'s structure, composition, and processes. Geologists investigate rocks, minerals, and geological formations to understand Earth\'s history.' },
    { name: 'General Manager', description: 'Oversee overall operations and strategy for businesses or departments. General managers coordinate various functions to achieve organizational goals.' },
    { name: 'Guidance Counselor', description: 'Help students with academic planning and personal development. Guidance counselors provide support for educational and career decisions.' },
    { name: 'Gardener', description: 'Maintain and cultivate gardens, lawns, and landscaped areas. Gardeners plant, prune, and care for various plants and outdoor spaces.' },
    { name: 'Geneticist', description: 'Study genes and heredity in living organisms. Geneticists research genetic disorders, inheritance patterns, and gene therapy applications.' },
    { name: 'Government Official', description: 'Serve in elected or appointed positions in government agencies. Government officials develop policies and provide public services to communities.' },
    { name: 'Grant Writer', description: 'Prepare proposals to secure funding for organizations and projects. Grant writers research opportunities and craft compelling funding requests.' },
    { name: 'Gym Manager', description: 'Oversee fitness facility operations including staff, equipment, and member services. Gym managers ensure smooth facility operations and customer satisfaction.' },
    { name: 'Glass Blower', description: 'Create glass objects using traditional glassmaking techniques. Glass blowers shape molten glass into artistic and functional items.' },
    { name: 'Golf Instructor', description: 'Teach golf techniques and skills to players of all levels. Golf instructors help students improve their game and enjoy the sport.' },
    { name: 'Groundskeeper', description: 'Maintain outdoor areas including parks, sports fields, and institutional grounds. Groundskeepers ensure attractive and functional outdoor spaces.' },
    { name: 'Guest Services Manager', description: 'Oversee customer service operations in hospitality settings. Guest services managers ensure positive experiences for hotel and resort guests.' },
    { name: 'Guitar Teacher', description: 'Provide guitar instruction to students of various skill levels. Guitar teachers help students learn techniques, music theory, and performance skills.' }
  ],
  H: [
    { name: 'Hair Stylist', description: 'Cut, color, and style hair for clients in salons and spas. Hair stylists help clients achieve desired looks and maintain healthy hair.' },
    { name: 'Hotel Manager', description: 'Oversee hotel operations including guest services, staff management, and facility maintenance. Hotel managers ensure positive guest experiences.' },
    { name: 'Human Resources Manager', description: 'Manage employee relations, recruitment, and workplace policies. HR managers handle personnel issues and organizational development.' },
    { name: 'Historian', description: 'Research and analyze historical events, documents, and artifacts. Historians preserve and interpret the past for education and understanding.' },
    { name: 'Home Inspector', description: 'Examine residential properties for structural and safety issues. Home inspectors provide detailed reports for buyers and sellers.' },
    { name: 'Horticulturist', description: 'Study and cultivate plants, flowers, and gardens. Horticulturists work in landscaping, agriculture, and botanical research.' },
    { name: 'Hospital Administrator', description: 'Manage healthcare facility operations and administrative functions. Hospital administrators ensure efficient healthcare delivery and compliance.' },
    { name: 'HVAC Technician', description: 'Install and repair heating, ventilation, and air conditioning systems. HVAC technicians maintain climate control systems in buildings.' },
    { name: 'Hydrologist', description: 'Study water resources and water cycle processes. Hydrologists work on water management, flood control, and environmental protection.' },
    { name: 'Heavy Equipment Operator', description: 'Operate large machinery for construction and industrial projects. Heavy equipment operators work with bulldozers, cranes, and excavators.' }
  ],
  I: [
    { name: 'Interior Designer', description: 'Plan and design interior spaces for homes and businesses. Interior designers create functional and aesthetically pleasing environments.' },
    { name: 'Insurance Agent', description: 'Sell insurance policies and help clients choose appropriate coverage. Insurance agents provide risk assessment and claims assistance.' },
    { name: 'IT Support Specialist', description: 'Provide technical assistance and troubleshooting for computer systems. IT support specialists help users resolve technology issues.' },
    { name: 'Illustrator', description: 'Create visual artwork for books, magazines, and digital media. Illustrators combine artistic skills with storytelling and communication.' },
    { name: 'Immigration Officer', description: 'Process immigration applications and enforce immigration laws. Immigration officers interview applicants and make decisions on entry permits.' },
    { name: 'Industrial Engineer', description: 'Optimize manufacturing processes and improve operational efficiency. Industrial engineers design systems to reduce waste and increase productivity.' },
    { name: 'Investment Banker', description: 'Provide financial services for corporations and governments. Investment bankers help with mergers, acquisitions, and capital raising.' },
    { name: 'Interpreter', description: 'Translate spoken language in real-time for various settings. Interpreters facilitate communication between people who speak different languages.' },
    { name: 'Inventory Manager', description: 'Oversee stock levels and supply chain operations. Inventory managers ensure adequate product availability while minimizing costs.' },
    { name: 'Ice Cream Maker', description: 'Create and produce ice cream and frozen desserts. Ice cream makers develop flavors and manage production processes.' }
  ],
  J: [
    { name: 'Journalist', description: 'Research, write, and report news stories for various media outlets. Journalists investigate events and communicate information to the public.' },
    { name: 'Judge', description: 'Preside over legal proceedings and make judicial decisions. Judges ensure fair trials and interpret laws in court cases.' },
    { name: 'Janitor', description: 'Clean and maintain buildings and facilities. Janitors ensure sanitary and safe environments in various types of buildings.' },
    { name: 'Jeweler', description: 'Design, create, and repair jewelry and precious metal items. Jewelers work with gems, metals, and specialized tools.' },
    { name: 'Job Coach', description: 'Help individuals with disabilities or barriers find and maintain employment. Job coaches provide workplace support and skills training.' },
    { name: 'Jazz Musician', description: 'Perform jazz music in various venues and settings. Jazz musicians master improvisation and complex musical techniques.' },
    { name: 'Jockey', description: 'Ride horses in competitive racing events. Jockeys require exceptional riding skills and physical fitness for horse racing.' },
    { name: 'Juvenile Counselor', description: 'Work with young people in correctional or treatment facilities. Juvenile counselors provide guidance and rehabilitation services.' },
    { name: 'Justice of the Peace', description: 'Perform civil ceremonies and handle minor legal matters. Justices of the peace officiate weddings and resolve small disputes.' },
    { name: 'Janitorial Supervisor', description: 'Oversee cleaning staff and facility maintenance operations. Janitorial supervisors ensure quality cleaning standards and staff coordination.' }
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
        pageType="students-hub"
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
