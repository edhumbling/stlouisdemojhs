import React from 'react';
import { motion } from 'framer-motion';
import { Heart, GraduationCap, Users, Laptop, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

const DonationPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-blue-700 text-white pt-20 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              to="/" 
              className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center mb-6"
            >
              <div className="p-4 bg-white/20 rounded-full mr-4">
                <Heart className="w-12 h-12" />
              </div>
              <div className="text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">Support Our School</h1>
                <p className="text-xl text-green-100">Help us modernize education for the AI era</p>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-green-100 max-w-3xl mx-auto"
            >
              Join our alumni and community in supporting the next generation of leaders at 
              St. Louis Demonstration Junior High School. Your contribution helps us integrate 
              modern technology and prepare students for the future.
            </motion.p>
          </div>
        </div>
      </section>
      
      <SectionDivider position="bottom" />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-8">
              
              {/* Left side - Information */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Impact Matters</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-full flex-shrink-0">
                        <Laptop className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Modern Technology Integration</h3>
                        <p className="text-gray-600">Support the integration of AI and modern educational technologies to prepare students for the digital future. Help us equip classrooms with smart boards, computers, and learning software.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-full flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Teacher Development</h3>
                        <p className="text-gray-600">Help us provide professional development opportunities, training programs, and resources for our dedicated teaching staff to enhance their skills in modern pedagogy.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-full flex-shrink-0">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Student Progress & Facilities</h3>
                        <p className="text-gray-600">Enable faster academic progress through improved facilities, modern laboratories, library resources, and learning materials that support the NaCCA-based Common Core Programme.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-green-50 p-6 rounded-xl border border-green-200"
                >
                  <h3 className="font-semibold text-green-900 mb-3">Alumni & Community Support</h3>
                  <p className="text-green-700 mb-4">
                    Join fellow alumni and community members in supporting our beloved school. 
                    Every contribution, no matter the size, makes a meaningful difference in 
                    modernizing education and maintaining our reputation as "The Best Amongst the Rest."
                  </p>
                  <div className="text-sm text-green-600 space-y-1">
                    <p>🔒 Secure payment powered by Paystack</p>
                    <p>💳 All major payment methods accepted</p>
                    <p>📧 Donation receipts provided</p>
                  </div>
                </motion.div>
              </div>

              {/* Right side - Donation Form */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white">
                    <h3 className="text-xl font-semibold">Make a Donation</h3>
                    <p className="text-green-100 text-sm">Secure payment form powered by Paystack</p>
                  </div>
                  
                  <div className="relative" style={{ height: '600px' }}>
                    <iframe
                      src="https://paystack.shop/pay/stlouisjhsdonations"
                      className="w-full h-full border-0"
                      title="St. Louis Demonstration JHS Donation Form"
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                        <p className="text-gray-600 text-lg font-medium">Loading secure donation form...</p>
                        <p className="text-gray-500 text-sm mt-2">Powered by Paystack</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;
