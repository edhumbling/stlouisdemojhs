import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, GraduationCap, Heart, Award, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

// Beautiful Ticking Clock Component
const TickingClock: React.FC<{ targetDate: string; eventName: string }> = ({ targetDate, eventName }) => {
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
    { label: 'Years', value: timeLeft.years },
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="mt-4 p-4 bg-black/40 backdrop-blur-sm rounded-lg border border-gray-600/50">
      <div className="flex items-center justify-center mb-3">
        <Clock className="w-4 h-4 text-gray-300 mr-2" />
        <span className="text-xs font-medium text-gray-300 uppercase tracking-wide">Strategic Timer</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            className="text-center p-2 bg-gray-800/60 border border-gray-600/40 rounded-md"
            animate={{
              borderColor: unit.label === 'Seconds' ? ['rgba(156, 163, 175, 0.4)', 'rgba(156, 163, 175, 0.8)', 'rgba(156, 163, 175, 0.4)'] : 'rgba(156, 163, 175, 0.4)'
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="text-white font-mono font-bold text-xs sm:text-sm">
              {unit.value.toString().padStart(2, '0')}
            </div>
            <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">
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

  const alumniStats = [
    { icon: <GraduationCap className="w-8 h-8" />, number: "30,000+", label: "Graduates", color: "from-blue-500 to-cyan-500" },
    { icon: <span className="text-2xl">📅</span>, number: "47+", label: "Years of Excellence", color: "from-green-500 to-emerald-500" },
    { icon: <Users className="w-8 h-8" />, number: "10,000+", label: "Active Alumni", color: "from-purple-500 to-pink-500" },
    { icon: <Award className="w-8 h-8" />, number: "100+", label: "Success Stories", color: "from-orange-500 to-red-500" }
  ];

  const featuredAlumni = [
    {
      name: "Emmanuel H. Dwamena",
      class: "Class of 2012",
      profession: "Founder of AIDEL",
      achievement: "Tech entrepreneur and innovator in educational technology",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1718218562009.jpeg?updatedAt=1748301421227",
      quote: "St. Louis Demo JHS instilled in me the entrepreneurial spirit and problem-solving mindset that led to founding AIDEL.",
      linkedin: "https://www.linkedin.com/in/edhumbling/"
    },
    {
      name: "Michael Boateng Duah, MS, MLS(ASCPi)CM",
      class: "Class of 2012",
      profession: "Clinical Laboratory Scientist | Technologist",
      achievement: "Phage Therapy enthusiast advancing medical laboratory science",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1741280603621.jpeg?updatedAt=1748301421485",
      quote: "The scientific foundation I received here sparked my passion for laboratory medicine and innovative healthcare solutions.",
      linkedin: "https://www.linkedin.com/in/duahmb/"
    },
    {
      name: "Patricia Amankwaah",
      class: "Class of 2012",
      profession: "Registered Nurse",
      achievement: "Dedicated healthcare professional serving the community",
      image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/124517551_835272210621815_5398303524100255322_n.jpg?updatedAt=1748301421385",
      quote: "The values of compassion and service I learned here guide my nursing practice every day."
    }
  ];

  const alumniEvents = [
    {
      title: "Grand Voyeur Celebration",
      date: "December 15, 2030",
      description: "A magnificent celebration marking our journey into the future, where past achievements meet tomorrow's possibilities. Join us as we witness the grand tapestry of our alumni legacy unfold.",
      type: "Future Milestone",
      targetDate: "2030-12-15T00:00:00Z",
      isCountdown: true
    },
    {
      title: "The Century Convergence Celebration",
      date: "June 21, 2045",
      description: "A once-in-a-lifetime gathering celebrating our centennial approach, where generations of alumni converge to share wisdom, innovation, and the enduring spirit of St. Louis Demo JHS.",
      type: "Centennial Vision",
      targetDate: "2045-06-21T00:00:00Z",
      isCountdown: true
    },
    {
      title: "The Arrivals of Posterity Celebration",
      date: "September 10, 2060",
      description: "A visionary celebration honoring the arrival of future generations and the eternal legacy we leave behind. Witness the culmination of decades of educational excellence and alumni achievements.",
      type: "Legacy Celebration",
      targetDate: "2060-09-10T00:00:00Z",
      isCountdown: true
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Native Back Button - Apple Design */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white/20 text-white hover:bg-black/30 transition-all duration-200 shadow-lg"
          style={{ backdropFilter: 'blur(20px)' }}
        >
          <ArrowLeft size={18} />
        </button>
      </div>

      {/* Hero Section with School Background - Dark Aero */}
      <section className="py-12 sm:py-16 md:py-20 text-white relative overflow-hidden">
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Alumni Community
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Celebrating 47+ years of excellence and the remarkable achievements of our 30,000+ graduates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#join"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-5 h-5 mr-2" />
                Join Alumni Network
              </a>
              <a
                href="#stories"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Read Success Stories
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Alumni Stats - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {alumniStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">{stat.number}</h3>
                <p className="text-gray-300 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Featured Alumni - Dark Aero */}
      <section id="stories" className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Success Stories
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Meet some of our distinguished alumni who are making a difference in their communities and professions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredAlumni.map((alumni, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4">
                  <OptimizedImage
                    src={alumni.image}
                    alt={alumni.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">{alumni.name}</h3>
                <p className="text-blue-400 font-semibold mb-2 text-center">{alumni.class}</p>
                <p className="text-gray-300 font-medium mb-3 text-center">{alumni.profession}</p>
                <p className="text-gray-400 text-sm mb-4 text-center">{alumni.achievement}</p>
                <blockquote className="text-gray-300 text-sm italic text-center border-l-4 border-blue-500 pl-4 mb-4">
                  "{alumni.quote}"
                </blockquote>
                {alumni.linkedin && (
                  <div className="text-center">
                    <a
                      href={alumni.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="mr-2">💼</span>
                      LinkedIn Profile
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Alumni Events - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Alumni Events & Programs
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Stay connected with your alma mater through our various alumni programs and events.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {alumniEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  <span className="text-xl mr-3">📅</span>
                  <span className="text-sm font-semibold text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full border border-blue-400/30">
                    {event.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                <p className="text-gray-300 font-medium mb-3">{event.date}</p>
                <p className="text-gray-400 text-sm mb-4">{event.description}</p>
                {event.isCountdown && event.targetDate && (
                  <TickingClock targetDate={event.targetDate} eventName={event.title} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Join Alumni Network - Dark Aero */}
      <section id="join" className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
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
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
              Join Our Alumni Network
            </h2>
            <p className="text-lg text-gray-200 mb-8 max-w-3xl mx-auto">
              Stay connected with your fellow graduates and continue to be part of the St. Louis Demo JHS family.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="text-center p-6 glass-card rounded-2xl border border-white/20">
                <span className="text-3xl block mb-4">📧</span>
                <h3 className="text-lg font-bold text-white mb-2">Email Us</h3>
                <p className="text-gray-300 mb-4">alumni@stlouisdemojhs.com</p>
                <p className="text-sm text-gray-400">Send us your updated contact information</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl border border-white/20">
                <span className="text-3xl block mb-4">📞</span>
                <h3 className="text-lg font-bold text-white mb-2">Alumni Coordinator</h3>
                <p className="text-gray-300 mb-2 font-semibold">Emmanuel Humbling Dwamena</p>
                <p className="text-gray-300 mb-4">+233 20 870 5290</p>
                <p className="text-sm text-gray-400">Speak with our alumni coordinator</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://whatsapp.com/channel/0029VbBO7RD7IUYZjOnapG3q"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2 text-xl">📱</span>
                Follow WhatsApp Channel
              </a>
              <a
                href="/contact"
                onClick={() => {
                  navigate('/contact');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Users className="w-5 h-5 mr-2" />
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AlumniPage;
