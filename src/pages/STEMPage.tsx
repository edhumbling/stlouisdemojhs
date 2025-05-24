import React from 'react';
import { motion } from 'framer-motion';
import { Atom, Calculator, Microscope, Cpu, Lightbulb, Rocket, ExternalLink } from 'lucide-react';

const STEMPage: React.FC = () => {
  // CSS for blue external links
  const linkClass = "inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors";

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
    <div className="flex min-h-screen flex-col bg-white">
      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-br from-school-blue via-school-green to-school-yellow">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/15 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/20 rounded-full blur-lg animate-pulse delay-500"></div>
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]"></div>
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
                  className="p-3 bg-white/20 rounded-full"
                >
                  <Atom className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="p-3 bg-white/20 rounded-full"
                >
                  <Cpu className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="p-3 bg-white/20 rounded-full"
                >
                  <Rocket className="w-8 h-8 text-white" />
                </motion.div>
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              STEM Resources for
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-white"
                style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              St. Louis Demonstration JHS
            </h2>
            <p className="text-lg sm:text-xl text-white max-w-3xl mx-auto leading-relaxed"
               style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Empowering our students with cutting-edge Science, Technology, Engineering, and Mathematics resources
              to build tomorrow's innovators and problem-solvers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* What is STEM Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Lightbulb className="w-8 h-8 text-school-yellow mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">What is STEM?</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-700 mb-6 max-w-4xl">
              STEM stands for Science, Technology, Engineering, and Mathematics. It is an educational approach that integrates these four disciplines to promote critical thinking, problem-solving, and innovation skills among students.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-8 max-w-4xl">
              The relevance of STEM for our students at St. Louis Demonstration JHS is multifaceted and crucial in today's rapidly changing world. Here are some key reasons why STEM education is important for our children:
            </p>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-green rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-semibold text-school-green mb-2 text-lg">Fostering Curiosity and Exploration</h4>
                    <p className="text-gray-600">STEM activities encourage children to ask questions, explore their surroundings, and develop a deep understanding of the world around them.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-semibold text-school-blue mb-2 text-lg">Developing Problem-Solving Skills</h4>
                    <p className="text-gray-600">STEM education emphasizes hands-on learning experiences that challenge children to think critically and devise creative solutions.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-yellow rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-semibold text-school-yellow mb-2 text-lg">Preparing for Future Careers</h4>
                    <p className="text-gray-600">Many of the fastest-growing and highest-paying jobs are in STEM fields, opening up wide career opportunities.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-green rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-semibold text-school-green mb-2 text-lg">Promoting Innovation and Creativity</h4>
                    <p className="text-gray-600">STEM activities involve designing, building, and experimenting, fostering creativity and innovative thinking.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-blue rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">5</div>
                  <div>
                    <h4 className="font-semibold text-school-blue mb-2 text-lg">Enhancing Logical Thinking</h4>
                    <p className="text-gray-600">STEM subjects require logical and analytical thinking skills essential for academic success and real-world applications.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-school-yellow rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">6</div>
                  <div>
                    <h4 className="font-semibold text-school-yellow mb-2 text-lg">Building Confidence</h4>
                    <p className="text-gray-600">Overcoming STEM challenges instills confidence and perseverance, teaching the value of persistence in the face of setbacks.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-school-blue">
              <p className="text-gray-700 text-center italic text-lg">
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
            className="mb-16"
          >
            <div className="flex items-center mb-8">
              <Microscope className="w-8 h-8 text-school-green mr-3" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Comprehensive STEM Resources</h2>
            </div>

            <div className="space-y-12">
              {/* Cool STEM Websites */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Calculator className="w-7 h-7 mr-3 text-school-yellow" />
                  STEM Websites
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stemWebsites.map((site, index) => (
                    <li key={index}>
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {site.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Government STEM Initiatives */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Lightbulb className="w-7 h-7 mr-3 text-school-blue" />
                  Government STEM Initiatives
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {governmentInitiatives.map((initiative, index) => (
                    <li key={index}>
                      <a
                        href={initiative.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {initiative.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Science Games and Apps */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Atom className="w-7 h-7 mr-3 text-school-green" />
                  Science Games and Apps
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {scienceGamesApps.map((app, index) => (
                    <li key={index}>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {app.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Math Games and Apps */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Calculator className="w-7 h-7 mr-3 text-school-yellow" />
                  Math Games and Apps
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {mathGamesApps.map((app, index) => (
                    <li key={index}>
                      <a
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {app.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* STEM Camps and Programs */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Rocket className="w-7 h-7 mr-3 text-school-blue" />
                  STEM Camps and Programs
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {stemCamps.map((camp, index) => (
                    <li key={index}>
                      <a
                        href={camp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {camp.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Books */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Microscope className="w-7 h-7 mr-3 text-school-green" />
                  Recommended Books
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {books.map((book, index) => (
                    <li key={index}>
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {book.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Teachers/Educators */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                  <Cpu className="w-7 h-7 mr-3 text-school-yellow" />
                  Resources for Teachers/Educators
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {teachersEducators.map((resource, index) => (
                    <li key={index}>
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {resource.name}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-16 p-8 bg-gradient-to-r from-school-blue/10 via-school-green/10 to-school-yellow/10 rounded-lg border border-gray-200">
              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Ready to Explore STEM?</h4>
              <p className="text-gray-700 text-center mb-6 text-lg max-w-3xl mx-auto">
                These resources are carefully curated to support our students' STEM journey at St. Louis Demonstration JHS.
                Start exploring and discover the exciting world of Science, Technology, Engineering, and Mathematics!
              </p>
              <div className="flex justify-center flex-wrap gap-6">
                <div className="flex items-center space-x-2 text-school-yellow">
                  <Atom className="w-6 h-6" />
                  <span className="font-medium">Science</span>
                </div>
                <div className="flex items-center space-x-2 text-school-blue">
                  <Cpu className="w-6 h-6" />
                  <span className="font-medium">Technology</span>
                </div>
                <div className="flex items-center space-x-2 text-school-green">
                  <Lightbulb className="w-6 h-6" />
                  <span className="font-medium">Engineering</span>
                </div>
                <div className="flex items-center space-x-2 text-school-yellow">
                  <Calculator className="w-6 h-6" />
                  <span className="font-medium">Mathematics</span>
                </div>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
};

export default STEMPage;
