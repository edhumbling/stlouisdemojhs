import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

interface DonateButtonProps {
  variant?: 'header' | 'footer' | 'standalone';
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({
  variant = 'standalone',
  className = ''
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    if (variant === 'footer') {
      e.preventDefault();
      // Scroll to top first
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Navigate after a short delay to allow scroll to complete
      setTimeout(() => {
        navigate('/donate');
      }, 300);
    }
  };

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden";

  const variantClasses = {
    header: "px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded-l-full md:rounded-lg md:px-4 md:py-2 md:text-sm",
    footer: "px-6 py-3 text-base bg-red-600 hover:bg-red-700 text-white rounded-full",
    standalone: "px-8 py-4 text-lg bg-red-600 hover:bg-red-700 text-white rounded-full"
  };

  const glowClasses = "shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.4),0_0_60px_rgba(239,68,68,0.2)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8),0_0_50px_rgba(239,68,68,0.6),0_0_75px_rgba(239,68,68,0.4)]";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        to="/donate"
        onClick={handleClick}
        className={`${baseClasses} ${variantClasses[variant]} ${glowClasses} neon-red-glow ${className}`}
      >
        <Heart className={`${variant === 'header' ? 'w-3 h-3 md:w-4 md:h-4' : 'w-4 h-4'} mr-2 fill-current relative z-10 text-white neon-text-glow`} />
        <span className="relative z-10 font-bold text-white neon-text-glow">Donate</span>

        {/* Neon red glowing effect */}
        <span className={`absolute inset-0 bg-red-500 opacity-40 animate-pulse ${variant === 'header' ? 'rounded-l-full md:rounded-lg' : 'rounded-full'}`}></span>
        <span className={`absolute inset-0 bg-red-400 opacity-30 animate-ping ${variant === 'header' ? 'rounded-l-full md:rounded-lg' : 'rounded-full'}`} style={{ animationDelay: '0.5s' }}></span>
        <span className={`absolute -inset-1 bg-red-500 opacity-25 blur-md animate-pulse ${variant === 'header' ? 'rounded-l-full md:rounded-lg' : 'rounded-full'}`} style={{ animationDelay: '1s' }}></span>
        <span className={`absolute -inset-2 bg-red-600 opacity-15 blur-lg animate-pulse ${variant === 'header' ? 'rounded-l-full md:rounded-lg' : 'rounded-full'}`} style={{ animationDelay: '1.5s' }}></span>
      </Link>
    </motion.div>
  );
};

export default DonateButton;
