import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, BookOpen, Star, GraduationCap } from 'lucide-react';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const stats = [
    {
      icon: <GraduationCap className="w-8 h-8 text-green-400" />,
      number: 30000,
      suffix: '+',
      label: 'Students Trained',
      description: 'Since 1977',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: <Award className="w-8 h-8 text-blue-400" />,
      number: 98.7,
      suffix: '%',
      label: 'BECE Success Rate',
      description: '2023 Results',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-yellow-400" />,
      number: 95.2,
      suffix: '%',
      label: 'Average BECE Rate',
      description: 'Last 5 Years',
      color: 'from-yellow-500 to-amber-400'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-400" />,
      number: 850,
      suffix: '+',
      label: 'Current Students',
      description: 'Active Enrollment',
      color: 'from-purple-500 to-violet-400'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-red-400" />,
      number: 47,
      suffix: '',
      label: 'Years of Excellence',
      description: 'Established 1977',
      color: 'from-red-500 to-pink-400'
    },
    {
      icon: <Star className="w-8 h-8 text-indigo-400" />,
      number: 100,
      suffix: '%',
      label: 'GES Accredited',
      description: 'Fully Certified',
      color: 'from-indigo-500 to-blue-400'
    }
  ];

  // Counter animation hook
  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        setCount(Math.floor(progress * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => {
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
        }
      };
    }, [end, duration, isVisible]);

    return count;
  };

  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'Arial, sans-serif' }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Achievements</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Decades of excellence in education, accredited by the Ghana Education Service and guided by Roman Catholic principles
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              useCounter={useCounter}
            />
          ))}
        </div>

        {/* BECE Success History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-600/30 max-w-6xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
              Outstanding BECE Performance Record
            </h3>

            {/* BECE Years Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {[
                { year: '2023', rate: '98.7%', highlight: true },
                { year: '2022', rate: '96.8%', highlight: false },
                { year: '2021', rate: '94.5%', highlight: false },
                { year: '2020', rate: '93.2%', highlight: false },
                { year: '2019', rate: '97.1%', highlight: false }
              ].map((data, index) => (
                <motion.div
                  key={data.year}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  className={`p-3 md:p-4 rounded-lg border ${
                    data.highlight
                      ? 'bg-green-500/20 border-green-400/50 text-green-300'
                      : 'bg-gray-700/50 border-gray-600/30 text-gray-300'
                  }`}
                >
                  <div className="text-lg md:text-xl font-bold">{data.rate}</div>
                  <div className="text-sm text-gray-400">{data.year}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
              St. Louis Educational Institute is fully accredited by the <span className="text-green-400 font-semibold">Ghana Education Service (GES)</span> and operates under <span className="text-blue-400 font-semibold">Roman Catholic principles</span>, providing quality education that nurtures both academic excellence and moral character.
            </p>

            <div className="text-sm md:text-base text-gray-400">
              <span className="text-yellow-400 font-semibold">5-Year Average:</span> 95.2% BECE Success Rate |
              <span className="text-green-400 font-semibold ml-2">2023 Achievement:</span> 98.7% - Our Best Performance Yet!
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Individual Stat Card Component
const StatCard: React.FC<{
  stat: any;
  index: number;
  useCounter: (end: number, duration?: number) => number;
}> = ({ stat, index, useCounter }) => {
  const count = useCounter(stat.number, 2000 + index * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      className="group relative bg-gray-800/50 backdrop-blur-sm p-4 md:p-6 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50"
      whileHover={{ y: -5, scale: 1.02 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>

      {/* Icon */}
      <div className="flex justify-center mb-3">
        <div className="p-2 rounded-lg bg-gray-700/50">
          {stat.icon}
        </div>
      </div>

      {/* Number */}
      <div className="text-center">
        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1">
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-sm md:text-base font-semibold text-gray-300 mb-1">
          {stat.label}
        </div>
        <div className="text-xs md:text-sm text-gray-400">
          {stat.description}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </motion.div>
  );
};

export default StatsSection;
