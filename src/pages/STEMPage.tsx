import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Atom, Calculator, Cpu, Lightbulb, Rocket, ExternalLink, ArrowLeft, BookOpen } from 'lucide-react';

const STEMPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleCategoryBack = () => {
    setSelectedCategory(null);
    // Scroll to top when returning to main page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    // Scroll to top instantly when viewing category
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // STEM Resources organized like LearnHub
  const stemCategories = [
    {
      id: 1,
      title: "Science Websites",
      description: "Interactive science learning platforms",
      icon: <Atom className="w-5 h-5" />,
      color: "#007AFF",
      resources: [
        { name: "NASA Kids' Club", url: "https://www.nasa.gov/kidsclub/index.html" },
        { name: "NASA Space Place", url: "https://spaceplace.nasa.gov/" },
        { name: "Bill Nye the Science Guy", url: "https://billnye.com/" },
        { name: "SciJinks", url: "https://scijinks.gov/" },
        { name: "NOVA", url: "https://www.pbs.org/wgbh/nova/" },
        { name: "Science Buddies", url: "https://www.sciencebuddies.org/" },
        { name: "Exploratorium", url: "https://www.exploratorium.edu/" },
        { name: "How Stuff Works", url: "https://www.howstuffworks.com/" }
      ]
    },
    {
      id: 2,
      title: "Technology & Coding",
      description: "Programming and tech skills",
      icon: <Cpu className="w-5 h-5" />,
      color: "#34C759",
      resources: [
        { name: "Scratch", url: "https://scratch.mit.edu/" },
        { name: "Code.org", url: "https://code.org/" },
        { name: "Codecademy", url: "https://www.codecademy.com/" },
        { name: "Tynker", url: "https://www.tynker.com/" },
        { name: "LearnToMod", url: "https://www.learntomod.com/" },
        { name: "TechRocket", url: "https://www.techrocket.com/" },
        { name: "Hopscotch (Make your own games)", url: "https://www.gethopscotch.com/" },
        { name: "Move the Turtle: Programming for Kids App", url: "https://apps.apple.com/us/app/move-the-turtle-programming-for-kids/id509013878" },
        { name: "Robot Turtles", url: "https://www.thinkfun.com/products/robot-turtles/" },
        { name: "CoderDojo", url: "https://coderdojo.com/" },
        { name: "Youth Digital Summer Camps", url: "https://www.idtech.com/" },
        { name: "iD Game Design & Development Academy", url: "https://www.idtech.com/courses/game-design-development" }
      ]
    },
    {
      id: 3,
      title: "Engineering",
      description: "Engineering design and robotics",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "#FF9500",
      resources: [
        { name: "Engineer Girl!", url: "https://www.engineergirl.org/" },
        { name: "Engineer Your Life", url: "https://www.engineeryourlife.org/" },
        { name: "Lego Mindstorms", url: "https://www.lego.com/en-us/themes/mindstorms" },
        { name: "Arrick Robotics", url: "http://www.arrickrobotics.com/" },
        { name: "DiscoverE", url: "https://www.discovere.org/" },
        { name: "Zero Robotics Middle School Summer Program", url: "https://zerorobotics.mit.edu/" },
        { name: "Camp Invention", url: "https://www.invent.org/programs/camp-invention" },
        { name: "Engineering for Kids", url: "https://www.engineeringforkids.com/" },
        { name: "Engineering Summer Camps", url: "https://www.engineeringedu.com/store/index.php?route=information/information&information_id=8" }
      ]
    },
    {
      id: 4,
      title: "Mathematics",
      description: "Math learning and practice",
      icon: <Calculator className="w-5 h-5" />,
      color: "#5856D6",
      resources: [
        { name: "Khan Academy", url: "https://www.khanacademy.org/" },
        { name: "Helping Your Child Learn Mathematics", url: "https://www2.ed.gov/parents/academic/help/math/index.html" },
        { name: "Cool Math Games", url: "https://www.coolmath.com/" },
        { name: "Geometry Quest App", url: "https://apps.apple.com/us/app/geometry-quest/id609252845" },
        { name: "Math Blaster", url: "https://www.mathblaster.com/" },
        { name: "Mystery Math Town", url: "https://apps.apple.com/us/app/mystery-math-town/id619404402" },
        { name: "Algebra Touch App", url: "https://apps.apple.com/us/app/algebra-touch/id384354262" },
        { name: "Mathemagics Mental Math Tricks", url: "https://apps.apple.com/us/app/mathemagics-mental-math-tricks/id306586847" },
        { name: "Camp Euclid: A Mathematics Research Camp", url: "https://euclidlab.org/camp-euclid" }
      ]
    },
    {
      id: 5,
      title: "Educational Games",
      description: "Fun learning through games",
      icon: <Rocket className="w-5 h-5" />,
      color: "#FF3B30",
      resources: [
        { name: "Sheppard Software", url: "https://www.sheppardsoftware.com/" },
        { name: "Funology", url: "https://www.funology.com/" },
        { name: "MythBusters – Discovery Channel", url: "https://www.discovery.com/shows/mythbusters" },
        { name: "The Big Brain Theory – Discovery Channel", url: "https://www.discovery.com/shows/the-big-brain-theory" },
        { name: "Virtual Frog Dissection", url: "https://frogdissection.com/" },
        { name: "Solar System for iPad", url: "https://apps.apple.com/us/app/solar-system-for-ipad/id406795422" },
        { name: "National Geographic Apps", url: "https://www.nationalgeographic.com/apps/" },
        { name: "Auditorium: The Online Experience", url: "https://www.cipherprime.com/games/auditorium/" },
        { name: "Minecraft", url: "https://www.minecraft.net/" },
        { name: "Quantum Conundrum", url: "https://store.steampowered.com/app/200010/Quantum_Conundrum/" },
        { name: "Robots for iPad App", url: "https://apps.apple.com/us/app/robots-for-ipad/id566581917" },
        { name: "You Can Do the Rubik's Cube", url: "https://www.youcandothecube.com/" },
        { name: "Kinectic City", url: "https://www.kineticcity.com/" },
        { name: "Zooniverse", url: "https://www.zooniverse.org/" }
      ]
    },
    {
      id: 6,
      title: "STEM for Girls",
      description: "Encouraging girls in STEM",
      icon: <BookOpen className="w-5 h-5" />,
      color: "#AF52DE",
      resources: [
        { name: "Women@NASA", url: "https://women.nasa.gov/" },
        { name: "CanTEEN", url: "https://www.canteengirl.org/" },
        { name: "For Girls in Science", url: "https://www.forgirlsinscience.org/" },
        { name: "Girl Scouts STEM Program", url: "https://www.girlscouts.org/en/about-girl-scouts/girl-scouts-and-stem.html" },
        { name: "Society of Women Engineers (SWE) K-12 Outreach", url: "https://swe.org/k-12-outreach/" },
        { name: "G2O: Generating Girls Opportunities", url: "https://www.cwealf.org/g2o/" },
        { name: "Camp Reach", url: "https://www.wpi.edu/academics/pre-collegiate/summer-programs/camp-reach" },
        { name: "Girls' Adventures in Mathematics, Engineering, and Science (G.A.M.E.S.)", url: "https://games.grainger.illinois.edu/" },
        { name: "Students with Potential and Interest, Considering Engineering (S.P.I.C.E.)", url: "https://eng.umd.edu/k12/spice" },
        { name: "Physics Wonder Girls at Indiana Wesleyan University", url: "https://www.indwes.edu/undergraduate/division-of-natural-sciences/physics-wonder-girls/" }
      ]
    },
    {
      id: 7,
      title: "STEM Camps & Programs",
      description: "Summer camps and programs",
      icon: <Rocket className="w-5 h-5" />,
      color: "#007AFF",
      resources: [
        { name: "Science and Engineering Apprenticeship Program (SEAP)", url: "https://www.navsea.navy.mil/Home/Warfare-Centers/STEM/SEAP/" },
        { name: "Destination Science Camp", url: "https://destinationscience.org/" },
        { name: "Science Explorers", url: "https://scienceexplorers.com/" }
      ]
    },
    {
      id: 8,
      title: "Books & Learning Materials",
      description: "Educational books and resources",
      icon: <BookOpen className="w-5 h-5" />,
      color: "#34C759",
      resources: [
        { name: "Learn to Program with Scratch: A Visual Introduction to Programming with Games, Art, Science, and Math", url: "https://www.amazon.com/Learn-Program-Scratch-Introduction-Programming/dp/1593275439/" },
        { name: "JavaScript for Kids (A Playful Introduction to Programming)", url: "https://www.amazon.com/JavaScript-Kids-Playful-Introduction-Programming/dp/1593274084/" },
        { name: "Hello World! (Computer Programming for Kids and Other Beginners)", url: "https://www.amazon.com/Hello-World-Computer-Programming-Beginners/dp/1617290920/" },
        { name: "Bossy (Online Startups for Kids and Teens)", url: "https://www.amazon.com/Bossy-Online-Startups-Kids-Teens/dp/1974078639/" },
        { name: "Python for Kids (A Playful Introduction to Programming)", url: "https://www.amazon.com/Python-Kids-Playful-Introduction-Programming/dp/1593274076/" },
        { name: "Head First Software Development", url: "https://www.amazon.com/Head-First-Software-Development-Learners/dp/0596527357/" }
      ]
    },
    {
      id: 9,
      title: "Teachers & Educators",
      description: "Resources for educators",
      icon: <Lightbulb className="w-5 h-5" />,
      color: "#FF9500",
      resources: [
        { name: "Nano Science & Engineering Outreach Education Classroom Program", url: "https://www.nnci.net/education-outreach" },
        { name: "Lynda", url: "https://www.linkedin.com/learning/" },
        { name: "Code School", url: "https://www.pluralsight.com/codeschool" },
        { name: "Pluralsight", url: "https://www.pluralsight.com/" }
      ]
    },
    {
      id: 10,
      title: "Government Initiatives",
      description: "Official STEM programs",
      icon: <Cpu className="w-5 h-5" />,
      color: "#5856D6",
      resources: [
        { name: "Educate to Innovate", url: "https://obamawhitehouse.archives.gov/issues/education/k-12/educate-innovate" },
        { name: "Women in STEM", url: "https://www.whitehouse.gov/ostp/women-in-stem/" }
      ]
    }
  ];



  // If a category is selected, show the dedicated category page
  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-black pt-16">
        {/* Back Button and Title Section */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleCategoryBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {selectedCategory.title}
              </h1>
            </div>
          </div>
        </div>

        {/* All Resources */}
        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedCategory.resources.map((resource: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 group"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm sm:text-base font-medium text-white group-hover:text-blue-400 transition-colors leading-tight">
                        {resource.name}
                      </h3>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Footer Message */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-300">
                {selectedCategory.resources.length} resources in {selectedCategory.title}
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-16">
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              STEM Resources
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
          {/* STEM Categories Grid - Apple Style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {stemCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl p-3 sm:p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-200 hover:shadow-lg hover:bg-gray-700/60 cursor-pointer"
                  onClick={() => handleCategoryClick(category)}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl mb-3 flex items-center justify-center text-white"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-semibold text-white mb-1 leading-tight group-hover:text-blue-400 transition-colors">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-tight mb-3">
                    {category.description}
                  </p>

                  {/* Resources List */}
                  <div className="space-y-1 mb-3">
                    {category.resources.slice(0, 3).map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-xs text-blue-400 hover:text-blue-300 hover:underline transition-colors truncate"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {resource.name}
                      </a>
                    ))}
                  </div>

                  {/* View All Link */}
                  <div className="flex items-center justify-between">
                    {category.resources.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{category.resources.length - 3} more
                      </span>
                    )}
                    <button
                      className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category);
                      }}
                    >
                      View All
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Simple Footer Message */}
          <div className="text-center">
            <p className="text-sm text-gray-300">
              Click any category card or "View All" to explore all resources in that category
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default STEMPage;
