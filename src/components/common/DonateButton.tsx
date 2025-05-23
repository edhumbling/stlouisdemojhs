import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DonateButtonProps {
  variant?: 'header' | 'footer' | 'standalone';
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({
  variant = 'standalone',
  className = ''
}) => {

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 relative overflow-hidden";

  const variantClasses = {
    header: "px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl rounded-full md:rounded-lg md:px-4 md:py-2 md:text-sm shadow-red-500/50 hover:shadow-red-500/70",
    footer: "px-6 py-3 text-base bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl rounded-full shadow-red-500/50 hover:shadow-red-500/70",
    standalone: "px-8 py-4 text-lg bg-red-600 hover:bg-red-700 text-white shadow-xl hover:shadow-2xl rounded-full shadow-red-500/50 hover:shadow-red-500/70"
  };

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
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      >
        <Heart className={`${variant === 'header' ? 'w-3 h-3 md:w-4 md:h-4' : 'w-4 h-4'} mr-2 fill-current relative z-10`} />
        <span className="relative z-10">Donate</span>

        {/* Red glowing effect */}
        <span className="absolute inset-0 bg-red-400 opacity-30 animate-pulse rounded-full md:rounded-lg"></span>
        <span className="absolute inset-0 bg-red-300 opacity-20 animate-ping rounded-full md:rounded-lg" style={{ animationDelay: '0.5s' }}></span>
        <span className="absolute -inset-1 bg-red-500 opacity-20 blur-sm animate-pulse rounded-full md:rounded-lg"></span>
      </Link>
    </motion.div>
  );
};

export default DonateButton;
