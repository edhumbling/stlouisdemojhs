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
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [exchangeRate, setExchangeRate] = useState(15); // Default: 1 USD = 15 GHS
  const [isLoadingRate, setIsLoadingRate] = useState(false);

  // Calculate amounts
  const usdAmount = 1;
  const ghsAmount = Math.round(usdAmount * exchangeRate * 100) / 100; // Round to 2 decimal places
  const paystackFee = Math.round(ghsAmount * 0.015 * 100) / 100; // 1.5% Paystack fee
  const totalAmount = Math.round((ghsAmount + paystackFee) * 100) / 100;
  const totalAmountPesewas = Math.round(totalAmount * 100); // Convert to pesewas

  const handleBack = () => {
    navigate(-1);
  };

  // Fetch current USD to GHS exchange rate
  const fetchExchangeRate = async () => {
    setIsLoadingRate(true);
    try {
      // Using a free exchange rate API
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();

      if (data.rates && data.rates.GHS) {
        const rate = Math.round(data.rates.GHS * 100) / 100; // Round to 2 decimal places
        setExchangeRate(rate);
        console.log(`Exchange rate updated: 1 USD = ${rate} GHS`);
      }
    } catch (error) {
      console.warn('Failed to fetch exchange rate, using default:', error);
      // Keep default rate of 15 GHS
    } finally {
      setIsLoadingRate(false);
    }
  };

  // Fetch exchange rate on component mount
  React.useEffect(() => {
    fetchExchangeRate();
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // Clear previous errors
    setEmailError('');
    setError(null);

    // Validate email if not empty
    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    }
  };

  const handleDonateOneDollar = async () => {
    // Validate email before proceeding
    if (!email.trim()) {
      setEmailError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEmailError('');

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
          email: email.trim(),
          amount: totalAmountPesewas, // Total amount including Paystack fees in pesewas
          currency: 'GHS',
          reference: `STLOUIS-1USD-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
          callback_url: `${window.location.origin}/donation-thank-you`,
          metadata: JSON.stringify({
            donor_name: 'Anonymous Supporter',
            donation_type: 'One Dollar Support',
            school_name: 'St. Louis Demonstration JHS',
            amount_usd: 1,
            amount_ghs: 15,
            payment_method: 'paystack_api',
            custom_fields: [
              {
                display_name: 'Donation Type',
                variable_name: 'donation_type',
                value: 'One Dollar Support'
              },
              {
                display_name: 'School Name',
                variable_name: 'school_name',
                value: 'St. Louis Demonstration JHS'
              },
              {
                display_name: 'Amount (USD)',
                variable_name: 'amount_usd',
                value: '$1.00'
              },
              {
                display_name: 'Amount (GHS)',
                variable_name: 'amount_ghs',
                value: 'GH₵15.00'
              },
              {
                display_name: 'Payment Source',
                variable_name: 'payment_source',
                value: 'Website - One Dollar Page'
              }
            ]
          })
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Check both HTTP status and Paystack response status
      if (result.status === true && result.data?.authorization_url) {
        // Log successful initialization for debugging
        console.log('Payment initialized successfully:', {
          reference: result.data.reference,
          access_code: result.data.access_code
        });

        // Redirect to Paystack checkout
        window.location.href = result.data.authorization_url;
      } else {
        // Handle Paystack API errors
        const errorMessage = result.message || 'Failed to initialize payment';
        console.error('Paystack API Error:', result);
        throw new Error(errorMessage);
      }
    } catch (err) {
      let errorMessage = 'Payment initialization failed';

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'string') {
        errorMessage = err;
      }

      // Provide user-friendly error messages
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      } else if (errorMessage.includes('401')) {
        errorMessage = 'Payment service configuration error. Please contact support.';
      } else if (errorMessage.includes('400')) {
        errorMessage = 'Invalid payment request. Please try again.';
      }

      setError(errorMessage);
      console.error('Payment initialization error:', {
        error: err,
        message: errorMessage,
        timestamp: new Date().toISOString()
      });
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
                <div className="text-2xl font-semibold text-gray-700 mb-2">
                  {isLoadingRate ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading rate...
                    </span>
                  ) : (
                    `≈ GH₵${ghsAmount.toFixed(2)}`
                  )}
                </div>
                <div className="text-sm text-gray-500 mb-2">
                  Exchange rate: 1 USD = {exchangeRate} GHS
                </div>
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

              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors text-gray-900 bg-white placeholder-gray-500 ${
                    emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'
                  }`}
                  required
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {emailError}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  We'll send your donation receipt to this email address
                </p>
              </div>

              {/* Fee Breakdown */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                <h4 className="text-sm font-semibold text-blue-800 mb-3">Payment Breakdown</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-700">
                    <span>Donation amount:</span>
                    <span>GH₵{ghsAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Paystack processing fee (1.5%):</span>
                    <span>GH₵{paystackFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-blue-300 pt-2 mt-2">
                    <div className="flex justify-between font-semibold text-blue-800">
                      <span>Total charge:</span>
                      <span>GH₵{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-blue-600 mt-2">
                  * Processing fees help cover secure payment handling
                </p>
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
                disabled={isLoading || !email.trim() || !validateEmail(email) || !!emailError}
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
                    Donate $1 (GH₵{totalAmount.toFixed(2)})
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
            
            <div className="text-sm text-gray-500 space-y-2">
              <p>St. Louis Demonstration JHS</p>
              <p>P.O. Box 3041, Mbrom-Kumasi, Ghana</p>
              <p className="font-medium text-green-600">100% of donations go directly to school development</p>
            </div>

            {/* Disclaimer */}
            <div className="bg-gray-50 rounded-lg p-4 mt-6 border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-800 mb-2">Important Information</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>• Exchange rates are updated in real-time but may vary slightly at payment time</p>
                <p>• Paystack processing fees (1.5%) are added to ensure secure payment handling</p>
                <p>• All transactions are processed securely through Paystack's encrypted platform</p>
                <p>• Donation receipts will be sent to your email address within 24 hours</p>
                <p>• For questions about your donation, contact us at edhumbling@gmail.com</p>
                <p>• This donation is voluntary and non-refundable once processed</p>
                <p>• St. Louis Demonstration JHS is a registered educational institution in Ghana</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonateOneDollarPage;
