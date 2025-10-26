import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, DollarSign, Loader2, CheckCircle, AlertCircle, Sparkles, Gift, Shield, Star } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      <SEOHead
        title="Choose Your Donation Amount | Support St. Louis Demonstration JHS"
        description="Make a custom donation to support St. Louis Demonstration JHS. Choose any amount from <SEOHead
        title="Choose Your Donation Amount | Support St. Louis Demonstration JHS"
        description="Make a custom donation to support St. Louis Demonstration JHS. Choose any amount from $1 to $1000 to help us provide quality education for our students."
        keywords="donate, custom donation, support school, Ghana education, St. Louis Demo JHS, school funding"
        url="/donate-one-dollar"
        type="website"
        pageType="donation"
      /> to <SEOHead
        title="Choose Your Donation Amount | Support St. Louis Demonstration JHS"
        description="Make a custom donation to support St. Louis Demonstration JHS. Choose any amount from $1 to $1000 to help us provide quality education for our students."
        keywords="donate, custom donation, support school, Ghana education, St. Louis Demo JHS, school funding"
        url="/donate-one-dollar"
        type="website"
        pageType="donation"
      />000 to help us provide quality education for our students."
        keywords="donate, custom donation, support school, Ghana education, St. Louis Demo JHS, school funding"
        url="/donate-one-dollar"
        type="website"
        pageType="donation"
      /
        canonical="https://stlouisdemojhs.com/donate-one-dollar"
      >

      {/* Enhanced Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 4px solid #ffffff;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6), 0 4px 12px rgba(0,0,0,0.15);
        }

        .slider::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(135deg, #10b981, #059669);
          cursor: pointer;
          border: 4px solid #ffffff;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 2px 8px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.6), 0 4px 12px rgba(0,0,0,0.15);
        }

        .amount-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border: 2px solid transparent;
          background-clip: padding-box;
          position: relative;
        }

        .amount-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
        }

        .floating-hearts {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite alternate;
        }

        @keyframes pulse-glow {
          from { box-shadow: 0 0 20px rgba(16, 185, 129, 0.4); }
          to { box-shadow: 0 0 30px rgba(16, 185, 129, 0.8); }
        }
      `}</style>

      {/* Enhanced Back Button and Title Section - With proper spacing from header */}
      <div className="bg-gradient-to-r from-emerald-900 via-green-800 to-emerald-900 py-4 sm:py-5 shadow-2xl mt-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-700/60 hover:bg-emerald-600/80 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-emerald-500/40 hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={18} />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-emerald-600/80 rounded-full shadow-lg">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                💝 Choose Your Donation Amount
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-green-600 py-3 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              <span>🛡️ 100% of donations go directly to school development</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 py-8 sm:py-12">
        {/* Desktop: Centered container, Mobile: Full width */}
        <div className="max-w-4xl mx-auto">
          {/* Hero Section with Floating Elements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 relative"
          >
            {/* Floating Hearts Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="floating-hearts absolute top-4 left-4 text-2xl opacity-20" style={{ animationDelay: '0s' }}>💖</div>
              <div className="floating-hearts absolute top-8 right-8 text-xl opacity-15" style={{ animationDelay: '1s' }}>💕</div>
              <div className="floating-hearts absolute bottom-4 left-8 text-3xl opacity-25" style={{ animationDelay: '2s' }}>💝</div>
              <div className="floating-hearts absolute top-12 left-1/2 text-lg opacity-20" style={{ animationDelay: '0.5s' }}>💗</div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full mb-6 shadow-2xl pulse-glow">
                <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-4">
                Every Dollar Makes a Difference
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed max-w-2xl mx-auto mb-6 px-4 font-medium">
                💝 Support St. Louis Demonstration JHS with just $1. Your small contribution joins with others to create a big impact on our students' education.
              </p>

              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Secure Payment</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Instant Receipt</span>
                </div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>Tax Deductible</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Donation Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 border border-gray-100 relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-green-500 rounded-full translate-x-12 translate-y-12"></div>
            </div>

            <div className="relative z-10">
              {/* Amount Selection Section */}
              <div className="mb-8">
                {/* Amount Display */}
                <div className="text-center mb-8">
                  <div className="text-5xl sm:text-7xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-3">
                    💵 ${usdAmount.toFixed(usdAmount % 1 === 0 ? 0 : 2)}
                  </div>
                  <div className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                    {isLoadingRate ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading rate...</span>
                      </span>
                    ) : (
                      `≈ GH₵${ghsAmount.toFixed(2)}`
                    )}
                  </div>
                  <div className="text-sm text-gray-500 bg-gray-100 inline-block px-4 py-2 rounded-full font-medium">
                    📊 Rate: 1 USD = {exchangeRate} GHS
                  </div>
                </div>

                {/* Enhanced Amount Slider */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 sm:p-8 rounded-2xl border-2 border-emerald-200 shadow-lg mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-emerald-800 mb-6 text-center flex items-center justify-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Choose Your Amount</span>
                  </h3>

                  {/* Slider */}
                  <div className="mb-6">
                    <input
                      type="range"
                      min="1"
                      max="1000"
                      step="1"
                      value={usdAmount}
                      onChange={handleSliderChange}
                      className="w-full h-4 bg-emerald-200 rounded-full appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${((usdAmount - 1) / 999) * 100}%, #d1fae5 ${((usdAmount - 1) / 999) * 100}%, #d1fae5 100%)`
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2 font-medium">
                      <span>$1</span>
                      <span>$1000</span>
                    </div>
                  </div>

                  {/* Custom Amount Input */}
                  <div className="flex items-center gap-4">
                    <label htmlFor="customAmount" className="text-base font-semibold text-gray-700 whitespace-nowrap flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <span>Custom Amount:</span>
                    </label>
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">$</span>
                      <input
                        type="number"
                        id="customAmount"
                        min="1"
                        max="1000"
                        step="0.01"
                        value={customAmountInput}
                        onChange={handleAmountInputChange}
                        onBlur={handleAmountInputBlur}
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 text-black font-semibold text-lg transition-all duration-300"
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 text-center mt-4">
                    💡 Slide or type any amount from $1 to $1000
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-base text-gray-700 font-semibold">✨ Simple. Quick. Impactful. ✨</p>
                </div>
              </div>

              {/* Enhanced Form Fields */}
              <div className="space-y-6">
                {/* Donor Name Input */}
                <div>
                  <label htmlFor="donorName" className="block text-base font-bold text-gray-800 mb-3 text-center">
                    👤 Your Name *
                  </label>
                  <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={handleNameChange}
                    placeholder="Enter your full name"
                    className={`w-full px-5 py-4 border-2 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-black bg-white placeholder-gray-400 font-medium text-lg rounded-xl shadow-sm ${
                      nameError ? 'border-red-500 bg-red-50 text-black' : 'border-gray-300 hover:border-emerald-300'
                    }`}
                    required
                  />
                  {nameError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {nameError}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    This name will appear on your donation receipt
                  </p>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-base font-bold text-gray-800 mb-3 text-center">
                    📧 Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                    className={`w-full px-5 py-4 border-2 focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all duration-300 text-black bg-white placeholder-gray-400 font-medium text-lg rounded-xl shadow-sm ${
                      emailError ? 'border-red-500 bg-red-50 text-black' : 'border-gray-300 hover:border-emerald-300'
                    }`}
                    required
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      {emailError}
                    </p>
                  )}
                  <p className="mt-2 text-sm text-gray-500 text-center">
                    We'll send your donation receipt to this email address
                  </p>
                </div>
              </div>

              {/* Enhanced Payment Summary */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border-2 border-emerald-200 my-8">
                <div className="text-center mb-4">
                  <span className="text-lg font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Payment Summary</span>
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">Donation:</span>
                    <span className="font-bold text-emerald-600 text-lg">GH₵{ghsAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-700">
                    <span className="font-medium">Processing Fee (1.5%):</span>
                    <span className="font-bold text-orange-600">GH₵{paystackFee.toFixed(2)}</span>
                  </div>
                  <div className="border-t-2 border-emerald-200 pt-3 mt-3">
                    <div className="flex justify-between items-center bg-emerald-100 px-4 py-3 rounded-xl">
                      <span className="font-bold text-emerald-800 text-lg">Total:</span>
                      <span className="font-black text-emerald-800 text-xl">GH₵{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-3 text-red-600">
                    <AlertCircle className="w-6 h-6" />
                    <p className="font-semibold">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Success Display */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border-2 border-emerald-200 rounded-xl p-4 mb-6"
                >
                  <div className="flex items-center gap-3 text-emerald-600">
                    <CheckCircle className="w-6 h-6" />
                    <p className="font-semibold">Redirecting to secure payment...</p>
                  </div>
                </motion.div>
              )}

              {/* Enhanced Donation Button */}
              <button
                onClick={handleDonateOneDollar}
                disabled={isLoading || !email.trim() || !validateEmail(email) || !!emailError || !donorName.trim() || donorName.trim().length < 2 || !!nameError}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white font-bold py-5 px-8 hover:from-emerald-700 hover:to-green-700 focus:ring-4 focus:ring-emerald-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-lg rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-6 h-6" />
                    Donate ${usdAmount.toFixed(usdAmount % 1 === 0 ? 0 : 2)} (GH₵{totalAmount.toFixed(2)})
                  </>
                )}
              </button>

              {/* Security Notice */}
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>Secure payment powered by Paystack. Your transaction is protected and encrypted.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Concise Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-gray-700 mb-6 text-lg">
              Want to donate a different amount?{' '}
              <button
                onClick={() => navigate('/donate')}
                className="text-emerald-600 hover:text-emerald-700 font-semibold underline hover:no-underline transition-all duration-300"
              >
                Visit our main donation page
              </button>
            </p>
            
            <div className="text-base text-gray-600 space-y-2 mb-8">
              <p className="font-semibold">St. Louis Demonstration JHS</p>
              <p>P.O. Box 3041, Mbrom-Kumasi, Ghana</p>
              <p className="font-bold text-emerald-600 text-lg">100% of donations go directly to school development</p>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">💱</div>
                  <p className="text-sm font-semibold text-gray-800">Real-time rates</p>
                  <p className="text-xs text-gray-600">Updated exchange rates</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <p className="text-sm font-semibold text-gray-800">Secure payment</p>
                  <p className="text-xs text-gray-600">Paystack encrypted</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm">
                <div className="text-center">
                  <div className="text-2xl mb-2">📧</div>
                  <p className="text-sm font-semibold text-gray-800">Email receipt</p>
                  <p className="text-xs text-gray-600">Within 24 hours</p>
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
