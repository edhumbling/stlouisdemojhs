import React from 'react';
import { motion } from 'framer-motion';
import { staffMembers } from '../data';
import { Mail } from 'lucide-react';

const FacultyPage: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-32 md:pb-20 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Faculty & Staff</h1>
            <p className="text-lg md:text-xl text-gray-100">
              Meet the dedicated educators and professionals who make St. Louis 
              Demonstration Junior High School a center of excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Administration Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-primary-800 mb-16"
          >
            Administration
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12">
            {staffMembers
              .filter(member => member.department === 'Administration')
              .map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row"
                >
                  <div className="md:w-2/5">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-3/5">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-4">{member.position}</p>
                    <p className="text-gray-700 mb-4">{member.bio}</p>
                    <button className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
                      <Mail size={18} className="mr-1" />
                      Contact
                    </button>
                  </div>
                </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center text-primary-800 mb-16"
          >
            Faculty
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffMembers
              .filter(member => member.department !== 'Administration')
              .map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-2">{member.position}</p>
                    <p className="text-gray-600 mb-3">Department: {member.department}</p>
                    <p className="text-gray-700 mb-4 line-clamp-3">{member.bio}</p>
                    <button className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors">
                      <Mail size={18} className="mr-1" />
                      Contact
                    </button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold mb-6"
            >
              Join Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-100 mb-8"
            >
              We're always looking for passionate educators and staff to join our community. 
              If you're interested in making a difference in the lives of our students, 
              check out our current openings.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 font-medium rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-300"
            >
              View Career Opportunities
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default FacultyPage;