import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
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
    image: "https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/WhatsApp%20Image%202025-05-25%20at%2017.52.49_bf3dcd33.jpg?updatedAt=1748197632986",
    quote: "What impresses me most about St. Louis Demo is their holistic approach to education. They don't just teach subjects; they nurture leaders. The school's impact on our community is immeasurable and continues to grow each year."
  },
  {
    id: 4,
    author: "Agyaba",
    role: "Parent & Community Leader",
    image: "https://images.unsplash.com/photo-1647316897340-6b6de5597c0f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    quote: "As a parent, I've witnessed firsthand the transformation St. Louis Demo brings to our children. My son has grown not just academically but as a confident young man with strong values. The teachers here truly care about each student's success and future."
  },
  {
    id: 5,
    author: "Naana",
    role: "Alumni & Education Advocate",
    image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    quote: "St. Louis Demo shaped who I am today. The foundation I received here prepared me for university and beyond. The school's commitment to excellence and character development is unmatched. I'm proud to be an alumna of this incredible institution."
  },
  {
    id: 6,
    author: "Hilaliman",
    role: "Local Business Owner",
    image: "https://images.unsplash.com/photo-1626124295887-ca75ab69331c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    quote: "The graduates from St. Louis Demo are exceptional. When I hire young people from this school, I know I'm getting individuals with strong work ethics, critical thinking skills, and integrity. This school is truly raising the next generation of leaders."
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
        x: [0, -33.333333 + '%'], // Move exactly one set of testimonials (6 cards = 33.33%)
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 120, // Very slow like a tortoise - 2 minutes per cycle
            ease: "linear",
            repeatDelay: 0 // Absolutely no delay between loops
          }
        }
      });
    }
  }, [isInView, controls]);

  return (
    <section className="relative py-8 md:py-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Edge Overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-8 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Voices from Our Community
          </h2>
          <p className="text-base text-gray-300">
            Discover what makes St. Louis Demonstration Junior High School special through the eyes of our community.
          </p>
        </motion.div>

        {/* Horizontal Scrolling Testimonials */}
        <div className="relative overflow-hidden" ref={scrollContainerRef}>
          <motion.div
            animate={controls}
            className="flex px-4"
            style={{
              willChange: 'transform'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                className="w-[250px] md:w-[300px] lg:w-[350px] flex-shrink-0 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-5 border border-white/10 shadow-xl mr-5"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <Quote className="text-yellow-400/80 mb-3" size={20} />
                <p className="text-gray-200 mb-4 text-xs md:text-sm line-clamp-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-3 ring-2 ring-yellow-400/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-xs md:text-sm">{testimonial.author}</h4>
                    <p className="text-xs text-gray-400">{testimonial.role}</p>
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