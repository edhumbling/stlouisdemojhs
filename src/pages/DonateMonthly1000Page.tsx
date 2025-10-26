import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import ShimmerLoader from '../components/common/ShimmerLoader';

const DonateMonthly1000Page: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Show loading for 2 seconds before revealing content
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Strong Silver Shimmer Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 z-50 flex items-center justify-center">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }}></div>
          </div>

          {/* Strong Silver Shimmer Loader */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 mb-8">
              <ShimmerLoader
                variant="silver"
                className="w-full h-full rounded-full"
                width="w-24"
                height="h-24"
              />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Vibranium Edge</h2>
              <p className="text-gray-300 text-sm">Loading your premium donation experience...</p>
            </div>
          </div>
        </div>
      )}

      <div className="min-h-screen bg-black">
        <SEOHead
        title="Monthly Support ₵1000 - Vibranium Edge | St. Louis Demonstration JHS"
        description="Join our Vibranium Edge monthly support program with ₵1000 monthly donations. Help us provide consistent support for our students' education and school development."
        keywords="monthly donation, Vibranium Edge supporter, ₵1000 monthly support, recurring donation, school funding, educational support"
        url="/donate-monthly-1000"
        type="website"
        pageType="donation"
        useGalleryImages={true}
      /
        canonical="https://stlouisdemojhs.com/donate-monthly-1000"
      >

      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 py-2 sm:py-3">
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
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-blue-600/50 hover:bg-blue-500/70 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base backdrop-blur-sm border border-blue-400/30 flex-shrink-0"
            >
              <ArrowLeft size={16} className="sm:w-5 sm:h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white truncate">
              ₵1000 Monthly - Vibranium Edge
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
          src="https://paystack.shop/pay/stlouis1000"
          className="w-full h-full border-0"
          title="Monthly Support ₵1000 - Vibranium Edge"
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

export default DonateMonthly1000Page;
