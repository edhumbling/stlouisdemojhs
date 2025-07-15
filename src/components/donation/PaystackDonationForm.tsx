import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, User, Phone, MessageCircle, CreditCard, Loader2 } from 'lucide-react';
import { usePaystack } from '../../hooks/usePaystack';
import { paystackService } from '../../services/paystackService';

interface PaystackDonationFormProps {
  presetAmount?: number;
  donationType?: string;
  className?: string;
}

const PaystackDonationForm: React.FC<PaystackDonationFormProps> = ({
  presetAmount,
  donationType = 'General Donation',
  className = ''
}) => {
  const { initializePayment, isLoading, error, clearError } = usePaystack();
  
  const [formData, setFormData] = useState({
    email: '',
    amount: presetAmount || 10,
    donorName: '',
    phone: '',
    message: ''
  });

  const [customAmount, setCustomAmount] = useState(false);

  // Preset donation amounts in Ghana Cedis
  const presetAmounts = [10, 30, 50, 100, 200, 500, 1000, 3000, 5000];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) clearError();
  };

  const handleAmountSelect = (amount: number) => {
    setFormData(prev => ({ ...prev, amount }));
    setCustomAmount(false);
    if (error) clearError();
  };

  const handleCustomAmountToggle = () => {
    setCustomAmount(true);
    setFormData(prev => ({ ...prev, amount: 0 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.amount || !formData.donorName) {
      return;
    }

    // Validate email format
    if (!paystackService.validateEmail(formData.email)) {
      clearError();
      return;
    }

    // Validate phone if provided
    if (formData.phone && !paystackService.validateGhanaPhone(formData.phone)) {
      clearError();
      return;
    }

    const paymentData = {
      email: formData.email,
      amount: formData.amount,
      currency: 'GHS',
      callback_url: `${window.location.origin}/donation-success`,
      metadata: {
        donor_name: formData.donorName,
        phone: formData.phone,
        donation_type: donationType,
        school_name: 'St. Louis Demonstration JHS',
        environment: paystackService.isProductionMode() ? 'production' : 'test',
        custom_fields: [
          {
            display_name: 'Donor Name',
            variable_name: 'donor_name',
            value: formData.donorName
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone',
            value: formData.phone || 'Not provided'
          },
          {
            display_name: 'Message',
            variable_name: 'message',
            value: formData.message || 'No message'
          },
          {
            display_name: 'Donation Type',
            variable_name: 'donation_type',
            value: donationType
          }
        ]
      }
    };

    await initializePayment(paymentData);
  };

  return (
    <div className={`max-w-md mx-auto ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-4">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Support Our School</h3>
          <p className="text-gray-600 text-sm">
            Your donation helps us provide quality education and resources for our students.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Donation Amount (GH₵)
            </label>
            
            {/* Preset Amounts */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-2 px-3 text-sm font-medium rounded-lg border transition-colors ${
                    formData.amount === amount && !customAmount
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  ₵{amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCustomAmountToggle}
                className={`py-2 px-4 text-sm font-medium rounded-lg border transition-colors ${
                  customAmount
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                }`}
              >
                Custom
              </button>
              {customAmount && (
                <input
                  type="number"
                  name="amount"
                  value={formData.amount || ''}
                  onChange={handleInputChange}
                  placeholder="Enter amount"
                  min="1"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              )}
            </div>
          </div>

          {/* Donor Information */}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="donorName"
                  value={formData.donorName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message (Optional)
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Leave a message of support..."
                  rows={3}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !formData.email || !formData.amount || !formData.donorName}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-700 hover:to-emerald-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Donate {paystackService.formatAmount(formData.amount)}
              </>
            )}
          </button>

          {/* Security Notice */}
          <p className="text-xs text-gray-500 text-center">
            🔒 Secure payment powered by Paystack. Your information is protected.
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default PaystackDonationForm;
