import React, { useEffect, useState } from 'react';

interface WaveFooterProps {
  className?: string;
}

const WaveFooter: React.FC<WaveFooterProps> = ({ className = '' }) => {
  // Create an array of wave segments with different heights
  const waveSegments = Array.from({ length: 24 }, (_, i) => {
    // Create a wave pattern with heights ranging from 8px to 23px
    return {
      height: 8 + Math.floor(Math.sin(i * 0.5) * 15 + 15)
    };
  });

  // State to track animated heights
  const [animatedHeights, setAnimatedHeights] = useState<number[]>(
    waveSegments.map(segment => segment.height)
  );

  // Animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Create a wave-like animation by adjusting heights
      setAnimatedHeights(prevHeights => {
        // Create a new array with slightly modified heights
        return prevHeights.map((height, index) => {
          // Calculate a new height with a wave-like variation
          const time = Date.now() / 1000;
          const phaseOffset = index * 0.3; // Different phase for each segment
          const variation = Math.sin(time + phaseOffset) * 3;
          const newHeight = Math.max(8, Math.min(38, waveSegments[index].height + variation));
          return newHeight;
        });
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="waveContainer" className={`flex flex-row w-full justify-between ${className}`}>
      {waveSegments.map((segment, index) => (
        <div
          key={index}
          className="wave-segment"
          style={{
            marginTop: '0px',
            height: `${animatedHeights[index]}px`,
            backgroundColor: 'rgb(255, 255, 255)',
            transition: '0.1s',
            width: `${100 / waveSegments.length}%`
          }}
        ></div>
      ))}
    </div>
  );
};

export default WaveFooter;
