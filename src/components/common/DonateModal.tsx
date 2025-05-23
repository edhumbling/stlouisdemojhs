import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, GraduationCap, Users, Laptop } from 'lucide-react';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Support St. Louis Demonstration JHS</h2>
                  <p className="text-green-100 text-sm">Help us modernize education for the AI era</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-[calc(90vh-80px)]">
              {/* Left side - Information */}
              <div className="lg:w-2/5 p-6 bg-gray-50 overflow-y-auto">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Impact Matters</h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-green-100 rounded-full flex-shrink-0">
                      <Laptop className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Modern Technology</h4>
                      <p className="text-sm text-gray-600">Support the integration of AI and modern educational technologies to prepare students for the future.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full flex-shrink-0">
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Teacher Development</h4>
                      <p className="text-sm text-gray-600">Help us provide professional development and resources for our dedicated teaching staff.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full flex-shrink-0">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Student Progress</h4>
                      <p className="text-sm text-gray-600">Enable faster academic progress through improved facilities and learning resources.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-900 mb-2">Alumni & Community</h4>
                  <p className="text-sm text-green-700">
                    Join fellow alumni and community members in supporting the next generation of leaders.
                    Every contribution, no matter the size, makes a difference in modernizing our beloved school.
                  </p>
                </div>

                <div className="mt-4 text-xs text-gray-500">
                  <p>🔒 Secure payment powered by Paystack</p>
                  <p>💳 All major payment methods accepted</p>
                </div>
              </div>

              {/* Right side - Donation Form */}
              <div className="lg:w-3/5 relative bg-white">
                <iframe
                  src="https://paystack.shop/pay/stlouisjhsdonations"
                  className="w-full h-full border-0 bg-white"
                  title="Donation Form"
                  allow="payment *"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
                  loading="lazy"
                  onLoad={(e) => {
                    const loadingOverlay = e.currentTarget.nextElementSibling as HTMLElement;
                    if (loadingOverlay) {
                      loadingOverlay.style.display = 'none';
                    }
                  }}
                />

                {/* Loading overlay */}
                <div className="absolute inset-0 bg-white flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-2"></div>
                    <p className="text-gray-600 text-sm">Loading secure donation form...</p>
                    <p className="text-gray-500 text-xs mt-1">Powered by Paystack</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DonateModal;
