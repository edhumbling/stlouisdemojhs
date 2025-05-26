import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef);

  // Dispersed gallery positions for each testimonial
  const testimonialPositions = [
    { top: '10%', left: '5%', rotation: -3 },      // Cantona
    { top: '15%', right: '8%', rotation: 2 },      // Victor
    { top: '45%', left: '12%', rotation: -1 },     // Esther
    { top: '25%', left: '35%', rotation: 4 },      // Agyaba
    { top: '60%', right: '15%', rotation: -2 },    // Naana
    { top: '35%', right: '35%', rotation: 1 }      // Hilaliman
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden min-h-screen">
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

        {/* Dispersed Gallery Layout */}
        <div className="relative h-[800px] md:h-[900px]" ref={containerRef}>
          {testimonials.map((testimonial, index) => {
            const position = testimonialPositions[index];
            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  rotate: position.rotation,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                viewport={{ once: true }}
                className="absolute w-[280px] md:w-[320px] lg:w-[350px] bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/10 shadow-xl cursor-pointer"
                style={{
                  top: position.top,
                  left: position.left,
                  right: position.right,
                  transform: `rotate(${position.rotation}deg)`,
                }}
              >
                <Quote className="text-yellow-400/80 mb-3" size={24} />
                <p className="text-gray-200 mb-4 text-sm md:text-base line-clamp-3">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden mr-3 ring-2 ring-yellow-400/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm md:text-base">{testimonial.author}</h4>
                    <p className="text-xs md:text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;