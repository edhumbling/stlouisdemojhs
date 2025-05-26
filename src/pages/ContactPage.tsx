import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SectionDivider from '../components/common/SectionDivider';

// Shimmer Loading Component
const ShimmerLoader: React.FC<{ className?: string; rounded?: string }> = ({
  className = "w-full h-40",
  rounded = "rounded-xl"
}) => (
  <div className={`relative overflow-hidden ${rounded} bg-gray-800 ${className}`}>
    <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-gray-800 via-gray-600 to-gray-800"></div>
  </div>
);

// Optimized Image Component with Shimmer Loading
const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
  shimmerClassName?: string;
}> = ({ src, alt, className, onClick, shimmerClassName }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      {!isLoaded && !hasError && (
        <ShimmerLoader className={shimmerClassName || className} />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        onClick={onClick}
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        style={{ contentVisibility: 'auto' }}
      />
      {hasError && (
        <div className={`${className} bg-gray-800 flex items-center justify-center text-gray-400`}>
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

const ContactPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateUniqueId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `CONTACT-${timestamp}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uniqueId = generateUniqueId();
      const currentDate = new Date().toLocaleString('en-US', {
        timeZone: 'GMT',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      // Create email content with unique prefills
      const emailSubject = `[${uniqueId}] New Contact Form Submission - ${formData.subject}`;
      const emailBody = `
🏫 ST. LOUIS DEMONSTRATION J.H.S - CONTACT FORM SUBMISSION
═══════════════════════════════════════════════════════

📋 SUBMISSION DETAILS:
• Unique ID: ${uniqueId}
• Date & Time: ${currentDate} GMT
• Source: Website Contact Form

👤 CONTACT INFORMATION:
• Name: ${formData.firstName} ${formData.lastName}
• Email: ${formData.email}
• Phone: ${formData.phone || 'Not provided'}
• Subject: ${formData.subject}

💬 MESSAGE:
${formData.message}

═══════════════════════════════════════════════════════
🔗 This message was sent from the St. Louis Demo JHS website contact form.
📧 Please respond directly to: ${formData.email}

Best regards,
St. Louis Demonstration J.H.S Website System
      `.trim();

      // Create mailto link with prefilled content
      const mailtoLink = `mailto:contact@stlouisdemojhs.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show success message
      setIsSubmitted(true);

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      console.error('Error sending message:', error);
      alert('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Back Button and Title Section - Dark Aero */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 py-3 sm:py-4 mt-16 relative">
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-700/50 hover:bg-blue-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl sm:text-3xl"
              >
                📧
              </motion.div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                Contact Us
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 text-white relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Contact Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            >
              We're here to answer your questions and help you learn more about our school.
              Reach out to us through any of the methods below.
            </motion.p>
          </motion.div>
        </div>
      </section>
      <SectionDivider position="bottom" />

      {/* Contact Information - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7111.HEIC?updatedAt=1748185709667&tr=w-1200,h-800,q-60"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover opacity-30"
            shimmerClassName="w-full h-full opacity-30"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/60 to-green-900/40"></div>
        <div className="w-full px-4 sm:px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 md:order-1"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">Contact Information</h2>

              <div className="space-y-5 sm:space-y-6">
                <motion.div
                  className="flex items-start glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/20"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <MapPin size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1">Address</h3>
                    <p className="text-sm sm:text-base text-gray-300">
                      P.O. Box 3041<br />
                      Kumasi, Ashanti Region<br />
                      Ghana
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/20"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Phone size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1">Phone</h3>
                    <p className="text-sm sm:text-base text-gray-300">📱 0244758575</p>
                    <p className="text-sm sm:text-base text-gray-300">📱 0244730726</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/20"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Mail size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1">Email</h3>
                    <p className="text-sm sm:text-base text-gray-300">contact@stlouisdemojhs.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start glass-card p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-white/20"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                >
                  <Clock size={20} className="text-green-400 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-white mb-1">Office Hours</h3>
                    <p className="text-sm sm:text-base text-gray-300">Monday - Friday: 7:00 AM - 4:00 PM (GMT)</p>
                    <p className="text-sm sm:text-base text-gray-300">Saturday: 8:00 AM - 12:00 PM (By appointment only)</p>
                    <p className="text-sm sm:text-base text-gray-300">Sunday: Closed</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 md:order-2 mb-8 md:mb-0"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">Send a Message</h2>

              {/* Success Message */}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-6 rounded-lg mb-6 border border-green-400/30 bg-green-900/20"
                >
                  <div className="flex items-center text-green-400">
                    <CheckCircle className="w-6 h-6 mr-3" />
                    <div>
                      <h3 className="font-semibold text-lg">Message Sent Successfully!</h3>
                      <p className="text-sm text-green-300 mt-1">
                        Your email client should open with a pre-filled message. Please send it to complete your inquiry.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 glass-card p-5 sm:p-6 rounded-lg shadow-md border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="" className="bg-gray-800">Select a subject</option>
                    <option value="Admission Inquiry" className="bg-gray-800">Admission Inquiry</option>
                    <option value="General Information" className="bg-gray-800">General Information</option>
                    <option value="Schedule a Tour" className="bg-gray-800">Schedule a Tour</option>
                    <option value="Employment Opportunities" className="bg-gray-800">Employment Opportunities</option>
                    <option value="Partnership Inquiry" className="bg-gray-800">Partnership Inquiry</option>
                    <option value="Other" className="bg-gray-800">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm sm:text-base"
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center px-6 py-3 font-medium rounded-full shadow-md transition-all duration-300 w-full text-sm sm:text-base ${
                    isSubmitting
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
                  } text-white`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Preparing Email...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" flip={true} />

      {/* Map Section - Dark Aero */}
      <section className="py-8 sm:py-12 md:py-16 relative overflow-hidden">
        {/* Optimized School Background Image */}
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://ik.imagekit.io/humbling/St%20Louis%20Demo%20Jhs/IMG_7097.HEIC?tr=w-1200,h-800,q-70"
            alt="St. Louis Demo JHS Background"
            className="w-full h-full object-cover"
            shimmerClassName="w-full h-full"
          />
        </div>
        {/* Dark Aero Glass Overlay */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/50 to-green-900/40"></div>
        <div className="w-full px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-6 md:mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 md:mb-4">Visit Our Campus</h2>
            <p className="text-sm sm:text-base text-gray-200 px-1">
              We invite you to visit our campus and experience our facilities firsthand.
            </p>
          </motion.div>

          <motion.div
            className="rounded-lg overflow-hidden shadow-xl max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Placeholder for a map with dark aero styling */}
            <div className="glass-card w-full h-64 sm:h-80 md:h-96 flex items-center justify-center border border-white/20">
              <div className="text-center glass-card p-5 rounded-xl shadow-md border border-white/30">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin size={36} className="mx-auto text-green-400 mb-3" />
                </motion.div>
                <p className="text-white font-medium text-sm sm:text-base">
                  P.O. Box 3041, Kumasi, Ashanti Region, Ghana
                </p>
                <p className="text-xs sm:text-sm text-gray-400 mt-2">
                  (Google Maps would be embedded here in a production environment)
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black text-xs sm:text-sm font-medium rounded-full shadow-md hover:from-yellow-400 hover:to-yellow-500 transition-all duration-300"
                >
                  Get Directions
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;