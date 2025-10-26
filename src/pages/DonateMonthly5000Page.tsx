import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import ShimmerLoader from '../components/common/ShimmerLoader';

const DonateMonthly5000Page: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <SEOHead
        title="Monthly Support ₵5000 - Sovereign One | St. Louis Demonstration JHS"
        description="Join our Sovereign One monthly support program with ₵5000 monthly donations. Help us provide exceptional support for our students' education and school development."
        keywords="monthly donation, Sovereign One supporter, ₵5000 monthly support, recurring donation, school funding, educational support"
        url="/donate-monthly-5000"
        type="website"
        pageType="donation"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/donate-monthly-5000"
      >

      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900 z-50 flex items-center justify-center">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 mb-8">
              <ShimmerLoader variant="silver" className="w-full h-full rounded-full" width="w-24" height="h-24" />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Sovereign One</h2>
              <p className="text-gray-300 text-sm">Loading your elite donation experience...</p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-black">
        {/* Header with Back Button */}
        <div className="bg-gradient-to-r from-purple-700 via-purple-600 to-purple-700 py-2 sm:py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                onClick={() => {
                  navigate('/donate', { 
                    replace: true,
                    state: { 
                      scrollToSection: 'monthly-support',
                      returnFromCardContent: true,
                      preserveState: true
                    } 
                  });
                }}
                className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-purple-600/50 hover:bg-purple-500/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-purple-400/30 flex-shrink-0"
              >
                <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
                <span>Back</span>
              </button>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
                ₵5000 Monthly - Sovereign One
              </h1>
            </div>
          </div>
        </div>

        {/* Announcement Bar - Attached to Back Bar */}
        <div className="bg-green-600 py-3">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-white font-semibold text-sm sm:text-base">
                🛡️ 100% of donations received are directed to the School for development
              </p>
            </div>
          </div>
        </div>

        {/* Full Screen Embedded Payment Form */}
        <div className="w-full" style={{ height: 'calc(100vh - 60px)' }}>
          <iframe
            src="https://paystack.shop/pay/stlouis5000"
            className="w-full h-full border-0"
            title="Monthly Support ₵5000 - Sovereign One"
            allow="payment *"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation allow-popups-to-escape-sandbox"
            loading="lazy"
            style={{
              border: 0,
              width: '100%',
              height: '100%',
              display: 'block'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default DonateMonthly5000Page;
