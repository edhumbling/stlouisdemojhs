import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

declare const paypal: any;

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="ml-4 flex items-center">
              <img 
                src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" 
                alt="PayPal" 
                className="h-8 w-auto mr-3"
              />
              <h1 className="text-xl font-semibold text-white">Donate with PayPal</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Make a Donation</h2>
          <p className="text-gray-600 mb-8">
            Your generous donation helps support St. Louis Demo JHS and its students.
          </p>
          
          {/* PayPal Button Container */}
          <div id="paypal-container" className="flex justify-center">
            <div className="animate-pulse text-gray-500">
              Loading PayPal...
            </div>
          </div>
          
          <p className="text-xs text-gray-400 mt-4">
            Secure payment processed by PayPal
          </p>
        </div>
      </main>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-center py-2 px-4 text-sm font-medium z-50">
        💝 100% of your donation goes directly to St. Louis Demo JHS
      </div>
    </div>
  );
};

export default PayPalDonatePage;
