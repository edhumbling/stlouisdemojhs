import React from 'react';

interface SectionDividerProps {
  position: 'top' | 'bottom';
  className?: string;
  imageUrl?: string;
  flip?: boolean;
}

const SectionDivider: React.FC<SectionDividerProps> = ({
  position = 'bottom',
  className = '',
  imageUrl = 'https://6z76leifsf.ufs.sh/f/L5CIuQd9dw1MqO2sszQQOhZkrEnRa2dswxvNMHPcmT9p0b6z',
  flip = false
}) => {
  return (
    <div 
      className={`w-full overflow-hidden ${position === 'top' ? '-mt-1' : '-mb-1'} ${className}`}
      style={{ 
        height: '30px',
        transform: flip ? 'scaleX(-1)' : 'none'
      }}
    >
      <img
        src={imageUrl}
        alt="Section divider"
        className="w-full h-full object-cover"
        style={{
          objectPosition: position === 'top' ? 'top' : 'bottom',
          transform: position === 'top' ? 'scaleY(-1)' : 'none',
          display: 'block'
        }}
      />
    </div>
  );
};

export default SectionDivider;
