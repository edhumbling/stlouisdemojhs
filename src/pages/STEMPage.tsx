import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Calculator, Microscope, Cpu, Lightbulb, Rocket } from 'lucide-react';

const STEMPage: React.FC = () => {
  // CSS for the simple colored links using school colors
  const yellowLinkClass = "font-medium text-school-yellow hover:underline hover:text-yellow-400 transition-colors";
  const greenLinkClass = "font-medium text-school-green hover:underline hover:text-emerald-600 transition-colors";
  const blueLinkClass = "font-medium text-school-blue hover:underline hover:text-blue-400 transition-colors";

  // STEM Resources data
  const stemWebsites = [
    { name: "Khan Academy", url: "https://www.khanacademy.org/" },
    { name: "Sheppard Software", url: "https://www.sheppardsoftware.com/" },
    { name: "Zooniverse", url: "https://www.zooniverse.org/" },
    { name: "LearnToMod", url: "https://www.learntomod.com/" },
    { name: "Lego Mindstorms", url: "https://www.lego.com/en-us/themes/mindstorms" },
    { name: "Women@NASA", url: "https://women.nasa.gov/" },
    { name: "CanTEEN", url: "https://www.canteengirl.org/" },
    { name: "Engineer Girl!", url: "https://www.engineergirl.org/" },
    { name: "Engineer Your Life", url: "https://www.engineeryourlife.org/" },
    { name: "For Girls in Science", url: "https://www.forgirlsinscience.org/" },
    { name: "Girl Scouts STEM Program", url: "https://www.girlscouts.org/en/about-girl-scouts/girl-scouts-and-stem.html" },
    { name: "Society of Women Engineers (SWE) K-12 Outreach", url: "https://swe.org/k-12-outreach/" },
    { name: "G2O: Generating Girls Opportunities", url: "https://www.cwealf.org/g2o/" },
    { name: "The Big Brain Theory – Discovery Channel", url: "https://www.discovery.com/shows/the-big-brain-theory" },
    { name: "Bill Nye the Science Guy", url: "https://billnye.com/" },
    { name: "SciJinks", url: "https://scijinks.gov/" },
    { name: "MythBusters – Discovery Channel", url: "https://www.discovery.com/shows/mythbusters" },
    { name: "Scratch", url: "https://scratch.mit.edu/" },
    { name: "Funology", url: "https://www.funology.com/" },
    { name: "Helping Your Child Learn Mathematics", url: "https://www2.ed.gov/parents/academic/help/math/index.html" },
    { name: "NASA Kids' Club", url: "https://www.nasa.gov/kidsclub/index.html" },
    { name: "NASA Space Place", url: "https://spaceplace.nasa.gov/" },
    { name: "TechRocket", url: "https://www.techrocket.com/" },
    { name: "Arrick Robotics", url: "http://www.arrickrobotics.com/" },
    { name: "Codecademy", url: "https://www.codecademy.com/" },
    { name: "DiscoverE", url: "https://www.discovere.org/" },
    { name: "Student Science", url: "https://www.sciencenews.org/student-science" },
    { name: "Code.org", url: "https://code.org/" },
    { name: "Exploratorium", url: "https://www.exploratorium.edu/" },
    { name: "How Stuff Works", url: "https://www.howstuffworks.com/" },
    { name: "NASA Education for Students", url: "https://www.nasa.gov/stem/" },
    { name: "NASA Science, Engineering, Mathematics and Aerospace Academy (SEMAA)", url: "https://www.nasa.gov/offices/education/programs/national/semaa/home/index.html" },
    { name: "NOVA", url: "https://www.pbs.org/wgbh/nova/" },
    { name: "Science Buddies", url: "https://www.sciencebuddies.org/" },
    { name: "Tynker", url: "https://www.tynker.com/" }
  ];

  const governmentInitiatives = [
    { name: "Educate to Innovate", url: "https://obamawhitehouse.archives.gov/issues/education/k-12/educate-innovate" },
    { name: "Women in STEM", url: "https://www.whitehouse.gov/ostp/women-in-stem/" }
  ];

  const scienceGamesApps = [
    { name: "Hopscotch (Make your own games)", url: "https://www.gethopscotch.com/" },
    { name: "Virtual Frog Dissection", url: "https://frogdissection.com/" },
    { name: "Solar System for iPad", url: "https://apps.apple.com/us/app/solar-system-for-ipad/id406795422" },
    { name: "National Geographic Apps", url: "https://www.nationalgeographic.com/apps/" },
    { name: "Algebra Touch App", url: "https://apps.apple.com/us/app/algebra-touch/id384354262" },
    { name: "Auditorium: The Online Experience", url: "https://www.cipherprime.com/games/auditorium/" },
    { name: "Minecraft", url: "https://www.minecraft.net/" },
    { name: "Mathemagics Mental Math Tricks", url: "https://apps.apple.com/us/app/mathemagics-mental-math-tricks/id306586847" },
    { name: "Quantum Conundrum", url: "https://store.steampowered.com/app/200010/Quantum_Conundrum/" },
    { name: "Robots for iPad App", url: "https://apps.apple.com/us/app/robots-for-ipad/id566581917" },
    { name: "You Can Do the Rubik's Cube", url: "https://www.youcandothecube.com/" },
    { name: "Kinetic City", url: "https://www.kineticcity.com/" },
    { name: "Move the Turtle: Programming for Kids App", url: "https://apps.apple.com/us/app/move-the-turtle-programming-for-kids/id509013878" },
    { name: "Robot Turtles", url: "https://www.thinkfun.com/products/robot-turtles/" }
  ];

  const mathGamesApps = [
    { name: "Cool Math Games", url: "https://www.coolmath.com/" },
    { name: "Geometry Quest App", url: "https://apps.apple.com/us/app/geometry-quest/id609252845" },
    { name: "Math Blaster", url: "https://www.mathblaster.com/" },
    { name: "Mystery Math Town", url: "https://apps.apple.com/us/app/mystery-math-town/id619404402" }
  ];

  const stemCamps = [
    { name: "Camp Reach", url: "https://www.wpi.edu/academics/pre-collegiate/summer-programs/camp-reach" },
    { name: "Girls' Adventures in Mathematics, Engineering, and Science (G.A.M.E.S.)", url: "https://games.grainger.illinois.edu/" },
    { name: "Students with Potential and Interest, Considering Engineering (S.P.I.C.E.)", url: "https://eng.umd.edu/k12/spice" },
    { name: "iD Game Design & Development Academy", url: "https://www.idtech.com/courses/game-design-development" },
    { name: "Science and Engineering Apprenticeship Program (SEAP)", url: "https://www.navsea.navy.mil/Home/Warfare-Centers/STEM/SEAP/" },
    { name: "Camp Euclid: A Mathematics Research Camp", url: "https://euclidlab.org/camp-euclid" },
    { name: "Engineering Summer Camps", url: "https://www.engineeringedu.com/store/index.php?route=information/information&information_id=8" },
    { name: "Physics Wonder Girls at Indiana Wesleyan University", url: "https://www.indwes.edu/undergraduate/division-of-natural-sciences/physics-wonder-girls/" },
    { name: "Zero Robotics Middle School Summer Program", url: "https://zerorobotics.mit.edu/" },
    { name: "Camp Invention", url: "https://www.invent.org/programs/camp-invention" },
    { name: "Destination Science Camp", url: "https://destinationscience.org/" },
    { name: "Engineering for Kids", url: "https://www.engineeringforkids.com/" },
    { name: "Science Explorers", url: "https://scienceexplorers.com/" },
    { name: "Youth Digital Summer Camps", url: "https://www.idtech.com/" },
    { name: "CoderDojo", url: "https://coderdojo.com/" }
  ];

  const books = [
    { name: "Learn to Program with Scratch: A Visual Introduction to Programming with Games, Art, Science, and Math", url: "https://www.amazon.com/Learn-Program-Scratch-Introduction-Programming/dp/1593275439/" },
    { name: "JavaScript for Kids (A Playful Introduction to Programming)", url: "https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming/dp/1593274084/" },
    { name: "Hello World! (Computer Programming for Kids and Other Beginners)", url: "https://www.amazon.com/Hello-World-Computer-Programming-Beginners/dp/1617290920/" },
    { name: "Bossy (Online Startups for Kids and Teens)", url: "https://www.amazon.com/Bossy-Online-Startups-Kids-Teens/dp/1974078639/" },
    { name: "Python for Kids (A Playful Introduction to Programming)", url: "https://www.amazon.com/Python-Kids-Playful-Introduction-Programming/dp/1593274076/" },
    { name: "Head First Software Development", url: "https://www.amazon.com/Head-First-Software-Development-Learners/dp/0596527357/" }
  ];

  const teachersEducators = [
    { name: "Nano Science & Engineering Outreach Education Classroom Program", url: "https://www.nnci.net/education-outreach" },
    { name: "LinkedIn Learning", url: "https://www.linkedin.com/learning/" },
    { name: "Pluralsight", url: "https://www.pluralsight.com/" },
    { name: "Code School", url: "https://www.pluralsight.com/codeschool" }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-school-blue/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-school-yellow/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-school-green/20 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="flex space-x-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="p-3 bg-school-blue/20 rounded-full"
                >
                  <Atom className="w-8 h-8 text-school-blue" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-3 bg-school-green/20 rounded-full"
                >
                  <Cpu className="w-8 h-8 text-school-green" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="p-3 bg-school-yellow/20 rounded-full"
                >
                  <Rocket className="w-8 h-8 text-school-yellow" />
                </motion.div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              STEM Resources for
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-school-yellow"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              St. Louis Demonstration JHS
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Empowering our students with cutting-edge Science, Technology, Engineering, and Mathematics resources
              to build tomorrow's innovators and problem-solvers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 pb-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="prose prose-lg max-w-none space-y-8">
            {/* What is STEM Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-card p-6 sm:p-8 rounded-xl shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <Lightbulb className="w-8 h-8 text-school-yellow mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold text-school-blue mb-0">What is STEM?</h2>
              </div>
              <p className="leading-relaxed text-gray-300 mb-4">
                STEM stands for Science, Technology, Engineering, and Mathematics. It is an educational approach that integrates these four disciplines to promote critical thinking, problem-solving, and innovation skills among students.
              </p>
              <p className="leading-relaxed text-gray-300 mb-4">
                The relevance of STEM for our students at St. Louis Demonstration JHS is multifaceted and crucial in today's rapidly changing world. Here are some key reasons why STEM education is important for our children:
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-green rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">1</div>
                    <div>
                      <h4 className="font-semibold text-school-green mb-2">Fostering Curiosity and Exploration</h4>
                      <p className="text-gray-300 text-sm">STEM activities encourage children to ask questions, explore their surroundings, and develop a deep understanding of the world around them.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">2</div>
                    <div>
                      <h4 className="font-semibold text-school-blue mb-2">Developing Problem-Solving Skills</h4>
                      <p className="text-gray-300 text-sm">STEM education emphasizes hands-on learning experiences that challenge children to think critically and devise creative solutions.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-yellow rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">3</div>
                    <div>
                      <h4 className="font-semibold text-school-yellow mb-2">Preparing for Future Careers</h4>
                      <p className="text-gray-300 text-sm">Many of the fastest-growing and highest-paying jobs are in STEM fields, opening up wide career opportunities.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-green rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">4</div>
                    <div>
                      <h4 className="font-semibold text-school-green mb-2">Promoting Innovation and Creativity</h4>
                      <p className="text-gray-300 text-sm">STEM activities involve designing, building, and experimenting, fostering creativity and innovative thinking.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-blue rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">5</div>
                    <div>
                      <h4 className="font-semibold text-school-blue mb-2">Enhancing Logical Thinking</h4>
                      <p className="text-gray-300 text-sm">STEM subjects require logical and analytical thinking skills essential for academic success and real-world applications.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-school-yellow rounded-full flex items-center justify-center text-white text-sm font-bold mt-1">6</div>
                    <div>
                      <h4 className="font-semibold text-school-yellow mb-2">Building Confidence</h4>
                      <p className="text-gray-300 text-sm">Overcoming STEM challenges instills confidence and perseverance, teaching the value of persistence in the face of setbacks.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-school-blue/10 rounded-lg border border-school-blue/20">
                <p className="text-gray-300 text-center italic">
                  "By introducing STEM education at an early age, our students at St. Louis Demonstration JHS develop a strong foundation in these critical areas, setting them up for success in an increasingly technology-driven and innovation-focused world."
                </p>
              </div>
            </motion.section>

            {/* STEM Resources Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-card p-6 sm:p-8 rounded-xl shadow-xl border border-white/20"
            >
              <div className="flex items-center mb-6">
                <Microscope className="w-8 h-8 text-school-green mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold text-school-green mb-0">Comprehensive STEM Resources for St. Louis Demonstration JHS</h2>
              </div>

              <div className="space-y-8">
                {/* Cool STEM Websites */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-yellow flex items-center">
                    <Calculator className="w-6 h-6 mr-2" />
                    Cool STEM Websites
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {stemWebsites.map((site, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 3 === 0 ? yellowLinkClass : index % 3 === 1 ? greenLinkClass : blueLinkClass}
                        >
                          {site.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Government STEM Initiatives */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-blue flex items-center">
                    <Lightbulb className="w-6 h-6 mr-2" />
                    Government STEM Initiatives
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {governmentInitiatives.map((initiative, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={initiative.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 2 === 0 ? yellowLinkClass : blueLinkClass}
                        >
                          {initiative.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Science Games and Apps */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-green flex items-center">
                    <Atom className="w-6 h-6 mr-2" />
                    Science Games and Apps
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {scienceGamesApps.map((app, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 3 === 0 ? greenLinkClass : index % 3 === 1 ? blueLinkClass : yellowLinkClass}
                        >
                          {app.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Math Games and Apps */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-yellow flex items-center">
                    <Calculator className="w-6 h-6 mr-2" />
                    Math Games and Apps
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mathGamesApps.map((app, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={app.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 2 === 0 ? yellowLinkClass : greenLinkClass}
                        >
                          {app.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* STEM Camps and Programs */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-blue flex items-center">
                    <Rocket className="w-6 h-6 mr-2" />
                    STEM Camps and Programs
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {stemCamps.map((camp, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={camp.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 3 === 0 ? blueLinkClass : index % 3 === 1 ? yellowLinkClass : greenLinkClass}
                        >
                          {camp.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Books */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-green flex items-center">
                    <Microscope className="w-6 h-6 mr-2" />
                    Recommended Books
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {books.map((book, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 2 === 0 ? greenLinkClass : blueLinkClass}
                        >
                          {book.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teachers/Educators */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 text-school-yellow flex items-center">
                    <Cpu className="w-6 h-6 mr-2" />
                    Resources for Teachers/Educators
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {teachersEducators.map((resource, index) => (
                      <li key={index} className="mb-1">
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={index % 2 === 0 ? yellowLinkClass : greenLinkClass}
                        >
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-8 p-6 bg-gradient-to-r from-school-blue/20 via-school-green/20 to-school-yellow/20 rounded-lg border border-white/20">
                <h4 className="text-xl font-bold text-white mb-3 text-center">Ready to Explore STEM?</h4>
                <p className="text-gray-300 text-center mb-4">
                  These resources are carefully curated to support our students' STEM journey at St. Louis Demonstration JHS.
                  Start exploring and discover the exciting world of Science, Technology, Engineering, and Mathematics!
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="flex items-center space-x-2 text-school-yellow">
                    <Atom className="w-5 h-5" />
                    <span className="text-sm font-medium">Science</span>
                  </div>
                  <div className="flex items-center space-x-2 text-school-blue">
                    <Cpu className="w-5 h-5" />
                    <span className="text-sm font-medium">Technology</span>
                  </div>
                  <div className="flex items-center space-x-2 text-school-green">
                    <Lightbulb className="w-5 h-5" />
                    <span className="text-sm font-medium">Engineering</span>
                  </div>
                  <div className="flex items-center space-x-2 text-school-yellow">
                    <Calculator className="w-5 h-5" />
                    <span className="text-sm font-medium">Mathematics</span>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default STEMPage;
