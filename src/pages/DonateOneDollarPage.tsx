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
  const [donorName, setDonorName] = useState('');
  const [nameError, setNameError] = useState('');
  const [exchangeRate, setExchangeRate] = useState(15); // Default: 1 USD = 15 GHS
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  const [usdAmount, setUsdAmount] = useState(1); // User-selected amount
  const [customAmountInput, setCustomAmountInput] = useState('1');

  // Calculate amounts based on user selection
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDonorName(value);

    // Clear previous errors
    setNameError('');
    setError(null);

    // Basic validation - at least 2 characters
    if (value.trim().length > 0 && value.trim().length < 2) {
      setNameError('Name must be at least 2 characters long');
    }
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setUsdAmount(value);
    setCustomAmountInput(value.toString());
  };

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmountInput(value);

    // Parse and validate the input
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 1 && numValue <= 1000) {
      setUsdAmount(numValue);
    }
  };

  const handleAmountInputBlur = () => {
    // Ensure the input shows a valid value when user leaves the field
    const numValue = parseFloat(customAmountInput);
    if (isNaN(numValue) || numValue < 1) {
      setUsdAmount(1);
      setCustomAmountInput('1');
    } else if (numValue > 1000) {
      setUsdAmount(1000);
      setCustomAmountInput('1000');
    } else {
      setUsdAmount(numValue);
      setCustomAmountInput(numValue.toString());
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

    // Validate donor name
    if (!donorName.trim()) {
      setNameError('Please enter your name');
      return;
    }

    if (donorName.trim().length < 2) {
      setNameError('Name must be at least 2 characters long');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEmailError('');
    setNameError('');

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
            donor_name: donorName.trim(),
            donation_type: 'Custom Amount Donation',
            school_name: 'St. Louis Demonstration JHS',
            amount_usd: usdAmount,
            amount_ghs: ghsAmount,
            payment_method: 'paystack_api',
            custom_fields: [
              {
                display_name: 'Donor Name',
                variable_name: 'donor_name',
                value: donorName.trim()
              },
              {
                display_name: 'Donation Type',
                variable_name: 'donation_type',
                value: 'Custom Amount Donation'
              },
              {
                display_name: 'School Name',
                variable_name: 'school_name',
                value: 'St. Louis Demonstration JHS'
              },
              {
                display_name: 'Amount (USD)',
                variable_name: 'amount_usd',
                value: `$${usdAmount.toFixed(2)}`
              },
              {
                display_name: 'Amount (GHS)',
                variable_name: 'amount_ghs',
                value: `GH₵${ghsAmount.toFixed(2)}`
              },
              {
                display_name: 'Total Charged (GHS)',
                variable_name: 'total_amount_ghs',
                value: `GH₵${totalAmount.toFixed(2)}`
              },
              {
                display_name: 'Payment Source',
                variable_name: 'payment_source',
                value: 'Website - Custom Amount Page'
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
        title="Choose Your Donation Amount | Support St. Louis Demonstration JHS"
        description="Make a custom donation to support St. Louis Demonstration JHS. Choose any amount from $1 to $1000 to help us provide quality education for our students."
        keywords="donate, custom donation, support school, Ghana education, St. Louis Demo JHS, school funding"
        url="/donate-one-dollar"
        type="website"
        pageType="donation"
      />

      {/* Custom Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }

        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #10b981;
          cursor: pointer;
          border: 3px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
      `}</style>

      {/* Back Button and Title Section - Edge to Edge */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 py-3 sm:py-4 pt-20">
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
              💵 Choose Your Donation Amount
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content - Gallery Page Style (No Wrapper Padding) */}
      <div className="px-3 sm:px-4 py-6 sm:py-8">
        {/* Desktop: Centered smaller container, Mobile: Full width */}
        <div className="lg:max-w-2xl lg:mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 sm:mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-4 sm:mb-6 shadow-2xl">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-green-600 mb-3 sm:mb-4">
              Every Dollar Makes a Difference
            </h2>

            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto px-4 sm:px-0">
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
              {/* Amount Selection */}
              <div className="mb-6 sm:mb-8">
                {/* Amount Display */}
                <div className="text-center mb-6">
                  <div className="text-4xl sm:text-6xl font-bold text-green-600 mb-2">
                    💵 ${usdAmount.toFixed(usdAmount % 1 === 0 ? 0 : 2)}
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">
                    {isLoadingRate ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                        <span className="text-sm sm:text-base">Loading rate...</span>
                      </span>
                    ) : (
                      `≈ GH₵${ghsAmount.toFixed(2)}`
                    )}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 mb-3 bg-gray-100 inline-block px-3 py-1 rounded-full">
                    📊 Rate: 1 USD = {exchangeRate} GHS
                  </div>
                </div>

                {/* Amount Slider - Edge to Edge */}
                <div className="bg-white p-4 sm:p-6 border-t-2 border-b-2 border-green-200 shadow-lg mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-green-800 mb-4 text-center">
                    🎚️ Choose Your Amount
                  </h3>

                  {/* Slider */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      step="1"
                      value={usdAmount}
                      onChange={handleSliderChange}
                      className="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${((usdAmount - 1) / 999) * 100}%, #d1fae5 ${((usdAmount - 1) / 999) * 100}%, #d1fae5 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>$1</span>
                      <span>$1000</span>
                    </div>
                  </div>

                  {/* Custom Amount Input */}
                  <div className="flex items-center gap-3">
                    <label htmlFor="customAmount" className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      💰 Custom:
                    </label>
                    <div className="flex-1 relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">$</span>
                      <input
                        type="number"
                        id="customAmount"
                        min="1"
                        max="1000"
                        step="0.01"
                        value={customAmountInput}
                        onChange={handleAmountInputChange}
                        onBlur={handleAmountInputBlur}
                        className="w-full pl-8 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-black font-medium"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    💡 Slide or type any amount from $1 to $1000
                  </p>
                </div>

                <p className="text-sm sm:text-base text-gray-600 font-medium text-center">✨ Simple. Quick. Impactful. ✨</p>
              </div>



              {/* Donor Name Input */}
              <div className="mb-6">
                <label htmlFor="donorName" className="block text-sm sm:text-base font-bold text-gray-800 mb-3 text-center">
                  👤 Your Name *
                </label>
                <input
                  type="text"
                  id="donorName"
                  value={donorName}
                  onChange={handleNameChange}
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-4 border-2 focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-black bg-white placeholder-gray-400 font-medium text-base sm:text-lg shadow-sm ${
                    nameError ? 'border-red-500 bg-red-50 text-black' : 'border-gray-300 hover:border-green-300'
                  }`}
                  required
                />
                {nameError && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {nameError}
                  </p>
                )}
                <p className="mt-1 text-xs sm:text-sm text-gray-500 text-center">
                  This name will appear on your donation receipt
                </p>
              </div>

              {/* Email Input */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm sm:text-base font-bold text-gray-800 mb-3 text-center">
                  📧 Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-4 border-2 focus:ring-4 focus:ring-green-500/50 focus:border-green-500 transition-all duration-300 text-black bg-white placeholder-gray-400 font-medium text-base sm:text-lg shadow-sm ${
                    emailError ? 'border-red-500 bg-red-50 text-black' : 'border-gray-300 hover:border-green-300'
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

              {/* Compact Fee Breakdown - Edge to Edge */}
              <div className="bg-white p-3 mb-4 border-t border-b border-green-200 shadow-sm">
                <div className="text-center mb-2">
                  <span className="text-sm font-bold text-green-800">💰 Payment Summary</span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Donation:</span>
                    <span className="font-semibold text-green-600">GH₵{ghsAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span>Fee (1.5%):</span>
                    <span className="font-semibold text-orange-600">GH₵{paystackFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-green-200 pt-1 mt-1">
                    <div className="flex justify-between items-center bg-green-50 px-2 py-1 rounded">
                      <span className="font-bold text-green-800 text-sm">Total:</span>
                      <span className="font-black text-green-800 text-sm">GH₵{totalAmount.toFixed(2)}</span>
                    </div>
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
                disabled={isLoading || !email.trim() || !validateEmail(email) || !!emailError || !donorName.trim() || donorName.trim().length < 2 || !!nameError}
                className="w-full lg:w-auto lg:mx-auto lg:px-12 lg:py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-4 sm:py-5 px-6 sm:px-8 hover:from-green-700 hover:to-emerald-700 focus:ring-4 focus:ring-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-base lg:text-base sm:text-lg rounded-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5" />
                    Donate ${usdAmount.toFixed(usdAmount % 1 === 0 ? 0 : 2)} (GH₵{totalAmount.toFixed(2)})
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

            {/* Disclaimer - Edge to Edge */}
            <div className="bg-white p-4 sm:p-6 mt-6 border-t-2 border-b-2 border-blue-200 shadow-lg">
              <h4 className="text-base sm:text-lg font-bold text-blue-800 mb-4 text-center flex items-center justify-center gap-2">
                <span>ℹ️</span>
                <span>Important Information</span>
              </h4>
              <div className="text-xs sm:text-sm text-gray-800 space-y-2 sm:space-y-3">
                <div className="flex items-start gap-2 bg-blue-50 p-2 sm:p-3 border-l-4 border-blue-400">
                  <span className="text-blue-600 font-bold">💱</span>
                  <p className="font-medium">Exchange rates are updated in real-time but may vary slightly at payment time</p>
                </div>
                <div className="flex items-start gap-2 bg-orange-50 p-2 sm:p-3 border-l-4 border-orange-400">
                  <span className="text-orange-600 font-bold">💳</span>
                  <p className="font-medium">Paystack processing fees (1.5%) are added to ensure secure payment handling</p>
                </div>
                <div className="flex items-start gap-2 bg-green-50 p-2 sm:p-3 border-l-4 border-green-400">
                  <span className="text-green-600 font-bold">🔒</span>
                  <p className="font-medium">All transactions are processed securely through Paystack's encrypted platform</p>
                </div>
                <div className="flex items-start gap-2 bg-purple-50 p-2 sm:p-3 border-l-4 border-purple-400">
                  <span className="text-purple-600 font-bold">📧</span>
                  <p className="font-medium">Donation receipts will be sent to your email address within 24 hours</p>
                </div>
                <div className="flex items-start gap-2 bg-yellow-50 p-2 sm:p-3 border-l-4 border-yellow-400">
                  <span className="text-yellow-600 font-bold">�</span>
                  <p className="font-medium">For questions about your donation, contact us at <span className="text-blue-600 font-bold">contact@stlouisdemojhs.com</span></p>
                </div>
                <div className="flex items-start gap-2 bg-red-50 p-2 sm:p-3 border-l-4 border-red-400">
                  <span className="text-red-600 font-bold">⚠️</span>
                  <p className="font-medium">This donation is voluntary and non-refundable once processed</p>
                </div>
                <div className="flex items-start gap-2 bg-gray-50 p-2 sm:p-3 border-l-4 border-gray-400">
                  <span className="text-gray-600 font-bold">🏫</span>
                  <p className="font-medium">St. Louis Demonstration JHS is a registered educational institution in Ghana</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DonateOneDollarPage;
