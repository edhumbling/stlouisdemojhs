import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Shield, Copy, Check } from 'lucide-react';

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
      <header className="w-full bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="ml-4 flex items-center">
              <span className="text-2xl mr-2">🇬🇧</span>
              <h1 className="text-xl font-semibold text-gray-800">UK Bank Transfer</h1>
            </div>
          </div>
        </div>
      </header>

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
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-center py-3 px-4 text-sm text-gray-600 z-50">
        <div className="flex items-center justify-center gap-2">
          <Shield className="text-green-500" size={16} />
          <span>100% of your donation goes directly to St. Louis Demo JHS</span>
        </div>
      </div>
    </div>
  );
};

export default DonateUKBankPage;
