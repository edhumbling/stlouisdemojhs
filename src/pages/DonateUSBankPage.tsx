import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Shield, Copy, Check } from 'lucide-react';

const DonateUSBankPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const usBankDetails = {
    accountName: 'Emmanuel Dwamena',
    bankName: 'Lead Bank',
    accountNumber: '210611883812',
    wireRouting: '101019644',
    achRouting: '101019644',
    accountType: 'Checking',
    bankAddress: '1801 Main St., Kansas City, MO 64108',
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
              <span className="text-2xl mr-2">🇺🇸</span>
              <h1 className="text-xl font-semibold text-gray-800">US Bank Transfer</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-8">
              <div className="flex items-center justify-center">
                <Banknote className="text-white mr-3" size={32} />
                <h2 className="text-2xl font-bold text-white">Bank Account Details</h2>
              </div>
            </div>
            
            <div className="p-8">
              <div className="space-y-6">
                {Object.entries(usBankDetails).map(([key, value]) => (
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
                        className="ml-4 p-2 text-gray-400 hover:text-blue-500 transition-colors"
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
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">IMPORTANT NOTES</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Shield className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">Please ensure all details are entered correctly to avoid transaction issues.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">For international wire transfers, you may need a SWIFT/BIC code.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="text-blue-500 mt-1 mr-3" size={20} />
                      <span className="text-blue-700">Transaction times may vary depending on the banks involved.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-green-800">
                    After making your donation, please consider notifying us via email for tracking purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonateUSBankPage;
