import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({ isOpen, onClose }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const confettiRef = useRef<HTMLDivElement>(null);

  // Playlist of songs
  const playlist = [
    'https://ik.imagekit.io/edhumbling/20th%20Century%20Fox.mp3',
    'https://ik.imagekit.io/edhumbling/King%20Paluta%20-%20Aseda%20Mp3%20Download%20_%20TrendyBeatz.mp3'
  ];

  // Array of graduation images
  const graduationImages = [
    'https://ik.imagekit.io/edhumbling/a-celebratory-graduation-greeting-card-c_0OzMAirqSGCcwMEP_3NWSA_0OIWsY8GSIS-MA7CeXABkQ.jpeg',
    'https://ik.imagekit.io/edhumbling/a-celebratory-graduation-greeting-card-f_axyzHKcDSVK5pTQ0ne5g5w_0IYqG1rKSIyiHJEdAFlUwg.jpeg',
    'https://ik.imagekit.io/edhumbling/a-celebratory-graduation-card-for-the-cl_hi2O_6vFRn6rM6l0axMDiQ_Nql0ou6-SXqXEG4Jiv4QQg.jpeg',
    'https://ik.imagekit.io/edhumbling/a-celebratory-graduation-greeting-card-h_aCjmYmUQT1iWBEdPqEjS_A_Nql0ou6-SXqXEG4Jiv4QQg.jpeg'
  ];

  // Initialize audio and confetti when modal opens
  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.volume = 1.0; // Set to 100% volume
      audioRef.current.src = playlist[currentSong];
      audioRef.current.play().catch(console.error);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [isOpen, currentSong]);

  // Handle song end - play next song in playlist
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleSongEnd = () => {
      // Move to next song, loop back to first song after last one
      setCurrentSong((prev) => (prev + 1) % playlist.length);
    };

    audio.addEventListener('ended', handleSongEnd);

    return () => {
      audio.removeEventListener('ended', handleSongEnd);
    };
  }, [playlist.length]);

  // Handle image sliding - change image every 4 seconds
  useEffect(() => {
    if (!isOpen) return;

    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % graduationImages.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(imageInterval);
  }, [isOpen, graduationImages.length]);

  // Handle mute/unmute
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Generate confetti particles
  const generateConfetti = () => {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const shapes = ['circle', 'square', 'triangle'];

    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      size: Math.random() * 8 + 4,
      initialX: Math.random() * 100,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
      rotation: Math.random() * 360,
    }));
  };

  const confettiParticles = generateConfetti();

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 p-4"
        onClick={handleBackdropClick}
        style={{ top: '0px' }}
      >
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />

        {/* Confetti Container */}
        <div ref={confettiRef} className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute"
              style={{
                left: `${particle.initialX}%`,
                top: '-10px',
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: particle.color,
                borderRadius: particle.shape === 'circle' ? '50%' : '0%',
                transform: `rotate(${particle.rotation}deg)`,
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.random() * 200 - 100],
                rotate: [particle.rotation, particle.rotation + 360],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* Modal Content */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.5, opacity: 0, y: 50 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors duration-200"
          >
            <X size={24} />
          </button>

          {/* Mute/Unmute Button */}
          <button
            onClick={toggleMute}
            className="absolute top-4 left-4 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-colors duration-200"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          {/* Graduation Flyer Images - Sliding */}
          <div className="relative overflow-hidden">
            <div className="relative w-full h-auto">
              {graduationImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`Congratulatory Graduation Message ${index + 1}`}
                  className="w-full h-auto object-contain rounded-t-2xl"
                  style={{
                    position: index === 0 ? 'relative' : 'absolute',
                    top: index === 0 ? 'auto' : '0',
                    left: index === 0 ? 'auto' : '0',
                  }}
                  initial={{ opacity: index === 0 ? 1 : 0, scale: 1 }}
                  animate={{
                    opacity: index === currentImage ? 1 : 0,
                    scale: index === currentImage ? 1 : 0.95,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Sparkle Effects on Image */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 20 }, (_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-yellow-300 text-2xl"
                  style={{
                    left: `${Math.random() * 90 + 5}%`,
                    top: `${Math.random() * 90 + 5}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: Math.random() * 2,
                    repeat: Infinity,
                    repeatDelay: Math.random() * 3,
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {graduationImages.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Announcement Section */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                🎉 Premium Website Launch! 🎉
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                We are officially launching our premium school website today!
              </p>
              <p className="text-base text-gray-600 mb-6">
                Enjoy the enhanced features, improved design, and better user experience! 🚀
              </p>

              {/* Celebration Emojis */}
              <div className="flex justify-center space-x-2 text-3xl mb-4">
                <motion.span
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
                >
                  🎓
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.7 }}
                >
                  🎊
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3 }}
                >
                  🎈
                </motion.span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1], rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.9 }}
                >
                  🏆
                </motion.span>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Continue to Website ✨
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Background Audio */}
        <audio
          ref={audioRef}
          preload="auto"
          className="hidden"
        >
          {/* Source will be set dynamically via JavaScript */}
        </audio>
      </motion.div>
    </AnimatePresence>
  );
};

export default CelebrationModal;
