import React from 'react';
import { motion } from 'framer-motion';
import { History, Award, Target, BookOpen } from 'lucide-react';
import SectionDivider from '../components/common/SectionDivider';

const AboutPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
            >
              About Our School
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto"
            >
              Learn about our history, mission, values, and what makes
              St. Louis Demonstration Junior High School a special place for learning.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* History Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <div className="flex items-center mb-4">
                <History size={24} className="text-green-600 mr-3 flex-shrink-0" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our History</h2>
              </div>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                Founded in 1985, St. Louis Demonstration Junior High School began with a vision
                to provide quality education to students in the St. Louis area. What started as
                a small school with just five classrooms and ten teachers has grown into a
                respected institution with state-of-the-art facilities and a team of dedicated educators.
              </p>
              <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
                Over the decades, our school has continually evolved to meet the changing needs of
                students while maintaining our commitment to academic excellence and character development.
                We have graduated thousands of students who have gone on to succeed in high school,
                college, and their chosen careers.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Today, St. Louis Demonstration Junior High School stands as a testament to the
                power of vision, dedication, and community support in creating an exceptional
                educational environment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-lg overflow-hidden shadow-xl order-1 md:order-2 mb-6 md:mb-0"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <img
                src="https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Historical school building"
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Mission & Values Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-4"
            >
              <Target size={24} className="text-green-600 mr-3 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Mission & Values</h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 md:mb-4">Our Mission</h3>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                Our mission at St. Louis Demonstration Junior High School is to provide a
                comprehensive, high-quality education in a supportive environment that
                promotes academic excellence, personal growth, and social responsibility.
                We are committed to nurturing the intellectual, physical, emotional, and
                social development of each student, preparing them to be lifelong learners
                and responsible citizens in an ever-changing global society.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 sm:p-8 rounded-lg shadow-md"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-blue-700 mb-3 md:mb-4">Our Values</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex">
                  <span className="text-green-600 mr-2 sm:mr-3 text-lg">•</span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">Excellence:</span> We strive for excellence in all areas of education and personal development.
                  </div>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2 sm:mr-3 text-lg">•</span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">Respect:</span> We foster mutual respect among students, staff, and the community.
                  </div>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2 sm:mr-3 text-lg">•</span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">Integrity:</span> We uphold honesty, ethics, and accountability in all actions.
                  </div>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2 sm:mr-3 text-lg">•</span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">Diversity:</span> We celebrate diversity and promote inclusivity in our community.
                  </div>
                </li>
                <li className="flex">
                  <span className="text-green-600 mr-2 sm:mr-3 text-lg">•</span>
                  <div className="text-sm sm:text-base">
                    <span className="font-semibold">Innovation:</span> We embrace innovation and creativity in teaching and learning.
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Facilities Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-green-600 mr-3 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Our Facilities</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-700 px-1">
              Our campus is designed to provide a safe, inspiring environment
              that supports diverse learning activities and student development.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: 'Modern Classrooms',
                description: 'Equipped with smart boards, multimedia capabilities, and flexible seating arrangements.',
                image: 'https://images.pexels.com/photos/8617677/pexels-photo-8617677.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Science Laboratories',
                description: 'State-of-the-art labs for biology, chemistry, and physics with modern equipment for hands-on learning.',
                image: 'https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Computer Lab',
                description: 'Advanced computer lab with the latest hardware and software for technology education.',
                image: 'https://images.pexels.com/photos/8617839/pexels-photo-8617839.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Library',
                description: 'Comprehensive library with a wide collection of books, digital resources, and quiet study areas.',
                image: 'https://images.pexels.com/photos/8423087/pexels-photo-8423087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Sports Facilities',
                description: 'Indoor gymnasium, outdoor fields, and courts for various sports and physical education activities.',
                image: 'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Art & Music Rooms',
                description: 'Dedicated spaces for creative expression, equipped with art supplies and musical instruments.',
                image: 'https://images.pexels.com/photos/7520697/pexels-photo-7520697.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
            ].map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="h-40 sm:h-48 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-700 mb-1 sm:mb-2">{facility.title}</h3>
                  <p className="text-sm sm:text-base text-gray-700">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Achievements Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
          <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-10 md:mb-16"
          >
            <div className="flex items-center justify-center mb-4">
              <Award size={24} className="text-yellow-300 mr-3 flex-shrink-0" />
              <h2 className="text-2xl sm:text-3xl font-bold">School Achievements</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-100 px-1">
              Our school community takes pride in the recognition and accomplishments
              we've achieved over the years.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                year: '2024',
                achievement: 'National Blue Ribbon School of Excellence Award'
              },
              {
                year: '2023',
                achievement: 'Regional Science Olympiad Champions - 3rd consecutive year'
              },
              {
                year: '2022',
                achievement: 'State Mathematics Competition - 1st Place Team Award'
              },
              {
                year: '2022',
                achievement: 'Excellence in Arts Education Recognition'
              },
              {
                year: '2021',
                achievement: 'Community Service Award for Environmental Initiatives'
              },
              {
                year: '2020',
                achievement: 'District Technology Innovation Award'
              },
              {
                year: '2019',
                achievement: 'State Choir Competition - Gold Medal'
              },
              {
                year: '2018',
                achievement: 'Regional Basketball Champions'
              }
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-blue-800/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 hover:bg-blue-700/60 transition-all duration-300 border border-white/10"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <p className="text-yellow-300 font-bold mb-1 sm:mb-2 text-sm sm:text-base">{achievement.year}</p>
                <p className="text-white text-sm sm:text-base">{achievement.achievement}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutPage;