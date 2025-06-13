import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Users, FileText, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const PrivacyPolicyPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const sections = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Information We Collect",
      content: [
        "Personal information you provide when contacting us (name, email, phone number)",
        "Information submitted through our application forms",
        "Website usage data and analytics (anonymized)",
        "Cookies and similar tracking technologies for website functionality"
      ]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "How We Use Your Information",
      content: [
        "To respond to your inquiries and provide requested information",
        "To process student applications and enrollment",
        "To improve our website and educational services",
        "To send important updates about our school (with your consent)"
      ]
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Information Protection",
      content: [
        "We implement appropriate security measures to protect your data",
        "Personal information is stored securely and access is limited",
        "We do not sell, trade, or rent your personal information to third parties",
        "Data is retained only as long as necessary for legitimate purposes"
      ]
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Third-Party Services",
      content: [
        "Google Analytics for website analytics (anonymized data)",
        "Cal.com for appointment scheduling",
        "Paystack for secure donation processing",
        "Social media platforms for content sharing"
      ]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Your Rights",
      content: [
        "Request access to your personal information",
        "Request correction of inaccurate data",
        "Request deletion of your personal information",
        "Opt-out of marketing communications at any time"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <SEOHead
        title="Privacy Policy | St. Louis Demonstration JHS"
        description="Learn about our privacy practices and data protection policies at St. Louis Demonstration JHS. We are committed to protecting your personal information and ensuring secure interactions with our website and services."
        keywords="privacy policy, data protection, personal information, website privacy, school privacy, data security, information protection"
        url="/privacy-policy"
        type="website"
        pageType="legal"
        useGalleryImages={true}
      />
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-4 pt-20 border-b border-blue-700/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm backdrop-blur-sm border border-blue-500/30"
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
                <Shield className="w-8 h-8 text-blue-300" />
              </motion.div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Privacy Policy
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
          <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Your Privacy</h2>
          <p className="text-gray-300 leading-relaxed">
            At St. Louis Demonstration Junior High School, we are committed to protecting your privacy and ensuring
            the security of your personal information. This Privacy Policy explains how we collect, use, and protect
            your information when you visit our website or interact with our services.
          </p>
          <div className="mt-4 p-4 bg-blue-900/30 border border-blue-700/50 rounded-lg">
            <p className="text-blue-200 text-sm">
              <strong>Last Updated:</strong> June {new Date().getFullYear()} |
              <strong> Effective Date:</strong> June 1, {new Date().getFullYear()}
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
                <div className="p-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-blue-300">
                  {section.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <ul className="space-y-2">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-3 text-gray-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6 mt-8"
        >
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-300" />
            Contact Us About Privacy
          </h3>
          <p className="text-gray-300 mb-4">
            If you have any questions about this Privacy Policy or how we handle your personal information,
            please contact us:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">School Administration</h4>
              <p className="text-gray-300 text-sm">
                St. Louis Demonstration Junior High School<br />
                Suame Mbrom, Ashanti Region, Ghana<br />
                Email: info@stlouisdemojhs.com
              </p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Data Protection</h4>
              <p className="text-gray-300 text-sm">
                For privacy-related inquiries:<br />
                Email: privacy@stlouisdemojhs.com<br />
                Response time: 48-72 hours
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
            This Privacy Policy may be updated from time to time. We will notify you of any significant changes
            by posting the new Privacy Policy on this page with an updated effective date.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
