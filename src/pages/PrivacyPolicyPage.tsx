import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
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
              Privacy Policy
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
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              St. Louis Demonstration Junior High School is committed to protecting your privacy and personal information.
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

              {/* Introduction */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-blue-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">1. Introduction</h2>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed">
                    St. Louis Demonstration Junior High School ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you visit our website <strong>stlouisdemojhs.com</strong> or interact with our educational services.
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    This policy applies to all visitors, students, parents, staff, and anyone who interacts with our website or educational services. By using our website, you consent to the practices described in this policy.
                  </p>
                </div>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">2. Information We Collect</h2>
                </div>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-green-800 mb-3">Personal Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Student Information:</strong> Names, dates of birth, contact details, academic records, attendance data</li>
                      <li><strong>Parent/Guardian Information:</strong> Names, contact details, emergency contacts, relationship to student</li>
                      <li><strong>Contact Forms:</strong> Name, email address, phone number, message content</li>
                      <li><strong>Application Data:</strong> Information submitted through our online application forms</li>
                      <li><strong>Communication Records:</strong> Emails, phone calls, and other communications with our school</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-blue-800 mb-3">Technical Information</h3>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Website Usage:</strong> IP addresses, browser type, device information, pages visited</li>
                      <li><strong>Cookies:</strong> Session cookies for website functionality and user preferences</li>
                      <li><strong>Analytics Data:</strong> Website traffic patterns, user behavior, and performance metrics</li>
                      <li><strong>Security Logs:</strong> Access logs and security-related information</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* How We Use Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 text-purple-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">3. How We Use Your Information</h2>
                </div>
                <div className="bg-purple-50 rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Educational Purposes</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Student enrollment and registration</li>
                        <li>Academic record management</li>
                        <li>Progress tracking and reporting</li>
                        <li>Parent-teacher communication</li>
                        <li>Educational program delivery</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-purple-800 mb-3">Administrative Purposes</h3>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                        <li>Website operation and maintenance</li>
                        <li>Responding to inquiries</li>
                        <li>Processing applications</li>
                        <li>Legal compliance</li>
                        <li>Security and fraud prevention</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Information Sharing */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-orange-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">4. Information Sharing and Disclosure</h2>
                </div>
                <div className="bg-orange-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">We do not sell, trade, or rent your personal information to third parties. We may share information only in the following circumstances:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Educational Partners:</strong> With authorized educational service providers for legitimate educational purposes</li>
                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                    <li><strong>Safety Concerns:</strong> To protect the safety and security of students, staff, or the public</li>
                    <li><strong>Parent/Guardian Access:</strong> Student information shared with authorized parents/guardians</li>
                    <li><strong>Service Providers:</strong> With trusted third-party service providers who assist in website operation (under strict confidentiality agreements)</li>
                  </ul>
                </div>
              </motion.div>

              {/* Data Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-red-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">5. Data Security</h2>
                </div>
                <div className="bg-red-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">We implement appropriate technical and organizational measures to protect your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Technical Measures</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>SSL encryption for data transmission</li>
                        <li>Secure server infrastructure</li>
                        <li>Regular security updates</li>
                        <li>Access controls and authentication</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-2">Organizational Measures</h4>
                      <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                        <li>Staff training on data protection</li>
                        <li>Limited access on need-to-know basis</li>
                        <li>Regular security assessments</li>
                        <li>Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-indigo-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">6. Your Rights</h2>
                </div>
                <div className="bg-indigo-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">You have the following rights regarding your personal information:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Access:</strong> Request copies of your personal data</li>
                      <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                      <li><strong>Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-700 space-y-2">
                      <li><strong>Portability:</strong> Request transfer of your data</li>
                      <li><strong>Objection:</strong> Object to processing of your personal data</li>
                      <li><strong>Restriction:</strong> Request restriction of processing</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900">7. Contact Us</h2>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-4">If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:</p>
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

              {/* Updates */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mb-8"
              >
                <div className="bg-gray-100 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">8. Changes to This Policy</h3>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
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

export default PrivacyPolicyPage;
