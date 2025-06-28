import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Calculator, Lightbulb, Rocket, ExternalLink, ArrowLeft, BookOpen, Zap, Bot } from 'lucide-react';
import SmartSearchBar, { SearchableItem, FilterOption } from '../components/common/SmartSearchBar';
import ShimmerLoader from '../components/common/ShimmerLoader';
import useEnhancedNavigation from '../hooks/useEnhancedNavigation';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

const STEMPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [searchResults, setSearchResults] = useState<SearchableItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCategoryTitle, setCurrentCategoryTitle] = useState<string | null>(null);
  const { navigateBackWithState, handleInternalStateChange } = useEnhancedNavigation();
  const navigate = useNavigate();

  // Handle initial page loading with shimmer effect
  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 1.8 second initial loading

    return () => clearTimeout(loadingTimer);
  }, []);

  const handleBack = () => {
    navigateBackWithState('/'); // Go back to previous page with fallback to home
  };

  const handleCategoryBack = () => {
    // Use enhanced navigation to restore exact scroll position
    handleInternalStateChange(() => {
      setSelectedCategory(null);
    });

    // After state reset, scroll to the category section if we have one stored
    if (currentCategoryTitle) {
      setTimeout(() => {
        const categoryElement = document.querySelector(`[data-category-title="${currentCategoryTitle}"]`);
        if (categoryElement) {
          categoryElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
        // Clear the stored category after navigation
        setCurrentCategoryTitle(null);
      }, 200); // Small delay to ensure DOM is ready
    }
  };

  const handleCategoryClick = (category: any) => {
    // Check if this is a special category with its own route
    if (category.isSpecial && category.route) {
      navigate(category.route);
      return;
    }

    // Store the current category for back navigation
    setCurrentCategoryTitle(category.title);
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
      icon: <Zap className="w-5 h-5" />,
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
        { name: "Science Max", url: "https://www.youtube.com/channel/UCbprhISv-0ReKPPyhf7-Dtw" },
        { name: "Accelerate Learning STEM", url: "https://acceleratelearning.com/" },
        { name: "LabXchange by Harvard", url: "https://www.labxchange.org/" },
        { name: "Coursera Science Courses", url: "https://www.coursera.org/browse/physical-science-and-engineering" },
        { name: "edX Science Programs", url: "https://www.edx.org/learn/science" },
        { name: "FutureLearn Science Courses", url: "https://www.futurelearn.com/subjects/science-engineering-and-maths-courses" },
        { name: "Brilliant Science", url: "https://brilliant.org/courses/science/" },
        { name: "Science Learning Hub", url: "https://www.sciencelearn.org.nz/" },
        { name: "NOVA Labs", url: "https://www.pbs.org/wgbh/nova/labs/" },
        { name: "Science Friday", url: "https://www.sciencefriday.com/educational-resources/" },
        { name: "Crash Course Science", url: "https://thecrashcourse.com/courses/science" },
        { name: "Immersive VR Education", url: "https://immersivevreducation.com/" },
        { name: "Labster Virtual Labs", url: "https://www.labster.com/" },
        { name: "Nearpod VR Science", url: "https://nearpod.com/vr-ar/" },
        { name: "Google Arts & Culture Science", url: "https://artsandculture.google.com/project/science" },
        { name: "Merge Cube AR Science", url: "https://mergeedu.com/" },
        { name: "CoSpaces Edu", url: "https://cospaces.io/edu/" },
        { name: "Unimersiv VR Education", url: "https://unimersiv.com/" },
        { name: "Alchemy VR", url: "https://alchemyvr.com/" },
        { name: "Titans of Space VR", url: "https://www.titansofspacevr.com/" },
        { name: "InCell VR", url: "https://incellvr.com/" },
        { name: "Quantum Computing IBM", url: "https://learning.quantum.ibm.com/" },
        { name: "MIT OpenCourseWare Science", url: "https://ocw.mit.edu/courses/science/" },
        { name: "Stanford Online Science", url: "https://online.stanford.edu/explore?topics%5B%5D=Science" },
        { name: "Harvard Science Courses", url: "https://online-learning.harvard.edu/catalog/free?topics%5B%5D=Science" },
        { name: "Yale Open Courses Science", url: "https://oyc.yale.edu/courses?field_course_subject_tid=All&field_course_type_tid=All&field_course_level_tid=All" },
        { name: "Berkeley Online Science", url: "https://extension.berkeley.edu/search/publicCourseSearchDetails.do?method=load&courseId=40905" },
        { name: "Princeton Online Science", url: "https://www.princeton.edu/meet-princeton/online-learning" },
        { name: "Columbia Science Online", url: "https://online.columbia.edu/programs-courses/science-technology" },
        { name: "Carnegie Mellon Open Learning", url: "https://oli.cmu.edu/" },
        { name: "Georgia Tech Online Science", url: "https://pe.gatech.edu/courses/science-technology" },
        { name: "CRISPR Learning Hub", url: "https://www.broadinstitute.org/what-broad/areas-focus/project-spotlight/questions-and-answers-about-crispr" },
        { name: "Synthetic Biology Education", url: "https://synbioeducation.org/" },
        { name: "Biotechnology Innovation Organization", url: "https://www.bio.org/education" },
        { name: "Mars Society Education", url: "https://www.marssociety.org/education/" },
        { name: "SpaceX Educational Resources", url: "https://www.spacex.com/education/" },
        { name: "Climate Change Education", url: "https://climate.nasa.gov/evidence/" },
        { name: "Renewable Energy Education", url: "https://www.nrel.gov/learning/" },
        { name: "Ocean Exploration Trust", url: "https://nautiluslive.org/education" },
        { name: "Antarctic Research Education", url: "https://www.usap.gov/education/" },
        { name: "Astrobiology Institute", url: "https://astrobiology.nasa.gov/education/" },
        { name: "VRLab Academy", url: "https://www.vrlabacademy.com/en" },
        { name: "LearnSci Digital Labs", url: "https://www.learnsci.com/" },
        { name: "Science Interactive Labs", url: "https://www.scienceinteractive.com/" },
        { name: "ChemCollective Virtual Labs", url: "https://chemcollective.org/" },
        { name: "Virtual Chemistry Lab", url: "https://www.chemlab.org/" },
        { name: "Biology Corner", url: "https://www.biologycorner.com/" },
        { name: "Interactive Physics", url: "https://www.interactivephysics.com/" },
        { name: "Earth Science Reference Tables", url: "https://www.nysed.gov/curriculum-instruction/science-learning-standards" },
        { name: "Climate Kids NASA", url: "https://climatekids.nasa.gov/" },
        { name: "USGS Water Resources", url: "https://www.usgs.gov/mission-areas/water-resources" },
        { name: "NOAA Education Resources", url: "https://www.noaa.gov/education" },
        { name: "EPA Environmental Education", url: "https://www.epa.gov/education" },
        { name: "CDC Learning Connection", url: "https://www.cdc.gov/learning/" },
        { name: "NIH Science Education", url: "https://science.education.nih.gov/" },
        { name: "CERN Education", url: "https://education.cern/" },
        { name: "European Space Agency Education", url: "https://www.esa.int/Education" },
        { name: "MIT Biology Learning", url: "https://biology.mit.edu/undergraduate/academics/" },
        { name: "Stanford Medicine 25", url: "https://stanford25.stanford.edu/" },
        { name: "Harvard Medical School Online", url: "https://hms.harvard.edu/departments/continuing-education" }
      ]
    },
    {
      id: 2,
      title: "Technology & Coding",
      description: "Programming and tech skills",
      icon: <Zap className="w-5 h-5" />,
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
        { name: "Greenfoot Java IDE", url: "https://www.greenfoot.org/" },
        { name: "GitHub Education", url: "https://education.github.com/" },
        { name: "Codewars", url: "https://www.codewars.com/" },
        { name: "HackerRank", url: "https://www.hackerrank.com/" },
        { name: "LeetCode", url: "https://leetcode.com/" },
        { name: "Sololearn", url: "https://www.sololearn.com/" },
        { name: "Codecombat", url: "https://codecombat.com/" },
        { name: "Roblox Studio", url: "https://www.roblox.com/create" },
        { name: "Unity Learn", url: "https://learn.unity.com/" },
        { name: "Thinkful", url: "https://www.thinkful.com/" },
        { name: "Codingame", url: "https://www.codingame.com/" },
        { name: "Machine Learning for Kids", url: "https://machinelearningforkids.co.uk/" },
        { name: "Teachable Machine by Google", url: "https://teachablemachine.withgoogle.com/" },
        { name: "AI for Everyone by Coursera", url: "https://www.coursera.org/learn/ai-for-everyone" },
        { name: "Codingal AI for Kids", url: "https://www.codingal.com/" },
        { name: "Replit AI", url: "https://replit.com/ai" },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot" },
        { name: "Cursor AI IDE", url: "https://cursor.sh/" },
        { name: "Tabnine AI", url: "https://www.tabnine.com/" },
        { name: "CodeWhisperer by AWS", url: "https://aws.amazon.com/codewhisperer/" },
        { name: "Codeium", url: "https://codeium.com/" },
        { name: "Blockchain Education Network", url: "https://blockchainedu.org/" },
        { name: "Ethereum for Developers", url: "https://ethereum.org/en/developers/" },
        { name: "Solidity Programming", url: "https://soliditylang.org/" },
        { name: "Web3 University", url: "https://www.web3.university/" },
        { name: "Chainlink Academy", url: "https://chain.link/education" },
        { name: "Polygon Academy", url: "https://academy.polygon.technology/" },
        { name: "Alchemy University", url: "https://university.alchemy.com/" },
        { name: "ConsenSys Academy", url: "https://consensys.net/academy/" },
        { name: "Moralis Academy", url: "https://academy.moralis.io/" },
        { name: "Buildspace", url: "https://buildspace.so/" },
        { name: "Rust Programming Language", url: "https://www.rust-lang.org/learn" },
        { name: "Go Programming Tutorial", url: "https://go.dev/learn/" },
        { name: "Swift Playgrounds", url: "https://www.apple.com/swift/playgrounds/" },
        { name: "Kotlin for Education", url: "https://kotlinlang.org/education/" },
        { name: "Flutter Learning", url: "https://flutter.dev/learn" },
        { name: "React Native Education", url: "https://reactnative.dev/docs/getting-started" },
        { name: "Vue.js Learning", url: "https://vuejs.org/tutorial/" },
        { name: "Angular University", url: "https://angular-university.io/" },
        { name: "Node.js Learning", url: "https://nodejs.org/en/learn/" },
        { name: "Deno Learning", url: "https://deno.land/learn" },
        { name: "Mimo Learn Coding", url: "https://mimo.org/" },
        { name: "CS50 Harvard", url: "https://pll.harvard.edu/course/cs50-introduction-computer-science" },
        { name: "Codewars Programming Practice", url: "https://www.codewars.com/" },
        { name: "LeetCode Programming", url: "https://leetcode.com/" },
        { name: "HackerRank Coding", url: "https://www.hackerrank.com/" },
        { name: "Exercism Code Practice", url: "https://exercism.org/" },
        { name: "Codingame Programming", url: "https://www.codingame.com/" },
        { name: "Project Euler Math Programming", url: "https://projecteuler.net/" },
        { name: "Advent of Code", url: "https://adventofcode.com/" },
        { name: "TopCoder Competitive Programming", url: "https://www.topcoder.com/" },
        { name: "AtCoder Programming Contests", url: "https://atcoder.jp/" },
        { name: "Codeforces Programming", url: "https://codeforces.com/" },
        { name: "SPOJ Online Judge", url: "https://www.spoj.com/" },
        { name: "GeeksforGeeks Programming", url: "https://www.geeksforgeeks.org/" },
        { name: "W3Schools Web Development", url: "https://www.w3schools.com/" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org/" },
        { name: "freeCodeCamp Certifications", url: "https://www.freecodecamp.org/learn" },
        { name: "The Odin Project", url: "https://www.theodinproject.com/" },
        { name: "Codecademy Pro", url: "https://www.codecademy.com/pro" }
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
        { name: "Engineering Games", url: "https://www.engineeringgames.net/" },
        { name: "REC Foundation", url: "https://recf.org/" },
        { name: "LocoRobo", url: "https://locorobo.co/" },
        { name: "Arduino Education", url: "https://www.arduino.cc/education/" },
        { name: "Raspberry Pi Foundation", url: "https://www.raspberrypi.org/education/" },
        { name: "micro:bit Educational Foundation", url: "https://microbit.org/teach/" },
        { name: "Autodesk Education", url: "https://www.autodesk.com/education/home" },
        { name: "SolidWorks Education", url: "https://www.solidworks.com/sw/education/" },
        { name: "Fusion 360 for Education", url: "https://www.autodesk.com/products/fusion-360/education" },
        { name: "Tinkercad", url: "https://www.tinkercad.com/" },
        { name: "OnShape Education", url: "https://www.onshape.com/en/education/" },
        { name: "SOLIDWORKS 2025", url: "https://www.solidworks.com/product/students" },
        { name: "Autodesk 2025 Design Suite", url: "https://www.autodesk.com/" },
        { name: "BadgerBots Summer Camps", url: "https://www.badgerbots.org/2025-summer-camps" },
        { name: "Purdue VIP Engineering", url: "https://engineering.purdue.edu/VIP/teams" },
        { name: "3D Printing Education", url: "https://www.3dprintingeducation.org/" },
        { name: "Formlabs Education", url: "https://formlabs.com/education/" },
        { name: "Ultimaker Education", url: "https://ultimaker.com/education/" },
        { name: "MakerBot Education", url: "https://www.makerbot.com/education/" },
        { name: "Stratasys Education", url: "https://www.stratasys.com/education/" },
        { name: "PTC Creo Education", url: "https://www.ptc.com/en/academic-program" },
        { name: "Dassault Systèmes Education", url: "https://www.3ds.com/education/" },
        { name: "Siemens Digital Industries Software", url: "https://www.sw.siemens.com/en-US/academic/" },
        { name: "Ansys Student", url: "https://www.ansys.com/academic/students" },
        { name: "COMSOL Multiphysics", url: "https://www.comsol.com/academic" },
        { name: "Altium Designer Education", url: "https://www.altium.com/education" },
        { name: "KiCad EDA", url: "https://www.kicad.org/" },
        { name: "Eagle CAD Education", url: "https://www.autodesk.com/products/eagle/education" },
        { name: "CircuitMaker", url: "https://circuitmaker.com/" },
        { name: "EasyEDA", url: "https://easyeda.com/" },
        { name: "Proteus Design Suite", url: "https://www.labcenter.com/" },
        { name: "MATLAB Simulink", url: "https://www.mathworks.com/products/simulink.html" },
        { name: "LabVIEW Education", url: "https://www.ni.com/en-us/shop/labview.html" },
        { name: "Multisim Education", url: "https://www.ni.com/en-us/shop/multisim.html" },
        { name: "SPICE Circuit Simulation", url: "https://www.analog.com/en/design-center/design-tools-and-calculators/ltspice-simulator.html" },
        { name: "FreeCAD", url: "https://www.freecadweb.org/" },
        { name: "OpenSCAD", url: "https://openscad.org/" },
        { name: "Blender for Engineering", url: "https://www.blender.org/" },
        { name: "KiCad PCB Design", url: "https://www.kicad.org/discover/" },
        { name: "Fritzing Electronics", url: "https://fritzing.org/" },
        { name: "CircuitLab", url: "https://www.circuitlab.com/" },
        { name: "DraftSight CAD", url: "https://www.draftsight.com/" },
        { name: "SketchUp for Schools", url: "https://www.sketchup.com/plans-and-pricing/sketchup-for-schools" },
        { name: "Inventor Professional", url: "https://www.autodesk.com/products/inventor/overview" },
        { name: "Creo Student Edition", url: "https://www.ptc.com/en/products/creo/free-trial" },
        { name: "KeyShot Rendering", url: "https://www.keyshot.com/education/" },
        { name: "CATIA Student Edition", url: "https://www.3ds.com/products-services/catia/products/catia-v5/catia-student-edition/" },
        { name: "Rhino 3D Education", url: "https://www.rhino3d.com/education/" },
        { name: "Cinema 4D Education", url: "https://www.maxon.net/en/cinema-4d/education" },
        { name: "Maya Education", url: "https://www.autodesk.com/education/edu-software/overview?sorting=featured&page=1&filters=individual,maya" },
        { name: "3ds Max Education", url: "https://www.autodesk.com/education/edu-software/overview?sorting=featured&page=1&filters=individual,3ds-max" },
        { name: "ZBrush Education", url: "https://www.maxon.net/en/zbrush/education" },
        { name: "Substance 3D Education", url: "https://www.adobe.com/products/substance3d-education.html" },
        { name: "Unity Learn Platform", url: "https://learn.unity.com/" },
        { name: "Unreal Engine Education", url: "https://www.unrealengine.com/en-US/education" },
        { name: "Godot Engine Learning", url: "https://godotengine.org/learn" },
        { name: "Construct 3 Education", url: "https://www.construct.net/en/education" },
        { name: "GameMaker Studio Education", url: "https://gamemaker.io/en/education" },
        { name: "Roblox Studio Learning", url: "https://create.roblox.com/docs" },
        { name: "Minecraft Education Edition", url: "https://education.minecraft.net/" }
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
        { name: "ST Math", url: "https://www.stmath.com/" },
        { name: "Khanmigo AI Tutor", url: "https://www.khanmigo.ai/" },
        { name: "ALEKS Math", url: "https://www.aleks.com/" },
        { name: "Math Nation", url: "https://www.mathnation.com/" },
        { name: "DeltaMath", url: "https://www.deltamath.com/" },
        { name: "Photomath", url: "https://photomath.com/" },
        { name: "Symbolab", url: "https://www.symbolab.com/" },
        { name: "Cymath", url: "https://www.cymath.com/" },
        { name: "Mathpix", url: "https://mathpix.com/" },
        { name: "Brilliant Math", url: "https://brilliant.org/courses/math/" },
        { name: "Professor Leonard", url: "https://www.youtube.com/channel/UCoHhuummRZaIVX7bD4t2czg" },
        { name: "Carnegie Learning 2025", url: "https://www.carnegielearning.com/" },
        { name: "Adaptive Learning Platforms", url: "https://whatfix.com/blog/adaptive-learning-platforms/" },
        { name: "Stanford AI + Education", url: "https://acceleratelearning.stanford.edu/initiative/digital-learning/ai-and-education/" },
        { name: "Socratic by Google", url: "https://socratic.org/" },
        { name: "Microsoft Math Solver", url: "https://mathsolver.microsoft.com/" },
        { name: "Maple Learn", url: "https://www.maplesoft.com/products/learn/" },
        { name: "GeoGebra Classroom", url: "https://www.geogebra.org/classroom" },
        { name: "Desmos Activity Builder", url: "https://teacher.desmos.com/" },
        { name: "Knewton Alta", url: "https://www.knewton.com/" },
        { name: "SMART Learning Suite", url: "https://www.smarttech.com/en/products/education-software/smart-learning-suite" },
        { name: "Carnegie Learning AI Math", url: "https://www.carnegielearning.com/solutions/math/" },
        { name: "Quantum Math Education", url: "https://www.quantum.org/" },
        { name: "Adaptive Math Platforms", url: "https://www.adaptivelearning.com/" },
        { name: "AI Math Tutoring Systems", url: "https://www.aimathtutor.com/" },
        { name: "Personalized Learning Math", url: "https://www.personalizedlearning.com/math" },
        { name: "Neural Math Networks", url: "https://www.neuralmathnetworks.com/" },
        { name: "Quantum Computing Math", url: "https://qiskit.org/textbook/ch-prerequisites/linear_algebra.html" },
        { name: "Advanced Calculus Online", url: "https://www.advancedcalculus.org/" },
        { name: "Statistics AI Learning", url: "https://www.statisticsai.com/" },
        { name: "Mathematical Modeling Tools", url: "https://www.mathmodeling.org/" },
        { name: "Sage Math", url: "https://www.sagemath.org/" },
        { name: "Octave Online", url: "https://octave-online.net/" },
        { name: "R for Mathematics", url: "https://www.r-project.org/" },
        { name: "Julia Programming", url: "https://julialang.org/learning/" },
        { name: "Maxima Computer Algebra", url: "https://maxima.sourceforge.io/" },
        { name: "Scilab", url: "https://www.scilab.org/" },
        { name: "GNU Plot", url: "http://www.gnuplot.info/" },
        { name: "Asymptote Vector Graphics", url: "https://asymptote.sourceforge.io/" },
        { name: "TikZ LaTeX Graphics", url: "https://tikz.net/" },
        { name: "MathJax", url: "https://www.mathjax.org/" },
        { name: "Modmath Assistive Technology", url: "https://www.modmath.com/" },
        { name: "CameraMath AI Solver", url: "https://cameramath.com/" },
        { name: "Mathpapa Algebra Calculator", url: "https://www.mathpapa.com/" },
        { name: "Quickmath Step-by-Step", url: "https://quickmath.com/" },
        { name: "Mathway Problem Solver", url: "https://www.mathway.com/" },
        { name: "Symbolab Math Solver", url: "https://www.symbolab.com/" },
        { name: "Cymath Math Solver", url: "https://www.cymath.com/" },
        { name: "Microsoft Math Solver", url: "https://mathsolver.microsoft.com/" },
        { name: "Photomath Camera Calculator", url: "https://photomath.com/" },
        { name: "Maple Learn", url: "https://www.maplesoft.com/products/learn/" },
        { name: "GeoGebra Classroom", url: "https://www.geogebra.org/classroom" },
        { name: "Desmos Activity Builder", url: "https://teacher.desmos.com/" },
        { name: "Desmos Scientific Calculator", url: "https://www.desmos.com/scientific" },
        { name: "Desmos Geometry Tool", url: "https://www.desmos.com/geometry" },
        { name: "Desmos 3D Calculator", url: "https://www.desmos.com/3d" },
        { name: "Mathigon Interactive Textbooks", url: "https://mathigon.org/" },
        { name: "Brilliant Math Courses", url: "https://brilliant.org/courses/math/" },
        { name: "Professor Leonard YouTube", url: "https://www.youtube.com/channel/UCoHhuummRZaIVX7bD4t2czg" },
        { name: "3Blue1Brown Math Videos", url: "https://www.3blue1brown.com/" }
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
        { name: "SciGirls Games", url: "https://pbskids.org/scigirls/games" },
        { name: "DragonBox Educational Games", url: "https://dragonbox.com/" },
        { name: "Lightbot", url: "https://lightbot.com/" },
        { name: "CodeSpark Academy", url: "https://codespark.com/" },
        { name: "Osmo Coding Games", url: "https://www.playosmo.com/en/coding/" },
        { name: "Roblox Education", url: "https://education.roblox.com/" },
        { name: "Minecraft Education", url: "https://education.minecraft.net/" },
        { name: "Factorio", url: "https://factorio.com/" },
        { name: "SpaceChem", url: "https://www.zachtronics.com/spacechem/" },
        { name: "Baba Is You", url: "https://hempuli.com/baba/" },
        { name: "The Witness", url: "http://the-witness.net/" },
        { name: "Gamification in STEM Education", url: "https://stemeducationjournal.springeropen.com/" },
        { name: "XR Learning Tools 2025", url: "https://edstutia.com/xr-trends-tools-2025/" },
        { name: "Discovery Education 2025", url: "https://www.discoveryeducation.com/" },
        { name: "ClassVR", url: "https://www.classvr.com/" },
        { name: "Engage VR", url: "https://engagevr.io/" },
        { name: "Mozilla Hubs", url: "https://hubs.mozilla.com/" },
        { name: "VictoryXR", url: "https://victoryxr.com/" },
        { name: "Immersive Learning", url: "https://www.immersivelearning.institute/" },
        { name: "Metaverse Education", url: "https://www.metaverseeducation.org/" },
        { name: "Spatial Learning", url: "https://spatial.io/education" },
        { name: "Horizon Worlds Education", url: "https://www.meta.com/horizon-worlds/" },
        { name: "VRChat Education", url: "https://hello.vrchat.com/education" },
        { name: "AltspaceVR Learning", url: "https://altvr.com/" },
        { name: "Rec Room Education", url: "https://recroom.com/education" },
        { name: "NeosVR Learning", url: "https://neos.com/" },
        { name: "ChilloutVR Education", url: "https://store.steampowered.com/app/661130/ChilloutVR/" },
        { name: "VRoid Hub Education", url: "https://hub.vroid.com/" },
        { name: "Cluster Education", url: "https://cluster.mu/" },
        { name: "Mozilla Hubs Classroom", url: "https://hubs.mozilla.com/spoke" },
        { name: "Frame VR Education", url: "https://framevr.io/" },
        { name: "CodeCombat Advanced", url: "https://codecombat.com/teachers" },
        { name: "Human Interface Technology", url: "https://www.hitl.washington.edu/" },
        { name: "NASA's Eyes on the Solar System", url: "https://eyes.nasa.gov/apps/solar-system/" },
        { name: "Google Earth VR", url: "https://arvr.google.com/earth/" },
        { name: "Titans of Space Plus", url: "https://www.titansofspacevr.com/plus/" },
        { name: "Apollo 11 VR", url: "https://immersivevreducation.com/apollo-11-vr/" },
        { name: "The Body VR", url: "https://thebodyvr.com/" },
        { name: "Anatomyou VR", url: "https://anatomyou.com/" },
        { name: "Virtual Speech VR", url: "https://virtualspeech.com/" },
        { name: "Mondly VR Languages", url: "https://www.mondly.com/vr" },
        { name: "ClassVR Educational VR", url: "https://www.classvr.com/" },
        { name: "Engage VR Learning", url: "https://engagevr.io/" },
        { name: "Mozilla Hubs Education", url: "https://hubs.mozilla.com/" },
        { name: "VictoryXR Immersive Learning", url: "https://victoryxr.com/" },
        { name: "Spatial Learning Platform", url: "https://spatial.io/education" },
        { name: "Frame VR Education", url: "https://framevr.io/" },
        { name: "CoSpaces Edu VR Creation", url: "https://cospaces.io/edu/" },
        { name: "Nearpod VR Field Trips", url: "https://nearpod.com/vr-ar/" },
        { name: "Google Expeditions AR", url: "https://arvr.google.com/expeditions/" },
        { name: "Merge Cube AR Learning", url: "https://mergeedu.com/" },
        { name: "Alchemy VR Science", url: "https://alchemyvr.com/" },
        { name: "Unimersiv VR Education", url: "https://unimersiv.com/" },
        { name: "InCell VR Biology", url: "https://incellvr.com/" },
        { name: "Titans of Space VR", url: "https://www.titansofspacevr.com/" },
        { name: "Google Earth VR", url: "https://arvr.google.com/earth/" },
        { name: "NASA Eyes Solar System", url: "https://eyes.nasa.gov/apps/solar-system/" }
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
        { name: "STEM Like a Girl", url: "https://stemlikeagirl.org/" },
        { name: "Code Like a Girl", url: "https://codelikeagirl.org/" },
        { name: "Women in Tech", url: "https://women-in-tech.org/" },
        { name: "AnitaB.org", url: "https://anitab.org/" },
        { name: "Women in Engineering ProActive Network", url: "https://www.wepan.org/" },
        { name: "Association for Women in Science", url: "https://www.awis.org/" },
        { name: "Women in Science and Engineering", url: "https://wise.umich.edu/" },
        { name: "Girls in Science Initiative", url: "https://www.sciowa.org/programs-and-events/youth-programs/girls-in-science-initiative-2/" },
        { name: "Women in STEM Decal", url: "https://womeninstem.berkeley.edu/" },
        { name: "She Can STEM", url: "https://shecanstem.com/" },
        { name: "STEM Women", url: "https://stemwomen.com/" },
        { name: "Women in AI", url: "https://www.womeninai.co/" },
        { name: "AI4ALL", url: "https://ai-4-all.org/" },
        { name: "Women in Data Science", url: "https://www.widsconference.org/" },
        { name: "Women in Cybersecurity", url: "https://www.wicys.org/" },
        { name: "Women in Robotics", url: "https://womeninrobotics.org/" },
        { name: "Women in VR/AR", url: "https://www.womeninvr.co/" },
        { name: "Female Founders in Tech", url: "https://www.femalefounders.org/" },
        { name: "Women in 3D Printing", url: "https://womenin3dprinting.com/" },
        { name: "Women in Quantum Computing", url: "https://womeninquantum.org/" },
        { name: "Women in Space", url: "https://womeninspace.org/" },
        { name: "Women in Blockchain", url: "https://womeninblockchain.org/" },
        { name: "Women in Fintech", url: "https://www.womeninfintech.org/" },
        { name: "Women in Biotech", url: "https://www.womeninbio.org/" },
        { name: "Women in Clean Energy", url: "https://www.womenincleanenergy.org/" },
        { name: "Women in Aerospace", url: "https://www.womeninaerospace.org/" },
        { name: "Women in Nuclear", url: "https://www.womeninnuclear.org/" },
        { name: "Women in Materials Science", url: "https://www.womeninmaterialsscience.org/" },
        { name: "Women in Nanotechnology", url: "https://www.womeninnanotechnology.org/" },
        { name: "Women in Renewable Energy", url: "https://www.womeninrenewableenergy.org/" },
        { name: "Women in Smart Cities", url: "https://www.womeninsmartcities.org/" },
        { name: "Women in Gaming", url: "https://womeningames.org/" },
        { name: "Women in Animation", url: "https://womeninanimation.org/" },
        { name: "Women in Film & Television", url: "https://womeninfilm.org/" },
        { name: "Women in Music Technology", url: "https://www.womeninmusic.org/" },
        { name: "Women in Digital Arts", url: "https://www.womenindigitalarts.org/" },
        { name: "Women in UX Design", url: "https://www.womeninux.com/" },
        { name: "Women in Product Management", url: "https://www.womeninproduct.com/" },
        { name: "Women in DevOps", url: "https://www.womenindevops.org/" },
        { name: "Women in Cloud Computing", url: "https://www.womenincloud.org/" },
        { name: "Women in Edge Computing", url: "https://www.womeninedgecomputing.org/" },
        { name: "STEM for Her Organization", url: "https://stemforher.org/" },
        { name: "Women in STEM Decal Berkeley", url: "https://womeninstem.berkeley.edu/" },
        { name: "Girls in Science Initiative", url: "https://www.sciowa.org/programs-and-events/youth-programs/girls-in-science-initiative-2/" },
        { name: "Association for Women in Science AWIS", url: "https://www.awis.org/" },
        { name: "Women in Engineering ProActive Network WEPAN", url: "https://www.wepan.org/" },
        { name: "AnitaB.org Grace Hopper", url: "https://anitab.org/" },
        { name: "Women in Tech Global", url: "https://women-in-tech.org/" },
        { name: "National Girls Collaborative Project", url: "https://ngcproject.org/" },
        { name: "Expanding Your Horizons", url: "https://www.expandingyourhorizons.org/" },
        { name: "Girls Inc STEM Programs", url: "https://girlsinc.org/" },
        { name: "SciGirls PBS Kids", url: "https://pbskids.org/scigirls/" },
        { name: "Million Women Mentors", url: "https://www.millionwomenmentors.org/" },
        { name: "Technovation Girls Challenge", url: "https://technovationchallenge.org/" },
        { name: "Black Girls CODE", url: "https://www.blackgirlscode.com/" }
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
        { name: "COSMOS UC Programs", url: "https://cosmos.ucop.edu/" },
        { name: "Space Camp", url: "https://www.rocketcenter.com/SpaceCamp" },
        { name: "APSU CoSTEM Summer Camps", url: "https://www.apsu.edu/costem/summer-camps.php" },
        { name: "USM STEM Camps", url: "https://usm.maine.edu/stem-outreach/stem-camps/" },
        { name: "NC A&T Summer Youth Programs", url: "https://www.ncat.edu/academics/summer-sessions/summer-camps.php" },
        { name: "GEMS Video Game Design Camp", url: "https://www.usaeop.com/program/gems/" },
        { name: "Code Ninjas", url: "https://www.codeninjas.com/" },
        { name: "Tech Kids Unlimited", url: "https://www.techkidsunlimited.com/" },
        { name: "STEM for Her", url: "https://stemforher.org/" },
        { name: "Engineering for Kids Camps", url: "https://www.engineeringforkids.com/programs/camps/" },
        { name: "Mad Science Camps", url: "https://www.madscience.org/camps/" },
        { name: "AI Summer Camps 2025", url: "https://www.ai-camp.org/" },
        { name: "VR/AR Summer Programs", url: "https://www.vrarcamps.com/" },
        { name: "Quantum Computing Camps", url: "https://www.quantumcamps.org/" },
        { name: "Cybersecurity Youth Programs", url: "https://www.cybersecuritycamps.org/" },
        { name: "Data Science for Kids", url: "https://www.datasciencecamps.org/" },
        { name: "Drone Programming Camps", url: "https://www.dronecamps.org/" },
        { name: "3D Printing Summer Programs", url: "https://www.3dprintingcamps.org/" },
        { name: "Biotech Youth Programs", url: "https://www.biotechcamps.org/" },
        { name: "Green Energy Camps", url: "https://www.greenenergycamps.org/" },
        { name: "Space Technology Camps", url: "https://www.spacetechcamps.org/" },
        { name: "Metaverse Learning Camps", url: "https://www.metaverselearningcamps.org/" },
        { name: "Blockchain Youth Programs", url: "https://www.blockchainyouthprograms.org/" },
        { name: "Neural Network Camps", url: "https://www.neuralnetworkcamps.org/" },
        { name: "Quantum Education Programs", url: "https://www.quantumeducationprograms.org/" },
        { name: "Sustainable Tech Camps", url: "https://www.sustainabletechcamps.org/" },
        { name: "Smart City Youth Programs", url: "https://www.smartcityyouthprograms.org/" },
        { name: "Bioengineering Camps", url: "https://www.bioengineeringcamps.org/" },
        { name: "Nanotechnology Youth Programs", url: "https://www.nanotechyouthprograms.org/" },
        { name: "Clean Energy Education", url: "https://www.cleanenergyeducation.org/" },
        { name: "Advanced Materials Camps", url: "https://www.advancedmaterialscamps.org/" },
        { name: "MIT Summer Research Program", url: "https://oge.mit.edu/graddiversity/msrp/" },
        { name: "Caltech Summer Undergraduate Research", url: "https://www.surf.caltech.edu/" },
        { name: "Harvard Summer Research", url: "https://college.harvard.edu/academics/opportunities/research-opportunities" },
        { name: "Princeton Summer Undergraduate Research", url: "https://undergraduateresearch.princeton.edu/programs/summer-programs" },
        { name: "Yale Summer Research", url: "https://yalecollege.yale.edu/academics/experiential-learning/research/summer-research" },
        { name: "Columbia Summer Research", url: "https://www.college.columbia.edu/academics/undergraduate-research" },
        { name: "University of Chicago Research", url: "https://college.uchicago.edu/academics/undergraduate-research" },
        { name: "Northwestern Summer Research", url: "https://undergradresearch.northwestern.edu/" },
        { name: "Duke Summer Research", url: "https://trinity.duke.edu/undergraduate/research" },
        { name: "Vanderbilt Summer Research", url: "https://www.vanderbilt.edu/undergraduateresearch/" },
        { name: "COSMOS UC Programs 2025", url: "https://cosmos.ucop.edu/" },
        { name: "TRCamp Tennessee Robotics 2025", url: "https://www.tennesseeroboticscenter.com/trcamp-2025" },
        { name: "BadgerBots Summer Camps 2025", url: "https://www.badgerbots.org/2025-summer-camps" },
        { name: "Purdue VIP Engineering 2025", url: "https://engineering.purdue.edu/VIP/teams" },
        { name: "INTEGEM STEM Camps", url: "https://camp.integem.com/" },
        { name: "Code Ninjas Summer Programs", url: "https://www.codeninjas.com/" },
        { name: "Tech Kids Unlimited", url: "https://www.techkidsunlimited.com/" },
        { name: "Engineering for Kids Camps", url: "https://www.engineeringforkids.com/programs/camps/" },
        { name: "Mad Science Summer Camps", url: "https://www.madscience.org/camps/" },
        { name: "AI Summer Camps 2025", url: "https://www.ai-camp.org/" },
        { name: "VR/AR Summer Programs 2025", url: "https://www.vrarcamps.com/" },
        { name: "Quantum Computing Youth Camps", url: "https://www.quantumcamps.org/" },
        { name: "Cybersecurity Youth Programs", url: "https://www.cybersecuritycamps.org/" },
        { name: "Data Science for Kids Camps", url: "https://www.datasciencecamps.org/" },
        { name: "Drone Programming Summer Camps", url: "https://www.dronecamps.org/" },
        { name: "3D Printing Summer Programs", url: "https://www.3dprintingcamps.org/" },
        { name: "Biotech Youth Summer Programs", url: "https://www.biotechcamps.org/" },
        { name: "Green Energy Summer Camps", url: "https://www.greenenergycamps.org/" },
        { name: "Space Technology Summer Camps", url: "https://www.spacetechcamps.org/" },
        { name: "Metaverse Learning Summer Camps", url: "https://www.metaverselearningcamps.org/" }
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
        { name: "Rosie Revere, Engineer", url: "https://www.amazon.com/Rosie-Revere-Engineer-Andrea-Beaty/dp/1419708457/" },
        { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/" },
        { name: "Stanford Online", url: "https://online.stanford.edu/" },
        { name: "Harvard Online Learning", url: "https://online-learning.harvard.edu/" },
        { name: "Coursera", url: "https://www.coursera.org/" },
        { name: "edX", url: "https://www.edx.org/" },
        { name: "Udacity", url: "https://www.udacity.com/" },
        { name: "FutureLearn", url: "https://www.futurelearn.com/" },
        { name: "Skillshare", url: "https://www.skillshare.com/" },
        { name: "MasterClass", url: "https://www.masterclass.com/" },
        { name: "O'Reilly Learning", url: "https://www.oreilly.com/" },
        { name: "Packt Publishing", url: "https://www.packtpub.com/" },
        { name: "Manning Publications", url: "https://www.manning.com/" },
        { name: "No Starch Press", url: "https://nostarch.com/" },
        { name: "Apress", url: "https://www.apress.com/" },
        { name: "Wiley Education", url: "https://www.wiley.com/en-us/education" },
        { name: "Pearson Education", url: "https://www.pearson.com/" },
        { name: "McGraw Hill Education", url: "https://www.mheducation.com/" },
        { name: "Cengage Learning", url: "https://www.cengage.com/" },
        { name: "Springer Nature", url: "https://www.springernature.com/gp/education" },
        { name: "Cambridge University Press", url: "https://www.cambridge.org/core/what-we-publish/textbooks" },
        { name: "Nature Education", url: "https://www.nature.com/scitable/" },
        { name: "Science Direct Learning", url: "https://www.sciencedirect.com/" },
        { name: "IEEE Xplore Digital Library", url: "https://ieeexplore.ieee.org/" },
        { name: "ACM Digital Library", url: "https://dl.acm.org/" },
        { name: "arXiv.org", url: "https://arxiv.org/" },
        { name: "bioRxiv", url: "https://www.biorxiv.org/" },
        { name: "PLoS ONE", url: "https://journals.plos.org/plosone/" },
        { name: "Open Access Textbooks", url: "https://open.umn.edu/opentextbooks/" },
        { name: "MIT Press Open", url: "https://mitpress.mit.edu/books/open-access" },
        { name: "Directory of Open Access Books", url: "https://www.doabooks.org/" },
        { name: "Project Gutenberg", url: "https://www.gutenberg.org/" },
        { name: "Internet Archive", url: "https://archive.org/" },
        { name: "HathiTrust Digital Library", url: "https://www.hathitrust.org/" },
        { name: "Google Scholar", url: "https://scholar.google.com/" },
        { name: "ResearchGate", url: "https://www.researchgate.net/" },
        { name: "Academia.edu", url: "https://www.academia.edu/" },
        { name: "JSTOR", url: "https://www.jstor.org/" },
        { name: "Wiley Online Library", url: "https://onlinelibrary.wiley.com/" },
        { name: "Taylor & Francis Online", url: "https://www.tandfonline.com/" },
        { name: "SAGE Journals", url: "https://journals.sagepub.com/" },
        { name: "OpenStax Free Textbooks", url: "https://openstax.org/" },
        { name: "MIT Press Open Access", url: "https://mitpress.mit.edu/books/open-access" },
        { name: "Directory of Open Access Books", url: "https://www.doabooks.org/" },
        { name: "OER Commons", url: "https://www.oercommons.org/" },
        { name: "Saylor Academy Free Courses", url: "https://www.saylor.org/" },
        { name: "MIT OpenCourseWare Textbooks", url: "https://ocw.mit.edu/courses/textbooks/" },
        { name: "Stanford Encyclopedia of Philosophy", url: "https://plato.stanford.edu/" },
        { name: "Internet Encyclopedia of Philosophy", url: "https://iep.utm.edu/" },
        { name: "Encyclopedia Britannica Academic", url: "https://academic.eb.com/" },
        { name: "Wolfram MathWorld", url: "https://mathworld.wolfram.com/" },
        { name: "NIST Chemistry WebBook", url: "https://webbook.nist.gov/chemistry/" },
        { name: "PubChem Database", url: "https://pubchem.ncbi.nlm.nih.gov/" },
        { name: "ChemSpider Database", url: "https://www.chemspider.com/" },
        { name: "Protein Data Bank", url: "https://www.rcsb.org/" },
        { name: "GenBank Genetic Database", url: "https://www.ncbi.nlm.nih.gov/genbank/" },
        { name: "NASA Technical Reports", url: "https://ntrs.nasa.gov/" },
        { name: "CERN Document Server", url: "https://cds.cern.ch/" },
        { name: "arXiv Preprint Server", url: "https://arxiv.org/" }
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
        { name: "Microsoft Education", url: "https://education.microsoft.com/" },
        { name: "Apple Education", url: "https://www.apple.com/education/" },
        { name: "Adobe Education", url: "https://www.adobe.com/education.html" },
        { name: "Canva for Education", url: "https://www.canva.com/education/" },
        { name: "Flipgrid", url: "https://flipgrid.com/" },
        { name: "Padlet", url: "https://padlet.com/" },
        { name: "Nearpod", url: "https://nearpod.com/" },
        { name: "Kahoot!", url: "https://kahoot.com/" },
        { name: "Quizizz", url: "https://quizizz.com/" },
        { name: "Seesaw", url: "https://web.seesaw.me/" },
        { name: "ClassDojo", url: "https://www.classdojo.com/" },
        { name: "Zoom for Education", url: "https://zoom.us/education" },
        { name: "Microsoft Teams for Education", url: "https://www.microsoft.com/en-us/education/products/teams" },
        { name: "Google Workspace for Education", url: "https://workspace.google.com/education/" },
        { name: "Schoology", url: "https://www.schoology.com/" },
        { name: "Canvas LMS", url: "https://www.instructure.com/canvas" },
        { name: "Blackboard Learn", url: "https://www.blackboard.com/teaching-learning/learning-management" },
        { name: "Moodle", url: "https://moodle.org/" },
        { name: "Edmodo", url: "https://new.edmodo.com/" },
        { name: "Remind", url: "https://www.remind.com/" },
        { name: "Pear Deck", url: "https://www.peardeck.com/" },
        { name: "Wakelet", url: "https://wakelet.com/" },
        { name: "Flipgrid by Microsoft", url: "https://info.flipgrid.com/" },
        { name: "Mentimeter", url: "https://www.mentimeter.com/" },
        { name: "Slido", url: "https://www.slido.com/" },
        { name: "Jamboard", url: "https://jamboard.google.com/" },
        { name: "Miro for Education", url: "https://miro.com/education/" },
        { name: "Conceptboard", url: "https://conceptboard.com/" },
        { name: "Explain Everything", url: "https://explaineverything.com/" },
        { name: "Screencastify", url: "https://www.screencastify.com/" },
        { name: "Loom for Education", url: "https://www.loom.com/education" },
        { name: "Thinglink Interactive Media", url: "https://www.thinglink.com/" },
        { name: "H5P Interactive Content", url: "https://h5p.org/" },
        { name: "Genially Interactive Presentations", url: "https://genial.ly/" },
        { name: "Prezi Video", url: "https://prezi.com/video/" },
        { name: "Flipsnack Digital Publishing", url: "https://www.flipsnack.com/" },
        { name: "Book Creator", url: "https://bookcreator.com/" },
        { name: "StoryMapJS", url: "https://storymap.knightlab.com/" },
        { name: "TimelineJS", url: "https://timeline.knightlab.com/" },
        { name: "ThingLink VR", url: "https://www.thinglink.com/vr" },
        { name: "CoSpaces Edu VR", url: "https://cospaces.io/edu/vr/" },
        { name: "Discovery Education 2025", url: "https://www.discoveryeducation.com/" },
        { name: "LEGO Education SPIKE", url: "https://education.lego.com/en-us/lessons/" },
        { name: "STEM Action Center Utah", url: "https://stem.utah.gov/" },
        { name: "NASA Next Gen STEM", url: "https://www.nasa.gov/learning-resources/for-educators/" },
        { name: "WWF Teaching Resources", url: "https://www.worldwildlife.org/teaching-resources" },
        { name: "CFR Education Resources", url: "https://www.cfr.org/education/" },
        { name: "American Association of School Librarians", url: "https://www.ala.org/aasl/awards/best" },
        { name: "ORISE STEM Competitions", url: "https://orise.orau.gov/k12/teachers/competitions.html" },
        { name: "American University Education Technology", url: "https://soeonline.american.edu/blog/technology-in-education/" },
        { name: "National Science Teachers Association NSTA", url: "https://www.nsta.org/" },
        { name: "NEA Tools and Tips", url: "https://www.nea.org/professional-excellence/student-engagement/tools-tips" },
        { name: "University of Iowa STEM Integration", url: "https://onlineprograms.education.uiowa.edu/blog/technology-integration-in-stem-education-tools-and-techniques" },
        { name: "Sphero Education Math Strategies", url: "https://sphero.com/blogs/news/innovative-math-teaching-strategies-for-the-digital-age" },
        { name: "KidsParke STEM Classroom Design", url: "https://kidsparkeducation.org/blog/educator-guide-effective-stem-classroom-design" },
        { name: "CodeWizards HQ STEM Definition", url: "https://www.codewizardshq.com/stem-meaning/" },
        { name: "Research.com Educational Apps", url: "https://research.com/software/best-educational-apps-for-kids" },
        { name: "K12 STEM Education Programs", url: "https://www.k12.com/stem-education/" },
        { name: "Texas State Aquarium Education", url: "https://www.texasstateaquarium.org/educate/" },
        { name: "NYAS Junior Academy", url: "https://www.nyas.org/learning/high-school-research-programs/the-junior-academy/" }
      ]
    },
    {
      id: 10,
      title: "Government Initiatives",
      description: "Official STEM programs",
      icon: <BookOpen className="w-5 h-5" />,
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
        { name: "Federal Resources for Educational Excellence", url: "https://www.ed.gov/free" },
        { name: "National Aeronautics and Space Administration", url: "https://www.nasa.gov/" },
        { name: "National Oceanic and Atmospheric Administration", url: "https://www.noaa.gov/" },
        { name: "United States Geological Survey", url: "https://www.usgs.gov/" },
        { name: "Department of Defense STEM", url: "https://www.dodstem.us/" },
        { name: "National Security Agency STEM", url: "https://www.nsa.gov/careers/students-educators/" },
        { name: "Federal Bureau of Investigation STEM", url: "https://www.fbi.gov/investigate/cyber/cyber-education" },
        { name: "Centers for Medicare & Medicaid Services", url: "https://www.cms.gov/" },
        { name: "Food and Drug Administration Education", url: "https://www.fda.gov/about-fda/jobs-and-training-fda" },
        { name: "Department of Transportation STEM", url: "https://www.transportation.gov/" },
        { name: "Department of Homeland Security STEM", url: "https://www.dhs.gov/science-and-technology" },
        { name: "National Institute of Health Research", url: "https://www.nih.gov/research-training" },
        { name: "Department of Agriculture Research", url: "https://www.usda.gov/topics/research-and-science" },
        { name: "Department of Commerce STEM", url: "https://www.commerce.gov/page/science-technology-engineering-and-mathematics-stem" },
        { name: "Department of Interior Science", url: "https://www.doi.gov/science" },
        { name: "Department of Labor STEM", url: "https://www.dol.gov/agencies/eta/apprenticeship/stem" },
        { name: "Department of Veterans Affairs STEM", url: "https://www.va.gov/education/about-gi-bill-benefits/how-to-use-benefits/stem-scholarship/" },
        { name: "Small Business Administration Tech", url: "https://www.sba.gov/business-guide/grow-your-business/technology" },
        { name: "National Archives Education", url: "https://www.archives.gov/education" },
        { name: "Smithsonian Institution Learning", url: "https://www.si.edu/learn" },
        { name: "Peace Corps STEM Education", url: "https://www.peacecorps.gov/educators/" },
        { name: "National Renewable Energy Laboratory", url: "https://www.nrel.gov/education/" },
        { name: "Oak Ridge National Laboratory", url: "https://www.ornl.gov/education" },
        { name: "Argonne National Laboratory", url: "https://www.anl.gov/education" },
        { name: "Lawrence Berkeley National Laboratory", url: "https://www.lbl.gov/education/" },
        { name: "Sandia National Laboratories", url: "https://www.sandia.gov/careers/students-and-postdocs/" },
        { name: "Los Alamos National Laboratory", url: "https://www.lanl.gov/careers/career-options/student-internships/" },
        { name: "Pacific Northwest National Laboratory", url: "https://www.pnnl.gov/education" },
        { name: "Brookhaven National Laboratory", url: "https://www.bnl.gov/education/" },
        { name: "Fermi National Accelerator Laboratory", url: "https://ed.fnal.gov/" },
        { name: "SLAC National Accelerator Laboratory", url: "https://www6.slac.stanford.edu/education" },
        { name: "Jefferson Lab Education", url: "https://education.jlab.org/" },
        { name: "CERN Education", url: "https://home.cern/students-educators" },
        { name: "European Space Agency Education", url: "https://www.esa.int/Education" },
        { name: "JAXA Space Education", url: "https://global.jaxa.jp/education/" },
        { name: "Canadian Space Agency Education", url: "https://www.asc-csa.gc.ca/eng/educators/" },
        { name: "Australian Space Agency Education", url: "https://www.industry.gov.au/data-and-publications/australian-space-agency" },
        { name: "Indian Space Research Organisation", url: "https://www.isro.gov.in/education" },
        { name: "China National Space Administration", url: "http://www.cnsa.gov.cn/" },
        { name: "SpaceIL Education", url: "https://www.spaceil.com/education/" },
        { name: "Blue Origin Education", url: "https://www.blueorigin.com/education" },
        { name: "NSF SBIR America's Seed Fund", url: "https://seedfund.nsf.gov/" },
        { name: "NSF S-STEM Scholarships 2025", url: "https://www.nsf.gov/funding/opportunities/s-stem-nsf-scholarships-science-technology-engineering-mathematics" },
        { name: "ORISE STEM Internships", url: "https://orise.orau.gov/internships-fellowships/index.html" },
        { name: "NASA Internship Programs 2025", url: "https://www.nasa.gov/learning-resources/internship-programs/" },
        { name: "NSF Artificial Intelligence Focus", url: "https://www.nsf.gov/focus-areas/artificial-intelligence" }
      ]
    },
    {
      id: 11,
      title: "Robotics & Automation",
      description: "Robotics competitions, companies & innovation",
      icon: <Bot className="w-5 h-5" />,
      color: "#FF6B35",
      isSpecial: true,
      route: "/robotics",
      resources: [
        { name: "FIRST Robotics Competition", url: "https://www.firstinspires.org/robotics/frc" },
        { name: "VEX Robotics Competition", url: "https://www.vexrobotics.com/competition" },
        { name: "Boston Dynamics", url: "https://www.bostondynamics.com/" },
        { name: "Tesla Optimus Robot", url: "https://www.tesla.com/optimus" },
        { name: "IEEE Robotics", url: "https://www.ieee-ras.org/" },
        { name: "RoboCup International", url: "https://www.robocup.org/" },
        { name: "DARPA Robotics Challenge", url: "https://www.darpa.mil/program/darpa-robotics-challenge" },
        { name: "NASA Robotics", url: "https://www.nasa.gov/robotics/" },
        { name: "MIT Robotics", url: "https://www.csail.mit.edu/research/robotics" },
        { name: "Carnegie Mellon Robotics", url: "https://www.ri.cmu.edu/" }
      ]
    },
    {
      id: 12,
      title: "Space Exploration",
      description: "Space missions, astronomy & cosmic discovery",
      icon: <Rocket className="w-5 h-5" />,
      color: "#8B5CF6",
      isSpecial: true,
      route: "/space-exploration",
      resources: [
        { name: "NASA Space Exploration", url: "https://www.nasa.gov/exploration/" },
        { name: "SpaceX Missions", url: "https://www.spacex.com/missions/" },
        { name: "ESA Space Exploration", url: "https://www.esa.int/Science_Exploration" },
        { name: "Blue Origin", url: "https://www.blueorigin.com/" },
        { name: "Mars Exploration Program", url: "https://mars.nasa.gov/" },
        { name: "Hubble Space Telescope", url: "https://hubblesite.org/" },
        { name: "James Webb Space Telescope", url: "https://www.jwst.nasa.gov/" },
        { name: "International Space Station", url: "https://www.nasa.gov/mission_pages/station/" },
        { name: "Artemis Moon Program", url: "https://www.nasa.gov/artemis/" },
        { name: "Planetary Society", url: "https://www.planetary.org/" }
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
      <div className="min-h-screen bg-black">
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

  // Show shimmer loading for initial page load
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black">
        {/* Header Shimmer */}
        <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <ShimmerLoader variant="silver" width="w-20" height="h-10" className="rounded-lg" />
              <ShimmerLoader variant="silver" width="w-48" height="h-8" className="rounded-lg" />
            </div>
          </div>
        </div>

        {/* Main Content Shimmer */}
        <main className="flex-1 py-6 sm:py-8">
          <div className="container mx-auto px-3 sm:px-4 max-w-6xl">
            {/* Introduction Shimmer */}
            <div className="text-center mb-8">
              <ShimmerLoader variant="silver" width="w-16" height="h-16" className="mx-auto mb-4 rounded-2xl" />
              <ShimmerLoader variant="silver" width="w-64" height="h-8" className="mx-auto mb-4 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-96" height="h-6" className="mx-auto mb-2 rounded-lg" />
              <ShimmerLoader variant="silver" width="w-80" height="h-6" className="mx-auto rounded-lg" />
            </div>

            {/* Search Bar Shimmer */}
            <div className="mb-8">
              <ShimmerLoader variant="silver" width="w-full" height="h-12" className="rounded-xl" />
            </div>

            {/* Categories Grid Shimmer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ShimmerLoader
                  key={item}
                  variant="silver"
                  width="w-full"
                  height="h-[300px]"
                  className="rounded-2xl"
                />
              ))}
            </div>

            {/* Footer Message Shimmer */}
            <div className="text-center">
              <ShimmerLoader variant="silver" width="w-80" height="h-6" className="mx-auto rounded-lg" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  // SEO structured data for STEM page
  const stemStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "STEM Education Resources",
    "description": "Comprehensive STEM education resources including Science, Technology, Engineering, and Mathematics tools and learning materials for junior high school students.",
    "url": "https://stlouisdemojhs.com/stem",
    "isPartOf": {
      "@type": "WebSite",
      "name": "St. Louis Demonstration JHS",
      "url": "https://stlouisdemojhs.com"
    },
    "about": {
      "@type": "EducationalOrganization",
      "name": "St. Louis Demonstration Junior High School"
    },
    "audience": {
      "@type": "EducationalAudience",
      "educationalRole": "student"
    },
    "educationalLevel": "Junior High School",
    "teaches": ["Science", "Technology", "Engineering", "Mathematics"]
  };

  return (
    <>
      <SEOHead
        title="STEM Education | Science, Technology, Engineering & Mathematics Resources - St. Louis Demonstration JHS"
        description="STEM Education - Ignite your passion for Science, Technology, Engineering, and Mathematics at St. Louis Demonstration JHS. Explore hands-on experiments, coding tutorials, engineering challenges, and mathematical problem-solving tools designed to inspire the next generation of innovators."
        keywords="STEM education, science resources, technology learning, engineering tools, mathematics resources, JHS STEM, educational technology, science experiments, coding for kids"
        url="/stem"
        type="website"
        structuredData={stemStructuredData}
        pageType="stem"
        useGalleryImages={true}
      />
      <div className="min-h-screen bg-black">
      <Header />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-3 sm:py-4 pt-20">
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
              STEM/TVET Resources
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

          {/* STEM & TVET Learning Links */}
          <div className="text-center mb-8">
            <p className="text-base text-gray-300 mb-4">
              Learn deeply about STEM & TVET here
            </p>
            <div className="flex flex-row gap-3 justify-center items-center max-w-2xl mx-auto">
              <a
                href="/stem-deep-learning"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/25 hover:scale-105 group text-sm"
                style={{
                  textShadow: '0 0 8px rgba(255, 255, 0, 0.8), 0 0 16px rgba(255, 255, 0, 0.6)',
                  boxShadow: '0 0 15px rgba(255, 255, 0, 0.3), 0 0 30px rgba(255, 255, 0, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.2)'
                }}
              >
                <BookOpen size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>STEM Definitions & Careers</span>
              </a>

              <a
                href="/tvet"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-black font-bold rounded-lg hover:from-green-300 hover:to-green-400 transition-all duration-300 shadow-lg hover:shadow-green-400/25 hover:scale-105 group text-sm"
                style={{
                  textShadow: '0 0 8px rgba(0, 255, 0, 0.8), 0 0 16px rgba(0, 255, 0, 0.6)',
                  boxShadow: '0 0 15px rgba(0, 255, 0, 0.3), 0 0 30px rgba(0, 255, 0, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.2)'
                }}
              >
                <BookOpen size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>TVET Career & Schools</span>
              </a>
            </div>
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
                  data-category-title={category.title}
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
    </>
  );
};

export default STEMPage;
