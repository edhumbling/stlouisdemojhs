import React from 'react';
import { motion } from 'framer-motion';

interface WaveFooterProps {
  className?: string;
}

const WaveFooter: React.FC<WaveFooterProps> = ({ className = '' }) => {
  // Create an array of segments for the wave
  const segments = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={`w-full h-32 relative overflow-hidden ${className}`}>
      {/* Solid bar at the bottom (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-white"></div>

      {/* Animated segments */}
      <div className="absolute bottom-0 left-0 right-0 h-32 flex gap-[1px]">
        {segments.map((segment) => (
          <motion.div
            key={segment}
            className="bg-white"
            style={{ width: `${100 / segments.length}%` }}
            animate={{
              height: ["6px", "24px", "6px"],
              y: ["0px", "-80px", "0px"],
              marginLeft: ["0px", segment % 2 === 0 ? "6px" : "-6px", "0px"],
              marginRight: ["0px", segment % 2 === 0 ? "-6px" : "6px", "0px"]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: segment * 0.15, // More pronounced staggered delay
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaveFooter;
