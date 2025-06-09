import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

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
      <main className="flex-grow w-full px-0 sm:px-0 pt-6 pb-24 max-w-3xl mx-auto">
        <section className="mb-8 px-4 sm:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-blue-900 flex items-center gap-2 mb-4">
            <Heart className="text-blue-700" size={28} />
            PayPal Donation
          </h2>
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
            {/* Instructions */}
            <div className="text-center mb-6 animate-pulse">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Click the PayPal button below to donate</h3>
              <p className="text-sm text-blue-600">Secure payment processing through PayPal</p>
            </div>

            {/* PayPal Acceptance Mark - Glowing Button */}
            <div className="w-full flex justify-center mb-6">
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 animate-pulse paypal-glow"></div>

                {/* PayPal Button */}
                <div className="relative">
                  <table border={0} cellPadding="10" cellSpacing="0" className="mx-auto">
                    <tbody>
                      <tr>
                        <td className="text-center"></td>
                      </tr>
                      <tr>
                        <td className="text-center">
                          <button
                            onClick={openPayPalPayment}
                            className="inline-block transform transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 rounded-lg"
                            title="Donate with PayPal"
                          >
                            <img
                              src="https://www.paypalobjects.com/webstatic/mktg/logo/AM_mc_vs_dc_ae.jpg"
                              alt="PayPal Acceptance Mark"
                              className="border-0 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200"
                            />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Additional Instructions */}
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                <span className="animate-bounce">👆</span>
                <span className="font-medium">Click the PayPal button above to start your donation</span>
                <span className="animate-bounce">👆</span>
              </p>
            </div>
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
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Need help? Contact us at <a href="mailto:support@stlouisdemojhs.com" className="text-blue-600 hover:underline">support@stlouisdemojhs.com</a>
          </p>
        </div>
        </section>
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
