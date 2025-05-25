import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Award, Calendar, Info } from 'lucide-react';
import { getSchoolStats } from '../../utils/schoolStats';

interface DataPoint {
  year: number;
  students: number;
  beceRate: number;
  decade: string;
  description: string;
  color: string;
}

const GrowthChart: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const schoolStats = getSchoolStats();

  // Dynamic growth data that automatically updates based on current year
  const generateGrowthData = (): DataPoint[] => {
    const currentYear = schoolStats.currentYear;
    const baseData = [
      {
        year: 1977,
        students: 500,
        beceRate: 85.0,
        decade: '1970s-80s',
        description: 'Foundation Years - Establishing Excellence',
        color: '#f59e0b'
      },
      {
        year: 1990,
        students: 3500,
        beceRate: 89.2,
        decade: '1990s',
        description: 'Growth Era - Expanding Horizons',
        color: '#10b981'
      },
      {
        year: 2000,
        students: 8500,
        beceRate: 91.5,
        decade: '2000s',
        description: 'Modernization - Technology Integration',
        color: '#3b82f6'
      },
      {
        year: 2010,
        students: 18000,
        beceRate: 93.8,
        decade: '2010s',
        description: 'Innovation - Digital Transformation',
        color: '#8b5cf6'
      },
      {
        year: 2020,
        students: 28000,
        beceRate: 95.4,
        decade: '2020s',
        description: 'Excellence Peak - Record Achievements',
        color: '#06d6a0'
      }
    ];

    // Add current year data
    baseData.push({
      year: currentYear,
      students: schoolStats.totalStudents,
      beceRate: Math.min(97.1 + (currentYear - 2025) * 0.2, 99.5), // Gradual improvement
      decade: `${currentYear}`,
      description: 'Current - Continuing Excellence',
      color: '#ffd60a'
    });

    // Add future projections (next 10-15 years)
    const futureYears = [currentYear + 5, currentYear + 10, currentYear + 15];
    futureYears.forEach((futureYear, index) => {
      const yearsFromNow = futureYear - currentYear;
      const projectedStudents = schoolStats.totalStudents + (yearsFromNow * 400);
      const projectedBeceRate = Math.min(97.1 + (yearsFromNow * 0.15), 99.8);

      baseData.push({
        year: futureYear,
        students: projectedStudents,
        beceRate: projectedBeceRate,
        decade: `${Math.floor(futureYear / 10) * 10}s`,
        description: `Future Projection - ${yearsFromNow} Years Ahead`,
        color: index === 0 ? '#ff6b6b' : index === 1 ? '#4ecdc4' : '#45b7d1'
      });
    });

    return baseData;
  };

  const growthData = generateGrowthData();

  // Chart dimensions and scaling
  const chartWidth = 100; // percentage
  const chartHeight = 60; // vh
  const padding = 8; // percentage

  const maxStudents = Math.max(...growthData.map(d => d.students));
  const maxBeceRate = 100;
  const minYear = Math.min(...growthData.map(d => d.year));
  const maxYear = Math.max(...growthData.map(d => d.year));

  // Scale functions
  const scaleX = (year: number) =>
    padding + ((year - minYear) / (maxYear - minYear)) * (chartWidth - 2 * padding);

  const scaleY = (value: number, max: number) =>
    chartHeight - (padding + (value / max) * (chartHeight - 2 * padding));

  // Generate SVG path for students curve
  const studentsPath = growthData.map((point, index) => {
    const x = scaleX(point.year);
    const y = scaleY(point.students, maxStudents);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  // Generate SVG path for BECE rate curve
  const becePath = growthData.map((point, index) => {
    const x = scaleX(point.year);
    const y = scaleY(point.beceRate, maxBeceRate);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black" ref={chartRef}>
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#374151" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="absolute top-4 sm:top-6 md:top-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 z-20"
      >
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white text-center mb-2"
            style={{ fontFamily: 'Arial, sans-serif' }}>
          <TrendingUp className="inline w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 mr-2 text-green-400" />
          Growth Journey: <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">{schoolStats.ageFormatted} Years of Excellence</span>
        </h3>
        <p className="text-xs sm:text-sm md:text-base text-gray-300 text-center">
          Interactive visualization from {schoolStats.foundingYear} to {schoolStats.currentYear + 15} • Past, Present & Future Projections
        </p>
      </motion.div>

      {/* Chart Container */}
      <div className="absolute inset-0 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 md:pb-8">
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="studentsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="beceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#06d6a0" stopOpacity="0.8"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Students Growth Line */}
          <motion.path
            d={studentsPath}
            fill="none"
            stroke="url(#studentsGradient)"
            strokeWidth="0.8"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : {}}
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          {/* BECE Rate Line */}
          <motion.path
            d={becePath}
            fill="none"
            stroke="url(#beceGradient)"
            strokeWidth="0.6"
            strokeDasharray="2,1"
            initial={{ pathLength: 0 }}
            animate={isVisible ? { pathLength: 1 } : {}}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />

          {/* Data Points */}
          {growthData.map((point, index) => {
            const isFuture = point.year > schoolStats.currentYear;
            const isCurrent = point.year === schoolStats.currentYear;

            return (
              <motion.g key={point.year}>
                {/* Students Point */}
                <motion.circle
                  cx={scaleX(point.year)}
                  cy={scaleY(point.students, maxStudents)}
                  r={hoveredPoint === point ? "1.2" : isCurrent ? "1.0" : "0.8"}
                  fill={point.color}
                  stroke={isFuture ? "#ffd60a" : isCurrent ? "#06d6a0" : "white"}
                  strokeWidth={isFuture ? "0.3" : "0.2"}
                  strokeDasharray={isFuture ? "2,1" : "none"}
                  filter="url(#glow)"
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedPoint(point)}
                  whileHover={{ scale: 1.5 }}
                />

                {/* BECE Rate Point */}
                <motion.circle
                  cx={scaleX(point.year)}
                  cy={scaleY(point.beceRate, maxBeceRate)}
                  r={hoveredPoint === point ? "1.0" : isCurrent ? "0.8" : "0.6"}
                  fill={point.color}
                  stroke={isFuture ? "#ffd60a" : isCurrent ? "#06d6a0" : "white"}
                  strokeWidth={isFuture ? "0.3" : "0.2"}
                  strokeDasharray={isFuture ? "2,1" : "none"}
                  opacity={isFuture ? "0.7" : "0.8"}
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={isVisible ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                  onMouseEnter={() => setHoveredPoint(point)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onClick={() => setSelectedPoint(point)}
                  whileHover={{ scale: 1.3 }}
                />

                {/* Future Projection Indicator */}
                {isFuture && (
                  <motion.text
                    x={scaleX(point.year)}
                    y={scaleY(point.students, maxStudents) - 3}
                    textAnchor="middle"
                    className="fill-yellow-400 text-xs"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                  >
                    📈
                  </motion.text>
                )}

                {/* Current Year Indicator */}
                {isCurrent && (
                  <motion.text
                    x={scaleX(point.year)}
                    y={scaleY(point.students, maxStudents) - 3}
                    textAnchor="middle"
                    className="fill-green-400 text-xs"
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 + 1.5 }}
                  >
                    ⭐
                  </motion.text>
                )}

                {/* Year Labels */}
                <motion.text
                  x={scaleX(point.year)}
                  y={chartHeight - 2}
                  textAnchor="middle"
                  className={`text-xs sm:text-sm ${isFuture ? 'fill-yellow-400' : isCurrent ? 'fill-green-400' : 'fill-gray-400'}`}
                  initial={{ opacity: 0 }}
                  animate={isVisible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1 }}
                >
                  {point.year}
                </motion.text>
              </motion.g>
            );
          })}
        </svg>
      </div>

      {/* Enhanced Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 bg-gray-900/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 border border-gray-700/50"
      >
        <div className="flex flex-col gap-1 sm:gap-2">
          {/* Data Lines */}
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gradient-to-r from-green-400 to-purple-400"></div>
            <span className="text-xs sm:text-sm text-gray-300">Students Trained</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-gradient-to-r from-yellow-400 to-green-400 opacity-80" style={{borderTop: '1px dashed'}}></div>
            <span className="text-xs sm:text-sm text-gray-300">BECE Success Rate</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-600/50 my-1"></div>

          {/* Time Indicators */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-400 border border-white"></div>
            <span className="text-xs text-gray-400">Historical Data</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 border border-green-400">
              <span className="text-xs">⭐</span>
            </div>
            <span className="text-xs text-green-400">Current ({schoolStats.currentYear})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-yellow-400 border-2 border-yellow-400 border-dashed">
              <span className="text-xs">📈</span>
            </div>
            <span className="text-xs text-yellow-400">Future Projections</span>
          </div>
        </div>
      </motion.div>

      {/* Interactive Tooltip */}
      <AnimatePresence>
        {(hoveredPoint || selectedPoint) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute top-1/2 right-4 sm:right-6 md:right-8 transform -translate-y-1/2 bg-gray-900/95 backdrop-blur-md rounded-xl p-3 sm:p-4 md:p-6 border border-gray-700/50 shadow-2xl max-w-xs"
          >
            {(hoveredPoint || selectedPoint) && (
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {(hoveredPoint || selectedPoint)!.decade}
                  </h4>
                  {(hoveredPoint || selectedPoint)!.year > schoolStats.currentYear && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full border border-yellow-400/30">
                      Projection
                    </span>
                  )}
                  {(hoveredPoint || selectedPoint)!.year === schoolStats.currentYear && (
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full border border-green-400/30">
                      Current
                    </span>
                  )}
                </div>

                <div className="space-y-1 sm:space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                    <span className="text-xs sm:text-sm text-gray-300">
                      {(hoveredPoint || selectedPoint)!.year > schoolStats.currentYear ? 'Projected Students:' : 'Students:'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-green-400">
                      {(hoveredPoint || selectedPoint)!.students.toLocaleString()}+
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                    <span className="text-xs sm:text-sm text-gray-300">
                      {(hoveredPoint || selectedPoint)!.year > schoolStats.currentYear ? 'Target BECE Rate:' : 'BECE Rate:'}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-yellow-400">
                      {(hoveredPoint || selectedPoint)!.beceRate.toFixed(1)}%
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-gray-700 pt-2">
                  {(hoveredPoint || selectedPoint)!.description}
                </p>

                {(hoveredPoint || selectedPoint)!.year > schoolStats.currentYear && (
                  <div className="text-xs text-yellow-400/80 bg-yellow-500/10 p-2 rounded border border-yellow-400/20">
                    📊 Based on current growth trends and strategic planning
                  </div>
                )}

                {selectedPoint && (
                  <button
                    onClick={() => setSelectedPoint(null)}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Click to close
                  </button>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interaction Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 right-4 sm:right-6 md:right-8 flex items-center gap-2 text-xs sm:text-sm text-gray-500"
      >
        <Info className="w-3 h-3 sm:w-4 sm:h-4" />
        <span>Hover or tap data points for details</span>
      </motion.div>
    </div>
  );
};

export default GrowthChart;
