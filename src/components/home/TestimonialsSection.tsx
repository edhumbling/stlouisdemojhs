import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data';
import { Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-primary-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">
            What People Say About Us
          </h2>
          <p className="text-lg text-gray-700">
            Hear from our community about their experiences with St. Louis Demonstration Junior High School.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-md relative"
            >
              <Quote size={40} className="absolute top-6 right-6 text-primary-100" />
              <p className="text-gray-700 mb-6 relative z-10">{testimonial.quote}</p>
              <div className="flex items-center">
                {testimonial.image && (
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;