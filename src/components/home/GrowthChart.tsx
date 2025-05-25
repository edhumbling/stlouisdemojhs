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
        beceRate: Math.min(97.1 + (currentYear - 2025) * 0.2, 99.5),
        label: 'Current',
        isCurrent: true,
        isFuture: false
      }
    ];

    // Add future projections
    const futureYears = [currentYear + 5, currentYear + 10];
    futureYears.forEach((futureYear, index) => {
      const yearsFromNow = futureYear - currentYear;
      data.push({
        year: futureYear,
        students: schoolStats.totalStudents + (yearsFromNow * 400),
        beceRate: Math.min(97.1 + (yearsFromNow * 0.15), 99.8),
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
    <div className="w-full h-screen bg-black flex items-center justify-center p-4 sm:p-6 md:p-8" ref={chartRef}>
      <div className="w-full max-w-6xl">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-2"
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            Growth Trajectory
          </h3>
          <p className="text-sm text-gray-400">
            {schoolStats.foundingYear} - {schoolStats.currentYear + 10} • Student Growth & Academic Excellence
          </p>
        </motion.div>

        {/* Professional Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 p-6"
        >
          <svg
            width="100%"
            height="400"
            viewBox={`0 0 ${CHART_CONFIG.width} ${CHART_CONFIG.height}`}
            className="overflow-visible"
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

              {/* Clean Data Points */}
              {data.map((point, index) => (
                <motion.g key={point.year}>
                  {/* Students Point */}
                  <motion.circle
                    cx={scaleX(point.year)}
                    cy={scaleYStudents(point.students)}
                    r={hoveredPoint === point ? "8" : point.isCurrent ? "6" : "5"}
                    fill={point.isFuture ? CHART_CONFIG.colors.students + "80" : CHART_CONFIG.colors.students}
                    stroke={CHART_CONFIG.colors.students}
                    strokeWidth="2"
                    strokeDasharray={point.isFuture ? "4,2" : "none"}
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onClick={() => setSelectedPoint(point)}
                  />

                  {/* BECE Rate Point */}
                  <motion.circle
                    cx={scaleX(point.year)}
                    cy={scaleYBece(point.beceRate)}
                    r={hoveredPoint === point ? "8" : point.isCurrent ? "6" : "5"}
                    fill={point.isFuture ? CHART_CONFIG.colors.beceRate + "80" : CHART_CONFIG.colors.beceRate}
                    stroke={CHART_CONFIG.colors.beceRate}
                    strokeWidth="2"
                    strokeDasharray={point.isFuture ? "4,2" : "none"}
                    className="cursor-pointer"
                    initial={{ scale: 0 }}
                    animate={isVisible ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                    onMouseEnter={() => setHoveredPoint(point)}
                    onMouseLeave={() => setHoveredPoint(null)}
                    onClick={() => setSelectedPoint(point)}
                  />

                  {/* Year Labels */}
                  <text
                    x={scaleX(point.year)}
                    y={chartHeight + 20}
                    textAnchor="middle"
                    className="fill-gray-400 text-xs"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {point.year}
                  </text>

                  {/* Point Labels */}
                  <text
                    x={scaleX(point.year)}
                    y={chartHeight + 35}
                    textAnchor="middle"
                    className="fill-gray-500 text-xs"
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                  >
                    {point.label}
                  </text>
                </motion.g>
              ))}

              {/* Y-Axis Labels */}
              <g className="fill-gray-400 text-xs" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
                {/* Students Axis */}
                <text x="-60" y="15" className="fill-blue-400 font-medium">Students Trained</text>
                {[minStudents, (minStudents + maxStudents) / 2, maxStudents].map((value, i) => (
                  <text key={`students-${i}`} x="-15" y={scaleYStudents(value) + 4} textAnchor="end">
                    {(value / 1000).toFixed(0)}K
                  </text>
                ))}

                {/* BECE Rate Axis */}
                <text x={chartWidth + 20} y="15" className="fill-green-400 font-medium">BECE Success %</text>
                {[minBeceRate, (minBeceRate + maxBeceRate) / 2, maxBeceRate].map((value, i) => (
                  <text key={`bece-${i}`} x={chartWidth + 15} y={scaleYBece(value) + 4}>
                    {value.toFixed(0)}%
                  </text>
                ))}
              </g>
            </g>
          </svg>
        {/* Clean Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex justify-center mt-6"
        >
          <div className="flex items-center gap-8 bg-gray-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-sm text-gray-300">Students Trained</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-sm text-gray-300">BECE Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full border-2 border-dashed border-gray-400"></div>
              <span className="text-xs text-gray-400">Projections</span>
            </div>
          </div>
        </motion.div>

        {/* Clean Tooltip */}
        <AnimatePresence>
          {(hoveredPoint || selectedPoint) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-4 right-4 bg-gray-800/95 backdrop-blur-sm rounded-xl p-4 border border-gray-700 shadow-xl max-w-xs"
            >
              {(hoveredPoint || selectedPoint) && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">
                      {(hoveredPoint || selectedPoint)!.year} - {(hoveredPoint || selectedPoint)!.label}
                    </h4>
                    {(hoveredPoint || selectedPoint)!.isFuture && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        Projection
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">Students Trained</span>
                      <span className="text-sm font-medium text-blue-400">
                        {(hoveredPoint || selectedPoint)!.students.toLocaleString()}+
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">BECE Success Rate</span>
                      <span className="text-sm font-medium text-green-400">
                        {(hoveredPoint || selectedPoint)!.beceRate.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  {selectedPoint && (
                    <button
                      onClick={() => setSelectedPoint(null)}
                      className="text-xs text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      Click to close
                    </button>
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
