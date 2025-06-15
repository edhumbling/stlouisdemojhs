import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Users, Award, Calendar } from 'lucide-react';
import { getSchoolStats } from '../../utils/schoolStats';

interface DataPoint {
  year: number;
  students: number;
  beceRate: number;
  label: string;
  isCurrent: boolean;
  isFuture: boolean;
}

const GrowthChart: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const chartRef = useRef<HTMLDivElement>(null);
  const schoolStats = getSchoolStats();

  // Clean, professional data generation
  const generateGrowthData = (): DataPoint[] => {
    const currentYear = schoolStats.currentYear;

    const data: DataPoint[] = [
      { year: 1977, students: 500, beceRate: 85.0, label: 'Foundation', isCurrent: false, isFuture: false },
      { year: 1990, students: 3500, beceRate: 89.2, label: 'Growth Era', isCurrent: false, isFuture: false },
      { year: 2000, students: 8500, beceRate: 91.5, label: 'Modernization', isCurrent: false, isFuture: false },
      { year: 2010, students: 18000, beceRate: 93.8, label: 'Innovation', isCurrent: false, isFuture: false },
      { year: 2020, students: 28000, beceRate: 95.4, label: 'Excellence', isCurrent: false, isFuture: false },
      {
        year: currentYear,
        students: schoolStats.totalStudents,
        beceRate: schoolStats.currentBECERate,
        label: 'Current',
        isCurrent: true,
        isFuture: false
      }
    ];

    // 🚀 AUTOMATED: Add future projections using automated BECE calculation
    const futureYears = [currentYear + 5, currentYear + 10];
    futureYears.forEach((futureYear) => {
      const yearsFromNow = futureYear - currentYear;
      // Calculate future BECE rate using same logic as schoolStats
      const futureBaseRate = 97.1; // 2025 base rate
      const yearlyImprovement = 0.15;
      const maxRate = 99.5;
      const futureBECERate = Math.min(futureBaseRate + ((futureYear - 2025) * yearlyImprovement), maxRate);

      data.push({
        year: futureYear,
        students: schoolStats.totalStudents + (yearsFromNow * 400),
        beceRate: futureBECERate,
        label: `+${yearsFromNow}Y`,
        isCurrent: false,
        isFuture: true
      });
    });

    return data;
  };

  const data = generateGrowthData();

  // Professional chart configuration
  const CHART_CONFIG = {
    width: 800,
    height: 400,
    margin: { top: 40, right: 60, bottom: 60, left: 80 },
    colors: {
      students: '#007AFF',
      beceRate: '#34C759',
      grid: '#1C1C1E',
      text: '#FFFFFF',
      textSecondary: '#8E8E93'
    }
  };

  const chartWidth = CHART_CONFIG.width - CHART_CONFIG.margin.left - CHART_CONFIG.margin.right;
  const chartHeight = CHART_CONFIG.height - CHART_CONFIG.margin.top - CHART_CONFIG.margin.bottom;

  // Data bounds
  const maxStudents = Math.max(...data.map(d => d.students));
  const minStudents = Math.min(...data.map(d => d.students));
  const maxBeceRate = 100;
  const minBeceRate = 80;
  const minYear = Math.min(...data.map(d => d.year));
  const maxYear = Math.max(...data.map(d => d.year));

  // Scale functions
  const scaleX = (year: number) =>
    ((year - minYear) / (maxYear - minYear)) * chartWidth;

  const scaleYStudents = (students: number) =>
    chartHeight - ((students - minStudents) / (maxStudents - minStudents)) * chartHeight;

  const scaleYBece = (rate: number) =>
    chartHeight - ((rate - minBeceRate) / (maxBeceRate - minBeceRate)) * chartHeight;

  // Generate clean SVG paths
  const studentsPath = data.map((point, index) => {
    const x = scaleX(point.year);
    const y = scaleYStudents(point.students);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');

  const becePath = data.map((point, index) => {
    const x = scaleX(point.year);
    const y = scaleYBece(point.beceRate);
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
    <div className="w-full bg-black/60 backdrop-blur-sm flex items-center justify-center py-4 sm:py-6 md:py-8 px-2 sm:px-4" ref={chartRef}>
      <div className="w-full max-w-7xl relative">
        {/* Mobile-Optimized Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-3 sm:mb-4 md:mb-6 px-2"
        >
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-white mb-1 sm:mb-2"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            Growth Trajectory
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            {schoolStats.foundingYear} - {schoolStats.currentYear + 10} • Student Growth & Academic Excellence
          </p>
        </motion.div>

        {/* Mobile-Optimized Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-800 p-2 sm:p-4 md:p-6 overflow-hidden"
        >
          <svg
            width="100%"
            height="300"
            viewBox={`0 0 ${CHART_CONFIG.width} ${CHART_CONFIG.height}`}
            className="overflow-visible touch-manipulation"
            style={{ minHeight: '250px', maxHeight: '400px' }}
          >
            <defs>
              <linearGradient id="studentsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={CHART_CONFIG.colors.students} stopOpacity="1"/>
                <stop offset="100%" stopColor={CHART_CONFIG.colors.students} stopOpacity="0.8"/>
              </linearGradient>
              <linearGradient id="beceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={CHART_CONFIG.colors.beceRate} stopOpacity="1"/>
                <stop offset="100%" stopColor={CHART_CONFIG.colors.beceRate} stopOpacity="0.8"/>
              </linearGradient>
            </defs>

            {/* Chart Area */}
            <g transform={`translate(${CHART_CONFIG.margin.left}, ${CHART_CONFIG.margin.top})`}>

              {/* Grid Lines */}
              <g stroke={CHART_CONFIG.colors.grid} strokeWidth="1" opacity="0.3">
                {/* Horizontal grid lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => (
                  <line
                    key={`h-${ratio}`}
                    x1="0"
                    y1={chartHeight * ratio}
                    x2={chartWidth}
                    y2={chartHeight * ratio}
                  />
                ))}
                {/* Vertical grid lines */}
                {data.map((point) => (
                  <line
                    key={`v-${point.year}`}
                    x1={scaleX(point.year)}
                    y1="0"
                    x2={scaleX(point.year)}
                    y2={chartHeight}
                    opacity="0.2"
                  />
                ))}
              </g>

              {/* Students Line */}
              <motion.path
                d={studentsPath}
                fill="none"
                stroke={CHART_CONFIG.colors.students}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* BECE Rate Line */}
              <motion.path
                d={becePath}
                fill="none"
                stroke={CHART_CONFIG.colors.beceRate}
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={isVisible ? { pathLength: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
              />

              {/* Mobile-Friendly Data Points */}
              {data.map((point, index) => (
                <motion.g key={point.year}>
                  {/* Touch-Friendly Invisible Hit Area */}
                  <circle
                    cx={scaleX(point.year)}
                    cy={scaleYStudents(point.students)}
                    r="20"
                    fill="transparent"
                    className="cursor-pointer touch-manipulation"
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onClick={() => setSelectedPoint(point)}
                    onTouchStart={() => setHoveredPoint(point)}
                    onTouchEnd={() => setSelectedPoint(point)}
                  />

                  {/* Students Point */}
                  <motion.circle
                    cx={scaleX(point.year)}
                    cy={scaleYStudents(point.students)}
                    r={hoveredPoint === point ? "10" : point.isCurrent ? "8" : "6"}
                    fill={point.isFuture ? CHART_CONFIG.colors.students + "80" : CHART_CONFIG.colors.students}
                    stroke={CHART_CONFIG.colors.students}
                    strokeWidth="3"
                    strokeDasharray={point.isFuture ? "4,2" : "none"}
                    className="pointer-events-none"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  />

                  {/* BECE Rate Point */}
                  <motion.circle
                    cx={scaleX(point.year)}
                    cy={scaleYBece(point.beceRate)}
                    r={hoveredPoint === point ? "10" : point.isCurrent ? "8" : "6"}
                    fill={point.isFuture ? CHART_CONFIG.colors.beceRate + "80" : CHART_CONFIG.colors.beceRate}
                    stroke={CHART_CONFIG.colors.beceRate}
                    strokeWidth="3"
                    strokeDasharray={point.isFuture ? "4,2" : "none"}
                    className="pointer-events-none"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  />

                  {/* Mobile-Optimized Year Labels */}
                  <text
                    x={scaleX(point.year)}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="fill-gray-400 text-xs sm:text-sm"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 'clamp(10px, 2.5vw, 14px)'
                    }}
                  >
                    {point.year}
                  </text>

                  {/* Mobile-Optimized Point Labels */}
                  <text
                    x={scaleX(point.year)}
                    y={chartHeight + 35}
                    textAnchor="middle"
                    className="fill-gray-500 text-xs sm:text-sm"
                    style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 'clamp(8px, 2vw, 12px)'
                    }}
                  >
                    {point.label}
                  </text>
                </motion.g>
              ))}

              {/* Mobile-Optimized Y-Axis Labels */}
              <g className="fill-gray-400" style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 'clamp(8px, 2vw, 12px)'
              }}>
                {/* Students Axis - Mobile Responsive */}
                <text
                  x="-50"
                  y="15"
                  className="fill-blue-400 font-medium"
                  style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}
                >
                  Students
                </text>
                {[minStudents, maxStudents].map((value, i) => (
                  <text
                    key={`students-${i}`}
                    x="-10"
                    y={scaleYStudents(value) + 4}
                    textAnchor="end"
                    style={{ fontSize: 'clamp(8px, 2vw, 11px)' }}
                  >
                    {(value / 1000).toFixed(0)}K
                  </text>
                ))}

                {/* BECE Rate Axis - Mobile Responsive */}
                <text
                  x={chartWidth + 10}
                  y="15"
                  className="fill-green-400 font-medium"
                  style={{ fontSize: 'clamp(10px, 2.5vw, 14px)' }}
                >
                  BECE %
                </text>
                {[minBeceRate, maxBeceRate].map((value, i) => (
                  <text
                    key={`bece-${i}`}
                    x={chartWidth + 8}
                    y={scaleYBece(value) + 4}
                    style={{ fontSize: 'clamp(8px, 2vw, 11px)' }}
                  >
                    {value.toFixed(0)}%
                  </text>
                ))}
              </g>
            </g>
          </svg>
        </motion.div>

        {/* Mobile-Friendly One Line Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-2 sm:mt-3 md:mt-4 px-2"
        >
          <div className="flex items-center gap-2 sm:gap-6 md:gap-8 bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-6 py-2 sm:py-3 border border-gray-700">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-4 h-0.5 bg-blue-500"></div>
              <span className="text-xs sm:text-sm text-gray-300">Students</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-2 sm:w-4 h-0.5 bg-green-500"></div>
              <span className="text-xs sm:text-sm text-gray-300">BECE</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full border border-dashed border-gray-400"></div>
              <span className="text-xs text-gray-400">Future</span>
            </div>
          </div>
        </motion.div>

        {/* Minimalistic Tooltip - Contained within section */}
        <AnimatePresence>
          {(hoveredPoint || selectedPoint) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-2 right-2 max-w-[180px] bg-black/90 backdrop-blur-sm rounded-lg p-2 border border-gray-600/50 shadow-lg z-10"
              style={{ pointerEvents: 'none' }}
            >
              {(hoveredPoint || selectedPoint) && (
                <div className="space-y-1">
                  <div className="text-xs font-medium text-white">
                    {(hoveredPoint || selectedPoint)!.year} - {(hoveredPoint || selectedPoint)!.label}
                  </div>

                  <div className="text-xs text-gray-300 space-y-0.5">
                    <div>Students: <span className="text-blue-400">{(hoveredPoint || selectedPoint)!.students.toLocaleString()}+</span></div>
                    <div>BECE: <span className="text-green-400">{(hoveredPoint || selectedPoint)!.beceRate.toFixed(1)}%</span></div>
                  </div>

                  {(hoveredPoint || selectedPoint)!.isCurrent && (
                    <div className="text-xs text-blue-400 font-medium">📍 Current</div>
                  )}

                  {(hoveredPoint || selectedPoint)!.isFuture && (
                    <div className="text-xs text-purple-400 font-medium">🔮 Projected</div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GrowthChart;
