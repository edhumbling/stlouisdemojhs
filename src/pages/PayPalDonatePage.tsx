import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
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
      <main className="flex-grow w-full">
        <iframe 
          src="https://www.paypal.com/ncp/payment/ZNC2MMZK4TY8N" 
          className="w-full h-[calc(100vh-120px)] border-0"
          title="PayPal Donation"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        />
      </main>

      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-center py-2 px-4 text-sm font-medium z-50">
        💝 100% of your donation goes directly to St. Louis Demo JHS
      </div>
    </div>
  );
};

export default PayPalDonatePage;
