import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, GraduationCap, Heart, Award, Handshake } from 'lucide-react'; // Added Handshake
import { useNavigate, Link } from 'react-router-dom'; // Added Link
import SectionDivider from '../components/common/SectionDivider';
import AlumniDetailModal from '../components/common/AlumniDetailModal';
import SEOHead from '../components/seo/SEOHead';
import { getSchoolStats } from '../utils/schoolStats';

// Define Alumni type matching the one in AlumniDetailModal
interface Alumni {
  name: string;
  class: string;
  profession: string;
  achievement: string;
  image: string;
  quote: string;
  linkedin?: string;
  bookUrl?: string;
  facebook?: string;
}

// Apple-style Stopwatch Timer Component
const AppleTimer: React.FC<{ targetDate: string; eventName: string }> = ({ targetDate, eventName }) => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
        const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ years, days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'Y', value: timeLeft.years, color: 'from-blue-500 to-blue-600' },
    { label: 'D', value: timeLeft.days, color: 'from-green-500 to-green-600' },
    { label: 'H', value: timeLeft.hours, color: 'from-purple-500 to-purple-600' },
    { label: 'M', value: timeLeft.minutes, color: 'from-orange-500 to-orange-600' },
    { label: 'S', value: timeLeft.seconds, color: 'from-red-500 to-red-600' }
  ];

  return (
    <div className="mt-auto">
      <div className="flex items-center justify-center mb-2">
        <span className="text-xs text-white/60 mr-1">⏱</span>
        <span className="text-xs font-medium text-white/60 uppercase tracking-wide">Countdown</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="text-center"
            animate={{
              scale: unit.label === 'S' ? [1, 1.05, 1] : 1
            }}
            transition={{
              duration: 1,
              repeat: unit.label === 'S' ? Infinity : 0,
              ease: "easeInOut"
            }}
          >
            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${unit.color} rounded-lg flex items-center justify-center mb-1 shadow-lg border border-white/20`}>
              <span className="text-white font-mono font-bold text-xs sm:text-sm">
                {unit.value.toString().padStart(2, '0')}
              </span>
            </div>
            <div className="text-white/70 text-xs font-medium uppercase tracking-wider">
              {unit.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Shimmer Loading Component
const ShimmerLoader: React.FC<{ className?: string; rounded?: string }> = ({
  className = "w-full h-40",
  rounded = "rounded-xl"
}) => (
  <div className={`relative overflow-hidden ${rounded} bg-gray-800 ${className}`}>
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>
  </div>
);

// Optimized Image Component with Shimmer Loading
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  shimmerClassName?: string;
}> = ({ src, alt, className, onClick, shimmerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <ShimmerLoader className={shimmerClassName || className} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onClick={onClick}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ contentVisibility: 'auto' }}
      />
      {hasError && (
        <div className={`${className} bg-gray-800 flex items-center justify-center text-gray-400`}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

const AlumniPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAlumniIndex, setSelectedAlumniIndex] = useState<number | null>(null);
  // const [minYear, setMinYear] = useState<number | string>(1977); // REMOVE
  // const [maxYear, setMaxYear] = useState<number | string>(2030); // REMOVE
  const [sliderYear, setSliderYear] = useState<number>(2012);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Or a more complex calculation if based on "visual rows"
  // const [modalYPosition, setModalYPosition] = useState<number | null>(null); // Removed

  // 🚀 AUTOMATED: Alumni stats with dynamic school age
  const schoolStats = getSchoolStats();
  const alumniStats = [
    { icon: <GraduationCap className="w-8 h-8" />, number: schoolStats.totalStudentsFormatted, label: "Graduates", color: "from-blue-500 to-cyan-500" },
    { icon: <span className="text-2xl">📅</span>, number: schoolStats.ageFormatted, label: "Years of Excellence", color: "from-green-500 to-emerald-500" },
    { icon: <Users className="w-8 h-8" />, number: "10,000+", label: "Active Alumni", color: "from-purple-500 to-pink-500" },
    { icon: <Award className="w-8 h-8" />, number: "100+", label: "Success Stories", color: "from-orange-500 to-red-500" }
  ];

  const featuredAlumni: Alumni[] = [
    {
      name: "Emmanuel H. Dwamena",
      class: "Class of 2012",
      profession: "Founder of AIDEL | Author",
      achievement: "Tech entrepreneur, innovator in educational technology, and published author",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1718218562009.jpeg?updatedAt=1748301421227",
      quote: "St. Louis Demo JHS instilled in me the entrepreneurial spirit and problem-solving mindset that led to founding AIDEL.",
      linkedin: "https://www.linkedin.com/in/edhumbling/",
      bookUrl: "https://www.amazon.com/Simple-Yet-Great-simplicity-greatness/dp/1072303825"
    },
    {
      name: "Michael Boateng Duah, MS, MLS(ASCPi)CM",
      class: "Class of 2012",
      profession: "Clinical Laboratory Scientist | Technologist | Author",
      achievement: "Phage Therapy enthusiast advancing medical laboratory science and published author",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1741280603621.jpeg?updatedAt=1748301421485",
      quote: "The scientific foundation I received here sparked my passion for laboratory medicine and innovative healthcare solutions.",
      linkedin: "https://www.linkedin.com/in/duahmb/",
      bookUrl: "https://phagesandbiomes.com/en/books"
    },
    {
      name: "Richard Arthur",
      class: "Class of 2012",
      profession: "Travel Expert Consultant",
      achievement: "Compound Overseer while in School",
      image: "https://ik.imagekit.io/edhumbling/WhatsApp%20Image%202025-06-06%20at%2011.24.11_78d69af3.png",
      quote: "Your brand is what other people say about you when you're not in the room.", // Jeff Bezos quote
      facebook: "https://www.facebook.com/share/12K96PfPxXf/"
    },
    {
      name: "Patricia Amankwaah",
      class: "Class of 2012",
      profession: "Registered Nurse",
      achievement: "Dedicated healthcare professional serving the community",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/124517551_835272210621815_5398303524100255322_n.jpg?updatedAt=1748301421385",
      quote: "The values of compassion and service I learned here guide my nursing practice every day."
    },
    {
      name: "Melody Amoabeng",
      class: "Class of 2011",
      profession: "Professional in the United Kingdom",
      achievement: "Successfully established career and life in the United Kingdom",
      image: "https://ik.imagekit.io/humbling/362242784_6497485583671328_249841871987614079_n.jpg",
      quote: "St. Louis Demo JHS gave me the foundation and confidence to pursue my dreams internationally."
    }
  ];

  // const availableYears = useMemo(() => { // To be removed
  //   const years = new Set<string>();
  //   featuredAlumni.forEach(alumni => {
  //     const yearMatch = alumni.class.match(/(\d{4})/);
  //     if (yearMatch) {
  //       years.add(yearMatch[0]);
  //     }
  //   });
  // }, []); // Removed availableYears calculation

  const filteredAlumni = useMemo(() => {
    // sliderYear is already a number due to useState<number>(1977) and parseInt in onChange
    return featuredAlumni.filter(alumni => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearchTerm = searchTermLower === '' ||
        alumni.name.toLowerCase().includes(searchTermLower) ||
        alumni.profession.toLowerCase().includes(searchTermLower) ||
        alumni.achievement.toLowerCase().includes(searchTermLower);

      const yearMatch = alumni.class.match(/(\d{4})/);
      const alumniGradYear = yearMatch ? parseInt(yearMatch[0], 10) : null;

      let matchesSliderYear = false; // Default to false, must explicitly match
      if (alumniGradYear !== null) {
        matchesSliderYear = alumniGradYear === sliderYear;
      }

      return matchesSearchTerm && matchesSliderYear;
    });
  }, [searchTerm, sliderYear, featuredAlumni]);

  const paginatedAlumni = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAlumni.slice(startIndex, endIndex);
  }, [filteredAlumni, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when the number of filtered items changes
  }, [filteredAlumni.length]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages > 0 ? totalPages : 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Optional: Handler for clicking a specific page number (not used with simple display)
  // const handleGoToPage = (pageNumber: number) => {
  //   setCurrentPage(Math.max(1, Math.min(pageNumber, totalPages)));
  // };

  const handleNextAlumni = () => {
    if (selectedAlumniIndex !== null && filteredAlumni.length > 0) {
      const nextIndex = (selectedAlumniIndex + 1) % filteredAlumni.length;
      setSelectedAlumniIndex(nextIndex);
    }
  };

  const handlePreviousAlumni = () => {
    if (selectedAlumniIndex !== null && filteredAlumni.length > 0) {
      const prevIndex = (selectedAlumniIndex - 1 + filteredAlumni.length) % filteredAlumni.length;
      setSelectedAlumniIndex(prevIndex);
    }
  };

  const alumniEvents = [
    {
      title: "Grand Voyeur Celebration",
      date: "December 2030",
      description: "A magnificent celebration marking our journey into the future.",
      type: "Future Milestone",
      year: "2030",
      targetDate: "2030-12-15T00:00:00Z"
    },
    {
      title: "Century Convergence",
      date: "June 2045",
      description: "Generations of alumni converge to share wisdom and innovation.",
      type: "Centennial Vision",
      year: "2045",
      targetDate: "2045-06-21T00:00:00Z"
    },
    {
      title: "Arrivals of Posterity",
      date: "September 2060",
      description: "Honoring future generations and our eternal legacy.",
      type: "Legacy Celebration",
      year: "2060",
      targetDate: "2060-09-10T00:00:00Z"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <SEOHead
        title="Alumni Network | Connect with Our Distinguished Graduates & Success Stories - St. Louis Demonstration JHS"
        description={`Alumni Network - Connect with the distinguished alumni network of St. Louis Demonstration JHS. Discover success stories from our ${schoolStats.totalStudentsFormatted} graduates who are making a difference across various professions and industries worldwide.`}
        keywords="alumni network, graduates, success stories, professional network, St. Louis Demo JHS alumni, career achievements, alumni database"
        url="/alumni"
        type="website"
        pageType="alumni"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Alumni
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section with School Background - Mobile-Friendly Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 text-white relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Alumni Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="w-full px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Alumni Community
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-100 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Celebrating {schoolStats.ageFormatted} years of excellence and the remarkable achievements of our {schoolStats.totalStudentsFormatted} graduates
            </p>
            <div className="flex flex-row flex-wrap gap-2 sm:gap-3 justify-center">
              <a
                href="#join"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 hover:bg-blue-700"
              >
                <Heart className="w-3 h-3 mr-1.5" />
                Join Network
              </a>
              <a
                href="#stories"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 text-white text-xs sm:text-sm font-semibold rounded-lg border border-gray-700 hover:bg-gray-700 transition-all duration-200"
              >
                Check Alumni Database
              </a>
              <a
                href="https://stlouisdemojhs-shop.fourthwall.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-indigo-800 text-white text-xs sm:text-sm font-semibold rounded-lg border border-indigo-700 hover:bg-indigo-700 transition-all duration-200"
              >
                <span className="text-xs mr-1.5">🛍️</span>
                Alumni Shop
              </a>
              <Link
                to="/sponsorship"
                className="inline-flex items-center justify-center px-3 py-1.5 sm:px-4 sm:py-2 bg-green-800 text-white text-xs sm:text-sm font-semibold rounded-lg border border-green-700 hover:bg-green-700 transition-all duration-200"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              >
                <Handshake size={14} className="mr-1.5" />
                Become a Sponsor
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Alumni Stats - Mobile-Friendly Dark Aero */}
      <section className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-30"
            shimmerClassName="w-full h-full opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>
        <div className="w-full px-3 sm:px-4 relative z-10">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
            {alumniStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-white/5 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-white mx-auto mb-2 sm:mb-3 shadow-lg`}>
                  <div className="scale-75 sm:scale-100">{stat.icon}</div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">{stat.number}</h3>
                <p className="text-gray-300 font-medium text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Featured Alumni - Mobile-Friendly Dark Aero */}
      <section id="stories" className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Alumni Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="w-full px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Alumni Database
            </h2>
            <p className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto">
              Meet some of our distinguished alumni who are making a difference in their communities and professions.
            </p>
          </motion.div>

          {/* Search and Filter Controls */}
          <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              placeholder="Search Alumni (Name, Profession, etc.)"
              className="w-full sm:flex-1 p-2 sm:p-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 text-xs sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* New Single Year Slider UI */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto sm:flex-1">
              <label htmlFor="yearSlider" className="text-xs text-gray-400 whitespace-nowrap">Slide to Select year:</label>
              <input
                type="range"
                id="yearSlider"
                min="1977"
                max="2030"
                value={sliderYear}
                onChange={(e) => setSliderYear(parseInt(e.target.value, 10))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 sm:flex-1 mx-2"
              />
              <span className="text-sm text-blue-400 font-medium w-12 text-center tabular-nums">
                {sliderYear}
              </span>
            </div>
          </div>

          {/* No Results Message */}
          {filteredAlumni.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-400 my-6 sm:my-8"
            >
              No alumni found matching your criteria.
            </motion.div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {paginatedAlumni.map((alumni, index) => (
              <motion.div
                key={alumni.name} // Assuming name is unique
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }} // Delay based on paginated index
                className="glass-card rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full flex items-center justify-center text-center cursor-pointer hover:border-blue-500"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  const originalIndex = (currentPage - 1) * itemsPerPage + index;
                  setSelectedAlumniIndex(originalIndex);

                  event.currentTarget.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest',
                  });

                  setTimeout(() => {
                    setIsModalOpen(true);
                  }, 150); // Adjusted timeout
                }}
                whileHover={{ y: -2, scale: 1.03, transition: { duration: 0.2 } }}
              >
                <h3 className="text-sm sm:text-base font-semibold text-white">
                  {alumni.name}
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 mb-4 flex items-center justify-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-gray-300">
                Page {currentPage} of {totalPages > 0 ? totalPages : 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Update Your Profile Section - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 max-w-3xl mx-auto"
          >
            <div className="glass-card rounded-lg p-4 sm:p-5 shadow-lg border border-blue-400/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-blue-300" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                  Update Alumni Profile
                </h3>
                <p className="text-gray-200 text-xs mb-3 leading-relaxed">
                  Keep your profile updated to connect with {alumniStats[2].number} alumni.
                </p>

                {/* CTA Buttons - Compact */}
                <div className="flex flex-col gap-1.5 justify-center">
                  <a
                    href="https://wa.me/233208705290?text=Hello,%20I'd%20like%20to%20update%20my%20alumni%20profile%20for%20St.%20Louis%20Demo%20JHS."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-all duration-200"
                  >
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654"/>
                    </svg>
                    WhatsApp
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = 'mailto:emma@stlouisdemojhs.com?subject=Update%20My%20Alumni%20Profile';
                    }}
                    className="inline-flex items-center justify-center px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded border border-white/20 transition-all duration-200"
                  >
                    <span className="mr-1">✉️</span> Email
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Alumni Events - Mobile-Friendly Dark Aero */}
      <section className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-20"
            shimmerClassName="w-full h-full opacity-20"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>
        <div className="w-full px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-6 sm:mb-8"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4">
              Alumni Events & Programs
            </h2>
            <p className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto">
              Stay connected with your alma mater through our various alumni programs and events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {alumniEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full flex flex-col"
              >
                <div className="flex items-center mb-3">
                  <span className="text-base sm:text-lg mr-2">📅</span>
                  <span className="text-xs font-semibold text-blue-400 bg-blue-900/30 px-2 py-1 rounded-full border border-blue-400/30">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 leading-tight">{event.title}</h3>
                <p className="text-gray-300 font-medium mb-2 text-xs sm:text-sm">{event.date}</p>
                <p className="text-gray-400 text-xs sm:text-sm mb-4 leading-relaxed flex-grow">{event.description}</p>
                <AppleTimer targetDate={event.targetDate} eventName={event.title} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Join Alumni Network - Mobile-Friendly Dark Aero */}
      <section id="join" className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Alumni Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="w-full px-3 sm:px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
              Join Our Alumni Network
            </h2>
            <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Stay connected with your fellow graduates and continue to be part of the St. Louis Demo JHS family.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="text-center p-4 sm:p-6 glass-card rounded-xl border border-white/20">
                <span className="text-2xl sm:text-3xl block mb-3 sm:mb-4">📧</span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">alumni@stlouisdemojhs.com</p>
                <p className="text-xs sm:text-sm text-gray-400">Send us your updated contact information</p>
              </div>
              <div className="text-center p-4 sm:p-6 glass-card rounded-xl border border-white/20">
                <span className="text-2xl sm:text-3xl block mb-3 sm:mb-4">📞</span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">Alumni Coordinator</h3>
                <p className="text-gray-300 mb-1 sm:mb-2 font-semibold text-sm sm:text-base">Emmanuel Humbling Dwamena</p>
                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">+233 20 870 5290</p>
                <p className="text-xs sm:text-sm text-gray-400">Speak with our alumni coordinator</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-all duration-200"
              >
                <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="https://www.facebook.com/stlouisdemojhs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-all duration-200"
              >
                <svg className="w-3 h-3 mr-1.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/contact');
                  // Only scroll to top for new page visits, not when returning
                  if (!sessionStorage.getItem(`scrollPosition_/contact`)) {
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }
                }}
                className="inline-flex items-center justify-center px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium rounded transition-all duration-200"
              >
                <Users className="w-3 h-3 mr-1.5" />
                Contact
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <AlumniDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alumnus={selectedAlumniIndex !== null ? filteredAlumni[selectedAlumniIndex] : null}
        onNext={handleNextAlumni}
        onPrevious={handlePreviousAlumni}
        hasNext={filteredAlumni.length > 1}
        hasPrevious={filteredAlumni.length > 1}
        // clickYPosition={modalYPosition} // Removed
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-black">
      {/* ... existing JSX for header, hero, stats, filters ... */}

      {/* Featured Alumni / Alumni Database Section */}
      <section id="stories" className="py-6 sm:py-8 md:py-12 relative overflow-hidden">
        {/* ... existing section content ... */}
        <div className="w-full px-3 sm:px-4 relative z-10">
          {/* ... existing title, description, search/filter controls ... */}

          {/* No Results Message */}
          {filteredAlumni.length === 0 && (searchTerm.trim() !== '' || String(minYear).trim() !== '' || String(maxYear).trim() !== '') && (
            <motion.div /* ... */ >
              No alumni found matching your criteria.
            </motion.div>
          )}

          {/* Alumni Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-7xl mx-auto">
            {paginatedAlumni.map((alumni, index) => (
              // ... alumni card motion.div ...
              <motion.div
                key={alumni.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="glass-card rounded-lg p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 h-full flex items-center justify-center text-center cursor-pointer hover:border-blue-500"
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  const originalIndex = (currentPage - 1) * itemsPerPage + index;
                  setSelectedAlumniIndex(originalIndex);
                  event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
                  setTimeout(() => { setIsModalOpen(true); }, 150);
                }}
                whileHover={{ y: -2, scale: 1.03, transition: { duration: 0.2 } }}
              >
                <h3 className="text-sm sm:text-base font-semibold text-white">{alumni.name}</h3>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-8 mb-4 flex items-center justify-center space-x-2">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-xs sm:text-sm text-gray-300">
                Page {currentPage} of {totalPages > 0 ? totalPages : 1}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages || totalPages === 0}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-lg border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}

          {/* Add Your Story Section - This was outside the pagination controls in original structure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 sm:mt-8 max-w-4xl mx-auto"
          >
            <div className="glass-card rounded-lg p-3 sm:p-4 shadow-lg border border-green-400/30 bg-green-500/10">
              {/* ... content of Add Your Story ... */}
               <div className="text-center">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">✨</span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                  Add Your Success Story
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm mb-3 leading-relaxed">
                  Share your achievements and inspire others. Contact Emmanuel via WhatsApp:
                  <span className="font-bold text-green-400 ml-1">0208705290</span>
                </p>
                <a
                  href="https://wa.me/233208705290?text=Hello%20Emmanuel,%20I%20would%20like%20to%20share%20my%20alumni%20success%20story%20for%20the%20St.%20Louis%20Demo%20JHS%20website."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-all duration-200"
                >
                  <svg className="w-3 h-3 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787"/>
                  </svg>
                  Share Story
                </a>
                <p className="text-gray-400 text-xs mt-2">
                  Goal: 100s of success stories!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ... other sections ... */}

      <AlumniDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alumnus={selectedAlumniIndex !== null ? filteredAlumni[selectedAlumniIndex] : null}
        onNext={handleNextAlumni}
        onPrevious={handlePreviousAlumni}
        hasNext={filteredAlumni.length > 1}
        hasPrevious={filteredAlumni.length > 1}
        // clickYPosition={modalYPosition} // Removed
      />
    </div>
  );
};

export default AlumniPage;
