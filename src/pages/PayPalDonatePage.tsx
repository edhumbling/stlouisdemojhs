import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Heart, ExternalLink } from 'lucide-react';

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();

  const openPayPalPayment = () => {
    const width = 800;
    const height = 600;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    
    window.open(
      'https://www.paypal.com/ncp/payment/ZNC2MMZK4TY8N',
      'PayPal Payment',
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Top Bar - Back Button and Title */}
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 py-2 sm:py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-red-700/50 hover:bg-red-600/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-red-500/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
              💝 Donate with PayPal
            </h1>
          </div>
        </div>
      </div>
      <main className="flex-grow w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
              <CreditCard className="mx-auto text-white mb-4" size={40} />
              <h2 className="text-2xl font-bold text-white mb-2">Make a Donation</h2>
              <p className="text-blue-100">
                Support St. Louis Demo JHS and its students
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Why Donate?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Heart className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">Your donation directly supports our students' education and development.</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">Help us provide better resources and opportunities for our community.</span>
                    </li>
                    <li className="flex items-start">
                      <Heart className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">Make a lasting impact on the future of our students.</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={openPayPalPayment}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <img 
                    src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                    alt="PayPal" 
                    className="h-6 w-auto"
                  />
                  <span>Donate with PayPal</span>
                  <ExternalLink size={20} />
                </button>

                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <Heart className="text-green-500 mt-1 mr-3" size={20} />
                    <div>
                      <h3 className="font-medium text-green-800">Secure Payment</h3>
                      <p className="text-sm text-green-700 mt-1">
                        Your payment is processed securely through PayPal. We never store your payment information.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at <a href="mailto:support@stlouisdemojhs.com" className="text-blue-600 hover:underline">support@stlouisdemojhs.com</a>
            </p>
          </div>
        </div>
      </main>
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-center py-3 px-4 text-sm font-medium z-50">
        <div className="flex items-center justify-center gap-2">
          <Heart className="text-white" size={16} />
          <span>100% of your donation goes directly to St. Louis Demo JHS</span>
        </div>
      </div>
    </div>
  );
};

export default PayPalDonatePage;
