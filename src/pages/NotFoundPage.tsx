import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  // Auto-redirect after 5 seconds
  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-green-700 text-white p-4">
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-white/20"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 5, 0] }}
            transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
            className="text-6xl font-bold mb-4"
          >
            404
          </motion.div>
          <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
          <p className="mb-6">
            The page you're looking for doesn't exist or has been moved.
            You'll be redirected to the homepage in a few seconds.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-yellow-500 text-black font-medium rounded-full shadow-lg hover:bg-yellow-400 transition-all duration-300 text-sm"
            >
              <Home size={16} className="mr-2" />
              Go to Homepage
            </Link>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center px-5 py-2.5 bg-green-600 text-white font-medium rounded-full shadow-lg hover:bg-green-700 transition-all duration-300 text-sm"
            >
              <ArrowLeft size={16} className="mr-2" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1.5px,transparent_1.5px)] [background-size:24px_24px]"></div>
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(45deg,#fff_1px,transparent_1px)] [background-size:30px_30px]"></div>
      </div>
    </div>
  );
};

export default NotFoundPage;
