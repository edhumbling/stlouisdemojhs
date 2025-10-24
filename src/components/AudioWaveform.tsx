import React, { useEffect, useState } from 'react';

interface AudioWaveformProps {
  isActive: boolean;
}

const AudioWaveform: React.FC<AudioWaveformProps> = ({ isActive }) => {
  const [bars, setBars] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setBars([]);
      return;
    }

    // Generate random waveform data
    const generateBars = () => {
      const newBars = Array.from({ length: 20 }, () => Math.random() * 100);
      setBars(newBars);
    };

    // Initial bars
    generateBars();

    // Update bars every 100ms for animation
    const interval = setInterval(generateBars, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  if (!isActive) {
    return (
      <div className="flex items-center w-full h-6">
        <div className="w-full h-px bg-white/20"></div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full h-6 gap-0.5">
      {bars.map((height, index) => (
        <div
          key={index}
          className="bg-white/80 rounded-sm transition-all duration-75 ease-in-out"
          style={{
            width: '2px',
            height: `${Math.max(height, 10)}%`,
            minHeight: '2px',
            maxHeight: '20px',
          }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;