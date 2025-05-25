import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, BookOpen, Star, GraduationCap } from 'lucide-react';
import { getSchoolStats, getDecadePerformance } from '../../utils/schoolStats';
import GrowthChart from './GrowthChart';

const StatsSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Get dynamic school statistics
  const schoolStats = getSchoolStats();

  const stats = [
    {
      icon: <GraduationCap className="w-8 h-8 text-green-400" />,
      number: schoolStats.totalStudents,
      suffix: '+',
      label: 'Students Trained',
      description: `Since ${schoolStats.foundingYear}`,
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: <Award className="w-8 h-8 text-blue-400" />,
      number: 98.7,
      suffix: '%',
      label: 'BECE Success Rate',
      description: `${schoolStats.currentYear - 1} Results`,
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
      number: schoolStats.currentEnrollment,
      suffix: '+',
      label: 'Current Students',
      description: 'Active Enrollment',
      color: 'from-purple-500 to-violet-400'
    },
    {
      icon: <BookOpen className="w-8 h-8 text-red-400" />,
      number: schoolStats.age,
      suffix: '+',
      label: 'Years of Excellence',
      description: `Established ${schoolStats.foundingYear}`,
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
    <section className="py-4 sm:py-6 md:py-8 lg:py-12 bg-black relative overflow-hidden min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, #3b82f6 0%, transparent 50%),
                           radial-gradient(circle at 50% 50%, #f59e0b 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="w-full px-1 sm:px-2 md:px-4 lg:px-6 relative z-10">
        {/* Section Header - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 sm:mb-3 md:mb-4"
              style={{ fontFamily: 'Arial, sans-serif' }}>
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">Achievements</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed">
            Decades of excellence in education, accredited by the Ghana Education Service and guided by Roman Catholic principles
          </p>
        </motion.div>

        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-1 sm:px-2">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              index={index}
              useCounter={useCounter}
            />
          ))}
        </div>

        {/* Decades of Excellence Performance Record */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-600/30 max-w-7xl mx-auto">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Five Decades of Academic Excellence
            </h3>
            <p className="text-gray-400 text-sm md:text-base mb-8">
              Consistent BECE Success Rates Across Generations ({schoolStats.yearsRange}+)
            </p>

            {/* Decades Performance Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 mb-8">
              {getDecadePerformance().map((data, index) => (
                <motion.div
                  key={data.decade}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className={`relative p-3 md:p-4 rounded-xl border transition-all duration-300 hover:scale-105 ${
                    data.highlight
                      ? 'bg-green-500/20 border-green-400/60 shadow-lg shadow-green-500/20'
                      : data.future
                      ? 'bg-yellow-500/10 border-yellow-400/40 shadow-lg shadow-yellow-500/10'
                      : 'bg-gray-700/50 border-gray-600/30 hover:border-gray-500/50'
                  }`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${data.color} opacity-5 rounded-xl`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`text-lg md:text-xl font-bold ${data.textColor} mb-1`}>
                      {data.rate}
                    </div>
                    <div className="text-xs md:text-sm font-semibold text-white mb-1">
                      {data.decade}
                    </div>
                    <div className="text-xs text-gray-400 mb-1">
                      {data.period}
                    </div>
                    <div className="text-xs text-gray-500">
                      {data.description}
                    </div>
                  </div>

                  {/* Special Indicators */}
                  {data.highlight && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      Current
                    </div>
                  )}
                  {data.future && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-bold">
                      Goal
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Key Information */}
            <div className="bg-gray-700/30 rounded-xl p-4 md:p-6 mb-6">
              <h4 className="text-lg md:text-xl font-bold text-white mb-3">
                Institutional Excellence & Accreditation
              </h4>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-4">
                St. Louis Demonstration J.H.S is fully accredited by the <span className="text-green-400 font-semibold">Ghana Education Service (GES)</span> and operates under <span className="text-blue-400 font-semibold">Roman Catholic principles</span>, providing quality education that nurtures both academic excellence and moral character across five decades of service.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-green-400 font-bold text-lg">{schoolStats.ageFormatted} Years</div>
                  <div className="text-gray-400 text-sm">Consistent Excellence</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-blue-400 font-bold text-lg">{schoolStats.totalStudentsFormatted}</div>
                  <div className="text-gray-400 text-sm">Graduates Trained</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3">
                  <div className="text-yellow-400 font-bold text-lg">95.4%</div>
                  <div className="text-gray-400 text-sm">Overall Average</div>
                </div>
              </div>
            </div>

            {/* Future Commitment Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
              className="bg-gradient-to-r from-blue-900/30 to-green-900/30 rounded-xl p-4 md:p-6 border border-blue-500/30"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <h4 className="text-base md:text-lg font-bold text-white">
                  Commitment to Continued Excellence
                </h4>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">
                <span className="text-green-400 font-semibold">St. Louis Demonstration J.H.S continues to achieve and maintain excellent BECE success rates year after year</span>.
                Our commitment to academic excellence, spiritual formation, and student success remains unwavering as we progress toward our goal of 99%+ success rates in the coming decade.
                <span className="text-blue-400 font-semibold"> Excellence is not just our history—it's our future.</span>
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Interactive Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 md:mt-12 lg:mt-16"
        >
          <GrowthChart />
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
      className="group relative bg-gray-800/50 backdrop-blur-sm p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg sm:rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/50"
      whileHover={{ y: -2, scale: 1.01 }}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-lg sm:rounded-xl transition-opacity duration-300`}></div>

      {/* Icon */}
      <div className="flex justify-center mb-1 sm:mb-2 md:mb-3">
        <div className="p-1 sm:p-1.5 md:p-2 rounded-md sm:rounded-lg bg-gray-700/50">
          <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8">
            {stat.icon}
          </div>
        </div>
      </div>

      {/* Number */}
      <div className="text-center">
        <div className="text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-0.5 sm:mb-1">
          {count.toLocaleString()}{stat.suffix}
        </div>
        <div className="text-xs sm:text-xs md:text-sm lg:text-base font-semibold text-gray-300 mb-0.5 sm:mb-1 leading-tight">
          {stat.label}
        </div>
        <div className="text-xs sm:text-xs md:text-xs lg:text-sm text-gray-400 leading-tight">
          {stat.description}
        </div>
      </div>

      {/* Hover Effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
    </motion.div>
  );
};

export default StatsSection;
