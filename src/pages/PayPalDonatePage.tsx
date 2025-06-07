import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Shield, Heart, Loader2 } from 'lucide-react';

declare const paypal: any;

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // Add PayPal SDK script to head
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if script is already added
    if (!document.querySelector('script[src^="https://www.paypal.com/sdk/js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=BAAhJVEsvYgBrqycVi7DVM7piK5vBXGK3eeyoR66Uxgw8nLrJTcbyzTXLct-3FupN-a0jHX9ksCUKUWEZo&components=hosted-buttons&disable-funding=venmo&currency=USD';
      script.async = true;
      document.head.appendChild(script);
    }

    // Initialize PayPal button when script loads
    const initializePayPalButton = () => {
      if (window.paypal) {
        paypal.HostedButtons({
          hostedButtonId: "ZNC2MMZK4TY8N",
        }).render("#paypal-container");
        setIsLoading(false);
      } else {
        // If PayPal script isn't loaded yet, try again shortly
        setTimeout(initializePayPalButton, 100);
      }
    };

    // Start initialization check
    const initTimer = setTimeout(initializePayPalButton, 300);
    
    return () => {
      clearTimeout(initTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Main Content */}
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
              <div id="paypal-container" className="flex justify-center mb-6">
                {isLoading && (
                  <div className="flex flex-col items-center">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-gray-500">Loading secure payment...</p>
                  </div>
                )}
              </div>

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

                <div className="bg-green-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <Shield className="text-green-500 mt-1 mr-3" size={20} />
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
