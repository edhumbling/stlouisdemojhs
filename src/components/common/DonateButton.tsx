import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import DonateModal from './DonateModal';

interface DonateButtonProps {
  variant?: 'header' | 'footer' | 'standalone';
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ 
  variant = 'standalone', 
  className = '' 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2";
  
  const variantClasses = {
    header: "px-4 py-2 text-sm bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    footer: "px-6 py-3 text-base bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl",
    standalone: "px-8 py-4 text-lg bg-green-600 hover:bg-green-700 text-white shadow-xl hover:shadow-2xl"
  };

  return (
    <>
      <motion.button
        onClick={openModal}
        className={`${baseClasses} ${variantClasses[variant]} ${className}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className="w-4 h-4 mr-2 fill-current" />
        <span>Donate</span>
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 animate-ping"></span>
      </motion.button>

      <DonateModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default DonateButton;
