import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Scale, FileText, Users, AlertTriangle, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const sections = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Acceptance of Terms",
      content: [
        "By accessing our website, you accept and agree to be bound by these terms",
        "These terms govern your use of our website and educational services",
        "If you do not agree to these terms, please do not use our services",
        "Continued use constitutes acceptance of any updates to these terms"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Use of Website",
      content: [
        "You may use our website for lawful educational purposes only",
        "You must not attempt to gain unauthorized access to any part of the website",
        "You must not interfere with or disrupt the website's operation",
        "You must not transmit harmful code or engage in unlawful activities"
      ]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Educational Services",
      content: [
        "Enrollment is subject to availability and admission requirements",
        "Students must maintain academic and behavioral standards",
        "All fees must be paid according to the published schedule",
        "We reserve the right to terminate enrollment for valid reasons"
      ]
    },
    {
      icon: <Scale className="w-6 h-6" />,
      title: "Intellectual Property",
      content: [
        "All website content is protected by copyright and trademark laws",
        "You may not reproduce or distribute content without permission",
        "Educational materials are for authorized educational use only",
        "School logos and branding are protected intellectual property"
      ]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Disclaimers & Limitations",
      content: [
        "We do not guarantee uninterrupted website availability",
        "Information accuracy is not warranted, verify independently",
        "We are not responsible for third-party website content",
        "Services are provided 'as is' without warranties"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 via-purple-800 to-purple-900 py-4 mt-16 border-b border-purple-700/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-700/50 hover:bg-purple-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-purple-500/30"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl"
              >
                <Scale className="w-8 h-8 text-purple-300" />
              </motion.div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Terms of Service
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Terms and Conditions</h2>
          <p className="text-gray-300 leading-relaxed">
            Please read these Terms of Service carefully before using our website and educational services. 
            By accessing or using our services, you agree to be bound by these terms and conditions.
          </p>
          <div className="mt-4 p-4 bg-purple-900/30 border border-purple-700/50 rounded-lg">
            <p className="text-purple-200 text-sm">
              <strong>Last Updated:</strong> June 2025 | 
              <strong> Effective Date:</strong> June 1, 2025
            </p>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-600/20 border border-purple-500/30 rounded-lg text-purple-300">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Legal Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm border border-purple-700/50 rounded-xl p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Scale className="w-5 h-5 text-purple-300" />
            Legal & Contact Information
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Governing Law</h4>
              <p className="text-gray-300 text-sm">
                These terms are governed by the laws of Ghana. Any disputes will be subject to the 
                exclusive jurisdiction of Ghanaian courts.
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Contact for Legal Matters</h4>
              <p className="text-gray-300 text-sm">
                For questions about these terms:<br />
                Email: legal@stlouisdemojhs.com<br />
                Phone: 0244758575
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-8 p-4 bg-gray-800/30 border border-gray-700/30 rounded-lg"
        >
          <p className="text-gray-400 text-sm">
            We reserve the right to modify these Terms of Service at any time. Changes will be effective 
            immediately upon posting. Your continued use constitutes acceptance of the modified terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
