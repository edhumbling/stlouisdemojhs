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

  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 relative overflow-hidden";

  const variantClasses = {
    header: "px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl rounded-full md:rounded-lg md:px-4 md:py-2 md:text-sm",
    footer: "px-6 py-3 text-base bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl rounded-full",
    standalone: "px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl rounded-full"
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

        {/* Yellow buzzing effect */}
        <span className="absolute inset-0 bg-yellow-400 opacity-20 animate-pulse rounded-full md:rounded-lg"></span>
        <span className="absolute inset-0 bg-yellow-300 opacity-10 animate-ping rounded-full md:rounded-lg" style={{ animationDelay: '0.5s' }}></span>
      </Link>
    </motion.div>
  );
};

export default DonateButton;
