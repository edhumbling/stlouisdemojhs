import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Shield, Copy, Check, Heart } from 'lucide-react';

const DonateUKBankPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const ukBankDetails = {
    accountName: 'Emmanuel Dwamena',
    accountNumber: '66739331',
    sortCode: '041307',
    swiftCode: 'CLJUGB21XXX',
    iban: 'GB63CLJU04130766739331',
    bankName: 'Clear Junction Limited',
    bankAddress: '4th Floor Imperial House, 15 Kingsway, London, United Kingdom, WC2B 6UN',
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

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
              💝 Donate via UK Bank
            </h1>
          </div>
        </div>
      </div>
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-8">
              <div className="flex items-center justify-center">
                <Banknote className="text-white mr-3" size={32} />
                <h2 className="text-2xl font-bold text-white">Bank Account Details</h2>
              </div>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {Object.entries(ukBankDetails).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="mt-1 text-gray-800 font-mono break-words">
                          {value}
                        </p>
                      </div>
                      <button
                        onClick={() => copyToClipboard(value, key)}
                        className="ml-4 p-2 text-gray-400 hover:text-purple-500 transition-colors"
                        title="Copy to clipboard"
                      >
                        {copiedField === key ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 space-y-6">
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">IMPORTANT NOTES</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Shield className="text-purple-500 mt-1 mr-3" size={20} />
                      <span className="text-purple-700">Please use the IBAN for international transfers if possible.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-purple-500 mt-1 mr-3" size={20} />
                      <span className="text-purple-700">Ensure all details are accurate to prevent delays.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-purple-500 mt-1 mr-3" size={20} />
                      <span className="text-purple-700">Transaction times may vary depending on the banks involved.</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-green-800">
                    After making your donation, please consider notifying us via email for our records.
                  </p>
                </div>
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

export default DonateUKBankPage;
