import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Target, BookOpen, ArrowLeft } from 'lucide-react';
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

// Video Embed Component with Shimmer Loading
const VideoEmbed: React.FC<{
  videoId?: string;
  facebookVideoId?: string;
  title: string;
  className?: string;
}> = ({ videoId, facebookVideoId, title, className }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && (
        <ShimmerLoader className={className} />
      )}
      {videoId ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1`}
          title={title}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      ) : facebookVideoId ? (
        <iframe
          src={`https://www.facebook.com/plugins/video.php?height=200&href=https%3A%2F%2Fwww.facebook.com%2Fwatch%2F%3Fv%3D${facebookVideoId}&show_text=false&width=400&t=0`}
          title={title}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ border: 'none' }}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
    </div>
  );
};

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

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="About Us | St. Louis Demonstration JHS"
        description="Learn about St. Louis Demonstration Junior High School - our rich history since 1977, educational mission, core values, and unwavering commitment to providing quality junior high school education that shapes future leaders in Ghana."
        keywords="about St. Louis Demonstration JHS, school history, mission vision values, educational philosophy, Ghana JHS, school leadership, academic excellence"
        url="/about"
        type="website"
        pageType="about"
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

            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              About Our School
            </h1>
          </div>
        </div>
      </div>

      {/* Compact Hero Section with School Image */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* School Gate Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/9008070f-6dc0-47b7-a52d-5ef4670a8396.jpg"
            alt="St. Louis Demonstration JHS School Gate"
            className="w-full h-full object-cover"
          />
          {/* Blue and Yellow overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/85 via-blue-700/80 to-yellow-600/75"></div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-white"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}
            >
              🏫 About St. Louis Demonstration JHS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-gray-100 max-w-3xl mx-auto"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
            >
              Discover our journey, mission, and vision as we build towards becoming a world-class educational institution.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* History Section - Dark Aero with School Background */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          {/* Large Prominent Zoomable School Image - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <div className="group relative max-w-4xl mx-auto">
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-green-500/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/20 group-hover:scale-105 transition-all duration-500 cursor-zoom-in backdrop-blur-sm">
                <OptimizedImage
                  src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.png?updatedAt=1748272090100&tr=w-800,h-600,q-80"
                  alt="St. Louis Demonstration JHS - Our School Community"
                  className="w-full h-auto group-hover:scale-110 transition-transform duration-700"
                  onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/afffabd4-9771-46d5-b98a-a0adf6a5a3d0.png?updatedAt=1748272090100', '_blank')}
                  shimmerClassName="w-full h-64 sm:h-80 md:h-96"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm font-medium backdrop-blur-sm bg-black/50 rounded-lg px-3 py-2">Click to view full image</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Comprehensive History Essay - Under Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-white text-xl">📚</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Our Remarkable Journey Since 1977
              </h2>
            </div>

            {/* Comprehensive Essay Style History - Edge to Edge */}
            <div className="w-full px-4 sm:px-8 md:px-12">
              <div className="prose prose-invert max-w-none">
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  <strong>St. Louis Demonstration Junior High School</strong> stands as a beacon of educational excellence in Kumasi, Ghana, with a rich history spanning over four decades. Established in 1977 as an integral part of the prestigious St. Louis Demonstration J.H.S, our institution was founded on the principles of academic rigor, moral uprightness, and spiritual grounding that continue to guide us today.
                </p>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  The early years of our school were marked by modest beginnings but an unwavering commitment to providing quality education rooted in Catholic values. Our founders envisioned an institution that would not merely impart knowledge but would shape character, instill discipline, and nurture the holistic development of young minds. This vision became the cornerstone upon which our educational philosophy was built.
                </p>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  The 1990s brought significant challenges as Ghana navigated through economic difficulties that affected educational institutions nationwide. Limited resources, infrastructure constraints, and the pressure to maintain academic standards while serving a growing student population tested our resilience. However, these challenges only strengthened our resolve and fostered the development of core values that define us today: perseverance, community spirit, and an unwavering commitment to academic excellence.
                </p>

              </div>

              {/* Mad. Millicent Otoo - Extensive Section with Images - Fully Edge to Edge */}
              <div className="w-screen bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-sm border-y border-white/20 py-6 sm:py-8 mb-6 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <div className="max-w-none px-4 sm:px-8 md:px-12">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                      <span className="text-white text-lg">👑</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-yellow-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                      Mad. Millicent Otoo - A Transformational Leader
                    </h3>
                  </div>

                  {/* Beautiful Image Gallery of Mad. Millicent Otoo - Mobile: 2 rows, Desktop: 2 rows */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
                    {/* Row 1 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
                      onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/462355557_8436163679826973_7122605708168266593_n.jpg?updatedAt=1749924917637', '_blank')}
                    >
                      <OptimizedImage
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/462355557_8436163679826973_7122605708168266593_n.jpg?updatedAt=1749924917637&tr=w-400,h-300,q-80"
                        alt="Mad. Millicent Otoo - Former Headmistress"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        shimmerClassName="w-full h-full"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
                      onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/493611096_9703467799744043_7040316249254217980_n.jpg?updatedAt=1749924917369', '_blank')}
                    >
                      <OptimizedImage
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/493611096_9703467799744043_7040316249254217980_n.jpg?updatedAt=1749924917369&tr=w-400,h-300,q-80"
                        alt="Mad. Millicent Otoo - Leadership Excellence"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        shimmerClassName="w-full h-full"
                      />
                    </motion.div>

                    {/* Row 2 */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
                      onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/493210072_9703467779744045_5818101436559563126_n.jpg?updatedAt=1749924917433', '_blank')}
                    >
                      <OptimizedImage
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/493210072_9703467779744045_5818101436559563126_n.jpg?updatedAt=1749924917433&tr=w-400,h-300,q-80"
                        alt="Mad. Millicent Otoo - Educational Vision"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        shimmerClassName="w-full h-full"
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3]"
                      onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/452931296_7956095171147990_6455496529918644651_n.jpg?updatedAt=1749924916599', '_blank')}
                    >
                      <OptimizedImage
                        src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/452931296_7956095171147990_6455496529918644651_n.jpg?updatedAt=1749924916599&tr=w-400,h-300,q-80"
                        alt="Mad. Millicent Otoo - Parade Cadet Leadership"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        shimmerClassName="w-full h-full"
                      />
                    </motion.div>
                  </div>

                  {/* Extensive Biography */}
                  <div className="space-y-4">
                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      A pivotal and transformational chapter in our school's illustrious history was written under the visionary leadership of <strong className="text-yellow-300">Mad. Millicent Otoo</strong>, our beloved former headmistress whose extraordinary dedication and innovative approach elevated St. Louis Demonstration JHS to unprecedented heights of academic excellence and moral distinction. Her tenure represents one of the most significant periods of growth and development in our institution's proud heritage.
                    </p>

                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      <strong className="text-blue-300">Mad. Millicent Otoo</strong> brought to St. Louis Demonstration JHS a rare combination of educational expertise, administrative acumen, and genuine care for student welfare that transformed not just academic outcomes, but the entire culture and ethos of our school community. Her innovative educational methodologies, unwavering emphasis on discipline, and deep commitment to holistic student development established new benchmarks for excellence that continue to guide our institution today.
                    </p>

                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      Under her transformational leadership, the school witnessed remarkable improvements in academic performance, with BECE pass rates reaching new heights and students consistently excelling in various academic competitions. <strong className="text-green-300">Mad. Otoo's</strong> vision extended far beyond mere academic achievement; she understood that true education must nurture the whole person - intellectually, morally, socially, and spiritually.
                    </p>

                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      Her tenure was characterized by significant infrastructure development and the establishment of programs that nurtured both intellectual curiosity and character formation. She introduced innovative teaching methods, modernized the curriculum to meet contemporary educational standards, and created an environment where both students and teachers could thrive and reach their full potential.
                    </p>

                    <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      <strong className="text-purple-300">Mad. Millicent Otoo's</strong> legacy lives on in the countless lives she touched, the educational standards she established, and the culture of excellence she fostered. Her contributions to St. Louis Demonstration JHS extend far beyond her years of service, having laid the foundation for the continued success and growth that our school enjoys today. She remains an inspiration to current and future generations of educators, students, and the entire school community.
                    </p>

                    {/* Authentic Historical Journey */}
                    <div className="mt-8 space-y-6">
                      <div className="flex items-center mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3 shadow-lg">
                          <span className="text-white text-lg">📚</span>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-yellow-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          Our Continuing Journey of Excellence
                        </h4>
                      </div>

                      {/* Authentic School Development */}
                      <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-lg border border-blue-300/30 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-blue-300 mb-3 flex items-center">
                          <span className="mr-2">🏫</span>
                          Decades of Educational Excellence
                        </h5>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Since our establishment in 1977, St. Louis Demonstration JHS has grown from a small educational institution to one of the most respected junior high schools in the Ashanti Region. Our journey has been marked by continuous improvement in academic standards, infrastructure development, and the unwavering commitment of our educational community to provide quality education that shapes future leaders.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Throughout the decades, our school has adapted to changing educational needs while maintaining our core values of academic excellence, moral uprightness, and spiritual grounding. We have witnessed the transformation of education in Ghana and have consistently positioned ourselves at the forefront of educational innovation and best practices.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Our commitment to holistic education has resulted in the development of well-rounded students who excel not only academically but also in character formation, leadership skills, and community service. This comprehensive approach to education has earned us recognition and respect within the educational community and beyond.
                        </p>
                      </div>

                      {/* Infrastructure and Facilities Development */}
                      <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 backdrop-blur-sm rounded-lg border border-green-300/30 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-green-300 mb-3 flex items-center">
                          <span className="mr-2">🏗️</span>
                          Infrastructure Development and Modern Facilities
                        </h5>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Over the years, significant investments have been made in developing our physical infrastructure to create an environment conducive to learning and personal development. Our modern classrooms, well-equipped laboratories, library facilities, and recreational areas provide students with the resources they need to excel in their academic pursuits.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          The continuous improvement of our facilities reflects our commitment to providing quality education that meets international standards. From basic classroom amenities to advanced technological resources, we strive to ensure that our students have access to the tools and environments that support effective learning and skill development.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Our infrastructure development has been made possible through the generous support of various stakeholders, including government agencies, community partners, alumni, and dedicated individuals who believe in our mission of educational excellence. These contributions have enabled us to create a learning environment that inspires and motivates both students and teachers.
                        </p>
                      </div>

                      {/* Academic Excellence and Achievements */}
                      <div className="bg-gradient-to-r from-purple-900/20 to-indigo-900/20 backdrop-blur-sm rounded-lg border border-purple-300/30 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-purple-300 mb-3 flex items-center">
                          <span className="mr-2">🏆</span>
                          Academic Excellence and Student Achievements
                        </h5>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Our commitment to academic excellence has consistently yielded outstanding results in national examinations and various academic competitions. Our students regularly achieve high pass rates in the Basic Education Certificate Examination (BECE), with many gaining admission to prestigious senior high schools across Ghana.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Beyond examination success, our students have distinguished themselves in various academic competitions, science fairs, debate contests, and cultural events at both regional and national levels. These achievements reflect the quality of education we provide and the dedication of our teaching staff to nurturing student talents and abilities.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Our alumni continue to make significant contributions to society in various fields, including education, healthcare, business, technology, and public service. Their success stories serve as inspiration to current students and testament to the quality of education and character formation they received at our institution.
                        </p>
                      </div>

                      {/* Community Partnership and Support */}
                      <div className="bg-gradient-to-r from-teal-900/20 to-cyan-900/20 backdrop-blur-sm rounded-lg border border-teal-300/30 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-teal-300 mb-3 flex items-center">
                          <span className="mr-2">🤝</span>
                          Community Partnership and Stakeholder Support
                        </h5>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          The success of St. Louis Demonstration JHS has been greatly enhanced by the strong partnerships we have built with various stakeholders in the community. Our Parent-Teacher Association, alumni network, local businesses, religious organizations, and government agencies have all played crucial roles in supporting our educational mission.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          These partnerships have facilitated resource mobilization, infrastructure development, scholarship programs, and various educational initiatives that have benefited our students and the broader school community. The collaborative approach to education has created a supportive environment where students can thrive and reach their full potential.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          We remain committed to strengthening these partnerships and building new relationships that will continue to enhance the quality of education we provide. Our open-door policy and transparent communication ensure that all stakeholders remain engaged and informed about our progress and future plans.
                        </p>
                      </div>

                      {/* Gratitude and Future Vision */}
                      <div className="bg-gradient-to-r from-amber-900/20 to-orange-900/20 backdrop-blur-sm rounded-lg border border-amber-300/30 p-4 sm:p-5">
                        <h5 className="text-base sm:text-lg font-bold text-amber-300 mb-3 flex items-center">
                          <span className="mr-2">🙏</span>
                          Gratitude and Future Vision
                        </h5>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          As we reflect on our journey since 1977, we are filled with gratitude for all who have contributed to our success. From our founding leaders to our current administration, from our dedicated teaching staff to our supportive parents and community members, each person has played a vital role in shaping our institution.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          We honor the memory of those who have passed on, celebrate the contributions of those who have retired, and appreciate the ongoing dedication of our current staff and stakeholders. Their collective efforts have created the strong foundation upon which we continue to build our educational excellence.
                        </p>
                        <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                          Looking toward the future, we remain committed to our mission of providing quality education that prepares students for success in an ever-changing world. We will continue to adapt, innovate, and excel while maintaining the core values and traditions that have made St. Louis Demonstration JHS a beacon of educational excellence in Ghana.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Mr. Atta Sarpong - PTA Chairman Section - Fully Edge to Edge */}
              <div className="w-screen bg-gradient-to-r from-green-900/30 to-blue-900/30 backdrop-blur-sm border-y border-white/20 py-6 sm:py-8 mb-6 relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
                <div className="max-w-none px-4 sm:px-8 md:px-12">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex-shrink-0"
                    >
                      <div
                        className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-32 sm:w-40"
                        onClick={() => window.open('https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/464417336_8436163229827018_5770202680327083225_n.jpg?updatedAt=1749924917637', '_blank')}
                      >
                        <OptimizedImage
                          src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/464417336_8436163229827018_5770202680327083225_n.jpg?updatedAt=1749924917637&tr=w-300,h-400,q-80"
                          alt="Mr. Atta Sarpong - Former PTA Chairman and Infrastructure Development"
                          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                          shimmerClassName="w-full h-40 sm:h-48"
                        />
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-2 shadow-lg">
                          <span className="text-white text-sm">🏗️</span>
                        </div>
                        <h4 className="text-base sm:text-lg font-bold text-orange-300" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                          Mr. Atta Sarpong - Infrastructure Development Champion
                        </h4>
                      </div>
                      <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                        <strong className="text-yellow-300">Mr. Atta Sarpong</strong>, our dedicated former PTA Chairman, played a crucial role in the physical development of our school infrastructure. His visionary leadership and commitment to providing quality learning environments resulted in significant building projects that enhanced our educational facilities. The structures he helped establish continue to serve our students today, standing as lasting monuments to his dedication to educational excellence and community service.
                      </p>
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed mb-4" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Today, under the capable leadership of <strong>Mrs. Michelle Acquaye</strong>, our current headmistress, we continue to build upon this solid foundation while adapting to the demands of modern education and global standards. Mrs. Acquaye has successfully integrated contemporary teaching methodologies with our time-tested values, ensuring that our students are well-prepared for the challenges of the 21st century.
                </p>

                <p className="text-sm sm:text-base text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  With over <strong>30,000 graduates</strong> who have gone on to make significant contributions to society and <strong>800+ current students</strong> who embody our motto <em>"Primus Interparis"</em> (The Best Among the Rest), St. Louis Demonstration JHS stands as a testament to the power of vision, dedication, and community support in shaping educational excellence. Our journey from humble beginnings to becoming a recognized institution of learning reflects our unwavering commitment to developing critical thinking, creativity, collaboration, and character among our learners.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Mission, Vision & Values Section - Compact Dark Aero */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Campus Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 sm:mb-6"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <Target size={16} className="text-white" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Our Purpose & Values
              </h2>
            </div>
            <p className="text-sm text-gray-200 max-w-xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Guiding principles that shape our educational approach.
            </p>
          </motion.div>

          {/* Compact 3-Column Layout */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto">

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-xl p-3 sm:p-4 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center text-lg sm:text-xl mx-auto mb-2 shadow-lg">
                    🎯
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Our Mission</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  Quality education through GES curriculum, developing critical thinking and character for BECE success.
                </p>
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-xl p-3 sm:p-4 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center text-lg sm:text-xl mx-auto mb-2 shadow-lg">
                    🌟
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Our Vision</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed text-center" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  World-class institution producing globally competitive, morally upright leaders for Ghana's development.
                </p>
              </div>
            </motion.div>

            {/* Core Values Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              <div className="glass-dark rounded-xl p-3 sm:p-4 shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full">
                <div className="text-center mb-2 sm:mb-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center text-lg sm:text-xl mx-auto mb-2 shadow-lg">
                    💎
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>Core Values</h3>
                </div>
                <div className="space-y-1 sm:space-y-2">
                  {[
                    { icon: "🤝", value: "Unity" },
                    { icon: "🏆", value: "Excellence" },
                    { icon: "⚖️", value: "Integrity" },
                    { icon: "🌱", value: "Growth" },
                    { icon: "❤️", value: "Service" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm flex-shrink-0">{item.icon}</span>
                      <div className="text-xs sm:text-sm font-semibold text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* St. Louis in the News Section - Compact Dark Aero Apple Design */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* Dark Aero Background with Media Colors */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black/40 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(239,68,68,0.1),transparent_60%),radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.1),transparent_60%)]"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4 sm:mb-6"
          >
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                  <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V9a1 1 0 00-1-1h-1v-1z" />
                </svg>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                St. Louis in the News
              </h2>
            </div>
            <p className="text-sm text-gray-200 max-w-xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Historical media coverage showcasing our journey and achievements.
            </p>
          </motion.div>

          {/* News Grid - Apple Style Dark Aero with YouTube Embeds & Previews */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-w-5xl mx-auto">
            {[
              {
                title: "NAPO donates educational materials to St. Louis College, all basic schools in Manhyia South",
                source: "TNT Newspaper Ghana",
                date: "Recent",
                description: "Manhyia South MP Dr. Matthew Opoku Prempeh donates educational materials to support learning at St. Louis and other basic schools.",
                url: "https://tntnewspapergh.com/napo-donates-educational-materials-to-st-louis-college-all-basic-schools-in-manhyia-south/",
                type: "article",
                preview: "https://tntnewspapergh.com/napo-donates-educational-materials-to-st-louis-college-all-basic-schools-in-manhyia-south/",
                brandColor: "from-green-500 to-green-600"
              },
              {
                title: "Manhyia South MP donates to St. Louis College, 47 basic schools",
                source: "Ghana Headlines",
                date: "January 2024",
                description: "Educational support initiative by Manhyia South MP benefiting St. Louis College and 47 basic schools in the constituency.",
                url: "https://news.ghheadlines.com/agency/ghanaian-chronicle/20240122/164446971/manhyia-south-mp-donates-tost-louis-college-47-basic-schools",
                type: "article",
                preview: "https://news.ghheadlines.com/agency/ghanaian-chronicle/20240122/164446971/manhyia-south-mp-donates-tost-louis-college-47-basic-schools",
                brandColor: "from-purple-500 to-purple-600"
              },
              {
                title: "Make classroom lively & pupil-friendly",
                source: "GhanaWeb",
                date: "Historical",
                description: "Educational insights for engaging learning environments.",
                url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Make-the-classroom-lively-and-pupil-friendly-330489",
                type: "article",
                preview: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Make-the-classroom-lively-and-pupil-friendly-330489",
                brandColor: "from-blue-500 to-blue-600"
              },
              {
                title: "St. Louis JHS lacks infrastructural facilities",
                source: "GhanaWeb",
                date: "Historical",
                description: "Infrastructure challenges and improvement commitment.",
                url: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/St-Louis-JHS-lacks-infrastructural-facilities-Headmistress-241061",
                type: "article",
                preview: "https://www.ghanaweb.com/GhanaHomePage/NewsArchive/St-Louis-JHS-lacks-infrastructural-facilities-Headmistress-241061",
                brandColor: "from-blue-500 to-blue-600"
              },
              {
                title: "St. Louis Demonstration J.H.S - Facebook",
                source: "Facebook",
                date: "Social Media",
                description: "Community engagement and school activities showcase.",
                url: "https://www.facebook.com/watch/?v=4921581154635610",
                type: "video",
                facebookVideoId: "4921581154635610",
                brandColor: "from-blue-600 to-blue-700"
              },
              {
                title: "School Activities & Community",
                source: "YouTube",
                date: "Video Doc",
                description: "School events and community involvement initiatives.",
                url: "https://www.youtube.com/watch?v=c90tOBl5K6g",
                type: "video",
                videoId: "c90tOBl5K6g",
                brandColor: "from-red-500 to-red-600"
              },
              {
                title: "Educational Programs & Student Life",
                source: "YouTube",
                date: "Featured Video",
                description: "Comprehensive look at educational programs and student life.",
                url: "https://www.youtube.com/watch?v=vMUVyKTTFZA",
                type: "video",
                videoId: "vMUVyKTTFZA",
                brandColor: "from-red-500 to-red-600"
              }
            ].map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -2, scale: 1.01, transition: { duration: 0.2 } }}
              >
                <div className="glass-dark rounded-xl overflow-hidden shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300 h-full">
                  {/* Optimized Video Embed or Article Preview */}
                  <div className="relative h-24 sm:h-32 md:h-36 overflow-hidden">
                    {news.type === 'video' && (news.videoId || news.facebookVideoId) ? (
                      <VideoEmbed
                        videoId={news.videoId}
                        facebookVideoId={news.facebookVideoId}
                        title={news.title}
                        className="w-full h-full"
                      />
                    ) : (
                      // Article Preview with shimmer loading
                      <div className="relative w-full h-full">
                        <ShimmerLoader className="w-full h-full" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-blue-500/80 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-blue-500/90 transition-colors duration-200">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Source Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs font-bold shadow-lg backdrop-blur-sm ${
                      news.type === 'video' ? 'bg-red-500/90 text-white' : 'bg-blue-500/90 text-white'
                    }`}>
                      {news.type === 'video' ? '▶️ Video' : '📰 Article'}
                    </div>

                    {/* Platform Logo */}
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center text-base shadow-lg">
                      {news.source === 'YouTube' ? '🎥' : news.source === 'Facebook' ? '📘' : '📰'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-blue-300 truncate">{news.source}</span>
                      <span className="text-xs text-gray-400">{news.date}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-sm sm:text-base font-bold text-white mb-2 leading-tight line-clamp-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {news.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3 line-clamp-2">
                      {news.description}
                    </p>

                    {/* Action Button */}
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center font-semibold text-sm transition-colors duration-200 ${
                        news.type === 'video' ? 'text-red-400 hover:text-red-300' : 'text-blue-400 hover:text-blue-300'
                      }`}
                    >
                      <span>{news.type === 'video' ? 'Watch on YouTube' : 'Read Full Article'}</span>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Current Facilities & Development Needs Section - Compact Dark Aero */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* Optimized Subtle School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Facilities Background"
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
            className="text-center mb-8 sm:mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <BookOpen size={20} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Our Facilities & Development Vision
              </h2>
            </div>
            <p className="text-sm sm:text-base text-gray-200 max-w-3xl mx-auto" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
              Building towards a modern educational environment that prepares our students for the global digital age.
            </p>
          </motion.div>

          {/* Current Facilities Grid - Mobile 2-Column, Desktop 3-Column */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
            {[
              {
                title: 'Classrooms',
                description: 'Traditional classrooms serving our 800+ students. We are working to modernize these spaces with smart boards and improved furniture.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709',
                status: 'needs-improvement',
                icon: '📚'
              },
              {
                title: 'Computer Lab',
                description: 'Basic computer lab that requires significant upgrades to meet modern technology education standards.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7114.HEIC',
                status: 'needs-improvement',
                icon: '💻'
              },
              {
                title: 'School Environment',
                description: 'Spacious grounds providing safe spaces for students to play, learn, and develop social skills.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7035.HEIC?updatedAt=1748185340320',
                status: 'good',
                icon: '🌳'
              },
              {
                title: 'Teacher Preparation Rooms',
                description: 'Dedicated spaces for teachers to prepare lessons and collaborate. These areas need modernization.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.50.56_49e6cf17.jpg?updatedAt=1748196651837',
                status: 'needs-improvement',
                icon: '👩‍🏫'
              },
              {
                title: 'Canteen',
                description: 'Basic canteen facilities that need significant improvement to provide better nutrition and dining experience for students.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7109.HEIC?updatedAt=1748099386709',
                status: 'needs-improvement',
                icon: '🍽️'
              },
              {
                title: 'Toilet Facilities/Urinals',
                description: 'Current toilet and urinal facilities require major upgrades to meet modern hygiene and accessibility standards.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7114.HEIC',
                status: 'needs-improvement',
                icon: '🚻'
              },
              {
                title: 'Science Laboratory',
                description: 'We are actively seeking support to establish a modern science laboratory for hands-on learning.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7121.HEIC',
                status: 'planned',
                icon: '🔬'
              },
              {
                title: 'Library & Resource Center',
                description: 'Planning to create a modern library with digital resources and quiet study areas for our students.',
                image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7107.HEIC',
                status: 'planned',
                icon: '📖'
              }
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <div className="glass-dark rounded-2xl overflow-hidden shadow-xl border border-white/20 backdrop-blur-lg hover:shadow-2xl transition-all duration-300">
                  <div className="relative h-32 sm:h-40 overflow-hidden">
                    <OptimizedImage
                      src={`${facility.image}?tr=w-400,h-300,q-80`}
                      alt={facility.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      shimmerClassName="w-full h-32 sm:h-40"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Status Badge */}
                    <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                      facility.status === 'good' ? 'bg-green-500/90 text-white' :
                      facility.status === 'needs-improvement' ? 'bg-yellow-500/90 text-black' :
                      'bg-blue-500/90 text-white'
                    }`}>
                      {facility.status === 'good' ? '✅ Good' :
                       facility.status === 'needs-improvement' ? '🔧 Improving' :
                       '🚧 Planned'}
                    </div>

                    {/* Icon Overlay */}
                    <div className="absolute top-2 left-2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center text-lg shadow-lg">
                      {facility.icon}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white mb-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {facility.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                      {facility.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Support Call-to-Action - Dark Aero with Colorful Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="glass-dark rounded-2xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-xl backdrop-blur-lg max-w-4xl mx-auto"
          >
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4 sm:mb-6 shadow-lg">
                🤝
              </div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                Help Us Build a World-Class Learning Environment
              </h3>
              <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                We are continuously seeking support from individuals, organizations, and partners to modernize our facilities
                and create a learning environment that prepares our students to compete in the rapidly changing global world.
                Your contribution can help us establish modern science labs, upgrade our computer facilities, create a
                well-equipped library, and enhance our overall educational infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                {/* Exact Donate Button */}
                <a
                  href="/donate"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-red-500 opacity-30 rounded-full"></span>
                  <span className="absolute -inset-1 bg-red-500 opacity-20 blur-sm rounded-full"></span>
                  <span className="w-4 h-4 mr-2 fill-current relative z-10 text-white">❤️</span>
                  <span className="relative z-10 font-bold text-white">Support Our Vision</span>
                </a>

                {/* Colorful Partner Button */}
                <a
                  href="/contact"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 hover:from-cyan-600 hover:via-blue-600 hover:to-purple-600 text-white font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6),0_0_40px_rgba(59,130,246,0.4),0_0_60px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.8),0_0_50px_rgba(59,130,246,0.6),0_0_75px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:scale-105 text-sm sm:text-base relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-30 rounded-full"></span>
                  <span className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-20 blur-sm rounded-full"></span>
                  <span className="w-4 h-4 mr-2 fill-current relative z-10 text-white">🤝</span>
                  <span className="relative z-10 font-bold text-white">Partner With Us</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Compact Community Impact Section - Dark Aero with Gallery */}
      <section className="py-6 sm:py-8 md:py-10 relative overflow-hidden">
        {/* Optimized Gallery Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Gallery"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay with Blue-Green Gradient */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/40 via-blue-700/50 to-green-700/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.1),transparent_70%),radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.1),transparent_70%)]"></div>

        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6 sm:mb-8"
          >
            <div className="flex items-center justify-center mb-3">
              <Award size={20} className="text-yellow-300 mr-3 flex-shrink-0" />
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold">Our Impact & Aspirations</h2>
            </div>
            <p className="text-sm text-gray-100 max-w-2xl mx-auto">
              Building on 47 years of educational excellence while working towards our vision of becoming a world-class institution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8">
            {/* Current Impact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  🎓
                </div>
                <h3 className="text-sm sm:text-base font-bold text-yellow-300 mb-2">Educational Legacy</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">47+ years • 30,000+ graduates</p>
                  <p className="text-white/90">800+ students • Excellent BECE</p>
                </div>
              </div>
            </motion.div>

            {/* Current Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  💪
                </div>
                <h3 className="text-sm sm:text-base font-bold text-green-300 mb-2">Current Strengths</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">Dedicated staff • Community support</p>
                  <p className="text-white/90">Character focus • Quality curriculum</p>
                </div>
              </div>
            </motion.div>

            {/* Future Goals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-white/20 hover:bg-white/15 transition-all duration-300"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-xl sm:text-2xl mx-auto mb-2 sm:mb-3">
                  🚀
                </div>
                <h3 className="text-sm sm:text-base font-bold text-blue-300 mb-2">Future Vision</h3>
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="text-white/90">Modern labs • Digital library</p>
                  <p className="text-white/90">Global standards • Innovation</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Compact Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <p className="text-sm text-gray-200 mb-4 max-w-xl mx-auto">
              Join us in transforming St. Louis Demonstration JHS into a world-class educational institution.
            </p>
            <a
              href="/donate"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)] transition-all duration-300 transform hover:scale-105 text-sm relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-red-500 opacity-30 rounded-full"></span>
              <span className="absolute -inset-1 bg-red-500 opacity-20 blur-sm rounded-full"></span>
              <span className="w-4 h-4 mr-2 fill-current relative z-10 text-white">❤️</span>
              <span className="relative z-10 font-bold text-white">Be Part of Our Story</span>
            </a>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default AboutPage;