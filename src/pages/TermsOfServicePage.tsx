import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, Users, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              Terms of Service
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-green-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Please read these terms carefully before using our website and educational services.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
              <p className="text-sm text-blue-800">
                <strong>Last Updated:</strong> January 2025<br />
                <strong>Effective Date:</strong> January 2025
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">

              {/* Acceptance of Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Acceptance of Terms</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    By accessing and using the St. Louis Demonstration Junior High School website (<strong>stlouisdemojhs.com</strong>) and our educational services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    These Terms of Service ("Terms") govern your use of our website, educational programs, and related services provided by St. Louis Demonstration Junior High School ("School," "we," "us," or "our").
                  </p>
                </div>
              </motion.div>

              {/* Use of Website */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Use of Website and Services</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Permitted Uses</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Accessing information about our educational programs and services</li>
                      <li>Submitting applications for student enrollment</li>
                      <li>Communicating with school administration and staff</li>
                      <li>Participating in authorized educational activities</li>
                      <li>Accessing student portals and educational resources (with proper authorization)</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-red-800 mb-3">Prohibited Uses</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li>Using the website for any unlawful purpose or to solicit unlawful activity</li>
                      <li>Attempting to gain unauthorized access to any portion of the website</li>
                      <li>Interfering with or disrupting the website's operation or servers</li>
                      <li>Transmitting viruses, malware, or other harmful code</li>
                      <li>Harassing, threatening, or impersonating others</li>
                      <li>Violating any applicable laws or regulations</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Educational Services */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. Educational Services</h2>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 mb-2">Student Enrollment</h3>
                      <p className="text-gray-700 text-sm">
                        Enrollment in our educational programs is subject to availability, admission requirements, and payment of applicable fees. We reserve the right to refuse admission or terminate enrollment for academic, disciplinary, or administrative reasons.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 mb-2">Academic Standards</h3>
                      <p className="text-gray-700 text-sm">
                        Students are expected to maintain academic and behavioral standards as outlined in our student handbook. Failure to meet these standards may result in academic probation or dismissal.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 mb-2">Fees and Payments</h3>
                      <p className="text-gray-700 text-sm">
                        All fees must be paid according to the published schedule. Late payments may result in additional charges or suspension of services.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Scale className="w-6 h-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Intellectual Property</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    The content, organization, graphics, design, compilation, magnetic translation, digital conversion, and other matters related to the website are protected under applicable copyrights, trademarks, and other proprietary rights.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>All content on this website is the property of St. Louis Demonstration JHS or its licensors</li>
                    <li>You may not reproduce, distribute, or create derivative works without written permission</li>
                    <li>Educational materials are provided for authorized educational use only</li>
                    <li>School logos, trademarks, and branding elements are protected intellectual property</li>
                  </ul>
                </div>
              </motion.div>

              {/* Disclaimers */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Disclaimers and Limitations</h2>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Website Availability</h3>
                      <p className="text-gray-700 text-sm">
                        We strive to maintain website availability but do not guarantee uninterrupted access. The website may be temporarily unavailable due to maintenance, updates, or technical issues.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Information Accuracy</h3>
                      <p className="text-gray-700 text-sm">
                        While we make every effort to ensure information accuracy, we do not warrant that all information is complete, current, or error-free. Users should verify important information independently.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-red-800 mb-2">Third-Party Links</h3>
                      <p className="text-gray-700 text-sm">
                        Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of service of external sites.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Privacy and Data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Privacy and Data Protection</h2>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    Your privacy is important to us. Our collection, use, and protection of personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>We collect only necessary information for educational and administrative purposes</li>
                    <li>Student records are protected under applicable educational privacy laws</li>
                    <li>We implement appropriate security measures to protect personal data</li>
                    <li>You have rights regarding your personal information as outlined in our Privacy Policy</li>
                  </ul>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">7. Termination</h2>
                </div>
                <div className="bg-yellow-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">
                    We reserve the right to terminate or suspend access to our website and services at any time, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Grounds for Termination</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Violation of these Terms</li>
                        <li>Fraudulent or illegal activity</li>
                        <li>Harassment of other users</li>
                        <li>Misuse of school resources</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-yellow-800 mb-2">Effect of Termination</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Immediate loss of access</li>
                        <li>Termination of services</li>
                        <li>Survival of certain provisions</li>
                        <li>No refund of fees paid</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Governing Law */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Scale className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">8. Governing Law</h2>
                </div>
                <div className="bg-blue-50 rounded-lg p-6">
                  <p className="text-gray-700">
                    These Terms shall be governed by and construed in accordance with the laws of Ghana. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Ghana.
                  </p>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">9. Contact Information</h2>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">If you have questions about these Terms of Service, please contact us:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">School Administration</h4>
                      <div className="space-y-2 text-gray-700">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          <span>support@stlouisdemojhs.com</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>📱 0244758575 / 0244730726</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Mailing Address</h4>
                      <p className="text-gray-700">
                        St. Louis Demonstration JHS<br />
                        P.O. Box 3041<br />
                        Kumasi, Ashanti Region<br />
                        Ghana
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Changes to Terms */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mb-8"
              >
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">10. Changes to Terms</h3>
                  <p className="text-gray-700">
                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this website. Your continued use of the website after changes are posted constitutes acceptance of the modified Terms.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfServicePage;
