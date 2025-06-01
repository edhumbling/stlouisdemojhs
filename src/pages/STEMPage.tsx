import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Atom, Calculator, Cpu, Lightbulb, Rocket, ExternalLink, ArrowLeft, BookOpen } from 'lucide-react';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';

const STEMPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);

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

  // STEM Resources organized like Students Hub
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
        { name: "How Stuff Works", url: "https://www.howstuffworks.com/" },
        { name: "PhET Interactive Simulations", url: "https://phet.colorado.edu/" },
        { name: "Gizmos by ExploreLearning", url: "https://gizmos.explorelearning.com/" },
        { name: "BrainPOP Science", url: "https://www.brainpop.com/science/" },
        { name: "Discovery Education", url: "https://www.discoveryeducation.com/" },
        { name: "Mystery Science", url: "https://mysteryscience.com/" },
        { name: "National Geographic Kids", url: "https://kids.nationalgeographic.com/" },
        { name: "Smithsonian's National Museum of Natural History", url: "https://naturalhistory.si.edu/education/teaching-resources" },
        { name: "SciShow Kids", url: "https://www.youtube.com/user/scishowkids" },
        { name: "Crash Course Kids", url: "https://www.youtube.com/user/crashcoursekids" },
        { name: "Science Max", url: "https://www.youtube.com/channel/UCbprhISv-0ReKPPyhf7-Dtw" }
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
        { name: "iD Game Design & Development Academy", url: "https://www.idtech.com/courses/game-design-development" },
        { name: "FreeCodeCamp", url: "https://www.freecodecamp.org/" },
        { name: "Replit", url: "https://replit.com/" },
        { name: "CodePen", url: "https://codepen.io/" },
        { name: "CodeMonkey", url: "https://www.codemonkey.com/" },
        { name: "Girls Who Code", url: "https://girlswhocode.com/" },
        { name: "Blockly Games", url: "https://blockly.games/" },
        { name: "MIT App Inventor", url: "https://appinventor.mit.edu/" },
        { name: "Kodu Game Lab", url: "https://www.kodugamelab.com/" },
        { name: "Alice Programming", url: "https://www.alice.org/" },
        { name: "Greenfoot Java IDE", url: "https://www.greenfoot.org/" }
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
        { name: "Engineering Summer Camps", url: "https://www.engineeringedu.com/store/index.php?route=information/information&information_id=8" },
        { name: "VEX Robotics", url: "https://www.vexrobotics.com/" },
        { name: "VEX IQ", url: "https://www.vexrobotics.com/iq" },
        { name: "Makeblock mBot", url: "https://www.makeblock.com/pages/mbot-robot-kit" },
        { name: "NASA Robotics Alliance Project", url: "https://robotics.nasa.gov/" },
        { name: "FIRST Robotics Competition", url: "https://www.firstinspires.org/robotics/frc" },
        { name: "FIRST LEGO League", url: "https://www.firstinspires.org/robotics/fll" },
        { name: "Ozobot STEM Learning", url: "https://ozobot.com/" },
        { name: "Sphero Educational Robots", url: "https://sphero.com/education" },
        { name: "TryEngineering", url: "https://tryengineering.org/" },
        { name: "Engineering Games", url: "https://www.engineeringgames.net/" }
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
        { name: "Camp Euclid: A Mathematics Research Camp", url: "https://euclidlab.org/camp-euclid" },
        { name: "Prodigy Math Game", url: "https://www.prodigygame.com/" },
        { name: "IXL Math", url: "https://www.ixl.com/math/" },
        { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/" },
        { name: "Desmos Graphing Calculator", url: "https://www.desmos.com/calculator" },
        { name: "GeoGebra", url: "https://www.geogebra.org/" },
        { name: "Illustrative Mathematics", url: "https://illustrativemathematics.org/" },
        { name: "Mathway", url: "https://www.mathway.com/" },
        { name: "DragonBox (Math Learning Games)", url: "https://dragonbox.com/" },
        { name: "Mathletics", url: "https://www.mathletics.com/" },
        { name: "ST Math", url: "https://www.stmath.com/" }
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
        { name: "Zooniverse", url: "https://www.zooniverse.org/" },
        { name: "Kerbal Space Program", url: "https://www.kerbalspaceprogram.com/" },
        { name: "SpaceChem", url: "https://www.zachtronics.com/spacechem/" },
        { name: "Human Resource Machine", url: "https://tomorrowcorporation.com/humanresourcemachine" },
        { name: "Portal Series", url: "https://store.steampowered.com/app/400/Portal/" },
        { name: "World of Goo", url: "https://worldofgoo.com/" },
        { name: "Fantastic Contraption", url: "https://fantasticcontraption.com/" },
        { name: "Bridge Constructor", url: "https://www.bridgeconstructor.com/" },
        { name: "Simple Machines by Tinybop", url: "https://tinybop.com/apps/simple-machines" },
        { name: "The Robot Factory by Tinybop", url: "https://tinybop.com/apps/robot-factory" },
        { name: "SciGirls Games", url: "https://pbskids.org/scigirls/games" }
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
        { name: "Physics Wonder Girls at Indiana Wesleyan University", url: "https://www.indwes.edu/undergraduate/division-of-natural-sciences/physics-wonder-girls/" },
        { name: "Girls Who Code", url: "https://girlswhocode.com/" },
        { name: "Black Girls CODE", url: "https://www.blackgirlscode.com/" },
        { name: "Technovation Girls", url: "https://technovationchallenge.org/" },
        { name: "Million Women Mentors", url: "https://www.millionwomenmentors.org/" },
        { name: "AAUW (American Association of University Women)", url: "https://www.aauw.org/" },
        { name: "National Girls Collaborative Project", url: "https://ngcproject.org/" },
        { name: "SciGirls", url: "https://pbskids.org/scigirls/" },
        { name: "Expanding Your Horizons", url: "https://www.expandingyourhorizons.org/" },
        { name: "Girls Inc.", url: "https://girlsinc.org/" },
        { name: "STEM Like a Girl", url: "https://stemlikeagirl.org/" }
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
        { name: "Science Explorers", url: "https://scienceexplorers.com/" },
        { name: "iD Tech Camps", url: "https://www.idtech.com/" },
        { name: "Digital Media Academy", url: "https://www.digitalmediaacademy.org/" },
        { name: "National Student Leadership Conference (NSLC)", url: "https://www.nslcleaders.org/" },
        { name: "Johns Hopkins Center for Talented Youth", url: "https://cty.jhu.edu/" },
        { name: "Stanford Pre-Collegiate Studies", url: "https://precollegiate.stanford.edu/" },
        { name: "MIT Beaver Works Summer Institute", url: "https://beaverworks.ll.mit.edu/CMS/bw/bwsi" },
        { name: "Carnegie Mellon Summer Programs", url: "https://www.cmu.edu/pre-college/" },
        { name: "NASA USRP Internships", url: "https://intern.nasa.gov/" },
        { name: "Research Science Institute (RSI)", url: "https://www.cee.org/research-science-institute" },
        { name: "Governor's School Programs", url: "https://www.nagc.org/resources-publications/resources-parents/summer-residential-programs" },
        { name: "COSMOS UC Programs", url: "https://cosmos.ucop.edu/" }
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
        { name: "Head First Software Development", url: "https://www.amazon.com/Head-First-Software-Development-Learners/dp/0596527357/" },
        { name: "Coding Games in Scratch", url: "https://www.amazon.com/Coding-Games-Scratch-Jon-Woodcock/dp/1465477330/" },
        { name: "DK Workbooks: Computer Coding", url: "https://www.amazon.com/DK-Workbooks-Computer-Coding-Woodcock/dp/1465444998/" },
        { name: "Girls Who Code: Learn to Code and Change the World", url: "https://www.amazon.com/Girls-Who-Code-Learn-Change/dp/042528753X/" },
        { name: "The Everything Kids' Money Book", url: "https://www.amazon.com/Everything-Kids-Money-Book-Brette/dp/1440506841/" },
        { name: "National Geographic Kids Everything Robotics", url: "https://www.amazon.com/National-Geographic-Kids-Everything-Robotics/dp/1426320205/" },
        { name: "The Magic School Bus: Engineering Lab", url: "https://www.amazon.com/Magic-School-Bus-Engineering-Lab/dp/0545685907/" },
        { name: "Women in Science: 50 Fearless Pioneers", url: "https://www.amazon.com/Women-Science-Fearless-Pioneers-Changed/dp/1607749769/" },
        { name: "Hidden Figures Young Readers' Edition", url: "https://www.amazon.com/Hidden-Figures-Young-Readers-Edition/dp/0062662376/" },
        { name: "The Wild Robot", url: "https://www.amazon.com/Wild-Robot-Peter-Brown/dp/0316382000/" },
        { name: "Rosie Revere, Engineer", url: "https://www.amazon.com/Rosie-Revere-Engineer-Andrea-Beaty/dp/1419708457/" }
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
        { name: "Pluralsight", url: "https://www.pluralsight.com/" },
        { name: "National Science Teachers Association (NSTA)", url: "https://www.nsta.org/" },
        { name: "Teach Engineering", url: "https://www.teachengineering.org/" },
        { name: "NASA Educator Resources", url: "https://www.nasa.gov/audience/foreducators/" },
        { name: "Smithsonian Education", url: "https://www.smithsonianeducation.org/" },
        { name: "Common Sense Education", url: "https://www.commonsense.org/education/" },
        { name: "Edutopia", url: "https://www.edutopia.org/" },
        { name: "STEM Teaching Tools", url: "https://stemteachingtools.org/" },
        { name: "Next Generation Science Standards", url: "https://www.nextgenscience.org/" },
        { name: "Project Learning Tree", url: "https://www.plt.org/" },
        { name: "National Council of Teachers of Mathematics", url: "https://www.nctm.org/" },
        { name: "International Society for Technology in Education", url: "https://www.iste.org/" },
        { name: "Code.org for Educators", url: "https://code.org/educate" },
        { name: "Google for Education", url: "https://edu.google.com/" },
        { name: "Microsoft Education", url: "https://education.microsoft.com/" }
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
        { name: "Women in STEM", url: "https://www.whitehouse.gov/ostp/women-in-stem/" },
        { name: "National Science Foundation (NSF)", url: "https://www.nsf.gov/" },
        { name: "Department of Education STEM", url: "https://www.ed.gov/stem" },
        { name: "National Institutes of Health (NIH) Education", url: "https://www.nih.gov/health-information/nih-clinical-research-trials-you" },
        { name: "NOAA Education Resources", url: "https://www.noaa.gov/education" },
        { name: "Department of Energy STEM", url: "https://www.energy.gov/science-innovation/science-education" },
        { name: "USDA STEM Education", url: "https://www.usda.gov/topics/education" },
        { name: "National Institute of Standards and Technology", url: "https://www.nist.gov/education-outreach" },
        { name: "Centers for Disease Control and Prevention Education", url: "https://www.cdc.gov/healthyschools/" },
        { name: "Environmental Protection Agency Education", url: "https://www.epa.gov/education" },
        { name: "National Park Service Education", url: "https://www.nps.gov/teachers/" },
        { name: "Library of Congress Education", url: "https://www.loc.gov/education/" },
        { name: "Federal Resources for Educational Excellence", url: "https://www.ed.gov/free" }
      ]
    }
  ];

  // Flatten all resources for search
  const allResources = useMemo(() => {
    return stemCategories.flatMap(category =>
      category.resources.map(resource => ({
        ...resource,
        categoryTitle: category.title,
        categoryDescription: category.description,
        categoryColor: category.color
      }))
    );
  }, []);

  // Convert resources to searchable items
  const searchableItems: SearchableItem[] = useMemo(() => {
    return allResources.map((resource, index) => ({
      id: `${resource.categoryTitle}-${index}`,
      title: resource.name,
      description: `${resource.categoryDescription} - ${resource.categoryTitle}`,
      category: resource.categoryTitle,
      type: 'website',
      url: resource.url,
      ...resource
    }));
  }, [allResources]);

  // Filter options for search
  const categoryOptions: FilterOption[] = useMemo(() => {
    return stemCategories.map(category => ({
      value: category.title,
      label: category.title,
      count: category.resources.length
    }));
  }, []);

  const typeOptions: FilterOption[] = [
    { value: 'website', label: 'Websites', count: allResources.length }
  ];

  // Handle search results
  const handleSearchResults = useCallback((results: SearchableItem[]) => {
    setSearchResults(results);
  }, []);

  // Get filtered categories based on search results
  const filteredCategories = useMemo(() => {
    if (searchResults.length === 0) {
      return stemCategories;
    }

    // Group search results by category
    const filtered: any[] = [];
    const categoryMap = new Map();

    searchResults.forEach(item => {
      const categoryTitle = item.category;
      if (!categoryMap.has(categoryTitle)) {
        const originalCategory = stemCategories.find(cat => cat.title === categoryTitle);
        if (originalCategory) {
          categoryMap.set(categoryTitle, {
            ...originalCategory,
            resources: []
          });
        }
      }

      const category = categoryMap.get(categoryTitle);
      if (category) {
        category.resources.push({
          name: item.title,
          url: item.url
        });
      }
    });

    return Array.from(categoryMap.values());
  }, [searchResults]);

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
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
          {/* Introduction */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl mb-4 shadow-2xl">
              <Rocket size={32} className="text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              STEM Learning Resources
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore {allResources.length}+ STEM resources across {stemCategories.length} categories to enhance your learning journey.
            </p>
          </div>

          {/* Smart Search Bar */}
          <div className="mb-8">
            <SmartSearchBar
              items={searchableItems}
              onSearchResults={handleSearchResults}
              placeholder={`Search ${allResources.length}+ STEM resources...`}
              accentColor="purple"
              categories={categoryOptions}
              types={typeOptions}
              enableIntentDetection={true}
              className="mb-6"
            />
          </div>

          {/* STEM Categories Grid - Apple Style */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 mb-8">
            {filteredCategories.map((category, index) => (
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
