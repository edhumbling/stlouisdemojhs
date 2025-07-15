import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, DollarSign, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../components/seo/SEOHead';

const DonateOneDollarPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDonateOneDollar = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use the live secret key directly for the $1 donation page
      // This is acceptable for this specific use case since it's a fixed amount
      const secretKey = 'sk_live_8586eb2559160b4e7d7337fa8aa6f2f6dcec2273';

      // Initialize payment with Paystack API
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${secretKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'donor@stlouisdemojhs.com', // Default email for $1 donations
          amount: 1500, // $1 USD ≈ 15 GHS = 1500 pesewas
          currency: 'GHS',
          reference: `STLOUIS_1USD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          callback_url: `${window.location.origin}/donation-success`,
          metadata: {
            donor_name: 'Anonymous Supporter',
            donation_type: 'One Dollar Support',
            school_name: 'St. Louis Demonstration JHS',
            amount_usd: 1,
            custom_fields: [
              {
                display_name: 'Donation Type',
                variable_name: 'donation_type',
                value: 'One Dollar Support'
              },
              {
                display_name: 'School',
                variable_name: 'school_name',
                value: 'St. Louis Demonstration JHS'
              },
              {
                display_name: 'Amount (USD)',
                variable_name: 'amount_usd',
                value: '$1.00'
              }
            ]
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status && result.data.authorization_url) {
        // Redirect to Paystack checkout
        window.location.href = result.data.authorization_url;
      } else {
        throw new Error(result.message || 'Failed to initialize payment');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment initialization failed';
      setError(errorMessage);
      console.error('Payment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <SEOHead
        title="Donate Just $1 | Support St. Louis Demonstration JHS"
        description="Make a simple $1 donation to support St. Louis Demonstration JHS. Every dollar helps us provide quality education for our students."
        keywords="donate, $1 donation, support school, Ghana education, St. Louis Demo JHS, school funding"
        url="/donate-one-dollar"
        type="website"
        pageType="donation"
      />

      {/* Back Button and Title Section */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-700/50 hover:bg-green-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-green-500/30"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>

            <h1 className="text-xl md:text-2xl font-bold text-white">
              💵 Donate Just $1
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-2xl">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Dollar Makes a Difference
            </h2>
            
            <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto">
              Support St. Louis Demonstration JHS with just $1. Your small contribution joins with others to create a big impact on our students' education.
            </p>
          </motion.div>

          {/* Donation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="text-center">
              {/* Amount Display */}
              <div className="mb-8">
                <div className="text-6xl font-bold text-green-600 mb-2">$1</div>
                <div className="text-2xl font-semibold text-gray-700 mb-2">≈ GH₵15</div>
                <p className="text-gray-600">Simple. Quick. Impactful.</p>
              </div>

              {/* Impact Statement */}
              <div className="bg-green-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-green-800 mb-3">Your $1 Helps Provide:</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-700">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>School supplies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>Learning materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>Student support</span>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" />
                    <p className="font-medium">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Success Display */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <p className="font-medium">Redirecting to secure payment...</p>
                  </div>
                </motion.div>
              )}

              {/* Donation Button */}
              <button
                onClick={handleDonateOneDollar}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Donate $1 Now
                  </>
                )}
              </button>

              {/* Security Notice */}
              <p className="text-xs text-gray-500 mt-4">
                🔒 Secure payment powered by Paystack. Your transaction is protected and encrypted.
              </p>
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-8"
          >
            <p className="text-gray-600 mb-4">
              Want to donate a different amount?{' '}
              <button
                onClick={() => navigate('/donate')}
                className="text-green-600 hover:text-green-700 font-medium underline"
              >
                Visit our main donation page
              </button>
            </p>
            
            <div className="text-sm text-gray-500">
              <p>St. Louis Demonstration JHS</p>
              <p>P.O. Box 3041, Mbrom-Kumasi, Ghana</p>
              <p>100% of donations go directly to school development</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonateOneDollarPage;
