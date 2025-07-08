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
    { name: 'Acquisition Specialist', description: 'Manage procurement processes and vendor relationships for organizations. Acquisition specialists negotiate contracts and ensure cost-effective purchasing decisions.' }
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
    { name: 'Boiler Operator', description: 'Operate and maintain boiler systems in industrial and commercial facilities. Boiler operators ensure safe and efficient heating and power generation.' }
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
    { name: 'Clinical Laboratory Technician', description: 'Perform medical tests on blood, tissue, and other body fluids. Clinical laboratory technicians use sophisticated equipment to help diagnose diseases and monitor health.' }
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
    { name: 'Daycare Provider', description: 'Care for children in daycare facilities or home-based settings. Daycare providers supervise activities, ensure safety, and support early childhood development.' }
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
    { name: 'Equipment Operator', description: 'Operate heavy machinery and equipment for construction, mining, and industrial projects. Equipment operators require specialized training to safely handle complex machinery.' }
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
