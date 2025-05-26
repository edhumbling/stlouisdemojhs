import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, GraduationCap, Heart, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

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
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Active Alumni", color: "from-purple-500 to-pink-500" },
    { icon: <Award className="w-8 h-8" />, number: "100+", label: "Success Stories", color: "from-orange-500 to-red-500" }
  ];

  const featuredAlumni = [
    {
      name: "Dr. Kwame Asante",
      class: "Class of 1995",
      profession: "Medical Doctor & Surgeon",
      achievement: "Leading cardiovascular surgeon at Korle-Bu Teaching Hospital",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quote: "St. Louis Demo JHS gave me the foundation for academic excellence and moral values that shaped my career."
    },
    {
      name: "Akosua Mensah",
      class: "Class of 2000",
      profession: "Software Engineer & Tech Entrepreneur",
      achievement: "Founder of successful fintech startup in Accra",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quote: "The critical thinking skills I developed here helped me innovate in the tech industry."
    },
    {
      name: "Emmanuel Osei",
      class: "Class of 1988",
      profession: "Educational Administrator",
      achievement: "Director of Education, Ashanti Region",
      image: "https://images.pexels.com/photos/8422419/pexels-photo-8422419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      quote: "I'm proud to give back to education, inspired by the excellent teachers who mentored me."
    }
  ];

  const alumniEvents = [
    {
      title: "Annual Alumni Homecoming",
      date: "December 15, 2025",
      description: "Reconnect with classmates and celebrate our shared heritage",
      type: "Reunion"
    },
    {
      title: "Career Mentorship Program",
      date: "Ongoing",
      description: "Alumni mentor current students in various career paths",
      type: "Mentorship"
    },
    {
      title: "Alumni Achievement Awards",
      date: "March 2026",
      description: "Recognizing outstanding alumni contributions to society",
      type: "Awards"
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
                <blockquote className="text-gray-300 text-sm italic text-center border-l-4 border-blue-500 pl-4">
                  "{alumni.quote}"
                </blockquote>
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
                <p className="text-gray-400 text-sm">{event.description}</p>
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
                <p className="text-gray-300 mb-4">contact@stlouisdemojhs.com</p>
                <p className="text-sm text-gray-400">Send us your updated contact information</p>
              </div>
              <div className="text-center p-6 glass-card rounded-2xl border border-white/20">
                <span className="text-3xl block mb-4">📞</span>
                <h3 className="text-lg font-bold text-white mb-2">Call Us</h3>
                <p className="text-gray-300 mb-4">+233 XX XXX XXXX</p>
                <p className="text-sm text-gray-400">Speak with our alumni coordinator</p>
              </div>
            </div>

            <a
              href="/contact"
              onClick={() => {
                navigate('/contact');
                window.scrollTo({ top: 0, behavior: 'instant' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Users className="w-5 h-5 mr-2" />
              Connect With Us Today
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AlumniPage;
