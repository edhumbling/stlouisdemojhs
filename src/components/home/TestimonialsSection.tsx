import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    author: "Cantona",
    role: "Education Facilitator",
    image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.54.08_289b5898.jpg?updatedAt=1748197633639",
    quote: "Being part of the educational journey at St. Louis Demo has been incredibly rewarding. Our innovative teaching methods and dedication to holistic development create an environment where students truly flourish. It's not just about academics; we're nurturing future leaders."
  },
  {
    id: 2,
    author: "Victor",
    role: "Community Member",
    image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.52.49_660e38af.jpg?updatedAt=1748197633607",
    quote: "St. Louis Demo is more than just a school - it's the heart of our community. Watching these young minds develop and contribute to our society fills me with hope. The school's impact extends far beyond its walls, touching lives and inspiring change."
  },
  {
    id: 3,
    author: "Esther",
    role: "Community Member & Education Expert",
    image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.52.49_660e38af.jpg?updatedAt=1748197633607",
    quote: "What impresses me most about St. Louis Demo is their holistic approach to education. They don't just teach subjects; they nurture leaders. The school's impact on our community is immeasurable and continues to grow each year."
  }
];

const TestimonialsSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollContainerRef);
  const controls = useAnimation();

  // Duplicate testimonials for infinite scroll effect
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  useEffect(() => {
    if (isInView) {
      controls.start({
        x: [0, -100 * testimonials.length + '%'],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45, // Slower scroll speed
            ease: "linear",
            repeatDelay: 0 // Immediate restart of animation
          }
        }
      });
    }
  }, [isInView, controls]);

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Edge Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Voices from Our Community
          </h2>
          <p className="text-lg text-gray-300">
            Discover what makes St. Louis Demonstration Junior High School special through the eyes of our community.
          </p>
        </motion.div>

        <div className="relative overflow-hidden" ref={scrollContainerRef}>          <motion.div
            animate={controls}
            className="flex gap-6 md:gap-8 px-4"
            style={{ 
              width: `${extendedTestimonials.length * (window.innerWidth >= 1024 ? 500 : window.innerWidth >= 768 ? 400 : 300)}px`,
              willChange: 'transform'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (              <motion.div
                key={`${testimonial.id}-${index}`}
                className="w-[300px] md:w-[400px] lg:w-[500px] flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 shadow-xl"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Quote className="text-yellow-400/80 mb-4" size={32} />
                <p className="text-gray-200 mb-6 line-clamp-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 ring-2 ring-yellow-400/30">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.author}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;