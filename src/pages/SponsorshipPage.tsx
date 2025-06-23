import React from 'react';
import { motion } from 'framer-motion';
// import { Layout } from '../components/layout/Layout'; // Assuming a Layout component exists
// For now, create a basic structure if Layout is not confirmed or easy to integrate
import { ArrowLeft, Users, Star } from 'lucide-react'; // Example icons, can adjust
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider'; // Common component
import SEOHead from '../components/seo/SEOHead';
import DonateButton from '../components/common/DonateButton';

// Define Sponsor type
interface Sponsor {
  id: string;
  name: string;
  image: string;
  level: 'Gold' | 'Diamond' | 'Platinum';
  description?: string;
}

// Initial Sponsor Data
const currentSponsors: Sponsor[] = [
  {
    id: 'richard-arthur',
    name: 'Richard Arthur',
    image: 'https://ik.imagekit.io/edhumbling/WhatsApp%20Image%202025-06-06%20at%2011.24.11_78d69af3.png',
    level: 'Gold',
    description: 'Travel Expert Consultant' // Sourced from his alumni profession
  },
  {
    id: 'emmanuel-dwamena',
    name: 'Emmanuel H. Dwamena',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1718218562009.jpeg?updatedAt=1748301421227',
    level: 'Platinum',
    description: 'Founder of AIDEL | Author'
  },
  {
    id: 'melody-amoabeng',
    name: 'Melody Amoabeng',
    image: 'https://ik.imagekit.io/humbling/362242784_6497485583671328_249841871987614079_n.jpg',
    level: 'Platinum',
    description: 'Professional in the United Kingdom | Class of 2011'
  },
  {
    id: 'michael-duah',
    name: 'Michael Boateng Duah, MS, MLS(ASCPi)CM',
    image: 'https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/1741280603621.jpeg?updatedAt=1748301421485',
    level: 'Diamond',
    description: 'Clinical Laboratory Scientist | Technologist | Author'
  }
];

// Placeholder for OptimizedImage and ShimmerLoader if needed for sponsor images
// For now, will use standard <img> and add OptimizedImage if complex display is built in next step.

const FilledStarRating: React.FC<{ level: Sponsor['level'] }> = ({ level }) => {
  const starCounts = { Gold: 3, Diamond: 4, Platinum: 5 };
  const count = starCounts[level];
  return (
    <div className="flex items-center justify-center mt-1 mb-2">
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} size={18} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
};

const SponsorCard: React.FC<{ sponsor: Sponsor }> = ({ sponsor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-lg p-4 shadow-lg flex flex-col items-center text-center h-full"
    >
      <img
        src={sponsor.image}
        alt={sponsor.name}
        className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-white/30"
        loading="lazy"
      />
      <h3 className="text-md font-semibold text-white mb-0.5">{sponsor.name}</h3>
      {sponsor.description && <p className="text-xs text-gray-400 mb-1">{sponsor.description}</p>}
      <FilledStarRating level={sponsor.level} />
    </motion.div>
  );
};

const SponsorshipPage: React.FC = () => {
  const navigate = useNavigate();

  // Group sponsors by level for rendering
  const platinumSponsors = currentSponsors.filter(s => s.level === 'Platinum');
  const diamondSponsors = currentSponsors.filter(s => s.level === 'Diamond');
  const goldSponsors = currentSponsors.filter(s => s.level === 'Gold');

  return (
    <div className="min-h-screen bg-black text-white">
      <SEOHead
        title="Our Sponsors | St. Louis Demonstration JHS"
        description="Meet our valued sponsors who support St. Louis Demonstration JHS. We are grateful for the generous support from our Gold, Diamond, and Platinum sponsors who help us achieve our educational mission."
        keywords="sponsors, sponsorship, support, partnerships, Gold Diamond Platinum sponsors, school supporters, educational funding"
        url="/sponsorship"
        type="website"
        pageType="about"
        useGalleryImages={true}
      />
      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900 py-3 sm:py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-yellow-700/50 hover:bg-yellow-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-yellow-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Our Sponsors
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section (Simplified for Sponsorship) */}
      <section className="py-12 sm:py-16 md:py-20 text-white relative overflow-hidden">
        {/* Background (can use a generic or specific sponsorship background image if available) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40 opacity-70"></div>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-white" /> {/* Placeholder Icon */}
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">
              Our Sponsors
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
              We are grateful for the generous support from our sponsors who help us achieve our mission.
            </p>
          </motion.div>
        </div>
      </section>

      <SectionDivider position="bottom" />

      {/* Current Sponsors Section - Display logic will be added in the next step */}
      <section id="current-sponsors" className="py-10 sm:py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gold Sponsors - Placeholder for display */}
          {goldSponsors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-yellow-400">Gold Sponsors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {goldSponsors.map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          {/* Diamond Sponsors - Placeholder for display */}
          {diamondSponsors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-blue-300">Diamond Sponsors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {diamondSponsors.map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          {/* Platinum Sponsors - Placeholder for display */}
          {platinumSponsors.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 text-gray-200">Platinum Sponsors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {platinumSponsors.map(sponsor => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
              </div>
            </div>
          )}

          {currentSponsors.length === 0 && (
            <p className="text-center text-gray-400 text-lg">We are currently seeking foundational sponsors. Join us!</p>
          )}
        </div>
      </section>

      <SectionDivider position="bottom" flip={true} />

      {/* How to Become a Sponsor Section */}
      <section id="become-sponsor" className="py-10 sm:py-12 md:py-16 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
              Become a Valued Sponsor
            </h2>
            <p className="text-gray-300 text-base sm:text-lg mb-6 leading-relaxed">
              Join our prestigious community of sponsors and make a lasting impact on education. Your generous contribution will be permanently acknowledged on our school's wall of honor, ensuring your legacy lives on for generations of students to see and appreciate.
            </p>
            <p className="text-yellow-400 text-lg sm:text-xl font-semibold mb-8 leading-relaxed">
              🏆 Make a significant donation and secure your place on our Wall of Honor - a permanent tribute to your commitment to education that will inspire future generations! 🏆
            </p>

            {/* Exact same glowing donate button from header */}
            <div className="flex justify-center">
              <DonateButton variant="standalone" />
            </div>

            <p className="text-gray-400 text-sm sm:text-base mt-6 leading-relaxed">
              For sponsorship inquiries and wall acknowledgment details, your donation will help us continue providing quality education to our students. Contact us through the donation process to discuss permanent recognition opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Optional: Footer if not using a global Layout component */}
      {/* <footer className="py-8 text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} St. Louis Demo JHS. All rights reserved.
          </footer> */}
    </div>
  );
};

export default SponsorshipPage;
