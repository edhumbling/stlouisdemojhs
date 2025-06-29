import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, Star, ThumbsUp, ThumbsDown, Lightbulb, X, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

interface FeedbackItem {
  category: string;
  satisfaction: 'satisfied' | 'dissatisfied';
  icon: string;
}

const GiveFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<FeedbackItem[]>([]);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const categories = [
    { name: 'Website Design', icon: '🎨' },
    { name: 'Navigation', icon: '🧭' },
    { name: 'Content Quality', icon: '📚' },
    { name: 'Video Experience', icon: '🎥' },
    { name: 'Mobile Experience', icon: '📱' },
    { name: 'Loading Speed', icon: '⚡' },
    { name: 'STEM Resources', icon: '🔬' },
    { name: 'TVET Content', icon: '🛠️' },
    { name: 'Robotics Section', icon: '🤖' },
    { name: 'Space Exploration', icon: '🚀' },
    { name: 'Search Function', icon: '🔍' },
    { name: 'Overall Experience', icon: '⭐' }
  ];

  const toggleCategory = (categoryName: string, satisfaction: 'satisfied' | 'dissatisfied', icon: string) => {
    setSelectedCategories(prev => {
      const existingIndex = prev.findIndex(item => item.category === categoryName);
      
      if (existingIndex >= 0) {
        // If category exists, update satisfaction or remove if same
        const existing = prev[existingIndex];
        if (existing.satisfaction === satisfaction) {
          // Remove if clicking same satisfaction level
          return prev.filter((_, index) => index !== existingIndex);
        } else {
          // Update satisfaction level
          const updated = [...prev];
          updated[existingIndex] = { category: categoryName, satisfaction, icon };
          return updated;
        }
      } else {
        // Add new category
        return [...prev, { category: categoryName, satisfaction, icon }];
      }
    });
  };

  const removeCategory = (categoryName: string) => {
    setSelectedCategories(prev => prev.filter(item => item.category !== categoryName));
  };

  const handleSubmit = async () => {
    if (selectedCategories.length === 0 && !note.trim()) {
      alert('Please select at least one category or provide a note before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Prepare feedback message
    let message = "Hey Emmanuel, I have feedback from St. Louis Demo JHS website:\n\n";
    
    if (selectedCategories.length > 0) {
      message += "📊 CATEGORY FEEDBACK:\n";
      selectedCategories.forEach(item => {
        const emoji = item.satisfaction === 'satisfied' ? '😊' : '😞';
        message += `${item.icon} ${item.category}: ${emoji} ${item.satisfaction.toUpperCase()}\n`;
      });
      message += "\n";
    }

    if (note.trim()) {
      message += "💭 ADDITIONAL NOTES:\n";
      message += note.trim() + "\n\n";
    }

    message += "📅 Submitted: " + new Date().toLocaleString();

    // Encode message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/233208705290?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    setShowSuccess(true);
    
    // Reset form after delay
    setTimeout(() => {
      setSelectedCategories([]);
      setNote('');
      setIsSubmitting(false);
      setShowSuccess(false);
    }, 3000);
  };

  return (
    <>
      <SEOHead
        title="Give Feedback - Share Your Ideas & Suggestions - St. Louis Demo JHS"
        description="Share your feedback, ideas, and suggestions to help us improve the St. Louis Demo JHS website. Your input matters and helps us create a better learning experience."
        keywords="feedback, suggestions, ideas, student feedback, website improvement, user experience, St. Louis Demo JHS"
        canonical="https://stlouisdemojhs.com/givefeedback"
        ogImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />
      
      <div className="min-h-screen bg-black text-white">
        <Header />

        {/* Back Navigation Bar */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-2 sm:py-3 md:py-4 sticky top-16 z-40">
          <div className="w-full px-3 sm:px-4 md:px-6">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-md sm:rounded-lg shadow-md hover:shadow-lg sm:hover:shadow-xl transition-all duration-300 text-xs sm:text-sm md:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
              >
                <ArrowLeft size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
                💬 Give Feedback
              </h1>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-3 sm:px-4 py-6 sm:py-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-4">
              <MessageCircle size={32} className="sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              Your Voice Matters! 🎯
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Help us improve your learning experience by sharing what you love, what needs improvement, or new ideas you'd like to see implemented.
            </p>
          </div>

          {/* Feedback Form */}
          <div className="max-w-4xl mx-auto">
            {/* Category Selection */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-400" />
                Rate Your Experience
              </h3>
              <p className="text-sm text-gray-400 mb-6">
                Click 😊 if you're satisfied or 😞 if you're dissatisfied with each category:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const selected = selectedCategories.find(item => item.category === category.name);
                  
                  return (
                    <div key={category.name} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{category.icon}</span>
                          <span className="text-sm sm:text-base font-medium text-white">{category.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleCategory(category.name, 'satisfied', category.icon)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md transition-all duration-200 text-sm ${
                            selected?.satisfaction === 'satisfied'
                              ? 'bg-green-600 text-white shadow-lg'
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          }`}
                        >
                          <ThumbsUp size={16} />
                          <span>😊</span>
                        </button>
                        
                        <button
                          onClick={() => toggleCategory(category.name, 'dissatisfied', category.icon)}
                          className={`flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-md transition-all duration-200 text-sm ${
                            selected?.satisfaction === 'dissatisfied'
                              ? 'bg-red-600 text-white shadow-lg'
                              : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                          }`}
                        >
                          <ThumbsDown size={16} />
                          <span>😞</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-400" />
                  Your Feedback Summary
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCategories.map((item) => (
                    <div
                      key={item.category}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                        item.satisfaction === 'satisfied'
                          ? 'bg-green-600/20 text-green-300 border border-green-500/30'
                          : 'bg-red-600/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.category}</span>
                      <span>{item.satisfaction === 'satisfied' ? '😊' : '😞'}</span>
                      <button
                        onClick={() => removeCategory(item.category)}
                        className="ml-1 hover:bg-white/10 rounded-full p-0.5 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Notes */}
            <div className="mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                Additional Ideas & Suggestions
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share your ideas, suggestions, or any specific feedback you'd like us to know about..."
                className="w-full h-32 sm:h-40 px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base"
                maxLength={500}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {note.length}/500 characters
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (selectedCategories.length === 0 && !note.trim())}
                className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  isSubmitting || (selectedCategories.length === 0 && !note.trim())
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Feedback via WhatsApp</span>
                  </>
                )}
              </button>
            </div>

            {/* Success Message */}
            {showSuccess && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-8 text-center max-w-md mx-auto">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Thank You! 🎉</h3>
                  <p className="text-white/90 text-sm">
                    Your feedback has been sent to Emmanuel via WhatsApp. We appreciate your input and will work on improvements!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GiveFeedbackPage;
