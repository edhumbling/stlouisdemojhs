import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Banknote, Shield, Copy, Check, Heart } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';

const DonateUKBankPage: React.FC = () => {
  const navigate = useNavigate();
  const [copiedField, setCopiedField] = React.useState<string | null>(null);
  const [allCopied, setAllCopied] = React.useState(false);

  const ukBankDetails = {
    'Account Name': 'Emmanuel Dwamena',
    'Account Number': '66739331',
    'Sort Code': '041307',
    'SWIFT Code': 'CLJUGB21XXX',
    'IBAN': 'GB63CLJU04130766739331',
    'Bank Name': 'Clear Junction Limited',
    'Bank Address': '4th Floor Imperial House, 15 Kingsway, London, United Kingdom, WC2B 6UN',
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const copyAllDetails = () => {
    const details = Object.entries(ukBankDetails)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n');
    navigator.clipboard.writeText(details);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <SEOHead
        title="Donate via UK Bank | St. Louis Demonstration JHS"
        description="Support St. Louis Demonstration JHS through UK bank transfer. Get complete bank details including sort code, account number, IBAN, and SWIFT code for secure donations from the United Kingdom."
        keywords="UK bank donation, sort code, account number, IBAN SWIFT, British bank transfer, UK donation, school funding UK, Ghana school donation"
        url="/donate-uk-bank"
        type="website"
        pageType="donation"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/donate-uk-bank"
      >
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
      <main className="flex-grow w-full px-0 sm:px-0 pt-6 pb-24 max-w-3xl mx-auto">
        {/* Bank Details Section */}
        <section className="mb-8 px-4 sm:px-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl sm:text-2xl font-bold text-purple-900 flex items-center gap-2">
              <Banknote className="text-purple-700" size={28} />
              UK Bank Account Details
            </h2>
            <button
              onClick={copyAllDetails}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 border border-purple-200 bg-purple-50 hover:bg-purple-100 text-purple-700 ${allCopied ? 'bg-green-100 border-green-300 text-green-700' : ''}`}
              title="Copy all details"
            >
              {allCopied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
              {allCopied ? 'Copied!' : 'Copy All'}
            </button>
          </div>
          <div className="divide-y divide-purple-100">
              {Object.entries(ukBankDetails).map(([key, value]) => (
              <div key={key} className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 group">
                <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 sm:w-1/3">{key}</span>
                <span className="font-mono text-base text-purple-900 break-all sm:w-2/3 flex items-center gap-2">
                    {value}
                  <button
                    onClick={() => copyToClipboard(value, key)}
                    className="p-1 rounded hover:bg-purple-100 focus:bg-purple-200 transition-colors text-purple-400 hover:text-purple-700 focus:text-purple-700 group-hover:inline-flex inline-flex sm:opacity-0 sm:group-hover:opacity-100 opacity-100"
                    title={`Copy ${key}`}
                  >
                    {copiedField === key ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                  </button>
                </span>
                </div>
              ))}
            </div>
        </section>
            {/* Important Notes */}
        <section className="mb-8 px-4 sm:px-8">
          <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <Shield className="text-purple-500" size={20} />
            Important Notes
          </h3>
          <ul className="space-y-2 text-sm text-purple-900">
            <li>• Please use the IBAN for international transfers if possible.</li>
            <li>• Ensure all details are accurate to prevent delays.</li>
            <li>• Transaction times may vary depending on the banks involved.</li>
              </ul>
        </section>
            {/* Call to Action */}
        <section className="px-4 sm:px-8">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-800 text-sm">
                After making your donation, please consider notifying us via email for our records.
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

export default DonateUKBankPage;
