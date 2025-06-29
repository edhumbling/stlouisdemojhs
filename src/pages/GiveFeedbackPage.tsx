import React, { useState } from 'react';
import { ArrowLeft, Send, MessageCircle, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';
import Header from '../components/layout/Header';

interface FeedbackItem {
  emoji: string;
  emojiLabel: string;
}

const GiveFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedEmoji, setSelectedEmoji] = useState<FeedbackItem | null>(null);
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const emojiOptions = [
    { emoji: '😍', label: 'Love it' },
    { emoji: '😊', label: 'Satisfied' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '😞', label: 'Dissatisfied' },
    { emoji: '😡', label: 'Hate it' }
  ];

  const selectEmoji = (emoji: string, emojiLabel: string) => {
    setSelectedEmoji({ emoji, emojiLabel });
  };

  const handleSubmit = async () => {
    if (!selectedEmoji && !note.trim()) {
      alert('Please select an emoji or provide feedback before submitting.');
      return;
    }

    setIsSubmitting(true);

    // Prepare feedback message
    let message = "Hey Emmanuel, I have feedback from St. Louis Demo JHS website:\n\n";

    if (selectedEmoji) {
      message += `� OVERALL RATING: ${selectedEmoji.emoji} ${selectedEmoji.emojiLabel.toUpperCase()}\n\n`;
    }

    if (note.trim()) {
      message += "💭 FEEDBACK DETAILS:\n";
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
      setSelectedEmoji(null);
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
        image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Hide Footer with CSS and Scrollbar Styling */}
      <style>{`
        footer { display: none !important; }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white">
        <Header />

        {/* Back Bar - Same as AI Page */}
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-green-500/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                💬 Give Feedback
              </h1>
            </div>
          </div>
        </div>

        {/* Hero Header Section with Background Image - No Gap */}
        <div
          className="relative h-48 sm:h-64 md:h-72 overflow-hidden"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1684688287578-dxdcmbbbs5ym?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="relative h-full flex items-center justify-center px-3 sm:px-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mb-3">
                <MessageCircle size={24} className="sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                Your Voice Matters! 🎯
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-gray-200 max-w-xl mx-auto leading-relaxed">
                Help us improve your learning experience by sharing what you love, what needs improvement, or new ideas you'd like to see implemented.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content - Simple Layout */}
        <div className="w-full px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto">

            {/* Cute Scrollable Emoji Selection */}
            <div className="mb-8 text-center">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
                How do you feel about our website? 😊
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-4">
                Select an emoji that best describes your experience:
              </p>

              {/* Mobile: Horizontal Scrollable, Desktop: Centered Row */}
              <div className="mb-4">
                <div className="flex sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 px-4 sm:px-0 scrollbar-hide">
                  {emojiOptions.map((option) => (
                    <button
                      key={option.emoji}
                      onClick={() => selectEmoji(option.emoji, option.label)}
                      className={`flex-shrink-0 flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 rounded-xl transition-all duration-200 min-w-[70px] sm:min-w-[80px] ${
                        selectedEmoji?.emoji === option.emoji
                          ? 'bg-blue-600 text-white shadow-lg scale-105 sm:scale-110'
                          : 'bg-gray-900/50 hover:bg-gray-800 hover:scale-105'
                      }`}
                      title={option.label}
                    >
                      <span className="text-xl sm:text-2xl">{option.emoji}</span>
                      <span className="text-xs font-medium text-center leading-tight">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {selectedEmoji && (
                <div className="text-center text-blue-300 font-medium text-sm">
                  You selected: {selectedEmoji.emoji} {selectedEmoji.emojiLabel}
                </div>
              )}
            </div>

            {/* Bigger Feedback Box */}
            <div className="mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                Tell us more about your experience
              </h3>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Share your thoughts, ideas, suggestions, or any feedback you'd like us to know about. What did you love? What could be improved? Any new features you'd like to see?"
                className="w-full h-48 sm:h-56 px-4 py-4 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-sm sm:text-base leading-relaxed"
                maxLength={1000}
              />
              <div className="text-right text-xs text-gray-500 mt-2">
                {note.length}/1000 characters
              </div>
            </div>

            {/* Submit Button - Super Small & Cute */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (!selectedEmoji && !note.trim())}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-green-600 text-white cursor-wait'
                    : (!selectedEmoji && !note.trim())
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white shadow-md hover:shadow-lg hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Feedback</span>
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
