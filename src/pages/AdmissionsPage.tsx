import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Users, CheckCircle, Clock, FileText, Award, Star, BookOpen, Target, Calendar, Phone, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';
import SEOHead from '../components/seo/SEOHead';

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

const AdmissionsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const admissionSteps = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Application Submission",
      description: "Complete and submit the official application form with required documents",
      details: ["Birth certificate", "Previous school records", "Passport photos", "Parent/guardian information"]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Entrance Assessment",
      description: "Students undergo comprehensive testing in core subjects",
      details: ["Mathematics assessment", "English language test", "General knowledge evaluation", "Basic science concepts"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Interview Process",
      description: "Personal interview with student and parent/guardian meeting",
      details: ["Student aptitude assessment", "Parent consultation", "School expectations discussion", "Academic goals alignment"]
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Admission Decision",
      description: "Review and notification of admission status",
      details: ["Academic performance review", "Assessment results evaluation", "Available space consideration", "Final admission letter"]
    }
  ];

  const uniqueFeatures = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Merit-Based Selection",
      description: "Despite being a government school, we maintain rigorous academic standards through comprehensive entrance assessments",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Excellence Track Record",
      description: "47+ years of consistent BECE excellence with 97%+ success rate, proving our commitment to quality education",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Holistic Development",
      description: "We assess not just academic ability but character, leadership potential, and commitment to learning",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Proven Alumni Success",
      description: "Our 30,000+ graduates excel in senior high schools and beyond, demonstrating our effective preparation",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Admissions | St. Louis Demonstration JHS"
        description="Join the St. Louis Demonstration JHS family! Learn about our admission process, requirements, application deadlines, and discover how to become part of Ghana's most prestigious junior high school community."
        keywords="admissions, application process, entrance exam, school admission, JHS admission Ghana, merit-based selection, academic assessment"
        url="/admissions"
        type="website"
        pageType="admissions"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Admissions
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section with School Background */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882"
            alt="St. Louis Demonstration JHS Students"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Green and Blue overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/85 via-green-700/80 to-blue-600/75"></div>
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Join Our Legacy of Excellence
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-6 sm:mb-8 leading-relaxed">
              Experience rigorous academic standards and holistic development at Ghana's premier demonstration school
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                onClick={() => {
                  navigate('/apply-now');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm sm:text-base font-bold rounded-lg sm:rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <FileText className="w-4 h-4 mr-2" />
                Apply Now
              </button>
              <a
                href="#admission-process"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-white/20 backdrop-blur-sm text-white text-sm sm:text-base font-bold rounded-lg sm:rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* What Makes Us Unique Section */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7126.HEIC?updatedAt=1748185717978"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-30"
            shimmerClassName="w-full h-full opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/40 via-green-700/50 to-blue-700/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.1),transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_70%)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Why Choose St. Louis Demonstration JHS?
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              As a government demonstration school, we combine accessibility with excellence,
              maintaining the highest academic standards while serving our community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {uniqueFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* Admission Process Section - Dark Aero */}
      <section id="admission-process" className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7113.HEIC?updatedAt=1748185722552"
            alt="St. Louis Demo JHS Students"
            className="w-full h-full object-cover opacity-20"
            shimmerClassName="w-full h-full opacity-20"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 via-black/60 to-blue-900/40"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              Our Admission Process
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              We follow a comprehensive and fair admission process designed to identify students
              who will thrive in our rigorous academic environment.
            </p>
          </motion.div>

          {/* Mobile-friendly 2-column layout */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto">
            {admissionSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center text-white mb-3 sm:mb-4 shadow-lg">
                  {step.icon}
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500/20 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-green-300 font-bold text-xs sm:text-sm">{index + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2 sm:mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{step.description}</p>
                <ul className="space-y-1 sm:space-y-2">
                  {step.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start text-xs sm:text-sm text-gray-400">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-400 rounded-full mr-2 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testing and Screening Details */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7113.HEIC?updatedAt=1748185722552"
            alt="St. Louis Demo JHS Students Learning"
            className="w-full h-full object-cover opacity-20"
            shimmerClassName="w-full h-full opacity-20"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
              Assessment & Screening Process
            </h2>
            <p className="text-lg text-gray-200 max-w-3xl mx-auto">
              Our comprehensive evaluation ensures we admit students who are ready to excel
              in our challenging academic environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Testing Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
            >
              <div className="flex items-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-400 mr-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Academic Testing</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Mathematics Assessment</h4>
                  <p className="text-gray-300 text-sm">Comprehensive evaluation of numerical skills, problem-solving abilities, and mathematical reasoning appropriate for junior high level.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">English Language Test</h4>
                  <p className="text-gray-300 text-sm">Assessment of reading comprehension, writing skills, grammar, and verbal communication abilities.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">General Knowledge</h4>
                  <p className="text-gray-300 text-sm">Evaluation of general awareness, critical thinking, and foundational knowledge across various subjects.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Science Concepts</h4>
                  <p className="text-gray-300 text-sm">Basic understanding of scientific principles, observation skills, and logical reasoning abilities.</p>
                </div>
              </div>
            </motion.div>

            {/* Screening Criteria */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20"
            >
              <div className="flex items-center mb-6">
                <Users className="w-8 h-8 text-green-400 mr-4" />
                <h3 className="text-xl sm:text-2xl font-bold text-white">Screening Criteria</h3>
              </div>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Academic Performance</h4>
                  <p className="text-gray-300 text-sm">Previous school records and assessment results demonstrating readiness for our rigorous curriculum.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Character Assessment</h4>
                  <p className="text-gray-300 text-sm">Evaluation of discipline, respect, responsibility, and alignment with our school values and expectations.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Learning Potential</h4>
                  <p className="text-gray-300 text-sm">Assessment of curiosity, motivation, and ability to thrive in our collaborative learning environment.</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Parent Commitment</h4>
                  <p className="text-gray-300 text-sm">Family support system and commitment to supporting the student's educational journey.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Admission Information and Contact - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7115.HEIC?updatedAt=1748185690882"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-20"
            shimmerClassName="w-full h-full opacity-20"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Admission Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 mr-3 sm:mr-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Admission Information</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Application Process</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Complete application details will be communicated through our official channels</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Assessment & Interview</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Comprehensive evaluation including testing and personal interviews</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Merit-Based Selection</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Fair and transparent selection based on academic potential and character</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Enrollment Support</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">Guidance and support throughout the admission and enrollment process</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20"
            >
              <div className="flex items-center mb-4 sm:mb-6">
                <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400 mr-3 sm:mr-4" />
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Admissions Contact</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Phone</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">📱 0244758575</p>
                    <p className="text-gray-300 text-xs sm:text-sm">📱 0244730726</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white text-sm sm:text-base">Email</h4>
                    <p className="text-gray-300 text-xs sm:text-sm">contact@stlouisdemojhs.com</p>
                  </div>
                </div>
                <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 sm:p-4 mt-4 sm:mt-6 border border-green-400/30">
                  <h4 className="font-semibold text-green-300 mb-2 text-sm sm:text-base">Ready to Apply?</h4>
                  <p className="text-green-200 text-xs sm:text-sm mb-3 sm:mb-4">Start your journey with us today. Our admissions team is here to guide you through the process.</p>
                  <button
                    onClick={() => {
                      navigate('/apply-now');
                      window.scrollTo({ top: 0, behavior: 'instant' });
                    }}
                    className="w-full inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-sm sm:text-base font-bold rounded-lg sm:rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsPage;
