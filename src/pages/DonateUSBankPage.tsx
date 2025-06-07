import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Banknote from 'lucide-react/dist/esm/icons/banknote';

const DonateUSBankPage: React.FC = () => {
  const navigate = useNavigate();

  const usBankDetails = {
    accountName: 'Emmanuel Dwamena',
    bankName: 'Lead Bank',
    accountNumber: '210611883812',
    wireRouting: '101019644',
    achRouting: '101019644',
    accountType: 'Checking',
    bankAddress: '1801 Main St., Kansas City, MO 64108',
  };

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
              <span className="text-2xl mr-2">🇺🇸</span>
              <h1 className="text-xl font-semibold text-white">US Bank Transfer</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-blue-600 px-6 py-4">
            <div className="flex items-center">
              <Banknote className="text-white mr-3" size={24} />
              <h2 className="text-xl font-bold text-white">Bank Account Details</h2>
            </div>
          </div>
          
          {/* Card Body */}
          <div className="p-6">
            <div className="space-y-5">
              {Object.entries(usBankDetails).map(([key, value]) => (
                <div key={key} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <p className="mt-1 text-gray-800 font-mono break-words">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">IMPORTANT NOTES:</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Please ensure all details are entered correctly to avoid transaction issues.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>For international wire transfers, you may need a SWIFT/BIC code.</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Transaction times may vary depending on the banks involved.</span>
                </li>
              </ul>
            </div>

            {/* Call to Action */}
            <div className="mt-8 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm text-blue-800">
                After making your donation, please consider notifying us via email for tracking purposes.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-green-600 text-white text-center py-2 px-4 text-sm font-medium z-50">
        💝 100% of your donation goes directly to St. Louis Demo JHS
      </div>
    </div>
  );
};

export default DonateUSBankPage;
