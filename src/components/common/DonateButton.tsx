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

  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";

  const variantClasses = {
    header: "px-3 py-1.5 text-xs bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    footer: "px-6 py-3 text-base bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    standalone: "px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl"
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
        className={`${baseClasses} ${variantClasses[variant]} ${className} relative overflow-hidden`}
      >
        <Heart className={`${variant === 'header' ? 'w-3 h-3' : 'w-4 h-4'} mr-2 fill-current`} />
        <span>Donate</span>

        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 animate-ping"></span>
      </Link>
    </motion.div>
  );
};

export default DonateButton;
