import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Heart } from 'lucide-react';

const PayPalDonatePage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Redirect to PayPal payment page
    window.location.href = 'https://www.paypal.com/ncp/payment/ZNC2MMZK4TY8N';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <main className="flex-grow w-full flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8 text-center">
              <CreditCard className="mx-auto text-white mb-4" size={40} />
              <h2 className="text-2xl font-bold text-white mb-2">Redirecting to PayPal</h2>
              <p className="text-blue-100">
                Please wait while we redirect you to the secure payment page...
              </p>
            </div>
            
            <div className="p-8 text-center">
              <div className="animate-pulse">
                <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to PayPal...</p>
              </div>
            </div>
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
